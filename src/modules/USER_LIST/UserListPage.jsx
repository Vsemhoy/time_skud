import React, {useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";

import UserListToolbar from "./components/UserlistToolbar";
import {Affix, Badge, Drawer, Empty, Layout, message, Modal, Skeleton, Table, Tag} from "antd";
import '../../assets/timeskud.css';
import { DS_DEFAULT_USERS, DS_DEPARTMENTS, DS_USERLIST_USERS } from "../../CONFIG/DEFAULTSTATE";
import UserModal from "./components/usermodal";
import {BFF_PORT, CSRF_TOKEN, HTTP_HOST, PRODMODE, ROUTE_PREFIX} from "../../CONFIG/config"
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
import {PhoneOutlined} from "@ant-design/icons";

const TABLE_SKELETON_ROWS = 10;

const UserListStatusIndicator = ({isLoading}) => (
  <div className="sk-userlist-data-status" title={isLoading ? 'Данные подгружаются' : 'Данные загружены'}>
    <span
      className={`sk-userlist-data-status-dot ${isLoading ? 'sk-userlist-data-status-dot--loading' : 'sk-userlist-data-status-dot--ready'}`}
    />
    <span>{isLoading ? 'Данные подгружаются' : 'Данные корректны'}</span>
  </div>
);

const isTruthyFlag = (value) => value === true || value === 1 || value === '1';

const UserListTableSkeleton = ({extendedInfo, showIdColumn = true}) => (
  <div className="sk-userlist-skeleton" aria-hidden="true">
    {Array.from({ length: TABLE_SKELETON_ROWS }).map((_, index) => (
      <div
        className={`sk-userlist-skeleton-row ${extendedInfo ? 'extended' : ''} ${showIdColumn ? '' : 'without-id-column'}`}
        key={`userlist-skeleton-${index}`}
      >
        <Skeleton.Input active size="small" className="sk-userlist-skeleton-phone" />
        {showIdColumn && <Skeleton.Button active size="small" className="sk-userlist-skeleton-id" />}
        <Skeleton.Input active size="small" className="sk-userlist-skeleton-name" />
        <Skeleton.Button active size="small" className="sk-userlist-skeleton-medium" />
        <Skeleton.Button active size="small" className="sk-userlist-skeleton-short" />
        <Skeleton.Button active size="small" className="sk-userlist-skeleton-short" />
        <Skeleton.Button active size="small" className="sk-userlist-skeleton-short" />
        <Skeleton.Button active size="small" className="sk-userlist-skeleton-short" />
        <Skeleton.Button active size="small" className="sk-userlist-skeleton-medium" />
        {extendedInfo && <Skeleton.Input active size="small" className="sk-userlist-skeleton-wide" />}
        {extendedInfo && <Skeleton.Input active size="small" className="sk-userlist-skeleton-wide" />}
        {extendedInfo && <Skeleton.Input active size="small" className="sk-userlist-skeleton-wide" />}
      </div>
    ))}
  </div>
);

const UserListInitialLoader = ({phase}) => (
  <div
    className={`sk-userlist-initial-loader ${phase === 'success' ? 'is-success' : ''} ${phase === 'hidden' ? 'is-hidden' : ''}`}
    aria-hidden={phase === 'hidden'}
  >
    <div className="sk-userlist-initial-loader__spinner">
      <div className="sk-userlist-initial-loader__ring" />
      <div className="sk-userlist-initial-loader__ring sk-userlist-initial-loader__ring--blur" />
      <div className="sk-userlist-initial-loader__center">
        <div className="sk-userlist-initial-loader__tick">
          <div className="sk-userlist-initial-loader__tick-part sk-userlist-initial-loader__tick-part--short" />
          <div className="sk-userlist-initial-loader__tick-part sk-userlist-initial-loader__tick-part--long" />
        </div>
      </div>
    </div>
  </div>
);


const UserList = (props)=>{
  const { userdata } = props;
  const showIdColumn = isTruthyFlag(userdata?.user?.is_admin);
  const HIDDEN_DEPARTMENT_IDS = [17, 18];
  const LIMITED_DEPARTMENT_ID = 19;
  const LIMITED_USER_ID = 583;
  const HIDDEN_USER_IDS = [393];

  /*------- CREATE CLAIMS ----------------------------------------------------------------------------------------------------------------------------*/
  const [isOpenFilters, setIsOpenFilters] = useState(false);
  const [isShowExtendedInfo, setIsShowExtendedInfo] = useState(false);
  const effectiveShowIdColumn = showIdColumn || isShowExtendedInfo;
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
    setEditedClaim(null);
    setEditorMode('create');
    setEditorOpened(true);
    setFormType(key);
    setSelectedClaimId(0);
  }

  const handleEditorOpen = (value) => {
    if (value && value.key){
      let key = parseInt(value.key.replace('clt_', ''));
      setEditedClaim(null);
      setEditorMode('create');
      setEditorOpened(true);
      setFormType(key);
      setSelectedClaimId(0);
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
            title: claimType.title,
            color: claimType.color,
            badge: claimType.badge,
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
    //if (PRODMODE) {
      try {
        let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/aclskud/getMyAcls`,
            {
              _token: CSRF_TOKEN
            });
        setAclBase(response.data.content);
        console.log('response data => ', response.data);
      } catch (e) {
        console.log(e)
      }
    /*} else {
      setAclBase(CLAIM_ACL_MOCK);
      setUserData(USDA);
    }*/
  };

  const fetchClaimTypes = async () => {
    //if (PRODMODE) {
      try {
        let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getstates`,
            {
              _token: CSRF_TOKEN
            });
        setBaseClaimTypes(response.data.content);
        console.log('response data => ', response.data);
      } catch (e) {
        console.log(e)
      }
    /*} else {
      setBaseClaimTypes(CHART_STATES);
    }*/
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

  const handleSaveClaim = async (claim, editmode) => {
    if (editmode === 'create'){
      await create_claim(claim);
    } else if (editmode === 'update'){
      console.log('update claim');
      await update_claim(claim);
    } else if (editmode === 'transfer'){
      await update_claim_state({
        id: claim.update.id,
        state: 3,
      });
      await create_claim(claim.create);
    }
    setEditorOpened(false);
    setTimeout(() => {
      setSelectedClaimId(0);
      console.log(999999999);
    }, 555);
  };

  const create_claim = async (claimObj) => {
    try {
      if (Array.isArray(claimObj)) {
        const responses = await Promise.all(claimObj.map((claim) => PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/createclaim`,
            {
              data: claim,
              _token: CSRF_TOKEN
            })));
        console.log('response data => ', responses.map((response) => response.data));
      } else {
        let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/createclaim`,
            {
              data: claimObj,
              _token: CSRF_TOKEN
            });
        console.log('response data => ', response.data);
      }
      setDoUpdateModal(dayjs().unix());
    } catch (e) {
      console.log(e)
    }
  };

  const update_claim = async (claimObj) => {
    try {
      let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/updateclaim`,
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
      let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/updatestate`,
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
      let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/deleteclaim`,
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
  const [isLoadError, setIsLoadError] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const [isInitialPageLoading, setIsInitialPageLoading] = useState(true);
  const [isInitialDataResolved, setIsInitialDataResolved] = useState(false);
  const [hasCompletedInitialRender, setHasCompletedInitialRender] = useState(false);
  const [initialLoaderPhase, setInitialLoaderPhase] = useState('loading');

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
  const [employeeSearchValue, setEmployeeSearchValue] = useState('');
  

  const sortedUserRef = useRef(userListData);
  const markedUsersRef = useRef(markedUsers);
  const openUserInfoRef = useRef(openUserInfo);
  const tableRef = useRef(null);
  const socketRef = useRef(null);
  const extFiltersRef = useRef(extFilters);
  const initialLoaderSuccessStartedRef = useRef(false);

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
    openUserInfoRef.current = openUserInfo;
  }, [openUserInfo]);

  useEffect(() => {
    extFiltersRef.current = extFilters;
  }, [extFilters]);

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
    //if (PRODMODE){
      get_departments();
      // get_users();
    /*} else {
      setDepartments(DS_DEPARTMENTS);
      // setBaseUserListData(DS_USERLIST_USERS);
    }*/
  },[])

  useEffect(()=>{
    setTargetDate(extFilters.date);
    setIsLoading(true);
    setIsSkeletonLoading(true);
    //if (PRODMODE){
      const debounceTimer = setTimeout(() => {
        get_users(extFilters, { showSkeleton: true });
        }, 500);
        return () => clearTimeout(debounceTimer);
    /*} else {
      //setBaseUserListData(DS_USERLIST_USERS);
      console.log(123)
      setBaseUserListData(USERS_LIST);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }*/

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
        get_users(extFilters, { showSkeleton: false });
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
        console.log('targetUserGuys', targetUserGuys);
    }, [targetUserGuys]);

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
        let response = await PROD_AXIOS_INSTANCE.get(`${ROUTE_PREFIX}/timeskud/departaments/departaments?_token=` + CSRF_TOKEN);
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
    const get_users = async (filters, options = {}) => {
        const { showSkeleton = false } = options;
        setIsLoadError(false);
        setIsLoading(true);
        if (showSkeleton) {
          setIsSkeletonLoading(true);
        }
        try {
            let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/userlist/getusers`, {
                data: filters,
                _token: CSRF_TOKEN
            });
            if (response && response.data){
              setBaseUserListData(response.data.content);
            }
            setIsLoading(false);
            setIsSkeletonLoading(false);
            if (isInitialPageLoading) {
              setIsInitialDataResolved(true);
            }
        } catch (e) {
            console.log(e);
            setIsLoadError(true);
            setIsLoading(false);
            setIsSkeletonLoading(false);
            if (isInitialPageLoading) {
              setIsInitialDataResolved(true);
            }
        } finally {
            // setLoadingOrgs(false)
        }
    }
  /** ------------------ FETCHES END ---------------- */

  useEffect(() => {
    const socket = io(`${HTTP_HOST}:${BFF_PORT}`, {
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    socketRef.current = socket;

    const handleRefreshSkud = () => {
      get_users(extFiltersRef.current, { showSkeleton: false });
    };

    socket.on('connect', () => {
      socket.emit('subscribeToSkud');
    });

    socket.on('REFRESH_SKUD', handleRefreshSkud);

    return () => {
      socket.off('REFRESH_SKUD', handleRefreshSkud);
      socket.emit('unsubscribeToSkud');
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);


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
      }, 1000);
    }
  }

  const handleRefreshUsers = () => {
    get_users(extFiltersRef.current, { showSkeleton: false });
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

  const prioritizeBossInDepartment = (a, b) => {
    if (a.department_id === b.department_id) {
      if (a.id === 46) {
        return -1;
      }
      if (b.id === 46) {
        return 1;
      }
    }

    return null;
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
  const filterVisibleDepartments = (departmentList) => {
    return (departmentList ?? []).filter((department) => !HIDDEN_DEPARTMENT_IDS.includes(Number(department?.id)));
  };

  const filterVisibleUsers = (userList) => {
    return (userList ?? []).filter((user) => {
      const departmentId = Number(user?.department_id);
      const userId = Number(user?.id);

      if (HIDDEN_USER_IDS.includes(userId)) {
        return false;
      }

      if (HIDDEN_DEPARTMENT_IDS.includes(departmentId)) {
        return false;
      }

      if (departmentId === LIMITED_DEPARTMENT_ID) {
        return userId === LIMITED_USER_ID;
      }

      return true;
    });
  };

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

  const filterUserListByEmployeeSearch = (userList, searchValue) => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return userList;
    }

    return userList.filter((user) => {
      const searchableText = [
        user.surname,
        user.name,
        user.patronymic,
        user.user_surname,
        user.user_name,
        user.user_patronymic,
        user.position,
        user.department_name,
        user.tabnum,
        user.id,
        user.user_id,
      ]
        .filter((value) => value != null)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  }

  const getDepartmentRankById = (id) => {
    const department = departments.find((dept) => Number(dept.id) === Number(id));
    return department?.rang ?? Number.MAX_SAFE_INTEGER;
  };

  const compareDepartmentOrder = (a, b, direction = 'asc') => {
    const rankA = getDepartmentRankById(a.department_id);
    const rankB = getDepartmentRankById(b.department_id);

    if (rankA !== rankB) {
      return direction === 'desc' ? rankB - rankA : rankA - rankB;
    }

    return direction === 'desc'
      ? b.department_id - a.department_id
      : a.department_id - b.department_id;
  };

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
      userList = filterVisibleUsers(userList);
      userList = filterUserListByEmployeeSearch(userList, employeeSearchValue);

      // SortData
      let sortedData = userList ?? [];
      switch (innerSortByValue) {
          case "department_asc":
              sortedData.sort((a, b) => {
                const prioritySort = prioritizeBossInDepartment(a, b);
                if (prioritySort !== null) {
                  return prioritySort;
                }
                if (a.department_id === b.department_id) {
                  return b.rang - a.rang;
                }
                return compareDepartmentOrder(a, b, 'asc');
              });
              sortedData = insertDepartmentNames(sortedData);
              break;

          case "department_desc":
              sortedData.sort((a, b) => {
                const prioritySort = prioritizeBossInDepartment(a, b);
                if (prioritySort !== null) {
                  return prioritySort;
                }
                if (a.department_id === b.department_id) {
                  return b.rang - a.rang;
                }
                return compareDepartmentOrder(a, b, 'desc');
              });
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
            const prioritySort = prioritizeBossInDepartment(a, b);
            if (prioritySort !== null) {
              return prioritySort;
            }
            if (a.department_id === b.department_id) {
              return b.rang - a.rang;
            }
            return compareDepartmentOrder(a, b, 'asc');
          });
          sortedData = insertDepartmentNames(sortedData);
          break;
      }


    console.log('sorted', sortedData)
      return sortedData;
  }, [userListData, innerSortByValue, innerFilters, employeeSearchValue]);

  const navigableUsers = useMemo(() => {
    return filteredUsers.filter((item) => item?.id != null && item?.type !== 'header');
  }, [filteredUsers]);

  useEffect(() => {
    sortedUserRef.current = navigableUsers;
  }, [navigableUsers]);

  useEffect(() => {
    if (!isInitialPageLoading || initialLoaderSuccessStartedRef.current || !isInitialDataResolved || isLoading || isSkeletonLoading) {
      return;
    }

    let hideTimeoutId = null;
    let unmountTimeoutId = null;
    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        initialLoaderSuccessStartedRef.current = true;
        setHasCompletedInitialRender(true);
        setInitialLoaderPhase('success');
        hideTimeoutId = setTimeout(() => {
          setInitialLoaderPhase('hidden');
          unmountTimeoutId = setTimeout(() => {
            setIsInitialPageLoading(false);
          }, 500);
        }, 900);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
      }
      if (unmountTimeoutId) {
        clearTimeout(unmountTimeoutId);
      }
    };
  }, [isInitialPageLoading, isInitialDataResolved, isLoading, isSkeletonLoading]);

  const shouldShowTableSkeleton = isSkeletonLoading && hasCompletedInitialRender;

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
        {isInitialPageLoading && <UserListInitialLoader phase={initialLoaderPhase} />}
        <Layout className={'layout'}>
          <Header className={'header-user-list'}>
            <Affix>
              <UserListToolbar
                // onSortBy={sortUserList}
                departments={filterVisibleDepartments(departments)}
                baseUsers={baseUserListData}
                userData={userdata}
                on_find_me={handleFindMe}
                on_refresh={handleRefreshUsers}
                employeeSearchValue={employeeSearchValue}
                onEmployeeSearchChange={setEmployeeSearchValue}
                im_exist={userListData.find((item)=>  item.id === userdata.user.id) != null}
                onChangeExternalFilters={toggleExternalFilters}
                onChangeInnerSort={toggleInnerSorts}
                onChangeInnerFilers={toggleInnerFilters}
                command={toolbarCommand}
                isLoading={isLoading}
                isLoadError={isLoadError}

                isOpenFilters={isOpenFilters}
                setIsOpenFilters={(value) => setIsOpenFilters(value)}
                handleEditorOpenCreate={handleEditorOpenCreate}
                menuProps={menuProps}

                openClaimsModal={handleOpenClaimsModal}
                openBillListModal={handleOpenBillListModal}
              />
            </Affix>
          </Header>
          <Layout className="sk-layout-center">
            <Sider width={isOpenFilters ? "330px" : 0}
                   className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}
                   style={{
                     paddingTop: '0',
                     visibility: isOpenFilters ? 'visible' : 'hidden',
                     pointerEvents: isOpenFilters ? 'auto' : 'none',
                   }}
            >
              <Affix offsetTop={80}>
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
                  {filteredUsers.length === 0 && !isLoading && !isSkeletonLoading ? (
                      <Empty />
                  ):(
                      <div>
                        <Affix offsetTop={80}>
                          <div className="sk-userlist-table-header-wrap">
                            <div
                                className={`sk-usermonic-cardrow-ou-test sk-usermonic-headerrow ${isShowExtendedInfo ? 'extended' : ''} ${effectiveShowIdColumn ? '' : 'without-id-column'}`}>

                            <div
                              className="sk-userlist-phone-cell"
                              onClick={() => {
                                toggleSelectedColumn(3)
                              }}
                            >
                              <div className={`${selectedColumns.includes(3) ? "sk-col-selected" : ""}`} title="Телефон">
                                <PhoneOutlined />
                              </div>
                            </div>

                            {effectiveShowIdColumn && (
                              <div className="sk-userlist-id-cell" onClick={() => {
                                toggleSelectedColumn(1)
                              }}>
                                <div style={{paddingLeft: '9px'}}
                                     className={`${selectedColumns.includes(1) ? "sk-col-selected" : ""}`}
                                >id
                                </div>
                              </div>
                            )}

                            <div className="sk-userlist-employee-cell" onClick={() => {
                              toggleSelectedColumn(2)
                            }}>
                              <div className={`${selectedColumns.includes(2) ? "sk-col-selected" : ""}`}
                                   style={{textAlign: 'left'}}>
                                Сотрудник
                              </div>
                            </div>

                            <div
                                className="sk-userlist-claims-cell"
                                title="Заявки"
                                onClick={() => {
                                  toggleSelectedColumn(20)
                                }}
                            >
                              <div className={`${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}>
                                Заявки
                              </div>
                            </div>

                            <div className="sk-userlist-legacy-phone-header" onClick={() => {
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
                                className={`${selectedColumns.includes(22) ? "sk-col-selected" : ""}`}
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

                            <div
                                className={`sk-userlist-lost-time-cell ${selectedColumns.includes(16) ? "sk-col-selected" : ""}`}
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

                            <div title='Заявки' className={`sk-userlist-legacy-claims-header ${selectedColumns.includes(20) ? "sk-col-selected" : ""}`}
                            >Заявки
                            </div>

                          </div>
                        </div>
                        </Affix>
                        {shouldShowTableSkeleton ? (
                          <UserListTableSkeleton extendedInfo={isShowExtendedInfo} showIdColumn={effectiveShowIdColumn} />
                        ) : filteredUsers.length === 0 ? (
                          <div className="sk-userlist-empty-state">
                            <Empty description="Нет данных для отображения" />
                          </div>
                        ) : (
                          filteredUsers.map((arche, index) =>
                              (
                                  <UserMonitorListCard
                                      key={`usmcard_${arche.id !== undefined ? arche.id : arche.key}`}
                                      data={arche}
                                      on_mark_user={handleMarkUser}
                                      on_claim_click={handleOpenInfo}
                                    marked_users={markedUsers}
                                    its_me={userdata.user.id === arche.id}
                                    on_double_click={handleShowUserInfo}
                                    selected_columns={selectedColumns}
                                    extendedInfo={isShowExtendedInfo}
                                    show_id_column={effectiveShowIdColumn}
                                    current_user_id={userdata.user.id}
                                  />
                            ))
                        )}
                      </div>
                  )}
              </div>
            </Content>
            <Sider width={openUserInfo ? "330px" : 0}
                   className={`sider ${openUserInfo ? '' : 'sider-hidden'} pl15`}
                   style={{
                     paddingTop: '0',
                     visibility: openUserInfo ? 'visible' : 'hidden',
                     pointerEvents: openUserInfo ? 'auto' : 'none',
                   }}
            >
              <Affix offsetTop={80}>
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
            current_user={userData?.user}
            on_get_back={handleGetBackEvent}
            on_approve={handleApproveEvent}
            on_decline={handleDeclineEvent}
        />


        {isOpenBillListModal && (
          <BillListModal isOpenBillListModal={isOpenBillListModal}
                         handleCloseBillListModal={handleCloseBillListModal}
                         userdata={userdata}
                         user_list={baseUserListData}
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
      </div>
  )
}


export default UserList;
