import React, {useEffect, useMemo, useState} from 'react';
import {Affix, Button, Empty, InputNumber, Layout, Select, Skeleton, Spin, message} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {FilterOutlined, SaveOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import {PRODMODE} from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {USERS} from "../CHARTS/mock/mock";
import styles from "./style/accountins.module.css";

const MONTHS = [
    {id: 1, name: 'Январь'},
    {id: 2, name: 'Февраль'},
    {id: 3, name: 'Март'},
    {id: 4, name: 'Апрель'},
    {id: 5, name: 'Май'},
    {id: 6, name: 'Июнь'},
    {id: 7, name: 'Июль'},
    {id: 8, name: 'Август'},
    {id: 9, name: 'Сентябрь'},
    {id: 10, name: 'Октябрь'},
    {id: 11, name: 'Ноябрь'},
    {id: 12, name: 'Декабрь'},
];

const AccountingBankCardsPage = () => {
    const useCookieState = (key, defaultValue) => {
        const [state, setState] = useState(() => {
            const saved = Cookies.get(key);
            return saved ? JSON.parse(saved) : defaultValue;
        });

        useEffect(() => {
            Cookies.set(key, JSON.stringify(state), {expires: 365});
        }, [key, state]);

        return [state, setState];
    };

    const [isOpenFilters, setIsOpenFilters] = useCookieState('accounting_bankcard_filters', true);
    const [filterParams, setFilterParams] = useState({
        year: dayjs().year(),
        month: dayjs().month() + 1,
    });
    const [bankUsers, setBankUsers] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);

    const years = useMemo(() => {
        const result = [];
        for (let year = 2016; year <= dayjs().year() + 1; year += 1) {
            result.push({value: year, label: year});
        }
        return result;
    }, []);

    const months = useMemo(() => MONTHS.map((month) => ({
        value: month.id,
        label: month.name,
    })), []);

    const periodDays = useMemo(() => {
        const startDate = dayjs()
            .year(Number(filterParams.year))
            .month(Number(filterParams.month) - 1)
            .date(11)
            .startOf('day');
        const endDate = startDate.add(1, 'month').date(10).startOf('day');
        const days = [];

        for (let day = startDate; day.isBefore(endDate) || day.isSame(endDate, 'day'); day = day.add(1, 'day')) {
            days.push({
                date_unix: day.unix(),
                date_time: day.format('D.MM'),
                day: day.date(),
                month: day.month() + 1,
                monthName: MONTHS[day.month()]?.name ?? day.format('MMMM'),
            });
        }

        return days;
    }, [filterParams.year, filterParams.month]);

    const selectedDayObjects = useMemo(() => selectedDays
        .map((dateUnix) => {
            const periodDay = periodDays.find((day) => String(day.date_unix) === String(dateUnix));
            if (periodDay) return periodDay;

            const fallbackDay = dayjs.unix(Number(dateUnix));
            return {
                date_unix: Number(dateUnix),
                date_time: fallbackDay.format('D.MM'),
                day: fallbackDay.date(),
                month: fallbackDay.month() + 1,
                monthName: MONTHS[fallbackDay.month()]?.name ?? fallbackDay.format('MMMM'),
            };
        })
        .filter(Boolean), [periodDays, selectedDays]);

    const dayGroups = useMemo(() => periodDays.reduce((groups, day) => {
        const groupKey = `${day.monthName}-${day.month}`;
        const existingGroup = groups.find((group) => group.key === groupKey);

        if (existingGroup) {
            existingGroup.days.push(day);
        } else {
            groups.push({
                key: groupKey,
                monthName: day.monthName,
                days: [day],
            });
        }

        return groups;
    }, []), [periodDays]);

    const gridTemplateColumns = `minmax(240px, 1.4fr) repeat(${Math.max(selectedDayObjects.length, 1)}, minmax(120px, 1fr))`;

    const extractBankUsers = (responseData) => {
        if (Array.isArray(responseData)) return responseData;
        if (Array.isArray(responseData?.content)) return responseData.content;
        if (Array.isArray(responseData?.data)) return responseData.data;
        return [];
    };

    const normalizeUsers = (users) => users.map((user) => ({
        ...user,
        periods: Array.isArray(user.periods) ? user.periods : [],
    }));

    const fetchBankUsers = async (filters = filterParams) => {
        try {
            setIsLoading(true);
            const response = await PROD_AXIOS_INSTANCE.get('/api/finance/data/getdatabank', {
                params: {
                    month: Number(filters.month) - 1,
                    year: Number(filters.year),
                },
            });
            const nextUsers = normalizeUsers(extractBankUsers(response.data));
            const existingDates = [...new Set(nextUsers
                .flatMap((user) => user.periods)
                .filter((period) => Number(period?.sum ?? 0) > 0 && period?.date_unix)
                .map((period) => Number(period.date_unix)))]
                .sort((a, b) => a - b);

            setBankUsers(nextUsers);
            setSelectedDays(existingDates);
        } catch (e) {
            console.log(e);
            if (!PRODMODE) {
                setBankUsers(normalizeUsers(USERS.slice(0, 8)));
                setSelectedDays([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBankUsers(filterParams).then();
    }, [filterParams.year, filterParams.month]);

    const getUserFullName = (user) => [user?.surname, user?.name, user?.secondname ?? user?.patronymic]
        .filter(Boolean)
        .join(' ');

    const getPeriodValue = (user, dateUnix) => {
        const period = user?.periods?.find((item) => String(item.date_unix) === String(dateUnix));
        return period?.sum ?? null;
    };

    const parseBankCardSum = (value) => {
        if (value === null || value === undefined || value === '') return 0;

        const parsedValue = Number(String(value).replace(/\s/g, '').replace(',', '.'));
        return Number.isFinite(parsedValue) ? parsedValue : 0;
    };

    const formatBankCardTotal = (value) => value.toLocaleString('ru-RU', {
        minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
        maximumFractionDigits: 2,
    });

    const bankCardColumnTotals = useMemo(() => selectedDayObjects.map((day) => bankUsers.reduce(
        (total, user) => total + parseBankCardSum(getPeriodValue(user, day.date_unix)),
        0,
    )), [bankUsers, selectedDayObjects]);

    const updatePeriodValue = (userId, dateUnix, sum) => {
        setBankUsers((currentUsers) => currentUsers.map((user) => {
            if (String(user.id) !== String(userId)) {
                return user;
            }

            const periods = [...(user.periods ?? [])];
            const periodIndex = periods.findIndex((period) => String(period.date_unix) === String(dateUnix));
            const nextPeriod = {
                date_unix: Number(dateUnix),
                date_time: periodDays.find((day) => String(day.date_unix) === String(dateUnix))?.date_time,
                sum: sum ?? '',
            };

            if (periodIndex >= 0) {
                periods[periodIndex] = {
                    ...periods[periodIndex],
                    ...nextPeriod,
                };
            } else {
                periods.push(nextPeriod);
            }

            return {
                ...user,
                periods,
            };
        }));
    };

    const toggleDay = (dateUnix) => {
        setSelectedDays((currentDays) => {
            if (currentDays.map(String).includes(String(dateUnix))) {
                return currentDays.filter((day) => String(day) !== String(dateUnix));
            }

            return [...currentDays, Number(dateUnix)].sort((a, b) => a - b);
        });
    };

    const saveBankCards = async () => {
        try {
            setSavingInfo(true);
            const data = bankUsers.map((user) => ({
                id: user.id,
                periods: selectedDayObjects.map((day) => ({
                    date_unix: day.date_unix,
                    sum: getPeriodValue(user, day.date_unix) || 0,
                })),
            }));

            await PROD_AXIOS_INSTANCE.post('/api/finance/data/savedatabank', {data});
            await fetchBankUsers(filterParams);
            message.success('Перечисления сохранены');
        } catch (e) {
            console.log(e);
            message.error('Не удалось сохранить перечисления');
        } finally {
            setSavingInfo(false);
        }
    };

    const renderSkeleton = () => (
        <div className={styles.sk_bankcard_skeleton}>
            {[0, 1, 2, 3, 4].map((rowIndex) => (
                <div key={`bankcard-skeleton-${rowIndex}`} className={styles.sk_bankcard_row} style={{gridTemplateColumns}}>
                    <div className={styles.sk_person_row_content}>
                        <Skeleton.Input active size="small" className={styles.sk_skeleton_name} />
                    </div>
                    {selectedDayObjects.map((day) => (
                        <div key={`bankcard-skeleton-cell-${rowIndex}-${day.date_unix}`} className={styles.sk_person_row_content}>
                            <Skeleton.Input active size="small" className={styles.sk_skeleton_value} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

    return (
        <div className={'mega-layout'}>
            <Layout className={'layout'}>
                <Header className={'header'}>
                    <Affix>
                        <div className={'sk-header-container'}>
                            <Button
                                color={'default'}
                                variant={isOpenFilters ? 'solid' : 'outlined'}
                                icon={<FilterOutlined />}
                                style={{width: '125px'}}
                                onClick={() => setIsOpenFilters(!isOpenFilters)}
                            >
                                Фильтры
                            </Button>
                            <h1 className={'page-header'}>Банковские карты</h1>
                            <Button
                                type="primary"
                                loading={savingInfo}
                                disabled={isLoading || bankUsers.length === 0}
                                icon={<SaveOutlined />}
                                style={{width: '125px'}}
                                onClick={saveBankCards}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </Affix>
                </Header>
                <Layout className="sk-layout-center">
                    <Sider
                        width={isOpenFilters ? "330px" : 0}
                        className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}
                    >
                        <Affix offsetTop={54}>
                            <div className="sk-width-container">
                                <div className="sk-usp-filter-col">
                                    <div className={'sk-usp-filter-col-item'}>
                                        <span className={'sk-usp-filter-col-label'}>Год</span>
                                        <Select
                                            style={{width: '100%'}}
                                            value={filterParams.year}
                                            options={years}
                                            onChange={(year) => setFilterParams((current) => ({...current, year}))}
                                        />
                                    </div>
                                    <div className={'sk-usp-filter-col-item'}>
                                        <span className={'sk-usp-filter-col-label'}>Месяц</span>
                                        <Select
                                            style={{width: '100%'}}
                                            value={filterParams.month}
                                            options={months}
                                            onChange={(month) => setFilterParams((current) => ({...current, month}))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className={`sk-content-table-wrapper ${styles.sk_accounting_table_wrapper} ${styles.sk_accounting_table_wrapper_scroll}`}>
                            <div className={styles.sk_bankcard_days_panel}>
                                <div className={styles.sk_bankcard_days_months}>
                                    {dayGroups.map((group) => (
                                        <div
                                            key={group.key}
                                            className={styles.sk_bankcard_days_month}
                                            style={{
                                                flexGrow: group.days.length,
                                                flexBasis: `${group.days.length * 37 + 8}px`,
                                            }}
                                        >
                                            {group.monthName.toLowerCase()}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.sk_bankcard_days_rows}>
                                    {dayGroups.map((group) => (
                                        <div
                                            key={`${group.key}-days`}
                                            className={styles.sk_bankcard_days_group}
                                            style={{
                                                flexGrow: group.days.length,
                                                flexBasis: `${group.days.length * 37 + 8}px`,
                                            }}
                                        >
                                            {group.days.map((day) => {
                                                const isSelected = selectedDays.map(String).includes(String(day.date_unix));

                                                return (
                                                    <Button
                                                        key={day.date_unix}
                                                        size="small"
                                                        type={isSelected ? 'primary' : 'default'}
                                                        className={styles.sk_bankcard_day_button}
                                                        onClick={() => toggleDay(day.date_unix)}
                                                    >
                                                        {day.day}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Spin tip="Ожидайте" spinning={false} style={{width: '100%', height: '100%'}}>
                                <div className={`sk-content-table ${styles.sk_accounting_table} ${styles.sk_bankcard_table}`}>
                                    <Affix offsetTop={44}>
                                        <div className={styles.sk_table_row_bankcard_title} style={{gridTemplateColumns}}>
                                            <div className={styles.sk_department_table_header}>
                                                <p className={styles.sk_department_table_header_p}>ФИО</p>
                                            </div>
                                            {selectedDayObjects.map((day) => (
                                                <div key={`bankcard-header-${day.date_unix}`} className={styles.sk_department_table_header}>
                                                    <p className={styles.sk_department_table_header_p}>{day.date_time}</p>
                                                </div>
                                            ))}
                                            {selectedDayObjects.length === 0 && (
                                                <div className={styles.sk_department_table_header}>
                                                    <p className={styles.sk_department_table_header_p}>Выберите дни</p>
                                                </div>
                                            )}
                                        </div>
                                    </Affix>
                                    {isLoading ? renderSkeleton() : (
                                        <>
                                            {bankUsers.map((user) => (
                                                <div key={user.id} className={styles.sk_bankcard_row} style={{gridTemplateColumns}}>
                                                    <div className={styles.sk_person_row_content}>
                                                        <p className={styles.sk_person_row_p} title={getUserFullName(user)}>
                                                            {getUserFullName(user)}
                                                        </p>
                                                    </div>
                                                    {selectedDayObjects.map((day) => (
                                                        <div key={`${user.id}-${day.date_unix}`} className={`${styles.sk_person_row_content} ${styles.sk_person_row_input_cell}`}>
                                                            <InputNumber
                                                                className={styles.sk_person_row_input}
                                                                controls={false}
                                                                min={0}
                                                                precision={2}
                                                                stringMode
                                                                value={getPeriodValue(user, day.date_unix)}
                                                                onChange={(sum) => updatePeriodValue(user.id, day.date_unix, sum)}
                                                            />
                                                        </div>
                                                    ))}
                                                    {selectedDayObjects.length === 0 && (
                                                        <div className={styles.sk_person_row_content}>
                                                            <p className={styles.sk_person_row_p_occupy}>День выплаты не выбран</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {bankUsers.length > 0 && (
                                                <div className={`${styles.sk_bankcard_row} ${styles.sk_bankcard_total_row}`} style={{gridTemplateColumns}}>
                                                    <div className={styles.sk_person_row_content}>
                                                        <p className={styles.sk_bankcard_total_name}>ИТОГО</p>
                                                    </div>
                                                    {selectedDayObjects.map((day, index) => (
                                                        <div key={`bankcard-total-${day.date_unix}`} className={styles.sk_person_row_content}>
                                                            <p className={styles.sk_bankcard_total_sum}>
                                                                {formatBankCardTotal(bankCardColumnTotals[index] ?? 0)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                    {selectedDayObjects.length === 0 && (
                                                        <div className={styles.sk_person_row_content}>
                                                            <p className={styles.sk_bankcard_total_sum}>0</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {bankUsers.length === 0 && (
                                                <div className={styles.sk_surcharge_empty_state}>
                                                    <Empty description="Сотрудников за выбранный период нет" />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Spin>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AccountingBankCardsPage;
