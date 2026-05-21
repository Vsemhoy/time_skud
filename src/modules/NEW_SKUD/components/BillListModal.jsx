import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, Collapse, Modal, Select, Skeleton, Spin, Tag, Tooltip} from "antd";
import './style/bill_list_modal.css'
import {CSRF_TOKEN, ROUTE_PREFIX} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import dayjs from "dayjs";

const SUMMARY_ROWS = [
    {key: 'office', label: 'В офисе', color: 'green'},
    {key: 'vacation', label: 'Отпуск', color: 'blue'},
    {key: 'sick_leave', label: 'Больничный', color: 'volcano'},
    {key: 'containers', label: 'Контейнеры', color: 'gold'},
    {
        key: 'business_trips_local',
        label: 'Местные командировки',
        color: 'geekblue',
        dataKeys: [
            'business_trips_local',
            'local_business_trips',
            'short_business_trips',
            'local_trips',
            'business_trips.local',
            'business_trips.local_business_trips',
            'business_trips.short',
        ],
    },
    {
        key: 'business_trips_long',
        label: 'Длительные командировки',
        color: 'cyan',
        dataKeys: [
            'business_trips_long',
            'long_business_trips',
            'long_trips',
            'business_trips.long',
            'business_trips.long_business_trips',
        ],
    },
    {key: 'reworkings', label: 'Сверхурочные', color: 'lime'},
    {
        key: 'time_lost',
        label: 'Потерянное время',
        color: 'red',
        danger: true,
        tooltip: 'Один день = 8 часов потерянного времени',
    },
];

const monthsOptions = [
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

const yearsOptions = Array.from({length: 8}, (_, index) => {
    const year = dayjs().subtract(5, 'year').add(index, 'year').year();

    return {
        id: year,
        name: year,
    };
});

const emptyMetric = {
    days: 0,
    hours: 0,
    time: '',
    by_days: [],
};

const getValueByPath = (source, path) => path
    .split('.')
    .reduce((value, key) => value?.[key], source);

const getMetricByRow = (source, row) => {
    const dataKeys = row.dataKeys ?? [row.key];
    const metric = dataKeys
        .map((key) => getValueByPath(source, key))
        .find((value) => value !== null && value !== undefined);

    return metric ?? emptyMetric;
};

const hasMetricData = (metric) => (
    Number(metric?.days) > 0
    || Number(metric?.hours) > 0
    || (Array.isArray(metric?.by_days) && metric.by_days.length > 0)
);

const getFilenameFromDisposition = (disposition) => {
    if (!disposition) {
        return null;
    }

    const utfFilename = disposition.match(/filename\*=UTF-8''([^;]+)/i);

    if (utfFilename?.[1]) {
        return decodeURIComponent(utfFilename[1]);
    }

    const filename = disposition.match(/filename="?([^";]+)"?/i);

    return filename?.[1] ?? null;
};

const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

const BILL_LIST_USER_SELECT_ACL = 88;

const isTruthyFlag = (value) => value === true || value === 1 || value === '1';

const hasFullUserSelectAccess = (userdata) => (
    isTruthyFlag(userdata?.user?.super)
    || isTruthyFlag(userdata?.user?.is_admin)
    || (Array.isArray(userdata?.acls) && userdata.acls.some((acl) => Number(acl) === BILL_LIST_USER_SELECT_ACL))
);

const getUserId = (user) => user?.id ?? user?.user_id;

const getUserFullName = (user) => (
    `${user?.surname ?? ''} ${user?.name ?? ''} ${user?.patronymic ?? user?.secondname ?? ''}`.trim()
);

const prepareUserOption = (user) => ({
    id: getUserId(user),
    name: getUserFullName(user) || `#${getUserId(user)}`,
});

const uniqueAndSortUserOptions = (users) => users
    .filter((user) => user?.id != null)
    .filter((user, index, array) => array.findIndex((item) => item.id === user.id) === index)
    .sort((a, b) => a.name.localeCompare(b.name));

const getSubordinateUsersOptions = (users, currentUser) => {
    const currentUserId = getUserId(currentUser);

    if (!currentUserId || !Array.isArray(users)) {
        return [];
    }

    const currentUserOption = prepareUserOption(currentUser);
    const subordinates = users
        .filter((user) => user?.type !== 'header')
        .filter((user) => Number(user?.boss_id) === Number(currentUserId))
        .map(prepareUserOption);

    return uniqueAndSortUserOptions([currentUserOption, ...subordinates]);
};

