
import './App.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import UserListPage from './modules/USER_LIST/UserListPage';
import NewSkudPage from './modules/NEW_SKUD/UserListPage';
import NewSkudCopyPage from './modules/NEW_SKUD_COPY/UserListPage';
import {Layout, Menu, Skeleton, Button, Badge, Alert, message} from 'antd';
import { DS_USER } from './CONFIG/DEFAULTSTATE';
import { PROD_AXIOS_INSTANCE } from './API/API';
import {BASE_NAME, BASE_ROUTE, CSRF_TOKEN, HTTP_ROOT, PRODMODE, ROUTE_PREFIX} from './CONFIG/config';
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

import AppMenu23 from './components/TimeSkud/AppMenu23/AppMenu23';

import AclSkudPage2 from './modules/ADMIN/ACLSKUD/AclSkudPage2';
import UserManagerPage_2025 from "./modules/USER_MANAGER_2025/USER_MANAGER/UserManagerPage_2025";
import UserPage from "./modules/USER_PAGE/UserPage";
import BaseInfoWorkspace from "./modules/USER_PAGE/outlets/BaseInfoWorkspace";
import SchedulesWorkspace from "./modules/USER_PAGE/outlets/SchedulesWorkspace";
import RulesWorkspace from "./modules/USER_PAGE/outlets/RulesWorkspace";
import GroupsWorkspace from "./modules/USER_PAGE/outlets/GroupsWorkspace";
import GrotpuckovPage from './modules/GROTPUCKOV/GrotpuckovPage';
import Charts from "./modules/CHARTS/Charts";
import SickLeave from "./modules/CHARTS/outlets/SickLeave";
import LongTrip from "./modules/CHARTS/outlets/LongTrip";
import ShortTrip from "./modules/CHARTS/outlets/ShortTrip";
import SVO from "./modules/CHARTS/outlets/SVO";
import Vacation from "./modules/CHARTS/outlets/Vacation";
import Overtime from "./modules/CHARTS/outlets/Overtime";
import Containers from "./modules/CHARTS/outlets/Containers";
import Chart from "./modules/CHARTS/components/Chart";
import NotifierDrawer from './components/Notifyer/NotifierDrawer';
import AccountingPage from "./modules/ACCOUNTING/AccountingPage";
import AccountingBankCardsPage from "./modules/ACCOUNTING/AccountingBankCardsPage";
import AccountingSurchargesPage from "./modules/ACCOUNTING/AccountingSurchargesPage";
import {getSavedSkudPageTheme, SKUD_PAGE_THEMES} from './Utils/skudPageTheme';
import KppSchedulePage from "./modules/KPP_SCHEDULE/KppSchedulePage";
import BuildersSchedulePage from "./modules/BUILDERS_SCHEDULE/BuildersSchedulePage";
import {USDA} from "./modules/CHARTS/mock/mock";
import ClaimSettingsPage from "./modules/CLAIM_SETTINGS/ClaimSettingsPage";
import ClaimListModal from "./modules/NEW_SKUD/components/ClaimListModal";
import BillListModal from "./modules/NEW_SKUD/components/BillListModal";
import ClaimEditorDrawer from "./modules/CLAIM_MANAGER_SK/components/ClaimEditorDrawer";
import StateIconsController from "./modules/CHARTS/components/StateIconsController";
import HelpPage from "./modules/HELP/HelpPage";

const { Header, Content, Footer } = Layout;

const useCookieState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const saved = Cookies.get(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    Cookies.set(key, JSON.stringify(state), { expires: 365 });
  }, [key, state]);

  return [state, setState];
};

message.config({
    top: 20,
    right: 20,
    maxCount: 3,
});

function App() {
  const HomeSkudPage = getSavedSkudPageTheme() === SKUD_PAGE_THEMES.NEW
    ? NewSkudCopyPage
    : NewSkudPage;

  const [notificatorOpened, setNotificatorOpened] = useState(false);
  const [countOfNotifications, setCountOfNotifications] = useState(0);
  const { state, setState } = useContext(StateContext);

  const [alertNotShowDate, setAlertNotShowDate] = useCookieState('skud_alert_notshow_date', "");

  const [userAct, setUserAct] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentUserEventDump, setCurrentUserEventDump] = useState(null);

  const [actionUpdateEvents, setActionUpdateEvents] = useState(null);
  const [globalUserList, setGlobalUserList] = useState([]);
  const [globalAclBase, setGlobalAclBase] = useState({});
  const [globalClaimTypes, setGlobalClaimTypes] = useState([]);
  const [isGlobalBillListOpen, setIsGlobalBillListOpen] = useState(false);
  const [isGlobalClaimsListOpen, setIsGlobalClaimsListOpen] = useState(false);
  const [globalEditorOpened, setGlobalEditorOpened] = useState(false);
  const [globalEditorMode, setGlobalEditorMode] = useState('read');
  const [globalEditedClaim, setGlobalEditedClaim] = useState(null);
  const [globalFormType, setGlobalFormType] = useState(null);
  const [globalClaimsUpdateToken, setGlobalClaimsUpdateToken] = useState(null);

