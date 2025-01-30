import React, { useEffect, useState } from "react";
import './style/schedcalendar.css';
import dayjs from "dayjs";
import { Button, DatePicker, Input, InputNumber, TimePicker } from "antd";
import ProdCalUnit from "../../PROD_CAL_MANAGER/components/ProdCalUnit";
import { CheckOutlined, ClearOutlined, CloseOutlined, CopyOutlined, DiffOutlined } from "@ant-design/icons";

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

]

const SchedCalendar = (props)=>{
    const [MB, setMB] = useState(MONTH_BUTTONS);
    const [targetMonth, setTargetMonth] = useState(1);

    const [calendarDays, setCalendarDays] = useState([]);
    const [schedule, setSchedule] = useState(DEMO_SCHED);
    const [selectedDays, setSelectedDays] = useState([]);


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);

    const [copyStart, setCopyStart] = useState(null);
    const [copyEnd, setCopyEnd] = useState(null);
    const [copyDur, setCopyDur] = useState(null);

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
                    const checkDateStart = dayjs.unix(parseInt(schedule[i][1]));
                    const checkDateEnd = dayjs.unix(parseInt(schedule[i][2]));

                    if (checkDateStart.unix() >= start.unix() && checkDateStart.unix() < end.unix()){
                        let hourslen = checkDateEnd.diff(checkDateStart, 'hours');
                        // console.log('checkDate', hourslen, checkDateStart, checkDateEnd)
                        let smena = {};
                        smena.offset = checkDateStart.hour() != 0 ? checkDateStart.hour() / 24 : 0;
                        smena.width = hourslen != 0 ? hourslen / 24 : 0;
                        smena.index = i;
                        smena.date = schedule[i][0];
                        smena.start = schedule[i][1];
                        smena.end = schedule[i][2];
                        smena.duration = schedule[i][2] - schedule[i][1];
                        if (smena.offset + smena.width > 1){
                            smena.width = 1 - smena.offset;
                            smena.sctickleft = 1;
                            console.log('smena', smena);
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
                        smena.duration = schedule[i][2] - schedule[i][1];
                        smena.date = schedule[i][0];
                        smena.offset = 0;
                        smena.width = hourslen != 0 ? hourslen / 24 : 0;
                        smena.index = i;
                        smena.stickright = 1;
                        smena.start = schedule[i][1];
                        smena.end = schedule[i][2];
                        obj.smens.push(smena);
                    }
                }
                // if (obj.smens.length == 1 && !obj.smens[0].stickright ){
                //     obj.smens[0].stickright = 1;
                // } else if (obj.smens.length == 2){

                // }
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
    }, [targetMonth, schedule]);




    const clickOnCell = (day, event) => {
        console.log('day', day);
        setSelectedDate(null);
        if (event.shiftKey) {
            if (selectedDays.length > 0){
                let prevDay = selectedDays[selectedDays.length - 1].split('-');
                prevDay = dayjs(prevDay);

                let newDay = dayjs(day.date);
                const differenceInDays = prevDay.diff(newDay, 'day');
                console.log(prevDay, newDay);
                console.log(differenceInDays);
                const dateToAdd = [];
                if (differenceInDays < 0){
                    let movedDate = prevDay;
                    // reverse
                    for (let d = 1; d <= -differenceInDays; d++) {
                        movedDate = prevDay.add(d, 'day');
                        dateToAdd.push(movedDate.format('YYYY-MM-DD'))
                    }
                } else {
                    let movedDate = newDay;
                    // reverse
                    for (let d = 0; d < differenceInDays; d++) {
                        movedDate = newDay.add(d, 'day');
                        dateToAdd.push(movedDate.format('YYYY-MM-DD'))
                    }
                }

                let newResult = JSON.parse(JSON.stringify(selectedDays));
                for (let i = 0; i < dateToAdd.length; i++) {
                    const element = dateToAdd[i];
                    if (!newResult.includes(element)){
                        newResult.push(element);
                    }
                }
                console.log(dateToAdd);
                setSelectedDays(newResult);
                // найти все дни между выделенными датами (формат - 2025-01-13)
                // и записать их, включая выделенную дату
            }     
        } else if (event.ctrlKey){
            setSelectedDays((previous) => {
                setSelectedDate(dayjs(day.date));
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
            setSelectedDate(dayjs(day.date));
        }
    };



    const clickOnEvent = (event) => {
        console.log(event);
        let item = event.target.closest('.sk-fbs-smena');
        if (item) {
            let index = item.getAttribute('data-index');
            let date = item.getAttribute('data-date');
            console.log(date);
            let seldays = JSON.parse(JSON.stringify(selectedDays));

            let obja = schedule[index];
            if (obja){
                let startDate = dayjs.unix(obja[1]);
                let end_Date = dayjs.unix(obja[2]);
                setSelectedStart(startDate);
                setSelectedEnd(end_Date);
                let dura = end_Date.diff(startDate, 'seconds');
                setSelectedDuration(startDate.startOf('day').add(dura, 'seconds'));
            }

            setSelectedDate(null);
            if (event.shiftKey) {
                if (selectedDays.length > 0){
                    let prevDay = selectedDays[selectedDays.length - 1].split('-');
                    prevDay = dayjs(prevDay);
    
                    let newDay = dayjs(date);
                    const differenceInDays = prevDay.diff(newDay, 'day');
                    console.log(prevDay, newDay);
                    console.log(differenceInDays);
                    const dateToAdd = [];
                    if (differenceInDays < 0){
                        let movedDate = prevDay;
                        // reverse
                        for (let d = 1; d <= -differenceInDays; d++) {
                            movedDate = prevDay.add(d, 'day');
                            dateToAdd.push(movedDate.format('YYYY-MM-DD'))
                        }
                    } else {
                        let movedDate = newDay;
                        // reverse
                        for (let d = 0; d < differenceInDays; d++) {
                            movedDate = newDay.add(d, 'day');
                            dateToAdd.push(movedDate.format('YYYY-MM-DD'))
                        }
                    }
    
                    let newResult = JSON.parse(JSON.stringify(selectedDays));
                    for (let i = 0; i < dateToAdd.length; i++) {
                        const element = dateToAdd[i];
                        if (!newResult.includes(element)){
                            newResult.push(element);
                        }
                    }
                    console.log(dateToAdd);
                    setSelectedDays(newResult);
                    // найти все дни между выделенными датами (формат - 2025-01-13)
                    // и записать их, включая выделенную дату
                }     
            } else if (event.ctrlKey){
                setSelectedDays((previous) => {
                    setSelectedDate(dayjs(date));
                    // Проверяем, есть ли день уже в массиве
                    if (previous.includes(date)) {
                        // Если день уже есть, удаляем его
                        return previous.filter(dater => dater !== date);
                    } else {
                        // Если дня нет, добавляем его
                        return [...previous, date];
                    }
                });
            } else {
                // Если шифт не зажат, устанавливаем только выбранный день
                setSelectedDays([date]);
                setSelectedDate(dayjs(date));
            }

        }
    }


    const onApplyAction = () => {
        if (selectedStart == null|| selectedEnd == null){ return ;};
        let startDay = selectedStart.startOf('day');

        let startTimeOffset_s = selectedStart.diff(startDay, 'seconds');
        let durationSeconds_s = selectedDuration.diff(selectedDuration.startOf('day'), 'seconds');
        let endTimeOffset_s = startTimeOffset_s + selectedDuration.unix();

        console.log(startTimeOffset_s, durationSeconds_s);


        let newScheduleChunk = [];

        for (let i = 0; i < selectedDays.length; i++) {
            const element = selectedDays[i];
            let dateStartUnix = dayjs(element).unix();
            console.log(dateStartUnix, startTimeOffset_s, endTimeOffset_s);
            const firstTs = dateStartUnix + startTimeOffset_s;
            const secondTs = dateStartUnix + startTimeOffset_s + durationSeconds_s;
            console.log(firstTs, secondTs);
            newScheduleChunk.push([element,firstTs ,secondTs ]);
            
        }

        let mergedArray = [];
        const firstElements = newScheduleChunk.map(subArray => subArray[0]);
        for (let i = 0; i < schedule.length; i++) {
            const element = schedule[i];
            if (!firstElements.includes(element[0]))
            {
                mergedArray.push(element);
            };
        }
        mergedArray = mergedArray.concat(newScheduleChunk);

        setSchedule(mergedArray);
    }



    const clearCell = () => {
        let newArray = [];
        for (let i = 0; i < schedule.length; i++) {
            const element = schedule[i];
            if (!selectedDays.includes( element[0])){
                newArray.push(element);
            }
        }
        setSchedule(newArray);
    }


    const clearSelection = ()=>{
        setSelectedDays([]);
        setSelectedDate(null);
        setSelectedEnd(null);
        setSelectedDuration(null);
        setSelectedStart(null);
    };



    const copyParams = () =>{
        setCopyStart(selectedStart);
        setCopyEnd(selectedEnd);
        setCopyDur(selectedDuration);
    }
    const pasteParams = () =>{
        setSelectedStart(copyStart);
        setSelectedEnd(copyEnd);
        setSelectedDuration(copyDur);
    }
    const insertDefaultParams = () => {
        let today = dayjs();
        setSelectedStart(today.startOf('day').add(9, 'hours'));
        setSelectedEnd(today.startOf('day').add(19, 'hours'));
        setSelectedDuration(today.startOf('day').add(10, 'hours'));
    }


    const changeStart = (value)=>{
        let selend = selectedEnd;
        if (value != null && selectedEnd == null){
            selend = value.add(12, 'hours');
            setSelectedEnd(selend);
        } 
        if (value == null){
            setSelectedStart(null);
            setSelectedDuration(null);
            return;
        }
        setSelectedStart(value);

        let diff = selend.diff(value, 'hours');
        let diffMinunt = Math.abs( selend.diff(value, 'minutes'));
        console.log(diffMinunt);

        setSelectedStart(selend.add(- diffMinunt, 'minutes'));
        setSelectedDuration(dayjs().startOf('day').add(diffMinunt, 'minutes'));
        console.log(diff);
    }


    // Корректировка времени, чтобы конец смены не был перед началом
    const changeEnd = (value)=>{
        let selest = selectedStart;
        
        if (selectedStart == null){
            setSelectedStart(value);
            selest = value;
        }
        if (value == null){
            setSelectedDuration(dayjs().startOf('day'));
            return;
        }
        
        let newValue = value;
        while (newValue.unix() < selest.unix()){
            newValue = newValue.add(1, 'day');
        }

        setSelectedEnd(newValue);
        if (value == null){
            setSelectedDuration(null);
        }
        let diff = selest.diff(newValue, 'hours');
        console.log(diff);

        let diffMinunt = Math.abs( selest.diff(newValue, 'minutes'));
        console.log(diffMinunt);

        if (diffMinunt > 24*60){
            diffMinunt = diffMinunt - 24*60;
            setSelectedEnd(selest.add(diffMinunt, 'minutes'));
        }
        console.log(diffMinunt / 60);
        let seldur = dayjs().startOf('day').add(diffMinunt, 'minutes');
        if (diffMinunt < 2){
            seldur = seldur.add(1, 'day');
        }
        setSelectedDuration(seldur);
    }


    const changeDuration = (value)=>{
        if (value == null){
            setSelectedDuration(null);
            setSelectedEnd(null);
            return;
        };
        let start = selectedStart;
        if (start == null){
            start = dayjs();
            setSelectedStart(start);
        };
        
        let durik = value.diff(value.startOf('day'), 'minutes');
        setSelectedEnd(start.add(durik, 'minutes'));
        setSelectedDuration(value);
        console.log(durik);
    }













    return (
        <div className="sk-form-frame-body">
            <div className="sk-form-frame-row" style={{overflow: 'auto'}}>
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
                        <label>Выбранная дата</label>
                        <DatePicker
                        showSecond={false}
                        // defaultValue={defaultValue}
                        value={selectedDate}
                        // locale={buddhistLocale}
                        // onChange={onChange}
                        />
                    </div>

                    <div className={'sk-fbs-vertstack'}>
                        <label>Начало смены</label>
                        <TimePicker type={'time'} 
                            showSecond={false}
                            onChange={changeStart}
                            value={selectedStart}
                        />
                    </div>

                    <div className={'sk-fbs-vertstack'}>
                        <label>Конец смены</label>
                        <TimePicker type={'time'} 
                            showSecond={false}
                            onChange={changeEnd}
                            value={selectedEnd}
                        />
                    </div>

                    <div className={'sk-fbs-vertstack'}>
                        <label>Длительность</label>
                        {(selectedDuration == null || (selectedDuration.unix() - selectedDuration.startOf('day').unix() == 0) ||
                         (selectedDuration.unix() - selectedDuration.startOf('day').unix() == 60*60*24) ) ? (
                            
                            <InputNumber
                                value={'24 часа'}
                            />
                            
                         ) : (
                            <TimePicker type={'time'} 
                            showSecond={false}
                            onChange={changeDuration}
                            value={selectedDuration}
                            addonAfter={'hello'}
                        />
                         ) 
                         
                         }

                    </div>

                    <div className={'sk-fbs-vertstack sk-no-padding'}>
                        <div className={'sk-fbs-vstack-button'}
                            onClick={copyParams}
                        >
                            <CheckOutlined 
                                onClick={onApplyAction}
                            style={{ fontSize: '26px', color: '#08c' }}/>
                            <small>Применить</small>
                        </div>
                    </div>
                    <div className={'sk-fbs-vertstack sk-no-padding'}>
                        <div className={'sk-fbs-vstack-button'}
                            onClick={copyParams}
                        >
                            <CopyOutlined  style={{ fontSize: '26px', color: '#08c' }}/>
                            <small>Копир</small>
                        </div>
                    </div>
                    <div className={'sk-fbs-vertstack sk-no-padding'}>
                        <div className={'sk-fbs-vstack-button'}
                            onClick={pasteParams}
                            onDoubleClick={insertDefaultParams}
                        >
                            <DiffOutlined  style={{ fontSize: '26px', color: '#08c' }}/>
                            <small>Встав</small>
                        </div>
                    </div>
                    <div className={'sk-fbs-vertstack sk-no-padding'}>
                        <div className={'sk-fbs-vstack-button'}
                        onClick={clearCell}
                            >
                            <ClearOutlined  style={{ fontSize: '26px', color: '#08c' }}/>
                            <small>Очистить</small>
                        </div>
                    </div>
                    <div className={'sk-fbs-vertstack sk-no-padding'}>
                        <div className={'sk-fbs-vstack-button'}
                            onClick={clearSelection}
                        >
                            <CloseOutlined  style={{ fontSize: '26px', color: '#08c' }}/>
                            <small>Снять выделение</small>
                        </div>
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
                    <div className={`sk-fbs-calendar-item-back sk-month-${day.month}-x  ${day.outrange ? 'outrange' : ''}`}>
                        { (day.smens && day.smens.length > 0) ? 
                        ( day.smens.map((smena)=>(
                            <div 
                                onClick={clickOnEvent}
                                className={`sk-fbs-smena ${smena.stickleft ? "stickleft": ""} ${smena.stickright ? "stickright": ""}`} 
                                data-width={smena.width} data-offset={smena.offset}
                                data-index={smena.index} data-date={smena.date}
                                title={`Дата: ${dayjs(smena.date).format('DD-MM-YYYY')}, 
                                начало: ${dayjs.unix(smena.start).format('DD-MM-YYYY HH:mm')}, 
                                конец: ${dayjs.unix(smena.end).format('DD-MM-YYYY HH:mm')}, 
                                продолжительность: ${Math.floor(smena.duration / 60 / 60)} часов ${((smena.duration / 60) % 60)} минут` }
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
                        <Button>Назначить смены</Button>
                    </div>
                </div>
            </div>
            <div className="sk-form-frame-row">
                <ul>
                    <li>В день можно назначить только одну смену</li>
                    <li>Смена не может длиться больше 24 часов</li>
                    <li>Смены не должны пересекаться друг с другом</li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
};

export default SchedCalendar;