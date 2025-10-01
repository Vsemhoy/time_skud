import React, {useCallback, useEffect, useMemo, useRef, useState } from "react";

import UserListToolbar from "./components/UserlistToolbar";
import {Affix, Badge, Drawer, Empty, Layout, message, Modal, Spin, Table, Tag} from "antd";
import '../../assets/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS, DS_USERLIST_USERS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import UserMonitorListCard from "./components/UserMonitorListCard";
import dayjs from "dayjs";

import UserListSidebarDrawer from "./components/UserListSidebarDrawer";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {CLAIM_ACL_MOCK, CLAIMS_MOCKS} from "../CLAIM_MANAGER_SK/CLAIM_MOCK";
import StateIconsController from "../CHARTS/components/StateIconsController";
import {CHART_STATES, USDA} from "../CHARTS/mock/mock";
import {USERS_LIST} from "./mock/mock";
import ClaimEditorDrawer from "../CLAIM_MANAGER_SK/components/ClaimEditorDrawer";
import ExtendedInformationSidebar from "./components/ExtendedInformationSidebar";
import FiltersSidebar from "./components/FiltersSidebar";
import ClaimListModal from "./components/ClaimListModal";
import BillListModal from "./components/BillListModal";


const UserList = (props)=>{
  const { userdata } = props;

  /*------- CREATE CLAIMS ----------------------------------------------------------------------------------------------------------------------------*/
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [isShowExtendedInfo, setIsShowExtendedInfo] = useState(false);
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
  const [doUpdateModal, setDoUpdateModal] = useState(0);

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

  /*useEffect(() => {
    if (claimTypes && claimTypes.length > 0 && userListData && userListData.length > 0) {
      const users = JSON.parse(JSON.stringify(userListData));
      users.forEach((user, idx) => {
        const global = claimTypes.find(claimType => claimType.value === user.global_state);
        users[idx].globalState = global;
      });
      console.log(baseUserListData)
      console.log(users)
      setUserListData(users);
      //setBaseUserListData(users);
    }
  }, [claimTypes]);*/

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
      setDoUpdateModal(dayjs().unix());
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
      setDoUpdateModal(dayjs().unix());
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
      console.log(555555555555);
    }, 555);
  };

  const handleGetBackEvent = (id)=> {
    setTimeout(() => {
      console.log(1111111111111);
    }, 555);
    setEditorOpened(false);
    delete_claim(id);
  };

  const update_claim_state = async (claimObj) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updatestate',
          {
            data: claimObj,
            _token: CSRF_TOKEN
          });
      console.log('response data => ', response.data);
      setDoUpdateModal(dayjs().unix());
    } catch (e) {
      console.log(e)
    }
  };

  const delete_claim = async (claim_id) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/deleteclaim',
          {
            data: {id: claim_id},
            _token: CSRF_TOKEN
          });
      console.log('response data => ', response.data);
      setDoUpdateModal(dayjs().unix());
    } catch (e) {
      console.log(e)
    }
  };

  /*---SCHEDULE KPP-------------------------------------------------------------------------------------------------------------------*/

  const [isOpenScheduleKPPModal, setIsOpenScheduleKPPModal] = useState(false);
  const handleOpenScheduleKPPModal = () => {
    setIsOpenScheduleKPPModal(true);
  };

  const handleCloseScheduleKPPModal = () => {
    setIsOpenScheduleKPPModal(false);
  };

  /*---BILL LIST KPP-------------------------------------------------------------------------------------------------------------------*/

  const [isOpenBillListKPPModal, setIsOpenBillListKPPModal] = useState(false);
  const handleOpenBillListKPPModal = () => {
    setIsOpenBillListKPPModal(true);
  };

  const handleCloseBillListKPPModal = () => {
    setIsOpenBillListKPPModal(false);
  };

  /*---SCHEDULE BUILDERS-------------------------------------------------------------------------------------------------------------------*/

  const [isOpenScheduleBuildersModal, setIsOpenScheduleBuildersModal] = useState(false);
  const handleOpenScheduleBuildersModal = () => {
    setIsOpenScheduleBuildersModal(true);
  };

  const handleCloseScheduleBuildersModal = () => {
    setIsOpenScheduleBuildersModal(false);
  };

  /*---BILL LIST BUILDERS-------------------------------------------------------------------------------------------------------------------*/

  const [isOpenBillListBuildersModal, setIsOpenBillListBuildersModal] = useState(false);
  const handleOpenBillListBuildersModal = () => {
    setIsOpenBillListBuildersModal(true);
  };

  const handleCloseBillListBuildersModal = () => {
    setIsOpenBillListBuildersModal(false);
  };

  /*---BILL LIST-------------------------------------------------------------------------------------------------------------------*/

  const [isOpenBillListModal, setIsOpenBillListModal] = useState(false);
  const handleOpenBillListModal = () => {
    setIsOpenBillListModal(true);
  };

  const handleCloseBillListModal = () => {
    setIsOpenBillListModal(false);
  };

  /*--- CLAIMS LIST -------------------------------------------------------------------------------------------------------------------*/

  const [isOpenClaimsModal, setIsOpenClaimsModal] = useState(false);
  const handleOpenClaimsModal = () => {
    setIsOpenClaimsModal(true);
  };

  const handleCloseClaimModal = () => {
    setIsOpenClaimsModal(false);
  };

  const handleOpenInfo = (id, obj) => {
    let type = obj.skud_current_state_id;
    setEditedClaim(obj);
    setFormType(type);
    setEditorMode('read');
    setEditorOpened(true);
  };

  const handleEditEvent = (id, obj)=> {
    let type = obj.skud_current_state_id;
    setEditedClaim(obj);
    setFormType(type);
    setEditorMode('update');
    setEditorOpened(true);
  };
