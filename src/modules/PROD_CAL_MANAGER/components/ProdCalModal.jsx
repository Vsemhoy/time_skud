import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Drawer, Checkbox } from 'antd';
import "./style/prodcalmodal.css";
import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { DS_PROD_CALENDAR, DS_YEARMONTHS_SELECT } from "../../../CONFIG/DEFAULTSTATE";
import { generateYearOptions, getMonthName } from "../../../GlobalComponents/Helpers/TextHelpers";
import ProdCalUnit from "./ProdCalUnit";
import { PRODMODE } from "../../../CONFIG/config";
dayjs.extend(isLeapYear);

const ProdCalModal = ({ is_open, onClose, onSave, year, data, userData }) => {
    const [open, setOpen] = useState(is_open);
    const [calendarName, setCalendarName] = useState(data ? data.name : dayjs().year());
    const [selectedYear, setSelectedYear] = useState(year ? year : dayjs().year());
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState({d: 0, m: 0, text: '', w: false});
    const [selectedCompany, setSelectedCompany] = useState(data ? data.id_company : userData.user.id_company);

    const [dayInputText, setDayInputText] = useState('');

    const [jobCalendar, setJobCalendar] = useState(null);
    // const [userdata, setUserdata] = useState(userData);
    /**
     * Это запись календаря, полученная из БД
     */
    const [calendarData, setCalendarData] = useState(data);
    const [isNewCalendar, setIsNewCalendar] = useState(data ? false : true);

    const [saveMode, setSaveMode] = useState(false);



    const [openDrawer, setOpenDrawer] = useState(false);

    const openDayEditorDrawer = (day) => {
        
        let targDate = null;
        let existed = false;
        if (jobCalendar.months && jobCalendar.months[day.month - 1] && jobCalendar.months[day.month - 1].days.length){
            let days = jobCalendar.months[day.month - 1].days;
            let tday = days.find((el)=> el.d === day.value);
            if (tday){
                tday.m = day.month;
                targDate = tday;
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
        setOpenDrawer(true);
    };
  
    const onDrawerClose = () => {
      setOpenDrawer(false);
    };


    useEffect(() => {
        console.log('is_open' + ' => ' + is_open);
        setOpen(is_open);

        if (is_open === true){
            if (PRODMODE){
                setJobCalendar(normalizeObjectFromApi(DS_PROD_CALENDAR));
            }

        }
    }, [is_open]);


    // TO SAVE DATA
    useEffect(()=>{
        if (saveMode)
        {
            console.log(userData);
            let obj = {};
            if (calendarData == null){
                obj.id = null;
                } else {
                    obj.id = data.id;
                }
                obj.year = calendarName;
                obj.count_days = jobCalendar.total;
                obj.count_work_days = jobCalendar.wtotal;
                obj.count_holidays = jobCalendar.htotal;
                obj.schedule = jobCalendar;
                obj.id_company = selectedCompany;
                console.log('obj', obj);
                if (onSave){
                onSave(obj);
                
            }
            console.log(jobCalendar);
            // ОТСЮДА СОХРАНЯЕМ УЖЕ ДАННЫЕ В БД или коллбэчим назад
        }
    }, [jobCalendar]);


    /** Сохранение календаря */
    const handleOk = () => {
        setSaveMode(true);
        // подсчёт РД и ВД
        let holDays = 0;
        for (let index = 0; index < jobCalendar.months.length; index++) {
            console.log('index' + ' => ' + index);
            for (let i = 0; i < jobCalendar.months[index].days.length; i++) {
                const checkday = jobCalendar.months[index].days[i];
                if (!checkday.w || checkday.w == 0)
                {
                    holDays++;
                }
            }
        }
        let jcopy = JSON.parse(JSON.stringify(jobCalendar));
        jcopy.htotal = holDays;
        jcopy.wtotal = jcopy.total - holDays;
        setJobCalendar(jcopy);
        setOpen(false);
        if (onClose){
            onClose(); // Вызываем функцию закрытия из родительского компонента
        };
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
        target.total = dayjs(`${target.year}-01-01`).isLeapYear() ? 366 : 365;
        target.wtotal = 0;
        target.htotal = 0;
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

    const onBlurDayText = (event)=> {
        saveDayParams();
    }

    useEffect(()=>{
        if (openDrawer){
            saveDayParams();
        }
    },[selectedDay]);

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
        // onDrawerClose();
    }



    const loadOfficialPublicCalendar = async (ev) => {
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://xmlcalendar.ru/data/ru/${selectedYear}/calendar.json`));
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
        }
        const data = await response.json();
        const newcal = JSON.parse(data.contents);
        setJobCalendar(normalizeObjectFromApi(newcal));
    }


    return (
        <>
            <Modal
                title={isNewCalendar ? "Новый производственный календарь" : "Редактирвоание календаря"}
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                cancelText="Закрыть"
                okText={"Сохранить"}
            >
                <div class='sk-cal-modal-head'>
                <Input type="text" maxLength={500} title="" placeholder="Название..." 
                    value={calendarName}
                    onChange={(ev)=>{setCalendarName(ev.target.value)}}
                />
                </div>
                <br/>
                <div class='sk-cal-modal-toolbar'>
                    <div>
                        <Select
                        options={DS_YEARMONTHS_SELECT}
                        onChange={handleMonthChange}
                        value={selectedMonth}
                        ></Select>
                    </div>
                    { isNewCalendar ? (
                        <div>
                            <Button
                                color="danger" variant="solid"
                                onClick={loadOfficialPublicCalendar}
                             >Загрузить официальный график</Button>
                            <Select
                                options={yearArrray()}
                                value={selectedYear}
                                onChange={handleYearChange}
                            />
                        </div>
                    ) : ''}
                </div>
                <br/>
                <div class={`sk-cal-modal-unitstack ${selectedMonth === 0 ? 'stack-3' :'stack-1'}`}>
                { selectedMonth === 0 ? (
                    Array.from({length: 12},(_,index) => <ProdCalUnit key={'pcalunit'+index}
                        onDayClick={openDayEditorDrawer}
                        targetYear={selectedYear}
                        targetMonth={index + 1}
                        prodCalendar={jobCalendar}
                    />)
                ) : (
                    <>
                    <ProdCalUnit
                        onDayClick={openDayEditorDrawer}
                        targetYear={selectedYear}
                        targetMonth={selectedMonth}
                        prodCalendar={jobCalendar}
                    />
                    </>
                )}

                    

                </div>
                
            </Modal>

            <Drawer 
            title={`${selectedDay.d} ${ getMonthName(selectedDay.m)} ${selectedYear}`} onClose={onDrawerClose} open={openDrawer}>
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
                            onBlur={onBlurDayText}
                        ></Input>
                    { selectedDay.mv_from ? (
                        <p>Перенесен с {`${selectedDay.mv_from.d} ${getMonthName(selectedDay.mv_from.m)}`}</p>
                    ) : ''}
                    { selectedDay.mм_to ? (
                        <p>Перенесен на {`${selectedDay.mv_to.d} ${getMonthName(selectedDay.mv_to.m)}`}</p>
                    ) : ''}
                    <div style={{float: 'right', paddingTop: 24}}>

                        {/* <Button color="cyan" variant="solid"
                        onClick={saveDayParams}
                        >
                            Сохранить
                        </Button> */}
                    </div>
                    </div>
                ): ""
                }

            </Drawer>
        </>
    );
};

export default ProdCalModal;
