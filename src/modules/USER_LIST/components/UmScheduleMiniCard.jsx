import React, { useState, useEffect } from "react";
import { secondsToTime } from "../../../GlobalComponents/Helpers/TextHelpers";
import dayjs from "dayjs";

const UmScheduleMiniCard = (props) => {

    const [baseSchedule, setBaseSchedule] = useState(null);
    
    const [scheduleType, setScheduleType] = useState(null);
    
    const [link, setLink] = useState(null);
    
    useEffect(()=>{ 
        setBaseSchedule(props.data.skud_schedule);
        setScheduleType(props.data.skud_schedule?.skud_schedule_type);
        setLink(props.data);
    },[props.data.skud_schedule]);


    return (
        <div>
            <br />
            {link !== null && (

            <div className="sk-w-padding-18 sk-umsmi-card">
            <div className="">
                <div className="sk-umsmi-card-title">{scheduleType?.name} график</div>
                <div>

                    <div className="sk-umsmi-row sk-usmi-dorian-g ">
                        <div className={'sk-umsmi-title'}>
                            Рабочее время
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {secondsToTime(baseSchedule.start_time)} - {secondsToTime(baseSchedule.end_time)}
                        </div>
                    </div>



                    {scheduleType.id === 1}{
                        <>
                            <div className="sk-umsmi-row">
                                <div className={'sk-umsmi-title'} title={'Временной интервал, в котором сотрудник может выходить из офиса на обед'}>
                                    Время обеда
                                </div>
                                <div className={'sk-umsmi-data'}>
                                    {secondsToTime(baseSchedule.lunch_start)} - {secondsToTime(baseSchedule.lunch_end)}
                                </div>
                            </div>
                        </>
                    }

                    <div className="sk-umsmi-row sk-usmi-dorian-g ">
                        <div className={'sk-umsmi-title'} title={'Время, которое сотрудник должен отработать, не считая обеда'}>
                            Продолжительность рабочего дня <br />
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {secondsToTime(baseSchedule.target_time)}
                        </div>
                    </div>

                    {scheduleType.id === 1}{
                        <>
                            <div className="sk-umsmi-row">
                                <div className={'sk-umsmi-title'}>
                                    Продолжительность обеда
                                </div>
                                <div className={'sk-umsmi-data'}>
                                    {secondsToTime(baseSchedule.lunch_time)}
                                </div>
                            </div>
                        </>
                    }

                    {baseSchedule.lunch_time > 0 && (
                        <div className="sk-umsmi-row sk-usmi-dorian-g ">
                            <div className={'sk-umsmi-title'} title={'Рабочее время + обед, не считая опоздания и кратковременные выходы'}>
                                Общее время работы с обедом
                            </div>
                            <div className={'sk-umsmi-data'}>
                                {secondsToTime(baseSchedule.target_time + baseSchedule.lunch_time)}
                            </div>
                        </div>
                    )}

                    <div style={{textAlign: 'center', padding: '6px'}}>***</div>

                    <div className="sk-umsmi-row sk-usmi-dorian-g">
                        <div className={'sk-umsmi-title'}>
                            График действителелен с
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {dayjs(link.start).format('DD-MM-YYYY')} {link.end === null ? " " : " по " + dayjs(link.end).format('DD-MM-YYYY')}
                        </div>
                    </div>

                </div>
            </div>
            </div>
            )}
        </div>
    )
}

export default UmScheduleMiniCard;