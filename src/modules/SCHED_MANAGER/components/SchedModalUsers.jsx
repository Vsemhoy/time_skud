import React, { useEffect, useState } from "react";

import { Button, Flex, Modal } from "antd";
import { Space, Typography } from 'antd';

import './style/schedmodalusers.css';
import { CSRF_TOKEN } from "../../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../../API/API";

const { Text, Link } = Typography;



const SchedModalUsers = (props)=>{
  
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);





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


    // Функция для получения данных с API
    const getScheduleItem = async () => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedules/schedules_get/' + targetId, {
                data: {},
                _token: CSRF_TOKEN
            });
            console.log('get_scheduleList => ', response.data);
        } catch (e) {
            console.error(e);
        }
    };




    return (
        <Modal
        title={"Списки пользователей " + targetId}
        centered
        open={open}
        onOk={onSave}
        onCancel={onCancel}
        width={1000}
        okText={"Сохранить"}
        cancelText={"Закрыть"}
      >
        <p>some contents...</p>
        <p>some contents... fasdf s</p>
        <p>some contents...</p>
      </Modal>
    )
};

export default SchedModalUsers;