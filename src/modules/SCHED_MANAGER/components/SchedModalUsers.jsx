import React, { useEffect, useState } from "react";

import { Button, Flex, Modal, Transfer } from "antd";
import { Space, Typography } from 'antd';

import './style/schedmodalusers.css';
import { CSRF_TOKEN } from "../../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../../API/API";
import { ShortName } from "../../../GlobalComponents/Helpers/TextHelpers";

const { Text, Link } = Typography;



const SchedModalUsers = (props)=>{

      const [open, setOpen] = useState(false);
      const [targetId, setTargetId] = useState(null);
      const [editName, setEditName] = useState(false);
  
      const [name, setName] = useState('New item');
      const [EntityList, setEntityList] = useState([]);
      const [userCount, setUserCount] = useState(0);
  
  
      useEffect(()=>{
          setEntityList(props.data);
      },[props.data]);
      
      // useEffect(()=>{
      //   console.log(props.data);
      //   if (props.data != null){

      //     setName(props.data.name);
      //   }
      // },[props.data]);
  
      useEffect(()=>{
        setOpen(props.opened);
       },[props.opened]);
  
      useEffect(()=>{
        console.log(props);
        getMock(); 
  
        }, [EntityList]);
  
      const [mockData, setMockData] = useState([]);
      const [targetKeys, setTargetKeys] = useState([]);
  
  
  
    const getMock = () => {
      let newMockData   = [];
      let newTargetKeys = [];
      let userco = 0;
  
      for (let i = 0; i < EntityList.length; i++) {
          const element = EntityList[i];
          let mockup = {};
          let key = `mocky_${element.id}`;
          if (element.user_group_id === targetId){
              mockup.chosen = true;
              mockup.title = ShortName(element.surname, element.name, element.patronymic);
              mockup.description = element.surname + " " + element.name + " " + element.patronymic;
              mockup.key = key;
              newMockData.push(mockup);
              newTargetKeys.push(key);
              userco++;
            } else if (element.user_group_id === 0){
              mockup.chosen = false;
              mockup.title =  ShortName(element.surname, element.name, element.patronymic);
              mockup.description = element.surname + " " + element.name + " " + element.patronymic;
              mockup.key = key;
              newMockData.push(mockup);
              // userco++;
          };
      };
      setMockData(newMockData);
      setTargetKeys(newTargetKeys);
      setUserCount(userco);
    };

    


    useEffect(()=>{
        setOpen(props.open);
        setTargetId(props.target_id);
    },[props]);



    const onCancel = ()=>{
      setOpen(false);
      if (props.on_cancel){
        props.on_cancel();
      };
    };

    const onSave = ()=>{
      setOpen(false);
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


    const handleChange = (newTargetKeys, direction, moveKeys) => {
      const addedKeys = direction === 'right' ? moveKeys : [];
      const removedKeys = direction === 'left' ? moveKeys : [];
    
      console.log('Только что привязанные:', addedKeys);
      console.log('Только что отвязанные:', removedKeys);
    
      // Здесь можно обновить состояние, если нужно
      setTargetKeys(newTargetKeys);
      if (props.on_link_update){
        props.on_link_update(targetId,
           addedKeys.map((item)=>{
          return parseInt(item.replace('mocky_', ''));
        }), 
        removedKeys.map((item)=>{
          return parseInt(item.replace('mocky_', ''));
        }));
      }
    };

    const localFilter = (inputValue, option) => {
      return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
           option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    };


    return (
        <Modal
        title={"Список сотрудников с графиком " + targetId}
        centered
        open={open}
        onOk={onSave}
        onCancel={onCancel}
        width={1000}
        okText={"Сохранить"}
        cancelText={"Закрыть"}
      >
        <div>
        <Transfer
                    dataSource={mockData}
                    showSearch
                    filterOption={localFilter}
                    showSelectAll={false}
                    locale={{ itemUnit: 'Чел.', itemsUnit:'', searchPlaceholder: 'Поиск сотрудника', notFoundContent: <div>{'NF'}</div> }}
                    listStyle={{
                        
                        height: 500,
                    }}
                    operations={[ 'Добавить', 'Удалить']}
                    titles={['Пользователи без группы','Пользователи в группе']}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    render={(item) => (
                      <span title={item.description}>
                        {item.title}
                      </span>
                    )}
                    
                    />
        </div>
      </Modal>
    )
};

export default SchedModalUsers;