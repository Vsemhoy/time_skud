import React, {useEffect, useMemo, useState} from 'react';
import {Button, Collapse, Modal, Select, Skeleton, Spin, Tag, Tooltip} from "antd";
import './style/bill_list_modal.css'
import {CSRF_TOKEN, ROUTE_PREFIX} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import dayjs from "dayjs";

const SUMMARY_ROWS = [
    {key: 'office', label: '\u0412 \u043e\u0444\u0438\u0441\u0435', color: 'green'},
    {key: 'vacation', label: '\u041e\u0442\u043f\u0443\u0441\u043a', color: 'blue'},
    {key: 'sick_leave', label: '\u0411\u043e\u043b\u044c\u043d\u0438\u0447\u043d\u044b\u0439', color: 'volcano'},
    {key: 'containers', label: '\u041a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u044b', color: 'gold'},
    {
        key: 'business_trips_local',
        label: '\u041c\u0435\u0441\u0442\u043d\u044b\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u0438\u0440\u043e\u0432\u043a\u0438',
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
        label: '\u0414\u043b\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u0438\u0440\u043e\u0432\u043a\u0438',
        color: 'cyan',
        dataKeys: [
            'business_trips_long',
            'long_business_trips',
            'long_trips',
            'business_trips.long',
            'business_trips.long_business_trips',
        ],
    },
    {key: 'reworkings', label: '\u041e\u0442\u0440\u0430\u0431\u043e\u0442\u043a\u0438', color: 'lime'},
    {key: 'time_lost', label: '\u041f\u043e\u0442\u0435\u0440\u044f\u043d\u043d\u043e\u0435 \u0432\u0440\u0435\u043c\u044f', color: 'red'},
];

