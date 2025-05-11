import React, { useState, useEffect } from 'react';
import { Button, Empty, Flex, Modal, Transfer } from 'antd';
import { generateGradientBackground, ShortName } from "../../../components/Helpers/TextHelpers";

const UserManagerModal= (props) => {
    const [open, setOpen] = useState(false);
    const [group_id, setGroup_id] = useState(null);

;
    const [name, setName] = useState('New item');
    const [userList, setUserList] = useState([]);
    const [userCount, setUserCount] = useState(0);

    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);

    useEffect(()=>{
        if (props.on_open){
            setOpen(true);  
            console.log(props);
        }
    },[props.on_open]);

    const onCloseAction = ()=>{
        setOpen(false)
        if (props.on_close){
            props.on_close();
        }
        setOpen(false);
    }

    useEffect(()=>{
      if (props.data !== null){
        setUserList(props.base_users);
        setGroup_id(props.target_id);
      }
  },[props.base_users, props.data, props.target_id]);



  useEffect(()=>{
    if (props.data){

      getMock(); 
    }
  }, [userList, group_id]);

  const getMock = () => {

    let newMockData   = [];
    let newTargetKeys = [];
    let userco = 0;

    console.log('userlist', userList);
    console.log('GRP ID ' ,group_id);
    console.log('props.data.id_company', props.data.id_company)

    for (let i = 0; i < userList.length; i++) {
      const element = userList[i];
      if (element.id_company !== props.data.id_company){ continue;}
        let mockup = {};
        let key = `mocky_${element.id}_${group_id}`;
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

  const localFilter = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
         option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };

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

  return (
    <Flex vertical gap="middle" align="flex-start">
      {/* Basic */}


      <Modal
        title="Менеджер пользователей"
        centered
        open={open}
        cancelText={''}
        footer={<Button onClick={onCloseAction}>Ok</Button>}
        onCancel={onCloseAction}
        width={{
          xs: '98%',
          sm: '90%',
          md: '90%',
          lg: '80%',
          xl: '70%',
          xxl: '60%',
        }}
      >
        <div className={'sk-grp-card-body'}>
          <div className={'sk-grp-user-items-stack'}>
            {open ? (
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
      </Modal>
    </Flex>
  );
};

export default UserManagerModal;