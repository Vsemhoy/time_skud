import { Badge, Button, Card, Checkbox, Dropdown, Empty, Tag, Transfer } from "antd";
import React, { useEffect, useState } from "react";
import "./style/groupcarditem.css";
import { ArrowDownOutlined, ArrowRightOutlined, BorderBottomOutlined, ClockCircleOutlined, DownOutlined, EditOutlined, PlusCircleOutlined, PlusOutlined, UpOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { generateGradientBackground, ShortName } from "../../../GlobalComponents/Helpers/TextHelpers";
import dayjs from "dayjs";

// import SchedStdSVG from "../../../media/schedule-std.svg";
// import SchedFlexSVG from "../../../media/schedule-flex.svg";
// import SchedFreeSVG from "../../../media/schedule-free.svg";
// import SchedShiftSVG from "../../../media/schedule-shift.svg";
// import SchedSumSVG from "../../../media/schedule-sum.svg";
// import SchedEmptySVG from "../../../media/schedule-empty.svg";
// import { HOST_COMPONENT_ROOT } from "../../../CONFIG/config";
// import RuleIcons from "../../RULE_MANAGER/components/RuleIcons";



 

const FDATE = (timestamp) => {
    return dayjs.unix(timestamp).format('DD-MM-YYYY')
};
const FTIME = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


// const Sched_type_icon = (type) => {
//     console.log(type);
//     switch (type.children) {
//         case 1:
//             return ( <img src={HOST_COMPONENT_ROOT + SchedStdSVG} title='Пятидневка график'/>);
//         break;
//         case 2:
//             return (<img src={HOST_COMPONENT_ROOT + SchedFlexSVG}  title='Гибкий график'/>);
//         break;
//         case 3:
//             return (<img src={HOST_COMPONENT_ROOT + SchedFreeSVG}  title='Свободный график'/>);
//         break;
//         case 4:
//             return (<img  src={HOST_COMPONENT_ROOT + SchedShiftSVG} title='Сменный график'/>);
//         break;
//         case 5:
//             return (<img src={HOST_COMPONENT_ROOT + SchedSumSVG}    title='Суммированный график'/>);
//         break;
//         default:

//         return (<img src={HOST_COMPONENT_ROOT + SchedEmptySVG}    title='Нет графика'/>);
//     }
// }

const GroupCardItem = (props)=>{
    const group_id = props.data.id;
    const [opened, setOpened] = useState(false);
    const [editName, setEditName] = useState(false);

    const [name, setName] = useState('New item');
    const [userList, setUserList] = useState([]);
    const [userCount, setUserCount] = useState(0);

    const [itemData, setItemData] = useState({});
    const [totalInQueue, setTotalInQueue] = useState(0);

    const [ruleColors, setRuleColors] = useState(["#ff000069", "#ff91004b", "#7c550069","#00a2ff69","#00f5ab69"]);



    useEffect(()=>{
        setUserList(props.base_users);
    },[props.base_users]);
    
    useEffect(()=>{
        setName(props.data.name);
        setItemData(props.data);
    },[props.data]);

    useEffect(()=>{
      setOpened(props.opened);
     },[props.opened]);

  //   useEffect(()=>{
  //     getMock(); 
  //     }, [userList]);

  //   const [mockData, setMockData] = useState([]);
  //   const [targetKeys, setTargetKeys] = useState([]);



  // const getMock = () => {
  //   let newMockData   = [];
  //   let newTargetKeys = [];
  //   let userco = 0;

  //   for (let i = 0; i < userList.length; i++) {
  //     const element = userList[i];
  //     if (element.id_company !== props.data.id_company){ continue;}
  //       let mockup = {};
  //       let key = `mocky_${element.id}`;
  //       if (element.user_group_id === group_id){
  //           mockup.chosen = true;
  //           mockup.title = ShortName(element.surname, element.name, element.patronymic);
  //           mockup.description = element.surname + " " + element.name + " " + element.patronymic;
  //           mockup.key = key;
  //           newMockData.push(mockup);
  //           newTargetKeys.push(key);
  //           userco++;
  //         } else if (element.user_group_id === 0){
  //           mockup.chosen = false;
  //           mockup.title =  ShortName(element.surname, element.name, element.patronymic);
  //           mockup.description = element.surname + " " + element.name + " " + element.patronymic;
  //           mockup.key = key;
  //           newMockData.push(mockup);
  //           // userco++;
  //       };
  //   };
  //   setMockData(newMockData);
  //   setTargetKeys(newTargetKeys);
  //   setUserCount(userco);
  // };


  const setOpenUserModal = () => {
    if (props.open_user_modal)
    {
      props.open_user_modal(group_id);
    }
  }

  const setOpenScheduleModal = () => {
    if (props.open_schedule_modal)
      {
        props.open_schedule_modal(group_id);
      }
  }

  const setOpenRuleModal = () => {
    if (props.open_rule_modal)
      {
        props.open_rule_modal(group_id);
      }
  }



  // const handleChange = (newTargetKeys) => {
  //   // требо выявить кто из них изменил состояние
  //   let linked = [];
  //   let unlinked = [];

  //   let a  = Array.divv


  //   setTargetKeys(newTargetKeys);
  // };

  // const handleChange = (newTargetKeys, direction, moveKeys) => {
  //   const addedKeys = direction === 'right' ? moveKeys : [];
  //   const removedKeys = direction === 'left' ? moveKeys : [];
  
  //   console.log('Только что привязанные:', addedKeys);
  //   console.log('Только что отвязанные:', removedKeys);
  
  //   // Здесь можно обновить состояние, если нужно
  //   setTargetKeys(newTargetKeys);
  //   if (props.on_link_update){
  //     props.on_link_update(group_id,
  //        addedKeys.map((item)=>{
  //       return parseInt(item.replace('mocky_', ''));
  //     }), 
  //     removedKeys.map((item)=>{
  //       return parseInt(item.replace('mocky_', ''));
  //     }));
  //   }
  // };
  

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


  // const onOpenCooxer = (event) => {
  //   if (event.target.closest('.ant-transfer')){ return; };
  //     if (!opened && props.on_open_cooxer){
  //         props.on_open_cooxer(props.data.id);
  //     }
  // }

  
  const onOpenModalEditor = (event) => {
    event.preventDefault();
    if (props.on_open_editor){
      props.on_open_editor(group_id, event);
    }
  }

  const onOpenModalUserEditor = (event) => {
    event.preventDefault();
    if (props.open_user_modal){
      props.open_user_modal(group_id);
    }
  }

  // const dblClickOnSchedule = (event) => {
  //   event.preventDefault();
  //   if (props.open_schedule_modal)
  //     {
  //       props.open_schedule_modal(group_id);
  //     }
  //   }

  // const dblClickOnRule = (event) => {
  //   event.preventDefault();
  //       if (props.open_rule_modal)
  //     {
  //       props.open_rule_modal(group_id);
  //     }
  // }


  console.log('props.data', props.data)

  const localFilter = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1 ||
         option.description.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };

    return (
        
        <div className={"sk-group-list-row"}>
          {itemData.id ? (
        <div className={`sk-group-card ${opened ? "opened" : "cooxed"}`}
        >
            <div className={'sk-row sk-first-row-4group'}>
              <div>
                {itemData.id}
              </div>
                <div>
                    <div className={'sk-schedule-list-title'}>
                        {name} 
                    </div>

                </div>
                <div>
                  <UserOutlined /> {userCount}
                </div>
                <div>
                <div className={'sk-company-tag'} style={{border: `1px solid ${props.data.company_color}`, color: `${props.data.company_color}`}}>
                        {props.data.company_name}
                    </div>
                </div>
                   <div onClick={onOpenModalEditor}>
                        <div className={'sk-card-call-to-modal'}
                        >
                          <EditOutlined />
                        </div>
                    </div>
            </div>

            { false && (

              <div className={'sk-row sk-row sk-second-row sk-second-row-group'}>
                <div className={'sk-flex'} style={{paddingLeft: 12}}>
                  <div className="sk-com-tag">
                    { props.user_data && props.user_data.companies.length > 1? (
                      <Tag title={group_id} color={props.data.company_color} >{props.data.company_name.toUpperCase()}</Tag>
                    ) : (<span className={'sk-card-id-tag'}>{group_id}</span>)
                    }
                  </div>
                </div>

                <div>

                </div>
                <div className={'sk-flex sk-groupcard-foot-triggs'} >
                  {/* <div>
                        {userCount > 0 ? (

                        <Tag color="blue">{userCount}</Tag>
                        ) : (

                        <Tag color="default">{userCount}</Tag>
                        )}

                      </div> */}
  
                      <div onClick={onOpenModalUserEditor}>
                      <Badge  size="small" count={userCount}>
                          <div className={'sk-card-call-to-modal'}
                          >
                            <UserSwitchOutlined />
                          </div>
                          </Badge>
                      </div>
                </div>
              
              </div>
            )}


        </div>
             ):""}
        </div>
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

// let arr = [
//   ["manOp","Установка курса валюты","4","Редактирование валют","0"],
//   ["manOp","Менеджер отдела продаж","4","Менеджер отд. продаж","0"],
//   ["rukOp","Руководитель отдела продаж","4","Руководитель отд. продаж","0"],
//   ["freeCoNotake","Запрещено брать кураторство","13","Запрет кураторства","0"],
//   ["freeCoApprove","Требуется подтверждение взятия кураторства","13","Подтверждение кураторства","0"],
//   ["freeCoShow","Показывать свободных клиентов","13","Карточки свободных клиентов","0"],
// ]