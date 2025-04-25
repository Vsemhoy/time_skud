
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

  const [alertNotShowDate, setAlertNotShowDate] = useCookieState('skud_alert_notshow_date', "");

  const [userAct, setUserAct] = useState(!PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [notificatorOpened, setNotificatorOpened] = useState(false);
  const [notificatorLoading, setNotificatorLoading] = useState(true);
  const [countOfNotifications, setCountOfNotifications] = useState(0);

  const [historyStack, setHistoryStack] = useState([]);
  
  /**
   * Текущий адрес страницы
   */
  // const [location, setLocation] = useState((new URLSearchParams(window.location.search)).get('location') ? (new URLSearchParams(window.location.search)).get('location') : 'userlist');
  

  // const handleStateChange = (e) => {
  //   setState({ value: e.target.value });
  // };

  const setLocation = (value) => {
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

  // Инициализация при монтировании
  useEffect(() => {
    const initialParams = new URLSearchParams(window.location.search);
    const initialLocation = initialParams.get('location') || '';
    setHistoryStack([initialLocation]);
  }, []);


    // CHANGE PAGE
    useEffect(()=>{
      
    },[state.target_page]);

    // Чтение параметра из URL при монтировании компонента
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const value = searchParams.get('location'); // Измените на 'locate', если нужно
      if (value) {
          setLocation(value);
      } else {
          setLocation('userlist'); // Установка корневой страницы
      }
      console.log('start page is', value);
  }, []);

  // Обработчик изменений location
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    query.set('location', state.location);
    
    // Обновляем URL без создания новой записи истории
    window.history.replaceState({}, '', `?${query}`);
    
    // Добавляем в историю только новые значения
    setHistoryStack(prev => [...prev, state.location].slice(-10)); // Ограничиваем глубину истории
  }, [state.location]);

  // Обработка навигации назад
  useEffect(() => {
    const handlePopState = () => {
      setHistoryStack(prev => {
        if (prev.length < 2) return prev;
        
        const newStack = [...prev];
        newStack.pop(); // Удаляем текущий элемент
        const lastLocation = newStack[newStack.length - 1];
        
        setLocation(lastLocation); // Обновляем состояние
        return newStack;
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);



  const showNotyBar = () => {
    setNotificatorOpened(true);
    setNotificatorLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setNotificatorLoading(false);
    }, 2000);
  };


  const setRoute = (location)=>{
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
              onClick={()=>{ setLocation('notificator')}}
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
          <Menu.SubMenu key="menu1" title="Персональный раздел">
            <MenuItem
            key={'menu_52d34'}>
              <Link
                onClick={()=>{ setLocation('profile')}}
              >Моё</Link>
            </MenuItem>

            <MenuItem
            key={'menu_52s34'}>
              <Link 
                onClick={()=>{ setLocation('userlist')}}
              >Сотрудники</Link>
            </MenuItem>

            <MenuItem
            key={'menu_52d3994'}>
              <Link
                onClick={()=>{ setLocation('statistics')}}
              >Статистика</Link>
            </MenuItem>

          </Menu.SubMenu>
          <Menu.SubMenu key="menu2" title="Управление сотрудниками">
          <MenuItem
            key={'menu_5234734565'}>
              <Link 
              onClick={()=>{ setLocation('usermanager')}}
              >Управление пользователями</Link>
            </MenuItem>

          <MenuItem
            key={'menu_52342'}>
              <Link 
              onClick={()=>{ setLocation('rulemanager')}}
              >Правила</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5234qq'}>
              <Link 
              onClick={()=>{ setLocation('schedulemanager')}}
              >Графики</Link>
            </MenuItem>



            <MenuItem
            key={'menu_235234'}>
              <Link 
              onClick={()=>{ setLocation('prodcalendars')}}
              >Календари</Link>
            </MenuItem>


            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('schedulemanager')}}
              >Заявки на смену графика</Link>
            </MenuItem> 

            <MenuItem
            key={'menu_5234765'}>
              <Link 
              onClick={()=>{ setLocation('groupmanager')}}
              >Группы пользоваателей</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5235644'}>
              <Link 
              onClick={()=>{ setLocation('superadmin/randomixer')}}
              >RMXR</Link>
            </MenuItem>

            <MenuItem
            key={'menu_523566744'}>
              <Link 
              onClick={()=>{ setLocation('eventmonitor')}}
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
            {state.location === '' && <UserListPage userdata={userAct} />}
            {state.location === 'profile' && <AccountPage userdata={userAct} />}
            {state.location === 'statistics' && <UserStatisticsPage userdata={userAct} />}
            {state.location === 'admin' && <AdminPage />}
            {state.location === 'rulemanager' && <RuleManagerPage userdata={userAct} />}
            {state.location === 'schedulemanager' && <SchedManagerPage userdata={userAct} />}
            {state.location === 'usermanager' && <UserManagerPage userdata={userAct} setRoute={setRoute} />}
            {state.location === 'prodcalendars' && <ProdCalManagerPage userdata={userAct} />}
            {state.location === 'userlist' && <UserListPage userdata={userAct}  />}
            {state.location === 'groupmanager' && <GroupManagerPage userdata={userAct} />}
            {state.location === 'superadmin/randomixer' && <EventRandomixer userdata={userAct} />}
            {state.location === 'notificator' && <NotifierPage userdata={userAct} />}


            {state.location === 'eventmonitor' && <EventMonitorPage userdata={userAct} />}

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
