
import './App.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import HomePage from './modules/DEFAULT_PAGE/HomePage';
import UserListPage from './modules/USER_LIST/UserListPage';
import UserPage from './modules/USER_PAGE/UserPage';
import { Breadcrumb, Layout, Menu, Skeleton, theme, Input, Dropdown, Avatar, Drawer, Button, Badge, Alert } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { DS_USER } from './CONFIG/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import { CSRF_TOKEN, HTTP_ROOT, PRODMODE } from './CONFIG/config';
import AdminPage from './modules/ADMIN/AdminPage';
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

import { StateContext, StateProvider } from './GlobalComponents/providers/StateProvider';


import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import UserStatisticsPage from './modules/USER_STATISTICS/UserStatisticsPage';
import ClaimManagerPage from './modules/CLAIM_MANAGER_SK/ClaimManagerPage';

import useWebSocket from 'react-use-websocket';
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
  const [notificatorOpened, setNotificatorOpened] = useState(false);
  const [notificatorLoading, setNotificatorLoading] = useState(true);
  const [countOfNotifications, setCountOfNotifications] = useState(0);

  // const [historyStack, setHistoryStack] = useState([]);
  

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log('Соединение открыто'),
    shouldReconnect: () => true,
  });

  const [actionUpdateEvents, setActionUpdateEvents] = useState(null);



  const setLocation = (value) => {
    console.log('SETLOCATOR ', value);
    setState(prevState => ({
      ...prevState,
      location: value
    }));
    if (value !== 'profile'){
      setState(prevState => ({
        ...prevState,
        target_user: null
      }));
    }
  }




  // Обработчик изменений location
  useEffect(() => {
    console.log('STATER');
    const query = new URLSearchParams(window.location.search);
    console.log('STATELOCATION', state.location);
    if (state.location){
      query.set('location', state.location);
      // Обновляем URL без создания новой записи истории
      window.history.replaceState({}, '', `?${query}`);
      // Добавляем в историю только новые значения
      // setHistoryStack(prev => [...prev, state.location].slice(-10)); // Ограничиваем глубину истории
    }
  }, [state.location]);




// 1. При монтировании: синхронизировать state.location с URL
useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const currentLocation = searchParams.get('location') || 'userlist';
  setLocation(currentLocation);

  const handlePopState = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentLocation = searchParams.get('location') || 'userlist';
    setLocation(currentLocation);
  };
  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, []);

