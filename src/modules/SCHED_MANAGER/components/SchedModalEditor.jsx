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

  // Пример использования геттеров и сеттеров



    useEffect(()=>{
        setOpen(props.open);
        setTargetId(props.target_id);
    },[props])

    useEffect(()=>{
        console.log('props.data', props.data)
        setIdSkudScheduleType(props.data ? props.data.id_skud_schedule_type : 1);
        
        

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
        setIdSkudProdCalendar(props.data ? props.data.id_skud_prod_calendar : 0);
        setCreatorId(props.data ? props.data.creator_id : props.userData.id);
        setCreatedAt(props.data ? props.data.creator_id : dayjs().unix());
        setSchedule(props.data ? props.data.schedule : []);

        setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === idCompany));

      setUsedSchedType(DS_SCHED_TYPES.find((el)=> el.value === (props.data ? parseInt(props.data.id_skud_schedule_type) : 1)));
      console.log(usedSchedType);

    }, [targetId]);



    const onCancel = ()=>{
      if (props.on_cancel){
        props.on_cancel();
      };
    };

    const onSave = ()=>{
      if (props.on_save){
        props.on_save();
      };
    };


    const handleIdSkudScheduleTypeChange = (value)=>{
      console.log('value', value)
      setIdSkudScheduleType(value);
      console.log(DS_SCHED_TYPES.find((el)=> el.value === parseInt(value)));
      setUsedSchedType(DS_SCHED_TYPES.find((el)=> el.value === parseInt(value)));
    }


    const onChangeTargetTime = (value) => {
      console.log(value);
    }
    const onChangeDeleted = (event)=> {
      console.log(event);
      setDeleted(event ? 0 : 1);
    }
    const onChangeCompany = (event) => {
      setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === event));
      console.log(event);
      setIdCompany(event);
    }



    const [type, setType] = useState('time');

    return (
        <Modal
        title={targetId == null ? "Новый график" :  "Редактирование " + targetId}
        centered
        open={open}
        onOk={onSave}
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
            options={DS_SCHED_TYPES}
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
            onChange={(event)=>{setName(event.target.value)}}
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
              onChange={(value) => console.log(value)}
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
              onChange={(value) => console.log(value)}
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
                  onChange={onChangeCompany}
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
              onChange={onChangeDeleted}
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
          { idSkudScheduleType === 1 ? (<Scheditor_one   data={schedule} disabled={deleted} />):""}
          { idSkudScheduleType === 2 ? (<Scheditor_two   data={schedule} />):""}
          { idSkudScheduleType === 3 ? (<Scheditor_three data={schedule} />):""}
          { idSkudScheduleType === 4 ? (<Scheditor_four  data={schedule} />):""}
          { idSkudScheduleType === 5 ? (<Scheditor_five  data={schedule} />):""}
        </div>
      </Modal>
    )
};

export default SchedModalEditor;
















const Scheditor_one = (props) => {
  const [startTime, setStartTime] = useState(60 * 60 * 13);
  const [endTime, setEndTime] = useState(60 * 60 * 15);

  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(()=>{
    if (props.data.length > 0){
      setStartTime(props.data.schedule[0][0]);
      setEndTime(props.data.schedule[0][1]);
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




const Scheditor_two = (props) => {
  const [startTime, setStartTime] = useState(60 * 60 * 13);
  const [endTime, setEndTime] = useState(60 * 60 * 15);

  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(()=>{
    if (props.data.length > 0){
      setStartTime(props.data.schedule[0][0]);
      setEndTime(props.data.schedule[0][1]);
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