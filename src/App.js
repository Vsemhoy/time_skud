
import './App.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter
} from "react-router-dom";
import HomePage from './modules/DEFAULT_PAGE/HomePage';
import UserListPage from './modules/USER_LIST/UserListPage';
import UserPage from './modules/USER_PAGE/UserPage';
import { Breadcrumb, Layout, Menu, Skeleton, theme, Input, Dropdown, Avatar, Drawer, Button, Badge, Alert } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { DS_USER } from './CONFIG/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import { BASE_NAME, BASE_ROUTE, CSRF_TOKEN, HTTP_ROOT, PRODMODE } from './CONFIG/config';
import CalendarPage from './modules/CALENDAR/CalendarPage';
import RuleManagerPage from './modules/RULE_MANAGER/RuleManagerPage';
import SchedManagerPage from './modules/SCHED_MANAGER/SchedManagerPage';
import ProdCalManagerPage from './modules/PROD_CAL_MANAGER/ProdCalManagerPage';
import GroupManagerPage from './modules/GROUP_MANAGER/GroupManagerPage';
import EventRandomixer from './modules/EVENT_RANDOMIXER/EventRandomixer';
import AccountPage from './modules/ACCOUNT/AccountPage';
import Search from 'antd/es/input/Search';
import { HomeOutlined, LogoutOutlined, NotificationOutlined, SettingOutlined, SmileOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';
import NotifierPage from './modules/NOTIFIER/NotifierPage';
import UserManagerPage from './modules/USER_MANAGER/UserManagerPage';
import EventMonitorPage from './modules/EVENT_MONITOR_SK/EventMonitorPage';

import { StateContext } from './components/ComStateProvider25/ComStateProvider25';
import ParseRoute from './components/HybridEmbeddedRouter/RouteParser';

import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import UserStatisticsPage from './modules/USER_STATISTICS/UserStatisticsPage';
import ClaimManagerPage from './modules/CLAIM_MANAGER_SK/ClaimManagerPage';

import useWebSocket from 'react-use-websocket';
import AppMenu23 from './components/TimeSkud/AppMenu23/AppMenu23';
import AclSkud from './modules/ADMIN/ACLSKUD/AclSkudPage';
import AclSkudPage2 from './modules/ADMIN/ACLSKUD/AclSkudPage2';
const WS_URL = 'ws://192.168.1.16:5002';

const { Header, Content, Footer } = Layout;




const useCookieState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const saved = Cookies.get(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    Cookies.set(key, JSON.stringify(state), { expires: 365 }); // Храним год
  }, [key, state]);

  return [state, setState];
};







function App() {
  const menuItems = [];



  const { state, setState } = useContext(StateContext);

  console.log('state', state)

  const [pages, setPages] = useState({
    userListPage: {
        id: 1,
        rendered: true,
        name: 'userlist',
        ruName: 'Список сотрудников',
    },
    personalPage: {
        id: 2,
        rendered: false,
        name: 'personal',
        ruName: 'Личный кабинет',
    },
    statisticPage: {
        id: 3,
        rendered: false,
        name: 'statistic',
        ruName: 'Статистика',
    },
    claimPage: {
        id: 4,
        rendered: false,
        name: 'claims',
        ruName: 'Менеджер раявок',
    },
    scheduleManagerPage: {
        id: 5,
        rendered: false,
        name: 'schedules',
        ruName: 'Графики работы',
    },
    userManagerPage: {
        id: 6,
        rendered: false,
        name: 'usermanager',
        ruName: 'Настройки учёта РВ пользователей',
    },
    calendarManagerPage: {
        id: 7,
        rendered: false,
        name: 'prodcalendars',
        ruName: 'Производственные календари',
    },
    eventMonitorPage: {
        id: 8,
        rendered: false,
        name: 'eventmonitor',
        ruName: 'Монитор событий',
    },
    notificatorPage: {
        id: 8,
        rendered: false,
        name: 'notificator',
        ruName: 'Нотификатор',
    },
    groupManagerPage: {
        id: 9,
        rendered: false,
        name: 'groupmanager',
        ruName: 'Группы для группировки пользователей',
    },
    ruleManagetPage: {
        id: 10,
        rendered: false,
        name: 'rules',
        ruName: 'Правила учёта рабочего времени',
    }
  });

  const [alertNotShowDate, setAlertNotShowDate] = useCookieState('skud_alert_notshow_date', "");

  const [userAct, setUserAct] = useState(!PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(false);


  // const [historyStack, setHistoryStack] = useState([]);
  

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log('Соединение открыто'),
    shouldReconnect: () => true,
  });

  const [actionUpdateEvents, setActionUpdateEvents] = useState(null);




  /**
   * Текущий адрес страницы
   */

  

  // useEffect(() => {
  //   const handleLocationChange = () => {
  //     const searchParams = new URLSearchParams(window.location.search);
  //     const locationParam = searchParams.get('location');
      
  //     if (locationParam) {
  //       const path = decodeURIComponent(searchParams);
  //       const newState = ParseRoute(path);

  //       console.log('newState:', newState);
  //       setState(newState);
  //     }
  //   };

  //   // Обрабатываем начальный URL
  //   handleLocationChange();

  //   // Подписываемся на изменения истории
  //   window.addEventListener('popstate', handleLocationChange);
    
  //   return () => {
  //     window.removeEventListener('popstate', handleLocationChange);
  //   };
  // }, []);