const BillListModal = (props) => {
    const [isLoadingFilters, setIsLoadingFilters] = useState(false);
    const [isLoadingBillList, setIsLoadingBillList] = useState(false);
    const [isExportingAll, setIsExportingAll] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const billListRequestRef = useRef(0);

    const [usersOptions, setUsersOptions] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const [billListInfo, setBillListInfo] = useState(null);

    const canSelectAllUsers = hasFullUserSelectAccess(props.userdata);
    const subordinateUsersOptions = useMemo(
        () => getSubordinateUsersOptions(props.user_list, props.userdata?.user),
        [props.user_list, props.userdata?.user]
    );
    const canSelectUser = canSelectAllUsers || subordinateUsersOptions.length > 1;
    const currentUserName = getUserFullName(props.userdata?.user) || `#${props.userdata?.user?.id ?? ''}`;

    useEffect(() => {
        if (!canSelectAllUsers || (props.user_list && props.user_list.length > 0)) {
            setIsMounted(true);
            return;
        }

        if (!usersOptions && !isLoadingFilters) {
            fetchFiltersOptions().then(() => {
                setIsMounted(true);
            });
        }
    }, [canSelectAllUsers, isLoadingFilters, props.user_list, usersOptions]);

    useEffect(() => {
        if (canSelectAllUsers && props.user_list && props.user_list.length > 0) {
            const preparedUsers = uniqueAndSortUserOptions(
                props.user_list
                    .filter((user) => user?.type !== 'header')
                    .map(prepareUserOption)
            );

            setUsersOptions(preparedUsers);
            setIsLoadingFilters(false);
        }
    }, [canSelectAllUsers, props.user_list]);

    useEffect(() => {
        if (!canSelectAllUsers && subordinateUsersOptions.length > 1) {
            setUsersOptions(subordinateUsersOptions);
        }
    }, [canSelectAllUsers, subordinateUsersOptions]);

    useEffect(() => {
        if (isMounted && selectedUser && selectedMonth && selectedYear) {
            const timer = setTimeout(() => {
                fetchBillListInfo().then();
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isMounted, selectedUser, selectedMonth, selectedYear]);

    useEffect(() => {
        const initialUserId = props.initial_user_id ?? props.userdata?.user?.id;

        if (initialUserId) {
            setSelectedUser(initialUserId);
        }
    }, [props.initial_user_id, props.userdata]);

    const fetchFiltersOptions = async () => {
        if (!canSelectAllUsers) {
            return;
        }

        try {
            setIsLoadingFilters(true);
            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}`, {
                _token: CSRF_TOKEN
            });

            if (response.data.content) {
                const filters = response.data.content.filters;
                setUsersOptions(filters.users);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoadingFilters(false);
        }
    };

    const fetchBillListInfo = async () => {
        const requestId = billListRequestRef.current + 1;
        billListRequestRef.current = requestId;

        try {
            setIsLoadingBillList(true);
            setBillListInfo(null);

            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/employee-month-stats`, {
                data: {
                    user_id: selectedUser,
                    month: selectedMonth,
                    year: selectedYear,
                    debug_calendar: 1
                }
            });

            if (requestId === billListRequestRef.current) {
                setBillListInfo(response?.data ?? null);
            }
        } catch (e) {
            console.log(e);
            if (requestId === billListRequestRef.current) {
                setBillListInfo(null);
            }
        } finally {
            if (requestId === billListRequestRef.current) {
                setIsLoadingBillList(false);
            }
        }
    };

    const prepareOptions = (options) => {
        return options ? options.map((option) => ({
            value: option.id,
            label: option.name,
        })) : null;
    };

    const handleExportAll = async () => {
        if (!canSelectUser) {
            return;
        }

        try {
            setIsExportingAll(true);
            const accessibleUserIds = canSelectAllUsers ? null : usersOptions?.map((user) => user.id);
            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/employee-month-stats/export`, {
                data: {
                    month: selectedMonth,
                    year: selectedYear,
                    user_ids: accessibleUserIds,
                }
            }, {
                responseType: 'blob',
            });
            const filename = getFilenameFromDisposition(response.headers?.['content-disposition'])
                ?? `employee-month-stats-${selectedYear}-${String(selectedMonth).padStart(2, '0')}.xlsx`;

            downloadBlob(response.data, filename);
        } catch (e) {
            console.log(e);
        } finally {
            setIsExportingAll(false);
        }
    };

    const formatDaysValue = (value) => {
        if (value === null || value === undefined || value === '') {
            return '—';
        }

        return String(value);
    };

    const formatHoursValue = (value) => {
        if (value === null || value === undefined || value === '') {
            return '—';
        }

        const numericValue = Number(value);

        if (Number.isNaN(numericValue)) {
            return String(value);
        }

        if (Number.isInteger(numericValue)) {
            return `${numericValue} ч`;
        }

        return `${numericValue.toFixed(2)} ч`;
    };

    const formatMetricTimeValue = (metric) => {
        if (metric?.time) {
            return metric.time;
        }

        return formatHoursValue(metric?.hours);
    };

    const formatEventTimeValue = (time, hours) => {
        const timeString = typeof time === 'string' ? time : '';
        const parsedTime = timeString.match(/(\d+)\s*час(?:ов|а)?\s*(\d+)\s*минут(?:ы)?/i);

        if (parsedTime) {
            const parsedHours = Number(parsedTime[1]);
            const parsedMinutes = Number(parsedTime[2]);

            if (parsedHours > 0 && parsedMinutes > 0) {
                return `${parsedHours} ч. ${parsedMinutes} мин.`;
            }

            if (parsedHours > 0) {
                return `${parsedHours} ч.`;
            }

            return `${parsedMinutes} мин.`;
        }

        if (timeString) {
            return timeString
                .replace(/часов|часа|час/gi, 'ч.')
                .replace(/минуты|минута|минут/gi, 'мин.');
        }

        return formatHoursValue(hours);
    };

    const summaryRows = SUMMARY_ROWS
        .map((row) => {
            const metric = getMetricByRow(billListInfo, row);

            return {
                ...row,
                days: formatDaysValue(metric?.days),
                hours: formatMetricTimeValue(metric),
                byDays: Array.isArray(metric?.by_days) ? metric.by_days : [],
                hasData: hasMetricData(metric),
            };
        })
        .filter((row) => row.hasData);

    const summaryMeta = {
        workDays: formatDaysValue(billListInfo?.calendar_info?.days),
        normHours: formatMetricTimeValue(billListInfo?.calendar_info),
        rows: summaryRows,
    };
    const eventRows = summaryMeta.rows.filter((row) => row.byDays.length > 0);

    const renderBillListSkeleton = () => (
        <div className={'bill-list-modal-body'}>
            <div className={'bill-list-summary'}>
                <div className={'bill-list-summary-cards'}>
                    {Array.from({length: 2}).map((_, index) => (
                        <div className={'bill-list-summary-card bill-list-summary-card--skeleton'} key={`bill-summary-card-${index}`}>
                            <Skeleton.Input active size="small" className={'bill-list-skeleton-label'} />
                            <Skeleton.Input active size="large" className={'bill-list-skeleton-value'} />
                        </div>
                    ))}
                </div>
                <div className={'bill-list-summary-table'}>
                    <div className={'bill-list-summary-table-header'}>
                        <div><Skeleton.Input active size="small" className={'bill-list-skeleton-table-header'} /></div>
                        <div><Skeleton.Input active size="small" className={'bill-list-skeleton-table-header'} /></div>
                        <div><Skeleton.Input active size="small" className={'bill-list-skeleton-table-header'} /></div>
                    </div>
                    {Array.from({length: SUMMARY_ROWS.length}).map((_, index) => (
                        <div className={'bill-list-summary-table-row'} key={`bill-summary-row-${index}`}>
                            <div><Skeleton.Input active size="small" className={'bill-list-skeleton-table-label'} /></div>
                            <div><Skeleton.Input active size="small" className={'bill-list-skeleton-table-value'} /></div>
                            <div><Skeleton.Input active size="small" className={'bill-list-skeleton-table-value'} /></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={'table-by-days'}>
                <div className={'table-by-days-header'}>
                    <Skeleton.Input active size="small" className={'bill-list-skeleton-table-header-wide'} />
                </div>
                {Array.from({length: SUMMARY_ROWS.length}).map((_, index) => (
                    <div className={'table-by-days-row'} key={`bill-days-row-${index}`}>
                        <div className={'label-cell'}>
                            <Skeleton.Input active size="small" className={'bill-list-skeleton-table-label'} />
                        </div>
                        <div className={'days-cell bill-list-skeleton-days-cell'}>
                            {Array.from({length: 8}).map((__, dayIndex) => (
                                <Skeleton.Button active size="small" className={'bill-list-skeleton-day-tag'} key={`bill-day-${index}-${dayIndex}`} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <Modal
            title={'Расчетный лист офис'}
            closable={{'aria-label': 'Custom Close Button'}}
            footer={null}
            open={props?.isOpenBillListModal}
            onCancel={props?.handleCloseBillListModal}
            width={'90vw'}
            style={{top: 24}}
            styles={{
                body: {
                    minHeight: "70vh",
                    overflowY: "auto"
                }
            }}
        >
            <div className={'bill-list-modal-container'}>
                <Spin spinning={isLoadingFilters} size={'large'}>
                    <div className={'bill-list-modal-header-wrapper'}>
                        <div className={'bill-list-modal-header'}>
                            {canSelectUser ? (
                                <Select
                                    placeholder={'Сотрудник'}
                                    style={{width: '300px'}}
                                    options={prepareOptions(usersOptions) ?? []}
                                    showSearch
                                    optionFilterProp="label"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    value={selectedUser}
                                    onChange={setSelectedUser}
                                />
                            ) : (
                                <div className={'bill-list-current-user'}>
                                    <div className={'bill-list-current-user-name'}>{currentUserName}</div>
                                </div>
                            )}
                            <Select
                                placeholder={'Месяц'}
                                style={{width: '150px'}}
                                options={prepareOptions(monthsOptions) ?? []}
                                value={selectedMonth}
                                onChange={setSelectedMonth}
                            />
                            <Select
                                placeholder={'Год'}
                                style={{width: '150px'}}
                                options={prepareOptions(yearsOptions) ?? []}
                                value={selectedYear}
                                onChange={setSelectedYear}
                            />
                        </div>
                        {canSelectUser && (
                            <Tooltip title={'По выбранному году и месяцу'}>
                                <Button
                                    className={'bill-list-export-button'}
                                    loading={isExportingAll}
                                    disabled={isExportingAll || isLoadingFilters || isLoadingBillList}
                                    onClick={handleExportAll}
                                >
                                    {'Выгрузить данные по всем'}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </Spin>

                {isLoadingBillList ? renderBillListSkeleton() : (
                    <div className={'bill-list-modal-body'}>
                        <div className={'bill-list-summary'}>
                            <div className={'bill-list-summary-cards'}>
                                <div className={'bill-list-summary-card'}>
                                    <div className={'bill-list-summary-card-label'}>
                                        {'Рабочих дней в месяце'}
                                    </div>
                                    <div className={'bill-list-summary-card-value'}>{summaryMeta.workDays}</div>
                                </div>
                                <div className={'bill-list-summary-card'}>
                                    <div className={'bill-list-summary-card-label'}>
                                        {'Норма часов'}
                                    </div>
                                    <div className={'bill-list-summary-card-value'}>{summaryMeta.normHours}</div>
                                </div>
                            </div>

                            <div className={'bill-list-summary-table'}>
                                <div className={'bill-list-summary-table-header'}>
                                    <div>{'Показатель'}</div>
                                    <div>{'Дней'}</div>
                                    <div>{'Часов'}</div>
                                </div>
                                {summaryMeta.rows.map((row) => {
                                    const rowContent = (
                                        <div className={`bill-list-summary-table-row ${row.danger ? 'bill-list-summary-table-row--danger' : ''}`}>
                                            <div>{row.label}</div>
                                            <div>{row.days}</div>
                                            <div>{row.hours}</div>
                                        </div>
                                    );

                                    return row.tooltip ? (
                                        <Tooltip title={row.tooltip} key={row.key}>
                                            {rowContent}
                                        </Tooltip>
                                    ) : (
                                        <React.Fragment key={row.key}>{rowContent}</React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        <Collapse
                            className={'bill-list-events-collapse'}
                            items={[
                                {
                                    key: 'by-days',
                                    label: 'События по датам',
                                    children: (
                                        <div className={'table-by-days'}>
                                            {eventRows.map((row) => (
                                                <div className={'table-by-days-row'} key={`days-${row.key}`}>
                                                    <div className={`label-cell ${row.danger ? 'label-cell--danger' : ''}`}>
                                                        {row.tooltip ? (
                                                            <Tooltip title={row.tooltip}>
                                                                <span>{row.label}</span>
                                                            </Tooltip>
                                                        ) : row.label}
                                                    </div>
                                                    <div className={'days-cell'}>
                                                        {row.byDays.length > 0 ? row.byDays.map((item) => (
                                                            <Tooltip title={formatEventTimeValue(item?.time, item?.hours)} key={`${row.key}-${item?.date ?? item?.day}`}>
                                                                <Tag color={row.color}>{item?.day ?? '—'}</Tag>
                                                            </Tooltip>
                                                        )) : '—'}
                                                    </div>
                                                </div>
                                            ))}
                                            {eventRows.length === 0 && (
                                                <div className={'table-by-days-row table-by-days-row--empty'}>
                                                    <div className={'days-cell'}>{'Нет событий'}</div>
                                                </div>
                                            )}
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default BillListModal;