/** ------------------ FETCHES ---------------- */
    /**
     * Р СџР С•Р В»РЎС“РЎвЂЎР ВµР Р…Р С‘Р Вµ РЎРѓР С—Р С‘РЎРѓР С”Р В° Р С•РЎвЂљР Т‘Р ВµР В»Р С•Р Р†
     * @param {*} req 
     * @param {*} res 
     */
    const get_userdata = async () => {
        try {
            const format_data = {
                CSRF_TOKEN,
                data: {}
            }
            let response = await PROD_AXIOS_INSTANCE.get(`${ROUTE_PREFIX}/usda?_token=` + CSRF_TOKEN);
            console.log('me: ', response);
            setUserAct(response.data);
        } catch (e) {
            console.log(e)
        } finally {
            setPageLoaded(true);
        }
  }

  const fetchGlobalUsers = async () => {
    try {
      const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getusers`, {
        data: {},
        _token: CSRF_TOKEN
      });
      setGlobalUserList(response.data.content ?? []);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCurrentUserEventDump = async (userId, date = dayjs().format('YYYY-MM-DD')) => {
    if (!userId) {
      setCurrentUserEventDump(null);
      return;
    }

    try {
      const response = await PROD_AXIOS_INSTANCE.get(`${ROUTE_PREFIX}/timeskud/user-event-dump/${userId}`, {
        params: {date},
      });
      setCurrentUserEventDump(response.data ?? null);
    } catch (e) {
      console.log(e);
      setCurrentUserEventDump(null);
    }
  };

  const fetchGlobalAclBase = async () => {
    try {
      const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/aclskud/getMyAcls`, {
        data: [],
        _token: CSRF_TOKEN
      });
      setGlobalAclBase(response.data.content ?? {});
    } catch (e) {
      console.log(e);
    }
  };

  const prepareGlobalClaimTypes = (states) => states
    .filter((state) => state.fillable)
    .map((state) => ({
      key: `clt_${state.id}`,
      value: state.id,
      label: state.text,
      title: state.title,
      color: state.color,
      badge: state.badge,
      icon: <StateIconsController IdState={state.id} />
    }));

  const fetchGlobalClaimTypes = async () => {
    try {
      const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getstates`, {
        _token: CSRF_TOKEN
      });
      const states = response.data.content ?? [];
      setGlobalClaimTypes(prepareGlobalClaimTypes(states));
    } catch (e) {
      console.log(e);
    }
  };

  const ensureGlobalModalData = async () => {
    await Promise.all([
      globalUserList.length > 0 ? Promise.resolve() : fetchGlobalUsers(),
      Object.keys(globalAclBase ?? {}).length > 0 ? Promise.resolve() : fetchGlobalAclBase(),
      globalClaimTypes.length > 0 ? Promise.resolve() : fetchGlobalClaimTypes(),
    ]);
  };

  const handleOpenGlobalBillList = async () => {
    await ensureGlobalModalData();
    setIsGlobalBillListOpen(true);
  };

  const handleOpenGlobalClaimsList = async () => {
    await ensureGlobalModalData();
    setIsGlobalClaimsListOpen(true);
  };

  const closeGlobalClaimEditor = () => {
    setGlobalEditorOpened(false);
    setGlobalEditorMode('read');
    setTimeout(() => {
      setGlobalEditedClaim(null);
    }, 555);
  };

  const createGlobalClaim = async (claimObj) => {
    try {
      if (Array.isArray(claimObj)) {
        await Promise.all(claimObj.map((claim) => PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/createclaim`, {
          data: claim,
          _token: CSRF_TOKEN
        })));
      } else {
        await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/createclaim`, {
          data: claimObj,
          _token: CSRF_TOKEN
        });
      }
      setGlobalClaimsUpdateToken(dayjs().unix());
    } catch (e) {
      console.log(e);
    }
  };

  const updateGlobalClaim = async (claimObj) => {
    try {
      await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/updateclaim`, {
        data: claimObj,
        _token: CSRF_TOKEN
      });
      setGlobalClaimsUpdateToken(dayjs().unix());
    } catch (e) {
      console.log(e);
    }
  };

  const updateGlobalClaimState = async (claimObj) => {
    try {
      await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/updatestate`, {
        data: claimObj,
        _token: CSRF_TOKEN
      });
      setGlobalClaimsUpdateToken(dayjs().unix());
    } catch (e) {
      console.log(e);
    }
  };

  const deleteGlobalClaim = async (claimId) => {
    try {
      await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/deleteclaim`, {
        data: {id: claimId},
        _token: CSRF_TOKEN
      });
      setGlobalClaimsUpdateToken(dayjs().unix());
    } catch (e) {
      console.log(e);
    }
  };

  const handleGlobalSaveClaim = async (claim, editMode) => {
    if (editMode === 'create') {
      await createGlobalClaim(claim);
    } else if (editMode === 'update') {
      await updateGlobalClaim(claim);
    } else if (editMode === 'transfer') {
      await updateGlobalClaimState({
        id: claim.update.id,
        state: 3,
      });
      await createGlobalClaim(claim.create);
    }
    closeGlobalClaimEditor();
  };

  const handleGlobalOpenClaim = (id, claim) => {
    setGlobalEditedClaim(claim);
    setGlobalFormType(claim.skud_current_state_id ?? claim.skud_current_state?.id);
    setGlobalEditorMode('read');
    setGlobalEditorOpened(true);
  };

  const handleGlobalEditClaim = (id, claim) => {
    setGlobalEditedClaim(claim);
    setGlobalFormType(claim.skud_current_state_id ?? claim.skud_current_state?.id);
    setGlobalEditorMode('update');
    setGlobalEditorOpened(true);
  };

  const handleGlobalApproveClaim = (id) => {
    updateGlobalClaimState({id, state: 1});
    closeGlobalClaimEditor();
  };

  const handleGlobalDeclineClaim = (id) => {
    updateGlobalClaimState({id, state: 2});
    closeGlobalClaimEditor();
  };

  const handleGlobalGetBackClaim = (id) => {
    deleteGlobalClaim(id);
    closeGlobalClaimEditor();
  };

  /** ------------------ FETCHES END ---------------- */

  useEffect(() => {
    get_userdata().then();
  }, []);

  useEffect(() => {
    const userId = userAct?.user?.id;
    if (!pageLoaded || !userId) {
      setCurrentUserEventDump(null);
      return;
    }

    fetchCurrentUserEventDump(userId).then();
  }, [pageLoaded, userAct?.user?.id]);

  useEffect(() => {
    const handleOpenBillList = () => handleOpenGlobalBillList();
    const handleOpenClaimsList = () => handleOpenGlobalClaimsList();

    window.addEventListener('newskud:open-bill-list', handleOpenBillList);
    window.addEventListener('newskud:open-claims-list', handleOpenClaimsList);

    return () => {
      window.removeEventListener('newskud:open-bill-list', handleOpenBillList);
      window.removeEventListener('newskud:open-claims-list', handleOpenClaimsList);
    };
  }, [globalUserList, globalAclBase, globalClaimTypes]);

  const normalizeSkudTime = (time) => {
    if (!time) {
      return null;
    }

    if (typeof time === 'number') {
      return String(time).length <= 10 ? dayjs.unix(time) : dayjs(time);
    }

    if (typeof time === 'string' && /^\d+$/.test(time)) {
      return time.length <= 10 ? dayjs.unix(Number(time)) : dayjs(Number(time));
    }

    return dayjs(time);
  };

  const parseEventDump = (eventDump) => {
    if (!eventDump) {
      return [];
    }

    if (Array.isArray(eventDump)) {
      return eventDump;
    }

    if (typeof eventDump === 'string') {
      try {
        const parsed = JSON.parse(eventDump);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.log('Cannot parse event_dump', e);
      }
    }

    return [];
  };

  const getSkudEventDirection = (event) => Number(event?.direction ?? event?.diraction ?? event?.d);
  const getSkudEventTime = (event) => event?.time ?? event?.datetime ?? event?.datetime_contr ?? event?.t;

  const shouldShowOfficeMarkAlert = (eventDumpResponse) => {
    if (!eventDumpResponse) {
      return false;
    }

    const targetDate = eventDumpResponse.date ? dayjs(eventDumpResponse.date) : dayjs();
    const events = parseEventDump(eventDumpResponse.event_dump);

    if (events.length === 0) {
      return true;
    }

    const sortedEvents = events
      .map((event, index) => ({
        ...event,
        originalIndex: index,
        normalizedTime: normalizeSkudTime(getSkudEventTime(event)),
      }))
      .filter((event) => !event.normalizedTime?.isValid?.() || event.normalizedTime.isSame(targetDate, 'day'))
      .sort((a, b) => {
        const aTime = a.normalizedTime?.isValid?.() ? a.normalizedTime.valueOf() : null;
        const bTime = b.normalizedTime?.isValid?.() ? b.normalizedTime.valueOf() : null;

        if (aTime !== null && bTime !== null) {
          return aTime - bTime;
        }

        return a.originalIndex - b.originalIndex;
      });

    if (sortedEvents.length === 0) {
      return true;
    }

    return getSkudEventDirection(sortedEvents[sortedEvents.length - 1]) > 0;
  };

  const showOfficeMarkAlert = shouldShowOfficeMarkAlert(currentUserEventDump);

  const handleNotificatorOpened = () => {
    setNotificatorOpened(true);
  }

  const handleNotificatorClosed = () => {
    setNotificatorOpened(false);
  }
    

  return (
    <Layout style={{background: 'var(--app-surface-color)'}}>
        <BrowserRouter basename={ BASE_NAME}>
          <div >

       <AppMenu23 
        user_act={userAct}
        on_open_notificator={handleNotificatorOpened}
        count_of_notifications={countOfNotifications}
        is_loading={!pageLoaded}
        hidden={userAct?.user?.super === true || userAct?.user?.super === 1 || userAct?.user?.super === '1'}
       />
   

      {pageLoaded && showOfficeMarkAlert && alertNotShowDate !== dayjs().format("YYYY-MM-DD") && userAct?.user?.id !== 46 && (
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
              <Route path={'/'} element={<HomeSkudPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
              <Route path={'/newskud'} element={<NewSkudPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
              <Route path={'/newskud-copy'} element={<NewSkudCopyPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/'} element={<HomeSkudPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/newskud'} element={<NewSkudPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/newskud-copy'} element={<NewSkudCopyPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            
            <Route path={'/my'} element={<AccountPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/my'} element={<AccountPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/claims'} element={<ClaimManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/claims/settings'} element={<ClaimSettingsPage />} />
            <Route path={BASE_ROUTE + '/hr/charts'} element={<Charts userdata={userAct}/>}>
                <Route path={'sickleave'} element={<SickLeave />} />
                <Route path={'longtrip'} element={<LongTrip />} />
                <Route path={'shorttrip'} element={<ShortTrip />} />
                <Route path={'svo'} element={<SVO />} />
                <Route path={'vacation'} element={<Vacation />} />
                <Route path={'overtime'} element={<Overtime />} />
                <Route path={'containers'} element={<Containers />} />
            </Route>
            <Route path={BASE_ROUTE + '/hr/groups'} element={<GroupManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/calendars'} element={<ProdCalManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/schedules'} element={<SchedManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/rules'} element={<RuleManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/notify'} element={<NotifierPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/usersettings'} element={<UserManagerPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/usermanager'} element={<UserManagerPage_2025 userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/hr/usermanager/:userId'} element={<UserPage userdata={userAct}/>}>
                <Route index element={<BaseInfoWorkspace />} />
                <Route path={'schedules'} element={<SchedulesWorkspace />} />
                <Route path={'rules'} element={<RulesWorkspace />} />
                <Route path={'groups'} element={<GroupsWorkspace />} />
            </Route>
            <Route path={BASE_ROUTE + '/grotpuckov'} element={<GrotpuckovPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/monitor/events'} element={<EventMonitorPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={BASE_ROUTE + '/monitor/stat'} element={<UserStatisticsPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/kpp-schedule'} element={<KppSchedulePage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/builders-schedule'} element={<BuildersSchedulePage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/admin/aclskud'} element={<AclSkudPage2 userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/help'} element={<HelpPage userdata={userAct}/>} />

            <Route path={BASE_ROUTE + '/accounting/timesheet'} element={<AccountingPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/accounting/bankcard'} element={<AccountingBankCardsPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/accounting/productioncalendar'} element={<AccountingPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/accounting/surcharges'} element={<AccountingSurchargesPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/accounting/rewards'} element={<AccountingPage userdata={userAct}/>} />
            <Route path={BASE_ROUTE + '/accounting/retentions'} element={<AccountingPage userdata={userAct}/>} />
            


            <Route path={'/claims'} element={<ClaimManagerPage userdata={userAct}/>} />
            <Route path={'/claims/settings'} element={<ClaimSettingsPage />} />
            <Route path={'/charts'} element={<Charts userdata={userAct}/>}>
                <Route path={'sickleave'} element={<Chart />} />
                <Route path={'longtrip'} element={<Chart />} />
                <Route path={'shorttrip'} element={<Chart />} />
                <Route path={'shortvacation'} element={<Chart />} />
                <Route path={'longvacation'} element={<Chart />} />
                <Route path={'overtime'} element={<Chart />} />
                <Route path={'containers'} element={<Chart />} />
            </Route>
            <Route path={'/hr/groups'} element={<GroupManagerPage userdata={userAct}/>} />
            <Route path={'/hr/calendars'} element={<ProdCalManagerPage userdata={userAct}/>} />
            <Route path={'/hr/schedules'} element={<SchedManagerPage userdata={userAct}/>} />
            <Route path={'/hr/rules'} element={<RuleManagerPage userdata={userAct}/>} />
            <Route path={'/hr/notify'} element={<NotifierPage userdata={userAct}/>} />
            <Route path={'/hr/usersettings'} element={<UserManagerPage userdata={userAct}/>} />
            <Route path={'/hr/usermanager'} element={<UserManagerPage_2025 userdata={userAct}/>} />
            <Route path={'/hr/usermanager/:userId'} element={<UserPage userdata={userAct}/>}>
                <Route index element={<BaseInfoWorkspace />} />
                <Route path={'schedules'} element={<SchedulesWorkspace />} />
                <Route path={'rules'} element={<RulesWorkspace />} />
                <Route path={'groups'} element={<GroupsWorkspace />} />
            </Route>
            <Route path={'/grotpuckov'} element={<GrotpuckovPage userdata={userAct}/>} />
            <Route path={'/monitor/events'} element={<EventMonitorPage userdata={userAct}/>}  refresh_trigger={actionUpdateEvents} />
            <Route path={'/monitor/stat'} element={<UserStatisticsPage userdata={userAct}/>} />
            <Route path={'/kpp-schedule'} element={<KppSchedulePage userdata={userAct}/>} />
            <Route path={'/builders-schedule'} element={<BuildersSchedulePage userdata={userAct}/>} />
            <Route path={'/admin/aclskud'} element={<AclSkudPage2 userdata={userAct}/>} />
            <Route path={'/help'} element={<HelpPage userdata={userAct}/>} />

            <Route path={'/accounting/staffingschedule'} element={<AccountingPage userdata={userAct}/>} />
            <Route path={'/accounting/bankcard'} element={<AccountingBankCardsPage userdata={userAct}/>} />
            <Route path={'/accounting/productioncalendar'} element={<AccountingPage userdata={userAct}/>} />
            <Route path={'/accounting/surcharges'} element={<AccountingSurchargesPage userdata={userAct}/>} />
            <Route path={'/accounting/rewards'} element={<AccountingPage userdata={userAct}/>} />
            <Route path={'/accounting/retentions'} element={<AccountingPage userdata={userAct}/>} />
          </Routes>
      </Content>
      </div>

      </BrowserRouter>

        <NotifierDrawer 
          is_open={notificatorOpened}
          on_close={handleNotificatorClosed}
          on_count_change={setCountOfNotifications}
        />

        {isGlobalBillListOpen && (
          <BillListModal
            isOpenBillListModal={isGlobalBillListOpen}
            handleCloseBillListModal={() => setIsGlobalBillListOpen(false)}
            userdata={userAct}
            user_list={globalUserList}
          />
        )}

        {isGlobalClaimsListOpen && (
          <ClaimListModal
            isOpenClaimsModal={isGlobalClaimsListOpen}
            handleCloseClaimModal={() => setIsGlobalClaimsListOpen(false)}
            userData={userAct}
            on_click={handleGlobalOpenClaim}
            on_approve={handleGlobalApproveClaim}
            on_decline={handleGlobalDeclineClaim}
            on_edit={handleGlobalEditClaim}
            on_get_back={handleGlobalGetBackClaim}
            doUpdateModal={globalClaimsUpdateToken}
          />
        )}

        <ClaimEditorDrawer
          data={globalEditedClaim}
          mode={globalEditorMode}
          acl_base={globalAclBase}
          user_list={globalUserList}
          opened={globalEditorOpened}
          claim_type={globalFormType}
          on_close={closeGlobalClaimEditor}
          claim_types={globalClaimTypes}
          on_send={handleGlobalSaveClaim}
          my_id={userAct?.user?.id}
          on_get_back={handleGlobalGetBackClaim}
          on_approve={handleGlobalApproveClaim}
          on_decline={handleGlobalDeclineClaim}
          current_user={userAct?.user}
        />

    </Layout>
  );
}

export default App;
