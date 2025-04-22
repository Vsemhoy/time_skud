import React, { useEffect, useState } from "react";
import UserlistEventDumpCard from "./UserlistEventDumpCard";
import { Drawer, Tag } from "antd";

import dayjs from "dayjs";
import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";

const UserListSidebar = (props) => {

    const userdata = props.userdata;
    const [targetUserGuys, setTargetUserGuys] = useState([]);
    const [openUserInfo, setOpenUserInfo] = useState(false);
    const [targetUserInfo, setTargetUserInfo] = useState(null);
    
     const [badger, setBadger] = useState(null);

     

    useEffect(() => {
      setTargetUserGuys(props.target_user_guys);
    }, [props.target_user_guys])
    
    useEffect(() => {
        if (props.target_user_info){
            setTargetUserInfo(props.target_user_info);
            setBadger(USER_STATE_PLACES[props.target_user_info.current_state]);
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

    return (

        <Drawer title=<span className={'sk-flex-space'}>Информация о сотруднике  <Tag>{targetUserInfo?.user_id}</Tag></span>
        mask={false}
        onClose={()=>{handleClose()}} 
        open={openUserInfo}
        className={"sk-ant-no-padding"}
        style={{background: 'white'}}
        >
        {openUserInfo && (
          <div>
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
          <br />
          </div>
          

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
                  onClick={()=>{
                    setTargetUserInfo(props.base_user_list_data.find((user)=> user.user_id === item.user_id),
                    props.on_mark_user(item.user_id));}}
                  >{index + 1} - {item.user_surname} {item.user_name} {item.user_patronymic}</div>
                ))}

              </div>
            </>
          )}



          {badger && (
            <>
            <br />
            <div className="sk-w-padding-18">
            <div className="sk-state-intgra-card-backdrop">
            <div style={{background: badger.color + 99}}
            className="sk-state-intgra-card ">
              {badger.icon} {badger.title} 
            </div>
            </div>
            </div>
            </>
          )}


          {targetUserInfo && targetUserInfo.event_dump && targetUserInfo.event_dump.length ? (
            <UserlistEventDumpCard data={targetUserInfo.event_dump} />
          ) : ""}


          </div>
          )}
        </Drawer>
    )
}

export default UserListSidebar;