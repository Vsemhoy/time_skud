import React, { useEffect, useState } from "react";

import { Alert, Button, Collapse, DatePicker, Empty, Flex, Form, Input, InputNumber, Modal, Select, Switch, TimePicker } from "antd";
import { Space, Typography } from 'antd';

import './style/schedmodaleditor.css';
import dayjs, { Dayjs } from "dayjs";
import { DS_PROD_CALENDARS, DS_SCHED_TYPES, DS_SCHED_UNITS, DS_SCHEDULE_LIST, SKUD_SCHED_HISTORY } from "../../../CONFIG/DEFAULTSTATE";
import { formatUnixToStringTime, globalTimeToDaySeconds, secondsValueToGlobalTime } from "../../../GlobalComponents/Helpers/TextHelpers";
import TextArea from "antd/es/input/TextArea";
import { CalendarOutlined, CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, LoadingOutlined, DeleteOutlined, DoubleLeftOutlined, DoubleRightOutlined, FileTextOutlined, FontColorsOutlined, MinusOutlined, RadarChartOutlined, UnderlineOutlined } from "@ant-design/icons";
import SchedCalendar from "./SchedCalendar";
import Panel from "antd/es/splitter/Panel";
import { CSRF_TOKEN, PRODMODE } from "../../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../../API/API";
import SchedModalSection1 from "./SchedModalSection1";

const { Text, Link } = Typography;



