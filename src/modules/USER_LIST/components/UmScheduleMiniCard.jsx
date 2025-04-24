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
                            Время начала рабочего дня
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {secondsToTime(baseSchedule.start_time)}
                        </div>
                    </div>

                    <div className="sk-umsmi-row sk-usmi-dorian-g ">
                        <div className={'sk-umsmi-title'}>
                            Время заката рабочего дня
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {secondsToTime(baseSchedule.end_time)}
                        </div>
                    </div>

                    {scheduleType.id === 1}{
                        <>
                            <div className="sk-umsmi-row">
                                <div className={'sk-umsmi-title'}>
                                    Время начала обеденного интервала
                                </div>
                                <div className={'sk-umsmi-data'}>
                                    {secondsToTime(baseSchedule.lunch_start)}
                                </div>
                            </div>

                            <div className="sk-umsmi-row">
                                <div className={'sk-umsmi-title'}>
                                    Время конца обеденного интервала
                                </div>
                                <div className={'sk-umsmi-data'}>
                                    {secondsToTime(baseSchedule.lunch_end)}
                                </div>
                            </div>
                        </>
                    }

                    <div className="sk-umsmi-row sk-usmi-dorian-g ">
                        <div className={'sk-umsmi-title'}>
                            Продолжительность рабочего дня <br />(не считая обеда)
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {secondsToTime(baseSchedule.target_time)}
                        </div>
                    </div>

                    {scheduleType.id === 1}{
                        <>
                            <div className="sk-umsmi-row sk-usmi-dorian-g ">
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
                            <div className={'sk-umsmi-title'}>
                                Общее время работы, всключая обед
                            </div>
                            <div className={'sk-umsmi-data'}>
                                {secondsToTime(baseSchedule.target_time + baseSchedule.lunch_time)}
                            </div>
                        </div>
                    )}

                    <div style={{textAlign: 'center', padding: '6px'}}>***</div>

                    <div className="sk-umsmi-row">
                        <div className={'sk-umsmi-title'}>
                            Начало действия графика
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {dayjs(link.start).format('DD-MM-YYYY')}
                        </div>
                    </div>

                    <div className="sk-umsmi-row">
                        <div className={'sk-umsmi-title'}>
                            График действует до
                        </div>
                        <div className={'sk-umsmi-data'}>
                            {link.end === null ? "бессрочно" : dayjs(link.end).format('DD-MM-YYYY')}
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