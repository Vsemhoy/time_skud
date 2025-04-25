import React, { useEffect, useState } from "react";
import UserlistEventDumpCard from "./UserlistEventDumpCard";
import { Drawer, Empty, Tag } from "antd";

import dayjs from "dayjs";
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";
import { CSRF_TOKEN, PRODMODE } from "../../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../../API/API";
import { LIST_SCHED_N_RULES_RESPONSE } from "../../../CONFIG/DEFAULTSTATE";
import UmScheduleMiniCard from "./UmScheduleMiniCard";
import { DownOutlined, UpOutlined,
  BarChartOutlined,  IssuesCloseOutlined, RobotOutlined,
  MinusCircleOutlined,
  AppleOutlined,
  RestOutlined,
  CheckOutlined,
  SafetyCertificateOutlined,
  MedicineBoxOutlined,
  RocketOutlined,
  CarOutlined,
  MoonOutlined,
  SmileOutlined,
  DollarOutlined,
  HeatMapOutlined
} from "@ant-design/icons";

const iconMap = {
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined
  };

const DynamicIcon = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
  };



const UserListSidebar = (props) => {

    const userdata = props.userdata;
    const [targetUserGuys, setTargetUserGuys] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [targetUserInfo, setTargetUserInfo] = useState(null);
    
    const [badger, setBadger] = useState(null);

    const [baseSchedules, setBaseSchedules] = useState([]);
    const [baseRules, setBaseRules] = useState([]);
     
    const [targetDate, setTargetDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

    const [openStateInfoSection, setOpenStateInfoSection] = useState(false);

    useEffect(() => {
      setTargetUserGuys(props.target_user_guys);
    }, [props.target_user_guys])
    
    useEffect(() => {
        if (props.target_user_info){
            setTargetUserInfo(props.target_user_info);

            if (props.target_user_info.current_state != 0)
              {
                  setBadger({ title: props.target_user_info.state_text, text: props.target_user_info.state_title, color: props.target_user_info.state_color, icon: <DynamicIcon iconName={props.target_user_info.state_icon} />});
              } else {
                  setBadger(USER_STATE_PLACES[0]);
              }

            if (PRODMODE){
              let data = {
                date: props.target_date, 
                user_id: props.target_user_info.user_id,
              };
              get_user_schedule_and_rules(data);
            }
            else {
              setBaseSchedules(LIST_SCHED_N_RULES_RESPONSE.schedules);
              setBaseRules(LIST_SCHED_N_RULES_RESPONSE.rules);
            }
        }
    }, [props.target_user_info])

    useEffect(() => {   
      setOpenUserInfo(props.open_user_info);

      console.log('HANDLE OPEN', props.open_user_info);
    }, [props.open_user_info])


    const handleClose = () =>{
        if (props.on_close){
            console.log('HANDLE CLOSE');
            props.on_close(false);
        } else {
            setOpenUserInfo(false)
        }
    }

    const capitalize = (s) =>
    {
        if (s.length > 2){
            return String(s[0]).toUpperCase() + String(s).slice(1);
        } else {
            return s;
        }
    }



    
  /** ------------------ FETCHES ---------------- */


      /**
       * Получение актуального на выбранную дату графика и правил для этого юзера
       * @param {*} req 
       * @param {*} res 
       */
      const get_user_schedule_and_rules = async (data, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/userlist/getuserschedrules', 
                {
                    data: data,
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                  setBaseSchedules(response.data.content.schedules);
                  setBaseRules(response.data.content.rules);
                }
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }
  

    /** ------------------ FETCHES END ---------------- */



        useEffect(()=>{
          console.log(props.target_date);
          if (props.open_user_info){
            setTargetDate(props.target_date);
          }
        },[props.target_date]);



    return (

        <Drawer title=<span className={'sk-flex-space'}>Информация о сотруднике  <Tag>{targetUserInfo?.user_id}</Tag></span>
        mask={false}
        onClose={()=>{handleClose()}} 
        open={openUserInfo}
        className={"sk-ant-no-padding sk-drawer-transparent"}
        style={{background: 'white'}}
        >
        {openUserInfo && (
          <div>

          {badger && (
            <>
            
            <div className="">
            <div className="sk-state-intgra-card-backdrop">
            <div style={{background: badger.color + 99}}
            className="sk-state-intgra-card ">
              <span style={{textAlign: 'center' , paddingLeft: '4px'}}>{badger.icon}</span> <span>{badger.title}</span> 
              <div onClick={()=>{setOpenStateInfoSection(!openStateInfoSection)}}>
                  {openStateInfoSection ? (
                    <span><UpOutlined /></span>
                  ) : (
                    <span><DownOutlined /></span>
                  )}
                </div>
            </div>
            </div>
            {openStateInfoSection ? (
              <div>
              {targetUserInfo && targetUserInfo.event_dump && targetUserInfo.event_dump.length ? (
                <UserlistEventDumpCard data={targetUserInfo.event_dump} />
              ) : (<div style={{padding: '18px'}}>...</div>)}
              </div>
            ) : ("")}
            <br />
            </div>
            </>
          )}

          <div className="sk-w-padding-18">
          <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Должность</div>
            <div className={'sk-contend-um'}>{targetUserInfo.user_occupy ? capitalize(targetUserInfo.user_occupy) : '-'}</div>
          </div>

          <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Отдел</div>
            <div className={'sk-contend-um'}>{targetUserInfo.department_name ? targetUserInfo.department_name : '-'}</div>
          </div>

          {/* <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Фамилия</div>
            <div className={'sk-contend-um'}>{targetUserInfo.user_surname ? targetUserInfo.user_surname : '-'}</div>
          </div>

          <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Имя</div>
            <div className={'sk-contend-um'}>{targetUserInfo.user_name ? targetUserInfo.user_name : '-'}</div>
          </div>

          <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Отчество</div>
            <div className={'sk-contend-um'}>{targetUserInfo.user_patronymic ? targetUserInfo.user_patronymic : '-'}</div>
          </div> */}

          <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Фамилия Имя Отчество</div>
            <div className={'sk-contend-um'}>{targetUserInfo.user_surname ? targetUserInfo.user_surname : ''}  {targetUserInfo.user_name ? targetUserInfo.user_name : ''}  {targetUserInfo.user_patronymic ? targetUserInfo.user_patronymic : ''} 
            </div>
          </div>


          <div className={'sk-usermonic-drawer-row'}>
            <div className={'sk-labed-um'}>Внутренний телефон</div>
            <div className={'sk-contend-um'}>{targetUserInfo.phone && targetUserInfo.phone != 0 ? targetUserInfo.phone : "-"}</div>
          </div>

          {targetUserInfo.recrut && targetUserInfo.user_id === 483 ? (
            <div className={'sk-usermonic-drawer-row'}>
              <div className={'sk-labed-um'}>Работает с</div>
              <div className={'sk-contend-um'}>{targetUserInfo.recrut ? dayjs.unix(targetUserInfo.recrut).format("DD-MM-YYYY") : ""}</div>
            </div>
          ): ""}


          {targetUserInfo.email && targetUserInfo.email != 0 && (
            <div className={'sk-usermonic-drawer-row'}>
              <div className={'sk-labed-um'}>E-mail</div>
              <div className={'sk-contend-um'}>{targetUserInfo.email}</div>
            </div>
          )}

          {targetUserInfo.id_company && targetUserInfo.id_company > 1 && (
            <div className={'sk-usermonic-drawer-row'}>
              <div className={'sk-labed-um'}>Компания</div>
              <div className={'sk-contend-um'}>
                <span className={'sk-usermonic-comround'}
                style={{background: `${userdata.companies.find((item)=> item.id === targetUserInfo.id_company)?.color}`
                }}>
                  {targetUserInfo.id_company}
                </span>
              {userdata.companies.find((item)=> item.id === targetUserInfo.id_company)?.name}</div>
            </div>
          )}
          
          </div>
          

          {baseSchedules && baseSchedules.length > 0 && (
            <div>
              {baseSchedules.map((item, index)=> (
                <UmScheduleMiniCard 
                  data={item}
                  key={`umscard_${item.id}`}
                  />
              ))}
              <br />
              <br />
            </div>
          )}


          {targetUserInfo.boss_id && targetUserInfo.boss_id !== 0 && targetUserInfo.user_id != 46 ? (
            <div className="sk-boss-wrapper-sf sk-w-padding-18">  
              <div style={{fontSize: 'large',
                fontSize: 'initial', fontWeight:'bolder',
                borderBottom: '1px solid gray'
              }}><span
                onClick={()=>{
                  setTargetUserInfo(props.base_user_list_data.find((item)=> item.user_id === targetUserInfo.boss_id),
                  props.on_mark_user(targetUserInfo.boss_id));}}
                className={'sk-usermonic-drawer-rukop-title'}
              >Руководитель</span> <span
              ></span></div>
              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Должность</div>
                <div className={'sk-contend-um'}>{targetUserInfo.boss_occupy}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Фио</div>
                <div className={'sk-contend-um'}>{targetUserInfo.boss_surname} {targetUserInfo.boss_name} {targetUserInfo.boss_patronymic}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Внутренний телефон</div>
                <div className={'sk-contend-um'}>{targetUserInfo.boss_phone}</div>
              </div>
            </div>

          ): ""}

          
          
          {targetUserGuys && targetUserGuys.length > 0 && (
            <>
            <br />
              <div className="sk-boss-wrapper-sf sk-w-padding-18">
                <div style={{fontSize: 'large',
                      fontSize: 'initial', fontWeight:'bolder',
                      borderBottom: '1px solid gray'
                    }}><span>Сотрудники</span></div>
                { targetUserGuys.map((item, index)=>(
                  <div className={'sk-boss-guy-card'}
                  key={`taurkey_${index}`}
                  onClick={()=>{
                    setTargetUserInfo(props.base_user_list_data.find((user)=> user.user_id === item.user_id),
                    props.on_mark_user(item.user_id));}}
                  >{index + 1} - {item.user_surname} {item.user_name} {item.user_patronymic}</div>
                ))}

              </div>
            </>
          )}





        


          </div>
          )}
        </Drawer>
    )
}

export default UserListSidebar;