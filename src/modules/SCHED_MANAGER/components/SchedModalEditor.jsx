import React, { useEffect, useState } from "react";

import { Button, Flex, Input, Modal, Select, TimePicker } from "antd";
import { Space, Typography } from 'antd';

import './style/schedmodaleditor.css';
import dayjs, { Dayjs } from "dayjs";
import { DS_SCHED_TYPES } from "../../../CONFIG/DEFAULTSTATE";
import { secondsValueToGlobalTime } from "../../../GlobalComponents/Helpers/TextHelpers";

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
    }


    const [type, setType] = useState('time');

    return (
        <Modal
        title={"Редактирование " + targetId}
        centered
        open={open}
        onOk={onSave}
        onCancel={onCancel}
        width={1000}
        okText={"Сохранить"}
        cancelText={"Закрыть"}
      >
        <div className={'sk-sme-toolbar, sk-flex-gap'}>
            <Select
                    // defaultValue="lucy"
                    style={{
                        width: 150,
                    }}
                    value={idSkudScheduleType}
                    onChange={handleIdSkudScheduleTypeChange}
                    options={DS_SCHED_TYPES}
                    />

          <Input
            value={name}
            onChange={(event)=>{setName(event.target.value)}}
            maxLength={64}
          />

          {/* <Select value={type} onChange={setType}>
              <Option value="time">Time</Option>
              <Option value="date">Date</Option>
              <Option value="week">Week</Option>
              <Option value="month">Month</Option>
              <Option value="quarter">Quarter</Option>
              <Option value="year">Year</Option>
            </Select> */}
          <TimePicker type={type} 
            showSecond={false}
          onChange={(value) => console.log(value)} />


        </div>
        {/* <p>{name}</p>
        <p>{description}</p> */}
        <div>
          { idSkudScheduleType === 1 ? (<Scheditor_one data={schedule} />):""}
          { idSkudScheduleType === 2 ? (<Scheditor_two data={schedule} />):""}
          { idSkudScheduleType === 3 ? (<Scheditor_three data={schedule} />):""}
          { idSkudScheduleType === 4 ? (<Scheditor_four data={schedule} />):""}
          { idSkudScheduleType === 5 ? (<Scheditor_five data={schedule} />):""}
        </div>
      </Modal>
    )
};

export default SchedModalEditor;


const formatTimestampToDayjs = (timestamp) => {
  return timestamp ? dayjs.unix(timestamp) : null;
};



const Scheditor_one = (props) => {

  return (
    <div className={'sk-flex-gap'}>
      <TimePicker type={'time'} 
          showSecond={false}
          onChange={(value) => console.log(value)}
          value={secondsValueToGlobalTime(60 * 60 * 13)}
           />
      <TimePicker type={'time'} 
          showSecond={false}
          onChange={(value) => console.log(dayjs().unix())}
          value={secondsValueToGlobalTime(60 * 60 * 15)}
          />
    </div>
  );
}

const Scheditor_two = (props) => {

  return (
    <div>Editor one or...2</div>
  );
}

const Scheditor_three = (props) => {

  return (
    <div>Editor one or...3</div>
  );
}

const Scheditor_four = (props) => {

  return (
    <div>Editor one or...4</div>
  );
}

const Scheditor_five = (props) => {

  return (
    <div>Editor one or...5</div>
  );
}