/*-------------------------------------------------------------------------------------------------------------------------------*/

  const [isLoading, setIsLoading] = useState(false);

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
      const baseUsers = JSON.parse(JSON.stringify(baseUserListData));
      baseUsers.sort((a, b) => b.department - a.department);
      if (claimTypes && claimTypes.length > 0) {
        const users = baseUsers;
        users.forEach((user, idx) => {
          const global = claimTypes.find(claimType => claimType.value === user.global_state);
          users[idx].globalState = global;
        });
        console.log(baseUserListData)
        console.log(users)
        setUserListData(users);
      }
      setUserListData(baseUsers);
    }
  }, [baseUserListData, claimTypes]);

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
      console.log(123)
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
      let usr = baseUserListData.find((item)=> item.id === user_id);
      setTargetUserInfo(usr);
    }
    console.log(1)
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
    let guys = baseUserListData.filter((item)=> item.boss_id === targetUserInfo.id);
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
            (user) => user.id === cref_id
        );

        if (!currentUser) {
          console.error("User not found!");
          return;
        }

        const currentIndex = sortedUserRef.current.indexOf(currentUser);

        if (event.key === "ArrowUp") {
          if (currentIndex > 0) {
            nref = sortedUserRef.current[currentIndex - 1].id;
            if (nref == null){ // If DIVIDER
              nref = sortedUserRef.current[currentIndex - 2]?.id;
            }
          }
        } else if (event.key === "ArrowDown") {
          if (currentIndex < sortedUserRef.current.length - 1) {
            nref = sortedUserRef.current[currentIndex + 1].id;
            if (nref == null){
              nref = sortedUserRef.current[currentIndex + 2]?.id;
            }
          }
        } else if (event.key === "ArrowLeft") {
          setToolbarCommand("sub_day");
          handleMarkUser(currentUser.id);
          setTargetUserInfo(currentUser);

        } else if (event.key === "ArrowRight") {
          setToolbarCommand("add_day");
          handleMarkUser(currentUser.id);
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

  const handleShowUserInfo = (user_id)=>{
    console.log('user_id', user_id)
    handleMarkUser(user_id);
    setOpenUserInfo(true);
    let usr = baseUserListData.find((item)=> item.id === user_id);
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
    /*const newArray = [...arr];
    const bossIndex = newArray.findIndex(user => user?.id === 46);
    if (bossIndex > 0) {
      const [boss] = newArray.splice(bossIndex, 1);
      newArray.unshift(boss);
    }
    
    return newArray;*/
    return arr;
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
      if (!userListData || userListData.length === 0) return [];
      let userList = JSON.parse(JSON.stringify(userListData));

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
              sortedData.sort((a, b) => {
                if (a.department_id === b.department_id) {
                  return b.rang - a.rang;
                }
                return a.department_id - b.department_id;
              });
              sortedData = insertDepartmentNames(sortedData);
              break;

          case "department_desc":
              sortedData.sort((a, b) => b.department_id - a.department_id);
              break;

          case "name_asc":
              sortedData.sort((a, b) => a.name.localeCompare(b.name));
              break;

          case "name_desc":
              sortedData.sort((a, b) => b.name.localeCompare(a.name));
              break;

          case "surname_asc":
              sortedData.sort((a, b) => a.surname.localeCompare(b.surname));
              break;

          case "surname_desc":
              sortedData.sort((a, b) => b.surname.localeCompare(a.surname));
              break;

          case "state_asc":
              sortedData.sort((a, b) => a.current_state - b.current_state);
              break;

          case "state_desc":
            sortedData.sort((a, b) => b.current_state - a.current_state);
          //   console.log( sortedData);
            break;

        default:
          sortedData.sort((a, b) => {
            if (a.department_id === b.department_id) {
              return b.rang - a.rang;
            }
            return a.department_id - b.department_id;
          });
          sortedData = insertDepartmentNames(sortedData);
          break;
      }


    console.log('sorted', sortedData)
      return sortedData;
  }, [userListData, innerSortByValue, innerFilters]);

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
                im_exist={userListData.find((item)=>  item.id === userdata.user.id) != null}
                onChangeExternalFilters={toggleExternalFilters}
                onChangeInnerSort={toggleInnerSorts}
                onChangeInnerFilers={toggleInnerFilters}
                command={toolbarCommand}

                isOpenFilters={isOpenFilters}
                setIsOpenFilters={(value) => setIsOpenFilters(value)}
                handleEditorOpenCreate={handleEditorOpenCreate}
                menuProps={menuProps}

                openScheduleKPPModal={handleOpenScheduleKPPModal}
                openBillListKPPModal={handleOpenBillListKPPModal}
                openScheduleBuildersModal={handleOpenScheduleBuildersModal}
                openBillListBuildersModal={handleOpenBillListBuildersModal}
                openClaimsModal={handleOpenClaimsModal}
                openBillListModal={handleOpenBillListModal}
              />
            </Affix>
          </Header>
          <Layout className="sk-layout-center">
            <Sider width={isOpenFilters ? "330px" : 0}
                   className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}
                   style={{paddingTop: '0'}}
            >
              <Affix offsetTop={100}>
                <div className="sk-width-container">
                  <div className="sk-usp-filter-col" style={{height: 'calc(100vh - 46px - 115px)', padding: '10px'}}>
                    <FiltersSidebar onChangeInnerSort={toggleInnerSorts}
                                    onChangeInnerFilers={toggleInnerFilters}
                                    extendedInfo={isShowExtendedInfo}
                                    isShowExtended={(value) => setIsShowExtendedInfo(value)}
                                    activeCompany={(userData && userData.user && !userData.user.super) ? userData.user.active_company : 0}
                    />
                  </div>
                </div>
              </Affix>
            </Sider>
            <Content className="content no-pb">
              <div className={'sk-arche-stack'} style={{paddingBottom: '50vh'}} ref={tableRef} tabIndex={-1}>
                  {userListData.length === 0 ? (
                      <Empty />
                  ):(
                      <div>
                        <Affix offsetTop={100}>
                          <div
                              className={`sk-usermonic-cardrow-ou-test sk-usermonic-headerrow ${isShowExtendedInfo ? 'extended' : ''}`}>

                            <div onClick={() => {
                              toggleSelectedColumn(1)
                            }}>
                              <div style={{paddingLeft: '9px'}}
                                   className={`${selectedColumns.includes(1) ? "sk-col-selected" : ""}`}
                              >id
                              </div>
                            </div>

                            <div onClick={() => {
                              toggleSelectedColumn(2)
                            }}>
                              <div className={`${selectedColumns.includes(2) ? "sk-col-selected" : ""}`}
                                   style={{textAlign: 'left'}}>
                                Имя сотрудника
                              </div>
                            </div>

                            <div onClick={() => {
                              toggleSelectedColumn(3)
                            }}>
                              <div className={`${selectedColumns.includes(3) ? "sk-col-selected" : ""}`}>
                                Телефон
                              </div>
                            </div>

                            <div
                                className={`${selectedColumns.includes(10) ? "sk-col-selected" : ""}`}
                                onClick={() => {
                                  toggleSelectedColumn(10)
                                }}
                            >Вход
                            </div>

                            <div
                                className={`${selectedColumns.includes(11) ? "sk-col-selected" : ""}`}
                                onClick={() => {
                                  toggleSelectedColumn(11)
                                }}
                            >Выход
                            </div>

                            <div
                                className={`${selectedColumns.includes(14) ? "sk-col-selected" : ""}`}
                                onClick={() => {
                                  toggleSelectedColumn(22)
                                }}
                                title={'Обед'}
                            >Обед
                            </div>

                            <div
                                className={`${selectedColumns.includes(14) ? "sk-col-selected" : ""}`}
                                onClick={() => {
                                  toggleSelectedColumn(14)
                                }}
                                title={'Кратковременные перерывы'}
                            >Крат. перерывы
                            </div>

                            {isShowExtendedInfo && (
                                <div
                                    className={`${selectedColumns.includes(12) ? "sk-col-selected" : ""}`}
                                    onClick={() => {
                                      toggleSelectedColumn(12)
                                    }}
                                    title={'Всего рабочее время'}
                                >Рабочее время</div>
                            )}
                            {isShowExtendedInfo && (
                                <div
                                    className={`${selectedColumns.includes(13) ? "sk-col-selected" : ""}`}
                                    onClick={() => {
                                      toggleSelectedColumn(13)
                                    }}
                                    title={'Общее время на предприятии'}
                                >Время на предприятии</div>
                            )}
                            {isShowExtendedInfo && (
                                <div
                                    className={`${selectedColumns.includes(15) ? "sk-col-selected" : ""}`}
                                    onClick={() => {
                                      toggleSelectedColumn(15)
                                    }}
                                    title={'Врямя для отработки'}
                                >Врямя для отработки</div>
                            )}

                            <div
                                className={`${selectedColumns.includes(16) ? "sk-col-selected" : ""}`}
                                onClick={() => {
                                  toggleSelectedColumn(16)
                                }}
                                title={'Потерянное время'}
                            >Потерянное время
                            </div>

                            {isShowExtendedInfo && (
                                <div title='График работ'
                                     className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}
                                >График работ
                                </div>
                            )}

                            {isShowExtendedInfo && (
                                <div title='Правила учёта РВ'
                                     className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}
                                >Правила учёта РВ
                                </div>
                            )}

                            {isShowExtendedInfo && (
                                <div>
                                  <div>Руководитель</div>
                                </div>
                            )}

                            <div title='Заявки' className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}
                            >Заявки
                            </div>

                            <div>
                              <div>Место</div>
                            </div>
                          </div>
                        </Affix>
                        <Spin spinning={isLoading}>
                          {filteredUsers.map((arche, index) =>
                              (
                                  <UserMonitorListCard
                                      key={`usmcard_${arche.id !== undefined ? arche.id : arche.key}`}
                                      data={arche}
                                      on_mark_user={handleMarkUser}
                                    marked_users={markedUsers}
                                    its_me={userdata.user.id === arche.id}
                                    on_double_click={handleShowUserInfo}
                                    selected_columns={selectedColumns}
                                    extendedInfo={isShowExtendedInfo}
                                />
                            ))}
                        </Spin>
                      </div>
                  )}
              </div>
            </Content>
            <Sider width={openUserInfo ? "330px" : 0}
                   className={`sider ${openUserInfo ? '' : 'sider-hidden'} pl15`}
                   style={{paddingTop: '0'}}
            >
              <Affix offsetTop={100}>
                <div className="sk-width-container" style={{border: '1px solid gainsboro', borderRadius: '6px', height: 'calc(100vh - 46px - 115px)'}}>
                    <ExtendedInformationSidebar
                        target_user_guys={targetUserGuys}
                        target_user_info={targetUserInfo}
                        userdata={userdata}
                        base_user_list_data={baseUserListData}
                        open_user_info={openUserInfo}
                        on_mark_user={handleMarkUser}
                        on_close={(bool) => setOpenUserInfo(bool)}
                        target_date={targetDate}
                    />
                </div>
              </Affix>
            </Sider>
          </Layout>
        </Layout>

        <UserModal
          userId={selectedUserId}
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
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


        {isOpenScheduleKPPModal && (
            <Modal
                title="График КПП"
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isOpenScheduleKPPModal}
                onCancel={handleCloseScheduleKPPModal}
                width={'90vw'}
                styles={{
                  body: {
                    height: "70vh",
                    overflowY: "auto"
                  }
                }}
            >
              <div></div>
            </Modal>
        )}
        {isOpenBillListKPPModal && (
            <Modal
                title="Расчетный лист КПП"
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isOpenBillListKPPModal}
                onCancel={handleCloseBillListKPPModal}
                width={'90vw'}
                styles={{
                  body: {
                    height: "70vh",
                    overflowY: "auto"
                  }
                }}
            >
              <div></div>
            </Modal>
        )}
        {isOpenScheduleBuildersModal && (
            <Modal
                title="График строителей"
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isOpenScheduleBuildersModal}
                onCancel={handleCloseScheduleBuildersModal}
                width={'90vw'}
                styles={{
                  body: {
                    height: "70vh",
                    overflowY: "auto"
                  }
                }}
            >
              <div></div>
            </Modal>
        )}
        {isOpenBillListBuildersModal && (
            <Modal
                title="Расчетный лист строителей"
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isOpenBillListBuildersModal}
                onCancel={handleCloseBillListBuildersModal}
                width={'90vw'}
                styles={{
                  body: {
                    height: "70vh",
                    overflowY: "auto"
                  }
                }}
            >
              <div></div>
            </Modal>
        )}

        {isOpenBillListModal && (
          <BillListModal isOpenBillListModal={isOpenBillListModal}
                         handleCloseBillListModal={handleCloseBillListModal}
                         userdata={userdata}
          />
        )}
        {isOpenClaimsModal && (
            <ClaimListModal isOpenClaimsModal={isOpenClaimsModal}
                            handleCloseClaimModal={handleCloseClaimModal}
                            userData={userData}
                            on_click={handleOpenInfo}
                            on_approve={handleApproveEvent}
                            on_decline={handleDeclineEvent}
                            on_edit={handleEditEvent}
                            on_get_back={handleGetBackEvent}
                            doUpdateModal={doUpdateModal}
            />
        )}
        {/*<UserListSidebarDrawer
            target_user_guys={targetUserGuys}
            target_user_info={targetUserInfo}
            userdata={userdata}
            base_user_list_data={baseUserListData}
            open_user_info={openUserInfo}
            on_mark_user={handleMarkUser}
            on_close={setOpenUserInfo}
            target_date={targetDate}
        />*/}
      </div>
  )
}


export default UserList;
