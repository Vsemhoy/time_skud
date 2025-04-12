import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { secondsToTime } from "../../../GlobalComponents/Helpers/TextHelpers";
import { DS_SCHED_UNITS } from "../../../CONFIG/DEFAULTSTATE";
import { HOST_COMPONENT_ROOT } from "../../../CONFIG/config";

import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import SchedEmptySVG from "../../../media/schedule-empty.svg";
import { EllipsisOutlined } from "@ant-design/icons";


const Sched_type_icon = (type) => {
    switch (type.children) {
        case 1:
            return ( <img src={HOST_COMPONENT_ROOT + SchedStdSVG} title='Пятидневка график'/>);
        break;
        case 2:
            return (<img src={HOST_COMPONENT_ROOT + SchedFlexSVG}  title='Гибкий график'/>);
        break;
        case 3:
            return (<img src={HOST_COMPONENT_ROOT + SchedFreeSVG}  title='Свободный график'/>);
        break;
        case 4:
            return (<img  src={HOST_COMPONENT_ROOT + SchedShiftSVG} title='Сменный график'/>);
        break;
        case 5:
            return (<img src={HOST_COMPONENT_ROOT + SchedSumSVG}    title='Суммированный график'/>);
        break;
        default:

        return (<img src={HOST_COMPONENT_ROOT + SchedEmptySVG}    title='Нет графика'/>);
    }
}


const UmCardSchedRow = (props)=>{
    console.log("UmCardSchedRow", props);
    const [unitName, setUnitName] = useState("");

    const [schedule, setSchedule] = useState(props.schedule_item);

    useEffect(()=>{
        if (props && props.schedule_item && props.schedule_item.skud_schedule_type_id < 3){
            let unit = DS_SCHED_UNITS.find((u)=>{return u.value === props.schedule_item.target_unit});
            console.log('unit', unit)
            if (unit){
                setUnitName(unit.label);
            }
        }
    }, [props.schedule_item])



    return (
        <>
            {props.schedule_item === null || schedule === undefined ? (
                <div className={'sk-row-cc-2col'}>
                    <div style={{textAlign:'center', padding: '3px',color: '#8b8b8b'}}>
                        <EllipsisOutlined />
                    </div>
                    <div style={{padding: '3px',color: '#8b8b8b'}}>
                        Нет привязанных графиков
                    </div>
                </div>
            ):(
                <div className={'sk-row-cc-2col'}>
                    <div style={{textAlign:'center'}} className={'sk-cccard-flexer-in-row'}>
                        <Sched_type_icon>{schedule.skud_schedule_type_id}</Sched_type_icon>
                    </div>
                    <div className={'sk-row-inline-several-col'}>
                        <div className={'sk-row-in-cell'}
                            title={schedule.description}
                            style={{textAlign:'left'}}
                            >
                            {schedule.name}
                        </div>
                        <div className={'sk-row-in-cell'}
                        title={"Начало рабочего дня"}
                        >
                            { secondsToTime(schedule.start_time)}
                        </div>
                        <div className={'sk-row-in-cell'}
                        title={"Конец рабочего дня"}
                        >
                            {secondsToTime(schedule.end_time)}
                        </div>
                        <div className={'sk-row-in-cell'}
                        title={"Начало обеда"}
                        >
                            {secondsToTime(schedule.lunch_start)}
                        </div>
                        <div className={'sk-row-in-cell'}
                        title={"Конец обеда"}
                        >
                            {secondsToTime(schedule.lunch_end)}
                        </div>
                            <div className={'sk-row-in-cell'}
                            title={"Время обеда"}
                            >
                            {secondsToTime(schedule.lunch_time)}
                        </div>
                        <div className={'sk-row-in-cell'}
                            title={"Целевое время"}
                        >
                            {secondsToTime(schedule.target_time)}
                        </div>
                        <div className={'sk-row-in-cell'}>
                            {unitName}
                        </div>
                        
                    </div>
                </div>
            )}
        
        </>
    );
}

export default UmCardSchedRow;