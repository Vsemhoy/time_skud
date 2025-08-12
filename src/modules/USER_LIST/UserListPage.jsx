import React, {useCallback, useEffect, useMemo, useRef, useState } from "react";

import UserListToolbar from "./components/UserlistToolbar";
import {Affix, Badge, Drawer, Empty, Layout, message, Spin, Table, Tag} from "antd";
import '../../assets/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS, DS_USERLIST_USERS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import UserMonitorListCard from "./components/UserMonitorListCard";
import dayjs from "dayjs";

import UserListSidebar from "./components/UserListSidebar";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {CLAIM_ACL_MOCK, CLAIMS_MOCKS} from "../CLAIM_MANAGER_SK/CLAIM_MOCK";
import StateIconsController from "../CHARTS/components/StateIconsController";
import {CHART_STATES, USDA} from "../CHARTS/mock/mock";
import {USERS_LIST} from "./mock/mock";
import ClaimEditorDrawer from "../CLAIM_MANAGER_SK/components/ClaimEditorDrawer";


const UserList = (props)=>{
  const { userdata } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [ currentUserId, setCurrentUserId] = useState((userdata && userdata.user) ? userdata.user.id : null);

  const [baseUserListData, setBaseUserListData] = useState([]);
  const [userListData, setUserListData] = useState([]);

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

  const openUserCard = (id) => {
    console.log('id' + ' => ' + id);
    setSelectedUserId(id); // Устанавливаем выбранный ID
    setIsModalVisible(true); // Открываем модальное окно
  };
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    markedUsersRef.current = markedUsers;
  }, [markedUsers]);

  useEffect(() => {
    sortedUserRef.current = userListData;
  }, [userListData]);
  
  useEffect(() => {
    openUserInfoRef.current = openUserInfo;
  }, [openUserInfo]);

  useEffect(()=>{
    if (baseUserListData) {
      setUserListData(baseUserListData.sort((a, b) => b.department - a.department));
    }
  }, [baseUserListData]);

  useEffect(() => {
    async function animateRows() {
      const rows = document.querySelectorAll('.sk-evemonic-norcard');
      // 1. Последовательно добавляем класс с задержкой 150мс
      for (let i = 0; i < rows.length; i++) {
        //rows[i].classList.add('sk-shadow-flash');
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
        //rows[i].classList.remove('sk-shadow-flash');
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
    setIsLoading(true);
    if (PRODMODE){
      const debounceTimer = setTimeout(() => {

        get_users(extFilters);
        }, 500);
        return () => clearTimeout(debounceTimer);
    } else {
      //setBaseUserListData(DS_USERLIST_USERS);
      setBaseUserListData(USERS_LIST);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

  },[extFilters]);


  useEffect(() => {
    console.log(baseUserListData)
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

  useEffect(()=>{
    console.log('OPENOPEN' , openUserInfo);
  },[openUserInfo]);

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
    
  /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка отделов
     */
  const get_departments = async () => {
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
     */
    const get_users = async (filters) => {
        setIsLoading(true);
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/userlist/getusers', {
                data: filters,
                _token: CSRF_TOKEN
            });
            if (response && response.data){
              setBaseUserListData(response.data.content);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
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

  const filterUserListByDepartment = (userList, depart_id) => {
      if (depart_id == null || depart_id == 0){
          return userList;
      };
      return userList.filter(item => item.department_id === Number(depart_id));
  }

  const filteredUsers = useMemo(() => {
      if (!baseUserListData) return [];
      let userList = JSON.parse(JSON.stringify(baseUserListData));

      let companyFilter = innerFilters.find((item)=> item.key === 'id_company');
      if (companyFilter) {
        userList = filterUserListByCompany(userList, companyFilter.value);
      }
      let departFilter = innerFilters.find((item)=> item.key === 'depart_id');
      if (departFilter){
        userList = filterUserListByDepartment(userList, departFilter.value);
      }

      // SortData
      let sortedData = userList ?? [];
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
    console.log(filters)
    setExtFilters(filters);

  }
/*------- CLAIMS ----------------------------------------------------------------------------------------------------------------------------*/
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [editorMode, setEditorMode] = useState('create');
  const [editorOpened, setEditorOpened] = useState(false);
  const [formType, setFormType] = useState(null);
  const [baseClaimTypes, setBaseClaimTypes] = useState([]);
  const [claimTypes, setClaimTypes] = useState([]);
  const [claimTypeOptions, setClaimTypeOptions] = useState([]);
  const [aclBase, setAclBase] = useState({});
  const [userData, setUserData] = useState(null);
  const [selectedClaimId, setSelectedClaimId] = useState(0);
  const [editedClaim, setEditedClaim] = useState(null);

  const handleEditorOpenCreate = (key) => {
    setEditorMode('create');
    setEditorOpened(true);
    setFormType(key);
  }

  const handleEditorOpen = (value) => {
    if (value && value.key){
      let key = parseInt(value.key.replace('clt_', ''));
      setEditorMode('create');
      setEditorOpened(true);
      setFormType(key);
    }
  }

  const menuProps = {
    items: claimTypes,
    onClick: handleEditorOpen,
  };

  useEffect(() => {
    fetchInfo().then();
  }, []);

  useEffect(()=>{
    setUserData(props.userdata);
  },[props.userdata]);

  useEffect(() => {
    let clats = [];
    let clabs = [
      {
        value: 0,
        label: (
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span>Все заявки</span>
            </div>
        ),
        background: '#c3c3c3',
        creatable: false
      }
    ];
    const MYID = userData?.user?.id;
    console.log(MYID)
    if (!MYID) {
      return;
    }

    // Фильтруем кнопки разных типов, чтоыбы не выводить запрещенные пользователю
    for (let i = 0; i < baseClaimTypes.length; i++) {
      const claimType = baseClaimTypes[i];
      const formType  = claimType.id;
      let allowType = false;
      //for (let n = 0; n < baseClaimTypes.length; n++) {
        //const userCard = baseClaimTypes[n];
        if (aclBase[userData?.user?.id_company] && aclBase[userData?.user?.id_company][formType] && aclBase[userData?.user?.id_company][formType]?.includes('ANY_CLAIM_CREATE')){
          // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
          allowType = true;
        } else if (userData?.user?.boss_id === MYID && aclBase[userData?.user?.id_company] && aclBase[userData?.user?.id_company][formType] && aclBase[userData?.user?.id_company][formType]?.includes('TEAM_CLAIM_CREATE')){
          // Если челик мой подчиненный и у меня есть права добавлять подчиненным
          allowType = true;
        } else if (userData?.user?.id === MYID && aclBase[userData?.user?.id_company] && aclBase[userData?.user?.id_company][formType] && aclBase[userData?.user?.id_company][formType]?.includes('PERS_CLAIM_CREATE')){
          allowType = true;
        }
      //}

      let clat = {
            key: `clt_${claimType.id}`,
            value: claimType.id,
            label: claimType.text,
            color: claimType.color,
            icon: <StateIconsController IdState={claimType.id}/>
          }
      ;
      if (allowType && claimType.fillable === 1) {
        clats.push(clat);
      }

      clabs.push({
        value: claimType.id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{claimType.title}</span>
            </div>
        ),
        canCreate: allowType,
        background: claimType.color,
      })

    }
    console.log(clats)
    setClaimTypes(clats);
    setClaimTypeOptions(clabs);
  }, [baseClaimTypes, aclBase, userData]);

  const fetchInfo = async () => {
    await fetchUsersSkudACLs();
    await fetchClaimTypes();
  };

  const fetchUsersSkudACLs = async () => {
    if (PRODMODE) {
      try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getMyAcls',
            {
              _token: CSRF_TOKEN
            });
        setAclBase(response.data.content);
        console.log('response data => ', response.data);
      } catch (e) {
        console.log(e)
      }
    } else {
      setAclBase(CLAIM_ACL_MOCK);
      setUserData(USDA);
    }
  };

  const fetchClaimTypes = async () => {
    if (PRODMODE) {
      try {
        let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getstates',
            {
              _token: CSRF_TOKEN
            });
        setBaseClaimTypes(response.data.content);
        console.log('response data => ', response.data);
      } catch (e) {
        console.log(e)
      }
    } else {
      setBaseClaimTypes(CHART_STATES);
    }
  };

  const handleCloseEditor = ()=> {
    if (editorOpened){
      setEditorOpened(false);
      setEditorMode('read');

      setTimeout(() => {
        console.log(2222222222222222);
        setSelectedClaimId(0);
      }, 555);
    }
  };

  const handleSaveClaim = (claim, editmode) => {
    if (editmode === 'create'){
      create_claim(claim);
    } else if (editmode === 'update'){
      console.log('update claim');
      update_claim(claim);
    }
    setEditorOpened(false);
    setTimeout(() => {
      setSelectedClaimId(0);
      console.log(999999999);
    }, 555);
  };

  const create_claim = async (claimObj) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/createclaim',
          {
            data: claimObj,
            _token: CSRF_TOKEN
          });
      console.log('response data => ', response.data);
      //get_claimList(filterPack);
    } catch (e) {
      console.log(e)
    }
  };

  const update_claim = async (claimObj) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updateclaim',
          {
            data: claimObj,
            _token: CSRF_TOKEN
          });
      console.log('response data => ', response.data);
      //get_claimList(filterPack);
    } catch (e) {
      console.log(e)
    }
  };

  const handleApproveEvent = (id, type)=> {
    const obj = {
      id: id,
      state: 1,
    };
    update_claim_state(obj)
    setEditorOpened(false);
    setTimeout(() => {
      setSelectedClaimId(0);
      console.log(888888333333);
    }, 555);
  };

  const handleDeclineEvent = (id, type)=> {
    const obj = {
      id: id,
      state: 2,
    };
    update_claim_state(obj);
    setEditorOpened(false);
    setTimeout(() => {
      setSelectedClaimId(0);
      console.log(555555555555);
    }, 555);
  };

  const handleGetBackEvent = (id)=> {
    setTimeout(() => {
      setSelectedClaimId(0);
      console.log(1111111111111);
    }, 555);
    setEditorOpened(false);
    delete_claim(id);
  };

  const update_claim_state = async (claimObj, req, res) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updatestate',
          {
            data: claimObj,
            _token: CSRF_TOKEN
          });
      console.log('response data => ', response.data);
      //get_claimList(filterPack);
    } catch (e) {
      console.log(e)
    }
  };

  const delete_claim = async (claim_id, req, res) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/deleteclaim',
          {
            data: {id: claim_id},
            _token: CSRF_TOKEN
          });
      console.log('response data => ', response.data);
      //get_claimList(filterPack);
    } catch (e) {
      console.log(e)
    }
  };

    return (
        <div className={'mega-layout'}>
          <Layout className={'layout'}>
            <Header className={'header-user-list'}>
              <Affix>
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

                  isOpenFilters={isOpenFilters}
                  setIsOpenFilters={(value) => setIsOpenFilters(value)}
                  handleEditorOpenCreate={handleEditorOpenCreate}
                  menuProps={menuProps}
                />
              </Affix>
            </Header>
            <Layout className="sk-layout-center">
              <Sider width={isOpenFilters ? "330px" : 0}
                     className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}
              >
                <Affix offsetTop={100}>
                  <div className="sk-width-container">
                    <div className="sk-usp-filter-col">

                    </div>
                  </div>
                </Affix>
              </Sider>
              <Content className="content">
                <div className={'sk-arche-stack'} style={{paddingBottom: '50vh'}} ref={tableRef} tabIndex={-1}>
                    {userListData.length === 0 ? (
                        <Empty />
                    ):(
                        <div>
                        <Affix offsetTop={100}>
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
                          <Spin spinning={isLoading}>
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
                          </Spin>
                        </div>
                    )}
                </div>
              </Content>
            </Layout>
          </Layout>

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

          <ClaimEditorDrawer
              data={editedClaim}
              mode={editorMode}
              acl_base={aclBase}
              user_list={baseUserListData}
              opened={editorOpened}
              claim_type={formType}
              on_close={handleCloseEditor}

              claim_types={claimTypes}
              on_send={handleSaveClaim}
              my_id={userData?.user?.id}
              on_get_back={handleGetBackEvent}
              on_approve={handleApproveEvent}
              on_decline={handleDeclineEvent}
          />
        </div>
    )
}


export default UserList;
