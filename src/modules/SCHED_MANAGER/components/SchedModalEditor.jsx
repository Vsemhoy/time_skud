import React, { useEffect, useState } from "react";

import { Alert, Button, Collapse, DatePicker, Flex, Form, Input, InputNumber, Modal, Select, Switch, TimePicker } from "antd";
import { Space, Typography } from 'antd';

import './style/schedmodaleditor.css';
import dayjs, { Dayjs } from "dayjs";
import { DS_PROD_CALENDARS, DS_SCHED_TYPES, DS_SCHED_UNITS } from "../../../CONFIG/DEFAULTSTATE";
import { globalTimeToDaySeconds, secondsValueToGlobalTime } from "../../../GlobalComponents/Helpers/TextHelpers";
import TextArea from "antd/es/input/TextArea";
import { CalendarOutlined, CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, DoubleLeftOutlined, DoubleRightOutlined, FileTextOutlined, FontColorsOutlined, RadarChartOutlined } from "@ant-design/icons";
import SchedCalendar from "./SchedCalendar";

const { Text, Link } = Typography;



const SchedModalEditor = (props)=>{
  
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const [createdAt, setCreatedAt]                   = useState(null);
  const [idCompany, setIdCompany]                   = useState(null);
  const [companyName, setCompanyName]               = useState(null);
  const [companyColor, setCompanyColor]             = useState(null);
  const [idSkudScheduleType, setIdSkudScheduleType] = useState(null);
  const [name, setName]                             = useState(null);
  const [description, setDescription]               = useState(null);
  const [startTime, setStartTime]                   = useState(null);
  const [endTime, setEndTime]                       = useState(null);
  const [targetTime, setTargetTime]                 = useState(null);
  const [targetUnit, setTargetUnit]                 = useState(null);
  const [lunchStart, setLunchStart]                 = useState(null);
  const [lunchEnd, setLunchEnd]                     = useState(null);
  const [lunchTime, setLunchTime]                   = useState(null);
  const [schedule, setSchedule]                     = useState(null);
  const [nextId, setNextId]                         = useState(null);
  const [deleted, setDeleted]                       = useState(null);
  const [idSkudProdCalendar, setIdSkudProdCalendar] = useState(null);
  const [creatorId, setCreatorId]                   = useState(null);

  const [usedSchedType, setUsedSchedType]           = useState(1);

  const [prodCalendars, setProdCalendars] = useState(DS_PROD_CALENDARS);

  const [scheduleTypes, setScheduleTypes] = useState(props.schedTypes);
  // Пример использования геттеров и сеттеров




    useEffect(()=>{
        setOpen(props.open);
        setTargetId(props.target_id);
    },[props])

    useEffect(()=>{
        console.log('props.data', props.data)
        setIdSkudScheduleType(props.data ? props.data.skud_schedule_type_id : 1);
        
        

        setCreatorId(props.data ? props.data.creator_id : props.userData.id);
        setName(props.data ? props.data.name : "График " + dayjs().year());
        setDescription(props.data ? props.data.description : "Опишите график тут на всякий...");
        setIdCompany(props.id_company ? props.data.id_company : props.userData.companies[0].id);
        setCompanyName(props.company_name ? props.data.company_name : props.userData.companies[0].name);
        setCompanyColor(props.company_color ? props.data.company_color : props.userData.companies[0].color);
        
        setStartTime(props.data ? props.data.start_time : dayjs().unix());
        setEndTime(props.data ? props.data.end_time : dayjs().unix());

        setTargetTime(props.data ? props.data.target_time : (60 * 60 * 8));
        setTargetUnit(props.data ? props.data.target_unit : 1);
        
        setLunchStart(props.data ? props.data.lunch_start : (60 * 60 * 13));
        setLunchEnd(props.data ? props.data.lunch_end : (60 * 60 * 15));
        setLunchTime(props.data ? props.data.lunch_time : (60 * 45));

        setNextId(props.data ? props.data.next_id : null);
        setDeleted(props.data ? props.data.deleted : 0);
        setIdSkudProdCalendar(props.data ? props.data.skud_prod_calendar_id : 0);
        setCreatorId(props.data ? props.data.creator_id : props.userData.id);
        setCreatedAt(props.data ? props.data.creator_id : dayjs().unix());
        setSchedule(props.data ? props.data.schedule : []);

        setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === idCompany));

        console.log(props.schedTypes);
        setUsedSchedType(props.schedTypes.find((el)=> el.value === (props.data ? parseInt(props.data.skud_schedule_type_id) : 1)));

    }, [targetId]);



    const saveForm = ()=>{
      let data = {
        id: targetId,
        id_company: idCompany,

        skud_schedule_type_id: idSkudScheduleType,
        name: name,
        description: description,
        start_time: startTime,
        end_time: endTime,
        target_time: targetTime,
        target_unit: targetUnit,
        lunch_start: lunchStart,
        lunch_end: lunchEnd,
        lunch_time: lunchTime,
        schedule: schedule,
        // next_id: null,
        // deleted: 0,
        skud_prod_calendar_id: idSkudProdCalendar,
      };
      if (targetId == null){
        data.creator_id = props.userData.user.id
      }

      console.log(data);
  
      if (props.on_save){
        props.on_save();
      };
      console.log('saveform');
    }



    const onCancel = ()=>{
      if (props.on_cancel){
        props.on_cancel();
      };
    };


    const updateSchedule = (value)=>{
      setSchedule(value);
    }

    const handleIdSkudScheduleTypeChange = (value)=>{
      console.log('value', value)
      setIdSkudScheduleType(value);
      console.log(props.schedTypes.find((el)=> el.value === parseInt(value)));
      setUsedSchedType(props.schedTypes.find((el)=> el.value === parseInt(value)));
    }


    const onChangeTargetTime = (value) => {
      console.log(value);
    }
    const ChangeDeleted = (event)=> {
      console.log(event);
      setDeleted(event ? 0 : 1);
    }
    const ChangeCompany = (event) => {
      setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === event));
      console.log(event);
      setIdCompany(event);
    }
    const ChangeName = (event) => {
      setName(event.target.value);
    }
    const ChangeDescription = (event) => {
      setDescription(event.target.value);
      
    }
    const ChangeUnitCount = (event) => {
        setTargetTime(parseFloat(event));
      console.log(event);
    }
    const ChangeUnitMeasure = (event) => {
      setTargetUnit(event);
    }
    const ChangeLunchStart = (event) => {
      setLunchStart(event);
    }
    const ChangeLunchEnd = (event) => {
      setLunchEnd(event);
    }
    const ChangeLunchDuration = (event) => {
      setLunchTime(event);
    }


    const changeStartTime = (value) => {
      let cdate = dayjs(); // Current date
      if (value) {
        let providedDate = dayjs(value); // Convert input to Day.js object
        let yearDifference = providedDate.diff(cdate, 'year'); // Calculate year difference
    
        // Check if the year difference is greater than 2
        if (Math.abs(yearDifference) > 2) {
          // Set providedDate to current year
          providedDate = providedDate.year(cdate.year());
        }
        setStartTime(providedDate.unix());
        console.log(providedDate); // Output adjusted date
      }
    }

    const changeEndTime = (value) => {
      // Convert startTime to a Day.js object
      let startDate = dayjs.unix(startTime); 
      if (value) {
        // Convert input value to a Day.js object
        let providedDate = dayjs(value); 
        let yearDifference = providedDate.diff(startDate, 'year'); // Calculate year difference

        // Check if the year is different or if provided date is earlier than startDate
        if (Math.abs(yearDifference) > 0 || providedDate.isBefore(startDate)) {
          // Set providedDate to December 31 of the provided year
          providedDate = providedDate.endOf('year');
        }

        // Update end time state with the adjusted date
        setEndTime(providedDate.unix());
        console.log(providedDate.format()); // Output adjusted date
      }
    }











    return (
        <Modal
        title={targetId == null ? "Новый график" :  "Редактирование " + targetId}
        centered
        open={open}
        onOk={saveForm}
        onCancel={onCancel}
        width={1000}
        okText={"Сохранить"}
        cancelText={"Закрыть"}
        maskClosable={false}
      >
        <div className={'sk-sme-toolbar, sk-flex-gap'}>
          <Select
            // defaultValue="lucy"
            style={{
                width: 220,
                fontsize: 'larger',
            }}
            size="large"
            value={idSkudScheduleType}
            onChange={handleIdSkudScheduleTypeChange}
            options={props.schedTypes}
            disabled={deleted}
          />

        {/* <div>
          <Alert message="Обычный пятидневный график."
           description="Установите начало и конец рабочего дня с учётом входящего времени обеда."
           type="warning" />
        </div> */}

          { usedSchedType ? (
            <Collapse
              style={{width:'100%'}}
              size="small"
              items={[{ key: '1', label: 'График: ' + usedSchedType.label, children: <p>
                {usedSchedType.description}
                
              </p> }]}
            />

          ):''}
            </div>
          
          <span className="sk-microspacer"></span>
          <span className="sk-microspacer"></span>
        <div className={'sk-flex-sides  sk-flex-form-row'}>
          <div className={'sk-w-30'}>
          <FontColorsOutlined /> Название графика
          </div>
          <div className={'sk-w-70'}>
          <Input
            value={name}
            onChange={ChangeName}
            maxLength={120}
            disabled={deleted}
          />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
            <FileTextOutlined /> Описание графика
          </div>
          <div className={'sk-w-70'}>
            <TextArea value={description}
              maxLength={250}
              disabled={deleted}
              onChange={ChangeDescription}
              />
          </div>
        </div>


        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
          <CalendarOutlined /> Производственный календарь
          </div>
          <div className={'sk-w-70'}>
            <Select
              options={prodCalendars.map((cal) => ({
                key: cal.id,
                value: Number(cal.id),
                label: cal.year + " - " + cal.company_name + "  (" + cal.id + ")",
              }))} 
              disabled={deleted}
            />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
          <DoubleRightOutlined /> Время начала действия графика
          </div>
          <div className={'sk-w-70'}>
            <DatePicker
              value={dayjs.unix(startTime)}
              onChange={changeStartTime}
              disabled={deleted}
            />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
            <DoubleLeftOutlined /> Время прекращения действия графика
          </div>
          <div className={'sk-w-70'}>
            <DatePicker
              value={dayjs.unix(endTime)}
              onChange={changeEndTime}
              disabled={deleted}
            />
          </div>
        </div>

        { idSkudScheduleType === 1 ? (
          <div className={'sk-flex-sides sk-flex-form-row'}>
            <div className={'sk-w-30'}>
            <ClockCircleOutlined /> Количество рабочих <strong>часов</strong> в учетную единицу времени. Для указания минут, используйте десятичные дроби.
            </div>
            <div className={'sk-w-70 sk-flex-sides'}>
              <div className={'sk-flex '}>
                <div className="sk-w-100" >

                    <InputNumber
                        className="sk-w-100"
                      style={{
                        width: 200,
                      }}
                      defaultValue="1"
                      min="0.1"
                      max="160"
                      step="0.1"
                      onChange={onChangeTargetTime}
                      disabled={deleted}
                    />
                </div>
              </div>

              <div style={{textAlign: 'right'}}>
                Учётная единица измерения рабочего времени
              </div>
              <div>
                <Select
                className="sk-w-100"
                width={150}
                options={DS_SCHED_UNITS}
                disabled={deleted}
                />
              </div>
            </div>
          </div>
        ) : ""}     

        { idSkudScheduleType === 1 ? (
        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
          <DoubleRightOutlined /> Время начала обеденного периода
          </div>
          <div className={'sk-w-70'}>
          <TimePicker type={'time'} 
            showSecond={false}
          onChange={(value) => console.log(value)}
          disabled={deleted}
          />
          </div>
        </div>
        ) : ""} 

      { idSkudScheduleType === 1 ? (
        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
          <DoubleLeftOutlined/> Время окончания обеденного периода
          </div>
          <div className={'sk-w-70'}>
          <TimePicker type={'time'} 
            showSecond={false}
            onChange={(value) => console.log(value)}
            disabled={deleted}
           />
          </div>
        </div>
      ) : ""} 

      { idSkudScheduleType === 1 ? (
        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
            <ClockCircleOutlined/> Максимальная продолжительность обеда в <strong>минутах</strong>.
          </div>
          <div className={'sk-w-70'}>
          <InputNumber
                      className="sk-w-100"

                    defaultValue="1"
                    min="1"
                    max="180"
                    step="1"
                    onChange={onChangeTargetTime}
                    disabled={deleted}
                  />
          </div>
        </div>
      ) : ""} 

          {props.userData.companies.length > 1 ? (

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
          <RadarChartOutlined /> Целевое подразделение, компания
          </div>
          <div className={'sk-w-70'}>
            <Select 
                  options={props.userData.companies.map((el)=>(
                    {
                      key: el.id,
                      value: el.id,
                      label: el.name
                    }
                  ))}
                  value={idCompany}
                  disabled={deleted}
                  onChange={ChangeCompany}
                  // onChange={handleUsedCompanyChange}
              />
          </div>
        </div>
                ) : ''}



        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
            { deleted ? (<CheckCircleOutlined />) : (<DeleteOutlined />)} График актуален, действует
          </div>
          <div className={'sk-w-70'}>
            <Switch 
              checked={deleted ? false : true}
              checkedChildren="АКТИВЕН" unCheckedChildren="АРХИВИРОВАН" defaultChecked
              onChange={ChangeDeleted}
            />
          </div>
        </div>

        {/* <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-30'}>
            Hello
          </div>
          <div className={'sk-w-70'}>
          <TimePicker type={'time'} 
            showSecond={false}
          onChange={(value) => console.log(value)} />
          </div>
        </div> */}


        <br/>
          
        <div>
          { idSkudScheduleType === 1 ? (<Scheditor_one   
              data={schedule} 
              disabled={deleted} updater={updateSchedule} />):""}
          { idSkudScheduleType === 2 ? (<Scheditor_two   
              data={schedule} 
              updater={updateSchedule} />):""}
          { idSkudScheduleType === 3 ? (<Scheditor_three 
              data={schedule} 
              updater={updateSchedule} />):""}
          { idSkudScheduleType === 4 ? (<Scheditor_four  
              data={schedule} 
              updater={updateSchedule} />):""}
          { idSkudScheduleType === 5 ? (<Scheditor_five  
              data={schedule} u
              pdater={updateSchedule} />):""}
        </div>
      </Modal>
    )
};

