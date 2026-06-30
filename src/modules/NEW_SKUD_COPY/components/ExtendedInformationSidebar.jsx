import React, { useEffect, useState } from "react";
import UserlistEventDumpCard from "./UserlistEventDumpCard";
import {Affix, Alert, Button, Drawer, Empty, Skeleton, Spin, Tag, Tooltip} from "antd";

import dayjs from "dayjs";
import {
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip as ChartTooltip,
} from "chart.js";
import { formatMoscowDateTime, formatMoscowUnix, moscowDateTime } from "../../../components/Helpers/DateTimeHelpers";
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";
import {CSRF_TOKEN, PRODMODE, ROUTE_PREFIX} from "../../../CONFIG/config"
import { PROD_AXIOS_INSTANCE } from "../../../API/API";
import { LIST_SCHED_N_RULES_RESPONSE } from "../../../CONFIG/DEFAULTSTATE";
import UmScheduleMiniCard from "./UmScheduleMiniCard";
import StateIconsController from "../../CHARTS/components/StateIconsController";
import UserStatusLucideIconsController, { hasUserStatusLucideIcon, hasUserStatusLucideIconName } from "../../CHARTS/components/UserStatusLucideIconsController";
import {
    DownOutlined, UpOutlined,
    BarChartOutlined, IssuesCloseOutlined, RobotOutlined,
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined,
    GlobalOutlined, CloseOutlined, IdcardOutlined,
    FileWordOutlined, DownloadOutlined, PrinterOutlined,
    ScheduleOutlined, BellOutlined
} from "@ant-design/icons";

ChartJS.register(BarController, BarElement, CategoryScale, LinearScale, ChartTooltip);

const iconMap = {
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined,
    GlobalOutlined
};

const DynamicIcon = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
};

const getUserStatusId = (data) => {
    const currentState = Number(data?.current_state);
    const localState = Number(data?.local_state);
    const globalState = Number(data?.global_state);

    if (Number.isFinite(currentState) && currentState !== 0) {
        return currentState;
    }

    if (Number.isFinite(localState) && localState !== 0) {
        return localState;
    }

    if (Number.isFinite(globalState) && globalState !== 0) {
        return globalState;
    }

    return 0;
};

const getStatusIcon = (data) => {
    const statusId = getUserStatusId(data);

    if (hasUserStatusLucideIconName(data?.state_icon)) {
        return <UserStatusLucideIconsController IconName={data.state_icon} size={14} strokeWidth={2.2} />;
    }

    if (hasUserStatusLucideIcon(statusId)) {
        return <UserStatusLucideIconsController IdState={statusId} size={14} strokeWidth={2.2} />;
    }

    return <DynamicIcon iconName={data?.state_icon} />;
};

const getMutedDrawerAccent = (color) => {
    if (!color || typeof document === 'undefined') {
        return color;
    }

    if (!document.documentElement.classList.contains('sk-theme-dark')) {
        return color;
    }

    return `color-mix(in srgb, ${color} 38%, var(--app-surface-color))`;
};

const parseEnterExitData = (data) => {
    if (!data) {
        return [];
    }

    if (Array.isArray(data)) {
        return data;
    }

    if (typeof data === 'string') {
        try {
            const parsedData = JSON.parse(data);
            return Array.isArray(parsedData) ? parsedData : [];
        } catch (e) {
            return [];
        }
    }

    return [];
};

const getEventDirection = (event) => Number(event?.direction ?? event?.diraction ?? event?.d);
const getEventTime = (event) => event?.time ?? event?.datetime ?? event?.datetime_contr ?? event?.t;

const getEnterExitTimes = (user) => {
    const hasEnterExitField = Object.prototype.hasOwnProperty.call(user ?? {}, 'enter_exit');
    const rawEnterExitData = hasEnterExitField ? user?.enter_exit : user?.event_dump;
    const enterExitData = parseEnterExitData(rawEnterExitData);
    const result = {
        enter: null,
        exit: null,
        shouldHideExitTime: false,
    };

    for (let index = 0; index < enterExitData.length; index += 1) {
        const event = enterExitData[index];
        const direction = getEventDirection(event);
        const eventTime = getEventTime(event);

        if (!eventTime || Number.isNaN(direction)) {
            continue;
        }

        if (direction === 0) {
            const currentEnter = result.enter ? moscowDateTime(result.enter) : null;
            const nextEnter = moscowDateTime(eventTime);

            if (!result.enter || (nextEnter.isValid() && currentEnter?.isValid() && nextEnter.isBefore(currentEnter))) {
                result.enter = eventTime;
            }
        }

        if (direction !== 0) {
            const currentExit = result.exit ? moscowDateTime(result.exit) : null;
            const nextExit = moscowDateTime(eventTime);

            if (!result.exit || (nextExit.isValid() && currentExit?.isValid() && nextExit.isAfter(currentExit))) {
                result.exit = eventTime;
            }
        }
    }

    if (enterExitData.length > 0) {
        result.shouldHideExitTime = getEventDirection(enterExitData[enterExitData.length - 1]) === 0;
    }

    return {
        enter: hasEnterExitField ? result.enter : result.enter ?? user?.enter_time,
        exit: hasEnterExitField ? result.exit : result.exit ?? user?.exit_time,
        shouldHideExitTime: result.shouldHideExitTime,
    };
};

const getEmployeePresenceClassName = (user) => {
    const { enter, exit, shouldHideExitTime } = getEnterExitTimes(user);
    const hasEnter = Boolean(enter);
    const hasExit = Boolean(exit);
    const enterMoment = enter ? moscowDateTime(enter) : null;
    const exitMoment = exit ? moscowDateTime(exit) : null;

    if (!hasEnter) {
        return 'sk-userlist-details-card--absent';
    }

    if (!hasExit || shouldHideExitTime || (enterMoment?.isValid?.() && exitMoment?.isValid?.() && enterMoment.isAfter(exitMoment))) {
        return 'sk-userlist-details-card--office';
    }

    return 'sk-userlist-details-card--left';
};

const getClaimApprovalState = (claim) => claim?.state ?? claim?.is_approved ?? claim?.approved;

