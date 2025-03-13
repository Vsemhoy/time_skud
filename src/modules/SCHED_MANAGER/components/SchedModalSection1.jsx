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

const SchedModalSection1 = (props) => {
  const [startTime, setStartTime] = useState(props?.data[1] || 60 * 60 * 11);
  const [endTime, setEndTime] = useState(props?.data[2] || 60 * 60 * 16);
  const [disabled, setDisabled] = useState(props.disabled);
  const [setDate, setSetDate] = useState(props?.data[0] || dayjs().format('YYYY-MM-DD'));
  const [history, setHistory] = useState([]);
  const [historyTable, setHistoryTable] = useState("");

  const [danger, setDanger] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (props.updater) {
        let lpd = [];
        if (setDate == null || startTime == null || endTime == null) {
          lpd = [];
            setDanger(true);
        } else {
            setDanger(false);
          lpd.push(setDate);
          lpd.push(startTime);
          lpd.push(endTime);
        }
        console.log(lpd);

        props.updater(lpd);
      }
    }, 500);

    return () => clearTimeout(t);
  }, [startTime, endTime, setDate]);


    const changeStartTime = (value) => {

        if (value == null) {
          setStartTime(60 * 60 * 13);
        } else {
            let startsTime = globalTimeToDaySeconds(value);
            let endsTime = endTime;
            if (startsTime > endsTime){
                setStartTime(endsTime);

            } else {
                setStartTime(globalTimeToDaySeconds(value));
            }
        }
      };
    
      const changeEndtTime = (value) => {
        if (value == null) {
            setEndTime(60 * 60 * 13);
          } else {
              let endsTime = globalTimeToDaySeconds(value);
              let startsTime = startTime;
              if (startsTime > endsTime){
                  setEndTime(startTime);
  
              } else {
                setEndTime(globalTimeToDaySeconds(value));
              }
          }
      };
    
      const changeSetDate = (getDate) => {
        let now = dayjs();
        console.log(getDate);
        if (getDate != null && getDate.unix() < now.unix()) {
            console.log("DJFLSDKFJ");
          setSetDate(dayjs().format("YYYY-MM-DD"));
          return;
        }
        if (getDate === null) {
          setSetDate(now.format("YYYY-MM-DD"));
        } else {
          setSetDate(getDate.format("YYYY-MM-DD"));
        }
    };


  /** ------------------ FETCHES ---------------- */
      /**
       * Получение списка строк временных интервалов рабочего времени
       * @param {*} req
       * @param {*} res
       */
      const get_schedule_history = async (req, res) => {
        if (!PRODMODE){
          setHistory(SKUD_SCHED_HISTORY);
          return;
        }
        try {
            const format_data = {
                CSRF_TOKEN,
                data: {
                    schedule_id: props.schedule_id
                }
            }
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedulehistory/schedulehistory_get_by_id?_token=' + CSRF_TOKEN, 
              format_data
            );
            setHistory(response.data.data);
        } catch (e) {
        } finally {
        }
    }


    const deleteHistoryItem = async (item_id) => {
        try {
            const format_data = {
                CSRF_TOKEN,
                data: {
                    id: item_id
                }
            }
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedulehistory/schedulehistory/' + item_id, 
              format_data
            );
            if (response.data.status === 0){
                setHistoryTable(historyTable.filter((item) => item.id !== item_id));
            } else {
                alert("Ошбибка " +  response.data.message);
            }
            
        } finally {
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
            <th></th>
          </tr>
        </thead>
        <tbody className={'ant-table-tbody'}>
          { table.map((item, index)=>(
            <tr className={(index === activeIndex ? "sk-trow-current" : "")}>
              <td>{(index === activeIndex ? <CheckOutlined /> : dayjs(item.enabled_at).unix() > dayjs().unix()  ? <LoadingOutlined /> : <MinusOutlined />  )}</td>
              <td>{ dayjs(item.enabled_at).format("DD.MM.YYYY")}</td>
              <td>{secondsValueToGlobalTime(item.start_time).format('HH:mm')}</td>
              <td>{secondsValueToGlobalTime(item.end_time).format('HH:mm')}</td>
              <td>{secondsValueToGlobalTime(item.end_time - item.start_time).format('HH:mm')}</td>
              <td style={{textAlign: "center"}}>
                {dayjs(item.enabled_at).unix() > dayjs().unix() ? (
                    <DeleteOutlined 
                        style={{cursor: "pointer"}}
                        onClick={() => {deleteHistoryItem(item.id)}}
                    />
                ): "" }
                </td>
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
      <br />
      <div className={'sk-flex-sides'}>
        <div className={'sk-w-33'} style={{ paddingLeft: 12 }}>
          <div>
            <span>Дата начала действия</span>
            <DatePicker
                status={danger ? "error" : ""}
                key={809488}
              type="date"
              format={'DD.MM.YYYY'}
              disabled={disabled}
              value={dayjs(setDate)}
              defaultValue={dayjs()}
              onChange={changeSetDate}
              allowClear={false}
              />
          </div>
        </div>
        <div className={'sk-w-33'}>
        <div>
            <span>Время начала рабочего дня</span>
            <TimePicker
            status={danger ? "error" : ""}
            key={534253}
            onChange={changeStartTime}
            value={secondsValueToGlobalTime(startTime)}
            showSecond={false}
            disabled={disabled}
            allowClear={false}
            />
          </div>
        </div>
        <div className={'sk-w-33'}>
        <div>
            <span>Время окончания рабочего дня</span>
            <TimePicker
            status={danger ? "error" : ""}
            key={5243624564}
            onChange={changeEndtTime}
            value={secondsValueToGlobalTime(endTime)}
            showSecond={false}
            disabled={disabled}
            allowClear={false}
            />
          </div>
        </div>
      </div>
        <br/>
      { danger ? (
      <span style={{paddingBottom: 12, display: "flex", justifyContent: "center"}}>
          <Text type="danger">Все поля должны быть заполнены</Text>
        </span>
      ): ""}
    <span style={{paddingBottom: 12, display: "flex", justifyContent: "center"}}>
       <Text type="secondary">Нельзя создавать больше одной записи на день. Нельзя перезаписывать время на сегодняшний день</Text>
    </span>
      {props.schedule_id ? (
        <div className={'sk-collaptor'}>
          <Collapse
           onChange={get_schedule_history} 
          items={[{
            key: '1',
            label: 'История изменений графика:',
            children: historyTable,
          }]} />
        </div>
      ) : ""}
    </div>
  );
};

export default SchedModalSection1;