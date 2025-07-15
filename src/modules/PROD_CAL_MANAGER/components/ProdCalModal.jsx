import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Drawer, Checkbox, Badge, Tag, Radio, Alert, Flex } from 'antd';
import "./style/prodcalmodal.css";
import dayjs from "dayjs";
import isLeapYear from 'dayjs/plugin/isLeapYear';
import { DS_PROD_CALENDAR, DS_YEARMONTHS_SELECT } from "../../../CONFIG/DEFAULTSTATE";
import { generateYearOptions, getMonthName } from "../../../components/Helpers/TextHelpers";
import ProdCalUnit from "./ProdCalUnit";
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import { months } from "moment";
import { ClockCircleOutlined, MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";

import {DEFAULT_SCHED} from "../mock/mock";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";

dayjs.extend(isLeapYear);

const ProdCalModal = ({ is_open, onClose, onSave, data, userData, allow_delete, onDelete, data_list }) => {
    const [open, setOpen] = useState(is_open);
    const [calendarData, setCalendarData] = useState(data);

    const [calendarName, setCalendarName] = useState(data.year ? data.year : dayjs().year());
    const [selectedYear, setSelectedYear] = useState(data.schedule && data.schedule.year ? data.schedule.year : dayjs().year());
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState({d: 0, m: 0, text: '', w: false});
    const [selectedCompany, setSelectedCompany] = useState(data.id_company ? data.id_company : userData.user.id_company);
    const [callToSaveDay , setCallToSaveDay] = useState(false);
    const [archievedState , setArchievedState] = useState(data.archieved);

    const [disableSave, setDisableSave] = useState(false);

    const [allowDelete, setAllowDelete] = useState(allow_delete === true ? true : false);

    const [companies, setCompanies] = useState(
            
            userData.companies.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            })),
        );
    const [dayInputText, setDayInputText] = useState('');

    const [jobCalendar, setJobCalendar] = useState(null);
    // const [userdata, setUserdata] = useState(userData);
    /**
     * Это запись календаря, полученная из БД
     */
    const [NEW_ITEM, setNEW_ITEM] = useState(data.id == null ? true : false);

    useEffect(()=>{
        console.log('allow_delete', allow_delete);
        setCalendarData(data);
        setNEW_ITEM(data.id == null ? true : false);
        setCalendarName(data.year ? data.year : dayjs().year());
        setSelectedYear(data.schedule && data.schedule.year ? data.schedule.year : dayjs().year());
        setSelectedCompany(data.id_company ? data.id_company : userData.user.id_company);
        setArchievedState(data.archieved);
        let defSched = DEFAULT_SCHED;
        defSched.year = dayjs().year();
        setJobCalendar(data.schedule ? data.schedule : defSched);
        setAllowDelete(allow_delete === true ? true : false);
        setRepeatCheck(data.year ? data.year : dayjs().year()  , data.id_company ? data.id_company : userData.user.id_company);
    },[data]);

    const [saveMode, setSaveMode] = useState(false);

    const [openDrawer, setOpenDrawer] = useState(false);

    const openDayEditorDrawer = (day) => {
        setSaveMode(false);
        let targDate = null;
        if (jobCalendar.months && jobCalendar.months[day.month - 1] && jobCalendar.months[day.month - 1].days.length){
            let days = jobCalendar.months[day.month - 1].days;
            let tday = days.find((el)=> el.d === day.value);
            if (tday){
                tday.m = day.month;
                targDate = tday;
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
        setDayInputText(targDate.text !== null && targDate.text !== '' ? targDate.text : '');
        setSelectedDay(targDate);
        setOpenDrawer(true);
    };

    const toggleDayState = (day) => {
        setCallToSaveDay(true);
        setSaveMode(false);
        console.log('day', day)
        let targDate = null;
        if (jobCalendar.months && jobCalendar.months[day.month - 1] && jobCalendar.months[day.month - 1].days.length){
            let days = jobCalendar.months[day.month - 1].days;
            let tday = days.find((el)=> el.d === day.value);
            if (tday){
                tday.m = day.month;
                tday.w = tday.w == 1 ? 0 : 1;
                targDate = tday;
            }
        }
        if (targDate == null)
        {
            targDate = {
                d: day.value,
                m: day.month,
                w: false,
            };
        }
        setSelectedDay(targDate);
    };
  
    const onDrawerClose = () => {
      setOpenDrawer(false);
    };



    useEffect(()=>{
        if (jobCalendar == null || selectedYear !== jobCalendar.year){
            setJobCalendar(DEFAULT_SCHED);
        }
    }, [selectedYear])

    useEffect(() => {
        setOpen(is_open);
    }, [is_open]);


    // TO SAVE DATA
    useEffect(()=>{
        setTimeout(() => {            
            if (saveMode)
            {
                setSaveMode(false);
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
                    obj.schedule   = jobCalendar;
                    obj.id_company = selectedCompany;
                    obj.archieved  = archievedState;
                    if (onSave){
                    onSave(obj);
                    }
                // ОТСЮДА СОХРАНЯЕМ УЖЕ ДАННЫЕ В БД или коллбэчим назад
            }
        }, 500);
    }, [jobCalendar]);


    /** Сохранение календаря */
    const handleOk = () => {
        if (disableSave){
            return;
        }
        setSaveMode(true);
        // подсчёт РД и ВД
        let holDays = 0;
        if (jobCalendar.months){
            for (let index = 0; index < jobCalendar.months.length; index++) {
                for (let i = 0; i < jobCalendar.months[index].days.length; i++) {
                    const checkday = jobCalendar.months[index].days[i];
                    if (!checkday.w || checkday.w == 0)
                    {
                        holDays++;
                    }
                }
            }
        }
        let jcopy = JSON.parse(JSON.stringify(jobCalendar));
        if (!jcopy.total){
            jcopy.total = dayjs(`${jcopy.year}-01-01`).isLeapYear() ? 366 : 365;
        }
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


    const setRepeatCheck = (year, company) =>
    {
        console.log(calendarData.id);
        if (data.id === null)
        {
            console.log("DATA", data_list);
            console.log(year, company);
            for (let i = 0; i < data_list.length; i++) {
                const element = data_list[i];
                if (parseInt(element.year) === year && element.id_company === company){
                    setDisableSave(true);
                    return;
                }
            }

        }
        setDisableSave(false);
    }


    const handleMonthChange = (value) => {
        setSelectedMonth(value);
    }
    const handleYearChange = (value) => {
        setCalendarName(value);
        setSelectedYear(value);
        setRepeatCheck(value, selectedCompany);
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
                            if (Object.prototype.hasOwnProperty.call(objelement, keyd)) {
                                const daykey = objelement[keyd];
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
                                }
                            }
                        }
                    }
                }
            }

            target.months.push(newMonth);
        }
        return target;
    }


    const ARCH_STATES = [
        {
            key: 'arsctate_m1',
            value: -1,
            label: "Ожидает публикации"
        },
        {
            key: 'arsctate_0',
            value: 0,
            label: "Активен"
        },
        {
            key: 'arsctate_1',
            value: 1,
            label: "Архивирован"
        },
    ]
    


    const yearArrray = () => {
        return generateYearOptions();
    };

   
    
    const changeDayParamRadio =  (event) => {
        console.log(event.target.value);
        let cp = JSON.parse(JSON.stringify(selectedDay));
        switch (event.target.value){
            case 0:
                cp.w = 0;
                cp.short = 0;
            break;
            case 1:
                cp.w =  1;
                cp.short = 0;
            break;
            case 2:
                cp.w = 1;
                cp.short = 1;
            break;
            default:

            break;
        }
        setSelectedDay(cp);
        // let cp = JSON.parse(JSON.stringify(selectedDay));
        // cp.short = event.target.checked  ? 1 : 0;
        // setSelectedDay(cp);
    };


    const onBlurDayText = (event)=> {
        saveDayParams();
    }

    useEffect(()=>{
        if ((is_open && openDrawer) || (is_open && callToSaveDay)){
            console.log('348' + ' => ' + 348);
            saveDayParams();
            setCallToSaveDay(false);
        }
    },[selectedDay]);

    const saveDayParams = ()=>{
        let cp = JSON.parse(JSON.stringify(selectedDay));
        delete cp.text;
        if (dayInputText && dayInputText.trim() !== ""){
            cp.text = dayInputText;
        };
        let cpCal = JSON.parse(JSON.stringify(jobCalendar));
        let editday = cpCal.months[cp.m - 1].days.find((el)=> el.d === cp.d);
        if (editday){
            editday.w = cp.w;
            editday.short = cp.short;
            if (cp.text !== ''){ editday.text = cp.text ;};
        } else {
            cpCal.months[cp.m - 1].days.push(cp);
        }
        setJobCalendar(cpCal);
            // let days = jobCalendar.months[day.month - 1].days;
            // let tday = days.find((el)=> el.d === day.value);
        // onDrawerClose();
    }



    const loadOfficialPublicCalendar = async (ev) => {

        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/getjsoncalendar',
                {
                    data: {year:selectedYear},
                    _token: CSRF_TOKEN
                });

            console.log(response);

            if (response.status !== 200) {
                throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
            }

            // const data = await response.json();
            // const newcal = JSON.parse(data.contents);
            // setJobCalendar(normalizeObjectFromApi(newcal));

            const newcal = JSON.parse(response.data.content);
            setJobCalendar(normalizeObjectFromApi(newcal));
        } catch (error) {
            console.error('Error fetching users info:', error);
        }
        // const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://xmlcalendar.ru/data/ru/${selectedYear}/calendar.json`));
        // const response = await fetch("https://api.allorigins.win/get?url=https://xmlcalendar.ru/data/ru/" + selectedYear + "/calendar.json");

    }


    const handleUsedCompanyChange = (value)=>{
        setSelectedCompany(value);
        setRepeatCheck(selectedYear, value);
    };

    const updateCalendarName = (ev) => {
        let value = ev.target.value;
    
        // Allow only numeric values and a single dot (for decimal numbers)
        let numericValue = value.replace(/[^0-9.]/g, '');
    
        // Ensure only one dot is present
        const dots = numericValue.split('.').length - 1;
        if (dots > 1) {
          numericValue = numericValue.slice(0, -1);
        }
    
        // Update the state with the numeric value
        setCalendarName(numericValue);
      };


    const onDeleteAction = ()=>{
        let cf = window.confirm("Действительно удалить этот производственный календарь!?");
        if (cf){
            if (onDelete && allowDelete){
                console.log('calendarData', calendarData);
                onDelete(calendarData);
            }
        }
    }

    return (
        <>
            <Modal
                title={NEW_ITEM ? `Новый производственный календарь на ${calendarName} год` :   `Редактирвоание календаря на ${calendarName} год` }
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                cancelText="Закрыть"
                okText={disableSave ? "Не сохранять" : "Сохранить" }
            >
                {/* <div className='sk-cal-modal-head'>
                <Input type="text" maxLength={6} title="" placeholder="Название..." 
                    value={calendarName}
                    onChange={updateCalendarName}

                />
                </div> */}
                {disableSave ? (
                    <Alert type="error" message={`Календарь для этой компании на ${calendarName} год уже существует!`} banner />
                ): ""}


                <br/>
                <div className='sk-cal-modal-toolbar'>
                    <div>
                        <Select
                        options={DS_YEARMONTHS_SELECT}
                        onChange={handleMonthChange}
                        value={selectedMonth}
                        ></Select>
                    </div>
                    
                    { NEW_ITEM ? (
                        <div>
                            {userData.companies.length > 1 ? (
                                <Select 
                                    status="error"
                                    options={companies}
                                    value={selectedCompany} // Use value instead of defaultValue for controlled component
                                    style={{ minWidth: 140 }}
                                    onChange={handleUsedCompanyChange}
                                />
                            ) : ''}
                            <Select
                                options={yearArrray()}
                                value={selectedYear}
                                onChange={handleYearChange}
                            />
                            <Button
                                color="danger" variant="solid"
                                onClick={loadOfficialPublicCalendar}
                             >Загрузить официальный график</Button>

                        </div>
                    ) : (
                        <div>
                            {allowDelete ? (
                                <Button type="primary" danger
                                    onClick={onDeleteAction}
                                >
                                Удалить график
                                </Button>
                            ): ''}
                            {/* <Select
                                value={archievedState}
                                options={ARCH_STATES}
                                onChange={(value) => {setArchievedState(value)}}
                                /> */}
                            <Flex gap={'4px 0'} wrap >
                                { archievedState == 0 ? (
                                    <Tag icon={<SyncOutlined spin />} color="#87d068" style={{padding: 6, fontSize: 'medium'}}>
                                    активен
                                </Tag>
                                ) : "" }
                                { archievedState == -1 ? (
                                    <Tag icon={<ClockCircleOutlined />} color="#f78533" style={{padding: 6, fontSize: 'medium'}}>
                                    ожидает
                                </Tag>
                                ) : "" }
                                { archievedState == 1 ? (
                                    <Tag icon={<MinusCircleOutlined />} color="default" style={{padding: 6, fontSize: 'medium'}}>
                                    архивирован
                                </Tag>
                                ) : "" }   
                            </Flex>


                        <Tag className={'sk-cal-modal-badge'} color={data.company_color}>{data.company_name}</Tag>
                        { parseInt(calendarName) === dayjs().add(1, 'year').year() ? (
                            <Button
                            color="danger" variant="solid"
                            onClick={loadOfficialPublicCalendar}
                         >Загрузить официальный график</Button>
                        ) : ""}
                        </div>
                    )}
                </div>
                <br/>
                <div className={`sk-cal-modal-unitstack ${selectedMonth === 0 ? 'stack-3' :'stack-1'}`}>
                { selectedMonth === 0 ? (
                    Array.from({length: 12},(_,index) => <ProdCalUnit key={'pcalunit'+index}
                        onDayToggle={toggleDayState}
                        onDayClick={openDayEditorDrawer}
                        targetYear={selectedYear}
                        targetMonth={index + 1}
                        prodCalendar={jobCalendar}
                    />)
                ) : (
                    <>
                    <ProdCalUnit
                        onDayToggle={toggleDayState}
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
                        <Radio.Group
                            value={selectedDay.w && selectedDay.short ? 2 : selectedDay.w && !selectedDay.short ? 1 : 0}
                            className="sk-radio-stack"
                            onChange={changeDayParamRadio}
                            options={[
                                {
                                value: 1,
                                label: 'Рабочий день',
                                },
                                {
                                value: 2,
                                label: 'Сокращенный день',
                                },
                                {
                                value: 0,
                                label: 'Выходной день',
                                },
                            ]}
                            />
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