const isClaimPendingApproval = (claim) => {
    const needApproved = Number(claim?.need_approved ?? claim?.skud_current_state?.need_approved ?? 0);
    const approvalState = getClaimApprovalState(claim);

    if ([1, 2, 3, -1].includes(Number(approvalState))) {
        return false;
    }

    return needApproved === 1 || Number(approvalState) === 0;
};

const isVacationClaim = (claim) => {
    const claimTypeId = Number(claim?.skud_current_state_id ?? claim?.skud_current_state?.id);
    const claimText = [
        claim?.skud_current_state?.name,
        claim?.skud_current_state?.badge,
        claim?.skud_current_state?.title,
        claim?.skud_current_state?.text,
        claim?.state_name,
        claim?.state_badge,
        claim?.state_title,
        claim?.state_text,
        claim?.badge,
        claim?.title,
        claim?.text,
    ].filter(Boolean).join(' ').toLowerCase();

    if (
        claimTypeId === 9
        || claimText.includes('за свой')
        || claimText.includes('свой сч')
        || claimText.includes('свой счет')
        || claimText.includes('свой счёт')
        || claimText.includes('неоплач')
        || claimText.includes('св.отпуск')
    ) {
        return false;
    }

    return claimTypeId === 10 || claimText.includes('плановый отпуск') || claimText.includes('очередные отпуска');
};

const isClaimInMonth = (claim, monthSource) => {
    const monthDate = moscowDateTime(monthSource || dayjs());
    const start = moscowDateTime(claim?.start);
    const end = moscowDateTime(claim?.end ?? claim?.start);

    if (!monthDate?.isValid?.() || !start?.isValid?.()) {
        return false;
    }

    const monthStart = monthDate.startOf('month');
    const monthEnd = monthDate.endOf('month');
    const claimEnd = end?.isValid?.() ? end : start;

    return start.isBefore(monthEnd) && claimEnd.isAfter(monthStart);
};

const COMPANY_LOGOS = [
    { key: 'arstel', src: '/company-logos/arstel.svg', className: 'sk-userlist-company-logo--arstel' },
    { key: 'арстел', src: '/company-logos/arstel.svg', className: 'sk-userlist-company-logo--arstel' },
    { key: 'rondo', src: '/company-logos/rondo.svg', className: 'sk-userlist-company-logo--rondo' },
    { key: 'рондо', src: '/company-logos/rondo.svg', className: 'sk-userlist-company-logo--rondo' },
];

const getCompanyLogo = (companyName) => {
    if (!companyName) {
        return null;
    }

    const normalizedName = String(companyName).toLowerCase();
    return COMPANY_LOGOS.find((item) => normalizedName.includes(item.key)) ?? null;
};

const getCompanyLogoByCompany = (company) => {
    if (!company) {
        return null;
    }

    const companyId = Number(company.id);
    if (companyId === 2) {
        return {
            src: '/company-logos/arstel.svg',
            className: 'sk-userlist-company-logo--arstel'
        };
    }

    if (companyId === 3) {
        return {
            src: '/company-logos/rondo.svg',
            className: 'sk-userlist-company-logo--rondo'
        };
    }

    const normalizedCompanyText = [
        company.name,
        company.description,
        company.folder,
        company.template_prefix,
        company.path_logo,
    ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

    if (normalizedCompanyText.includes('rondo') || normalizedCompanyText.includes('rond')) {
        return {
            src: '/company-logos/rondo.svg',
            className: 'sk-userlist-company-logo--rondo'
        };
    }

    if (normalizedCompanyText.includes('arstel') || normalizedCompanyText.includes('ars')) {
        return {
            src: '/company-logos/arstel.svg',
            className: 'sk-userlist-company-logo--arstel'
        };
    }

    return null;
};

const companyName = (idCompany) => {
    switch (idCompany) {
        case 2:
            return 'arstel';
        case 3:
            return 'rondo';
    }
};

const EMPTY_STATE_DOCUMENTS = (active_company) => {
    switch (active_company) {
        case 2:
            return [
                {
                    id: 'unpaid-vacation',
                    title: 'Заявление на отпуск за свой счет',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/svo.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/svo.pdf`,
                },
                {
                    id: 'vacation',
                    title: 'Заявление на отпуск',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/vacation.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/vacation.pdf`,
                },
                {
                    id: 'vacation-bypass-sheet',
                    title: 'Обходной лист отпуск',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/vacation_bypass_sheet.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/vacation_bypass_sheet.pdf`,
                },
                {
                    id: 'vacation-transfer',
                    title: 'Заявление на перенос отпуска',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/vacation_transfer.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/vacation_transfer.pdf`,
                },
                {
                    id: 'free-form',
                    title: 'Заявление свободная форма',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/free_form.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/free_form.pdf`,
                },
                {
                    id: 'dismissal',
                    title: 'Заявление на увольнение',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/dismissal.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/dismissal.pdf`,
                },
                {
                    id: 'dismissal-clearance-sheet',
                    title: 'Обходной лист увольнение',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/arstel/dismissal_clearance_sheet.docx`,
                    printHref: `http://192.168.1.14/files/docs/arstel/dismissal_clearance_sheet.pdf`,
                },
            ];
        case 3:
            return [
                {
                    id: 'unpaid-vacation',
                    title: 'Заявление на отпуск за свой счет',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/rondo/svo.docx`,
                    printHref: `http://192.168.1.14/files/docs/rondo/svo.pdf`,
                },
                {
                    id: 'vacation',
                    title: 'Заявление на отпуск',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/rondo/vacation.docx`,
                    printHref: `http://192.168.1.14/files/docs/rondo/vacation.pdf`,
                },
                {
                    id: 'vacation-transfer',
                    title: 'Заявление на перенос отпуска',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/rondo/vacation_transfer.docx`,
                    printHref: `http://192.168.1.14/files/docs/rondo/vacation_transfer.pdf`,
                },
                {
                    id: 'dismissal',
                    title: 'Заявление на увольнение',
                    size: 'DOCX',
                    href: `http://192.168.1.14/files/docs/rondo/dismissal.docx`,
                    printHref: `http://192.168.1.14/files/docs/rondo/dismissal.pdf`,
                },
            ];
    }
}

const formatMockMinutes = (value) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours === 0) {
        return `${minutes}\u043c`;
    }

    return `${hours}\u0447 ${minutes ? `${minutes}\u043c` : ''}`.trim();
};

