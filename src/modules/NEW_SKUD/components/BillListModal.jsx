import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button, Collapse, Modal, Select, Skeleton, Spin, Tag, Tooltip} from "antd";
import './style/bill_list_modal.css'
import {CSRF_TOKEN, ROUTE_PREFIX} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import dayjs from "dayjs";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Tooltip as ChartTooltip,
} from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, ChartTooltip);

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

const MONTH_NAMES_RU = [
    '',
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
];

const WEEKDAY_SHORT_NAMES_RU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

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
const BILL_LIST_FILTERS_ONLY_DEPARTMENT_IDS = [17, 18];
const BILL_LIST_EMPLOYEE_GROUP_OPTIONS = [
    {id: 'office', name: 'Офис'},
    {id: 'kpp', name: 'КПП'},
    {id: 'builders', name: 'Строители'},
];

const isTruthyFlag = (value) => value === true || value === 1 || value === '1';

const hasFullUserSelectAccess = (userdata) => (
    isTruthyFlag(userdata?.user?.super)
    || isTruthyFlag(userdata?.user?.is_admin)
    || Number(userdata?.user?.sales_role) === 3
    || (Array.isArray(userdata?.acls) && userdata.acls.some((acl) => Number(acl) === BILL_LIST_USER_SELECT_ACL))
);

const hasEmployeeGroupFilterAccess = (userdata) => (
    isTruthyFlag(userdata?.user?.super)
    || isTruthyFlag(userdata?.user?.is_admin)
    || Number(userdata?.user?.sales_role) === 3
);

const getUserDepartmentId = (user) => (
    user?.department_id
    ?? user?.department
    ?? user?.depart_id
    ?? user?.id_department
    ?? user?.department?.id
);

const isBillListFiltersOnlyUser = (user) => (
    BILL_LIST_FILTERS_ONLY_DEPARTMENT_IDS.includes(Number(getUserDepartmentId(user)))
);

const getBillListStatsRoute = (user) => {
    const departmentId = Number(getUserDepartmentId(user));

    if (departmentId === 18) {
        return `${ROUTE_PREFIX}/timeskud/employee-builder-month-stats`;
    }

    if (departmentId === 17) {
        return `${ROUTE_PREFIX}/timeskud/employee-kpp-month-stats`;
    }

    return `${ROUTE_PREFIX}/timeskud/employee-month-stats`;
};

const isUserInEmployeeGroup = (user, group) => {
    const departmentId = Number(getUserDepartmentId(user));

    if (group === 'kpp') {
        return departmentId === 17;
    }

    if (group === 'builders') {
        return departmentId === 18;
    }

    return !BILL_LIST_FILTERS_ONLY_DEPARTMENT_IDS.includes(departmentId);
};

const getUserId = (user) => user?.id ?? user?.user_id;

const getUserFullName = (user) => (
    `${user?.surname ?? ''} ${user?.name ?? ''} ${user?.patronymic ?? user?.secondname ?? ''}`.trim()
);

const prepareUserOption = (user) => ({
    id: getUserId(user),
    name: getUserFullName(user) || `#${getUserId(user)}`,
    department_id: getUserDepartmentId(user),
});

const findSelectedUser = (selectedUserId, userList, usersOptions, currentUser) => {
    if (!selectedUserId) {
        return null;
    }

    return [
        ...(Array.isArray(userList) ? userList : []),
        ...(Array.isArray(usersOptions) ? usersOptions : []),
        currentUser,
    ].find((user) => Number(getUserId(user)) === Number(selectedUserId)) ?? null;
};

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

const getTimeValue = (source, keys) => keys
    .map((key) => source?.[key])
    .find((value) => value !== null && value !== undefined && value !== '');

const parseTimeToMinutes = (value) => {
    if (value === null || value === undefined || value === '') {
        return null;
    }

    if (typeof value === 'number') {
        return value > 1440 ? Math.round(value / 60) : value;
    }

    const stringValue = String(value).trim();
    const timeMatch = stringValue.match(/(\d{1,2}):(\d{2})(?::\d{2})?/);

    if (timeMatch) {
        return (Number(timeMatch[1]) * 60) + Number(timeMatch[2]);
    }

    const dateValue = dayjs(stringValue);

    return dateValue.isValid() ? (dateValue.hour() * 60) + dateValue.minute() : null;
};