export default SchedModalEditor;
















const Scheditor_one = (props) => {
  const [startTime, setStartTime] = useState(60 * 60 * 13);
  const [endTime, setEndTime] = useState(60 * 60 * 15);

  const [disabled, setDisabled] = useState(props.disabled);

  const [lastDate, setLastDate] = useState('');
  const [prevData, setPrevData] = useState(null);

  useEffect(()=>{
    if (props.data.length > 0 && props.data[props.data.length - 1].length){

      console.log(props.data);
      setLastDate(props.data[props.data.length - 1][0]);
      setStartTime(props.data[props.data.length - 1][1]);
      setEndTime(props.data[props.data.length - 1][2]);
      setPrevData(props.data);
    } else {
      setStartTime(60 * 60 * 13);
      setEndTime(60 * 60 * 15);
    }

    setDisabled(props.disabled);
  },[props]);

  useEffect(()=>{
    const t = setTimeout(() => {
      if (props.updater){
        let today = dayjs().format('YYYY-MM-DD');
        if (prevData === null)
        {
          setPrevData([[ today, startTime, endTime]]);
          props.updater([[ today, startTime, endTime]]);
        } else {
          // find last array anc compare dates
          let lpd = JSON.parse(JSON.stringify(prevData));
          
          if (lpd[lpd.length - 1][0].trim() === today){
            // update existed
            lpd[lpd.length - 1][1] = startTime;
            lpd[lpd.length - 1][2] = endTime;
          } else {
            // write new theme
            lpd.push([ today, startTime, endTime]);
          }

          props.updater(lpd);
        }
      }
    }, 500);
    
    return () => clearTimeout(t);
  },[startTime, endTime] );


  const changeStartTime = (value) => {
    console.log(value);
    if (value == null){
      setStartTime(60 * 60 * 13);
    } else {
      setStartTime(globalTimeToDaySeconds(value));
    }
  }

  const changeEndtTime = (value) => {
    if (value == null){
      setEndTime(60 * 60 * 15);
    } else {
      setEndTime(globalTimeToDaySeconds(value));
    }
  }



  return (
    <div className="sk-form-frame">
        


        <br/>
    <div className={'sk-flex-sides'}>
        <div className={'sk-w-50'}>
          <Form.Item label="Время начала рабочего дня" name="layout">
            <TimePicker type={'time'} 
                showSecond={false}
                onChange={changeStartTime}
                value={secondsValueToGlobalTime(60 * 60 * 13)}
                defaultValue={secondsValueToGlobalTime(60 * 60 * 13)}
                disabled={disabled}
                />
                </Form.Item>

            </div>
            <div className={'sk-w-50'}>
              <Form.Item label="Время окончания рабочего дня" name="layout">
              <TimePicker type={'time'} 
              defaultValue={secondsValueToGlobalTime(60 * 60 * 15)}
              showSecond={false}
              onChange={changeEndtTime}
              value={secondsValueToGlobalTime(60 * 60 * 15)}
              disabled={disabled}
              />
            </Form.Item>

            </div>
        </div>
    </div>
  );
}




