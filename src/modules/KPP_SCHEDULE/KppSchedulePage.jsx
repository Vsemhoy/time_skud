import React, {useEffect, useMemo, useState} from 'react';
import {Button, DatePicker, Empty, Select, Skeleton, message} from 'antd';
import dayjs from 'dayjs';
import {ROUTE_PREFIX} from '../../CONFIG/config';
import {PROD_AXIOS_INSTANCE} from '../../API/API';
import './kppschedule.css';

const KPP_DEPARTMENT_ID = 17;

const shiftOptions = [
    {value: 0, label: ''},
    {value: 1, label: '24'},
    {value: 2, label: 'от'},
    {value: 3, label: '12'},
];

const monthOptions = [
    {value: 0, label: 'Январь'},
    {value: 1, label: 'Февраль'},
    {value: 2, label: 'Март'},
    {value: 3, label: 'Апрель'},
    {value: 4, label: 'Май'},
    {value: 5, label: 'Июнь'},
    {value: 6, label: 'Июль'},
    {value: 7, label: 'Август'},
    {value: 8, label: 'Сентябрь'},
    {value: 9, label: 'Октябрь'},
    {value: 10, label: 'Ноябрь'},
    {value: 11, label: 'Декабрь'},
];

const getUserId = (user) => user.id ?? user.user_id;

const getUserFullName = (user) => (
    [
        user.surname ?? user.user_surname,
        user.name ?? user.user_name,
        user.secondname ?? user.patronymic ?? user.user_patronymic,
    ]
        .filter(Boolean)
        .join(' ')
);

const mapResponseToScheduleValues = (rows, month, year) => {
    const result = {};

    rows.forEach((row) => {
        const userId = getUserId(row.info);
        Object.entries(row.day ?? {}).forEach(([dayNumber, value]) => {
            const date = dayjs()
                .year(year)
                .month(month)
                .date(Number(dayNumber))
                .format('YYYY-MM-DD');
            result[`${userId}_${date}`] = Number(value) || 0;
        });
    });

    return result;
};

