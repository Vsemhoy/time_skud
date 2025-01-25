import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Drawer, Checkbox } from 'antd';
import "./style/prodcalmodal.css";
import dayjs from "dayjs";
import { DS_PROD_CALENDAR, DS_YEARMONTHS_SELECT } from "../../../CONFIG/DEFAULTSTATE";
import { generateYearOptions, getMonthName } from "../../../GlobalComponents/Helpers/TextHelpers";
import ProdCalUnit from "./ProdCalUnit";
import { PRODMODE } from "../../../CONFIG/config";

const ProdCalModal = ({ is_open, onClose, startdate, rangeEnd, year }) => {
    const [open, setOpen] = useState(is_open);
    const [calendarDays, setCalendarDays] = useState([]);
    const [selectedYear, setSelectedYear] = useState(year ? year : dayjs().year());
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState({d: 0, m: 0, text: '', w: false});

    const [dayInputText, setDayInputText] = useState('');

    const [jobCalendar, setJobCalendar] = useState(null);

    const [startDate, setStartDate] = useState(startdate ? dayjs(startdate) : dayjs());
    // const [endRange, setEndRange] useState(startDate ? dayjs(startDate) : dayjs());

    const [openDrawer, setOpenDrawer] = useState(false);

    const openDayEditorDrawer = (day) => {
        console.log(jobCalendar);
        let targDate = null;
        let existed = false;
        if (jobCalendar.months && jobCalendar.months[day.month - 1] && jobCalendar.months[day.month - 1].days.length){
            let days = jobCalendar.months[day.month - 1].days;
            let tday = days.find((el)=> el.d === day.value);
            if (tday){
                tday.m = day.month;
                targDate = tday;
                console.log('tday',tday);
                existed = true;
            }
        }
        if (targDate == null)
        {
            targDate = {
                d: day.value,
                m: day.month,
                w: true,
                short: false
            };
        }
        setDayInputText(targDate.text ? targDate.text : '');
        setSelectedDay(targDate);
        console.log('day',day);
        setOpenDrawer(true);
    };
  
    const onDrawerClose = () => {
      setOpenDrawer(false);
    };


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
    };


    const changeChbWorkday =  (event) => {
        console.log( event.target.checked);
        let cp = JSON.parse(JSON.stringify(selectedDay));
        cp.w = event.target.checked  ? 1 : 0;
        setSelectedDay(cp);
    };
    const changeChbShortDay =  (event) => {
        console.log( event.target.checked);
        let cp = JSON.parse(JSON.stringify(selectedDay));
        cp.short = event.target.checked  ? 1 : 0;
        setSelectedDay(cp);
    };
    const changeDayText =  (event) => {
        let cp = JSON.parse(JSON.stringify(selectedDay));
        cp.text = event.target.value;
        setSelectedDay(cp);
    };

    const saveDayParams = ()=>{
        let cp = JSON.parse(JSON.stringify(selectedDay));
        if (dayInputText !== ''){
            cp.text = dayInputText;
        };
        let cpCal = JSON.parse(JSON.stringify(jobCalendar));
        let editday = cpCal.months[cp.m - 1].days.find((el)=> el.d === cp.d);
        if (editday){
            editday.w = cp.w;
            editday.short = cp.short;
            if (cp.text != ''){ editday.text = cp.text ;};
        } else {
            cpCal.months[cp.m - 1].days.push(cp);
        }
        console.log(cpCal);
        setJobCalendar(cpCal);
            // let days = jobCalendar.months[day.month - 1].days;
            // let tday = days.find((el)=> el.d === day.value);
        onDrawerClose();
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
                <div class={`sk-cal-modal-unitstack ${selectedMonth === 0 ? 'stack-3' :'stack-1'}`}>
                { selectedMonth === 0 ? (
                    Array.from({length: 12},(_,index) => <ProdCalUnit key={'pcalunit'+index}
                        onDayClick={openDayEditorDrawer}
                        targetYear={2025}
                        targetMonth={index + 1}
                        prodCalendar={jobCalendar}
                    />)
                ) : (
                    <>
                    <ProdCalUnit
                        onDayClick={openDayEditorDrawer}
                        targetYear={2025}
                        targetMonth={selectedMonth}
                        prodCalendar={jobCalendar}
                    />
                    </>
                )}

                    

                </div>
                
            </Modal>

            <Drawer title={`${selectedDay.d} ${ getMonthName(selectedDay.m)} ${selectedYear}`} onClose={onDrawerClose} open={openDrawer}>
                { selectedDay ? (
                    <div>
                    <p>
                        <Checkbox checked={selectedDay.w} 
                            onChange={changeChbWorkday}
                        >Рабочий день</Checkbox>
                    </p>
                    <p>
                        <Checkbox checked={selectedDay.short} 
                            onChange={changeChbShortDay}
                        >Сокращенный день</Checkbox>
                    </p>
                        <Input placeholder="Комментарий к дате"
                            value={dayInputText}
                            onChange={(ev)=>{setDayInputText(ev.target.value)}}
                            maxLength={250}
                        ></Input>
                    { selectedDay.mv_from ? (
                        <p>Перенесен с {`${selectedDay.mv_from.d} ${getMonthName(selectedDay.mv_from.m)}`}</p>
                    ) : ''}
                    { selectedDay.mм_to ? (
                        <p>Перенесен на {`${selectedDay.mv_to.d} ${getMonthName(selectedDay.mv_to.m)}`}</p>
                    ) : ''}
                    <div style={{float: 'right', paddingTop: 24}}>

                        <Button color="cyan" variant="solid"
                        onClick={saveDayParams}
                        >
                            Сохранить
                        </Button>
                    </div>
                    </div>
                ): ""
                }

            </Drawer>
        </>
    );
};

export default ProdCalModal;
