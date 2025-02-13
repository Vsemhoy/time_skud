import React, { useEffect, useState } from "react";

import { Badge, Button, Empty, Flex, Modal, Tag, Transfer } from "antd";
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

      const [dataToUpdate, setDataToupdate] = useState([]);

  const [ entToUnlink, setEntToUnlink] = useState([]);
  const [ entToLink, setEntToLink] = useState([]);
  
      useEffect(()=>{
        if (props.open){
          setTargetId(props.target_id);
          setOpen(props.open);
          setEntityList(props.data);
          setEntToLink([]);
          setEntToUnlink([]);
        }
      },[props.data, props.open, props.target_id]);
      

  
      // useEffect(()=>{
      //   setOpen(props.open);
      //  },[props.open]);
  
      useEffect(()=>{
        console.log(targetId, "TARGET_ID")
        console.log("pre-getmock" , EntityList);
        getMock(); 
  
        }, [EntityList, targetId]);
  
      const [mockData, setMockData] = useState([]);
      const [targetKeys, setTargetKeys] = useState([]);
  
  
  
    const getMock = () => {
      let newMockData   = [];
      let newTargetKeys = [];
      let userco = 0;
  
      for (let i = 0; i < EntityList.length; i++) {
          const element = EntityList[i];
          if (element.id_company !== props.group_data.id_company){ continue;}
          let mockup = {};
          let key = element.type === 3 ? `user_${element.id}` : `group_${element.id}` ;
          if (element.schedule_id === props.target_id){
              mockup.chosen = true;
              mockup.title = element.type === 3 ? ShortName(element.surname, element.name, element.patronymic) : element.name;
              mockup.description = element.type === 3 ? (element.surname + " " + element.name + " " + element.patronymic) : element.name;
              mockup.key = key;
              mockup.type = element.type;
              newMockData.push(mockup);
              newTargetKeys.push(key);
              userco++;
            } else if (element.schedule_id === 0){
              mockup.chosen = false;
              mockup.type = element.type;
              mockup.title = element.type === 3 ? ShortName(element.surname, element.name, element.patronymic) : element.name;
              mockup.description = element.type === 3 ? (element.surname + " " + element.name + " " + element.patronymic) : element.name;
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
      console.log('HELLO WOLF');
      if (props.on_save){
        props.on_save(dataToUpdate);
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


    useEffect(()=>{
      const addedKeys = entToLink;
      const removedKeys = entToUnlink;
      setDataToupdate([
        targetId,
           addedKeys.map((item)=>{
            console.log(item);
            if (item.includes('group')){
              return {type: 2, id: parseInt(item.replace('group_', ''))};
            } else if (item.includes('user'))
            {
              return {type: 3, id: parseInt(item.replace('user_', ''))};
            }
        }), 
        removedKeys.map((item)=>{
          if (item.includes('group')){
            return {type: 2, id: parseInt(item.replace('group_', ''))};
          } else if (item.includes('user'))
          {
            return {type: 3, id: parseInt(item.replace('user_', ''))};
          }
        })]);
     },[entToLink, entToUnlink]);


    const handleChange = (newTargetKeys, direction, moveKeys) => {
      const addedKeys = direction === 'right' ? moveKeys  : [];
      const removedKeys = direction === 'left' ? moveKeys : [];
    
      // console.log('Только что привязанные:', addedKeys);
      // console.log('Только что отвязанные:', removedKeys);

      const filteredAdd_prev = entToLink.filter((item) => !removedKeys.includes(item));
      const filteredRmv_prev = entToUnlink.filter((item) => !addedKeys.includes(item));

      setEntToLink(filteredAdd_prev.concat(addedKeys));
      setEntToUnlink(filteredRmv_prev.concat(removedKeys));
    
      // Здесь можно обновить состояние, если нужно
      setTargetKeys(newTargetKeys);
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
          locale={{ itemUnit: 'ед.', itemsUnit:'', searchPlaceholder: 'Поиск сущности', notFoundContent: <div>{(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}</div> }}
          listStyle={{
              
              height: 500,
          }}
          operations={[ 'Добавить', 'Удалить']}
          titles={['Сотрудники и группы без графика','Сущности с графиком']}
          targetKeys={targetKeys}
          onChange={handleChange}
          render={(item) => (
            <span className={'sk-flex-space'} title={item.description}>
              {item.title} {item.type === 2 ? (<Tag color="volcano">Group</Tag>) : (<Tag color="cyan">USER</Tag>)}
            </span>
          )}
          
          />
        </div>
      </Modal>
    )
};

export default SchedModalUsers;