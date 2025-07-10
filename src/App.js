
import './App.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import UserListPage from './modules/USER_LIST/UserListPage';
import {  Layout, Menu, Skeleton, Button, Badge, Alert } from 'antd';
import { DS_USER } from './CONFIG/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import { BASE_NAME, BASE_ROUTE, CSRF_TOKEN, HTTP_ROOT, PRODMODE } from './CONFIG/config';
import RuleManagerPage from './modules/RULE_MANAGER/RuleManagerPage';
import SchedManagerPage from './modules/SCHED_MANAGER/SchedManagerPage';
import ProdCalManagerPage from './modules/PROD_CAL_MANAGER/ProdCalManagerPage';
import GroupManagerPage from './modules/GROUP_MANAGER/GroupManagerPage';
import AccountPage from './modules/ACCOUNT/AccountPage';
import NotifierPage from './modules/NOTIFIER/NotifierPage';
import UserManagerPage from './modules/USER_MANAGER/UserManagerPage';
import EventMonitorPage from './modules/EVENT_MONITOR_SK/EventMonitorPage';

import { StateContext } from './components/ComStateProvider25/ComStateProvider25';

import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import UserStatisticsPage from './modules/USER_STATISTICS/UserStatisticsPage';
import ClaimManagerPage from './modules/CLAIM_MANAGER_SK/ClaimManagerPage';

import useWebSocket from 'react-use-websocket';
import AppMenu23 from './components/TimeSkud/AppMenu23/AppMenu23';

import AclSkudPage2 from './modules/ADMIN/ACLSKUD/AclSkudPage2';
import UserManagerPage_2025 from "./modules/USER_MANAGER_2025/USER_MANAGER/UserManagerPage_2025";
import UserPage from "./modules/USER_PAGE/UserPage";
import BaseInfoWorkspace from "./modules/USER_PAGE/outlets/BaseInfoWorkspace";
import SchedulesWorkspace from "./modules/USER_PAGE/outlets/SchedulesWorkspace";
import RulesWorkspace from "./modules/USER_PAGE/outlets/RulesWorkspace";
import GroupsWorkspace from "./modules/USER_PAGE/outlets/GroupsWorkspace";
import GrotpuckovPage from './modules/GROTPUCKOV/GrotpuckovPage';
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


  const { state, setState } = useContext(StateContext);

  //console.log('state', state)

  

  const [alertNotShowDate, setAlertNotShowDate] = useCookieState('skud_alert_notshow_date', "");

  const [userAct, setUserAct] = useState(!PRODMODE ? DS_USER : []);
  const [pageLoaded, setPageLoaded] = useState(false);


  // const [historyStack, setHistoryStack] = useState([]);
  

  const { sendMessage, lastMessage } = useWebSocket(WS_URL, {
    onOpen: () => console.log('Соединение открыто'),
    shouldReconnect: () => true,
  });

  const [actionUpdateEvents, setActionUpdateEvents] = useState(null);






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
   

      {alertNotShowDate !== dayjs().format("YYYY-MM-DD") && userAct?.user?.id !== 46 && (
        <Alert
          message={<div className='sk-flex-space'>
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
          </div>}
          banner  type="error"
          closable
        />
      )}
      <Content>
        
        
          { pageLoaded || !PRODMODE ? (
          <div>
            
          </div>
          ) : (
            <div>
              <Skeleton />
            </div>
          )} 
          <Routes>
            <Route path={'/'} element={<UserListPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/'} element={<UserListPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            
            <Route path={'/my'} element={<AccountPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/my'} element={<AccountPage userdata={userAct}/>} />

            <Route path={BASE_ROUTE + '/claims'} element={<ClaimManagerPage userdata={userAct}/>} />

            <Route path={BASE_ROUTE + '/hr/groups'} element={<GroupManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/calendars'} element={<ProdCalManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/schedules'} element={<SchedManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/rules'} element={<RuleManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/notify'} element={<NotifierPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/usersettings'} element={<UserManagerPage userdata={userAct}/>} />

            <Route path={'/hr/usermanager'} element={<UserManagerPage_2025 userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/usermanager'} element={<UserManagerPage_2025 userdata={userAct}/>} />

            <Route path={'/hr/users/:userId'} element={<UserPage userdata={userAct}/>}>
                <Route index element={<BaseInfoWorkspace />} />
                <Route path={'schedules'} element={<SchedulesWorkspace />} />
                <Route path={'rules'} element={<RulesWorkspace />} />
                <Route path={'groups'} element={<GroupsWorkspace />} />
            </Route>
            <Route path={BASE_ROUTE + '/hr/users/:userId'} element={<UserPage userdata={userAct}/>}>
                <Route index element={<BaseInfoWorkspace />} />
                <Route path={'schedules'} element={<SchedulesWorkspace />} />
                <Route path={'rules'} element={<RulesWorkspace />} />
                <Route path={'groups'} element={<GroupsWorkspace />} />
            </Route>


            <Route path={BASE_ROUTE + '/monitor/events'} element={<EventMonitorPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/monitor/stat'} element={<UserStatisticsPage userdata={userAct}/>} />


            <Route path={BASE_ROUTE + '/admin/aclskud'} element={<AclSkudPage2 userdata={userAct}/>} />            
            


            <Route path={'/claims'} element={<ClaimManagerPage userdata={userAct}/>} />

            <Route path={'/hr/groups'} element={<GroupManagerPage userdata={userAct}/>} />
            <Route path={'/hr/calendars'} element={<ProdCalManagerPage userdata={userAct}/>} />
            <Route path={'/hr/schedules'} element={<SchedManagerPage userdata={userAct}/>} />
            <Route path={'/hr/rules'} element={<RuleManagerPage userdata={userAct}/>} />
            <Route path={'/hr/notify'} element={<NotifierPage userdata={userAct}/>} />
            <Route path={'/hr/usersettings'} element={<UserManagerPage userdata={userAct}/>} />

            <Route path={'/grotpuckov'} element={<GrotpuckovPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/grotpuckov'} element={<GrotpuckovPage userdata={userAct}/>} />

            <Route path={'/monitor/events'} element={<EventMonitorPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={'/monitor/stat'} element={<UserStatisticsPage userdata={userAct}/>} />


            <Route path={'/admin/aclskud'} element={<AclSkudPage2 userdata={userAct}/>} />
          </Routes>
      </Content>
      </div>



      </BrowserRouter>
    </Layout>
  );
}

export default App;



