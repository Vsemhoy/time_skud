import React, { useEffect, useState } from "react";
import { DS_PROD_CALENDARS, DS_RULE_TYPES, DS_RULES, DS_SCHEDULE_ENTITIES, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import RuleToolbar from "./components/RuleToolbar";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import RuleCardItem from "./components/rulecarditem";
import RuleEditorModal from "./components/ruleeditormodal";
// import './components/style/rulemanager.css';
import "./style/rule_manager_page.css";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import {Affix, Button, Pagination, Tag, Layout, Spin, Checkbox} from "antd";
import {
    GROUPS_LIST,
    SCHEDULE_LIST,
    SCHEDULE_TYPE_LIST,
    USERS
} from "../USER_MANAGER_2025/USER_MANAGER/mock/mock";

import {
    COMPANIES,
    RULE_TYPE_LIST,
    RULE_LIST,
} from "./mock/mock"
import {
    CalendarOutlined,
    EditOutlined,
    FilterOutlined,
    HistoryOutlined, InboxOutlined,
    PlusOutlined,
    ToolOutlined, UserOutlined
} from "@ant-design/icons";
import Cookies from "js-cookie";
import ClaimManagerSidebar from "../RULE_MANAGER/components/ClaimManagerSidebar";
import {NavLink} from "react-router-dom";
import dayjs from "dayjs";
import UserManagerExtraTools from "../USER_MANAGER_2025/USER_MANAGER/components/UserManagerExtraTools";
import RuleIcons from "./components/RuleIcons";
import {Text} from "recharts";
const { Header, Sider, Content } = Layout;


const RuleManagerPage = (props) => {
    const { userdata } = props;
        const [companies, setCompanies] = useState([
            ...DS_USER.companies.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            })),
        ]);

    const [ruleTypes, setRuleTypes] = useState([]);
    const [baseEntityList, setBaseEntityList] = useState([]);
    const [entityList, setEntityList] = useState([]);

    const [baseRuleList, setBaseRuleList] = useState([]);
    const [ruleList, setRuleList] = useState([]);

        const [openedCooxer, setOpenedCooxer] = useState(0);
        const [ctrlKey, setCtrlKey] = useState(false);
    
        const [editorOpened, setEditorOpened] = useState(false);
        const [editedRuleId, setEditedRuleId] = useState(0);
    
        const [filters, setFilters] = useState([]);

    useEffect(()=>{
        if (!PRODMODE){
            setBaseEntityList(DS_SCHEDULE_ENTITIES);
            setRuleTypes(DS_RULE_TYPES);
            setBaseRuleList(DS_RULES);
        } else {
            get_ruleTypes();
            get_entityList();
            get_ruleList();
        } 
    },[]);


    useEffect(()=>{
        setEntityList(baseEntityList);
        console.log(baseEntityList);
    },[baseEntityList]);

    useEffect(() => {
        if (filters.length == 0)
        {
            setRuleList(baseRuleList);

        } else {
            let filteredData = JSON.parse(JSON.stringify(baseRuleList));
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
                            // если нет совпадений в группе, ищем в поиске
                            for (let index = 0; index < baseRuleList.length; index++) {
                                const user = baseRuleList[index];
                                console.log(user);
                                if (user.name.toUpperCase().includes(filter.value.toUpperCase())
                                || user.surname.toUpperCase().includes(filter.value.toUpperCase()) ||
                                user.patronymic.toUpperCase().includes(filter.value.toUpperCase())
                                ){
                                    if (group.id === user.user_group_id){
                                        found = true;
                                        console.log('FOUND', user);
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
            setRuleList(filteredData);
        }

        // console.log(baseScheduleList);
    }, [baseRuleList, filters]);



  /** ------------------ FETCHES ---------------- */
    /**
     * Получение сущностей
     * @param {*} req 
     * @param {*} res 
     */
    const get_entityList = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/entities_get', 
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
     * Получение списка правил
     * @param {*} req 
     * @param {*} res 
     */
    const get_ruleTypes = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/types_get', 
              {
                  data: {
                    deleted: 0
                  },
                  _token: CSRF_TOKEN
              });
              setRuleTypes(response.data.data);
              console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }

    /**
     * Получение списка правил
     * @param {*} req 
     * @param {*} res 
     */
        const get_ruleList = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/rules_get', 
                  {
                      data: {
                        id_company: null
                      },
                      _token: CSRF_TOKEN
                  });
                  setBaseRuleList(response.data.data);
                  console.log('get_calendarList => ', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                
            }
        }


    /**
         * создание правила
         * @param {*} req 
         * @param {*} res 
         */
        const create_rule = async (body, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/rules/rules',
                {
                    data: body, 
                    _token: CSRF_TOKEN
                });
            console.log('users', response);
            setBaseRuleList([...baseRuleList, response.data.data]);
        } catch (e) {
            console.log(e)
        } finally {
            get_ruleList();
        }
    }
    
  
    /**
     *  Обновление данных правила
     * @param {*} req 
     * @param {*} res 
     */
    const update_rule = async (body, req, res) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/rules/rules/' + body.id,
                {   
                    data: body, 
                    _token: CSRF_TOKEN
                }
            );
            console.log('users', response);
            // setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            setBaseRuleList(prevList => 
                prevList.map(item => 
                    item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                )
            );
        }
    }



    /**
     * Перелинковка юзеров с гурппами
     * @param {*} req 
     * @param {*} res 
     */
        const update_links = async (body, req, res) => {
            console.log('body',body);
            try {
                let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/rules/links/' + body.rule_id,
                    {   
                        data: body, 
                        _token: CSRF_TOKEN
                    }
                );
                console.log('users', response);
                // setBaseUserListData(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {

            }
        }

    /**
       * удаление правила
       * @param {*} req 
       * @param {*} res 
       */
    const delete_rule = async (rule_id, req, res) => {

        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/rules/rules/' + rule_id,
                {   
                    data: { "id" : rule_id}, 
                    _token: CSRF_TOKEN
                }
            );
            console.log('response.data', response.data);
            if (response.data.status === 0){
                get_ruleList();
            }
        } catch (e) {
            console.log(e)
        } finally {
            setBaseRuleList(baseRuleList.filter((item)=>{return item.id !== rule_id}));
        }
    }

  /** ------------------ FETCHES END ---------------- */


    const openModal = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }


    const openModalEditor = (group_id, event) => {
        if (event && event.ctrlKey){
            setCtrlKey(true);
        } else {
            setCtrlKey(false);
        }
        setEditedRuleId(group_id);
        setEditorOpened(true);
    }

    const cancelModalEditor = ()=>{
        setCtrlKey(false);
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const deleteRule = (rule_id) => {
        delete_rule(rule_id);
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const saveRule = (data) => {
        if (data.duration_time !== 0){
            data.duration_time = data.duration_time * 60;
        }
        if (data.id === null || data.id === 0){
            // create
            create_rule(data);
        } else {
            // update
            update_rule(data);
        }
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const openBlankEditor = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }


    const onSetFilters = (filters) => {
        setFilters(filters);
    }

    const updateEntityLinks = (data) => {
        console.log("updated" , data);
        const rule_id = data[0];
        const rule_type = data[1];
        const toUpdate = data[2];
        const toDelete = data[3];

        console.log("toUpdatae", toUpdate);

        const addUsers = [];
        const addGroups = [];
        const rmUsers = [];
        const rmGroups = [];

        let baseClone = JSON.parse(JSON.stringify(baseEntityList));

        for (let i = 0; i < baseEntityList.length; i++) {
            const element = baseEntityList[i];
            if (element.type === 3){
                for (const item of toUpdate) {
                    
                    if (item.type === 3 && item.entity_id === element.id){

                        addUsers.push(baseEntityList[i].id);
                        baseClone[i].rule_links.push({type: rule_type, rule_id: rule_id});
                        console.log(baseClone[i]);
                        break;
                    }
                }
                for (const item of toDelete) {
                    if (item.type === 3 && item.entity_id === element.id){
                        rmUsers.push(baseEntityList[i].id);
                        baseClone[i].rule_links = baseClone[i].rule_links.filter((elem)=> elem.type !== rule_type);
                        break;
                    }
                }
            }
            if (element.type === 2){
                for (const item of toUpdate) {
                    if (item.type === 2 && item.entity_id === element.id){
                        addGroups.push(baseEntityList[i].id);
                        baseClone[i].rule_links.push({type: rule_type, rule_id: rule_id});
                        break;
                    }
                }
                for (const item of toDelete) {
                    if (item.type === 2 && item.entity_id === element.id){
                        rmGroups.push(baseEntityList[i].id);
                        baseClone[i].rule_links = baseClone[i].rule_links.filter((elem)=> elem.type !== rule_type);
                        break;
                    }
                }
            }
        }
        setBaseEntityList(baseClone);

        update_links(
        {
            rule_id: rule_id,
            linked_users : addUsers,
            unlinked_users: rmUsers,
            linked_groups : addGroups,
            unlinked_groups: rmGroups,
        });
    }

        useEffect(()=>{
            console.log("BLM", baseEntityList);
        },[baseEntityList]);


    /**
     * Богдан
     */

    /** Потом достать из коммита!!!
    const [baseRuleList, setBaseRuleList] = useState([]);
    */


    const prepareSelectOptions = (name, options) => {
        if (options && options.length > 0) {
            return options.map((option) => {
                return ({
                    key: `option-${name}-${option.id}`,
                    value: option.id,
                    label: option.name
                })
            });
        } else {
            return [];
        }
    }

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

    const [isOpenFilters, setIsOpenFilters] = useCookieState('rule_manager_filters', true);


    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [currentRules, setCurrentRules] = useState([]);
    const [closedRules, setClosedRules] = useState([]);
    const [users, setUsers] = useState([]);


    const handleChangePageSize = (value) => {
        setPageSize(value);
    };
    const handlePageChange = (value) => {
        setCurrentPage(value);
    };



    useEffect(() => {
        fetchInfo().then(() => {
            setIsMounted(true);
        });
    }, []);
    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [pageSize, currentPage]);
    const handleFilterChanged = async (filterParams) => {
        //console.log(filterParams);
        if (isMounted) {
            await fetchInfo(filterParams);
        }
    };


    /* fetch + pagination */
    const fetchInfo = async (filterParams) => {
        setIsLoading(true);
        await fetchRules(filterParams);
        await fetchFilters();
        await fetchUsers()
        if (PRODMODE) {
            setIsLoading(false);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };
    const fetchRules = async (filterParams) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/groups`,
                    {
                        data: {filterParams, pageSize, currentPage},
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content && serverResponse.data.content.length > 0) {
                    setBaseRuleList(serverResponse.data.content.now_rules);
                    // setUsersAndGroupsInRules(serverResponse.data.content);
                }
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setBaseRuleList(RULE_LIST);
        }
    };
    const fetchUsers = async (filterParams) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/users`,
                    {
                        data: {filterParams},
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content && serverResponse.data.content.length > 0) {
                    setUsers(serverResponse.data.content);
                }
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setUsers(USERS);
        }
    };
    const fetchFilters = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/v2/rule/filterselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content && serverResponse.data.content.length > 0) {
                    const content = serverResponse.data.content;
                    setCompanies(content.companies);
                    setCurrentRules(content.rule_types);
                }
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setCompanies(COMPANIES);
            setCurrentRules(RULE_TYPE_LIST);
        }
    };

    const openCloseRules = (ruleId) => {
        if (closedRules.includes(ruleId)) {
            setClosedRules(closedRules.filter(id => id !== ruleId));
        } else {
            setClosedRules([...closedRules, ruleId]);
        }
    };

    const onOpenModalEditor = (event) => {
    //     console.log('open modal')
    //     event.preventDefault();
    //     if (props.on_open_editor){
    //         props.on_open_editor(rule_id, event);
    //     }
    }


    /**
     * Богдан - конец
     */

    return (
        <Layout className={'layout'}>
            <Header className={'header'}>
                <Affix>
                    <div className={'sk-header-container'}>
                        <Button color={'default'}
                                variant={isOpenFilters ? 'solid' : 'outlined'}
                                icon={<FilterOutlined />}
                                style={{ width: '125px' }}
                                onClick={() => setIsOpenFilters(!isOpenFilters)}
                        >Фильтры</Button>
                        <h1 className={'page-header'}>Правила учёта рабочего времени</h1>
                        <div></div>
                    </div>
                </Affix>
            </Header>
            <Layout className="sk-layout-center">
                <Sider width={isOpenFilters ? "330px" : 0} className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}>
                    <Affix offsetTop={54}>
                        <div className="sk-width-container">
                            <div className="sk-usp-filter-col">
                                <ClaimManagerSidebar
                                    company_list={prepareSelectOptions('company', companies)}
                                    current_rules_list={prepareSelectOptions('current_rules_list', currentRules)}
                                    on_change_filter={handleFilterChanged}
                                />
                            </div>
                        </div>
                    </Affix>
                </Sider>
                <Content className="content">
                    <div className="sk-content-table-wrapper">
                        <Affix offsetTop={44}>
                            <div className="sk-pagination-wrapper">
                                <div className="sk-pagination-container">
                                    <Pagination
                                        current={currentPage}
                                        total={baseRuleList.length}
                                        pageSize={pageSize}
                                        pageSizeOptions={[50, 100]}
                                        locale={{
                                            items_per_page: 'на странице',
                                            jump_to: 'Перейти',
                                            jump_to_confirm: 'OK',
                                            page: 'Страница'
                                        }}
                                        onShowSizeChange={(current, newSize) => handleChangePageSize(newSize)}
                                        onChange={(page) => handlePageChange(page)}
                                    />

                                    <Tag
                                        style={{
                                            width: '160px',
                                            height: '30px',
                                            lineHeight: '27px',
                                            textAlign: 'center',
                                            color: '#868686',
                                            fontSize: '14px',
                                            backgroundColor: '#ededed',
                                            borderColor: '#ededed',
                                        }}
                                    >Всего найдено: {baseRuleList.length}</Tag>
                                </div>
                                <Button color={'primary'}
                                        variant={'outlined'}
                                        icon={<PlusOutlined/>}
                                        style={{ width: '125px' }}
                                        onClick={openModal}
                                >Создать</Button>
                            </div>
                        </Affix>
                        <Spin tip="Ожидайте" spinning={isLoading} style={{width: '100%', height: '100%'}}>
                            <div className="sk-content-table">
                                {/*{*/}
                                {/*    baseRuleList.map((rule, index) => (*/}
                                {/*        <RuleCardItem*/}
                                {/*            key={`grocard_${rule.id}`}*/}
                                {/*            data={rule}*/}
                                {/*            opened={openedCooxer === rule.id}*/}
                                {/*            on_open_cooxer={(value)=>{setOpenedCooxer(value)}}*/}
                                {/*            base_entities={baseEntityList}*/}
                                {/*            on_link_update={updateEntityLinks}*/}
                                {/*            on_open_editor={openModalEditor}*/}
                                {/*            on_manage_entities={updateEntityLinks}*/}
                                {/*            user_data={userdata}*/}
                                {/*        />*/}
                                {/*    ))*/}
                                {/*}*/}


                                {baseRuleList.map((rule, index) => (
                                    <div key={`${rule.id}-${index}`}
                                         className="sk-department-block"
                                    >
                                        <div className="sk-department-header"
                                             onDoubleClick={() => openCloseRules(rule.id)}
                                        >
                                            <div className="sk-department-header-hover-container">
                                                {/*<span className={'sk-card-small-icon'}><RuleIcons type={rule.rule_type_id}/></span>*/}
                                                <p className="sk-department-header-p">{rule.id}</p>
                                                <p className="sk-department-header-p">{rule.name}</p>

                                                <Tag title={rule.id}
                                                     color={rule.company_color}>{rule.company_name.toUpperCase()}</Tag>
                                                <div>
                                                    <div style={{display: 'inline-block', marginRight: '10px'}}
                                                         title="пользователей">{1} <UserOutlined/></div>
                                                    <div style={{display: 'inline-block'}} title="групп">{2}
                                                        <InboxOutlined/></div>
                                                </div>
                                                <div>
                                                    <div className={'sk-card-call-to-modal'}
                                                         onClick={onOpenModalEditor}
                                                    >
                                                        <EditOutlined/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {closedRules.find(item => item === rule.id) && (
                                            <div className="sk-person-rows">
                                                        {users.map((user, idx) => {
                                                            if (+user["linked_rules"][0].id === +rule.id) {
                                                                return (
                                                                        <div key={`${user.id}-${idx}`} className={`sk-person-row`}>
                                                                            <div className="sk-person-row-basic">
                                                                                <div className="sk-person-row-basic-hover-container">
                                                                                    <p className="sk-person-row-p">{user.id}</p>
                                                                                    <div className="sk-person-row-content">
                                                                                        <p className="sk-person-row-p">{`${user.surname} ${user.name} ${user.patronymic}`}</p>
                                                                                        <p className="sk-person-row-p occupy">{user.occupy}</p>
                                                                                    </div>
                                                                                    <NavLink to={'/hr/users/' + user.id}>
                                                                                        <Button color={'default'}
                                                                                                variant={'outlined'}
                                                                                                icon={<EditOutlined/>}
                                                                                        >Редактировать</Button>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                );
                                                            }
                                                    return '';
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Spin>
                    </div>
                </Content>


            </Layout>

            <RuleEditorModal
                open={editorOpened}
                item_list={baseRuleList}
                target_id={editedRuleId}
                on_cancel={cancelModalEditor}
                ctrl_key={ctrlKey}
                on_delete={deleteRule}
                user_data={userdata}
                on_save={saveRule}
                type_list={ruleTypes}
            />
        </Layout>
    )
};

export default RuleManagerPage;

{/*<div className={'sk-mw-1000'}>*/}
{/*    <br/>*/}
{/*    <h2>Правила учёта рабочего времени</h2>*/}
// <RuleToolbar
{/*            companies={companies}*/}
{/*            userData={userdata}*/}
{/*            ruleTypes={ruleTypes}*/}
{/*            onChangeFilter={onSetFilters}*/}
{/*            onAddNewClick={openModal}*/}
{/*        />*/}
{/*    /!* <ProdCalToolbar*/}
{/*        onChangeCompany={changeCompany}*/}
{/*    /> *!/*/}
{/*    <br/>*/}

{/*    <div className={'sk-calendar-list'}>*/}
{/*    <div>*/}


{/*        <div className="sk-pagination-container">*/}
{/*            <Pagination*/}
{/*                current={currentPage}*/}
{/*                total={baseRuleList.length}*/}
{/*                pageSize={pageSize}*/}
{/*                pageSizeOptions={[10, 20, 30, 100]}*/}
{/*                locale={{*/}
{/*                    items_per_page: 'на странице',*/}
{/*                    jump_to: 'Перейти',*/}
{/*                    jump_to_confirm: 'OK',*/}
{/*                    page: 'Страница'*/}
{/*                }}*/}
{/*                onShowSizeChange={(current, newSize) => handleChangePageSize(newSize)}*/}
{/*                onChange={(page) => handlePageChange(page)}*/}
{/*            />*/}

{/*        <Tag*/}
{/*            style={{*/}
{/*                width: '160px',*/}
{/*                height: '30px',*/}
{/*                lineHeight: '27px',*/}
{/*                textAlign: 'center',*/}
{/*                color: '#868686',*/}
{/*                fontSize: '14px',*/}
{/*                backgroundColor: '#ededed',*/}
{/*                borderColor: '#ededed',*/}
{/*            }}*/}
{/*        >Всего найдено: {baseRuleList.length}</Tag>*/}
{/*    </div>*/}

{/*    </div>*/}


{/*        {*/}

{/*        }*/}


{/*    </div>*/}


{/*</div>*/}

// {
//     openRules.find(item => item === user.id) && user.linked_schedule && (
//         <div className="sk-person-rules">
//             <div className="sk-person-schedule">
//                 <div
//                     className="sk-person-schedule-hover-container">
//                     <div className="sk-schedule-cell">
//                         <CalendarOutlined />
//                         <p>{user.linked_schedule.skud_schedule.name}</p>
//                     </div>
//                     <p className="sk-schedule-cell sk-schedule-cell-center">
//                         {dayjs()
//                             .startOf('day')
//                             .add(user.linked_schedule.skud_schedule.start_time, 'seconds')
//                             .format('HH:mm')}
//                         -
//                         {dayjs()
//                             .startOf('day')
//                             .add(user.linked_schedule.skud_schedule.end_time, 'seconds')
//                             .format('HH:mm')}
//                     </p>
//                     <p className="sk-schedule-cell sk-schedule-cell-center">
//                         {dayjs()
//                             .startOf('day')
//                             .add(user.linked_schedule.skud_schedule.lunch_start, 'seconds')
//                             .format('HH:mm')}
//                         -
//                         {dayjs()
//                             .startOf('day')
//                             .add(user.linked_schedule.skud_schedule.lunch_end, 'seconds')
//                             .format('HH:mm')}
//                     </p>
//                     <p className="sk-schedule-cell sk-schedule-cell-center">
//                         {dayjs()
//                             .startOf('day')
//                             .add(user.linked_schedule.skud_schedule.target_time, 'seconds')
//                             .format('HH:mm')} / день</p>
//                 </div>
//             </div>
//             {user.linked_rules.map((rule, idx) => (
//                 <div className="sk-person-rule" key={`${user.id}-${rule.id}`}>
//                     <div className="sk-person-rule-hover-container">
//                         <div className="sk-schedule-cell">
//                             <HistoryOutlined />
//                             <p>{rule.name}</p>
//                         </div>
//                         <p className="sk-schedule-cell sk-schedule-cell-center">
//                             {dayjs()
//                                 .startOf('day')
//                                 .add(rule.duration_time, 'seconds')
//                                 .format('HH:mm')}
//                         </p>
//                     </div>
//                 </div>
//             ))}
//         </div>)
// }


