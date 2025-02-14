import React, { useEffect, useState } from "react";

import { Alert, Button, Collapse, DatePicker, Empty, Flex, Form, Input, InputNumber, Modal, Select, Switch, TimePicker } from "antd";
import { Space, Typography } from 'antd';

import './style/schedmodaleditor.css';
import dayjs, { Dayjs } from "dayjs";
import { DS_PROD_CALENDARS, DS_SCHED_TYPES, DS_SCHED_UNITS, SKUD_SCHED_HISTORY } from "../../../CONFIG/DEFAULTSTATE";
import { globalTimeToDaySeconds, secondsValueToGlobalTime } from "../../../GlobalComponents/Helpers/TextHelpers";
import TextArea from "antd/es/input/TextArea";
import { CalendarOutlined, CheckCircleOutlined, CheckOutlined, ClockCircleOutlined, LoadingOutlined, DeleteOutlined, DoubleLeftOutlined, DoubleRightOutlined, FileTextOutlined, FontColorsOutlined, MinusOutlined, RadarChartOutlined, UnderlineOutlined } from "@ant-design/icons";
import SchedCalendar from "./SchedCalendar";
import Panel from "antd/es/splitter/Panel";
import { CSRF_TOKEN, PRODMODE } from "../../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../../API/API";

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

    const [ctrlKey, setCtrlKey] = useState(false);

  const [usedSchedType, setUsedSchedType]           = useState(1);

  const [prodCalendars, setProdCalendars] = useState(DS_PROD_CALENDARS);

  const [scheduleTypes, setScheduleTypes] = useState(props.schedTypes);
  // Пример использования геттеров и сеттеров




    useEffect(()=>{
        setOpen(props.open);
        if (props.open){
          setTargetId(props.target_id);
        }
    },[props])

    useEffect(()=>{
      if (props.open){
        console.log('props.data', props.data)
        setIdSkudScheduleType(props.data ? props.data.skud_schedule_type_id : 1);
        setCtrlKey(props.ctrl_key);
        let COM_ID = props.data && props.id_company ? props.data.id_company : props.userData.companies.reverse()[0].id;
        setIdCompany(COM_ID);

        setCreatorId(props.data ? props.data.creator_id : props.userData.id);
        setName(props.data ? props.data.name : "График " + dayjs().year());
        setDescription(props.data ? props.data.description : "Опишите график тут на всякий...");
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
        setIdSkudProdCalendar(props.data ? props.data.skud_prod_calendar_id : props.prodCalendars[0] ? props.prodCalendars[0].id : 0);
        setCreatorId(props.data ? props.data.creator_id : props.userData.id);
        setCreatedAt(props.data ? props.data.creator_id : dayjs().unix());
        setSchedule(props.data ? props.data.schedule : []);

        setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === COM_ID));

        console.log(props.schedTypes);
        setUsedSchedType(props.schedTypes.find((el)=> el.value === (props.data ? parseInt(props.data.skud_schedule_type_id) : 1)));
      }
    }, [targetId, props]);



    const saveForm = () =>{
      console.log(idSkudProdCalendar, "Hl");
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

      // console.log(data);
  
      if (props.on_save){
        props.on_save(data);
      };
      // console.log('saveform');
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
      setTargetTime(value * 60 * 60);
    }
    const ChangeDeleted = (event)=> {
      console.log(event);
      setDeleted(event ? 0 : 1);
    }
    const ChangeCompany = (event) => {
      setProdCalendars(props.prodCalendars.filter((el)=>el.id_company === event));
      setIdSkudProdCalendar(props.prodCalendars.filter((el)=>el.id_company === event).length ? props.prodCalendars.filter((el)=>el.id_company === event)[0].id : null);
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


    const deleteSchedule = () => {
      if (window.confirm("Точно удалить группу?")){
        if (props.on_delete)
        {
          props.on_delete(targetId);
        }
      }


    }








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
            <Select
              value={idSkudProdCalendar}
              options={prodCalendars.map((cal) => ({
                key: cal.id,
                value: Number(cal.id),
                label: cal.year + " - " + cal.company_name + "  (" + cal.id + ")",
              }))} 
              onChange={(val)=>{setIdSkudProdCalendar(val)}}
              disabled={deleted}
            />
          </div>
        </div>

        </div>
          
        <div className={"sk-form-group"}>


        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <DoubleRightOutlined /> Время начала действия графика
          </div>
          <div className={'sk-w-60'}>
            <DatePicker
              value={dayjs.unix(startTime)}
              onChange={changeStartTime}
              disabled={deleted}
            />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            <DoubleLeftOutlined /> Время прекращения действия графика
          </div>
          <div className={'sk-w-60'}>
            <DatePicker
              value={dayjs.unix(endTime)}
              onChange={changeEndTime}
              disabled={deleted}
            />
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

                    <InputNumber
                      defaultValue="1"
                      min="0.1"
                      max="160"
                      step="0.1"
                      onChange={onChangeTargetTime}
                      disabled={deleted}
                      value={targetTime / 60 / 60}
                    />
                </div>
              </div>
                      
              <div className={'sk-flex-sides sk-flex-form-row'}>
              <div className={'sk-w-40'}>
              <UnderlineOutlined /> Учётная единица измерения рабочего времени
              </div>
              <div className="sk-w-60" >
                <Select
                className="sk-w-100"
                width={150}
                onChange={(val)=>{setTargetUnit(val)}}
                options={DS_SCHED_UNITS}
                disabled={deleted}
                value={targetUnit}
                />
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
          <TimePicker type={'time'} 
            showSecond={false}
            onChange={ChangeLunchStart}
            disabled={deleted}
            value={secondsValueToGlobalTime(lunchStart)}
          />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
          <DoubleLeftOutlined/> Время окончания обеденного периода
          </div>
          <div className={'sk-w-60'}>
          <TimePicker 
            type={'time'} 
            showSecond={false}
            onChange={ChangeLunchEnd}
            disabled={deleted}
            value={secondsValueToGlobalTime(lunchEnd)}
           />
          </div>
        </div>

        <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            <ClockCircleOutlined/> Максимальная продолжительность обеда в <strong>минутах</strong>.
          </div>
          <div className={'sk-w-60'}>
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
          </div>
        </div>
        </div>
      ) : ""} 





        <div className={'sk-flex-sides sk-flex-form-row'}>
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
        </div>

        {/* <div className={'sk-flex-sides sk-flex-form-row'}>
          <div className={'sk-w-40'}>
            Hello
          </div>
          <div className={'sk-w-60'}>
          <TimePicker type={'time'} 
            showSecond={false}
          onChange={(value) => console.log(value)} />
          </div>
        </div> */}


        <br/>
          
        <div>
          { idSkudScheduleType === 1 ? (<Scheditor_one   
              data={schedule} schedule_id={targetId}
              disabled={deleted} updater={updateSchedule} />):""}
          { idSkudScheduleType === 2 ? (<Scheditor_two   
              data={schedule} schedule_id={targetId}
              updater={updateSchedule} />):""}
          { idSkudScheduleType === 3 ? (<Scheditor_three 
              data={schedule} schedule_id={targetId}
              updater={updateSchedule} />):""}
          { idSkudScheduleType === 4 ? (<Scheditor_four  
              data={schedule} schedule_id={targetId}
              updater={updateSchedule} />):""}
          { idSkudScheduleType === 5 ? (<Scheditor_five  
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
















const Scheditor_one = (props) => {
  const [startTime, setStartTime] = useState(60 * 60 * 13);
  const [endTime, setEndTime] = useState(60 * 60 * 15);

  const [disabled, setDisabled] = useState(props.disabled);

  const [setDate, setSetDate] = useState(null);

  const [history, setHistory] = useState([]);
  const [historyTable, setHistoryTable] = useState("");

  // useEffect(()=>{
  //   if (props.data.length > 0 ){
  //     // Входные данные в data - ['2020-03-18',1738968722,1738968722], 
  //     // что означает [дата начала действия, время начала смены от начала дня, время конца смены от к.д.]
  //     console.log(props.data);
  //     setSetDate(props.data[0]);
  //     setStartTime(props.data[1]);
  //     setEndTime(props.data[2]);
  //   } else {
  //     setStartTime(60 * 60 * 13);
  //     setEndTime(60 * 60 * 15);
  //     setSetDate(dayjs().format('YYYY-MM-DD'));
  //   }

  //   setDisabled(props.disabled);
  // },[props]);

  useEffect(()=>{
    const t = setTimeout(() => {
      if (props.updater){
        let today = dayjs().format('YYYY-MM-DD');

        let lpd = [];
          
        if (setDate == null || startTime == null || endTime == null){
          lpd = [];
        } else {
          lpd.push(setDate);
          lpd.push(startTime);
          lpd.push(endTime);
        }

          props.updater(lpd);
      }
    }, 500);
    
    return () => clearTimeout(t);
  },[startTime, endTime, setDate] );


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

  const changeSetDate = (getDate) => {
    let now = dayjs();
    if (getDate != null && getDate.unix() < now.unix())
    {
      getDate = now;
    };
    if (getDate === null){
      setSetDate(null);
    } else {

      setSetDate(getDate.format("YYYY-MM-DD"));
    }
  }



  /** ------------------ FETCHES ---------------- */
      /**
       * Получение списка строк временных интервалов рабочего времени
       * @param {*} req
       * @param {*} res
       */
      const get_schedule_history = async (req, res) => {
        if (PRODMODE){
          setHistory(SKUD_SCHED_HISTORY);
          return;
        }
        try {
            // setLoadingOrgs(true)
            const format_data = {
                CSRF_TOKEN,
                data: {
                    schedule_id: props.schedule_id
                    // active_date: get_unix_by_datearray(filters.active_date)
                }
            }
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedulehistory/schedulehistory_get_by_id?_token=' + CSRF_TOKEN, 
              format_data
            );
            console.log('me: ', response);
            // setOrganizations(organizations_response.data.org_list)
            // setTotal(organizations_response.data.total_count)
            setHistory(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
            // setPageLoaded(true);
        }
    }
    /** ------------------ FETCHES END ---------------- */
    

  useEffect(()=>{
    if (props.schedule_id == null){
      setHistoryTable("");
      return;
    }

    let table = history.reverse();
    let activeIndex = -1;
    if (table.length > 0){
      if (dayjs(table[0].enabled_at).unix() < dayjs().unix()){
        activeIndex = 0;
      }
    }
    if (activeIndex < 0 && table.length > 1){
      if (dayjs(table[1].enabled_at).unix() < dayjs().unix()){
        activeIndex = 1;
      }
    }

    setHistoryTable(
      <div className={'ant-table-container'}>
              <div className={'ant-table-content'}>
        
      {table.length ? (
        <table className={'sk-table-table'}>
        <thead className={'ant-table-thead'}>
          <tr>
            <th></th>
            <th>Вступление в действие</th>
            <th>Начало рабочего дня</th>
            <th>Конец рабочего дня</th>
            <th>Интервал</th>
          </tr>
        </thead>
        <tbody className={'ant-table-tbody'}>
          { table.map((item, index)=>(
            <tr className={(index === activeIndex ? "sk-trow-current" : "")}>
              <td>{(index === activeIndex ? <CheckOutlined /> : dayjs(item.enabled_at).unix() > dayjs().unix()  ? <LoadingOutlined /> : <MinusOutlined />  )}</td>
              <td>{item.enabled_at}</td>
              <td>{secondsValueToGlobalTime(item.start_time).format('HH:mm')}</td>
              <td>{secondsValueToGlobalTime(item.end_time).format('HH:mm')}</td>
              <td>{secondsValueToGlobalTime(item.end_time - item.start_time).format('HH:mm')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}


      </div>
      </div>
    );
   },[history]);




  return (
    <div className="sk-form-frame">
        <br/>
    <div className={'sk-flex-sides'}>
        <div className={'sk-w-33'} style={{paddingLeft: 12}}>
          <Form.Item label="Дата начала действия" name="layout">
              <DatePicker
                type="date"
                disabled={disabled}
                value={dayjs(setDate)}
                onChange={changeSetDate}

              ></DatePicker>
                </Form.Item>
            </div>
        <div className={'sk-w-33'}>
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
            <div className={'sk-w-33'}>
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

        {props.schedule_id ? (
          <div className={'sk-collaptor'}>
          <Collapse  onChange={get_schedule_history}
            items={[{
              key: '1',
              label: 'История изменений графика:',
              children: historyTable
            ,
            }]}
          >
          </Collapse>
          </div>
        ) : ""}

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