const parseScheduleSecondsToMinutes = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return parseTimeToMinutes(value);
    }

    return Math.round(numericValue / 60);
};

const formatMinutesAsTime = (value) => {
    if (value === null || value === undefined) {
        return '';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const formatAxisMinutesAsTime = (value) => {
    if (value === null || value === undefined) {
        return '';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}`;
};

const getFirstPresentValue = (source, keys) => keys
    .map((key) => getValueByPath(source, key))
    .find((value) => value !== null && value !== undefined && value !== '');

const formatAttendanceDayLabel = (day, selectedMonth, selectedYear) => {
    const date = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

    return [String(day), WEEKDAY_SHORT_NAMES_RU[date.day()]];
};

const normalizeDayNumber = (item, selectedMonth, selectedYear) => {
    const rawDate = item?.date ?? item?.day_date ?? item?.datetime ?? item?.t;

    if (rawDate) {
        const parsedDate = dayjs(rawDate);

        if (
            parsedDate.isValid()
            && parsedDate.month() + 1 === Number(selectedMonth)
            && parsedDate.year() === Number(selectedYear)
        ) {
            return parsedDate.date();
        }
    }

    const rawDay = Number(item?.day);

    return Number.isInteger(rawDay) && rawDay > 0 ? rawDay : null;
};

const parseEventDump = (value) => {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    if (typeof value === 'string') {
        try {
            const parsedValue = JSON.parse(value);
            return Array.isArray(parsedValue) ? parsedValue : [];
        } catch (e) {
            return [];
        }
    }

    return [];
};

const getDayEnterExit = (item, selectedMonth, selectedYear) => {
    let enter = parseTimeToMinutes(getTimeValue(item, [
        'enter',
        'entry',
        'in',
        'enter_time',
        'first_enter',
        'first_in',
        'first_enter_time',
    ]));
    let exit = parseTimeToMinutes(getTimeValue(item, [
        'exit',
        'out',
        'exit_time',
        'last_exit',
        'last_out',
        'last_exit_time',
    ]));

    const singleEventTime = parseTimeToMinutes(item?.time ?? item?.datetime_moscow ?? item?.datetime ?? item?.datetime_contr ?? item?.t);
    const singleEventDirection = Number(item?.direction ?? item?.diraction ?? item?.d);
    const eventDump = [
        ...(singleEventTime !== null && !Number.isNaN(singleEventDirection)
            ? [{...item, t: item?.t ?? item?.time ?? item?.datetime_moscow ?? item?.datetime ?? item?.datetime_contr}]
            : []),
        ...parseEventDump(item?.event_dump ?? item?.enter_exit ?? item?.events),
    ];

    eventDump.forEach((event) => {
        const direction = Number(event?.direction ?? event?.diraction ?? event?.d);
        const eventTime = parseTimeToMinutes(event?.time ?? event?.datetime_moscow ?? event?.datetime ?? event?.datetime_contr ?? event?.t);

        if (eventTime === null) {
            return;
        }

        if (direction === 0) {
            enter = enter === null ? eventTime : Math.min(enter, eventTime);
        } else {
            exit = exit === null ? eventTime : Math.max(exit, eventTime);
        }
    });

    // The endpoint returns the applicable schedule for each individual day.
    // Text fields are preferred because numeric values are stored in seconds.
    const schedule = item?.schedule?.skud_schedule ?? item?.skud_schedule ?? item?.schedule ?? {};
    const scheduleStart = parseScheduleSecondsToMinutes(getTimeValue(schedule, [
        'start_time_text',
        'start_time',
        'work_start_time',
        'day_start_time',
    ]));
    const scheduleEnd = parseScheduleSecondsToMinutes(getTimeValue(schedule, [
        'end_time_text',
        'end_time',
        'work_end_time',
        'day_end_time',
    ]));

    return {
        day: normalizeDayNumber(item, selectedMonth, selectedYear),
        enter,
        exit,
        scheduleStart,
        scheduleEnd,
        isWorkday: item?.schedule?.is_workday ?? schedule?.is_workday ?? item?.is_workday ?? null,
    };
};

const mapAttendanceResponseDays = (days, selectedMonth, selectedYear) => {
    if (!Array.isArray(days)) {
        return [];
    }

    return days
        .map((item) => getDayEnterExit(item, selectedMonth, selectedYear))
        .filter((item) => item.day);
};

const collectAttendanceDays = (source, selectedMonth, selectedYear) => {
    const result = [];
    const seen = new Set();

    const walk = (value) => {
        if (!value || typeof value !== 'object' || seen.has(value)) {
            return;
        }

        seen.add(value);

        if (Array.isArray(value)) {
            value.forEach(walk);
            return;
        }

        const dayInfo = getDayEnterExit(value, selectedMonth, selectedYear);

        if (dayInfo.day && (dayInfo.enter !== null || dayInfo.exit !== null)) {
            result.push(dayInfo);
        }

        Object.values(value).forEach(walk);
    };

    walk(source);

    return result;
};

const getScheduleBounds = (source) => {
    const seen = new Set();
    let scheduleStart = null;
    let scheduleEnd = null;

    const readScheduleValue = (value, keys) => parseScheduleSecondsToMinutes(getTimeValue(value, keys));

    const walk = (value) => {
        if (!value || typeof value !== 'object' || seen.has(value) || (scheduleStart !== null && scheduleEnd !== null)) {
            return;
        }

        seen.add(value);

        if (Array.isArray(value)) {
            value.forEach(walk);
            return;
        }

        const nextStart = readScheduleValue(value, [
            'schedule_start_time',
            'work_start_time',
            'day_start_time',
            'start_time',
        ]);
        const nextEnd = readScheduleValue(value, [
            'schedule_end_time',
            'work_end_time',
            'day_end_time',
            'end_time',
        ]);

        if (nextStart !== null && nextEnd !== null && nextStart !== nextEnd) {
            scheduleStart = nextStart;
            scheduleEnd = nextEnd;
            return;
        }

        Object.entries(value).forEach(([key, childValue]) => {
            const normalizedKey = key.toLowerCase();

            if (
                normalizedKey.includes('schedule')
                || normalizedKey.includes('calendar')
                || normalizedKey.includes('work')
            ) {
                walk(childValue);
            }
        });
    };

    walk(source);

    return {
        start: scheduleStart,
        end: scheduleEnd,
    };
};

const BillListModal = (props) => {
    const [isLoadingFilters, setIsLoadingFilters] = useState(false);
    const [isLoadingBillList, setIsLoadingBillList] = useState(false);
    const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
    const [isExportingAll, setIsExportingAll] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const billListRequestRef = useRef(0);
    const attendanceRequestRef = useRef(0);
    const attendanceChartRef = useRef(null);

    const [usersOptions, setUsersOptions] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedEmployeeGroup, setSelectedEmployeeGroup] = useState('office');
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const [billListInfo, setBillListInfo] = useState(null);
    const [attendanceInfo, setAttendanceInfo] = useState(null);

    const canSelectAllUsers = hasFullUserSelectAccess(props.userdata);
    const selectedUserInfo = findSelectedUser(selectedUser, props.user_list, usersOptions, props.userdata?.user);
    const usesSpecialBillListEndpoint = isBillListFiltersOnlyUser(selectedUserInfo);
    const isSelectedKppUser = Number(getUserDepartmentId(selectedUserInfo)) === 17;
    const shouldUseWorkLabels = usesSpecialBillListEndpoint;
    const subordinateUsersOptions = useMemo(
        () => getSubordinateUsersOptions(props.user_list, props.userdata?.user),
        [props.user_list, props.userdata?.user]
    );
    const canSelectUser = canSelectAllUsers || subordinateUsersOptions.length > 1;
    const canFilterEmployeeGroup = canSelectUser && hasEmployeeGroupFilterAccess(props.userdata);
    const filteredUsersOptions = useMemo(() => (
        canFilterEmployeeGroup
            ? (usersOptions ?? []).filter((user) => isUserInEmployeeGroup(user, selectedEmployeeGroup))
            : usersOptions
    ), [canFilterEmployeeGroup, selectedEmployeeGroup, usersOptions]);
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
        if (!canFilterEmployeeGroup || !Array.isArray(filteredUsersOptions) || filteredUsersOptions.length === 0) {
            return;
        }

        if (!filteredUsersOptions.some((user) => Number(user.id) === Number(selectedUser))) {
            setSelectedUser(filteredUsersOptions[0].id);
        }
    }, [canFilterEmployeeGroup, filteredUsersOptions, selectedUser]);

    useEffect(() => {
        if (isMounted && selectedUser && selectedMonth && selectedYear) {
            const timer = setTimeout(() => {
                fetchBillListInfo().then();
                if (usesSpecialBillListEndpoint) {
                    setAttendanceInfo(null);
                    setIsLoadingAttendance(false);
                } else {
                    fetchAttendanceInfo().then();
                }
            }, 200);

            return () => clearTimeout(timer);
        }
    }, [isMounted, selectedUser, selectedMonth, selectedYear, usesSpecialBillListEndpoint]);

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

            const response = await PROD_AXIOS_INSTANCE.post(getBillListStatsRoute(selectedUserInfo), {
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

    const formatMoneyValue = (value) => {
        if (value === null || value === undefined || value === '') {
            return 'вЂ”';
        }

        const numericValue = Number(value);

        if (Number.isNaN(numericValue)) {
            return String(value);
        }

        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
            maximumFractionDigits: 2,
        }).format(numericValue);
    };

    const fetchAttendanceInfo = async () => {
        const requestId = attendanceRequestRef.current + 1;
        attendanceRequestRef.current = requestId;

        try {
            setIsLoadingAttendance(true);
            setAttendanceInfo(null);

            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/employee-month-attendance`, {
                data: {
                    user_id: selectedUser,
                    month: selectedMonth,
                    year: selectedYear,
                }
            });

            if (requestId === attendanceRequestRef.current) {
                setAttendanceInfo(response?.data?.content ?? response?.data ?? null);
            }
        } catch (e) {
            console.log(e);
            if (requestId === attendanceRequestRef.current) {
                setAttendanceInfo(null);
            }
        } finally {
            if (requestId === attendanceRequestRef.current) {
                setIsLoadingAttendance(false);
            }
        }
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
                label: row.key === 'office' && shouldUseWorkLabels ? 'Работа' : row.label,
                eventLabel: row.key === 'office' && shouldUseWorkLabels ? 'Рабочие дни' : row.label,
                days: formatDaysValue(metric?.days),
                hours: formatMetricTimeValue(metric),
                rateSum: formatMoneyValue(metric?.rate_sum),
                byDays: Array.isArray(metric?.by_days) ? metric.by_days : [],
                hasData: hasMetricData(metric),
            };
        })
        .filter((row) => row.hasData);

    const summaryMeta = {
        workDays: usesSpecialBillListEndpoint
            ? formatDaysValue(billListInfo?.worked_days_total)
            : formatDaysValue(billListInfo?.calendar_info?.days),
        normHours: usesSpecialBillListEndpoint
            ? formatHoursValue(billListInfo?.worked_hours_total)
            : formatMetricTimeValue(billListInfo?.calendar_info),
        bet: formatMoneyValue(billListInfo?.rate?.bet),
        moneyTotal: formatMoneyValue(getFirstPresentValue(billListInfo, [
            'total',
            'alltotal',
            'worked.rate_sum',
            'office.rate_sum',
            'rate_sum_total',
        ])),
        rows: summaryRows,
    };
    const bankPaymentRows = Array.isArray(billListInfo?.oplatanabankday)
        ? billListInfo.oplatanabankday
        : [];
    const bankPaymentRemainder = bankPaymentRows.at(-1)?.is_remainder ? bankPaymentRows.at(-1) : null;
    const visibleBankPaymentRows = bankPaymentRemainder ? bankPaymentRows.slice(0, -1) : bankPaymentRows;
    const eventRows = summaryMeta.rows.filter((row) => row.byDays.length > 0);
    const attendanceChartData = useMemo(() => {
        const selectedMonthDate = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`);
        const today = dayjs();
        const todayDay = selectedMonthDate.isSame(today, 'month') ? today.date() : null;
        const daysCount = selectedMonthDate.daysInMonth();
        const days = Array.from({length: daysCount}, (_, index) => ({
            day: index + 1,
            enter: null,
            exit: null,
            scheduleStart: null,
            scheduleEnd: null,
            isWorkday: ![0, 6].includes(dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`).day()),
        }));

        const attendanceDays = Array.isArray(attendanceInfo?.days)
            ? mapAttendanceResponseDays(attendanceInfo.days, selectedMonth, selectedYear)
            : collectAttendanceDays(attendanceInfo, selectedMonth, selectedYear);

        attendanceDays.forEach((item) => {
            const targetDay = days[item.day - 1];

            if (!targetDay) {
                return;
            }

            if (item.enter !== null) {
                targetDay.enter = targetDay.enter === null ? item.enter : Math.min(targetDay.enter, item.enter);
            }

            if (item.exit !== null) {
                targetDay.exit = targetDay.exit === null ? item.exit : Math.max(targetDay.exit, item.exit);
            }

            if (item.scheduleStart !== null) {
                targetDay.scheduleStart = item.scheduleStart;
            }

            if (item.scheduleEnd !== null) {
                targetDay.scheduleEnd = item.scheduleEnd;
            }

            if (item.isWorkday !== null && item.isWorkday !== undefined) {
                targetDay.isWorkday = Boolean(item.isWorkday);
            }
        });

        if (todayDay) {
            days[todayDay - 1].exit = null;
        }

        return days;
    }, [attendanceInfo, selectedMonth, selectedYear]);
    const hasAttendanceChartPoints = attendanceChartData.some((item) => item.enter !== null || item.exit !== null);

    useEffect(() => {
        if (!attendanceChartRef.current || isLoadingBillList || isLoadingAttendance || !attendanceInfo) {
            return undefined;
        }

        const textColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--app-text-color')
            .trim() || '#1f1f1f';
        const mutedTextColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--app-muted-text-color')
            .trim() || '#6b7280';
        const gridColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--table-border-divider-color')
            .trim() || 'rgba(128, 128, 128, 0.22)';
        const scheduleLineColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--icon-color-std')
            .trim() || '#595959';
        const violationColor = '#cf1322';
        const enterColor = '#1677ff';
        const exitColor = '#52c41a';
        const isLateEnter = (item) => (
            item?.isWorkday !== false
            && item?.enter !== null
            && item?.scheduleStart !== null
            && item.enter > item.scheduleStart
        );
        const isEarlyExit = (item) => (
            item?.isWorkday !== false
            && item?.exit !== null
            && item?.scheduleEnd !== null
            && item.exit < item.scheduleEnd
        );
        const segmentTouchesLateEnter = (context) => (
            isLateEnter(attendanceChartData[context.p0DataIndex])
            || isLateEnter(attendanceChartData[context.p1DataIndex])
        );
        const segmentTouchesEarlyExit = (context) => (
            isEarlyExit(attendanceChartData[context.p0DataIndex])
            || isEarlyExit(attendanceChartData[context.p1DataIndex])
        );
        const scheduleBoundsPlugin = {
            id: 'billListScheduleBounds',
            afterDraw: (chart) => {
                const {ctx, chartArea, scales} = chart;
                const yScale = scales.y;
                const xScale = scales.x;

                ctx.save();
                ctx.setLineDash([18, 12]);
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = scheduleLineColor;
                ctx.fillStyle = scheduleLineColor;
                ctx.font = '600 11px sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';

                [
                    {key: 'scheduleStart', label: 'Начало рабочего дня'},
                    {key: 'scheduleEnd', label: 'Окончание рабочего дня'},
                ].forEach(({key, label}) => {
                    let segmentStart = null;

                    attendanceChartData.forEach((day, index) => {
                        const value = day[key];
                        const previousValue = index > 0 ? attendanceChartData[index - 1][key] : null;
                        const nextValue = index < attendanceChartData.length - 1 ? attendanceChartData[index + 1][key] : null;

                        if (value !== null && value !== undefined && value !== previousValue) {
                            segmentStart = index;
                        }

                        if (segmentStart === null || value === null || value === undefined || value === nextValue) {
                            return;
                        }

                        const firstX = xScale.getPixelForValue(segmentStart);
                        const lastX = xScale.getPixelForValue(index);
                        const startX = segmentStart === 0
                            ? chartArea.left
                            : (xScale.getPixelForValue(segmentStart - 1) + firstX) / 2;
                        const endX = index === attendanceChartData.length - 1
                            ? chartArea.right
                            : (lastX + xScale.getPixelForValue(index + 1)) / 2;
                        const y = yScale.getPixelForValue(value);

                        ctx.beginPath();
                        ctx.moveTo(startX, y);
                        ctx.lineTo(endX, y);
                        ctx.stroke();
                        ctx.fillText(`${label} ${formatAxisMinutesAsTime(value)}`, endX - 4, y - 3);
                        segmentStart = null;
                    });
                });

                ctx.restore();
            },
        };

        const chart = new ChartJS(attendanceChartRef.current, {
            type: 'line',
            data: {
                labels: attendanceChartData.map((item) => formatAttendanceDayLabel(item.day, selectedMonth, selectedYear)),
                datasets: [
                    {
                        label: 'начало рабочего дня',
                        data: attendanceChartData.map((item) => item.scheduleStart),
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        borderWidth: 0,
                    },
                    {
                        label: 'окончание рабочего дня',
                        data: attendanceChartData.map((item) => item.scheduleEnd),
                        borderColor: 'transparent',
                        backgroundColor: 'transparent',
                        pointRadius: 0,
                        pointHoverRadius: 0,
                        borderWidth: 0,
                    },
                    {
                        label: 'Вход',
                        data: attendanceChartData.map((item) => item.enter),
                        segment: {
                            borderColor: (context) => segmentTouchesLateEnter(context) ? violationColor : enterColor,
                        },
                        borderColor: enterColor,
                        backgroundColor: enterColor,
                        spanGaps: true,
                        tension: 0.18,
                        pointRadius: (context) => isLateEnter(attendanceChartData[context.dataIndex]) ? 4 : 3,
                        pointBackgroundColor: (context) => isLateEnter(attendanceChartData[context.dataIndex]) ? violationColor : enterColor,
                        pointBorderColor: (context) => isLateEnter(attendanceChartData[context.dataIndex]) ? violationColor : enterColor,
                        pointHoverRadius: (context) => isLateEnter(attendanceChartData[context.dataIndex]) ? 6 : 5,
                    },
                    {
                        label: 'Выход',
                        data: attendanceChartData.map((item) => item.exit),
                        segment: {
                            borderColor: (context) => segmentTouchesEarlyExit(context) ? violationColor : exitColor,
                        },
                        borderColor: exitColor,
                        backgroundColor: exitColor,
                        spanGaps: true,
                        tension: 0.18,
                        pointRadius: (context) => isEarlyExit(attendanceChartData[context.dataIndex]) ? 4 : 3,
                        pointBackgroundColor: (context) => isEarlyExit(attendanceChartData[context.dataIndex]) ? violationColor : exitColor,
                        pointBorderColor: (context) => isEarlyExit(attendanceChartData[context.dataIndex]) ? violationColor : exitColor,
                        pointHoverRadius: (context) => isEarlyExit(attendanceChartData[context.dataIndex]) ? 6 : 5,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        filter: (item) => ![
                            'начало рабочего дня',
                            'окончание рабочего дня',
                        ].includes(item.text),
                        labels: {
                            color: textColor,
                            boxWidth: 10,
                            boxHeight: 10,
                        },
                    },
                    tooltip: {
                        filter: (context) => ['Вход', 'Выход'].includes(context.dataset.label),
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${formatMinutesAsTime(context.parsed.y)}`,
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {
                            color: gridColor,
                            drawTicks: false,
                        },
                        ticks: {
                            color: (context) => attendanceChartData[context.index]?.isWorkday === false ? '#cf1322' : mutedTextColor,
                            maxRotation: 0,
                            autoSkip: false,
                        },
                        title: {
                            display: false,
                            text: 'Даты',
                            color: mutedTextColor,
                        },
                    },
                    y: {
                        min: 420,
                        max: 1320,
                        grid: {
                            color: gridColor,
                            drawTicks: false,
                        },
                        ticks: {
                            color: mutedTextColor,
                            stepSize: 60,
                            autoSkip: false,
                            callback: (value) => formatAxisMinutesAsTime(value),
                        },
                        title: {
                            display: false,
                            text: '',
                            color: mutedTextColor,
                        },
                    },
                },
            },
            plugins: [scheduleBoundsPlugin],
        });

        return () => {
            chart.destroy();
        };
    }, [attendanceChartData, attendanceInfo, isLoadingBillList, isLoadingAttendance]);

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
            title={'Расчетный лист'}
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
                                    options={prepareOptions(filteredUsersOptions) ?? []}
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
                            {canFilterEmployeeGroup && (
                                <Select
                                    placeholder={'Группа'}
                                    style={{width: '150px'}}
                                    options={prepareOptions(BILL_LIST_EMPLOYEE_GROUP_OPTIONS) ?? []}
                                    value={selectedEmployeeGroup}
                                    onChange={setSelectedEmployeeGroup}
                                />
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
                        {canSelectUser && !usesSpecialBillListEndpoint && (
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
                            <div className={`bill-list-summary-cards ${usesSpecialBillListEndpoint ? 'bill-list-summary-cards--special bill-list-summary-cards--four' : ''}`}>
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
                                    {usesSpecialBillListEndpoint && (
                                        <div className={'bill-list-summary-card-label'}>{'Рабочих часов в месяц'}</div>
                                    )}
                                    <div className={'bill-list-summary-card-value'}>{summaryMeta.normHours}</div>
                                </div>
                                {usesSpecialBillListEndpoint && (
                                    <div className={'bill-list-summary-card'}>
                                        <div className={'bill-list-summary-card-label'}>{'Ставка'}</div>
                                        <div className={'bill-list-summary-card-value'}>{summaryMeta.bet}</div>
                                    </div>
                                )}
                                {usesSpecialBillListEndpoint && (
                                    <div className={'bill-list-summary-card'}>
                                        <div className={'bill-list-summary-card-label'}>{'Сумма'}</div>
                                        <div className={'bill-list-summary-card-value'}>{summaryMeta.moneyTotal}</div>
                                    </div>
                                )}
                            </div>

                            <div className={`bill-list-summary-table ${usesSpecialBillListEndpoint ? 'bill-list-summary-table--with-money' : ''}`}>
                                <div className={'bill-list-summary-table-header'}>
                                    <div>{'Показатель'}</div>
                                    <div>{'Дней'}</div>
                                    <div>{'Часов'}</div>
                                    {usesSpecialBillListEndpoint && <div>{'₽'}</div>}
                                </div>
                                {summaryMeta.rows.map((row) => {
                                    const rowContent = (
                                        <div className={`bill-list-summary-table-row ${row.danger ? 'bill-list-summary-table-row--danger' : ''}`}>
                                            <div>{row.label}</div>
                                            <div>{row.days}</div>
                                            <div>{row.hours}</div>
                                            {usesSpecialBillListEndpoint && <div>{row.rateSum}</div>}
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
                            {bankPaymentRows.length > 0 && (
                                <div className={'bill-list-summary-table bill-list-bank-payments'}>
                                    <div className={'bill-list-bank-payments-title'}>{'Выплаты на банковскую карту'}</div>
                                    <div className={'bill-list-summary-table-header'}>
                                        <div>{'Дата'}</div>
                                        <div>{'₽'}</div>
                                    </div>
                                    {visibleBankPaymentRows.map((payment, index) => (
                                        <div className={'bill-list-summary-table-row'} key={`${payment?.date_unix ?? payment?.date ?? index}-${index}`}>
                                            <div>{payment?.date_text ?? payment?.day ?? payment?.date_time ?? 'вЂ”'}</div>
                                            <div>{formatMoneyValue(payment?.sum)}</div>
                                        </div>
                                    ))}
                                    <div className={'bill-list-summary-table-row bill-list-summary-table-row--total'}>
                                        <div>{'К выплате'}</div>
                                        <div>{formatMoneyValue(bankPaymentRemainder?.sum)}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Collapse
                            className={'bill-list-events-collapse'}
                            defaultActiveKey={['by-days']}
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
                                                        ) : (row.eventLabel ?? row.label)}
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
                        {!usesSpecialBillListEndpoint && (
                        <div className={'bill-list-attendance-chart'}>
                            <div className={'bill-list-attendance-chart-title'}>Рабочий график за {MONTH_NAMES_RU[selectedMonth] ?? ''}</div>
                            <Spin spinning={isLoadingAttendance}>
                                <div className={'bill-list-attendance-chart-canvas'}>
                                    <canvas ref={attendanceChartRef}/>
                                </div>
                            </Spin>
                            {!isLoadingAttendance && attendanceInfo && !hasAttendanceChartPoints && (
                                <div className={'bill-list-attendance-chart-empty'}>Нет данных входов и выходов за выбранный месяц</div>
                            )}
                        </div>
                        )}
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default BillListModal;