const KppSchedulePage = () => {
    const [targetMonth, setTargetMonth] = useState(dayjs().month());
    const [targetYear, setTargetYear] = useState(dayjs());
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [scheduleValues, setScheduleValues] = useState({});
    const [messageApi, contextHolder] = message.useMessage();

    const days = useMemo(() => {
        const start = dayjs()
            .year(targetYear.year())
            .month(targetMonth)
            .startOf('month');
        return Array.from({length: start.daysInMonth()}, (_, index) => start.add(index, 'day'));
    }, [targetMonth, targetYear]);
    const tableColumns = useMemo(() => `minmax(170px, 1.45fr) repeat(${days.length}, minmax(30px, 1fr))`, [days.length]);

    const kppUsers = useMemo(() => (
        users
            .filter((user) => Number(user.department_id ?? user.id_departament) === KPP_DEPARTMENT_ID)
            .sort((a, b) => getUserFullName(a).localeCompare(getUserFullName(b)))
    ), [users]);

    useEffect(() => {
        getKppSchedule();
    }, [targetMonth, targetYear]);

    const getKppSchedule = async () => {
        setIsLoading(true);
        try {
            const year = targetYear.year();
            const response = await PROD_AXIOS_INSTANCE.get(`${ROUTE_PREFIX}/skud/getgrafikkpp`, {
                params: {
                    month: targetMonth,
                    year,
                },
            });
            const rows = Array.isArray(response.data) ? response.data : [];
            setUsers(rows.map((row) => row.info).filter(Boolean));
            setScheduleValues(mapResponseToScheduleValues(rows, targetMonth, year));
        } catch (e) {
            console.log(e);
            setUsers([]);
            setScheduleValues({});
            messageApi.error('Не удалось загрузить график КПП');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCellChange = (userId, day, value) => {
        const key = `${userId}_${day.format('YYYY-MM-DD')}`;
        setScheduleValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const getCellValue = (userId, day) => (
        scheduleValues[`${userId}_${day.format('YYYY-MM-DD')}`] ?? 0
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const year = targetYear.year();
            const peoples = kppUsers.map((user) => {
                const userId = getUserId(user);
                const day = {};

                days.forEach((date) => {
                    day[String(date.date())] = String(getCellValue(userId, date));
                });

                return {
                    info: {
                        id: userId,
                    },
                    month: targetMonth,
                    year,
                    day,
                };
            });

            const params = new URLSearchParams();
            params.append('peoples', JSON.stringify(peoples));

            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/skud/getgrafikkpp`, params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                },
            });

            if (response.data?.error) {
                throw new Error(response.data.error);
            }

            messageApi.success('График сохранен');
            await getKppSchedule();
        } catch (e) {
            console.log(e);
            messageApi.error('Не удалось сохранить график');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="sk-kpp-schedule-page">
            {contextHolder}
            <div className="sk-kpp-schedule-header">
                <div>
                    <h2>График КПП</h2>
                    <span className="sk-kpp-schedule-subtitle">Пулково КПП, отдел {KPP_DEPARTMENT_ID}</span>
                </div>
                <div className="sk-kpp-schedule-filters">
                    <Select
                        value={targetMonth}
                        options={monthOptions}
                        onChange={setTargetMonth}
                        style={{width: 160}}
                    />
                    <DatePicker
                        picker="year"
                        value={targetYear}
                        onChange={(value) => setTargetYear(value ?? dayjs())}
                        allowClear={false}
                        style={{width: 120}}
                    />
                    <Button
                        type="primary"
                        className="sk-kpp-schedule-save-btn"
                        loading={isSaving}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>

            <div className="sk-kpp-schedule-table-wrap">
                <div
                    className="sk-kpp-schedule-grid sk-kpp-schedule-grid--header"
                    style={{gridTemplateColumns: tableColumns}}
                >
                    <div className="sk-kpp-schedule-employee-head">Сотрудник</div>
                    {days.map((day) => (
                        <div
                            className={`sk-kpp-schedule-day-head ${[0, 6].includes(day.day()) ? 'is-weekend' : ''}`}
                            key={day.format('YYYY-MM-DD')}
                            title={day.format('DD.MM.YYYY')}
                        >
                            <strong>{day.format('D')}</strong>
                            <span>{day.format('dd')}</span>
                        </div>
                    ))}
                </div>

                {isLoading ? (
                    <div className="sk-kpp-schedule-skeleton">
                        {Array.from({length: 8}).map((_, index) => (
                            <Skeleton.Input active block key={`kpp-schedule-skeleton-${index}`} />
                        ))}
                    </div>
                ) : kppUsers.length === 0 ? (
                    <div className="sk-kpp-schedule-empty">
                        <Empty description="Сотрудники КПП не найдены" />
                    </div>
                ) : (
                    kppUsers.map((user) => {
                        const userId = getUserId(user);
                        return (
                            <div
                                className="sk-kpp-schedule-grid sk-kpp-schedule-row"
                                style={{gridTemplateColumns: tableColumns}}
                                key={`kpp-schedule-user-${userId}`}
                            >
                                <div className="sk-kpp-schedule-employee-cell">
                                    <strong>{getUserFullName(user)}</strong>
                                    <span>{user.occupy ?? user.user_occupy ?? ''}</span>
                                </div>
                                {days.map((day) => (
                                    <div className="sk-kpp-schedule-cell" key={`${userId}_${day.format('YYYY-MM-DD')}`}>
                                        <Select
                                            value={getCellValue(userId, day)}
                                            options={shiftOptions}
                                            onChange={(value) => handleCellChange(userId, day, value)}
                                            size="small"
                                            popupMatchSelectWidth={false}
                                            className="sk-kpp-schedule-select"
                                        />
                                    </div>
                                ))}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default KppSchedulePage;