// 2. При смене страницы (только по клику/действию)
const changePage = (pageId) => {
  const activePage = Object.values(pages).find(page => page.id === pageId);
  if (activePage) {
    const newUrl = `${window.location.pathname}?location=${encodeURIComponent(activePage.name)}`;
    window.history.pushState({}, '', newUrl);
    setLocation(activePage.name);
  }
};






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




  const showNotyBar = () => {
    setNotificatorOpened(true);
    setNotificatorLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setNotificatorLoading(false);
    }, 2000);
  };


  const setRoute = (location)=>{
    console.log('SET_ROUTE ', location);
    setLocation(location);
  }

  
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


    const userMenu = (
      <Menu>
        <Menu.Item key="status">Статус: Онлайн</Menu.Item>
        {/* <Menu.Item key="settings" icon={<SettingOutlined />}>
          Настройки
        </Menu.Item> */}
        {/* <Menu.Item key="block" icon={<ThunderboltOutlined />}>
          Заблокировать
        </Menu.Item> */}
        <Menu.Item key="block" icon={<ThunderboltOutlined />}>
        <Link 
              onClick={()=>{ changePage(8)}}
              >Нотификатор</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />}>
          Выйти
        </Menu.Item>
      </Menu>
    );
    

  return (
    <Layout style={{background: '#fff'}}>
          <Router>
          <div >

      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className={'sk-main-menu'}
      >
        {/* Первая группа */}
        <Menu mode="horizontal" style={{ background: '#00000000', flex: 1}}>
          <Menu.Item key="home" icon={<HomeOutlined  style={{ fontSize: '20px', color: '#3b3b3b', marginTop: '6px',
           textAlign: 'center', paddingLeft: '6px' }} />} ><a href={HTTP_ROOT}></a></Menu.Item>
          <Menu.SubMenu key="menu1" title="Моё">
            <MenuItem
            key={'menu_52d34ds'}>
              <Link
                onClick={()=>{ changePage(2)}}
              >Моё</Link>
            </MenuItem>

            <MenuItem
            key={'menu_52s34'}>
              <Link 
                onClick={()=>{ changePage(1)}}
              >Сотрудники</Link>
            </MenuItem>

            <MenuItem
            key={'menu_52d3994'}>
              <Link
                onClick={()=>{ changePage(3)}}
              >Статистика</Link>
            </MenuItem>

          </Menu.SubMenu>

          <Menu.SubMenu key="menu109" title="Администратор">
            <MenuItem
            key={'menu_52d34'}>
              <Link
                onClick={()=>{ changePage(4)}}
              >Администрирование заявок</Link>
            </MenuItem>



          </Menu.SubMenu>


          <Menu.SubMenu key="menu2" title="Персонал">
          <MenuItem
            key={'menu_5234734565'}>
              <Link 
              onClick={()=>{ changePage(6)}}
              >Управление пользователями</Link>
            </MenuItem>

          <MenuItem
            key={'menu_52342'}>
              <Link 
              onClick={()=>{ changePage(10)}}
              >Правила</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5234qq'}>
              <Link 
              onClick={()=>{ changePage(5)}}
              >Графики</Link>
            </MenuItem>



            <MenuItem
            key={'menu_235234'}>
              <Link 
              onClick={()=>{ changePage(7)}}
              >Календари</Link>
            </MenuItem>


            <MenuItem>
              <Link 
              onClick={()=>{ changePage(1)}}
              >Заявки на смену графика</Link>
            </MenuItem> 

            <MenuItem
            key={'menu_5234765'}>
              <Link 
              onClick={()=>{ changePage(9)}}
              >Группы пользоваателей</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5235644'}>
              <Link 
              onClick={()=>{ changePage(4)}}
              >RMXR</Link>
            </MenuItem>

            <MenuItem
            key={'menu_523566744'}>
              <Link 
              onClick={()=>{ changePage(8)}}
              >Монитор событий</Link>
            </MenuItem>
          </Menu.SubMenu>
        </Menu>

        {/* Вторая группа */}
        {/* <Input.Search placeholder="Поиск" style={{ maxWidth: '200px', margin: '0 20px' }} /> */}

        {/* Третья группа */}
        <div style={{ display: 'flex', alignItems: 'center'}}>
          {/* <input value={state.text} onChange={(e)=>{ setState(prevState => ({
                                                              ...prevState,
                                                              text: e.target.value
                                                            }))}}/>
          <input value={state.target_page} onChange={(e)=>{ setState({target_page: e.target.value})}}/>
          <span>{state.text}</span>
          <span>{state.target_page}</span> */}
            <div onClick={showNotyBar} style={{ cursor: "pointer", marginRight: '24px'}}>
            <Badge count={countOfNotifications} offset={[2, 24]}>
            <Avatar style={{ backgroundColor: '#33333300', marginRight: '0px' }}>
                { userAct ? (
                  // <SmileOutlined  style={{ fontSize: '36px', color: '#08c' }} />
                  <NotificationOutlined style={{ fontSize: '36px', color: '#3d3d3d' }} />
                ) : (
                  <ThunderboltOutlined />
                )}
              </Avatar>
              </Badge>
            </div>

          <Dropdown overlay={userMenu} trigger={['hover']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {/* <Avatar style={{ backgroundColor: '#87d068', marginRight: '8px' }}>
                { userAct ? (
                  // <SmileOutlined  style={{ fontSize: '36px', color: '#08c' }} />
                  <NotificationOutlined />
                ) : (
                  <ThunderboltOutlined />
                )}
              </Avatar> */}
              { userAct && userAct.user ? (
                <span style={{fontWeight: 500, color: "#3d3d3d"}}>{userAct.user.name} {userAct.user.patronymic}</span>
              ) : (
              <span>Пользователь</span>

              )}
            </div>
          </Dropdown>
        </div>
      </Header>
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
            {state.location === '' && <UserListPage userdata={userAct} refresh_trigger={actionUpdateEvents}/>}
            {state.location === 'personal' && <AccountPage userdata={userAct} />}
            {state.location === 'statistic' && <UserStatisticsPage userdata={userAct} />}
            {state.location === 'admin' && <AdminPage />}
            {state.location === 'rules' && <RuleManagerPage userdata={userAct} />}
            {state.location === 'schedules' && <SchedManagerPage userdata={userAct} />}
            {state.location === 'usermanager' && <UserManagerPage userdata={userAct} setRoute={setRoute} />}
            {state.location === 'prodcalendars' && <ProdCalManagerPage userdata={userAct} />}
            {state.location === 'userlist' && <UserListPage userdata={userAct} refresh_trigger={actionUpdateEvents}/>}
            {state.location === 'groupmanager' && <GroupManagerPage userdata={userAct} />}
            {state.location === 'superadmin/randomixer' && <EventRandomixer userdata={userAct} />}
            {state.location === 'notificator' && <NotifierPage userdata={userAct} />}

            {state.location === 'claims' && <ClaimManagerPage userdata={userAct} />}

            {/* {!state.location && <NotFoundPage />} */}
            {state.location === 'eventmonitor' && <EventMonitorPage userdata={userAct} refresh_trigger={actionUpdateEvents}/>}

          </div>
          ) : (
            <div>
              <Skeleton />
            </div>
          )} 
        

        
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


      <Drawer
        closable
        destroyOnClose
        title={<p>Уведомления</p>}
        placement="right"
        open={notificatorOpened}
        loading={notificatorLoading}
        onClose={() => setNotificatorOpened(false)}
      >
        <Button type="primary" style={{ marginBottom: 16 }} onClick={showNotyBar}>
          Reload
        </Button>
        <p>Новых уведомлений не найдено...</p>
      </Drawer>


      </div>
    </Router>
    </Layout>
  );
}

export default App;
