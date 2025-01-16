
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import HomePage from './modules/DEFAULT_PAGE/HomePage';
import UserList from './modules/TIME_SKUD/UserList/UserList';
import UserPage from './modules/TIME_SKUD/UserPage/UserPage';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import { useEffect, useState } from 'react';
import { DS_USER } from './CONFIG/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import { CSRF_TOKEN, PRODMODE } from './CONFIG/config';

const { Header, Content, Footer } = Layout;

function App() {
  const menuItems = [
    {id: 'dfajsd', name: 'Home', to: '/'},
    {id: 'ddfjsd', name: 'User List', to: '/'},
    {id: 'dassdd', name: 'User Page', to: '/'},
  ];

  const [userAct, setUserAct] = useState(DS_USER);

  


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
          console.log('response' + ' => ' + response);
          // setOrganizations(organizations_response.data.org_list)
          // setTotal(organizations_response.data.total_count)
          setUserAct(response.data);
      } catch (e) {
          console.log(e)
      } finally {
          // setLoadingOrgs(false)
      }
  }




  /** ------------------ FETCHES END ---------------- */


      // EFFECTS
      useEffect(() => {
        PRODMODE && get_userdata(setUserAct)
    }, []);


  return (
    <Layout>
          <Router>
          <div>
      <Header style={{ display: 'flex', alignItems: 'center', background: 'white' }}>
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ flex: 1, minWidth: 0 }}
        >

            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/list">User list</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/page">User page</Link>
            </MenuItem>
          </Menu>
      </Header>


      <Content style={{ padding: '0 48px' }}>
        
        
        <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<UserList userdata={userAct}/>} />
          <Route path="/page" element={<UserPage />} />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>


        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      </div>
    </Router>
    </Layout>
  );
}

export default App;
