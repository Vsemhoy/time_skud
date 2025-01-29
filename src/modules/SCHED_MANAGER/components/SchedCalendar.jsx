import React, { useEffect, useState } from "react";
import './style/schedcalendar.css';
import dayjs from "dayjs";
import { Button, DatePicker, InputNumber } from "antd";
import ProdCalUnit from "../../PROD_CAL_MANAGER/components/ProdCalUnit";

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


const DEMO_SCHED = [
    [1738389600,1738476000],
    [1738648800,1738735200],
    [1738814400,1738824400],
    [1738900800,1738951200],
    [1739073600,1739109600],
    [1739160000,1739196000],
    [1739638800,1739725200],
    [	1740315600,	1740402000]
]

const SchedCalendar = (props)=>{
    const [MB, setMB] = useState(MONTH_BUTTONS);
    const [targetMonth, setTargetMonth] = useState(1);

    const [calendarDays, setCalendarDays] = useState([]);
    const [schedule, setSchedule] = useState(DEMO_SCHED);
    const [selectedDays, setSelectedDays] = useState([]);
    const setMonthValue = (ev)=> {
        setTargetMonth( parseInt(ev.target.closest('.sk-fbs-button').getAttribute('data-id')));
        console.log(ev.target.closest('.sk-fbs-button').getAttribute('data-id'));
    }
    useEffect(()=>{
        setMB(MONTH_BUTTONS);
    }, [targetMonth])

    const [targetYear, setTargetYear] = useState(2025);


 useEffect(()=>{
        const operDate = dayjs(`${targetYear}-${targetMonth}-01`);
        const startOfMonth = ((operDate.day(1).date() < 32 && operDate.day(1).date() > 20) || operDate.day(1).date() === 1)   ? operDate.day(1) : operDate.day(1).subtract(1, 'week');

        let toper = operDate.add(1, 'month').add(1, 'week').day(0);
        const endOfMonth =  (toper.date() < 7) ? toper : operDate.add(1, 'month').day(0);

        const firstDate = operDate;
        const lastDate = operDate.add(1, 'month').subtract(1, 'day');

        const daysArray = [];
        let currentDate = startOfMonth;



        while (currentDate.isBefore(endOfMonth) || currentDate.isSame(endOfMonth))
        {
            let obj = {
                value: currentDate.date(),
                month: currentDate.month() + 1, // Месяцы начинаются с 0
                date: currentDate.format('YYYY-MM-DD'),
                // is_weekend: currentDate.day() === 0 || currentDate.day() === 6, // Воскресенье (0) или Суббота (6),
                week_day: currentDate.day(),
                outrange: currentDate.isBefore(firstDate) || currentDate.isAfter(lastDate),
            };
            if (schedule.length > 0){
                let start = currentDate.startOf('day');
                let end = currentDate.add(1, 'day').startOf('day');
                obj.smens = [];

                for (let i = 0; i < schedule.length; i++) {
                    const checkDateStart = dayjs.unix(parseInt(schedule[i][0]));
                    const checkDateEnd = dayjs.unix(parseInt(schedule[i][1]));

                    if (checkDateStart.unix() >= start.unix() && checkDateStart.unix() < end.unix()){
                        let hourslen = checkDateEnd.diff(checkDateStart, 'hours');
                        // console.log('checkDate', hourslen, checkDateStart, checkDateEnd)
                        let smena = {};
                        smena.offset = checkDateStart.hour() != 0 ? checkDateStart.hour() / 24 : 0;
                        smena.width = hourslen != 0 ? hourslen / 24 : 0;
                        smena.index = i;

                        if (smena.offset + smena.width > 1){
                            smena.width = 1 - smena.offset;
                        } 
                        obj.smens.push(smena);
                    }

                    if (checkDateStart.unix() < start.unix()
                         && checkDateEnd.unix() > start.unix() 
                        && checkDateEnd.unix() <= end.unix())
                    {
                        let hourslen = checkDateEnd.diff(start, 'hours');
                        console.log('checkDate', hourslen, checkDateStart, checkDateEnd)
                        let smena = {};
                        smena.offset = 0;
                        smena.width = hourslen != 0 ? hourslen / 24 : 0;
                        smena.index = i;

                        obj.smens.push(smena);
                    }
                }
            }

            daysArray.push(obj);
            currentDate = currentDate.add(1, 'day');
        }
        console.log(daysArray);
        setCalendarDays(daysArray);
        setTimeout(() => {
            let items = document.querySelectorAll('.sk-fbs-smena');
            for (let i = 0; i < items.length; i++) {
                const element = items[i];
                let w = parseFloat(element.getAttribute('data-width'));
                let o = parseFloat(element.getAttribute('data-offset'));

                let source_w = element.parentNode.offsetWidth;
                let source_h = element.parentNode.offsetHeight;
                let result_w = source_w * w;
                let result_o = source_w * o;

                element.style.width = result_w + "px";
                element.style.height = source_h + "px";
                element.style.marginLeft  = result_o + "px";
                element.classList.add('sk-rendered');
            }
        }, 700);
    }, [targetMonth]);


    const clickOnCell = (day, event) => {
        console.log('day', day);
        if (event.shiftKey) {
            setSelectedDays((previous) => {
                // Проверяем, есть ли день уже в массиве
                if (previous.includes(day.date)) {
                    // Если день уже есть, удаляем его
                    return previous.filter(date => date !== day.date);
                } else {
                    // Если дня нет, добавляем его
                    return [...previous, day.date];
                }
            });
        } else {
            // Если шифт не зажат, устанавливаем только выбранный день
            setSelectedDays([day.date]);
        }
    };





    return (
        <div className="sk-form-frame-body">
            <div className="sk-form-frame-row">
                <div className={'sk-form-button-stack'}>
                {MB.map((item)=>(
                    <div 
                        data-id={item.value}
                        onClick={(event)=>{setMonthValue(event)}}
                        className={`sk-fbs-button ${item.value === targetMonth ? 'sk-active' : ''}`}
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
                    <div className="sk-fbs-vertstack">
                        <label>Начало смены</label>
                        <DatePicker
                        showSecond={false}
                        // defaultValue={defaultValue}
                        showTime
                        // locale={buddhistLocale}
                        // onChange={onChange}
                        />
                    </div>
                    <div className="sk-fbs-vertstack ">
                    <label>Конец смены</label>
                        <DatePicker
                        showSecond={false}
                        // defaultValue={defaultValue}
                        showTime
                        // locale={buddhistLocale}
                        // onChange={onChange}
                        />
                    </div>
                </div>

            </div>
            <div className="sk-form-frame-row sk-fbs-row-2c">
                <div>
                    
                    <div className={'sk-cal-unit-head'}>
                        <div className="sk-fbs-trule-item">ПН</div>
                        <div className="sk-fbs-trule-item">ВТ</div>
                        <div className="sk-fbs-trule-item">СР</div>
                        <div className="sk-fbs-trule-item">ЧТ</div>
                        <div className="sk-fbs-trule-item">ПТ</div>
                        <div className="sk-fbs-trule-item">СБ</div>
                        <div className="sk-fbs-trule-item">ВС</div>
                    </div>
                    <div className={'sk-fbs-cal-unit-body'}>
                    {calendarDays.map((day) => {
                    
                    let tooltip = '';

                    if (day.text){
                        tooltip += " " + day.text;
                    }
                    return (
                    <div className={`sk-calendar-item-back sk-month-${day.month}-x  ${day.outrange ? 'outrange' : ''}`}>
                        { (day.smens && day.smens.length > 0) ? 
                        ( day.smens.map((smena)=>(
                            <div className="sk-fbs-smena" data-width={smena.width} data-offset={smena.offset}
                                data-index={smena.index}
                            >
                            </div>

                        )
                        )) : ''
                        }
                        <div 
                        onClick={(event)=>{clickOnCell(day, event)}}
                        key={day.date} 
                        className={`sk-fsb-calendar-item ${day.is_weekend ? 'sk-unit-weekend' : ''} ${day.is_workday ? 'sk-unit-workday' : ''}
                         ${day.to ? 'sk-unit-dayto' : ''}  ${day.from ? 'sk-unit-dayfrom' : ''}
                         ${selectedDays.includes(day.date) ? ' sk-unit-selected' : ''}
                         `}
                            // title={day.date + " - " + day.week_day}
                        >
                            <strong className="sk-text">{day.value}</strong> {day.text ? "text": ""}
                        </div>
                        
                        </div>
                    )})}
                    </div>

                </div>
                <div className="sk-fbs-bl">
                    <div className="sk-fbs-vertstack" style={{backgroundColor: "#ffffff7d"}}>
                        <label>Назначение по шаблону</label>
                    </div>
                    <div className="sk-fbs-vertstack">
                        <small>Кол-во рабочих дней</small>
                        <InputNumber
                        />
                    </div>
                    <div className="sk-fbs-vertstack">
                        <small>через кол-во выходных дней</small>
                        <InputNumber
                        />
                    </div>
                    <div className="sk-fbs-vertstack">
                        <small>на протяжении дней</small>
                        <InputNumber
                        />
                    </div>
                    <br/>
                    <div className="sk-fbs-vertstack">
                        <Button>Назначить график</Button>
                    </div>
                </div>
            </div>
            <div className="sk-form-frame-row">
                Stats
            </div>
        </div>
    )
};

export default SchedCalendar;