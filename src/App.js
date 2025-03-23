
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import HomePage from './modules/DEFAULT_PAGE/HomePage';
import UserListPage from './modules/USER_LIST/UserListPage';
import UserPage from './modules/USER_PAGE/UserPage';
import { Breadcrumb, Layout, Menu, Skeleton, theme, Input, Dropdown, Avatar } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { useEffect, useState } from 'react';
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
import { HomeOutlined, LogoutOutlined, SettingOutlined, SmileOutlined, ThunderboltOutlined, UserOutlined } from '@ant-design/icons';


const { Header, Content, Footer } = Layout;





function App() {
  const menuItems = [

  ];

  const [userAct, setUserAct] = useState(!PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(false);

  /**
   * Текущий адрес страницы
   */
  const [location, setLocation] = useState((new URLSearchParams(window.location.search)).get('location') ? (new URLSearchParams(window.location.search)).get('location') : 'me');
  
    // Чтение параметра из URL при монтировании компонента
    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const value = searchParams.get('location'); // Измените на 'locate', если нужно
      if (value) {
          setLocation(value);
      } else {
          setLocation('home'); // Установка корневой страницы
      }
      console.log('start page is', value);
  }, []);

  // Обновление URL при изменении состояния location
  useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      query.set('location', location); // Устанавливаем новый параметр

      // Обновляем URL без перезагрузки страницы
      window.history.pushState({}, '', `${window.location.pathname}?${query.toString()}`);
      
      console.log('useState' + ' => ' + location);
  }, [location]);




  
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
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          Настройки
        </Menu.Item>
        <Menu.Item key="block" icon={<ThunderboltOutlined />}>
          Заблокировать
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
      {/* <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}
      className={'sk-main-menu'}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          style={{ flex: 1, minWidth: 0 }}
          mode="horizontal"
          defaultSelectedKeys={['2']}
        >
            <div>
              <Search></Search>
            </div>
            <MenuItem
              key={'menu_5234'}>
              <a href={HTTP_ROOT}>Home</a>
            </MenuItem>

            <MenuItem
            key={'menu_52d34'}>
              <Link
                onClick={()=>{ setLocation('me')}}
              >Моё</Link>
              
            </MenuItem>

            <MenuItem
            key={'menu_52s34'}>
              <Link 
                onClick={()=>{ setLocation('userlist')}}
              >Сотрудники</Link>
            </MenuItem>

            <MenuItem
            key={'menu_52342'}>
              <Link 
              onClick={()=>{ setLocation('admin/rules')}}
              >Правила</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5234qq'}>
              <Link 
              onClick={()=>{ setLocation('admin/schedules')}}
              >Графики</Link>
            </MenuItem>



            <MenuItem
            key={'menu_235234'}>
              <Link 
              onClick={()=>{ setLocation('admin/prodcals')}}
              >Календари</Link>
            </MenuItem>


            {/* <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin/schedules')}}
              >Заявки на смену графика</Link>
            </MenuItem> */}

            {/* <MenuItem
            key={'menu_5234765'}>
              <Link 
              onClick={()=>{ setLocation('admin/groups')}}
              >Группы пользоваателей</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5235644'}>
              <Link 
              onClick={()=>{ setLocation('superadmin/randomixer')}}
              >RMXR</Link>
            </MenuItem> */}


            {/* <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin')}}
              >Skud Admin</Link>
            </MenuItem> */}

            
            {/* <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admincalendar')}}
              >Произв. календари</Link>
            </MenuItem> 
          </Menu>
      </Header> */}

      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className={'sk-main-menu'}
      >
        {/* Первая группа */}
        <Menu mode="horizontal" style={{ background: '#00000000', flex: 1}}>
          <Menu.Item key="home" icon={<HomeOutlined  style={{ fontSize: '20px', color: '#fff', marginTop: '6px',
           textAlign: 'center', paddingLeft: '6px' }} />} ><a href={HTTP_ROOT}></a></Menu.Item>
          <Menu.SubMenu key="menu1" title="Персональный раздел">
            <MenuItem
            key={'menu_52d34'}>
              <Link
                onClick={()=>{ setLocation('me')}}
              >Моё</Link>
              
            </MenuItem>

            <MenuItem
            key={'menu_52s34'}>
              <Link 
                onClick={()=>{ setLocation('userlist')}}
              >Сотрудники</Link>
            </MenuItem>
          </Menu.SubMenu>
          <Menu.SubMenu key="menu2" title="Управление сотрудниками">
          <MenuItem
            key={'menu_52342'}>
              <Link 
              onClick={()=>{ setLocation('admin/rules')}}
              >Правила</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5234qq'}>
              <Link 
              onClick={()=>{ setLocation('admin/schedules')}}
              >Графики</Link>
            </MenuItem>



            <MenuItem
            key={'menu_235234'}>
              <Link 
              onClick={()=>{ setLocation('admin/prodcals')}}
              >Календари</Link>
            </MenuItem>


            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin/schedules')}}
              >Заявки на смену графика</Link>
            </MenuItem> 

            <MenuItem
            key={'menu_5234765'}>
              <Link 
              onClick={()=>{ setLocation('admin/groups')}}
              >Группы пользоваателей</Link>
            </MenuItem>

            <MenuItem
            key={'menu_5235644'}>
              <Link 
              onClick={()=>{ setLocation('superadmin/randomixer')}}
              >RMXR</Link>
            </MenuItem>
          </Menu.SubMenu>
        </Menu>

        {/* Вторая группа */}
        <Input.Search placeholder="Поиск" style={{ maxWidth: '300px', margin: '0 20px' }} />

        {/* Третья группа */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <Avatar style={{ backgroundColor: '#87d068', marginRight: '8px' }}>
                { userAct ? (
                  <SmileOutlined  style={{ fontSize: '36px', color: '#08c' }} />
                ) : (
                  <ThunderboltOutlined />
                )}
              </Avatar>
              { userAct ? (
                <span>{userAct.user.name} {userAct.user.patronymic}</span>
              ) : (
              <span>Пользователь</span>

              )}
            </div>
          </Dropdown>
        </div>
      </Header>

      <Content style={{ padding: '0 48px' }}>
        
        
          { pageLoaded || !PRODMODE ? (
        <div>
            {/* {location === '' && <HomePage />} */}
            {/* {location === 'home' && <HomePage />} */}
            {location === '' && <AccountPage userdata={userAct} />}
            {location === 'me' && <AccountPage userdata={userAct} />}
            {location === 'admin' && <AdminPage />}
            {location === 'admin/rules' && <RuleManagerPage userdata={userAct} />}
            {location === 'admin/schedules' && <SchedManagerPage userdata={userAct} />}
            {location === 'admin/prodcals' && <ProdCalManagerPage userdata={userAct} />}
            {location === 'userlist' && <UserListPage userdata={userAct}  />}
            {location === 'admin/groups' && <GroupManagerPage userdata={userAct} />}
            {location === 'superadmin/randomixer' && <EventRandomixer userdata={userAct} />}

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

      </div>
    </Router>
    </Layout>
  );
}

export default App;
