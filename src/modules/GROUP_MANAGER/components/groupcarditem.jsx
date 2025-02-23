import { Badge, Button, Card, Checkbox, Dropdown, Empty, Tag, Transfer } from "antd";
import React, { useEffect, useState } from "react";
import "./style/groupcard.css";
import { ArrowRightOutlined, BorderBottomOutlined, ClockCircleOutlined, DownOutlined, EditOutlined, UpOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { generateGradientBackground, ShortName } from "../../../GlobalComponents/Helpers/TextHelpers";

const GroupCardItem = (props)=>{
    const group_id = props.data.id;
    const [opened, setOpened] = useState(false);
    const [editName, setEditName] = useState(false);

    const [name, setName] = useState('New item');
    const [userList, setUserList] = useState([]);
    const [userCount, setUserCount] = useState(0);


    const [ruleColors, setRuleColors] = useState(["#ff000069", "#ff91004b", "#7c550069","#00a2ff69","#00f5ab69"]);

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


  const setOpenUserModal = () => {
    if (props.open_user_modal)
    {
      props.open_user_modal();
    }
  }

  const setOpenScheduleModal = () => {
    if (props.open_schedule_modal)
      {
        props.open_schedule_modal();
      }
  }

  const setOpenRuleModal = () => {
    if (props.open_rule_modal)
      {
        props.open_rule_modal();
      }
  }


  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

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
  

  const onDoubleClick = (event) =>{
    if (event.ctrlKey){
      if (props.on_open_editor){
        props.on_open_editor(group_id);
      }
      // setOpened(false);
    } else {
      if (!opened && props.on_open_cooxer){
          props.on_open_cooxer(props.data.id);
      }
    }
  }


  const onOpenCooxer = (event) => {
    if (event.target.closest('.ant-transfer')){ return; };
      if (!opened && props.on_open_cooxer){
          props.on_open_cooxer(props.data.id);
      }
  }

  
  const onOpenModalEditor = (event) => {
    console.log('open modal')
    event.preventDefault();
    if (props.on_open_editor){
      props.on_open_editor(group_id, event);
    }
  }

  const onOpenModalUserEditor = (event) => {
    console.log('open modal')
    event.preventDefault();
    if (props.open_user_modal){
      props.open_user_modal(group_id);
    }
  }

  const localFilter = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
         option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };

    return (
        <Card className={"ant-card-small"} 
        onDoubleClick={onDoubleClick}
        > 
        <div className={`sk-group-card ${opened ? "opened" : "cooxed"}`}
        >
            <div className={'sk-grp-card-head'}>
            <div className="sk-com-tag">
                { props.user_data && props.user_data.companies.length > 1? (
                  <Tag title={group_id} color={props.data.company_color} >{props.data.company_name.toUpperCase()}</Tag>
                ) : (<span className={'sk-card-id-tag'}>{group_id}</span>)
                }
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
                    <Badge  size="small" count={userCount}>


                        <div className={'sk-card-call-to-modal'}
                          onClick={onOpenModalUserEditor}
                        >
                          <UserSwitchOutlined />
                        </div>
                        </Badge>
                    </div>
                    {/* <div>
                        <div className={'sk-card-cooxer'}
                            onClick={onOpenCooxer}
                        >
                            <div className={'sk-card-cooxer-cooxed'}>
                              <UserSwitchOutlined />
                            </div>
                            <div className={'sk-card-cooxer-opened'}>
                                <UpOutlined />
                            </div>
                        </div>
                        
                    </div> */}
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

            <div className={'sk-card-body sk-flex-space'}>
              <div>
                <div className={'sk-padding-bottom-6'}>
                    <Button  color="default" variant="filled"
                      onClick={setOpenScheduleModal}
                    >Нет графика...</Button>
                    <Badge  size="small" count={userCount}>
                    <Button color="secondary"
                      // style={{backgroundColor: "#FFFF99"}}
                      onClick={setOpenScheduleModal}
                    >Графи такой-то молавао аывфоа ао ова офвоафо автоматически</Button>
                    </Badge>
                    {/* <span> <ArrowRightOutlined /> </span>
                    <div
                      style={{backgroundColor: "#FFFF99", display: 'contents'}}
                    >
                    <Button
                    onClick={setOpenScheduleModal}
                      style={{backgroundColor: "#FFFF99"}}
                      className={"sk-await-gradient"}
                      icon={<ClockCircleOutlined />}
                    >Следующий графк времениа периода времени ыав выявить</Button>
                    </div> */}
                </div>

                <div  className={'sk-padding-bottom-6'}>
                  <Button 
                    onClick={setOpenRuleModal}
                  color="default" variant="filled">Нет правил...</Button>
                  <Badge  size="small" count={userCount}>
                  <Dropdown
                    menu={{items
                      
                    }}
                    placement="bottomLeft"
                    arrow
                  >
                    <Button 
                      onClick={setOpenRuleModal}
                    style={{ background: generateGradientBackground(ruleColors)}} >bottomLeft</Button>
                  </Dropdown>
                  <Dropdown.Button
                      icon={<DownOutlined />}
                      // loading={loadings[1]}
                      menu={{ items }}
                      // onClick={() => enterLoading(1)}
                    >
                      Submit
                    </Dropdown.Button>
                    </Badge>
                  {/* <span> <ArrowRightOutlined /> </span>
                    <div
                      style={{backgroundColor: "#FFFF99", display: 'contents'}}
                    >
                    </div> */}
                    
                </div>

              </div>
              <div>
                second col
              </div>
            
            </div>
        </div>
            </Card>
    )

}

export default GroupCardItem;


const GradientDiv = ({ colors }) => {
  const backgroundStyle = generateGradientBackground(colors);

  return (
      <div style={{ background: backgroundStyle, display: "inline-block", fontSize: 13, fontWeight: 500, padding: 3, borderRadius: 4 }}>
          {/* Ваш контент */}
          <span>Правила...</span>
      </div>
  );
};