const SchedModalEditor = (props)=>{
  
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const [editable, setEditable] = useState(true);

  const [editedItem, setEditedItem] = useState({});

  const [createdAt, setCreatedAt]                   = useState(null);
  const [idCompany, setIdCompany]                   = useState(1);
  const [companyName, setCompanyName]               = useState(null);
  const [companyColor, setCompanyColor]             = useState(null);
  const [idSkudScheduleType, setIdSkudScheduleType] = useState(1);
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
  const [prodCalendar, setProdCalendar]             = useState(null);

    const [ctrlKey, setCtrlKey] = useState(false);

  const [usedSchedType, setUsedSchedType]           = useState(1);

  const [prodCalendars, setProdCalendars] = useState(props.prodCalendars);

  const [scheduleTypes, setScheduleTypes] = useState(props.schedTypes);
  // Пример использования геттеров и сеттеров




    useEffect(()=>{
        setOpen(props.open);
        if (props.open){
          setTargetId(props.target_id);
        }
    },[props])

    useEffect(()=>{
      // console.log(props);
      if (props.target_id !== null && props.target_id !== 0) {
        setTargetId(props.target_id);
        if (!PRODMODE)
        {
          get_schedItem(props.target_id);

        } else {
          let item = DS_SCHEDULE_LIST.find((item) => item.id === props.target_id);
          setEditedItem(item);
        }
        
      } else {
        setEditedItem(null);
        setTargetId(null);
      }
      
    }, [props]);

    useEffect(()=>{
      if (props.open){
        setFormData();
      }
    },[editedItem]);


    const setFormData = () => {
        setIdSkudScheduleType(editedItem ? editedItem.skud_schedule_type_id : 1);
        setCtrlKey(props.ctrl_key);
        let COM_ID = editedItem && props.id_company ? editedItem.id_company : props.userData.companies.reverse()[0].id;
        setIdCompany(COM_ID);

        setCreatorId(editedItem ? editedItem.creator_id : props.userData.id);
        setName(editedItem ? editedItem.name : "График " + dayjs().year());
        setDescription(editedItem ? editedItem.description : "Опишите график тут на всякий...");
        setCompanyName(props.company_name ? editedItem.company_name : props.userData.companies[0].name);
        setCompanyColor(props.company_color ? editedItem.company_color : props.userData.companies[0].color);
        
        
        setStartTime(editedItem ? editedItem.start_time : dayjs().unix());
        setEndTime(editedItem ? editedItem.end_time : dayjs().unix());

        setTargetTime(editedItem ? editedItem.target_time : (60 * 60 * 8));
        setTargetUnit(editedItem ? editedItem.target_unit : 1);
        
        setLunchStart(editedItem ? editedItem.lunch_start : (60 * 60 * 13));
        setLunchEnd(editedItem ? editedItem.lunch_end : (60 * 60 * 15));
        setLunchTime(editedItem ? editedItem.lunch_time : (60 * 45));

        setNextId(editedItem ? editedItem.next_id : null);
        setDeleted(editedItem ? editedItem.deleted : 0);
        setIdSkudProdCalendar(editedItem ? editedItem.skud_prod_calendar_id : props.prodCalendars[0] ? props.prodCalendars[0].id : 0);
        setCreatorId(editedItem ? editedItem.creator_id : props.userData.id);
        setCreatedAt(editedItem ? editedItem.created_at : dayjs().unix());
        setSchedule(editedItem ? editedItem.schedule : []);

        setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === COM_ID));

        // console.log(props.schedTypes);
        setUsedSchedType(props.schedTypes.find((el)=> el.value === (editedItem ? parseInt(editedItem.skud_schedule_type_id) : 1)));

        let edittcom = editedItem && editedItem.id_company ? editedItem.id_company : props.userData.id_company;
        console.log(edittcom);
        setProdCalendar(prodCalendars.find((cal)=>{return (parseInt(cal.year) === dayjs().year() && cal.id_company === edittcom)}));

    }

    useEffect(()=>{
      setProdCalendar(props.prodCalendars.find((cal)=>{return (parseInt(cal.year) === dayjs().year() && cal.id_company === (idCompany ? idCompany : props.userData.id_company) )}));
      setCompanyName(props.userData.companies.find((el)=>{return el.id === idCompany}).name);
    },[idCompany]);

    useEffect(()=>{
      console.log(createdAt);
      let a = dayjs.unix(createdAt).startOf('day').unix();
      let b = dayjs().add(1,'day').startOf('day').unix();
      if (!createdAt || a > b )
      {
        setEditable(true);
      } else {
        setEditable(false);
      }
    },[createdAt]);

     /* Получение одной группы
     * @param {*} req 
     * @param {*} res 
     */
     const get_schedItem = async (item_id, req, res ) => {
      // console.log(item_id);
      if (!item_id){ return ; }
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedule/schedule_get/' + item_id, 
                {
                    data: {},
                    _token: CSRF_TOKEN
                });
            // console.log('departs', response);
            setEditedItem(response.data.data);
        } catch (e) {
            // console.log(e)
        } finally {
            
        }
    }




    const saveForm = () =>{
      // console.log(idSkudProdCalendar, "Hl");
      let data = {

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
      } else {
        data.id = targetId;
      }

      // // console.log(data);
  
      if (props.on_save){
        props.on_save(data);
      };
      // // console.log('saveform');
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
      // console.log('value', value)
      setIdSkudScheduleType(value);
      // console.log(props.schedTypes.find((el)=> el.value === parseInt(value)));
      setUsedSchedType(props.schedTypes.find((el)=> el.value === parseInt(value)));
    }


    const onChangeTargetTime = (value) => {
      setTargetTime(value * 60 * 60);
    }
    const ChangeDeleted = (event)=> {
      // console.log(event);
      setDeleted(event ? 0 : 1);
    }
    const ChangeCompany = (event) => {
      setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === event));
      setIdSkudProdCalendar(props.prodCalendars.filter((el)=>el.id_company === event).length ? props.prodCalendars.filter((el)=>el.id_company === event)[0].id : null);
      // console.log(event);
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
      // console.log(event);
    }
    const ChangeUnitMeasure = (event) => {
      setTargetUnit(event);
    }
    const ChangeLunchStart = (value) => {
        setLunchStart(globalTimeToDaySeconds(value));
      }
      
    const ChangeLunchEnd = (value) => {
      setEndTime(globalTimeToDaySeconds(value));
    }
    const ChangeLunchDuration = (value) => {
      setLunchTime(value * 60);
    }


    const changeStartTime = (value) => {
      if (value) {
        let providedDate = dayjs(value); // Convert input to Day.js object
       if (globalTimeToDaySeconds(providedDate) > endTime)
       {
        setStartTime(endTime);
       } else {
         setStartTime(globalTimeToDaySeconds(providedDate));

       }
      }
    }

    const changeEndTime = (value) => {
      // Convert startTime to a Day.js object
      if (value) {
        // Convert input value to a Day.js object
        let providedDate = dayjs(value); 
        if (globalTimeToDaySeconds(providedDate) < startTime){
          setEndTime(startTime);
        } else {
          // Update end time state with the adjusted date
          setEndTime(globalTimeToDaySeconds(providedDate));
        }
      }
    }


    const deleteSchedule = () => {
      if (window.confirm("Точно удалить группу?")){
        if (props.on_delete)
        {
          props.on_delete(targetId);
        }
      }


    }



    console.log(props.schedTypes);




    return (
        <Modal
        title={targetId == null ? "Новый график" :  "Редактирование графика " + targetId}
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
          { editable ? (
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
          ) : ""}

        
        {/* <div>
          <Alert message="Обычный пятидневный график."
           description="Установите начало и конец рабочего дня с учётом входящего времени обеда."
           type="warning" />
        </div> */}


          { !ctrlKey ?? usedSchedType ? (
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

          <div className={"sk-form-group"}>
        {props.userData.companies.length > 1 ? (

          
        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <RadarChartOutlined /> Подразделение, филиал, компания
          </div>
          <div className={'sk-w-60'}>
            { targetId === null || editable ? (
                          <Select 
                  options={props.userData.companies.reverse().map((el)=>(
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
            ) : (<span>{companyName}</span>)
            
            }


          </div>
        </div>
        ) : ''}


        <div className={'sk-flex-sides  sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <FontColorsOutlined /> Название графика
          </div>
          <div className={'sk-w-60'}>
          <Input
            value={name}
            onChange={ChangeName}
            maxLength={120}
            disabled={deleted}
          />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            <FileTextOutlined /> Описание графика
          </div>
          <div className={'sk-w-60'}>
            <TextArea value={description}
              maxLength={250}
              disabled={deleted}
              onChange={ChangeDescription}
              />
          </div>
        </div>


        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <CalendarOutlined /> Производственный календарь
          </div>
          <div className={'sk-w-60'}>
            <span>
            {
              prodCalendar ? prodCalendar.year + " " + companyName : (<span style={{color: 'red'}}>Создайте производственный календарь!</span>)
            }

            {/* {prodCalendars.find((cal) => ({
                key: cal.id,
                value: Number(cal.id),
                label: cal.year + " - " + cal.company_name + "  (" + cal.id + ")",
              }))} */}
            </span>
            {/* <Select
              value={idSkudProdCalendar}
              options={prodCalendars.map((cal) => ({
                key: cal.id,
                value: Number(cal.id),
                label: cal.year + " - " + cal.company_name + "  (" + cal.id + ")",
              }))} 
              onChange={(val)=>{setIdSkudProdCalendar(val)}}
              disabled={deleted}
            /> */}
          </div>
        </div>

        </div>
          
        <div className={"sk-form-group"}>


        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          
          <DoubleRightOutlined /> Время начала рабочего дня
          </div>
          <div className={'sk-w-60'}>
          { targetId === null || editable ? (
            <TimePicker
            showSecond={false}
              value={secondsValueToGlobalTime(startTime)}
              onChange={changeStartTime}
              disabled={deleted}
            />
          ) : (
            <span>{formatUnixToStringTime(startTime)}</span>
          ) }
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            <DoubleLeftOutlined /> Время прекращения рабочего дня
          </div>
          <div className={'sk-w-60'}>
          { targetId === null || editable ? (
                        <TimePicker
            showSecond={false}
              value={secondsValueToGlobalTime(endTime)}
              onChange={changeEndTime}
              disabled={deleted}
            />
          ) : (
            <span>{formatUnixToStringTime(endTime)}</span>
          ) }

          </div>
        </div>

        </div>


        { idSkudScheduleType === 1 ? (
          <div className={"sk-form-group"}>

          <div className={'sk-flex-sides sk-flex-form-row'}>
            <div className={'sk-w-40'}>
            <ClockCircleOutlined /> Количество рабочих <strong>часов</strong> в учетную единицу времени. Для указания минут, используйте десятичные дроби.
            </div>

                <div className="sk-w-60" >
                { targetId === null || editable ? (
                                      <InputNumber
                      defaultValue="1"
                      min="0.1"
                      max="160"
                      step="0.1"
                      onChange={onChangeTargetTime}
                      disabled={deleted}
                      value={targetTime / 60 / 60}
                    />
                ) : (
            <span>{targetTime / 60 / 60}</span>
          ) }

                </div>
              </div>
                      
              <div className={'sk-flex-sides sk-flex-form-row'}>
              <div className={'sk-w-40'}>
              <UnderlineOutlined /> Учётная единица измерения рабочего времени
              </div>
              <div className="sk-w-60" >
              { targetId === null || editable ? (
                                <Select
                className="sk-w-100"
                width={150}
                onChange={(val)=>{setTargetUnit(val)}}
                options={DS_SCHED_UNITS}
                disabled={deleted}
                value={targetUnit}
                />
              ) : (
                <span>{DS_SCHED_UNITS.find((item)=>{return item.value === targetUnit})?.label}</span>
              )}

              </div>
     
          </div>
          </div>
                      ) : ""}
        

          { idSkudScheduleType === 1 ? (
             <div className={"sk-form-group"}>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <DoubleRightOutlined /> Время начала обеденного периода
          </div>
          <div className={'sk-w-60'}>
          { targetId === null || editable ? (
                      <TimePicker type={'time'} 
            showSecond={false}
            onChange={ChangeLunchStart}
            disabled={deleted}
            value={secondsValueToGlobalTime(lunchStart)}
          />
          ) : (
            <span>{formatUnixToStringTime(lunchStart)}</span>
          ) }

          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <DoubleLeftOutlined/> Время окончания обеденного периода
          </div>
          <div className={'sk-w-60'}>
          { targetId === null || editable ? (
                      <TimePicker 
            type={'time'} 
            showSecond={false}
            onChange={ChangeLunchEnd}
            disabled={deleted}
            value={secondsValueToGlobalTime(lunchEnd)}
           />
          ) : (
            <span>{formatUnixToStringTime(lunchEnd)}</span>
          ) }

          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            <ClockCircleOutlined/> Максимальная продолжительность обеда в <strong>минутах</strong>.
          </div>
          <div className={'sk-w-60'}>
          { targetId === null || editable ? (
                                  <InputNumber
                      className="sk-w-100"
                    value={lunchTime / 60}
                    defaultValue="45"
                    min="1"
                    max="180"
                    step="1"
                    onChange={ChangeLunchDuration}
                    disabled={deleted}
                  />
          )

            : (
            <span>{lunchTime / 60}</span>
          ) }

          </div>
        </div>
        </div>
      ) : ""} 





        {/* <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            { deleted ? (<CheckCircleOutlined />) : (<DeleteOutlined />)} График актуален, действует
          </div>
          <div className={'sk-w-60'}>
            <Switch 
              checked={deleted ? false : true}
              checkedChildren="АКТИВЕН" unCheckedChildren="АРХИВИРОВАН" defaultChecked
              onChange={ChangeDeleted}
            />
          </div>
        </div> */}

        {/* <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            Hello
          </div>
          <div className={'sk-w-60'}>
          <TimePicker type={'time'} 
            showSecond={false}
          onChange={(value) => // console.log(value)} />
          </div>
        </div> */}


        <br/>
          
        <div>
          {/* { props.open && idSkudScheduleType === 1 ? (<SchedModalSection1   
              data={schedule} schedule_id={targetId}
              disabled={deleted} updater={updateSchedule} />):""} */}
          { props.open && idSkudScheduleType === 2 ? (<ScheditorTwo   
              data={schedule} schedule_id={targetId}
              updater={updateSchedule} />):""}
          { props.open && idSkudScheduleType === 3 ? (<ScheditorThree 
              data={schedule} schedule_id={targetId}
              updater={updateSchedule} />):""}
          { props.open && idSkudScheduleType === 4 ? (
              <div className="sk-form-frame">
                <SchedCalendar />
              </div>
          ):""}
          { props.open && idSkudScheduleType === 5 ? (<SchedirorFive  
              data={schedule}  schedule_id={targetId}
              updater={updateSchedule} />):""}
        </div>
        
        {ctrlKey ? (
          <div style={{marginTop: 22}}>
                <Button  type="primary"
                  onClick={deleteSchedule} 
                  danger>Удалить график и отвязать всех пользователей</Button>
                  </div>
              ) : ""}
      </Modal>
    )
};

export default SchedModalEditor;









const ScheditorTwo = (props) => {
  const [startTime, setStartTime] = useState(60 * 60 * 13);
  const [endTime, setEndTime] = useState(60 * 60 * 15);

  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(()=>{
  
      // setStartTime(props.data.schedule[0][0]);
      // setEndTime(props.data.schedule[0][1]);

      setStartTime(60 * 60 * 13);
      setEndTime(60 * 60 * 15);


    setDisabled(props.disabled);
  },[props]);



  const changeStartTime = (value) => {
    // console.log(value);
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
    // console.log(startTime);
    // console.log(endTime);
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

const ScheditorThree = (props) => {

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

const SchedirorFive = (props) => {

  return (
    <div className="sk-form-frame">
    <p>Свободный график не предполагает ограничений как по времени, так и по длительности посещения работы.</p>
    <p>Работник со свободным графиком может работать из любого места в любое время</p>

  </div>
  );
}