import React, { useEffect, useState } from "react";
import SchedToolbar from "./components/SchedToolbar";
import { DS_PROD_CALENDARS, DS_SCHED_TYPES, DS_SCHED_TYPES_DB, DS_SCHEDULE_ENTITIES, DS_SCHEDULE_LIST, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import SchedCardItem from "./components/SchedCardItem";
import SchedEntityCard from "./components/SchedEntityCard";
import './components/style/schedmanager.css';
import TabPane from "antd/es/tabs/TabPane";
import { Empty, Tabs } from "antd";
import SchedListRow from "./components/SchedListRow";
import SchedList from "./components/SchedList";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import SchedModalEditor from "./components/SchedModalEditor";
import SchedModalUsers from "./components/SchedModalUsers";
import dayjs from "dayjs";

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
    const [baseProdCalendars, setBaseProdCalendars] = useState(PRODMODE ? DS_PROD_CALENDARS : []);
    const [baseEntityList, setBaseEntityList] = useState([]);

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
            get_entityList();
            get_schedule_types();
            get_schedules();
            get_calendarList();
            
        } else {
            setBaseEntityList(DS_SCHEDULE_ENTITIES);
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
                if (filter.type === 'text_filter'){
                    let newFiltered = [];
                    for (let n = 0; n < filteredData.length; n++) {
                        const group = filteredData[n];
                        let found = false;
                        if (group.name.toUpperCase().includes(filter.value.toUpperCase()) ||
                        group.description.toUpperCase().includes(filter.value.toUpperCase()) ){
                            found = true;
                            console.log('I found em', filter.value);
                        };

                        if (!found){
                            // если нет совпадений в schedule, ищем в entity
                            for (let index = 0; index < baseEntityList.length; index++) {
                                const entity = baseEntityList[index];
                                if (entity === null){ continue; }
                                // if (entity.name.toUpperCase() !== null){
                                //     console.log(entity);
                                // }
                                if (entity.name.toUpperCase().includes(filter.value.toUpperCase())
                                || (entity.surname && entity.surname.toUpperCase().includes(filter.value.toUpperCase())) ||
                                (entity.description && entity.description.toUpperCase().includes(filter.value.toUpperCase())) ||
                                (entity.patronymic && entity.patronymic.toUpperCase().includes(filter.value.toUpperCase()))
                                ){
                                    console.log(entity);
                                    if (group.id === entity.schedule_id){
                                        found = true;
                                        console.log('FOUND', entity);
                                        break;
                                    }
                                };
                            }
                        }


                        if (found){
                            newFiltered.push(group);
                        }
                    }
                    filteredData = newFiltered;
                }
            }
            setScheduleList(filteredData);
        }

        // console.log(baseScheduleList);
    }, [baseScheduleList, filters]);




    /** ------------------ FETCHES ---------------- */

    /**
     * Получение сущностей
     * @param {*} req 
     * @param {*} res 
     */
    const get_entityList = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/entities_get', 
            {
                data: {
                    status: 0,
                    deleted: 0,
                },
                _token: CSRF_TOKEN
            });
            setBaseEntityList(response.data.data);
            console.log('get_calendarList => ', response.data);
      } catch (e) {
          console.log(e)
      } finally {
          
      }
    }

        /**
     * Получение списка календарей
     * @param {*} req 
     * @param {*} res 
     */
        const get_calendarList = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars_get', 
                  {
                      data: {},
                      _token: CSRF_TOKEN
                  });
                  setBaseProdCalendars(response.data);
                  console.log('get_calendarList => ', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                
            }
          }

              /**
       * Получение типов графиков
       * @param {*} req 
       * @param {*} res 
       */
              const get_schedule_types = async (req, res) => {
                try {
                    let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/scheduletype/scheduletypes_get?_token=' + CSRF_TOKEN);
                    console.log('users', response);
                    setScheduleTypes(response.data.data);
                } catch (e) {
                    console.log(e)
                } finally {
                    // setLoadingOrgs(false)
                }
            }

        /**
         * Получение графиков
         * @param {*} req 
         * @param {*} res 
         */
        const get_schedules = async (req, res) => {
          try {
              let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedule/schedule_get?_token=' + CSRF_TOKEN);
              console.log('departs', response.data);
              // setOrganizations(organizations_response.data.org_list)
              // setTotal(organizations_response.data.total_count)
              setBaseScheduleList(response.data);
          } catch (e) {
              console.log(e)
          } finally {
              // setLoadingOrgs(false)
          }
    }


      /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
        const get_schedule = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedule/schedule_get?_token=' + CSRF_TOKEN);
                console.log('users', response);
                // setBaseEntityListData(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {
                // setLoadingOrgs(false)
            }
        }


    /**
       * 
       * @param {*} req 
       * @param {*} res 
       */
        const create_schedule = async (body, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedule/schedule',
                {
                    data: body,
                    _token: CSRF_TOKEN
                },
            );
            console.log('users', response);
            // setBaseEntityListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            get_schedules();
        }
    }

    /**
       *  
       * @param {*} req 
       * @param {*} res 
       */
        const update_schedule = async (body, req, res) => {
            console.log('body',body);
            try {
                let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/schedule/schedule/' + body.id,
                    {   
                        data: body, 
                        _token: CSRF_TOKEN
                    }
                );
                console.log('users', response);
                // setBaseEntityListData(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {
                setBaseScheduleList(prevList => 
                    prevList.map(item => 
                        item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                    )
                );
            }
        }

    /**
       *  
       * @param {*} req 
       * @param {*} res 
       */
    const delete_schedule = async (body, req, res) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/schedule/schedule/' + body.id + '?_token=' + CSRF_TOKEN,
                {   
                    data: body, 
                    _token: CSRF_TOKEN
                }
            );
            console.log('response.data', response.data);
            if (response.data.status === 0){
                get_schedules();
            }
        } catch (e) {
            console.log(e)
        } finally {

        }
        setEditorModalOpen(false);
        // setAllowDelete(false);
    }
    /** ------------------ FETCHES END ---------------- */

    
    const openUserModal = (id)=>{
        console.log('id', id);
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


    const openBlankEditor = () =>{
        setEditedId(null);
        setEditedItem(
            {
                created_at: dayjs().unix(),
                id_company: userdata.user.id_company,
                // company_name: "Arstel",
                // company_color: "#229900",
                skud_schedule_type_id: 1,
                name: "Новый график",
                description: "...",
                start_time: dayjs().unix(),
                end_time: dayjs().unix(),
                target_time: (60*60*8),
                target_unit: 1,
                lunch_start: (60*60*13),
                lunch_end: (60*60*15),
                lunch_time: (60*45),
                schedule: [],
                next_id: null,
                deleted: 0,
                skud_prod_calendar_id: 0,
            }
        );
        setEditorModalOpen(true);
    }


    const saveScheduleForm = (item)=>{
        console.log(item);
        if (item.id){
            update_schedule(item);
        } else {
            create_schedule(item);
        }
        setEditedId(null);
        setEditedItem(null);
        setEditorModalOpen(false);
    }

    const saveLinks = (data) => {
        console.log("set",data);

        let entities = JSON.parse(JSON.stringify( baseEntityList ));
        
        let sched_id = data[0];
        let toUpdate = data[1];
        let toDelete = data[2];

        for (let i = 0; i < entities.length; i++) {
            const element = entities[i];
            if (element.type === 3){
                for (const item of toUpdate) {
                    if (item.type === 3 && item.id === element.id){
                        entities[i].schedule_id = sched_id;
                        console.log("added item id " + element.id + " to " + sched_id);
                        break;
                    }
                }
                for (const item of toDelete) {
                    if (item.type === 3 && item.id === element.id){
                        entities[i].schedule_id = 0;
                        console.log("rem item id " + element.id + " to " + sched_id);
                        break;
                    }
                }
            }
            if (element.type === 2){
                for (const item of toUpdate) {
                    if (item.type === 2 && item.id === element.id){
                        entities[i].schedule_id = sched_id;
                        console.log("added item id " + element.id + " to " + sched_id);
                        break;
                    }
                }
                for (const item of toDelete) {
                    if (item.type === 2 && item.id === element.id){
                        entities[i].schedule_id = 0;
                        console.log("re item id " + element.id + " to " + sched_id);
                        break;
                    }
                }
            }
        }
        console.log(entities);
        setBaseEntityList(entities);
        setUserManagerModalOpen(false);
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
                onAddNewClick={openBlankEditor}
            />
            <br />

            <div className={'sk-sched-1col-body'}>
                <div className={'sk-sched-main-col'}>
                    <SchedList
                        dataSchedules={scheduleList}
                        onOpenEditorModal={openEditorModal}
                        onOpenUserManager={openUserModal}
                        entityList={baseEntityList}
                    />
                </div>
                {scheduleList.length === 0 ? (
                    <Empty description={"Ничего не найдено"}/>
                ): ""}

            </div>


            <SchedModalEditor
                open={editorModalOpen}
                on_cancel={cancelEditorModal}
                on_save={saveScheduleForm}
                target_id={editedId}
                data={editedIdtem}
                userData={userdata}
                prodCalendars={baseProdCalendars}
                schedTypes={scheduleTypes}
                />

            <SchedModalUsers
                open={userManagerModalOpen}
                on_save={saveLinks}
                on_cancel={cancelUsersModal}
                target_id={editedId}
                group_data={editedIdtem}
                data={baseEntityList}
                userData={userdata}
                schedTypes={scheduleTypes}
                />
        </div>
    )
};

export default SchedManagerPage;
