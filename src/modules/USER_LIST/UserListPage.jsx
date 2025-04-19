import React, {useCallback, useEffect, useRef, useState } from "react";

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
import { USER_STATE_PLACES } from "../../CONFIG/DEFFORMS";


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

  const [badger, setBadger] = useState(null);


  const markedUsersRef = useRef(markedUsers);
  const openUserInfoRef = useRef(openUserInfo);
  const tableRef = useRef(null);
  useEffect(() => {
    markedUsersRef.current = markedUsers;
  }, [markedUsers]);
  
  useEffect(() => {
    openUserInfoRef.current = openUserInfo;
  }, [openUserInfo]);

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


  useEffect(()=>{
    console.log('OPENOPEN' , openUserInfo);
  },[openUserInfo]);


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
    handleMarkUser(user_id);
    setOpenUserInfo(true);
    let usr = baseUserListData.find((item)=> item.user_id === user_id);
    setTargetUserInfo(usr);
    setBadger(USER_STATE_PLACES[usr.current_state]);
  }


  useEffect(()=>{
    let guys = baseUserListData.filter((item)=> item.boss_id === targetUserInfo.user_id);
    setTargetUserGuys(guys ? guys : []);
  }, [targetUserInfo]);

  // const escFunction = useCallback((event) => {
  //   console.log('event.key', event.key)
  //   console.log('markedUsers', markedUsers)
  //   if (event.key === "Escape") {
  //     //Do whatever when esc is pressed
  //     console.log('openUserInfo', openUserInfo)
  //     if (openUserInfo === true){
  //       setOpenUserInfo(false);
  //     } else if (markedUsers.length > 0 && markedUsers[0] !== 0){
  //       setMarkedUsers([]);
  //       console.log('markedUsers.length', markedUsers.length)
  //     } else {
  //       setSelectedColumns([]);
  //     }
  //   }
  // }, []);


  useEffect(() => {
    const escFunction = (event) => {
      if (event.key === "Escape") {
        if (openUserInfoRef.current) {
          setOpenUserInfo(false);
        } else if (markedUsersRef.current.length > 0 && markedUsersRef.current[0] !== 0) {
          setMarkedUsers([]);
        } else {
          setSelectedColumns([]);
        };
        if (tableRef.current) {
          tableRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, []); // Обработчик добавляется один раз


  // const escFunction = useCallback((event) => {
  //   if (event.key === "Escape") {
  //     console.log('first', markedUsersRef.current.length)
  //     if (openUserInfoRef.current) {
  //       setOpenUserInfo(false);
  //       setMarkedUsers([]);
  //     } else if (markedUsersRef.current.length > 0 && markedUsersRef.current[0] !== 0) {
  //       setMarkedUsers([]);
  //     } else {
  //       setSelectedColumns([]);
  //     }
  //   }
  // }, []);


  // useEffect(() => {
  //   document.addEventListener("keydown", escFunction, false);

  //   return () => {
  //     document.removeEventListener("keydown", escFunction, false);
  //   };
  // }, [escFunction]);


  // useEffect(()=>{
  //   document.addEventListener("keydown", escFunction, false);
  // }, []);

  const toggleSelectedColumn = (col) => {
    if (selectedColumns.includes(col)) {
      // Удалить col из массива
      setSelectedColumns(selectedColumns.filter(item => item !== col));
    } else {
      // Добавить col в массив
      setSelectedColumns([...selectedColumns, col]);
    }
  };

    return (
        <div style={{padding: '6px'}} className={'sk-mw-1400'}>
            <br/>
            <UserListToolbar
              // onSortBy={sortUserList}
              departments={departments}
              baseUsers={baseUserListData}
              onChange={SortFilterChanged}
              userData={userdata}
              on_find_me={handleFindMe}
              im_exist={userListData.find((item)=>  item.user_id === userdata.user.id) != null}
            />
            
            {/* <Table 
            sticky={true}
            dataSource={userListData}
            columns={columns}
            rowClassName={rowClassName}
            pagination={false}
            className={'sk-flight-table'}
             /> */}

        <div className={'sk-arche-stack'} style={{paddingBottom: '50vh'}} ref={tableRef} tabIndex={-1}>
              {userListData.length == 0 ? (
                  <Empty />
              ):(
                  <>
                  <Affix offsetTop={0}>
                  <div className={`sk-usermonic-cardrow sk-usermonic-headerrow`}>
                      <div 
                        onClick={()=>{toggleSelectedColumn(1)}}
                      ><div
                      style={{paddingLeft: '9px'}}
                      className={`${selectedColumns.includes(1) ? "sk-col-selected": ""}`}
                      >id</div></div>
                      <div
                        onClick={()=>{toggleSelectedColumn(2)}}
                      >
                      <div className={`${selectedColumns.includes(2) ? "sk-col-selected": ""}`}>
                      Имя сотрудника
                      </div>
                      </div>
                      <div
                        onClick={()=>{toggleSelectedColumn(3)}}
                      >
                      <div className={`${selectedColumns.includes(3) ? "sk-col-selected": ""}`}>
                        Тел.
                      </div>
                      </div>
                      <div className="sk-flex-space">
                        <div></div>
                        <div className="sk-usermonic-micro-row">
                          <div
                            className={`${selectedColumns.includes(10) ? "sk-col-selected": ""}`}
                            onClick={()=>{toggleSelectedColumn(10)}}
                          >
                            Вход
                          </div>
                          <div
                          className={`${selectedColumns.includes(11) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(11)}}
                          >Выход</div>
                          <div
                          className={`${selectedColumns.includes(12) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(12)}}
                            title={'Всего рабочее время'}
                          >РВ</div>
                          <div
                          className={`${selectedColumns.includes(13) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(13)}}
                          title={'Общее время на предприятии'}
                          >ОВ</div>
                          <div
                          className={`${selectedColumns.includes(14) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(14)}}
                          title={'Врямя для отработки'}
                          >ОТ</div>
                          <div
                          className={`${selectedColumns.includes(15) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(15)}}
                          title={'Потерянное время'}
                          >ПВ</div>
                        </div>
                        <div></div>
                      </div>
                      <div
                        title="Есть опоздание"
                        onClick={()=>{toggleSelectedColumn(20)}}
                      >
                      <div className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                        Оп.
                      </div>
                      </div>
                      <div><div>Рук</div></div>
                      <div><div>Место</div></div>
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

              
              
              {targetUserGuys && targetUserGuys.length > 0 && (
                <>
                <br />
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
                </>
              )}

              {badger && (
                <>
                <br />
                <br />
                <div style={{background: badger.color + 99}}
                className="sk-state-intgra-card">
                  {badger.icon} {badger.title} 
                </div>

                </>

              )}

              </div>
              )}
            </Drawer>

        </div>
    )
}


export default UserList;