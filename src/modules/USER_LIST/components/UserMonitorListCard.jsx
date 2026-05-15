import { Tag, Tooltip } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { BarChartOutlined,  IssuesCloseOutlined, RobotOutlined,
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
    TruckOutlined,
    FireOutlined,
    FlagOutlined,
    CalendarOutlined
 } from "@ant-design/icons";
import { getWeekDayString, secondsToTime } from "../../../components/Helpers/TextHelpers";
import { formatMoscowDateTime, moscowDateTime } from "../../../components/Helpers/DateTimeHelpers";
import './style/usermonitorlist.css';
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";
import StateIconsController from "../../CHARTS/components/StateIconsController";
import UserlistEventDumpCard from "./UserlistEventDumpCard";



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
    HeatMapOutlined
  };

const DynamicIcon = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
  };

const formatPhone = (phone) => (phone && phone !== 0 && phone !== '0' ? phone : '-');

const getScheduleStartTime = (schedule) => {
    const scheduleInfo = schedule?.skud_schedule ?? schedule;
    const startTime = Number(scheduleInfo?.start_time);

    return Number.isFinite(startTime) ? startTime : null;
};

const isEnterLaterThanSchedule = (enterTime, schedule) => {
    const scheduleStartTime = getScheduleStartTime(schedule);
    const enterDateTime = enterTime ? moscowDateTime(enterTime) : null;

    if (scheduleStartTime == null || !enterDateTime?.isValid?.()) {
        return false;
    }

    const enterSeconds = enterDateTime.hour() * 3600 + enterDateTime.minute() * 60 + enterDateTime.second();

    return enterSeconds > scheduleStartTime;
};

const parseColorToRgb = (color) => {
    if (!color || typeof color !== 'string') {
        return null;
    }

    const normalized = color.trim();

    if (normalized.startsWith('#')) {
        let hex = normalized.slice(1);

        if (hex.length === 3) {
            hex = hex.split('').map((item) => item + item).join('');
        }

        if (hex.length !== 6) {
            return null;
        }

        return {
            r: parseInt(hex.slice(0, 2), 16),
            g: parseInt(hex.slice(2, 4), 16),
            b: parseInt(hex.slice(4, 6), 16),
        };
    }

    const rgbMatch = normalized.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

    if (!rgbMatch) {
        return null;
    }

    return {
        r: Number(rgbMatch[1]),
        g: Number(rgbMatch[2]),
        b: Number(rgbMatch[3]),
    };
};

const blendColor = (source, target, ratio) => ({
    r: Math.round(source.r * ratio + target.r * (1 - ratio)),
    g: Math.round(source.g * ratio + target.g * (1 - ratio)),
    b: Math.round(source.b * ratio + target.b * (1 - ratio)),
});

const toRgbString = ({ r, g, b }) => `rgb(${r}, ${g}, ${b})`;

const getReadableBadgeBackground = (color) => {
    if (typeof document === 'undefined') {
        return color;
    }

    const isDarkTheme = document.documentElement.classList.contains('sk-theme-dark');

    if (!isDarkTheme) {
        return color;
    }

    const rgb = parseColorToRgb(color);

    if (!rgb) {
        return color;
    }

    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    if (brightness < 150) {
        return color;
    }

    return toRgbString(blendColor(rgb, { r: 20, g: 26, b: 33 }, 0.38));
};




