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
    TruckOutlined
 } from "@ant-design/icons";
import { getWeekDayString, secondsToTime } from "../../../GlobalComponents/Helpers/TextHelpers";
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
            ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${ markedCard ? 'sk-usermonic-crd-marked' : ''}
            ${ itsMe ? 'sk-usermonic-crd-mine' : ''} ${ currentState != 10 && content.type != 'header' ? 'sk-usermonic-crd-notinoffice-state' : ''}`}
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
                <div >
                <div className={`${selectedColumns.includes(1) ? "sk-col-selected": ""}`}
                style={{paddingLeft: '6px', textAlign: 'center'}}>
                    {content.user_id}
                </div>
                </div>

                <div title={content.user_occupy}>
                    <div className={`${selectedColumns.includes(2) ? "sk-col-selected": ""}`}>
                    {content.user_surname} {content.user_name} {content.user_patronymic}</div>
                </div>

                    <div style={{overflow: 'hidden', textAlign: 'center'}}>
                <div className={`${selectedColumns.includes(3) ? "sk-col-selected": ""}`}>
                    <div>{content.phone && content.phone != 0 && content.phone}</div>
                    </div>
                </div>

                <div className="sk-flex-space">
                    {/* {dayjs(content.datetime_contr).format("DD-MM-YYYY   HH:mm")} */}
                    <div></div>
                    <div className={'sk-usermonic-micro-row'}>
                        <div className={`${selectedColumns.includes(10) ? "sk-col-selected": ""}`}>
                        {content.enter_time && dayjs(content.enter_time).format('HH:mm')}
                        </div>
                        
                        <div className={`${selectedColumns.includes(11) ? "sk-col-selected": ""}`}>
                            {content.exit_time && dayjs(content.exit_time).format('HH:mm')}
                        </div>
                        <div className={`${selectedColumns.includes(12) ? "sk-col-selected": ""}`}>
                            {content.job_time_count && secondsToTime(content.job_time_count)}
                        </div>
                        <div className={`${selectedColumns.includes(13) ? "sk-col-selected": ""}`}>
                            {content.all_time_count && secondsToTime(content.all_time_count)}
                        </div>
                        <div className={`${selectedColumns.includes(14) ? "sk-col-selected": ""}`}>
                            {content.exit_time_count && secondsToTime(content.exit_time_count)}
                        </div>
                        <div className={`${selectedColumns.includes(15) ? "sk-col-selected": ""}`}>
                            {content.time_need_work && secondsToTime(content.time_need_work)}
                        </div>
                        <div className={`${selectedColumns.includes(16) ? "sk-col-selected": ""}`}>
                            {content.lost_time_count && secondsToTime(content.lost_time_count)}
                        </div>

                    </div>
                    <div></div>
                </div>

                <div style={{textAlign: 'center'}}>
                <div className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                    {content.is_late && (<IssuesCloseOutlined 
                        title="Опоздание"
                    />)}</div>
                </div>
                <div>
                    <div style={{textAlign: 'center'}}>
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
                        >
                        {badger.icon} <span>{badger.text}</span>
                        </Tag>
                    )}</div>
                </div>
                </>
            )}

        </div>
    )
}

export default UserMonitorListCard;