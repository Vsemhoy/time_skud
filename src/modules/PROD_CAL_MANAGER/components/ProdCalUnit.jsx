import { ProductOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { DS_YEARMONTHS_SELECT } from "../../../CONFIG/DEFAULTSTATE";
import './style/prodcalunit.css';
import { months } from "moment";
import { Tooltip } from "antd";

const ProdCalUnit = ({targetYear, targetMonth, prodCalendar})=>{
    const [calendarDays, setCalendarDays] = useState([]);
    const [prc, setPrc] = useState(prodCalendar ? prodCalendar : {year: 2025, months: []});

    useEffect(()=>{
        const operDate = dayjs(`${targetYear}-${targetMonth}-01`);
        const startOfMonth = operDate.day(1);
        const endOfMonth = operDate.add(1, 'month').add(1, 'week').day(0);

        const firstDate = operDate;
        const lastDate = operDate.add(1, 'month').subtract(1, 'day');
        console.log('lastDate', lastDate)

        const daysArray = [];
        let currentDate = startOfMonth;

        console.log('currentDate', currentDate)

        while (currentDate.isBefore(endOfMonth) || currentDate.isSame(endOfMonth))
        {
            let obj = {
                value: currentDate.date(),
                month: currentDate.month() + 1, // Месяцы начинаются с 0
                date: currentDate.format('YYYY-MM-DD'),
                // is_weekend: currentDate.day() === 0 || currentDate.day() === 6, // Воскресенье (0) или Суббота (6),
                week_day: currentDate.day(),
                is_outrange: currentDate.isBefore(firstDate) || currentDate.isAfter(lastDate),
            };
            if (prc.months[currentDate.month()]){
                let dayarr = prc.months[currentDate.month()].days;
                for (let i = 0; i < dayarr.length; i++) {
                    const element = dayarr[i];
                    if (element.d == currentDate.date()){
                        if (element.w == undefined){
                            obj.is_weekend = true;
                        } else {
                            obj.is_workday = true;
                        }
                        if (element.short){
                            obj.is_short = true;
                        }
                        if (element.mv_from){
                            obj.from = element.mv_from;
                        };
                        if (element.mv_to){
                            obj.to = element.mv_to;
                        };
                    }
                }
            }
            daysArray.push(obj);
            currentDate = currentDate.add(1, 'day');
        }
        // console.log(daysArray);
        setCalendarDays(daysArray);
    }, [targetYear, targetMonth]);

    return (
        <div className={'sk-cal-unit'}>
            
            <div className={'sk-cal-unit-name'}>
                {DS_YEARMONTHS_SELECT.find(item => item.value === targetMonth).label}
            </div>
            <div className={'sk-cal-unit-head'}>
            <div className="sk-trule-item">ПН</div>
                <div className="sk-trule-item">ВТ</div>
                <div className="sk-trule-item">СР</div>
                <div className="sk-trule-item">ЧТ</div>
                <div className="sk-trule-item">ПТ</div>
                <div className="sk-trule-item">СБ</div>
                <div className="sk-trule-item">ВС</div>
            </div>
            <div className={'sk-cal-unit-body'}>
                {calendarDays.map((day) => {
                    
                    let tooltip = '';
                    if (day.from){
                        tooltip += "Перенос с " + day.from.d.toString().padStart(2, '0') + "." + day.from.m.toString().padStart(2, '0');
                    };
                    if (day.to){
                        tooltip += "Перенос на " + day.to.d.toString().padStart(2, '0') + "." + day.to.m.toString().padStart(2, '0');
                        console.log(day.to);
                    }
                    if (day.short){
                        tooltip += " Укороченный день";
                    }
                    return (
                    <div className={`sk-calendar-item-back sk-month-${day.month}-x  ${day.is_outrange ? 'outrange' : ''}`}>
                    <Tooltip placement="bottom" title={tooltip}>
                        <div 
                        key={day.date} className={`sk-calendar-item ${day.is_weekend ? 'sk-unit-weekend' : ''} ${day.is_workday ? 'sk-unit-workday' : ''}`}
                            // title={day.date + " - " + day.week_day}
                        >
                            {day.value}
                        </div>
                        </Tooltip>
                        </div>
                    )})}
            </div>

        </div>
    )
};





export default ProdCalUnit;