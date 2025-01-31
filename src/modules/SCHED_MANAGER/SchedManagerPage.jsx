import React, { useEffect, useState } from "react";
import SchedToolbar from "./components/SchedToolbar";
import { DS_PROD_CALENDARS, DS_SCHED_TYPES, DS_SCHED_TYPES_DB, DS_SCHEDULE_LIST, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import SchedCardItem from "./components/SchedCardItem";
import SchedEntityCard from "./components/SchedEntityCard";
import './components/style/schedmanager.css';
import TabPane from "antd/es/tabs/TabPane";
import { Tabs } from "antd";
import SchedListRow from "./components/SchedListRow";
import SchedList from "./components/SchedList";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import SchedModalEditor from "./components/SchedModalEditor";
import SchedModalUsers from "./components/SchedModalUsers";

const SchedManagerPage = (props) => {
    const { userdata } = props;
    const [companies, setCompanies] = useState([
        { key: 0, value: 0, label: 'Все компании' },
        ...DS_USER.companies.map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    const [baseScheduleList, setBaseScheduleList] = useState(PRODMODE ? DS_SCHEDULE_LIST : []);
    const [scheduleList, setScheduleList] = useState([]);
    const [scheduleTypes, setScheduleTypes] = useState([]);


    const [userManagerModalOpen, setUserManagerModalOpen] = useState(false);
    const [editorModalOpen, setEditorModalOpen] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [editedIdtem, setEditedItem] = useState(null);

    const [filters, setFilters] = useState([]);

    // Функция для получения данных с API
    const getScheduleList = async () => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/scheduletype/scheduletypes_get', {
                data: {},
                _token: CSRF_TOKEN
            });
            setBaseScheduleList(response.data.data); // Устанавливаем полученные данные в baseScheduleList
            console.log('get_scheduleList => ', response.data);
        } catch (e) {
            console.error(e);
        }
    };



    // Эффект для загрузки данных при монтировании компонента
    useEffect(() => {
        if (!PRODMODE) {
            // getScheduleList(); // Загружаем данные только если не в режиме продакшн
            get_schedule_types();
            setBaseScheduleList(DS_SCHEDULE_LIST);
            
        } else {
            setScheduleTypes(DS_SCHED_TYPES);
            setBaseScheduleList(DS_SCHEDULE_LIST);

        }
        console.log(baseScheduleList);
    }, []);


    // Эффект для обновления scheduleList при изменении baseScheduleList
    useEffect(() => {
        if (filters.length == 0)
            {
            setScheduleList(baseScheduleList);
        } else {
            let filteredData = JSON.parse(JSON.stringify(baseScheduleList));
            for (let i = 0; i < filters.length; i++) {
                const filter = filters[i];
                if (filter.type === 'filter'){
                    filteredData = filteredData.filter((item)=> item[filter.key] == filter.value);
                }
            }
            setScheduleList(filteredData);
        }

        // console.log(baseScheduleList);
    }, [baseScheduleList, filters]);




    /** ------------------ FETCHES ---------------- */

              /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
              const get_schedule_types = async (req, res) => {
                try {
                    let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/scheduletype/scheduletypes_get?_token=' + CSRF_TOKEN);
                    console.log('users', response);
                    setScheduleTypes(response.data);
                } catch (e) {
                    console.log(e)
                } finally {
                    // setLoadingOrgs(false)
                }
            }

        /**
         * Получение списка отделов
         * @param {*} req 
         * @param {*} res 
         */
        const get_departments = async (req, res) => {
        //   try {
        //       let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/departaments/departaments?_token=' + CSRF_TOKEN);
        //       console.log('departs', response);
        //       // setOrganizations(organizations_response.data.org_list)
        //       // setTotal(organizations_response.data.total_count)
        //       setDepartments(response.data.data);
        //   } catch (e) {
        //       console.log(e)
        //   } finally {
        //       // setLoadingOrgs(false)
        //   }
    }


      /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
        const get_users = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/users/users?_token=' + CSRF_TOKEN);
                console.log('users', response);
                // setBaseUserListData(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {
                // setLoadingOrgs(false)
            }
        }
    /** ------------------ FETCHES END ---------------- */

    
    const openUserModal = (id)=>{
        setEditedItem(baseScheduleList.find((el)=> el.id === id));
        setEditedId(id);
        setUserManagerModalOpen(true);
        console.log('Open editor');
    }
    const cancelUsersModal = ()=>{
        setUserManagerModalOpen(false);
    }

    
    const openEditorModal = (id)=>{
        setEditedId(id);
        setEditedItem(baseScheduleList.find((el)=> el.id === id));
        setEditorModalOpen(true);
    }
    const cancelEditorModal = ()=>{
        setEditorModalOpen(false);
    }


    const onSetFilters = (filters) => {
        setFilters(filters);
    }


    return (
        <div className={'sk-mw-1400'}>
            <br />
            <h2>Графики работ</h2>
            <SchedToolbar
                companies={companies}
                userData={userdata}
                onChangeFilter={onSetFilters}
                schedTypes={scheduleTypes}
            />
            <br />

            <div className={'sk-sched-1col-body'}>
                <div className={'sk-sched-main-col'}>
                    <SchedList
                        dataSchedules={scheduleList}
                        onOpenEditorModal={openEditorModal}
                        onOpenUserManager={openUserModal}
                    />
                </div>

            </div>

            <div>modal</div>

            <SchedModalEditor
                open={editorModalOpen}
                on_cancel={cancelEditorModal}
                target_id={editedId}
                data={editedIdtem}
                userData={userdata}
                prodCalendars={DS_PROD_CALENDARS}
                schedTypes={scheduleTypes}
                />

            <SchedModalUsers
                open={userManagerModalOpen}
                on_cancel={cancelUsersModal}
                target_id={editedId}
                data={editedIdtem}
                userData={userdata}
                schedTypes={scheduleTypes}
                />
        </div>
    )
};

export default SchedManagerPage;
