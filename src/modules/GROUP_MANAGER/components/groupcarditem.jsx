import { Button, Card, Checkbox, Empty, Tag, Transfer } from "antd";
import React, { useEffect, useState } from "react";
import "./style/groupcard.css";
import { DownOutlined, EditOutlined, UpOutlined } from "@ant-design/icons";
import { ShortName } from "../../../GlobalComponents/Helpers/TextHelpers";

const GroupCardItem = (props)=>{
    const group_id = props.data.id;
    const [opened, setOpened] = useState(false);
    const [editName, setEditName] = useState(false);

    const [name, setName] = useState('New item');
    const [userList, setUserList] = useState([]);
    const [userCount, setUserCount] = useState(0);


    useEffect(()=>{
        setUserList(props.base_users);
    },[props.base_users]);
    
    useEffect(()=>{
        setName(props.data.name);
    },[props.data]);

    useEffect(()=>{
      setOpened(props.opened);
     },[props.opened]);

    useEffect(()=>{
      getMock(); 

      }, [userList]);

    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);



  const getMock = () => {
    let newMockData   = [];
    let newTargetKeys = [];
    let userco = 0;

    for (let i = 0; i < userList.length; i++) {
      const element = userList[i];
      if (element.id_company !== props.data.id_company){ continue;}
        let mockup = {};
        let key = `mocky_${element.id}`;
        if (element.user_group_id === group_id){
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




  // const handleChange = (newTargetKeys) => {
  //   // требо выявить кто из них изменил состояние
  //   let linked = [];
  //   let unlinked = [];

  //   let a  = Array.divv


  //   console.log('new', newTargetKeys)
  //   setTargetKeys(newTargetKeys);
  // };

  const handleChange = (newTargetKeys, direction, moveKeys) => {
    const addedKeys = direction === 'right' ? moveKeys : [];
    const removedKeys = direction === 'left' ? moveKeys : [];
  
    console.log('Только что привязанные:', addedKeys);
    console.log('Только что отвязанные:', removedKeys);
  
    // Здесь можно обновить состояние, если нужно
    setTargetKeys(newTargetKeys);
    if (props.on_link_update){
      props.on_link_update(group_id,
         addedKeys.map((item)=>{
        return parseInt(item.replace('mocky_', ''));
      }), 
      removedKeys.map((item)=>{
        return parseInt(item.replace('mocky_', ''));
      }));
    }
  };
  




  const onOpenCooxer = (event) => {
    if (event.target.closest('.ant-transfer')){ return; };
    console.log('open cooxer')
    if (!opened && props.on_open_cooxer){
        props.on_open_cooxer(props.data.id);
    }
    setOpened(!opened);
  }

  
  const onOpenModalEditor = (event) => {
    console.log('open modal')
    event.preventDefault();
    if (props.on_open_editor){
      props.on_open_editor(group_id, event);
    }
  }

  const localFilter = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
         option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };

    return (
        <Card className={"ant-card-small"} 
        onDoubleClick={onOpenCooxer}
        > 
        <div className={`sk-group-card ${opened ? "opened" : "cooxed"}`}
        >
            <div className={'sk-grp-card-head'}>
            <div>
                <span className={'sk-card-id-tag'}>{group_id}</span>
                    </div>
                    <div>
                        {name}
                    </div>
                    <div>
                      {userCount > 0 ? (

                      <Tag color="blue">{userCount}</Tag>
                      ) : (

                      <Tag color="default">{userCount}</Tag>
                      )}

                    </div>
                    <div>
                        <div className={'sk-card-call-to-modal'}
                          onClick={onOpenModalEditor}
                        >
                          <EditOutlined />
                        </div>
                    </div>
                    <div>
                        <div className={'sk-card-cooxer'}
                            onClick={onOpenCooxer}
                        >
                            <div className={'sk-card-cooxer-cooxed'}>
                                <DownOutlined />
                            </div>
                            <div className={'sk-card-cooxer-opened'}>
                                <UpOutlined />
                            </div>
                        </div>
                        
                    </div>
            </div>
            <div className={'sk-grp-card-body'}>
                <div className={'sk-grp-user-items-stack'}>
                  {opened ? (
                    <Transfer
                    dataSource={mockData}
                    showSearch
                    filterOption={localFilter}
                    showSelectAll={false}
                    locale={{ itemUnit: 'Чел.', itemsUnit:'', searchPlaceholder: 'Поиск сотрудника', notFoundContent: <div>{(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}</div> }}

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
                  ) : ""}  


                </div>
            </div>
        </div>
            </Card>
    )

}

export default GroupCardItem;