const PERSONAL_WEEK_MAX_VISIBLE_MINUTES = 120;



const ExtendedInformationSidebar = (props) => {

    const userdata = props.userdata;
    const isSuperMode = userdata?.user?.super === true || userdata?.user?.super === 1 || userdata?.user?.super === '1';
    const [isMounted, setIsMounted] = useState(false);
    const [targetUserGuys, setTargetUserGuys] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [targetUserInfo, setTargetUserInfo] = useState(null);

    const [badger, setBadger] = useState(null);

    const [baseSchedules, setBaseSchedules] = useState([]);
    const [baseRules, setBaseRules] = useState([]);
    const [isScheduleLoading, setIsScheduleLoading] = useState(false);
    const [superClaims, setSuperClaims] = useState([]);
    const [superVacationClaims, setSuperVacationClaims] = useState([]);
    const [isSuperClaimsLoading, setIsSuperClaimsLoading] = useState(false);
    const [eventSubscriptions, setEventSubscriptions] = useState([]);
    const [isEventSubscriptionsLoading, setIsEventSubscriptionsLoading] = useState(false);
    const [isEventSubscriptionSaving, setIsEventSubscriptionSaving] = useState(false);

    const [targetDate, setTargetDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

    const [openStateInfoSection, setOpenStateInfoSection] = useState(false);
    const chartCanvasRef = React.useRef(null);
    const [personalWeekData, setPersonalWeekData] = useState([]);
    const [isPersonalWeekLoading, setIsPersonalWeekLoading] = useState(true);
    const [personalWeekError, setPersonalWeekError] = useState(null);

    useEffect(() => {
        setTargetUserGuys(props.target_user_guys);
    }, [props.target_user_guys])

    const fetchSuperClaims = async () => {
        if (!isSuperMode) {
            return;
        }

        setIsSuperClaimsLoading(true);
        try {
            const requestBase = {
                page: 1,
                onPage: 5000,
                boss_id: null,
                user_id: null,
            };
            const [claimsResponse, vacationResponse] = await Promise.all([
                PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getclaims`, {
                    data: {
                        ...requestBase,
                        type: 0,
                    },
                    _token: CSRF_TOKEN
                }),
                PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getclaims`, {
                    data: {
                        ...requestBase,
                        type: 10,
                    },
                    _token: CSRF_TOKEN
                }),
            ]);
            setSuperClaims(claimsResponse.data.content ?? []);
            setSuperVacationClaims(vacationResponse.data.content ?? []);
        } catch (e) {
            console.log(e);
            setSuperClaims([]);
            setSuperVacationClaims([]);
        } finally {
            setIsSuperClaimsLoading(false);
        }
    };

    useEffect(() => {
        if (!isSuperMode || props.target_user_info) {
            return;
        }

        fetchSuperClaims();
    }, [isSuperMode, props.target_user_info, props.target_date]);

    useEffect(() => {
        if (props.target_user_info){
            setTargetUserInfo(props.target_user_info);

            if (getUserStatusId(props.target_user_info) !== 0 || hasUserStatusLucideIconName(props.target_user_info.state_icon))
            {
                setBadger({ title: props.target_user_info.state_text, text: props.target_user_info.state_title, color: props.target_user_info?.state_color, icon: getStatusIcon(props.target_user_info)});
            } else {
                setBadger(USER_STATE_PLACES[0]);
            }

            //if (PRODMODE){
                let data = {
                    date: props.target_date,
                    user_id: props.target_user_info.id,
                };
                setBaseSchedules([]);
                setBaseRules([]);
                setIsScheduleLoading(true);
                get_user_schedule_and_rules(data);
            //}
            // else {
            //     setBaseSchedules(LIST_SCHED_N_RULES_RESPONSE.schedules);
            //     setBaseRules(LIST_SCHED_N_RULES_RESPONSE.rules);
            // }
        } else {
            setTargetUserInfo(null);
            setBadger(null);
            setBaseSchedules([]);
            setBaseRules([]);
            setIsScheduleLoading(false);
        }
    }, [props.target_user_info])

    useEffect(() => {
        setOpenUserInfo(props.open_user_info);

        console.log('HANDLE OPEN', props.open_user_info);
    }, [props.open_user_info])


    const handleClear = () =>{
        if (props.on_clear){
            props.on_clear();
        }
    }

    const capitalize = (s) =>
    {
        if (s.length > 2){
            return String(s[0]).toUpperCase() + String(s).slice(1);
        } else {
            return s;
        }
    }




    /** ------------------ FETCHES ---------------- */


    /**
     * Получение актуального на выбранную дату графика и правил для этого юзера
     * @param {*} req
     * @param {*} res
     */
    const get_user_schedule_and_rules = async (data, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/userlist/getuserschedrules`,
                {
                    data: data,
                    _token: CSRF_TOKEN
                });
            if (response && response.data){
                setBaseSchedules(response.data.content.schedules);
                setBaseRules(response.data.content.rules);
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsScheduleLoading(false);
        }
    }


    /** ------------------ FETCHES END ---------------- */



    useEffect(()=>{
        console.log(props.target_date);
        if (props.open_user_info){
            setTargetDate(props.target_date);
        }
    },[props.target_date]);

    const closeSider = () => {
        handleClear();
    };

    const hasTargetUser = Boolean(targetUserInfo);
    const targetCompanyId = Number(targetUserInfo?.id_company);
    const targetCompany = targetCompanyId
        ? userdata.companies.find((item) => Number(item.id) === targetCompanyId)
        : null;
    const targetCompanyLogo = getCompanyLogoByCompany(targetCompany ?? { id: targetCompanyId });
    const targetUserFullName = hasTargetUser
        ? [targetUserInfo.surname, targetUserInfo.name, targetUserInfo.patronymic].filter(Boolean).join(' ')
        : '';
    const currentUserFullName = [
        userdata?.user?.surname,
        userdata?.user?.name,
        userdata?.user?.patronymic,
    ].filter(Boolean).join(' ');
    const visibleTargetUserGuys = targetUserInfo
        ? props.base_user_list_data.filter((item) => item.boss_id === targetUserInfo.id)
        : targetUserGuys;
    const targetStaffId = Number(targetUserInfo?.id);
    const hasNextEnterSubscription = eventSubscriptions.some((subscription) => (
        Number(subscription?.target_staff_id ?? subscription?.staff_id ?? subscription?.target_staff?.id) === targetStaffId
        && Number(subscription?.event_type) === 0
    ));

    useEffect(() => {
        if (!openUserInfo || !targetStaffId) {
            setEventSubscriptions([]);
            return undefined;
        }

        let isCancelled = false;
        setIsEventSubscriptionsLoading(true);

        const fetchEventSubscriptions = async () => {
            try {
                const response = await PROD_AXIOS_INSTANCE.get(`${ROUTE_PREFIX}/skud/event-notification-subscriptions`);
                const payload = response?.data?.content ?? response?.data?.data ?? response?.data;
                const subscriptions = Array.isArray(payload)
                    ? payload
                    : (payload?.items ?? payload?.subscriptions ?? []);

                if (!isCancelled) {
                    setEventSubscriptions(Array.isArray(subscriptions) ? subscriptions : []);
                }
            } catch (e) {
                if (!isCancelled) {
                    console.log('event notification subscriptions load error', e);
                    setEventSubscriptions([]);
                }
            } finally {
                if (!isCancelled) {
                    setIsEventSubscriptionsLoading(false);
                }
            }
        };

        fetchEventSubscriptions();

        return () => {
            isCancelled = true;
        };
    }, [openUserInfo, targetStaffId]);

    const handleNextEnterSubscription = async (event) => {
        event.stopPropagation();

        if (!targetStaffId || hasNextEnterSubscription || isEventSubscriptionSaving) {
            return;
        }

        setIsEventSubscriptionSaving(true);
        try {
            await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/skud/event-notification-subscriptions`, {
                data: {
                    target_staff_id: targetStaffId,
                    event_type: 0,
                },
            });
            setEventSubscriptions((currentSubscriptions) => ([
                ...currentSubscriptions,
                {target_staff_id: targetStaffId, event_type: 0},
            ]));
        } catch (e) {
            console.log('event notification subscription save error', e);
        } finally {
            setIsEventSubscriptionSaving(false);
        }
    };

    useEffect(() => {
        if (hasTargetUser) {
            return undefined;
        }

        const currentUserId = userdata?.user?.id;

        if (!currentUserId) {
            setPersonalWeekData([]);
            setPersonalWeekError('Не удалось определить текущего пользователя');
            setIsPersonalWeekLoading(false);
            return undefined;
        }

        let isCancelled = false;

        setIsPersonalWeekLoading(true);
        setPersonalWeekError(null);
        setPersonalWeekData([]);

        const fetchPersonalWeekData = async () => {
            try {
                const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/userlist/lost-overtime-last-days`, {
                    user_id: currentUserId,
                    date_to: dayjs().format('YYYY-MM-DD'),
                    days: 7,
                    _token: CSRF_TOKEN,
                });

                if (isCancelled) {
                    return;
                }

                const responseData = response?.data;

                if (responseData?.success === false) {
                    throw new Error(responseData?.message || 'Не удалось загрузить данные графика');
                }

                const days = responseData?.content?.days ?? responseData?.days ?? [];

                setPersonalWeekData(days.map((item) => ({
                    date: item.date,
                    lost: Number(item.lost_minutes ?? item.lost ?? 0),
                    extra: Number(item.overtime_minutes ?? item.extra ?? 0),
                    is_weekend: Boolean(item.is_weekend),
                })));
            } catch (e) {
                if (!isCancelled) {
                    console.log('personal week chart load error', e);
                    setPersonalWeekError(e?.message || 'Не удалось загрузить данные графика');
                }
            } finally {
                if (!isCancelled) {
                    setIsPersonalWeekLoading(false);
                }
            }
        };

        fetchPersonalWeekData();

        return () => {
            isCancelled = true;
        };
    }, [hasTargetUser, userdata?.user?.id]);

    useEffect(() => {
        if (
            hasTargetUser
            || isPersonalWeekLoading
            || personalWeekError
            || personalWeekData.length === 0
            || !chartCanvasRef.current
        ) {
            return undefined;
        }

        const dataByDate = new Map(
            personalWeekData
                .filter((item) => item.date)
                .map((item) => [dayjs(item.date).format('YYYY-MM-DD'), item])
        );
        const days = Array.from({length: 7}).map((_, index) => {
            const date = dayjs().subtract(6 - index, 'day');
            const dateKey = date.format('YYYY-MM-DD');
            const item = dataByDate.get(dateKey) ?? {};

            return {
                date,
                lost: Number(item.lost ?? 0),
                extra: Number(item.extra ?? 0),
                is_weekend: item.is_weekend ?? [0, 6].includes(date.day()),
            };
        });

        const textColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--app-text-color')
            .trim() || '#1f1f1f';
        const mutedTextColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--app-muted-text-color')
            .trim() || '#6b7280';
        const gridColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--table-border-divider-color')
            .trim() || 'rgba(128, 128, 128, 0.22)';

        const customBarsPlugin = {
            id: 'personalWeekCustomBars',
            afterDatasetsDraw: (chart) => {
                const {ctx, chartArea, scales} = chart;
                const xScale = scales.x;
                const yScale = scales.y;

                ctx.save();

                days.forEach((item, index) => {
                    const metrics = [
                        {value: item.lost, color: '#cf1322'},
                        {value: item.extra, color: '#237804'},
                    ].filter((metric) => metric.value > 0);

                    if (metrics.length === 0) {
                        return;
                    }

                    const centerX = xScale.getPixelForValue(index);
                    const barWidth = 22;
                    const gap = 1;
                    const groupWidth = (metrics.length * barWidth) + ((metrics.length - 1) * gap);
                    const startX = centerX - (groupWidth / 2);

                    metrics.forEach((metric, metricIndex) => {
                        const visibleValue = Math.min(metric.value, PERSONAL_WEEK_MAX_VISIBLE_MINUTES);
                        const left = startX + (metricIndex * (barWidth + gap));
                        const top = yScale.getPixelForValue(visibleValue);
                        const height = chartArea.bottom - top;

                        ctx.fillStyle = metric.color;
                        ctx.beginPath();
                        ctx.roundRect(left, top, barWidth, height, 3);
                        ctx.fill();

                        ctx.fillStyle = textColor;
                        ctx.font = '700 11px sans-serif';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillText(formatMockMinutes(metric.value), left + (barWidth / 2), top - 5);
                    });
                });

                ctx.restore();
            },
        };

        const chart = new ChartJS(chartCanvasRef.current, {
            type: 'bar',
            data: {
                labels: days.map((item) => `${item.date.format('dd')} ${item.date.format('DD.MM')}`),
                datasets: [
                    {
                        data: days.map((item) => Math.min(Math.max(item.lost, item.extra, 0), PERSONAL_WEEK_MAX_VISIBLE_MINUTES)),
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        hoverBackgroundColor: 'transparent',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                layout: {
                    padding: {
                        top: 28,
                        right: 2,
                        bottom: 0,
                        left: 2,
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: true,
                            color: gridColor,
                            drawTicks: false,
                        },
                        ticks: {
                            color: (context) => {
                                const chartDay = days[context.index];
                                const isWeekend = chartDay?.is_weekend ?? [0, 6].includes(chartDay?.date.day());
                                return isWeekend ? '#cf1322' : mutedTextColor;
                            },
                            font: {
                                size: 9,
                                weight: '600',
                            },
                            maxRotation: 0,
                            minRotation: 0,
                        },
                        border: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        max: PERSONAL_WEEK_MAX_VISIBLE_MINUTES,
                        ticks: {
                            display: false,
                        },
                        grid: {
                            display: true,
                            color: gridColor,
                            drawTicks: false,
                        },
                        border: {
                            display: false,
                        },
                    },
                },
            },
            plugins: [customBarsPlugin],
        });

        return () => {
            chart.destroy();
        };
    }, [hasTargetUser, isPersonalWeekLoading, personalWeekData, personalWeekError]);

    const handleOpenUserDetails = (userId) => {
        const nextUserInfo = props.base_user_list_data.find((item) => item.id === userId)
            ?? props.base_user_list_data.find((item) => item.user_id === userId);

        if (!nextUserInfo) {
            return;
        }

        setTargetUserInfo(nextUserInfo);

        if (props.on_mark_user) {
            props.on_mark_user(nextUserInfo.id ?? userId);
        }
    };

    const renderStatusHeader = () => (
        <div className="sk-state-intgra-card-backdrop">
            <div
                style={{background: hasTargetUser && !isSuperMode ? getMutedDrawerAccent(badger?.color) : undefined}}
                className={`sk-state-intgra-card ${hasTargetUser ? '' : 'sk-state-intgra-card--empty'} ${hasTargetUser && isSuperMode ? getEmployeePresenceClassName(targetUserInfo) : ''}`}
            >
                {hasTargetUser ? (
                    <>
                        <span style={{textAlign: 'center', paddingLeft: '4px'}}><IdcardOutlined /></span>
                        <span>{targetUserFullName || 'Сотрудник'}</span>
                        <div onClick={() => {
                            setOpenStateInfoSection(!openStateInfoSection)
                        }}>
                            {/* <Tag>{targetUserInfo?.id}</Tag>*/}
                            <CloseOutlined onClick={closeSider}/>
                        </div>
                    </>
                ) : (
                    <span className="sk-state-intgra-card-empty-title">
                        <IdcardOutlined />
                        Детализация по сотруднику
                    </span>
                )}
            </div>
        </div>
    );

    const renderEventInfo = () => {
        if (targetUserInfo && targetUserInfo.event_dump && targetUserInfo.event_dump.length) {
            return <UserlistEventDumpCard data={targetUserInfo.event_dump} themeSafe={true}/>;
        }

        if (targetUserInfo.state_data != null) {
            return (
                <div className={'sk-w-padding-18 sk-umsmi-card'}>
                    <table className="sk-uml-table-dumper"
                           style={{borderCollapse: 'collapse'}}>
                        <tbody>
                        <tr>
                            <td style={{textAlign: 'left'}}>Дата и время начала</td>
                            <td style={{textAlign: 'left'}}>{formatMoscowDateTime(targetUserInfo.state_data.start, "DD-MM-YYYY")} {
                                formatMoscowDateTime(targetUserInfo.state_data.start) != '00:00' && (
                                    <span>{formatMoscowDateTime(targetUserInfo.state_data.start)}</span>
                                )
                            }</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Дата и время завершения</td>
                            <td style={{textAlign: 'left'}}>{formatMoscowDateTime(targetUserInfo.state_data.end, "DD-MM-YYYY")} {
                                formatMoscowDateTime(targetUserInfo.state_data.end) != '23:59' && (
                                    <span>{formatMoscowDateTime(targetUserInfo.state_data.end)}</span>
                                )
                            }</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Количество дней всего</td>
                            <td style={{textAlign: 'left'}}>{targetUserInfo.state_data.days_count}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: 'left'}}>Количество дней осталось
                            </td>
                            <td style={{textAlign: 'left'}}>{(moscowDateTime(targetUserInfo.state_data.end)?.diff(moscowDateTime(dayjs()), 'day') ?? 0) > 0 ? moscowDateTime(targetUserInfo.state_data.end)?.diff(moscowDateTime(dayjs()), 'day') : ""}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className={'sk-w-padding-18 sk-umsmi-card'}>
                <table className="sk-uml-table-dumper"
                       style={{borderCollapse: 'collapse'}}>
                    <tbody>
                    <tr>
                        <td style={{textAlign: 'center'}}>Нет данных</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const parseClaimInfo = (info) => {
        if (!info) {
            return {};
        }

        if (typeof info === 'object') {
            return info;
        }

        try {
            return JSON.parse(info);
        } catch (e) {
            console.log('claim info parse error', e);
            return {};
        }
    };

    const getClaimTitle = (claim) => (
        claim?.skud_current_state?.title
        || claim?.skud_current_state?.text
        || claim?.state_title
        || claim?.state_text
        || 'Заявка'
    );

    const getClaimStatusText = (claim) => {
        if (Number(claim?.state) === 1) return 'Согласовано';
        if (Number(claim?.state) === 2) return 'Отклонено';
        if (Number(claim?.state) === 3) return 'Перенесено';
        return 'На рассмотрении';
    };

    const getClaimUserFullName = (claim) => [
        claim?.usr_surname ?? claim?.user?.surname,
        claim?.usr_name ?? claim?.user?.name,
        claim?.usr_patronymic ?? claim?.user?.patronymic,
    ].filter(Boolean).join(' ') || 'Сотрудник';

    const superPendingApprovalClaims = superClaims
        .filter((claim) => Number(claim?.state) !== 3)
        .filter((claim) => Number(claim?.boss_id) === Number(userdata?.user?.id))
        .filter(isClaimPendingApproval);

    const superMonthVacationClaims = superVacationClaims
        .filter((claim) => Number(claim?.state) !== 3)
        .filter((claim) => isClaimInMonth(claim, targetDate));

    const handleSuperClaimClick = (claim) => {
        if (props.on_claim_click) {
            props.on_claim_click(claim.id, claim);
        }
    };

    const shouldShowClaimTime = (time) => Boolean(time && time !== '00:00' && time !== '23:59');

    const renderClaimDate = (value) => {
        if (!value) {
            return null;
        }

        const date = formatMoscowDateTime(value, 'DD.MM.YYYY');
        const time = formatMoscowDateTime(value, 'HH:mm');

        return (
            <span className="sk-userlist-details-claim-date-part">
                <span className="sk-userlist-details-claim-date-value">{date}</span>
                {shouldShowClaimTime(time) && (
                    <span className="sk-userlist-details-claim-time-value">{time}</span>
                )}
            </span>
        );
    };

    const renderClaimPeriod = (claim) => {
        const startDate = renderClaimDate(claim?.start);
        const endDate = renderClaimDate(claim?.end);

        if (startDate && endDate && String(claim.start) !== String(claim.end)) {
            return (
                <div className="sk-userlist-details-claim-period">
                    {startDate}
                    <span className="sk-userlist-details-claim-period-separator">—</span>
                    {endDate}
                </div>
            );
        }

        return (
            <div className="sk-userlist-details-claim-period">
                {startDate || endDate || <span className="sk-userlist-details-claim-date-value">-</span>}
            </div>
        );
    };

    const getClaimInfoText = (claim) => {
        const info = parseClaimInfo(claim?.info);
        return info.comment
            || info.reason
            || info.target_point
            || info.task
            || info.result
            || info.description
            || '';
    };

    const visibleClaims = (targetUserInfo?.claims ?? []).filter((claim) => Number(claim?.state) !== 3);

    const handleClaimClick = (claim) => {
        if (!props.on_claim_click) {
            return;
        }

        props.on_claim_click(claim.id, {
            ...claim,
            user_id: claim.user_id ?? targetUserInfo.id,
            id_company: claim.id_company ?? targetUserInfo.id_company,
            boss_id: claim.boss_id ?? targetUserInfo.boss_id,
            usr_surname: claim.usr_surname ?? targetUserInfo.surname,
            usr_name: claim.usr_name ?? targetUserInfo.name,
            usr_patronymic: claim.usr_patronymic ?? targetUserInfo.patronymic,
        });
    };

    const renderClaimsInfo = () => (
        <section className="sk-userlist-details-card sk-userlist-details-card--claims">
            <div className="sk-userlist-details-card-title">Заявки</div>
            {visibleClaims.length > 0 ? (
                <div className="sk-userlist-details-claims-list">
                    {visibleClaims.map((claim) => {
                        const infoText = getClaimInfoText(claim);

                        return (
                            <div
                                key={`details-claim-${claim.id}`}
                                className="sk-userlist-details-claim-row"
                                onClick={() => handleClaimClick(claim)}
                            >
                                <div className={`sk-userlist-details-claim-icon ${claim?.not_today ? 'sk-userlist-details-claim-icon--future' : ''}`}>
                                    <StateIconsController IdState={claim?.skud_current_state_id} height={'24px'} />
                                </div>
                                <div className="sk-userlist-details-claim-main">
                                    <div className="sk-userlist-details-claim-title">{getClaimTitle(claim)}</div>
                                    {renderClaimPeriod(claim)}
                                    {infoText && (
                                        <div className="sk-userlist-details-claim-info">{infoText}</div>
                                    )}
                                </div>
                                <Tag className={`sk-userlist-details-claim-status sk-userlist-details-claim-status--${Number(claim?.state) || 0}`}>
                                    {getClaimStatusText(claim)}
                                </Tag>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="sk-userlist-details-claims-empty">Нет активных заявок</div>
            )}
        </section>
    );

    const renderSuperSummaryClaimList = (items, emptyText) => {
        if (isSuperClaimsLoading) {
            return (
                <div className="sk-userlist-super-summary-body sk-userlist-personal-week-skeleton">
                    <Skeleton active title={false} paragraph={{rows: 4}} />
                </div>
            );
        }

        if (items.length === 0) {
            return <div className="sk-userlist-super-summary-body sk-userlist-details-claims-empty">{emptyText}</div>;
        }

        return (
            <div className="sk-userlist-super-summary-body">
                <div className="sk-userlist-super-summary-list">
                    {items.map((claim) => (
                        <div
                            key={`super-summary-${claim.id}`}
                            className="sk-userlist-super-summary-row"
                            onClick={() => handleSuperClaimClick(claim)}
                        >
                            <div className="sk-userlist-super-summary-icon">
                                <StateIconsController IdState={claim?.skud_current_state_id} height={'22px'} />
                            </div>
                            <div className="sk-userlist-super-summary-main">
                                <div className="sk-userlist-super-summary-name">{getClaimUserFullName(claim)}</div>
                                <div className="sk-userlist-super-summary-meta">
                                    <span>{getClaimTitle(claim)}</span>
                                    <span>{renderClaimPeriod(claim)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSuperEmptyState = () => (
        <div className="sk-userlist-details-scroll sk-userlist-super-summary-scroll">
            <section className="sk-userlist-details-card sk-userlist-details-card--super-summary">
                <div className="sk-userlist-details-card-title">Заявки ожидающие согласования</div>
                {renderSuperSummaryClaimList(superPendingApprovalClaims, 'Нет заявок ожидающих согласования')}
            </section>

            <section className="sk-userlist-details-card sk-userlist-details-card--super-summary">
                <div className="sk-userlist-details-card-title">В этом месяце отпуск запланирован</div>
                {renderSuperSummaryClaimList(superMonthVacationClaims, 'Нет запланированных отпусков в этом месяце')}
            </section>
        </div>
    );

    const renderEventInfoCard = () => (
        <section className="sk-userlist-details-card sk-userlist-details-card--events">
            <div className="sk-userlist-details-card-title sk-userlist-details-card-title--with-action">
                <span>Входы и выходы</span>
                <Button
                    type="text"
                    size="small"
                    className={`sk-userlist-details-title-action ${hasNextEnterSubscription ? 'sk-userlist-details-title-action--active' : ''}`}
                    icon={<BellOutlined />}
                    loading={isEventSubscriptionSaving}
                    disabled={isEventSubscriptionsLoading || hasNextEnterSubscription}
                    title={hasNextEnterSubscription ? 'Подписка на следующий вход активна' : 'Подписка на следующий вход'}
                    aria-label={hasNextEnterSubscription ? 'Подписка на следующий вход активна' : 'Подписка на следующий вход'}
                    onClick={handleNextEnterSubscription}
                />
            </div>
            {renderEventInfo()}
        </section>
    );

    const renderScheduleInfoCard = () => (
        <section className="sk-userlist-details-card sk-userlist-details-card--schedule">
            <div className="sk-userlist-details-card-title">График</div>
            <Spin spinning={isScheduleLoading}>
                <div className="sk-userlist-details-card-loader-body">
                    {baseSchedules && baseSchedules.length > 0 && (
                        <div className="sk-userlist-details-schedule-list">
                            {baseSchedules.map((item) => (
                                <UmScheduleMiniCard
                                    data={item}
                                    key={`umscard_${item.id}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </Spin>
        </section>
    );

    const renderCreateClaimCard = () => {
        const claimTypes = props.claim_types ?? [];

        return (
            <section className="sk-userlist-details-card sk-userlist-details-card--create-claim">
                <div className="sk-userlist-details-card-title">Создать заявку</div>
                {claimTypes.length > 0 ? (
                    <div className="sk-userlist-create-claim-list">
                        {claimTypes.map((claimType) => (
                            <Tooltip
                                key={claimType.key ?? claimType.value}
                                title={claimType.title || claimType.label}
                            >
                                <Button
                                    className="sk-userlist-create-claim-button"
                                    style={{'--claim-type-color': claimType.color}}
                                    aria-label={claimType.title || claimType.label}
                                    onClick={() => props.on_create_claim_type?.(claimType.value)}
                                >
                                    <span className="sk-userlist-create-claim-icon">{claimType.icon}</span>
                                </Button>
                            </Tooltip>
                        ))}
                    </div>
                ) : (
                    <div className="sk-userlist-details-claims-empty">Нет доступных типов заявок</div>
                )}
            </section>
        );
    };

    const renderMockPersonalWeekChartJsCard = () => {
        const shouldShowChartError = personalWeekError || (!isPersonalWeekLoading && personalWeekData.length === 0);
        const currentUserId = userdata?.user?.id;

        return (
            <section className="sk-userlist-details-card sk-userlist-details-card--personal-week">
                <div className="sk-userlist-details-card-title sk-userlist-personal-week-title">
                    <IdcardOutlined />
                    <span>{currentUserFullName || userdata?.user?.email || 'Пользователь'}</span>
                    <Button
                        size="small"
                        icon={<ScheduleOutlined />}
                        disabled={!currentUserId}
                        onClick={() => props.on_open_bill_list?.(currentUserId)}
                    >
                        Расчетный лист
                    </Button>
                </div>
                <div className="sk-userlist-personal-week-body">
                    {isPersonalWeekLoading ? (
                        <div className="sk-userlist-personal-week-skeleton">
                            <Skeleton active title={false} paragraph={{rows: 5}} />
                        </div>
                    ) : shouldShowChartError ? (
                        <Alert
                            type="error"
                            showIcon
                            message="Не удалось загрузить график"
                            description={personalWeekError || 'Данные по потерянному времени и сверхурочным не получены.'}
                        />
                    ) : (
                        <>
                            <div className="sk-userlist-personal-week-legend">
                                <span className="sk-userlist-personal-week-legend-item sk-userlist-personal-week-legend-item--lost">Потерянное время</span>
                                <span className="sk-userlist-personal-week-legend-item sk-userlist-personal-week-legend-item--extra">Сверхурочные</span>
                            </div>
                            <div className="sk-userlist-personal-week-chartjs">
                                <canvas ref={chartCanvasRef} />
                            </div>
                        </>
                    )}
                </div>
            </section>
        );
    };

    const handlePrintDocument = (href) => {
        if (!href) {
            return;
        }

        window.open(href, '_blank', 'noopener,noreferrer');
    };

    const getDocumentFileFormat = (href, fallback = '') => {
        if (!href) {
            return fallback;
        }

        const cleanHref = String(href).split(/[?#]/)[0];
        const extension = cleanHref.split('.').pop();

        return extension ? extension.toUpperCase() : fallback;
    };

    const getDownloadTooltip = (documentItem) => (
        documentItem.href
            ? `\u0421\u043a\u0430\u0447\u0430\u0442\u044c (${getDocumentFileFormat(documentItem.href, documentItem.size)})`
            : '\u0424\u0430\u0439\u043b \u0435\u0449\u0435 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d'
    );

    const getPrintTooltip = (documentItem) => (
        documentItem.printHref
            ? `\u0412 \u043f\u0435\u0447\u0430\u0442\u044c (${getDocumentFileFormat(documentItem.printHref, 'PDF')})`
            : 'PDF \u0435\u0449\u0435 \u043d\u0435 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d'
    );

    const renderAccountingDocumentsCard = () => (
        <section className="sk-userlist-details-card sk-userlist-details-card--documents">
            <div className="sk-userlist-details-card-title">Документы</div>
            <div className="sk-userlist-documents-list">
                {EMPTY_STATE_DOCUMENTS(props.userdata?.user?.active_company)?.map((documentItem) => (
                    <div className="sk-userlist-document-row" key={documentItem.id}>
                        <Tooltip title={getDownloadTooltip(documentItem)}>
                            {documentItem.href ? (
                                <a
                                    className="sk-userlist-document-icon-link"
                                    href={documentItem.href}
                                    download
                                >
                                    <FileWordOutlined className="sk-userlist-document-icon" />
                                </a>
                            ) : (
                                <span className="sk-userlist-document-icon-link sk-userlist-document-icon-link--disabled">
                                    <FileWordOutlined className="sk-userlist-document-icon" />
                                </span>
                            )}
                        </Tooltip>
                        <div className="sk-userlist-document-title">{documentItem.title}</div>
                        <Tooltip title={getDownloadTooltip(documentItem)}>
                            <Button
                                type="text"
                                size="small"
                                icon={<DownloadOutlined />}
                                disabled={!documentItem.href}
                                href={documentItem.href ?? undefined}
                                download={documentItem.href ? true : undefined}
                            />
                        </Tooltip>
                        <Tooltip title={getPrintTooltip(documentItem)}>
                            <Button
                                type="text"
                                size="small"
                                icon={<PrinterOutlined />}
                                disabled={!documentItem.printHref}
                                onClick={() => handlePrintDocument(documentItem.printHref)}
                            />
                        </Tooltip>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div>
            {!hasTargetUser && (
                isSuperMode ? renderSuperEmptyState() : (
                    <div className="sk-userlist-details-scroll">
                        {renderMockPersonalWeekChartJsCard()}

                        {renderCreateClaimCard()}

                        {renderAccountingDocumentsCard()}
                    </div>
                )
            )}
            {openUserInfo && hasTargetUser && (
                <div className="sk-userlist-details-scroll">
                    <section className="sk-userlist-details-card sk-userlist-details-card--employee">
                        {renderStatusHeader()}
                        <div className="sk-w-padding-18">
                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Статус</div>
                                <div className={'sk-contend-um'}>
                                    <span
                                        className="sk-userlist-status-inline sk-userlist-status-inline--tag sk-userlist-status-inline--tag-new"
                                        style={{'--user-status-bg': getMutedDrawerAccent(badger?.color)}}
                                        title={badger?.title}
                                    >
                                        {badger?.icon}
                                        <span>{badger?.text}</span>
                                    </span>
                                </div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Должность</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.user_occupy ? capitalize(targetUserInfo.user_occupy) : targetUserInfo.occupy ? capitalize(targetUserInfo.occupy) : '-'}</div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Подразделение</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.department_name ? targetUserInfo.department_name : '-'}</div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>Внутренний телефон</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.phone && targetUserInfo.phone != 0 ? targetUserInfo.phone : "-"}</div>
                            </div>

                            <div className={'sk-usermonic-drawer-row'}>
                                <div className={'sk-labed-um'}>E-mail</div>
                                <div
                                    className={'sk-contend-um'}>{targetUserInfo.email && targetUserInfo.email != 0 ? targetUserInfo.email : "-"}</div>
                            </div>

                            {targetUserInfo.recrut && targetUserInfo.user_id === 483 ? (
                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Работает с</div>
                                    <div
                                        className={'sk-contend-um'}>{formatMoscowUnix(targetUserInfo.recrut)}</div>
                                </div>
                            ) : ""}

                            {targetCompanyId > 1 && (
                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Компания</div>
                                    <div className={'sk-contend-um'}>
                                        {targetCompanyLogo ? (
                                            <span className="sk-userlist-company-logo-frame">
                                                <img
                                                    className={`sk-userlist-company-logo ${targetCompanyLogo.className}`}
                                                    src={targetCompanyLogo.src}
                                                    alt={targetCompany?.name ?? 'Компания'}
                                                />
                                            </span>                                        ) : (
                                            <>
                                                <span className={'sk-usermonic-comround'}
                                                      style={{
                                                          background: `${targetCompany?.color}`
                                                      }}>
                                                </span>
                                                {targetCompany?.name}
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {renderClaimsInfo()}

                    {renderEventInfoCard()}

                    {renderScheduleInfoCard()}

                    {targetUserInfo.boss_id && targetUserInfo.boss_id !== 0 && targetUserInfo.user_id != 46 ? (
                        <section className="sk-userlist-details-card sk-userlist-details-card--boss">
                            <div className="sk-userlist-details-card-title">
                                <span
                                    onClick={() => handleOpenUserDetails(targetUserInfo.boss_id)}
                                    className={'sk-usermonic-drawer-rukop-title'}
                                >Руководитель</span>
                            </div>
                            <div className="sk-w-padding-18">
                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>ФИО</div>
                                    <div
                                        className={'sk-contend-um sk-userlist-details-link'}
                                        onClick={() => handleOpenUserDetails(targetUserInfo.boss_id)}
                                    >{targetUserInfo.boss_surname} {targetUserInfo.boss_name} {targetUserInfo.boss_patronymic}</div>
                                </div>

                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Должность</div>
                                    <div className={'sk-contend-um'}>{targetUserInfo.boss_occupy}</div>
                                </div>

                                <div className={'sk-usermonic-drawer-row'}>
                                    <div className={'sk-labed-um'}>Внутренний телефон</div>
                                    <div className={'sk-contend-um'}>{targetUserInfo.boss_phone}</div>
                                </div>
                            </div>
                        </section>
                    ) : ""}

                    {visibleTargetUserGuys && visibleTargetUserGuys.length > 0 && (
                        <section className="sk-userlist-details-card sk-userlist-details-card--guys">
                            <div className="sk-userlist-details-card-title">Сотрудники</div>
                            <div className="sk-w-padding-18">
                                {visibleTargetUserGuys.map((item, index) => (
                                    <div className={'sk-boss-guy-card'}
                                         key={`taurkey_${index}`}
                                         onClick={() => handleOpenUserDetails(item.id)}
                                    >{item.surname} {item.name} {item.patronymic}</div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExtendedInformationSidebar;
