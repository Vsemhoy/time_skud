import React, { useEffect, useState } from "react";

import { DS_DEFAULT_USERS, DS_GROUP_USERS, DS_PROD_CALENDARS, DS_RULES, DS_SCHED_TYPES, DS_SCHED_TYPES_DB, DS_SCHEDULE_ENTITIES, DS_SCHEDULE_LIST, DS_SKUD_GROUPS, DS_USER } from "../../CONFIG/DEFAULTSTATE";

import './components/style/usermanager.css';

import { Empty, Tabs } from "antd";

import UserManagerToolbar from "./components/UserManagerToolbar";
import { PRODMODE } from "../../CONFIG/config";
import UserManagerCard from "./components/UserManagerCard";
import UserManagerExtraTools from "./components/UserManagerExtraTools";

const UserManagerPage = (props) => {
    const { userdata } = props;

    const [baseUserList, setBaseUserList] = useState([]);
    const [baseScheduleList, setBaseScheduleList] = useState([]);
    const [ScheduleList, setScheduleList] = useState([]);
    const [baseRuleList, setBaseRuleList] = useState([]);
    const [ruleList, setRuleList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [ctrlKey, setCtrlKey] = useState(false);
    const [shiftKey, setShiftKey] = useState(false);
  
    const [baseGroupList, setBaseGroupList] = useState(DS_SKUD_GROUPS);
    const [groupList, setGroupList] = useState([]);

    const [filters, setFilters] = useState([]);

    const [searchWords, setSearchWords] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);


    const [selectedGroups, setSelectedGroups] = useState([]);
    // const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(()=>{
        if (PRODMODE)
        {

        } else {
            setBaseUserList(DS_GROUP_USERS);
            setBaseRuleList(DS_RULES);
            setBaseScheduleList(DS_SCHEDULE_LIST);
        }
    },[]);

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

    useEffect(()=>{

    },[filters, baseRuleList]);

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
                    bus[i].groups.push(grp);
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
        <div className={'sk-mw-1400'}>
            <br/>
            <h2>Менеджер пользователей</h2>
            <UserManagerToolbar
                companies={userdata?.companies}
                groups={DS_SKUD_GROUPS}
                onChangeFilter={(ev)=>{setFilters(ev)}}
            />
            <br />
            <UserManagerExtraTools
                companies={userdata?.companies}
                groups={DS_SKUD_GROUPS}
                onChangeFilter={(ev)=>{setFilters(ev)}}
                onSelectAllUsers={selectAllUsersAction}
                onSelectGroups={(val)=>{setSelectedGroups(val)}}
                onCallToSelectGroups={handleCallToBindGroups}
                onCallToClearGroups={handleCallToClearGroups}
            />
            <br />

            <div className={'sk-sched-1col-body'}>
                <div className={'sk-sched-main-col'}>
                    
                </div>
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
                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default UserManagerPage;


