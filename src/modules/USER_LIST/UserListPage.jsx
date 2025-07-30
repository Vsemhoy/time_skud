import React, {useCallback, useEffect, useMemo, useRef, useState } from "react";

import UserListToolbar from "./components/UserlistToolbar";
import { Affix, Badge, Drawer, Empty, message, Table, Tag } from "antd";
import '../../assets/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS, DS_USERLIST_USERS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import UserMonitorListCard from "./components/UserMonitorListCard";
import dayjs from "dayjs";

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


  const [toolbarCommand, setToolbarCommand] = useState(null);

  // Await data from header, then load data from setver
  const [extFilters, setExtFilters] = useState([]);
  const [innerSortByValue, setInnerSortByValue] = useState('department_asc');
  const [innerFilters, setInnerFiletrs] = useState([]);
  

  const sortedUserRef = useRef(userListData);
  const markedUsersRef = useRef(markedUsers);
  const openUserInfoRef = useRef(openUserInfo);
  const tableRef = useRef(null);

  const [targetDate, setTargetDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    // messageApi.info('Данные обновлены');
    console.clear();
    console.log("DATA UPDATED BY TRIGGER");
  };

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
      
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(()=>{
      setUserListData(baseUserListData.sort((a, b) => b.department - a.department));


    }, [baseUserListData]);

    useEffect(() => {
      async function animateRows() {
        const rows = document.querySelectorAll('.sk-evemonic-norcard');
        // 1. Последовательно добавляем класс с задержкой 150мс
        for (let i = 0; i < rows.length; i++) {
          rows[i].classList.add('sk-shadow-flash');
          await sleep(1); // Интервал волны
        }
        // 2. Ждём 1 секунду после последнего
        // await sleep(1000);
    
        // 3. Последовательно убираем класс с задержкой 150мс

      }
    
      animateRows();
    }, [targetDate]);
  
    useEffect(() => {
      async function animateRows() {
        const rows = document.querySelectorAll('.sk-evemonic-norcard');
        // 1. Последовательно добавляем класс с задержкой 150мс
        // 3. Последовательно убираем класс с задержкой 150мс
        for (let i = 0; i < rows.length; i++) {
          rows[i].classList.remove('sk-shadow-flash');
          await sleep(1);
        }
      }
    
      animateRows();
    }, [baseUserListData]);
  
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


    useEffect(() => {
      if (openUserInfo && markedUsers[0]){
        let user_id = markedUsers[0];
        handleMarkUser(user_id);
        setOpenUserInfo(true);
        let usr = baseUserListData.find((item)=> item.user_id === user_id);
        setTargetUserInfo(usr);
      }
    }, [baseUserListData]);


    // Callback from socket
    useEffect(()=>{
      info();
      if (props.refresh_trigger != null){
        const debounceTimer = setTimeout(() => {
          get_users(extFilters);
          }, 500);
          return () => clearTimeout(debounceTimer);
      }
    },[props.refresh_trigger]);


    
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


  // const SortFilterChanged = (userList) => {
  //   setUserListData(userList);
  // }

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
        } else if (event.key === "ArrowLeft") {
          setToolbarCommand("sub_day");
          handleMarkUser(currentUser.user_id);
          setTargetUserInfo(currentUser);
          
        } else if (event.key === "ArrowRight") {
          setToolbarCommand("add_day");
          handleMarkUser(currentUser.user_id);
          setTargetUserInfo(currentUser);
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

  useEffect(() => {
    setToolbarCommand(null);
  }, [toolbarCommand]);


  const toggleSelectedColumn = (col) => {
    if (selectedColumns.includes(col)) {
      // Удалить col из массива
      setSelectedColumns(selectedColumns.filter(item => item !== col));
    } else {
      // Добавить col в массив
      setSelectedColumns([...selectedColumns, col]);
    }
  };




  const move_boss_to_top = (arr) => {
    // Создаем копию массива для безопасности
    const newArray = [...arr];
    
    // Ищем босса
    const bossIndex = newArray.findIndex(user => user?.user_id === 46);
    
    // Если босс найден и не на первом месте
    if (bossIndex > 0) {
      // Извлекаем босса
      const [boss] = newArray.splice(bossIndex, 1);
      // Вставляем в начало
      newArray.unshift(boss);
    }
    
    return newArray;
  };


  
  const insertDepartmentNames = (dataArray) => {
      let newDataArray = [];
      let next = -1; // next department ID
  
      for (let i = 0; i < dataArray.length; i++){
        let dep_id = dataArray[i].department_id;
        
        if (dep_id != next){
          // insert custom row
          let crow = customRow(dep_id);
          // console.log('crow', crow);
          newDataArray.push(crow);
        }
        if (i < dataArray.length - 1){
          next = dep_id;
        }; 
          newDataArray.push(dataArray[i]);
        }
      
      // console.log('dataArray' + ' => ' + newDataArray);
      return newDataArray;
    }

    const getDepartmentNameById = (id) => {
      const department = departments.find(dept => dept.id === id);
      return department ? department.name : null; // Возвращаем имя или null, если не найдено
  };


  // Добавляем кастомную строку в зависимости от значения sortBy
  const customRow = (dep_id) => {
    return {
    id: `custom_row_dep_${dep_id}`,
      key: `custom_row_dep_${dep_id}`, // Уникальный ключ для строки
      name: getDepartmentNameById(dep_id) ? getDepartmentNameById(dep_id) : '<департамент удалён>',
      surname: null,
      patronymic: null,
      enter: '', // Пустые значения для других полей
      exit: '',
      losttime: '',
      type: 'header'
      };
  };


    const filterUserListByCompany = (userList, id_company)=>{
      if (id_company == 0 || id_company == null){
          return userList;
      };
      return userList.filter(item => item.id_company === Number( id_company));
    }


    const filterUserListByDepartment = (userList, depart_id) =>
    {
        if (depart_id == null || depart_id == 0){
            return userList;
        };
        return userList.filter(item => item.department_id === Number(depart_id));
    }




    const filteredUsers = useMemo(() => {
      let userList = JSON.parse(JSON.stringify(baseUserListData));

      let companyFilter = innerFilters.find((item)=> item.key === 'id_company');
      if (companyFilter) {
        userList = filterUserListByCompany(userList, companyFilter.value);
      };
      let departFilter = innerFilters.find((item)=> item.key === 'depart_id');
      if (departFilter){
        userList = filterUserListByDepartment(userList, departFilter.value);
      };

      // SortData
      let sortedData = userList;
      switch (innerSortByValue) {
          case "department_asc":
              sortedData.sort((a, b) => a.department_id - b.department_id);
              sortedData = move_boss_to_top(sortedData);
              sortedData = insertDepartmentNames(sortedData);
              break;
  
          case "department_desc":
              sortedData.sort((a, b) => b.department_id - a.department_id);
              break;
  
          case "name_asc":
              sortedData.sort((a, b) => a.user_name.localeCompare(b.user_name));
              break;
  
          case "name_desc":
              sortedData.sort((a, b) => b.user_name.localeCompare(a.user_name));
              break;
  
          case "surname_asc":
              sortedData.sort((a, b) => a.user_surname.localeCompare(b.user_surname));
              break;
  
          case "surname_desc":
              sortedData.sort((a, b) => b.user_surname.localeCompare(a.user_surname));
              break;
  
          case "state_asc":
              sortedData.sort((a, b) => a.current_state - b.current_state);
              break;
  
          case "state_desc":
            sortedData.sort((a, b) => b.current_state - a.current_state);
          //   console.log( sortedData);
            break;
  
          default:
              // Сортировка по умолчанию (например, по department ASC)
              sortedData.sort((a, b) => a.department_id - b.department_id);
              sortedData = move_boss_to_top(sortedData);
              sortedData = insertDepartmentNames(sortedData);
              break;
      }
    
      return sortedData;
    }, [baseUserListData, innerSortByValue, innerFilters]);


    const toggleInnerSorts = (value) => {
      setInnerSortByValue(value);
    }

    const toggleInnerFilters = (value) => {
      setInnerFiletrs(value);
    }

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
              userData={userdata}
              on_find_me={handleFindMe}
              im_exist={userListData.find((item)=>  item.user_id === userdata.user.id) != null}
              onChangeExternalFilters={toggleExternalFilters}
              onChangeInnerSort={toggleInnerSorts}
              onChangeInnerFilers={toggleInnerFilters}
              command={toolbarCommand}
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
                  <div className={`sk-usermonic-cardrow-ou sk-usermonic-headerrow`}>
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
                      <div title='График работ' className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                        Гр.
                      </div>
                      <div title='Правила учёта РВ' className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                        Пр.
                      </div>
                      <div title='Заявки' className={`${selectedColumns.includes(20) ? "sk-col-selected": ""}`}>
                        За.
                      </div>
                     
                      <div><div>Рук</div></div>
                      <div><div>Место</div></div>
                  </div>
                  </Affix>
                      {filteredUsers.map((arche, index)=>
                      (
                          <UserMonitorListCard
                              key={`usmcard_${arche.user_id !== undefined ? arche.user_id : arche.key}`} // так как строки сеператоры не имеют айди
                              data={arche}
                              on_mark_user={handleMarkUser}
                              marked_users={markedUsers}
                              its_me={userdata.user.id === arche.user_id}
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