// // 1. При монтировании: синхронизировать state.location с URL
// useEffect(() => {
//   const searchParams = new URLSearchParams(window.location.search);
//   const currentLocation = searchParams.get('location') || 'userlist';
//   setLocation(currentLocation);

//   const handlePopState = () => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const currentLocation = searchParams.get('location') || 'userlist';
//     setLocation(currentLocation);
//   };
//   window.addEventListener('popstate', handlePopState);
//   return () => window.removeEventListener('popstate', handlePopState);
// }, []);

// // 2. При смене страницы (только по клику/действию)
// const changePage = (pageId) => {
//   const activePage = Object.values(pages).find(page => page.id === pageId);
//   if (activePage) {
//     const newUrl = `${window.location.pathname}?location=${encodeURIComponent(activePage.name)}`;
//     window.history.pushState({}, '', newUrl);
//     setLocation(activePage.name);
//   }
// };






  useEffect(() => {
    if (lastMessage && lastMessage.data) {
      let msData = JSON.parse(lastMessage.data);
      console.log('Получено сообщение:', msData);
      // Trig на обновление списков пользователей
      if (msData.action === 'UPDATE_EVENTS'){
        setActionUpdateEvents(dayjs().unix());
        console.log('Update triggers', msData);
      }
    }
  }, [lastMessage]);







  
