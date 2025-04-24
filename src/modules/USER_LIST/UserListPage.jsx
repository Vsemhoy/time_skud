import React, {useCallback, useEffect, useRef, useState } from "react";

import UserListToolbar from "./components/UserlistToolbar";
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
import UserlistEventDumpCard from "./components/UserlistEventDumpCard";
import UserListSidebar from "./components/UserListSidebar";


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




  // Await data from header, then load data from setver
  const [extFilters, setExtFilters] = useState([]);

  const sortedUserRef = useRef(userListData);
  const markedUsersRef = useRef(markedUsers);
  const openUserInfoRef = useRef(openUserInfo);
  const tableRef = useRef(null);

  const [targetDate, setTargetDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));


  useEffect(() => {
    markedUsersRef.current = markedUsers;
  }, [markedUsers]);

  useEffect(() => {
    sortedUserRef.current = userListData;
  }, [userListData]);
  
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
        // get_users();
      } else {
        setDepartments(DS_DEPARTMENTS);
        // setBaseUserListData(DS_USERLIST_USERS);
      }
    },[])

    useEffect(()=>{
      setTargetDate(extFilters.date);
      if (PRODMODE){
        const debounceTimer = setTimeout(() => {

          get_users(extFilters);
          }, 500);
          return () => clearTimeout(debounceTimer);
      } else {
        setBaseUserListData(DS_USERLIST_USERS);
      }

    },[extFilters]);



    
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
      const get_users = async (filters, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/userlist/getusers', 
                {
                    data: filters,
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                  setBaseUserListData(response.data.content);
                }
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
      elementdiv.classList.add('sk-move-to-me');
      elementdiv.scrollIntoView({ block: "center", behavior: "smooth" });

      setTimeout(() => {
        elementdiv.classList.remove('sk-move-to-me');
      }, 5000);
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
  }
  const openUserInfoCallbackRef = useRef(handleShowUserInfo);



  useEffect(()=>{
    let guys = baseUserListData.filter((item)=> item.boss_id === targetUserInfo.user_id);
    setTargetUserGuys(guys ? guys : []);
  }, [targetUserInfo]);

  useEffect(() => {
    openUserInfoCallbackRef.current = handleShowUserInfo;
  }, [markedUsers]);

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

      // console.log("Key pressed:", event.key);
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
        return;
      }

      if (markedUsersRef.current.length === 1) {
        const cref_id = markedUsersRef.current[0];
        let nref = null;
        
        // Проверяем, что sortedUserRef.current - массив
        if (!Array.isArray(sortedUserRef.current)) {
          console.error("sortedUserRef.current is not an array!");
          return;
        }
      
        // Находим текущий элемент через find
        const currentUser = sortedUserRef.current.find(
          (user) => user.user_id === cref_id
        );
      
        if (!currentUser) {
          console.error("User not found!");
          return;
        }
      
        const currentIndex = sortedUserRef.current.indexOf(currentUser);
      
        if (event.key === "ArrowUp") {
          if (currentIndex > 0) {
            nref = sortedUserRef.current[currentIndex - 1].user_id;
            if (nref == null){ // If DIVIDER
              nref = sortedUserRef.current[currentIndex - 2]?.user_id;
            }
          }
        } else if (event.key === "ArrowDown") {
          if (currentIndex < sortedUserRef.current.length - 1) {
            nref = sortedUserRef.current[currentIndex + 1].user_id;
            if (nref == null){
              nref = sortedUserRef.current[currentIndex + 2]?.user_id;
            }
          }
        }
      
        if (nref) {
          // Проверяем, что setUserListData принимает правильный формат
          setMarkedUsers([nref]);
          openUserInfoCallbackRef.current(nref);
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


  const toggleExternalFilters = (filters) => {
    setExtFilters(filters);
  }

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
              onChangeExternalFilters={toggleExternalFilters}
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
                          title={'Время выходов'}
                          >ВВ</div>
                          <div
                          className={`${selectedColumns.includes(15) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(15)}}
                          title={'Врямя для отработки'}
                          >ОТ</div>
                          <div
                          className={`${selectedColumns.includes(16) ? "sk-col-selected": ""}`}
                          onClick={()=>{toggleSelectedColumn(16)}}
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
                      {userListData.map((arche, index)=>
                      (
                          <UserMonitorListCard
                            key={`usmcard_${arche.user_id !== undefined ? arche.user_id : 'hed' + index}`} // так как строки сеператоры не имеют айди
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


              <UserListSidebar
              key="djafklsdjklfjaskl"
                target_user_guys={targetUserGuys}
                target_user_info={targetUserInfo}
                userdata={userdata}
                base_user_list_data={baseUserListData}
                open_user_info={openUserInfo}
                on_mark_user={handleMarkUser}
                on_close={setOpenUserInfo}
                target_date={targetDate}
              />

        </div>
    )
}


export default UserList;