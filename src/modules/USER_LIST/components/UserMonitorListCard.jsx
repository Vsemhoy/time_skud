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
            return 'Согласована';
        }
        if (claim?.state === 2) {
            return 'Отклонена';
        }

        return 'На рассмотрении';
    };

    const renderClaimTooltip = (claim) => {
        const info = parseClaimInfo(claim?.info);
        const details = [
            info.target_point ? `Цель: ${info.target_point}` : null,
            info.target_address ? `Адрес: ${info.target_address}` : null,
            info.comment ? `Комментарий: ${info.comment}` : null,
            Number.isFinite(Number(info.subway_count)) ? `Метро: ${Number(info.subway_count)}` : null,
            Number.isFinite(Number(info.bus_count)) ? `Наземный транспорт: ${Number(info.bus_count)}` : null,
            Number.isFinite(Number(info.total_price)) ? `Сумма: ${Number(info.total_price)}` : null,
        ].filter(Boolean);

        return (
            <div style={{maxWidth: '320px'}}>
                <div><strong>{claim?.skud_current_state?.title || claim?.skud_current_state?.text || 'Заявка'}</strong></div>
                <div>Статус: {getClaimStatusText(claim)}</div>
                <div>Начало: {claim?.start ? dayjs(claim.start).format('DD.MM.YYYY HH:mm') : '-'}</div>
                <div>Конец: {claim?.end ? dayjs(claim.end).format('DD.MM.YYYY HH:mm') : '-'}</div>
                {details.map((detail, index) => (
                    <div key={`claim-detail-${claim?.id}-${index}`}>{detail}</div>
                ))}
            </div>
        );
    };

    const enterExitData = content?.enter_exit ?? content?.event_dump;

    const hasEventDump = Array.isArray(enterExitData)
        ? enterExitData.length > 0
        : typeof enterExitData === 'string' && enterExitData.length > 2;

    const renderEventDumpTooltip = () => {
        if (!hasEventDump) {
            return null;
        }

        return (
            <div style={{maxWidth: '420px'}}>
                <UserlistEventDumpCard data={enterExitData} themeSafe={true} />
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
            <Tooltip title={renderEventDumpTooltip()} placement="bottom">
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
                            title="Статистика по отделу"
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
                            <Tooltip placement="left" title={`Руководитель: ${content.boss_surname} ${content.boss_name} ${content.boss_patronymic}`} arrow={mergedArrow}>
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
                                style={{background: badger.color}}
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
                            title="Статистика по отделу"
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
                        {renderEventDumpCell(content.exit_time)}
                    </div>

                    <div className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}> {/*обед*/}
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

                    <div style={{textAlign: 'center'}}>
                        <div className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}>
                            {content?.claims && content.claims.length > 0 && (
                                <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap'}}>
                                    {content.claims.map((claim) => (
                                        <Tooltip key={`claim-icon-${content.id}-${claim.id}`} title={renderClaimTooltip(claim)}>
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
                                     style={{background: badger.color}}
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
