import React, { useEffect, useState } from "react";
import './style/schedcalendar.css';
import { DatePicker } from "antd";

const MONTH_BUTTONS = [
    {
        key: 'itemonth01',
        value: 1,
        label: 'Январь',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth02',
        value: 2,
        label: 'Февраль',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth03',
        value: 3,
        label: 'Март',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth04',
        value: 4,
        label: 'Апрель',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth05',
        value: 5,
        label: 'Май',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth06',
        value: 6,
        label: 'Июнь',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth07',
        value: 7,
        label: 'Июль',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth08',
        value: 8,
        label: 'Август',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth09',
        value: 9,
        label: 'Сентябрь',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth10',
        value: 10,
        label: 'Октябрь',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth11',
        value: 11,
        label: 'Ноябрь',
        count_days: 0,
        count_hours: 0,
        locked: 0,
    },
    {
        key: 'itemonth12',
        value: 12,
        label: 'Декабрь',
        count_days: 5,
        count_hours: 0,
        locked: 0,
    }
];




const SchedCalendar = (props)=>{
    const [MB, setMB] = useState(MONTH_BUTTONS);
    const [activeMonth, setActiveMonth] = useState(1);

    const setMonthValue = (ev)=> {
        setActiveMonth( parseInt(ev.target.closest('.sk-fbs-button').getAttribute('data-id')));
        console.log(ev.target.closest('.sk-fbs-button').getAttribute('data-id'));
    }
    useEffect(()=>{
        setMB(MONTH_BUTTONS);
    }, [activeMonth])


    return (
        <div className="sk-form-frame-body">
            <div className="sk-form-frame-row">
                <div className={'sk-form-button-stack'}>
                {MB.map((item)=>(
                    <div 
                        data-id={item.value}
                        onClick={(event)=>{setMonthValue(event)}}
                        className={`sk-fbs-button ${item.value === activeMonth ? 'sk-active' : ''}`}
                    >
                        <div>
                        {item.label[0] + item.label[1].toUpperCase() + item.label[2].toUpperCase() }
                        </div>
                        <div>
                            { item.count_days > 0 ? item.count_days : ""}
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="sk-form-frame-row">
                <div className={'sk-ffr-toolbar'}>
                    <div>
                        <label>Начало смены</label>
                        <DatePicker
                        showSecond={false}
                        // defaultValue={defaultValue}
                        showTime
                        // locale={buddhistLocale}
                        // onChange={onChange}
      />
                    </div>
                    <div>
                        Haljlkfa
                    </div>
                </div>
            </div>
            <div className="sk-form-frame-row">
                Calendar
            </div>
            <div className="sk-form-frame-row">
                Stats
            </div>
        </div>
    )
};

export default SchedCalendar;