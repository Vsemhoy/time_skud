
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
import { Breadcrumb, Layout, Menu, Skeleton, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { useEffect, useState } from 'react';
import { DS_USER } from './CONFIG/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import { CSRF_TOKEN, PRODMODE } from './CONFIG/config';
import AdminPage from './modules/ADMIN/AdminPage';
import CalendarPage from './modules/CALENDAR/CalendarPage';
import RuleManagerPage from './modules/RULE_MANAGER/RuleManagerPage';
import SchedManagerPage from './modules/SCHED_MANAGER/SchedManagerPage';
import ProdCalManagerPage from './modules/PROD_CAL_MANAGER/ProdCalManagerPage';


const { Header, Content, Footer } = Layout;





function App() {
  const menuItems = [
    {id: 'dfajsd', name: 'Home', to: '/'},
    {id: 'ddfjsd', name: 'User List', to: '/'},
    {id: 'dassdd', name: 'User Page', to: '/'},
  ];

  const [userAct, setUserAct] = useState(PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(false);

  /**
   * Текущий адрес страницы
   */
  const [location, setLocation] = useState((new URLSearchParams(window.location.search)).get('location') ? (new URLSearchParams(window.location.search)).get('location') : 'home');
  
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
        !PRODMODE && get_userdata(setUserAct)
    }, []);


  return (
    <Layout style={{background: '#fff'}}>
          <Router>
          <div >
      <Header style={{ display: 'flex', alignItems: 'center', background: 'white' }}
      className={'sk-main-menu'}
      >
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        >

            <MenuItem>
              <Link
                onClick={()=>{ setLocation('home')}}
              >Home</Link>
            </MenuItem>

            <MenuItem>
              <Link 
                onClick={()=>{ setLocation('userlist')}}
              >Сотрудники</Link>
            </MenuItem>

            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin/rules')}}
              >Правила</Link>
            </MenuItem>

            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin/schedules')}}
              >Графики</Link>
            </MenuItem>



            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin/prodcals')}}
              >Календари</Link>
            </MenuItem>


            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin/schedules')}}
              >Заявки на смену графика</Link>
            </MenuItem>





            {/* <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admin')}}
              >Skud Admin</Link>
            </MenuItem> */}





            <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admincalendar')}}
              >Графики работы</Link>
            </MenuItem>
            
            {/* <MenuItem>
              <Link 
              onClick={()=>{ setLocation('admincalendar')}}
              >Произв. календари</Link>
            </MenuItem> */}
          </Menu>
      </Header>


      <Content style={{ padding: '0 48px' }}>
        
        
          { pageLoaded || PRODMODE ? (
        <div>
            {location === '' && <HomePage />}
            {location === 'home' && <HomePage />}
            {location === 'admin' && <AdminPage />}
            {location === 'admin/rules' && <RuleManagerPage userdata={userAct} />}
            {location === 'admin/schedules' && <SchedManagerPage userdata={userAct} />}
            {location === 'admin/prodcals' && <ProdCalManagerPage userdata={userAct} />}
            {location === 'userlist' && <UserListPage userdata={userAct}  />}
            {location === 'admincalendar' && <CalendarPage />}

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
