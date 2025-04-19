import React, {useCallback, useEffect, useState } from "react";

import UserListToolbar from "./components/userlist/UserlistToolbar";
import { Affix, Badge, Drawer, Empty, Table, Tag } from "antd";
import '../../components/TimeSkud/Style/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS, DS_USERLIST_USERS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { ShortName } from "../../GlobalComponents/Helpers/TextHelpers";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import UserMonitorListCard from "./components/UserMonitorListCard";
import dayjs from "dayjs";
import { FileUnknownOutlined, InfoOutlined, UserSwitchOutlined } from "@ant-design/icons";


const UserList = (props)=>{
  const { userdata } = props;
  const [ currentUserId, setCurrentUserId] = useState((userdata && userdata.user) ? userdata.user.id : null);

  const [baseUserListData, setBaseUserListData] = useState([]);
  const [userListData, setUserListData] = useState(baseUserListData.sort((a, b) => b.department - a.department));

  const [markedUsers, setMarkedUsers] = useState([]);

  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [targetUserInfo, setTargetUserInfo] = useState(null);
  const [targetUserGuys, setTargetUserGuys] = useState([]);

  const [departments, setDepartments]  = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortBy, setSortBy ] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);

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


  useEffect(()=>{
    let guys = baseUserListData.filter((item)=> item.boss_id === targetUserInfo.user_id);
    setTargetUserGuys(guys ? guys : []);
  }, [targetUserInfo]);

  const escFunction = useCallback((event) => {
    console.log('event.key', event.key)
    console.log('markedUsers', markedUsers)
    if (event.key === "Escape") {
      //Do whatever when esc is pressed
      if (openUserInfo === true){
        setOpenUserInfo(false);
      } else if (markedUsers.length > 0){
        setMarkedUsers([0]);
      } else {
        setSelectedColumns([]);
      }
    }
  }, []);


  const toggleSelectedColumn = (col) => {
    if (selectedColumns.includes(col)) {
      // Удалить col из массива
      setSelectedColumns(selectedColumns.filter(item => item !== col));
    } else {
      // Добавить col в массив
      setSelectedColumns([...selectedColumns, col]);
    }
  };


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
                      <div style={{paddingLeft: '9px'}}
                        onClick={()=>{toggleSelectedColumn(1)}}
                      >id</div>
                      <div
                        onClick={()=>{toggleSelectedColumn(2)}}
                      >Имя сотрудника</div>
                      <div
                        onClick={()=>{toggleSelectedColumn(3)}}
                      >тел</div>
                      <div className="sk-flex-space">
                        <div></div>
                        <div className="sk-usermonic-micro-row">
                          <div
                            onClick={()=>{toggleSelectedColumn(10)}}
                          >Вход</div>
                          <div
                          onClick={()=>{toggleSelectedColumn(11)}}
                          >Выход</div>
                          <div
                          onClick={()=>{toggleSelectedColumn(12)}}
                            title={'Всего рабочее время'}
                          >Рв</div>
                          <div
                          onClick={()=>{toggleSelectedColumn(13)}}
                          title={'Общее время на предприятии'}
                          >Ов</div>
                          <div
                          onClick={()=>{toggleSelectedColumn(14)}}
                          title={'Врямя для отработки'}
                          >От</div>
                          <div
                          onClick={()=>{toggleSelectedColumn(15)}}
                          title={'Потерянное время'}
                          >Пв</div>
                        </div>
                        <div></div>
                      </div>
                      <div
                        title="Есть опоздание"
                        onClick={()=>{toggleSelectedColumn(20)}}
                      >Оп.</div>
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
                              selected_columns={selectedColumns}
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


            <Drawer title=<span className={'sk-flex-space'}>Информация о сотруднике  <Tag>{targetUserInfo?.user_id}</Tag></span>
            mask={false}
            onClose={()=>{setOpenUserInfo(false)}} open={openUserInfo}>
            {openUserInfo && (
              <div>
              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Должность</div>
                <div className={'sk-contend-um'}>{targetUserInfo.user_occupy ? targetUserInfo.user_occupy : '-'}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Отдел</div>
                <div className={'sk-contend-um'}>{targetUserInfo.department_name ? targetUserInfo.department_name : '-'}</div>
              </div>

              <div className={'sk-usermonic-drawer-row'}>
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
              
              {targetUserInfo.boss_id && targetUserInfo.boss_id !== 0 && targetUserInfo.user_id != 46 ? (
                <div className="sk-boss-wrapper-sf">
                  <div style={{fontSize: 'large',
                    fontSize: 'initial', fontWeight:'bolder',
                    borderBottom: '1px solid gray'
                  }}><span
                    onClick={()=>{
                      setTargetUserInfo(baseUserListData.find((item)=> item.user_id === targetUserInfo.boss_id),
                      handleMarkUser(targetUserInfo.boss_id));}}
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

              <br />
              
              {targetUserGuys && targetUserGuys.length > 0 && (
              <div className="sk-boss-wrapper-sf">
                <div style={{fontSize: 'large',
                      fontSize: 'initial', fontWeight:'bolder',
                      borderBottom: '1px solid gray'
                    }}><span>Сотрудники</span></div>
                { targetUserGuys.map((item, index)=>(
                  <div className={'sk-boss-guy-card'}
                   onClick={()=>{
                    setTargetUserInfo(baseUserListData.find((user)=> user.user_id === item.user_id),
                    handleMarkUser(item.user_id));}}
                  >{index + 1} - {item.user_surname} {item.user_name} {item.user_patronymic}</div>
                ))}

              </div>

              )}

              </div>
              )}
            </Drawer>

        </div>
    )
}


export default UserList;