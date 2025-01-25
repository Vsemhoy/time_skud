import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from 'antd';
import "./style/prodcalmodal.css";
import dayjs from "dayjs";
import { DS_PROD_CALENDAR, DS_YEARMONTHS_SELECT } from "../../../CONFIG/DEFAULTSTATE";
import { generateYearOptions } from "../../../GlobalComponents/Helpers/TextHelpers";
import ProdCalUnit from "./ProdCalUnit";
import { PRODMODE } from "../../../CONFIG/config";

const ProdCalModal = ({ is_open, onClose, startdate, rangeEnd, year }) => {
    const [open, setOpen] = useState(is_open);
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedYear, setSelectedYear] = useState(year ? year : dayjs().year());
    const [selectedMonth, setSelectedMonth] = useState(0);

    const [jobCalendar, setJobCalendar] = useState(null);

    const [startDate, setStartDate] = useState(startdate ? dayjs(startdate) : dayjs());
    // const [endRange, setEndRange] useState(startDate ? dayjs(startDate) : dayjs());

    useEffect(() => {
        console.log('is_open' + ' => ' + is_open);
        setOpen(is_open);

        if (PRODMODE){
            setJobCalendar(normalizeObjectFromApi(DS_PROD_CALENDAR));
        }
    }, [is_open]);


    const handleOk = () => {
        setOpen(false);
        if (onClose){
            onClose(); // Вызываем функцию закрытия из родительского компонента
        }
    };

    const handleCancel = () => {
        setOpen(false);
        if (onClose){
            onClose(); // Вызываем функцию закрытия из родительского компонента
        }
    };




    const handleMonthChange = (value) => {
        console.log('month' + ' => ' + value);
        setSelectedMonth(value);
    }
    const handleYearChange = (value) => {
        setSelectedYear(value);
    }


    const normalizeObjectFromApi = (source)=>{
        let target = {};
        let tempFrom = {};
        let tempTo = {};
        let index = 0;
        for (const trans of source.transitions)
        {
            let dfr = trans.from.split('.');
            let dto = trans.to.split('.');

            if (tempFrom[dfr[0]] == undefined){
                tempFrom[dfr[0]] = {};
            };
            tempFrom[dfr[0]][dfr[1]] = {'l': index, m: parseInt(dto[0]), d: parseInt(dto[1])};

            if (tempTo[dto[0]] == undefined){
                tempTo[dto[0]] = {};
            }
            tempTo[dto[0]][dto[1]] = {'l': index, m: parseInt(dfr[0]), d: parseInt(dfr[1])};

            index++;
        }

        target.year = source.year;
        target.months = [];
        for (const element of source.months) {
            let newMonth = {};
            newMonth.month = element.month;
            let mPad = element.month.toString().padStart(2, '0');
            newMonth.days = [];
            let rawDays = element.days.split(',');
            for (let i = 0; i < rawDays.length; i++) {
                const day = rawDays[i];
                let newDay = {};
                newDay.d = parseInt(day);
                
                if (day.includes('*'))
                {
                    newDay.short = 1;
                    newDay.w = 1;
                };
                if (day.includes('+'))
                {
                    const dPad = newDay.d.toString().padStart(2, '0');
                    newDay.mv_from = tempTo[mPad][dPad];
                };
                newMonth.days.push(newDay);
            }
            for (const key in tempFrom) {
                if (Object.prototype.hasOwnProperty.call(tempFrom, key)) {
                    if (mPad == key){
                        const objelement = tempFrom[key];
                        for (const keyd in objelement) {
                            console.log('keyd', keyd)
                            if (Object.prototype.hasOwnProperty.call(objelement, keyd)) {
                                const daykey = objelement[keyd];
                                console.log('keyd', keyd)
                                let hasDate = false;
                                for (let ind = 0; ind < newMonth.days.length; ind++) {
                                    const checkday = newMonth.days[ind];
                                    if (parseInt(checkday.d) == parseInt(keyd)){
                                        newMonth.days[ind].mv_to = daykey;
                                        hasDate = true;
                                        break;
                                    };
                                }
                                if (!hasDate){
                                    let ob = tempFrom[key][keyd];
                                    // w - means work day
                                    newMonth.days.push({d: parseInt(keyd), w: 1, mv_to: ob})
                                    console.log('first', ob)
                                }
                            }
                        }
                    }
                }
            }

            target.months.push(newMonth);
        }
        console.log(target)
        return target;
    }




    const yearArrray = () => {
        console.log('Kiwi')
        return generateYearOptions();
    }

    return (
        <>
            <Modal
                title="Редактирование календаря"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <div class='sk-cal-modal-head'>
                <Input type="text" maxLength={500} title="" placeholder="Название..."  />
                </div>
                <br/>
                <div class='sk-cal-modal-toolbar'>
                    <Select
                    options={DS_YEARMONTHS_SELECT}
                    onChange={handleMonthChange}
                    value={selectedMonth}
                    ></Select>

                    <Select
                        options={yearArrray()}
                        value={selectedYear}
                        onChange={handleYearChange}
                    />
                </div>
                <br/>
                <div class='sk-cal-modal-calendar'>
                <ProdCalUnit 
                    targetYear={2025}
                    targetMonth={selectedMonth}
                    prodCalendar={jobCalendar}
                />

                    

                </div>
                
            </Modal>
        </>
    );
};

export default ProdCalModal;
