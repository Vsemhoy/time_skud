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

    return {
        day: normalizeDayNumber(item, selectedMonth, selectedYear),
        enter,
        exit,
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
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month() + 1);
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const [billListInfo, setBillListInfo] = useState(null);
    const [attendanceInfo, setAttendanceInfo] = useState(null);

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
                fetchAttendanceInfo().then();
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
    const attendanceChartData = useMemo(() => {
        const daysCount = dayjs(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01`).daysInMonth();
        const days = Array.from({length: daysCount}, (_, index) => ({
            day: index + 1,
            enter: null,
            exit: null,
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
        });

        return days;
    }, [attendanceInfo, selectedMonth, selectedYear]);
    const scheduleBounds = useMemo(() => getScheduleBounds(attendanceInfo?.days ?? attendanceInfo), [attendanceInfo]);
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
        const scheduleBoundsPlugin = {
            id: 'billListScheduleBounds',
            afterDraw: (chart) => {
                const {ctx, chartArea, scales} = chart;
                const yScale = scales.y;
                const lines = [
                    {value: scheduleBounds.start, label: 'Начало графика'},
                    {value: scheduleBounds.end, label: 'Конец графика'},
                ].filter((item) => item.value !== null && item.value !== undefined);

                if (!lines.length) {
                    return;
                }

                ctx.save();
                ctx.setLineDash([6, 5]);
                ctx.lineWidth = 1.5;
                ctx.strokeStyle = scheduleLineColor;
                ctx.fillStyle = scheduleLineColor;
                ctx.font = '600 11px sans-serif';
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';

                lines.forEach((line) => {
                    const y = yScale.getPixelForValue(line.value);

                    ctx.beginPath();
                    ctx.moveTo(chartArea.left, y);
                    ctx.lineTo(chartArea.right, y);
                    ctx.stroke();
                    ctx.fillText(`${line.label} ${formatMinutesAsTime(line.value)}`, chartArea.right - 4, y - 3);
                });

                ctx.restore();
            },
        };

        const chart = new ChartJS(attendanceChartRef.current, {
            type: 'line',
            data: {
                labels: attendanceChartData.map((item) => item.day),
                datasets: [
                    {
                        label: 'Вход',
                        data: attendanceChartData.map((item) => item.enter),
                        borderColor: '#1677ff',
                        backgroundColor: '#1677ff',
                        spanGaps: true,
                        tension: 0.18,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                    },
                    {
                        label: 'Выход',
                        data: attendanceChartData.map((item) => item.exit),
                        borderColor: '#52c41a',
                        backgroundColor: '#52c41a',
                        spanGaps: true,
                        tension: 0.18,
                        pointRadius: 3,
                        pointHoverRadius: 5,
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
                        labels: {
                            color: textColor,
                            boxWidth: 10,
                            boxHeight: 10,
                        },
                    },
                    tooltip: {
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
                            color: mutedTextColor,
                            maxRotation: 0,
                            autoSkip: false,
                        },
                        title: {
                            display: true,
                            text: 'Дни месяца',
                            color: mutedTextColor,
                        },
                    },
                    y: {
                        min: 0,
                        max: 1440,
                        grid: {
                            color: gridColor,
                            drawTicks: false,
                        },
                        ticks: {
                            color: mutedTextColor,
                            stepSize: 120,
                            callback: (value) => formatMinutesAsTime(value),
                        },
                        title: {
                            display: true,
                            text: 'Время за день',
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
    }, [attendanceChartData, attendanceInfo, isLoadingBillList, isLoadingAttendance, scheduleBounds]);

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
                        <div className={'bill-list-attendance-chart'}>
                            <div className={'bill-list-attendance-chart-title'}>График входов и выходов за месяц</div>
                            <Spin spinning={isLoadingAttendance}>
                                <div className={'bill-list-attendance-chart-canvas'}>
                                    <canvas ref={attendanceChartRef}/>
                                </div>
                            </Spin>
                            {!isLoadingAttendance && attendanceInfo && !hasAttendanceChartPoints && (
                                <div className={'bill-list-attendance-chart-empty'}>Нет данных входов и выходов за выбранный месяц</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
}

export default BillListModal;
