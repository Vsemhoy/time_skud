import React, { useEffect, useState } from "react";
import GroupPageToolbar from "./components/grouppagetoolbar";
import { Button, Empty, Flex, Input, Splitter, Typography } from 'antd';
import GroupCardItem from "./components/groupcarditem";
import GroupUserCardItem from "./components/groupusercarditem";

// import "./components/style/groupcard.css";
import { DS_DEFAULT_USERS, DS_GROUP_USERS, DS_RULE_TYPES, DS_RULES, DS_SCHED_TYPES, DS_SCHED_TYPES_DB, DS_SCHEDULE_LIST, DS_SKUD_GROUPS, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import GroupEditorModal from "./components/groupeditormodal";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import ScheduleManagerModal from "./components/schedulemanagermodal";
import RulesManagerModal from "./components/rulesmanagermodal";
import UserManagerModal from "./components/usermanagermodal";






const GroupManagerPage = (props)=>{
    const [userData, setUserData] = useState(props.userdata);
    const [companies, setCompanies] = useState([
        { key: 0, value: 0, label: 'Все компании' },
        ...DS_USER.companies.reverse().map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    const [baseUserList, setBaseUserList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [baseGroupList, setBaseGroupList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [ruleTypes, setRuleTypes] = useState([]);

    const [openedCooxer, setOpenedCooxer] = useState(0);
    const [openedGroup, setOpenedGroup] = useState(null);
    const [ctrlKey, setCtrlKey] = useState(false);

    const [editorOpened, setEditorOpened] = useState(false);
    const [editedGroupId, setEditedGroupId] = useState(0);

    const [filters, setFilters] = useState([]);

    const [openedUserModal, setOpenedUserModal]         = useState(false);
    const [openedScheduleModal, setOpenedScheduleModal] = useState(false);
    const [openedRuleModal, setOpenedRuleModal]         = useState(false);

    const [scheduleList, setScheduleList] = useState([]);
    const [scheduleTypes, setScheduleTypes] = useState([]);

    const [ruleList, setRuleList] = useState([]);


    useEffect(()=>{
        if (PRODMODE){

            setBaseUserList(DS_GROUP_USERS);
            setBaseGroupList(DS_SKUD_GROUPS);
            setRuleTypes(DS_RULE_TYPES);
            setScheduleTypes(DS_SCHED_TYPES);
            setScheduleList(DS_SCHEDULE_LIST);
            setRuleList(DS_RULES);
        } else {
            get_userList();
            get_ruleTypes();
            get_groupList();
            get_schedule_types();
            get_schedules();
            get_ruleList();
        }

    },[]);

    useEffect(()=>{
        setUserList(baseUserList);
    },[baseUserList]);

    // useEffect(()=>{
    //     setGroupList(baseGroupList);
    // },[baseGroupList]);


    
    useEffect(() => {
        if (filters.length == 0)
        {
            setGroupList(baseGroupList);

        } else {
            let filteredData = JSON.parse(JSON.stringify(baseGroupList));
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
                        };

                        if (!found){
                            // если нет совпадений в группе, ищем в поиске
                            for (let index = 0; index < baseUserList.length; index++) {
                                const user = baseUserList[index];
                                console.log(user);
                                if (user.name.toUpperCase().includes(filter.value.toUpperCase())
                                || user.surname.toUpperCase().includes(filter.value.toUpperCase()) ||
                                user.patronymic.toUpperCase().includes(filter.value.toUpperCase())
                                ){
                                    if (group.id === user.user_group_id){
                                        found = true;
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
            setGroupList(filteredData);
        }

        // console.log(baseScheduleList);
    }, [baseGroupList, filters]);




  /** ------------------ FETCHES ---------------- */

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
                  setRuleList(response.data.data);
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
            setScheduleList(response.data);
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
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
            //   console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }


    /**
     * Получение списка пользователей
     * @param {*} req 
     * @param {*} res 
     */
    const get_userList = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/users_get', 
            {
                data: {
                    status: 0,
                    deleted: 0,
                    id_company: null,
                },
                _token: CSRF_TOKEN
            });
            setBaseUserList(response.data.data);
            console.log('get_calendarList => ', response.data);
      } catch (e) {
          console.log(e)
      } finally {
          
      }
    }


    /**
     * Получение списка групп
     * @param {*} req 
     * @param {*} res 
     */
        const get_groupList = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/groups_get', 
                  {
                      data: {
                        id_company: null
                      },
                      _token: CSRF_TOKEN
                  });
                  setBaseGroupList(response.data.data);
                  console.log('get_calendarList => ', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                
            }
          }

        /**
    //  * Получение одного календаря
    //  * @param {*} req 
    //  * @param {*} res 
    //  */
    //     const get_groupItem = async (item_id, req, res ) => {
    //         try {
    //             let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/group/groups_get/' + item_id, 
    //                 {
    //                     data: {},
    //                     _token: CSRF_TOKEN
    //                 });
    //             console.log('departs', response);
    //             setEditedItem(response.data);
    //         } catch (e) {
    //             console.log(e)
    //         } finally {
    //             setCallToOpen(true);
    //         }
    //     }


    /**
       * создание группы
       * @param {*} req 
       * @param {*} res 
       */
        const create_group = async (body, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/groups/groups',
                {
                    data: body, 
                    _token: CSRF_TOKEN
                });
            console.log('users', response);
            // setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            get_groupList();
        }
    }

    /**
       *  Обновление группы
       * @param {*} req 
       * @param {*} res 
       */
        const update_group = async (body, req, res) => {
            // console.log('body',body);
            try {
                let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/groups/groups/' + body.id,
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
                setBaseGroupList(prevList => 
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
                    let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/groups/links/' + body.group_id,
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
                    // setBaseCalendarList(prevList => 
                    //     prevList.map(item => 
                    //         item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                    //     )
                    // );
                }
            }

    /**
       * удаление группы
       * @param {*} req 
       * @param {*} res 
       */
    const delete_group = async (group_id, req, res) => {

        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/groups/groups/' + group_id,
                {   
                    data: { "id" : group_id}, 
                    _token: CSRF_TOKEN
                }
            );
            if (response.data.status === 0){
                get_groupList();
            }
        } catch (e) {
            console.log(e)
        } finally {
            setBaseGroupList(baseGroupList.filter((item)=>{return item.id !== group_id}));
        }
    }

  /** ------------------ FETCHES END ---------------- */




    const updateUserLinks = (group_id, added, removed) => {
        let newUsers = [];
        for (let i = 0; i < baseUserList.length; i++) {
            const user = baseUserList[i];
            if (added.includes( user.id ))
            {
                user.user_group_id = group_id;
                console.log('first', group_id)
            }
            if (removed.includes( user.id ))
            {
                user.user_group_id = 0;
                console.log('second', group_id)
            }
            newUsers.push(user);   
        }
        update_links(
        {
            group_id: group_id,
            linked_users : added,
            unlinked_users: removed,
        });
        setBaseUserList(newUsers);
    }

    const openModalEditor = (group_id, event) => {
        if (event && event.ctrlKey){
            setCtrlKey(true);
        } else {
            setCtrlKey(false);
        }
        setEditedGroupId(group_id);
        setEditorOpened(true);
    }

    const cancelModalEditor = ()=>{
        setCtrlKey(false);
        setEditedGroupId(0);
        setEditorOpened(false);
    }

    const deleteGroup = (group_id) => {
        delete_group(group_id);
        setCtrlKey(false);
        setEditorOpened(false);
    }

    const saveGroup = (group) => {
        if (group.id == null || group.id == 0){
            // create
            create_group(group);
        } else {
            // update
            update_group(group);
        }
        setEditorOpened(false);
        console.log(group);
    }

    const openBlankEditor = () => {
        setEditedGroupId(null);
        setEditorOpened(true);
    }


    const onSetFilters = (filters) => {
        setFilters(filters);
    }

    const openModalUserEditor = (group_id) => {
        // let usm = baseUserList.find((item)=> item.id === group_id);

        let usm = baseGroupList.find((item)=> item.id === group_id);
        setOpenedGroup(usm);
        setEditedGroupId(group_id);
        setOpenedUserModal(true);
    }


    const openScheduleEditor = (value) => {
        let usm = baseGroupList.find((item)=> item.id === value);
        setOpenedGroup(usm);
        setEditedGroupId(value);
        setOpenedScheduleModal(true);
    }

    const openRulesEditor = (value) => {
        let usm = baseGroupList.find((item)=> item.id === value);
        setOpenedGroup(usm);
        setEditedGroupId(value);
        setOpenedRuleModal(true);
    }


    return (
        <div className={'sk-mw-1400 sk-p-12'}>
            <br />
            <h2>Группировка пользователей</h2>
            <GroupPageToolbar
                companies={companies}
                userData={userData}
                onChangeFilter={onSetFilters}
                // schedTypes={scheduleTypes}
                onAddNewClick={openBlankEditor}
            />
            <br/>

            <div className={'sk-group-1col-body'}>
            <div className={'sk-group-list'}>
                { groupList.map((group)=>(
                    <GroupCardItem
                        key={`grocard_${group.id}`}
                        data={group}
                        opened={openedCooxer === group.id}
                        on_open_cooxer={(value)=>{setOpenedCooxer(value)}}
                        base_users={userList}
                        on_link_update={updateUserLinks}
                        on_open_editor={openModalEditor}
                        user_data={userData}
                        rule_types={ruleTypes}

                        open_rule_modal={openRulesEditor}
                        open_schedule_modal={openScheduleEditor}
                        open_user_modal={openModalUserEditor}
                        />
                ))}

            </div>
            {groupList.length === 0 ? (
                    <Empty description={"Ничего не найдено"}/>
                ): ""}

            </div>

            <div>
                <GroupEditorModal
                    data={openedGroup}
                    open={editorOpened}
                    item_list={baseGroupList}
                    target_id={editedGroupId}
                    on_cancel={cancelModalEditor}
                    ctrl_key={ctrlKey}
                    on_delete={deleteGroup}
                    user_data={userData}
                    on_save={saveGroup}
                />
                
                {openedGroup && (
                <ScheduleManagerModal
                    data={openedGroup}
                    target_id={editedGroupId}
                    schedule_types={scheduleTypes}
                    schedule_list={scheduleList}
                    on_open={openedScheduleModal}
                    base_users={false}
                    on_update={false}
                    on_close={()=>setOpenedScheduleModal(false)}
                />
                )}

                {openedGroup && (
                  <RulesManagerModal
                    data={openedGroup}
                    target_id={editedGroupId}
                    open={openRulesEditor}
                    on_open={openedRuleModal}
                    rule_types={ruleTypes}
                    rule_list={ruleList}
                    base_users={false}
                    on_update={false}
                    on_close={()=>setOpenedRuleModal(false)}
                />
                )}



                <UserManagerModal
                    on_open={openedUserModal}
                    base_users={userList}
                    on_update={false}
                    on_close={()=>setOpenedUserModal(false)}
                    data={openedGroup}
                    target_id={editedGroupId}
                    on_link_update={updateUserLinks}
                />
            </div>

            
        </div>
    )
}

export default GroupManagerPage;