const monthsOptions = [
    {id: 1, name: '\u042f\u043d\u0432\u0430\u0440\u044c'},
    {id: 2, name: '\u0424\u0435\u0432\u0440\u0430\u043b\u044c'},
    {id: 3, name: '\u041c\u0430\u0440\u0442'},
    {id: 4, name: '\u0410\u043f\u0440\u0435\u043b\u044c'},
    {id: 5, name: '\u041c\u0430\u0439'},
    {id: 6, name: '\u0418\u044e\u043d\u044c'},
    {id: 7, name: '\u0418\u044e\u043b\u044c'},
    {id: 8, name: '\u0410\u0432\u0433\u0443\u0441\u0442'},
    {id: 9, name: '\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c'},
    {id: 10, name: '\u041e\u043a\u0442\u044f\u0431\u0440\u044c'},
    {id: 11, name: '\u041d\u043e\u044f\u0431\u0440\u044c'},
    {id: 12, name: '\u0414\u0435\u043a\u0430\u0431\u0440\u044c'},
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
        if (props.userdata?.user?.id) {
            setSelectedUser(props.userdata.user.id);
        }
    }, [props.userdata]);

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
        try {
            setIsLoadingBillList(true);
            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/employee-month-stats`, {
                data: {
                    user_id: selectedUser,
                    month: selectedMonth,
                    year: selectedYear,
                    debug_calendar: 1
                }
            });

            setBillListInfo(response?.data ?? null);
        } catch (e) {
            console.log(e);
            setBillListInfo(null);
        } finally {
            setIsLoadingBillList(false);
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

            if (typeof props.onExportAll === 'function') {
                await props.onExportAll({
                    user: selectedUser,
                    month: selectedMonth,
                    year: selectedYear,
                });
            } else {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
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

    const summaryMeta = {
        workDays: formatDaysValue(billListInfo?.calendar_info?.days),
        normHours: formatHoursValue(billListInfo?.calendar_info?.hours),
        rows: SUMMARY_ROWS.map((row) => {
            const metric = getMetricByRow(billListInfo, row);

            return {
                ...row,
                days: formatDaysValue(metric?.days),
                hours: formatHoursValue(metric?.hours),
                byDays: Array.isArray(metric?.by_days) ? metric.by_days : [],
            };
        }),
    };

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
            title={'\u0420\u0430\u0441\u0447\u0435\u0442\u043d\u044b\u0439 \u043b\u0438\u0441\u0442 \u043e\u0444\u0438\u0441'}
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
                                    placeholder={'\u0421\u043e\u0442\u0440\u0443\u0434\u043d\u0438\u043a'}
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
                                placeholder={'\u041c\u0435\u0441\u044f\u0446'}
                                style={{width: '150px'}}
                                options={prepareOptions(monthsOptions) ?? []}
                                value={selectedMonth}
                                onChange={setSelectedMonth}
                            />
                            <Select
                                placeholder={'\u0413\u043e\u0434'}
                                style={{width: '150px'}}
                                options={prepareOptions(yearsOptions) ?? []}
                                value={selectedYear}
                                onChange={setSelectedYear}
                            />
                        </div>
                        {canSelectUser && (
                            <Tooltip title={'\u041f\u043e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u043c\u0443 \u0433\u043e\u0434\u0443 \u0438 \u043c\u0435\u0441\u044f\u0446\u0443'}>
                                <Button
                                    className={'bill-list-export-button'}
                                    loading={isExportingAll}
                                    disabled={isExportingAll || isLoadingFilters || isLoadingBillList}
                                    onClick={handleExportAll}
                                >
                                    {'\u0412\u044b\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u043e \u0432\u0441\u0435\u043c'}
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
                                        {'\u0420\u0430\u0431\u043e\u0447\u0438\u0445 \u0434\u043d\u0435\u0439 \u0432 \u043c\u0435\u0441\u044f\u0446\u0435'}
                                    </div>
                                    <div className={'bill-list-summary-card-value'}>{summaryMeta.workDays}</div>
                                </div>
                                <div className={'bill-list-summary-card'}>
                                    <div className={'bill-list-summary-card-label'}>
                                        {'\u041d\u043e\u0440\u043c\u0430 \u0447\u0430\u0441\u043e\u0432'}
                                    </div>
                                    <div className={'bill-list-summary-card-value'}>{summaryMeta.normHours}</div>
                                </div>
                            </div>

                            <div className={'bill-list-summary-table'}>
                                <div className={'bill-list-summary-table-header'}>
                                    <div>{'\u041f\u043e\u043a\u0430\u0437\u0430\u0442\u0435\u043b\u044c'}</div>
                                    <div>{'\u0414\u043d\u0435\u0439'}</div>
                                    <div>{'\u0427\u0430\u0441\u043e\u0432'}</div>
                                </div>
                                {summaryMeta.rows.map((row) => (
                                    <div className={'bill-list-summary-table-row'} key={row.key}>
                                        <div>{row.label}</div>
                                        <div>{row.days}</div>
                                        <div>{row.hours}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Collapse
                            className={'bill-list-events-collapse'}
                            items={[
                                {
                                    key: 'by-days',
                                    label: '\u0421\u043e\u0431\u044b\u0442\u0438\u044f \u043f\u043e \u0434\u0430\u0442\u0430\u043c',
                                    children: (
                                        <div className={'table-by-days'}>
                                            {summaryMeta.rows.map((row) => (
                                                <div className={'table-by-days-row'} key={`days-${row.key}`}>
                                                    <div className={'label-cell'}>{row.label}</div>
                                                    <div className={'days-cell'}>
                                                        {row.byDays.length > 0 ? row.byDays.map((item) => (
                                                            <Tooltip title={item?.time ?? formatHoursValue(item?.hours)} key={`${row.key}-${item?.date ?? item?.day}`}>
                                                                <Tag color={row.color}>{item?.day ?? '—'}</Tag>
                                                            </Tooltip>
                                                        )) : '—'}
                                                    </div>
                                                </div>
                                            ))}
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
