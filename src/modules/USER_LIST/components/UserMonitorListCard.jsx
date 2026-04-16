import { Tag, Tooltip } from "antd";
import dayjs from "dayjs";
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

    useEffect(()=> {
        setContent(props.data);
        if (props.data.current_state !== 0)
        {
            setBadger({ title: props.data.state_text, text: props.data.state_title, color: props.data.state_color, icon: <DynamicIcon iconName={props.data.state_icon} />});
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

    const handleMouseOver = (ev) => {
        if (ev.target.closest('.sk-move-to-me')){
            console.log('ev.target', ev.target)
            const elementdiv = document.querySelector('.sk-move-to-me');
            elementdiv.classList.remove('sk-move-to-me');
        }
    }

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
        if (claim?.state === 1) {
            return 'РЎРѕРіР»Р°СЃРѕРІР°РЅР°';
        }
        if (claim?.state === 2) {
            return 'РћС‚РєР»РѕРЅРµРЅР°';
        }

        return 'РќР° СЂР°СЃСЃРјРѕС‚СЂРµРЅРёРё';
    };

    const renderClaimTooltip = (claim) => {
        return (
            <div style={{maxWidth: '320px'}}>
                <div><strong>{claim?.skud_current_state?.title || claim?.skud_current_state?.text || 'Заявка'}</strong></div>
                <div>Начало: {claim?.start ? dayjs(claim.start).format('DD.MM.YYYY HH:mm') : '-'}</div>
                <div>Конец: {claim?.end ? dayjs(claim.end).format('DD.MM.YYYY HH:mm') : '-'}</div>
            </div>
        );
    };

    const enterExitData = content?.enter_exit ?? content?.event_dump;

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

    const shouldHideExitTime = useMemo(() => {
        if (!normalizedEnterExitData.length) {
            return false;
        }

        const lastEvent = normalizedEnterExitData[normalizedEnterExitData.length - 1];
        const lastDirection = Number(lastEvent?.direction ?? lastEvent?.diraction ?? lastEvent?.d);

        return lastDirection === 0;
    }, [normalizedEnterExitData]);

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

        const formattedValue = dayjs(value).format('HH:mm');

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
                                {content.enter_time && dayjs(content.enter_time).format('HH:mm')}
                            </div>
                            <div className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}>
                                {content.exit_time && dayjs(content.exit_time).format('HH:mm')}
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
                     ${content.type === 'header' ? 'sk-usermonic-crd-divider' : ''}
                     ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${markedCard ? 'sk-usermonic-crd-marked' : ''}
                     ${itsMe ? 'sk-usermonic-crd-mine' : ''} ${currentState !== 4 && content.type !== 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
                >
                    <div>
                        <div className={`${selectedColumns.includes(1) ? "sk-col-selected" : ""}`}
                             style={{paddingLeft: '6px', textAlign: 'center'}}>
                            {content.id}
                        </div>
                    </div>

                    <div title={content.user_occupy} style={{textAlign: 'left'}}>
                        <div className={`${selectedColumns.includes(2) ? "sk-col-selected" : ""}`}>
                            {content.surname} {content.name} {content.patronymic}
                        </div>
                    </div>

                    <div style={{overflow: 'hidden', textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(3) ? "sk-col-selected" : ""}`}>
                            <div>{content.phone && content.phone !== 0 && content.phone}</div>
                        </div>
                    </div>

                    <div className={`${selectedColumns.includes(10) ? "sk-col-selected" : ""}`}>
                        {renderEventDumpCell(content.enter_time)}
                    </div>

                    <div className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}>
                        {shouldHideExitTime ? '' : renderEventDumpCell(content.exit_time)}
                    </div>

                    <div className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}> {/*РѕР±РµРґ*/}
                        {content.lunch_time ? secondsToTime(content.lunch_time) : ''}
                    </div>

                    <div className={`${selectedColumns.includes(14) ? "sk-col-selected" : ""}`}>
                        {content.exit_time_count ? secondsToTime(content.exit_time_count) : ''}
                    </div>

                    {props?.extendedInfo && (
                        <div className={`${selectedColumns.includes(12) ? "sk-col-selected" : ""}`}>
                            {content.job_time_count ? secondsToTime(content.job_time_count) : ''}
                        </div>
                    )}

                    {props?.extendedInfo && (
                        <div className={`${selectedColumns.includes(13) ? "sk-col-selected" : ""}`}>
                            {content.all_time_count ? secondsToTime(content.all_time_count) : ''}
                        </div>
                    )}

                    {props?.extendedInfo && (
                        <div className={`${selectedColumns.includes(15) ? "sk-col-selected" : ""}`}>
                            {content.time_need_work ? secondsToTime(content.time_need_work) : ''}
                        </div>
                    )}

                    <div className={`${selectedColumns.includes(16) ? "sk-col-selected" : ""}`}>
                        {content.lost_time_count ? secondsToTime(content.lost_time_count) : ''}
                    </div>

                    {props?.extendedInfo && (
                        <div>
                            {content.schedule && (
                                <div style={{textAlign: 'center'}}>
                                    <Tooltip title={JSON.stringify(content.schedule.skud_schedule)}>
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
                                    <Tooltip title={JSON.stringify(content.rules)}>
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
                                         title={`Р СѓРєРѕРІРѕРґРёС‚РµР»СЊ: ${content.boss_surname} ${content.boss_name} ${content.boss_patronymic}`}
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

                    <div style={{textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}>
                            {content?.claims && content.claims.length > 0 && (
                                <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap'}}>
                                    {content.claims.map((claim) => (
                                        <Tooltip key={`claim-icon-${content.id}-${claim.id}`} title={renderClaimTooltip(claim)} placement="bottom" overlayClassName="sk-theme-tooltip">
                                            <span
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    cursor: 'help',
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
                            {!content?.claims?.length && content?.globalState && (
                                <StateIconsController IdState={content?.globalState.value} height={'20px'}/>
                            )}
                        </div>
                    </div>
                    <div>
                        <div style={{textAlign: 'center'}}>
                            {badger && (
                                <Tag className="sk-usermonic-badger"
                                     style={{background: getReadableBadgeBackground(badger.color)}}
                                     title={badger.title}
                                >{badger.icon} <span>{badger.text}</span></Tag>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMonitorListCard;