const Scheditor_two = (props) => {
  const [startTime, setStartTime] = useState(60 * 60 * 13);
  const [endTime, setEndTime] = useState(60 * 60 * 15);

  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(()=>{
    if (props.data.length > 0){
      // setStartTime(props.data.schedule[0][0]);
      // setEndTime(props.data.schedule[0][1]);
    } else {
      setStartTime(60 * 60 * 13);
      setEndTime(60 * 60 * 15);
    }

    setDisabled(props.disabled);
  },[props]);



  const changeStartTime = (value) => {
    console.log(value);
    if (value == null){
      setStartTime(60 * 60 * 13);
    } else {
      setStartTime(globalTimeToDaySeconds(value));
    }
  }

  const changeEndtTime = (value) => {
    if (value == null){
      setEndTime(60 * 60 * 15);
    } else {
      setEndTime(globalTimeToDaySeconds(value));
    }
  }

  useEffect(()=>{
    console.log(startTime);
    console.log(endTime);
  }, [startTime, endTime]);

  return (
    <div className="sk-form-frame">
        


        <br/>
    <div className={'sk-flex-sides'}>
        <div className={'sk-w-50'}>
          <Form.Item label="Время начала рабочего дня" name="layout">
            <TimePicker type={'time'} 
                showSecond={false}
                onChange={changeStartTime}
                value={secondsValueToGlobalTime(60 * 60 * 13)}
                defaultValue={secondsValueToGlobalTime(60 * 60 * 13)}
                disabled={disabled}
                />
                </Form.Item>

            </div>
            <div className={'sk-w-50'}>
              <Form.Item label="Время окончания рабочего дня" name="layout">
              <TimePicker type={'time'} 
              defaultValue={secondsValueToGlobalTime(60 * 60 * 15)}
              showSecond={false}
              onChange={changeEndtTime}
              value={secondsValueToGlobalTime(60 * 60 * 15)}
              disabled={disabled}
              />
            </Form.Item>

            </div>
        </div>
    </div>
  );
}

const Scheditor_three = (props) => {

  return (
    <div className="sk-form-frame">
      <p>Свободный график не предполагает ограничений как по времени, так и по длительности посещения работы.</p>
      <p>Работник со свободным графиком может работать из любого места в любое время</p>
    </div>
  );
}

const Scheditor_four = (props) => {

  return (
    <div className="sk-form-frame">
      <SchedCalendar />
  </div>
  );
}

const Scheditor_five = (props) => {

  return (
    <div className="sk-form-frame">
    <p>Свободный график не предполагает ограничений как по времени, так и по длительности посещения работы.</p>
    <p>Работник со свободным графиком может работать из любого места в любое время</p>

  </div>
  );
}