import { Button, Card, Checkbox, Empty, Tag, Transfer, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./style/rulecard.css";
import {
    DownOutlined,
    EditOutlined,
    InboxOutlined,
    UpOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    UserSwitchOutlined
} from "@ant-design/icons";
import { ShortName } from "../../../components/Helpers/TextHelpers";
import RuleIcons from "./RuleIcons";
const { Text, Link } = Typography;

const RuleCardItem = (props)=>{
    const rule_id = props.data.id;
    const [opened, setOpened] = useState(false);
    const [editName, setEditName] = useState(false);

    const [name, setName] = useState('New item');
    const [entityList, setEntityList] = useState([]);
    const [userCount, setUserCount] = useState(props.data.user_count);
    const [groupCount, setGroupCount] = useState(props.data.group_count);
    const [ruleType, setRuleType] = useState(props.data.rule_type_id);
    const [ruleColor, setRuleColor] = useState(props.data.type_color);



    useEffect(()=>{
        setEntityList(props.base_entities);
    },[props.base_entities]);
    
    useEffect(()=>{
        setName(props.data.name);
        setRuleType(props.data.rule_type_id);
        setUserCount(props.data.user_count);
        setGroupCount(props.data.group_count);
    },[props.data]);

    useEffect(()=>{
      setOpened(props.opened);
     },[props.opened]);

    useEffect(()=>{
      getMock(); 

      }, [entityList]);

    const [mockData, setMockData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);



  const getMock = () => {
    let newMockData   = [];
    let newTargetKeys = [];
    let userco = 0;
    let groupco = 0;

    for (let i = 0; i < entityList.length; i++) {
        const element = entityList[i];
        if (element.id_company !== props.data.id_company){ continue;}
        let mockup = {};
        let key = element.type === 3 ? `user_${element.id}` : `group_${element.id}` ;

        let foundType = element.rule_links.find((el)=>el.type === ruleType);
      
        if (foundType && foundType.rule_id === rule_id){
            mockup.chosen = true;
            mockup.title =  element.type === 3 ? ShortName(element.surname, element.name, element.patronymic) : element.name;
            mockup.description = element.surname + " " + element.name + " " + element.patronymic;
            mockup.type = element.type;
            mockup.key = key;
            newMockData.push(mockup);
            newTargetKeys.push(key);
            if (element.type === 3){
              userco++;
            } else {
              groupco++;
            }
          } else if (foundType === null || foundType === undefined){
            mockup.chosen = false;
            mockup.type = element.type;
            mockup.title =  element.type === 3 ? ShortName(element.surname, element.name, element.patronymic) : element.name;
            mockup.description = element.surname + " " + element.name + " " + element.patronymic;
            mockup.key = key;
            newMockData.push(mockup);
            // userco++;
        };
    };
    setGroupCount(groupco);
    setMockData(newMockData);
    setTargetKeys(newTargetKeys);
    setUserCount(userco);

  };







  const handleChange = (newTargetKeys, direction, moveKeys) => {
    const addedKeys = direction === 'right' ? moveKeys : [];
    const removedKeys = direction === 'left' ? moveKeys : [];
  
    console.log('Только что привязанные:', addedKeys);
    console.log('Только что отвязанные:', removedKeys);
  
    // Здесь можно обновить состояние, если нужно
    setTargetKeys(newTargetKeys);


    if (props.on_manage_entities){
      props.on_manage_entities([rule_id, ruleType, 
        addedKeys.map((item) => {
          console.log(item);
          if (item.includes('group')){
            return {type: 2, entity_id: parseInt(item.replace('group_', ''))};
          } else if (item.includes('user'))
          {
            return {type: 3, entity_id: parseInt(item.replace('user_', ''))};
          }
      }),
      removedKeys.map((item)=>{
        if (item.includes('group')){
          return {type: 2, entity_id: parseInt(item.replace('group_', ''))};
        } else if (item.includes('user'))
        {
          return {type: 3, entity_id: parseInt(item.replace('user_', ''))};
        }
      })
      ]);
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
      props.on_open_editor(rule_id, event);
    }
  }

  const onDoubleClick = (event) =>{
    if (event.ctrlKey){
      if (props.on_open_editor){
        props.on_open_editor(rule_id);
      }
      setOpened(false);
    } else {
      if (!opened && props.on_open_cooxer){
          props.on_open_cooxer(props.data.id);
      }
    }
  }


  const localFilter = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
         option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };

    return (
        <Card className={`ant-card-small sk-rule-type-${ruleType}`} 
        onDoubleClick={onDoubleClick}
        style={{borderLeft: '6px solid '+ ruleColor}}
        > 
        <div className={`sk-rule-card ${opened ? "opened" : "cooxed"}`}
        >
            <div className={'sk-rule-card-head'}>
            <div>
                <span className={'sk-card-small-icon'}><RuleIcons type={ruleType}/></span>
                    </div>
                    <div>
                        {name}
                    </div>
                      <div className="sk-com-tag">
                          { props.user_data && props.user_data?.companies?.length > 1? (
                            <Tag title={rule_id} color={props.data.company_color} >{props.data.company_name.toUpperCase()}</Tag>
                          ) : (<span className={'sk-card-id-tag'}>{rule_id}</span>)
                          }
                      </div>
                    <div>
                    <Text type="secondary" className={'sk-flex'}>
                        <div title={'пользователей'}>{userCount} <UserOutlined /></div>
                        <div title={'групп'}>{groupCount} <InboxOutlined /></div>
                    </Text>
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
                              <UserSwitchOutlined />
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
                    locale={{ itemUnit: 'Сущностей.', itemsUnit:'', searchPlaceholder: 'Поиск сущности', 
                      notFoundContent: <div>{(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />)}</div> }}

                    listStyle={{
                        
                        height: 500,
                    }}
                    operations={[ 'Добавить', 'Удалить']}
                    titles={['Не связанные Юзеры/Группы','Юзеры/Группы связанные с правилом']}
                    targetKeys={targetKeys}
                    onChange={handleChange}
                    render={(item) => (
                      <span className={'sk-flex-space'} title={item.description}>
                        {item.title} {item.type === 2 ? (<Tag color="volcano">Group</Tag>) : (<Tag color="cyan">USER</Tag>)}
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

export default RuleCardItem;