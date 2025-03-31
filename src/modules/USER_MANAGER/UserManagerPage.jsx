import React, { useEffect, useState } from "react";

import { DS_DEFAULT_USERS, DS_GROUP_USERS, DS_PROD_CALENDARS, DS_SCHED_TYPES, DS_SCHED_TYPES_DB, DS_SCHEDULE_ENTITIES, DS_SCHEDULE_LIST, DS_SKUD_GROUPS, DS_USER } from "../../CONFIG/DEFAULTSTATE";

import './components/style/usermanager.css';

import { Empty, Tabs } from "antd";

import UserManagerToolbar from "./components/UserManagerToolbar";
import { PRODMODE } from "../../CONFIG/config";
import UserManagerCard from "./components/UserManagerCard";

const UserManagerPage = (props) => {
    const { userdata } = props;

    const [baseUserList, setBaseUserList] = useState([]);
    const [userList, setUserList] = useState([]);

    const [ctrlKey, setCtrlKey] = useState(false);
    const [shiftKey, setShiftKey] = useState(false);
  
    const [baseGroupList, setBaseGroupList] = useState(DS_SKUD_GROUPS);
    const [groupList, setGroupList] = useState([]);

    const [filters, setFilters] = useState([]);


    useEffect(()=>{
        if (PRODMODE)
        {

        } else {
            setBaseUserList(DS_GROUP_USERS);
        }
    },[]);

    useEffect(()=>{
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
                        return (
                            item.name.toLowerCase().includes(filter.value)||
                            item.surname.toLowerCase().includes(filter.value)  ||
                            item.patronymic.toLowerCase().includes(filter.value) ||
                            item.occupy.toLowerCase().includes(filter.value) ||
                            item.department_name.toLowerCase().includes(filter.value) 
                        )
                    });
                    continue;
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
        console.log('I FOUND', users);
        setUserList(users);
    },[filters, baseUserList]);

    


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

                            />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default UserManagerPage;