/** ------------------ FETCHES ---------------- */
    /**
     * Получение списка отделов
     * @param {*} req 
     * @param {*} res 
     */
    const get_userdata = async (req, res) => {
      try {
          // setLoadingOrgs(true)
          const format_data = {
              CSRF_TOKEN,
              data: {
                  // ...filters,
                  // created_date: get_unix_by_datearray(filters.created_date),
                  // active_date: get_unix_by_datearray(filters.active_date)
              }
          }
          let response = await PROD_AXIOS_INSTANCE.get('/usda?_token=' + CSRF_TOKEN);
          console.log('me: ', response);
          // setOrganizations(organizations_response.data.org_list)
          // setTotal(organizations_response.data.total_count)
          setUserAct(response.data);
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
          setPageLoaded(true);
      }
  }




  /** ------------------ FETCHES END ---------------- */


      // EFFECTS
      useEffect(() => {
        PRODMODE && get_userdata(setUserAct)
    }, []);



    

  return (
    <Layout style={{background: '#fff'}}>
        <BrowserRouter basename={ BASE_NAME}>
          <div >

       <AppMenu23 
        user_act={userAct}
       />
      <h1>{BASE_ROUTE}</h1>

      {alertNotShowDate !== dayjs().format("YYYY-MM-DD") && (
        <Alert
          message=<div className='sk-flex-space'>
          <span>"Возможно Вы забыли приложить карту при входе в офис"</span>
          <Button
            style={{marginRight: '12px'}}
            size={'small'}
            danger
            onClick={()=>{
              setAlertNotShowDate(dayjs().format("YYYY-MM-DD"));
            }}
          >
            Не показывать сегодня
          </Button>
          </div>
          banner  type="error"
          closable
        />
      )}
      <Content style={{ padding: '0 48px' }}>
        
        
          { pageLoaded || !PRODMODE ? (
        <div>
            {/* {location === '' && <HomePage />} */}
            {/* {location === 'home' && <HomePage />} */}
            {/* {state.location === '' && <UserListPage userdata={userAct} refresh_trigger={actionUpdateEvents}/>}
            {state.location === 'personal' && <AccountPage userdata={userAct} />}
            {state.location === 'statistic' && <UserStatisticsPage userdata={userAct} />}
            {state.location === 'rules' && <RuleManagerPage userdata={userAct} />}
            {state.location === 'schedules' && <SchedManagerPage userdata={userAct} />}
            {state.location === 'usermanager' && <UserManagerPage userdata={userAct} setRoute={()=>{console.log('999')}} />}
            {state.location === 'calendars' && <ProdCalManagerPage userdata={userAct} />}
            {state.location === 'userlist' && <UserListPage userdata={userAct} refresh_trigger={actionUpdateEvents}/>}
            {state.location === 'groups' && <GroupManagerPage userdata={userAct} />}
            {state.location === 'superadmin/randomixer' && <EventRandomixer userdata={userAct} />}
            {state.location === 'notificator' && <NotifierPage userdata={userAct} />}

            {state.location === 'claims' && <ClaimManagerPage userdata={userAct} />}

            {state.location === 'aclskud' && <AclSkud userdata={userAct} />}
            {state.location === 'aclskud2' && <AclSkudPage2 userdata={userAct} />}

            {state.location === 'eventmonitor' && <EventMonitorPage userdata={userAct} refresh_trigger={actionUpdateEvents}/>} */}
            {/* {!state.location && <NotFoundPage />} */}

          </div>
          ) : (
            <div>
              <Skeleton />
            </div>
          )} 
        
          
          <Routes>
          <Route path={BASE_ROUTE + '/'} element={<UserListPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/my'} element={<AccountPage userdata={userAct}/>} />

            <Route path={BASE_ROUTE + '/claims'} element={<ClaimManagerPage userdata={userAct}/>} />

            <Route path={BASE_ROUTE + '/hr/groups'} element={<GroupManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/calendars'} element={<ProdCalManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/schedules'} element={<SchedManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/rules'} element={<RuleManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/notify'} element={<NotifierPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/usersettings'} element={<UserManagerPage userdata={userAct}/>} />

            

            <Route path={BASE_ROUTE + '/monitor/events'} element={<EventMonitorPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/monitor/stat'} element={<UserStatisticsPage userdata={userAct}/>} />


            <Route path={BASE_ROUTE + '/admin/aclold'}  element={<AclSkud userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/admin/aclskud'} element={<AclSkudPage2 userdata={userAct}/>} />            
            
            <Route path={'/'} element={<UserListPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={'/my'} element={<AccountPage userdata={userAct}/>} />

            <Route path={'/claims'} element={<ClaimManagerPage userdata={userAct}/>} />

            <Route path={'/hr/groups'} element={<GroupManagerPage userdata={userAct}/>} />
            <Route path={'/hr/calendars'} element={<ProdCalManagerPage userdata={userAct}/>} />
            <Route path={'/hr/schedules'} element={<SchedManagerPage userdata={userAct}/>} />
            <Route path={'/hr/rules'} element={<RuleManagerPage userdata={userAct}/>} />
            <Route path={'/hr/notify'} element={<NotifierPage userdata={userAct}/>} />
            <Route path={'/hr/usersettings'} element={<UserManagerPage userdata={userAct}/>} />

            

            <Route path={'/monitor/events'} element={<EventMonitorPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={'/monitor/stat'} element={<UserStatisticsPage userdata={userAct}/>} />


            <Route path={'/admin/aclold'}  element={<AclSkud userdata={userAct}/>} />
            <Route path={'/admin/aclskud'} element={<AclSkudPage2 userdata={userAct}/>} />
          </Routes>
          
        
        {/* <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<UserList userdata={userAct}/>} />
          <Route path="/page" element={<UserPage />} />
          </Routes> */}
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer> */}


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}


      </div>



      </BrowserRouter>
    </Layout>
  );
}

export default App;



