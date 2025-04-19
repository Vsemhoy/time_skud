import React, {useCallback, useEffect, useState } from "react";

import UserListToolbar from "./components/userlist/UserlistToolbar";
import { Affix, Drawer, Empty, Table } from "antd";
import '../../components/TimeSkud/Style/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS, DS_USERLIST_USERS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { ShortName } from "../../GlobalComponents/Helpers/TextHelpers";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import UserMonitorListCard from "./components/UserMonitorListCard";
import dayjs from "dayjs";
import { InfoOutlined, UserSwitchOutlined } from "@ant-design/icons";


const UserList = (props)=>{
  const { userdata } = props;
  const [ currentUserId, setCurrentUserId] = useState((userdata && userdata.user) ? userdata.user.id : null);

  const [baseUserListData, setBaseUserListData] = useState([]);
  const [userListData, setUserListData] = useState(baseUserListData.sort((a, b) => b.department - a.department));

  const [markedUsers, setMarkedUsers] = useState([]);

  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [targetUserInfo, setTargetUserInfo] = useState(null);

  const [departments, setDepartments]  = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy ] = useState(null);

  const openUserCard = (id) => {
    console.log('id' + ' => ' + id);
      setSelectedUserId(id); // Устанавливаем выбранный ID
      setIsModalVisible(true); // Открываем модальное окно
    };
      

    useEffect(()=>{
      setUserListData(baseUserListData.sort((a, b) => b.department - a.department));
    }, [baseUserListData])
  
  
    useEffect(() => {
      if (PRODMODE){
        get_departments();
        get_users();
      } else {
        setDepartments(DS_DEPARTMENTS);
        setBaseUserListData(DS_USERLIST_USERS);
      }
  
    },[])





    
  /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка отделов
     * @param {*} req 
     * @param {*} res 
     */
    const get_departments = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/departaments/departaments?_token=' + CSRF_TOKEN);
          console.log('departs', response);
          // setOrganizations(organizations_response.data.org_list)
          // setTotal(organizations_response.data.total_count)
          setDepartments(response.data.data);
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
      }
  }


      /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
      const get_users = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/users/users?_token=' + CSRF_TOKEN);
            console.log('users', response);
            setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }
  /** ------------------ FETCHES END ---------------- */




  const handleMarkUser = (user_id)=>{
    setMarkedUsers([user_id]);
    
    const elementdiv = document.querySelector('#row_' + user_id);
    if (elementdiv){
      elementdiv.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  const handleFindMe = ()=>{
    const elementdiv = document.querySelector('#row_' + userdata.user.id);
    if (elementdiv){
      elementdiv.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }


  const SortFilterChanged = (userList) => {
    setUserListData(userList);
  }

  const handleShowUserInfo = (user_id)=>{
    console.log('user_id', user_id)
    setOpenUserInfo(true);
    setTargetUserInfo(baseUserListData.find((item)=> item.user_id === user_id));
  }


  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      //Do whatever when esc is pressed
      if (openUserInfo){
        setOpenUserInfo(false);
      } else if (markedUsers.length > 0){
        setMarkedUsers([]);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

    return (
        <div>
            <br/>
            <UserListToolbar
              // onSortBy={sortUserList}
              departments={departments}
              baseUsers={baseUserListData}
              onChange={SortFilterChanged}
              userData={userdata}
              on_find_me={handleFindMe}
            />
            
            {/* <Table 
            sticky={true}
            dataSource={userListData}
            columns={columns}
            rowClassName={rowClassName}
            pagination={false}
            className={'sk-flight-table'}
             /> */}

        <div className={'sk-arche-stack'} style={{paddingBottom: '50vh'}}>
              {userListData.length == 0 ? (
                  <Empty />
              ):(
                  <>
                  <Affix offsetTop={0}>
                  <div className={`sk-usermonic-cardrow sk-usermonic-headerrow`}>
                      <div>id</div>
                      <div>Имя сотрудника</div>
                      <div>тел</div>
                      <div className="sk-flex-space">
                        <div></div>
                        <div className="sk-usermonic-micro-row">
                          <div>Вход</div>
                          <div>Выход</div>
                          <div>Рв</div>
                          <div>Ов</div>
                          <div>От</div>
                          <div>Пв</div>
                        </div>
                        <div></div>
                      </div>
                      <div>Оп.</div>
                      <div>Рук</div>
                      <div>Место</div>
                  </div>
                  </Affix>
                      {userListData.map((arche)=>(
                          <UserMonitorListCard
                              data={arche}
                              on_mark_user={handleMarkUser}
                              marked_users={markedUsers}
                              its_me={userdata.user.id == arche.user_id}
                              on_double_click={handleShowUserInfo}
                          />
                      ))}
                  </>

              )}
          </div>

            
            <UserModal
            userId={selectedUserId} 
            visible={isModalVisible} 
            onClose={() => setIsModalVisible(false)} 
            />
            {/* // if sortBy == undefined || null || department_desc - insert custom row with depart name before show belongs rows */}


            <Drawer title="Информация о сотруднике" 
            mask={false}
            onClose={()=>{setOpenUserInfo(false)}} open={openUserInfo}>
            {openUserInfo && (
              <div>
              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Должность</div>
                <div className={'sk-contend-um'}>{targetUserInfo.user_occupy}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Отдел</div>
                <div className={'sk-contend-um'}>{targetUserInfo.department_name}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Имя</div>
                <div className={'sk-contend-um'}>{targetUserInfo.user_name}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Фамилия</div>
                <div className={'sk-contend-um'}>{targetUserInfo.user_surname}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Отчество</div>
                <div className={'sk-contend-um'}>{targetUserInfo.user_patronymic}</div>
              </div>


              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Внутренний телефон</div>
                <div className={'sk-contend-um'}>{targetUserInfo.phone && targetUserInfo.phone != 0 ? targetUserInfo.phone : "нет"}</div>
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
              <br />
              
              {targetUserInfo.boss_id && targetUserInfo.boss_id !== 0 && targetUserInfo.user_id != 46 ? (
                <div className="sk-boss-wrapper-sf">
                  <div style={{fontSize: 'large',
                    fontSize: 'initial', fontWeight:'bolder',
                    borderBottom: '1px solid gray'
                  }}><span>Руководитель</span> <span
                    onClick={()=>{setTargetUserInfo(baseUserListData.find((item)=> item.user_id === targetUserInfo.boss_id));}}
                  ><UserSwitchOutlined /></span></div>
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



              </div>
              )}
            </Drawer>

        </div>
    )
}


export default UserList;