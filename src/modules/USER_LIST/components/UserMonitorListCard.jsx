import { Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

import { BugOutlined, IssuesCloseOutlined, RobotOutlined } from "@ant-design/icons";
import { getWeekDayString, secondsToTime } from "../../../GlobalComponents/Helpers/TextHelpers";
import './style/usermonitorlist.css';
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";

const UserMonitorListCard = (props) => {

    const [content, setContent] = useState(props.data);    
    const [badger, setBadger] = useState(null);
    const [bColor, setBColor] = useState('#fff');

    const [markedCard, setMarkedCard] = useState(false);
    const [itsMe, setItsMe] = useState(false);
    
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


    useEffect(()=> {
        setContent(props.data);
        if (props.data.current_state != null && USER_STATE_PLACES[props.data.current_state] != null)
        {
            setBadger(USER_STATE_PLACES[props.data.current_state]);
        } else {
            setBadger(null);
        }
    },[props.data]);

    useEffect(()=> {
        setItsMe(props.its_me);
    },[props.its_me]);

    useEffect(()=> {
        if (props.marked_users && props.marked_users.includes(content.user_id)){
            setMarkedCard(true);
        } else {
            setMarkedCard(false);
        }
    },[props.marked_users])


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

    return (
        <div 
            id={`row_${content.user_id}`}
            onDoubleClick={handleDoubleClickOnRow}
        className={`sk-usermonic-cardrow ${ content.type == 'header' ? 'sk-usermonic-crd-divider' : ''} ${content.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'} ${ markedCard ? 'sk-usermonic-crd-marked' : ''} ${ itsMe ? 'sk-usermonic-crd-mine' : ''}`}
        >
            {content.type && 
            content.type == 'header' ? (
                <>
                <div></div>
                <div>
                    {content.name}
                </div>
                </>
            ):(
                <>

                <div>
                    {content.user_id}
                </div>

                <div>
                    {content.user_surname} {content.user_name} {content.user_patronymic}
                </div>

                <div>
                    <div style={{overflow: 'hidden'}}>
                    {content.phone && content.phone != 0 && content.phone}
                    </div>
                </div>

                <div className="sk-flex-space">
                    {/* {dayjs(content.datetime_contr).format("DD-MM-YYYY   HH:mm")} */}
                    <div></div>
                    <div className={'sk-usermonic-micro-row'}>
                        <div>
                        {content.enter_time && dayjs(content.enter_time).format('HH:mm')}
                        </div>
                        
                        <div>
                            {content.exit_time && dayjs(content.exit_time).format('HH:mm')}
                        </div>
                        <div>
                            {content.job_time_count && secondsToTime(content.job_time_count)}
                        </div>
                        <div>
                            {content.exit_time_count && secondsToTime(content.exit_time_count)}
                        </div>
                        <div>
                            {content.time_need_work && secondsToTime(content.time_need_work)}
                        </div>
                        <div>
                            {content.lost_time_count && secondsToTime(content.lost_time_count)}
                        </div>

                    </div>
                    <div></div>
                </div>

                <div>
                    {content.is_late && (<IssuesCloseOutlined 
                        title="Опоздание"
                    />)}
                </div>
                <div>
                    {content.boss_id > 0 && ( 
                        <Tooltip placement="left" title={`Руководитель: ${content.boss_surname} ${content.boss_name} ${content.boss_patronymic}`} arrow={mergedArrow}>
                            <RobotOutlined
                                onClick={handleMarkUser}
                                className={'sk-usermonic-boss-trigger'}
                            />

                        </Tooltip>
                    )}
                </div>
                <div>
                    {badger && (
                        <Tag className="sk-usermonic-badger"
                            style={{background: badger.color}}
                            title={badger.title}
                        >
                        {badger.icon} <span>{badger.text}</span>
                        </Tag>
                    )}
                </div>
                </>
            )}

        </div>
    )
}

export default UserMonitorListCard;