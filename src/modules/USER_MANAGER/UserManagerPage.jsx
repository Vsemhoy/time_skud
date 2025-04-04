import React, { useEffect, useState } from "react";

import { DS_DEFAULT_USERS, DS_GROUP_USERS, DS_PROD_CALENDARS, DS_RULE_TYPES, DS_RULES, DS_SCHED_TYPES, DS_SCHED_TYPES_DB, DS_SCHEDULE_ENTITIES, DS_SCHEDULE_LIST, DS_SKUD_GROUPS, DS_USER } from "../../CONFIG/DEFAULTSTATE";

import './components/style/usermanager.css';

import { Button, Checkbox, Empty, Tabs } from "antd";

import UserManagerToolbar from "./components/UserManagerToolbar";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import UserManagerCard from "./components/UserManagerCard";
import UserManagerExtraTools from "./components/UserManagerExtraTools";
import ScheduleManagerModal from "./components/schedulemanagermodal";
import RulesManagerModal from "./components/rulesmanagermodal";
import { PROD_AXIOS_INSTANCE } from "../../API/API";

const UserManagerPage = (props) => {
    const { userdata } = props;

    const [baseUserList, setBaseUserList] = useState([]);
    const [baseScheduleList, setBaseScheduleList] = useState([]);
    // const [ScheduleList, setScheduleList] = useState([]);
    const [baseRuleList, setBaseRuleList] = useState([]);
    const [ruleList, setRuleList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [ctrlKey, setCtrlKey] = useState(false);
    const [shiftKey, setShiftKey] = useState(false);
  
    const [baseGroupList, setBaseGroupList] = useState([]);
    // const [groupList, setGroupList] = useState([]);

    

    const [filters, setFilters] = useState([]);

    const [searchWords, setSearchWords] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);

    const [selectedCompanyId, setSelectedCompanyId] = useState(0);

    const [selectedGroups, setSelectedGroups] = useState([]);
    const [editedUserId,   setEditedUserId] = useState([]);

    
    // const [selectedUsers, setSelectedUsers] = useState([]);
    const [openToolbar, setOpenToolbar] = useState(false);

    // User, who we edit
    const [openedUser, setOpenedUser] = useState(null);

    const [scheduleList,  setScheduleList]  = useState([]);
    const [scheduleTypes, setScheduleTypes] = useState([]);
    const [ruleTypes, setRuleTypes] = useState([]);
    const [openedScheduleModal, setOpenedScheduleModal] = useState(false);
    const [openedRuleModal, setOpenedRuleModal]         = useState(false);


    useEffect(()=>{
        if (PRODMODE)
        {
            get_groupList();
            get_schedule_types();
            get_ruleTypes();

            get_ruleList();
            get_scheduleList();


            get_userList();

        } else {
            setBaseGroupList(DS_SKUD_GROUPS);

            setBaseUserList(DS_GROUP_USERS);
            
            setBaseRuleList(DS_RULES);
            setBaseScheduleList(DS_SCHEDULE_LIST);

            setRuleTypes(DS_RULE_TYPES);
            setScheduleTypes(DS_SCHED_TYPES_DB);
            console.log('DS_RULES', DS_RULES)
        }
    },[]);



    // ------------------ FetchWorld ----------------------

   /**
     * Получение списка правил
     * @param {*} req 
     * @param {*} res 
     */
        const get_ruleList = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/rulelist', 
                  {
                      data: {
                        id_company: null
                      },
                      _token: CSRF_TOKEN
                  });
                  setBaseRuleList(response.data.content);
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
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/schedtyplist?_token=' + CSRF_TOKEN);
            console.log('users', response);
            setScheduleTypes(response.data.content);
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
    const get_scheduleList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/schedulelist?_token=' + CSRF_TOKEN);
            console.log('departs', response.data);
            // setOrganizations(organizations_response.data.org_list)
            // setTotal(organizations_response.data.total_count)
            setBaseScheduleList(response.data.content);
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
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/ruletyplist', 
              {
                  data: {
                    deleted: 0
                  },
                  _token: CSRF_TOKEN
              });
              setRuleTypes(response.data.content);
            //   console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }


    /**
     * Получение списка польззователей с группами и всем остальным барахлом
     * @param {*} req 
     * @param {*} res 
     */
        const get_userList = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/users', 
                    {
                        data: {
                        id_company: null,
                        status: '0',
                        },
                        _token: CSRF_TOKEN
                    });
                    setBaseUserList(response.data.content);
                    console.log('get_userList => ', response.data);
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
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/grouplist', 
                {
                    data: {
                    id_company: null
                    },
                    _token: CSRF_TOKEN
                });
                setBaseGroupList(response.data.content);
                console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }
    

    // ------------------ FetchWorld END ----------------------



    useEffect(()=>{
        setSearchWords([]);
        let sw = [];
        let users = baseUserList;
        for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            if (filter.type === 'filter'){
                if (filter.key === "id_company"){
                    users = users.filter((item)=>{return item.id_company === filter.value});
                    continue;
                    
                };
                if (filter.key.includes("text_filter")){
                    users = users.filter((item)=>{
                        if (
                            (item.id).toString().includes(filter.value)||
                            item.name.toLowerCase().includes(filter.value)||
                            item.surname.toLowerCase().includes(filter.value)  ||
                            item.patronymic.toLowerCase().includes(filter.value) ||
                            item.occupy.toLowerCase().includes(filter.value) ||
                            item.department_name.toLowerCase().includes(filter.value) 
                        ){
                            sw.push(filter.value);
                            return true;
                        }
                    });
                    continue;
                };
                if (filter.key === "group_id"){
                    console.log("FILTERE",filter.value, users);
                    for (let f = 0; f < filter.value.length; f++) {
                        const fvalue = filter.value[f];
                        users = users.filter((item)=>{return item.groups.includes(fvalue)});
                        continue;
                    }
                };
            };
            if (filter.type === 'sorter' && filter.key === "sort_by")
            {
                if (filter.value === "username_desc"){
              
                    users = users.sort((a, b) => {
                        const nameA = a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        const nameB = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        return nameA.localeCompare(nameB); // Для корректной сортировки с учётом локали
                      });
                      continue;
                    };
                    if (filter.value === "username_asc"){
                        users = users.sort((a, b) => {
                        const nameA = a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        const nameB = b.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                        return nameB.localeCompare(nameA); // Для корректной сортировки с учётом локали
                    });
                    continue;
                };
                if (filter.value === "surname_desc") {
                    users = users.sort((a, b) => {
                      const surnameA = a.surname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                      const surnameB = b.surname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                      return surnameA.localeCompare(surnameB);
                    });
                    continue;
                  }
                  
                  if (filter.value === "surname_asc") {
                    users = users.sort((a, b) => {
                      const surnameA = a.surname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                      const surnameB = b.surname.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                      return surnameB.localeCompare(surnameA);
                    });
                    continue;
                  }
                if (filter.value === "id_asc"){
                    users = users.sort((a, b)=> {return a.id - b.id});
                    continue;
                };
                if (filter.value === "id_desc"){
                    users = users.sort((a, b)=> {return b.id - a.id});
                    continue;
                };
                if (filter.value === "department_asc"){
                    users = users.sort((a, b)=> {return a.department - b.department});
                    continue;
                };
            }
        }
        setSearchWords(sw);
        setUserList(users);
    },[filters, baseUserList]);

    
    useEffect(()=>{
        let items = baseScheduleList.filter((item)=> { return item.id });

    },[filters, baseScheduleList]);

    // useEffect(()=>{

    // },[filters, baseRuleList]);

    const selectAllUsersAction = (state) => {
        setSelectedUsers([])
        if (state){
            let nlist = [];
            let ul = userList;
            for (let il = 0; il < ul.length; il++) {
                nlist.push(ul[il].id);
            };
            setSelectedUsers(nlist);
        };
        console.log("SELECTE ALL");
    };

    const handleUnlinkGroupAction = (user_id, group_id)=> {
        console.log(group_id);
        let bus = JSON.parse(JSON.stringify(baseUserList));
        for (let i = 0; i < bus.length; i++) {
            const element = bus[i];

            if (element.id === user_id){
                console.log(element);
                // element.groups.remove(group_id);
                const indexxer = element.groups.indexOf(group_id);
                if (indexxer > -1) {
                    bus[i].groups.splice(indexxer, 1);
                }
                break;
            }
        }
        setBaseUserList(bus);
    }





    const openScheduleEditor = (value) => {
        let usm = baseUserList.find((item)=> item.id === value);
        setOpenedUser(usm);
        setEditedUserId(value);
        setOpenedScheduleModal(true);
    }

    const openRulesEditor = (value) => {
        let usm = baseUserList.find((item)=> item.id === value);
        setOpenedUser(usm);
        setEditedUserId(value);
        setOpenedRuleModal(true);
    }





    const handleCallToBindGroups = (groups) => {
        console.log('BIND');
        console.log(groups);
        console.log(selectedUsers);
        let bus = JSON.parse(JSON.stringify(baseUserList));
        for (let i = 0; i < bus.length; i++) {
            const element = bus[i];

            if (selectedUsers.includes(element.id)){
                for (let g = 0; g < groups.length; g++) {
                    const grp = groups[g];
                    const indexxer = element.groups.indexOf(grp);
                if (indexxer === -1) {
                    const checkGroup = baseGroupList.find((item)=> {return item.id === grp});
                    if (checkGroup && checkGroup.id_company === element.id_company){
                        bus[i].groups.push(grp);
                    };
                }
                    
                }
            }
        }
        setBaseUserList(bus);
    }


    const handleCardSelection = (item, value) => {
        if (value) {
          setSelectedUsers(prev => [...prev, item]);
        } else {
          setSelectedUsers(prev => prev.filter(v => v !== item));
        }
    };
    
    const handleCallToClearGroups = (groups) => {
        console.log("CLEAR");
        console.log(groups);
        console.log(selectedUsers);

        let bus = JSON.parse(JSON.stringify(baseUserList));
        if (groups && groups.length){
            for (let i = 0; i < bus.length; i++) {
                const element = bus[i];
    
                if (selectedUsers.includes(element.id)){
                    for (let g = 0; g < groups.length; g++) {
                        const grp = groups[g];
                        const indexxer = element.groups.indexOf(grp);
                        if (indexxer > -1) {
                            bus[i].groups.splice(indexxer, 1);
                        }
                }
            }
        }

        } else {
            console.log('ELSE - empty groups - clear all existed');
            for (let i = 0; i < bus.length; i++) {
                const element = bus[i];

                if (selectedUsers.includes(element.id)){
                        bus[i].groups = [];
                    }
                }
            }
        setBaseUserList(bus);
    }

    

    return (
        <div className={'sk-mw-1400'} style={{padding: '12px'}}>
            <br/>
            <h2>Менеджер пользователей</h2>
            <UserManagerToolbar
                companies={userdata?.companies}
                groups={baseGroupList}
                onChangeFilter={(ev)=>{setFilters(ev)}}
                onChangeCompany={setSelectedCompanyId}

            />
            <br />
            <div className={'sk-2col-body'}>
                <div className="sk-flex" style={{alignItems: 'center'}}>
                    <Checkbox
                        style={{padding: '0px 12px'}}
                        title={"Выделить всех"}
                            onChange={(ev)=>{selectAllUsersAction(ev.target.checked)}}
                        />
                        <div className="sk-flex">
                        <span>Выделить все карточки</span>
                        {selectedUsers.length > 0 ? (
                            
                            <span
                            style={{background: '#f6ef76', padding: '0px 12px', borderRadius: '6px'}}
                            >{selectedUsers.length} выделено</span>
                        ):""}
                        </div>
                </div>
                <div>
                <Button
                block
                size={'small'}
                color="cyan" variant="outlined"
                onClick={()=>setOpenToolbar(!openToolbar)}
                    >Панель инструментов</Button>
                </div>
            </div>
            
            <br />

            <div className={`${openToolbar ? "sk-2col-body" : "sk-1col-body"}`}>
                <div className={'sk-sched-main-col'} style={{width: '100%'}}>
                    
                
                {userList.length === 0 ? (
                    <Empty description={"Ничего не найдено"}/>
                ): (
                    <div className={'sk-um-userlist'}>
                        {userList.map((item)=>(
                            <UserManagerCard
                                key={`itemcard_${item.id}`}
                                data={item}
                                groups={baseGroupList}
                                search_strings={searchWords}
                                selected={selectedUsers.includes(item.id)}
                                onUnlinkGroup={handleUnlinkGroupAction}
                                onCallToClearGroups={handleCallToClearGroups}
                                onSelectCard={handleCardSelection}
                                onOpenRuleModal={openRulesEditor}
                                onOpenScheduleModal={openScheduleEditor}
                            />
                        ))}
                    </div>
                )}
                </div>
                <div>
                <UserManagerExtraTools
                    companies={userdata?.companies}
                    groups={baseGroupList}
                    onChangeFilter={(ev)=>{setFilters(ev)}}
                    onSelectAllUsers={selectAllUsersAction}
                    onSelectGroups={(val)=>{setSelectedGroups(val)}}
                    onCallToSelectGroups={handleCallToBindGroups}
                    onCallToClearGroups={handleCallToClearGroups}
                    selected_users={selectedUsers}
                    rules={baseRuleList}
                    schedules={baseScheduleList}
                    selectedCompany={selectedCompanyId}
                    setRoute={props.setRoute}
                    schedTypes={scheduleTypes}
                    ruleTypes={ruleTypes}
                />
                </div>
            </div>









            {openedUser && (
                <ScheduleManagerModal
                    data={openedUser}
                    target_id={editedUserId}
                    schedule_types={scheduleTypes}
                    schedule_list={scheduleList}
                    on_open={openedScheduleModal}
                    base_users={false}
                    on_update={false}
                    on_close={()=>setOpenedScheduleModal(false)}
                />
                )}

                {openedUser && (
                  <RulesManagerModal
                    data={openedUser}
                    target_id={editedUserId}
                    open={openRulesEditor}
                    on_open={openedRuleModal}
                    rule_types={ruleTypes}
                    rule_list={ruleList}
                    base_users={false}
                    on_update={false}
                    on_close={()=>setOpenedRuleModal(false)}
                />
            )}

        </div>
    );
}

export default UserManagerPage;


