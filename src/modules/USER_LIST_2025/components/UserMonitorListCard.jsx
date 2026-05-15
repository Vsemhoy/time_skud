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
    TruckOutlined
 } from "@ant-design/icons";
import { getWeekDayString, secondsToTime } from "../../../components/Helpers/TextHelpers";
import { formatMoscowDateTime, moscowDateTime } from "../../../components/Helpers/DateTimeHelpers";
import './style/usermonitorlist.css';
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";



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

const formatPhone = (phone) => (phone && phone != 0 && phone !== '0' ? phone : '-');

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
    const statusBackground = badger?.color;
    const showIdColumn = props.show_id_column !== false;
    const isLateEnter = isEnterLaterThanSchedule(content.enter_time, content.schedule);

    useEffect(()=> {
        setContent(props.data);
        if (props.data.current_state != 0)
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
        if (content.user_id !== undefined && props.marked_users && props.marked_users.includes(content.user_id)){
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
        if (content.user_id){
            if (props.on_double_click){
                props.on_double_click(content.user_id);
            }
        }
    }

    const handleMOuseOver = (ev) => {
        if (ev.target.closest('.sk-move-to-me')){
            console.log('ev.target', ev.target)
            const elementdiv = document.querySelector('.sk-move-to-me');
            elementdiv.classList.remove('sk-move-to-me');
        }
    }

    

    return (
        <div 
            onMouseOver={handleMOuseOver}
            id={`row_${content.user_id}`}
            onDoubleClick={handleDoubleClickOnRow}
            className={`sk-usermonic-cardrow ${ content.type == 'header' ? 'sk-usermonic-crd-divider' : ''}
            ${showIdColumn ? '' : 'without-id-column'}
            ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${ markedCard ? 'sk-usermonic-crd-marked' : ''}
            ${ itsMe ? 'sk-usermonic-crd-mine' : ''} ${ currentState !== 4 && content.type !== 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
        >
            {content.type && 
            content.type == 'header' ? (
                <>
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
                <div style={{padding: '3px'}}>
                   
                </div>
                </>
            ):(
                
                <>
                {showIdColumn && (
                    <div className="sk-userlist-id-cell">
                        <div className={`${selectedColumns.includes(1) ? "sk-col-selected": ""}`}
                        style={{paddingLeft: '6px', textAlign: 'center'}}>
                            {content.user_id}
                        </div>
                    </div>
                )}

                <div
                    title={content.user_occupy}
                    className="sk-userlist-name-status-cell sk-userlist-employee-cell"
                    style={{'--user-status-bg': statusBackground}}
                >
                    <div className={`${selectedColumns.includes(2) ? "sk-col-selected": ""}`}>
                        <div className="sk-userlist-name-cell">
                            <span className="sk-userlist-name-text">
                                {content.user_surname} {content.user_name} {content.user_patronymic}
                            </span>
                            {badger && (
                                <span
                                    className="sk-userlist-status-inline sk-userlist-status-inline--tag"
                                    title={badger.title}
                                >
                                    {badger.icon}
                                    <span>{badger.text || badger.title}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="sk-userlist-phone-cell" style={{overflow: 'hidden', textAlign: 'center'}}>
                    <div className={`${selectedColumns.includes(3) ? "sk-col-selected": ""}`}>
                        <div>{formatPhone(content.phone)}</div>
                    </div>
                </div>

                <div className={`sk-userlist-enter-cell ${isLateEnter ? 'sk-userlist-enter-cell--late' : ''} ${selectedColumns.includes(10) ? "sk-col-selected": ""}`}>
                    {formatMoscowDateTime(content.enter_time)}
                </div>

                <div className={`${selectedColumns.includes(11) ? "sk-col-selected": ""}`}>
                    {formatMoscowDateTime(content.exit_time)}
                </div>

                <div className={`${selectedColumns.includes(22) ? "sk-col-selected": ""}`}>
                    {content.lunch_time && secondsToTime(content.lunch_time)}
                </div>

                <div className={`${selectedColumns.includes(14) ? "sk-col-selected": ""}`}>
                    {content.exit_time_count && secondsToTime(content.exit_time_count)}
                </div>

                <div className={`sk-userlist-lost-time-cell ${selectedColumns.includes(16) ? "sk-col-selected": ""}`}>
                    {content.lost_time_count && secondsToTime(content.lost_time_count)}
                </div>

                <div className="sk-userlist-claims-cell" style={{textAlign: 'center'}}>
                    <div className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                        {content?.claims && content.claims.length > 0 && content.claims.length}
                        {content.is_late && (<IssuesCloseOutlined
                            title="Опоздание"
                        />)}
                    </div>
                </div>

                </>
            )}

        </div>
    )
}

export default UserMonitorListCard;