const UserMonitorListCard = (props) => {

    const [content, setContent] = useState(props.data);    
    const [badger, setBadger] = useState(null);
    const [bColor, setBColor] = useState('#fff');

    const [markedCard, setMarkedCard] = useState(false);
    const [itsMe, setItsMe] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    
    const [arrow, setArrow] = useState('Show');

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
          return false;
        }
        if (arrow === 'Show') {
          return true;
        }
        return {
          pointAtCenter: true,
        };
      }, [arrow]);

    const [currentState, setCurrentState] = useState(0);
    const statusBackground = badger ? getReadableBadgeBackground(badger.color) : undefined;
    const showIdColumn = props.show_id_column !== false;

    useEffect(()=> {
        setContent(props.data);
        if (props.data.current_state !== 0)
        {
            setBadger({ title: props.data.state_text, text: props.data.state_title, text_w: props.data.state_title_w, color: props.data.state_color, icon: <DynamicIcon iconName={props.data.state_icon} />});
        } else {
            setBadger(USER_STATE_PLACES[0]);
        }
        setCurrentState(props.data.current_state);
    },[props.data]);

    useEffect(()=> {
        setItsMe(props.its_me);
    },[props.its_me]);

    useEffect(()=> {
        if (content.id !== undefined && props.marked_users && props.marked_users.includes(content.id)){
            setMarkedCard(true);
        } else {
            setMarkedCard(false);
        }
    },[props.marked_users])


    useEffect(()=> {
        setSelectedColumns(props.selected_columns);
    },[props.selected_columns]);

    const handleMarkUser = () => {
        if (props.on_mark_user)
        {   
            props.on_mark_user(content.boss_id);
        }
    }

    const handleDoubleClickOnRow = ()=>{
        if (content.type !== 'header'){
            if (props.on_double_click){
                props.on_double_click(content.id);
            }
        }
    }

    const handleMouseOver = () => {};

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

    const getClaimStatusText = (claim) => {
        const approvalState = claim?.is_approved ?? claim?.approved ?? claim?.state;
        const needApproved = Number(claim?.need_approved ?? claim?.skud_current_state?.need_approved ?? 0);

        if (!needApproved && approvalState == null) {
            return 'Не требует согласования';
        }

        if (Number(approvalState) === 1) {
            return 'Согласована';
        }

        if (Number(approvalState) === 2 || Number(approvalState) === -1) {
            return 'Отклонена';
        }

        if (!needApproved && Number(approvalState) === 0) {
            return 'Не требует согласования';
        }

        return 'На рассмотрении';
    };

    const isClaimForToday = (claim) => {
        if (claim?.not_today != null) {
            return !claim.not_today;
        }

        const today = moscowDateTime(Date.now());
        const start = moscowDateTime(claim?.start);
        const end = moscowDateTime(claim?.end ?? claim?.start);

        if (!today || !start) {
            return false;
        }

        const todayStart = today.startOf('day');
        const todayEnd = today.endOf('day');
        const claimEnd = end ?? start;

        return start.isBefore(todayEnd) && claimEnd.isAfter(todayStart);
    };

    const isClaimPendingApproval = (claim) => {
        const approvalState = claim?.is_approved ?? claim?.approved ?? claim?.state;
        const needApproved = Number(claim?.need_approved ?? claim?.skud_current_state?.need_approved ?? 0);

        if (Number(approvalState) === 1 || Number(approvalState) === 2 || Number(approvalState) === -1) {
            return false;
        }

        return needApproved === 1 || Number(approvalState) === 0;
    };

    const canSeeClaimApprovalState = () => Number(content?.boss_id) === Number(props.current_user_id);

    const getClaimIconClassName = (claim) => {
        const classNames = ['sk-userlist-claim-icon'];

        if (!canSeeClaimApprovalState() || !isClaimForToday(claim)) {
            return classNames.join(' ');
        }

        if (isClaimPendingApproval(claim)) {
            classNames.push('sk-userlist-claim-icon--pending');
        }

        return classNames.join(' ');
    };

    const renderClaimTooltip = (claim) => {
        return (
            <div style={{maxWidth: '320px'}}>
                <div><strong>{claim?.skud_current_state?.title || claim?.skud_current_state?.text || 'Заявка'}</strong></div>
                <div>Статус: {getClaimStatusText(claim)}</div>
                <div>Начало: {claim?.start ? formatMoscowDateTime(claim.start, 'DD.MM.YYYY HH:mm') : '-'}</div>
                <div>Конец: {claim?.end ? formatMoscowDateTime(claim.end, 'DD.MM.YYYY HH:mm') : '-'}</div>
            </div>
        );
    };

    const handleClaimClick = (event, claim) => {
        event.stopPropagation();
        if (props.on_claim_click) {
            const normalizedClaim = {
                ...claim,
                user_id: claim.user_id ?? content.id,
                id_company: claim.id_company ?? content.id_company,
                boss_id: claim.boss_id ?? content.boss_id,
                usr_surname: claim.usr_surname ?? content.surname,
                usr_name: claim.usr_name ?? content.name,
                usr_patronymic: claim.usr_patronymic ?? content.patronymic,
            };
            props.on_claim_click(normalizedClaim.id, normalizedClaim);
        }
    };

    const renderScheduleTooltip = (schedule) => {
        const scheduleInfo = schedule?.skud_schedule ?? schedule;

        if (!scheduleInfo) {
            return null;
        }

        return (
            <div style={{maxWidth: '320px'}}>
                <div><strong>{scheduleInfo.name || 'График работы'}</strong></div>
                {scheduleInfo.start_time != null && scheduleInfo.end_time != null && (
                    <div>Рабочее время: {secondsToTime(scheduleInfo.start_time)} - {secondsToTime(scheduleInfo.end_time)}</div>
                )}
                {scheduleInfo.lunch_start != null && scheduleInfo.lunch_end != null && (
                    <div>Обед: {secondsToTime(scheduleInfo.lunch_start)} - {secondsToTime(scheduleInfo.lunch_end)}</div>
                )}
                {Number(scheduleInfo.lunch_time) > 0 && (
                    <div>Длительность обеда: {secondsToTime(scheduleInfo.lunch_time)}</div>
                )}
                {Number(scheduleInfo.target_time) > 0 && (
                    <div>Норма: {secondsToTime(scheduleInfo.target_time)}</div>
                )}
            </div>
        );
    };

    const renderRulesTooltip = (rules) => {
        if (!Array.isArray(rules) || !rules.length) {
            return null;
        }

        return (
            <div style={{maxWidth: '360px'}}>
                <div><strong>Правила учета РВ</strong></div>
                {rules.map((rule, index) => {
                    const ruleInfo = rule?.skud_rule ?? rule;

                    return (
                        <div key={`rule-tooltip-${rule?.id ?? index}`} style={{marginTop: index > 0 ? '8px' : '6px'}}>
                            <div>{ruleInfo?.name || 'Правило'}</div>
                            {rule?.start && (
                                <div>Начало: {formatMoscowDateTime(rule.start, 'DD.MM.YYYY')}</div>
                            )}
                            {rule?.end && (
                                <div>Окончание: {formatMoscowDateTime(rule.end, 'DD.MM.YYYY')}</div>
                            )}
                            {Number(ruleInfo?.duration_time) > 0 && (
                                <div>Длительность: {secondsToTime(ruleInfo.duration_time)}</div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const hasEnterExitField = Object.prototype.hasOwnProperty.call(content ?? {}, 'enter_exit');
    const enterExitData = hasEnterExitField ? content?.enter_exit : content?.event_dump;

    const normalizedEnterExitData = useMemo(() => {
        if (!enterExitData) {
            return [];
        }

        if (Array.isArray(enterExitData)) {
            return enterExitData;
        }

        if (typeof enterExitData === 'string') {
            try {
                const parsedData = JSON.parse(enterExitData);
                return Array.isArray(parsedData) ? parsedData : [];
            } catch (e) {
                return [];
            }
        }

        return [];
    }, [enterExitData]);

    const hasEventDump = normalizedEnterExitData.length > 0;

    const getEventDirection = (event) => Number(event?.direction ?? event?.diraction ?? event?.d);
    const getEventTime = (event) => event?.time ?? event?.datetime ?? event?.datetime_contr ?? event?.t;
    const formatDurationFromMinute = (seconds) => Number(seconds) >= 60 ? secondsToTime(seconds) : '';

    const enterExitTimes = useMemo(() => {
        const result = {
            enter: null,
            exit: null,
        };

        for (let index = 0; index < normalizedEnterExitData.length; index += 1) {
            const event = normalizedEnterExitData[index];
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

        return result;
    }, [normalizedEnterExitData]);

    const displayedEnterTime = hasEnterExitField ? enterExitTimes.enter : enterExitTimes.enter ?? content.enter_time;
    const displayedExitTime = hasEnterExitField ? enterExitTimes.exit : enterExitTimes.exit ?? content.exit_time;
    const isLateEnter = isEnterLaterThanSchedule(displayedEnterTime, content.schedule);

    const shouldHideExitTime = useMemo(() => {
        if (!normalizedEnterExitData.length) {
            return false;
        }

        const lastEvent = normalizedEnterExitData[normalizedEnterExitData.length - 1];
        const lastDirection = getEventDirection(lastEvent);

        return lastDirection === 0;
    }, [normalizedEnterExitData]);

    const visibleClaims = useMemo(() => {
        return (content?.claims ?? []).filter((claim) => Number(claim?.state) !== 3);
    }, [content?.claims]);

    const renderEventDumpTooltip = () => {
        if (!hasEventDump) {
            return null;
        }

        return (
            <div style={{maxWidth: '420px'}}>
                <UserlistEventDumpCard data={normalizedEnterExitData} themeSafe={true} />
            </div>
        );
    };

    const renderEventDumpCell = (value) => {
        if (!value) {
            return '';
        }

        const formattedValue = formatMoscowDateTime(value);

        if (!hasEventDump) {
            return formattedValue;
        }

        return (
            <Tooltip title={renderEventDumpTooltip()} placement="bottom" overlayClassName="sk-theme-tooltip">
                <span style={{cursor: 'help', display: 'inline-block'}}>
                    {formattedValue}
                </span>
            </Tooltip>
        );
    };

    

    return (
        /*<div
            onMouseOver={handleMouseOver}
            id={`row_${content.id}`}
            onDoubleClick={handleDoubleClickOnRow}
        >
            {content.type && content.type === 'header' ? (
                <div className={`sk-usermonic-cardrow-ou ${ content.type === 'header' ? 'sk-usermonic-crd-divider' : ''}
                     ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${ markedCard ? 'sk-usermonic-crd-marked' : ''}
                     ${ itsMe ? 'sk-usermonic-crd-mine' : ''} ${ currentState !== 4 && content.type !== 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
                >
                    <div></div>
                    <div>
                        <div>
                            {content.name}
                        </div>
                    </div>
                    <div>
                        <BarChartOutlined
                            className={'sk-usermoinc-divider-statrig-button'}
                            title="РЎС‚Р°С‚РёСЃС‚РёРєР° РїРѕ РѕС‚РґРµР»Сѓ"
                        />
                    </div>
                    <div style={{padding: '3px'}}></div>
                </div>
            ):(
                <div className={`sk-usermonic-cardrow-ou ${ content.type === 'header' ? 'sk-usermonic-crd-divider' : ''}
                     ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${ markedCard ? 'sk-usermonic-crd-marked' : ''}
                     ${ itsMe ? 'sk-usermonic-crd-mine' : ''} ${ currentState !== 4 && content.type !== 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
                >
                    <div>
                        <div className={`${selectedColumns.includes(1) ? "sk-col-selected": ""}`}
                             style={{paddingLeft: '6px', textAlign: 'center'}}>
                            {content.id}
                        </div>
                    </div>

                    <div title={content.user_occupy}>
                        <div className={`${selectedColumns.includes(2) ? "sk-col-selected": ""}`}>
                            {content.surname} {content.name} {content.patronymic}
                        </div>
                    </div>

                    <div style={{overflow: 'hidden', textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(3) ? "sk-col-selected": ""}`}>
                            <div>{content.phone && content.phone != 0 && content.phone}</div>
                        </div>
                    </div>

                    <div className={'sk-time-info'}>
                        <div className={`sk-usermonic-micro-row ${props?.extendedInfo ? 'extended' : ''}`}>
                            <div className={`${selectedColumns.includes(10) ? "sk-col-selected" : ""}`}>
                                {formatMoscowDateTime(content.enter_time)}
                            </div>
                            <div className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}>
                                {formatMoscowDateTime(content.exit_time)}
                            </div>
                            <div className={`${selectedColumns.includes(14) ? "sk-col-selected" : ""}`}>
                                {content.exit_time_count && secondsToTime(content.exit_time_count)}
                            </div>
                            <div></div>
                            {props?.extendedInfo && (
                                <div className={`${selectedColumns.includes(12) ? "sk-col-selected" : ""}`}>
                                    {content.job_time_count && secondsToTime(content.job_time_count)}
                                </div>
                            )}
                            {props?.extendedInfo && (
                                <div className={`${selectedColumns.includes(13) ? "sk-col-selected" : ""}`}>
                                    {content.all_time_count && secondsToTime(content.all_time_count)}
                                </div>
                            )}
                            {props?.extendedInfo && (
                                <div className={`${selectedColumns.includes(15) ? "sk-col-selected" : ""}`}>
                                    {content.time_need_work && secondsToTime(content.time_need_work)}
                                </div>
                            )}
                            <div className={`${selectedColumns.includes(16) ? "sk-col-selected" : ""}`}>
                                {content.lost_time_count && secondsToTime(content.lost_time_count)}
                            </div>
                        </div>
                    </div>
                        <div>
                            {content.schedule && (
                                <div style={{textAlign: 'center'}}>
                                    <Tooltip title={JSON.stringify(content.schedule.skud_schedule)} >
                                <CalendarOutlined />
                                </Tooltip>
                            </div>
                            )}
                    </div>
                    <div>
                        {content.rules && content.rules.length > 0 && (
                        <div style={{textAlign: 'center'}} title={JSON.stringify(content.rules)}>
                            <Tooltip title={JSON.stringify(content.rules)} >
                                <FlagOutlined />
                            </Tooltip>
                        </div>
                        )}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                            {content.claims && content.claims.length > 0 && (
                                <Tooltip title={JSON.stringify(content.claims)} >
                                    <FireOutlined />
                                </Tooltip>
                            )}</div>
                        </div>
                    <div>
                        <div style={{textAlign: 'center'}} title={JSON.stringify(content.claims)}>
                        {content.boss_id > 0 && (
                            <Tooltip placement="left" title={`Р СѓРєРѕРІРѕРґРёС‚РµР»СЊ: ${content.boss_surname} ${content.boss_name} ${content.boss_patronymic}`} arrow={mergedArrow}>
                                <RobotOutlined
                                    onClick={handleMarkUser}
                                    className={'sk-usermonic-boss-trigger'}
                                />
                            </Tooltip>
                        )}</div>
                    </div>
                    <div>
                        <div style={{textAlign: 'center'}}>
                        {badger && (
                            <Tag className="sk-usermonic-badger"
                                style={{background: getReadableBadgeBackground(badger.color)}}
                                title={badger.title}
                            >{badger.icon} <span>{badger.text}</span></Tag>
                        )}</div>
                    </div>
                </div>
            )}
        </div>*/
        <div onMouseOver={handleMouseOver}
             id={`row_${content.id}`}
             onDoubleClick={handleDoubleClickOnRow}
        >
            {content.type && content.type === 'header' ? (
                <div className={`sk-usermonic-cardrow-ou ${content.type === 'header' ? 'sk-usermonic-crd-divider' : ''}
                     ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${markedCard ? 'sk-usermonic-crd-marked' : ''}
                     ${itsMe ? 'sk-usermonic-crd-mine' : ''} ${currentState !== 4 && content.type !== 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
                >
                    <div></div>
                    <div>
                        <div>
                            {content.name}
                        </div>
                    </div>
                    <div>
                        {/*<BarChartOutlined
                            className={'sk-usermoinc-divider-statrig-button'}
                            title="РЎС‚Р°С‚РёСЃС‚РёРєР° РїРѕ РѕС‚РґРµР»Сѓ"
                        />*/}
                    </div>
                    <div style={{padding: '3px'}}></div>
                </div>
            ) : (
                <div className={`sk-usermonic-cardrow-ou-test 
                     ${props?.extendedInfo ? 'extended' : ''}
                     ${showIdColumn ? '' : 'without-id-column'}
                     ${content.type === 'header' ? 'sk-usermonic-crd-divider' : ''}
                     ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${markedCard ? 'sk-usermonic-crd-marked' : ''}
                     ${itsMe ? 'sk-usermonic-crd-mine' : ''} ${currentState !== 4 && content.type !== 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
                >
                    {showIdColumn && (
                        <div className="sk-userlist-id-cell">
                            <div className={`${selectedColumns.includes(1) ? "sk-col-selected" : ""}`}
                                 style={{paddingLeft: '6px', textAlign: 'center'}}>
                                {content.id}
                            </div>
                        </div>
                    )}

                    <div
                        title={content.user_occupy}
                        className="sk-userlist-name-status-cell sk-userlist-employee-cell"
                        style={{'--user-status-bg': statusBackground}}
                    >
                        <div className={`${selectedColumns.includes(2) ? "sk-col-selected" : ""}`}>
                            <div className="sk-userlist-name-cell">
                                <span className="sk-userlist-name-text">
                                    {content.surname} {content.name} {content.patronymic}
                                </span>
                                {badger && (
                                    <span
                                        className="sk-userlist-status-inline sk-userlist-status-inline--tag sk-userlist-status-inline--tag-new"
                                        title={badger.title}
                                    >
                                        {badger.icon}
                                        <span>{badger.text}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="sk-userlist-phone-cell" style={{overflow: 'hidden', textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(3) ? "sk-col-selected" : ""}`}>
                            <div>{formatPhone(content.phone)}</div>
                        </div>
                    </div>

                    <div className={`sk-userlist-enter-cell ${isLateEnter ? 'sk-userlist-enter-cell--late' : ''} ${selectedColumns.includes(10) ? "sk-col-selected" : ""}`}>
                        {renderEventDumpCell(displayedEnterTime)}
                    </div>

                    <div className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}>
                        {shouldHideExitTime ? '' : renderEventDumpCell(displayedExitTime)}
                    </div>

                    <div className={`${selectedColumns.includes(22) ? "sk-col-selected" : ""}`}> {/*РѕР±РµРґ*/}
                        {formatDurationFromMinute(content.lunch_time)}
                    </div>

                    <div className={`${selectedColumns.includes(14) ? "sk-col-selected" : ""}`}>
                        {formatDurationFromMinute(content.exit_time_count)}
                    </div>

                    <div className={`sk-userlist-lost-time-cell ${selectedColumns.includes(16) ? "sk-col-selected" : ""}`}>
                        {formatDurationFromMinute(content.lost_time_count)}
                    </div>

                    {props?.extendedInfo && (
                        <div>
                            {content.schedule && (
                                <div style={{textAlign: 'center'}}>
                                    <Tooltip title={renderScheduleTooltip(content.schedule)} overlayClassName="sk-theme-tooltip">
                                        <CalendarOutlined/>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    )}

                    {props?.extendedInfo && (
                        <div>
                            {content.rules && content.rules.length > 0 && (
                                <div style={{textAlign: 'center'}}>
                                    <Tooltip title={renderRulesTooltip(content.rules)} overlayClassName="sk-theme-tooltip">
                                        <FlagOutlined/>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    )}

                    {props?.extendedInfo && (
                        <div>
                            {content.boss_id > 0 && (
                                <Tooltip placement="left"
                                         title={`Руководитель: ${content.boss_surname} ${content.boss_name} ${content.boss_patronymic}`}
                                         arrow={mergedArrow}
                                >
                                    <div style={{textAlign: 'center', cursor: 'pointer'}}
                                         onClick={handleMarkUser}
                                    >
                                        <RobotOutlined className={'sk-usermonic-boss-trigger'}/>
                                    </div>
                                </Tooltip>
                            )}
                        </div>
                    )}

                    <div className="sk-userlist-claims-cell" style={{textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}>
                            {visibleClaims.length > 0 && (
                                <div className="sk-userlist-claims-icons">
                                    {visibleClaims.map((claim) => (
                                        <Tooltip key={`claim-icon-${content.id}-${claim.id}`} title={renderClaimTooltip(claim)} placement="bottom" overlayClassName="sk-theme-tooltip">
                                            <span
                                                className={getClaimIconClassName(claim)}
                                                onClick={(event) => handleClaimClick(event, claim)}
                                                role="button"
                                                tabIndex={0}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        handleClaimClick(event, claim);
                                                    }
                                                }}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                    filter: claim?.not_today ? 'grayscale(1)' : 'none',
                                                    opacity: claim?.not_today ? 0.55 : 1,
                                                }}
                                            >
                                                <StateIconsController IdState={claim?.skud_current_state_id} height={'20px'}/>
                                            </span>
                                        </Tooltip>
                                    ))}
                                </div>
                            )}
                            {visibleClaims.length === 0 && content?.globalState && (
                                <StateIconsController IdState={content?.globalState.value} height={'20px'}/>
                            )}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserMonitorListCard;



