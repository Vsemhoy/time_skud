import React, { useEffect, useState } from "react";
import GroupPageToolbar from "./components/grouppagetoolbar";
import { Button, Flex, Input, Splitter, Typography } from 'antd';
import GroupCardItem from "./components/groupcarditem";
import GroupUserCardItem from "./components/groupusercarditem";

import "./components/style/groupcard.css";
import { DS_DEFAULT_USERS, DS_GROUP_USERS, DS_SKUD_GROUPS, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import GroupEditorModal from "./components/groupeditormodal";






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

    const [openedCooxer, setOpenedCooxer] = useState(0);
    const [ctrKey, setCtrlKey] = useState(false);

    const [editorOpened, setEditorOpened] = useState(false);
    const [editedGroupId, setEditedGroupId] = useState(0);

    const [filters, setFilters] = useState([]);

    

    useEffect(()=>{
        setBaseUserList(DS_GROUP_USERS);
        setBaseGroupList(DS_SKUD_GROUPS);

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
                            console.log('I found em', filter.value);
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
            setGroupList(filteredData);
        }

        // console.log(baseScheduleList);
    }, [baseGroupList, filters]);



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
        setBaseUserList(newUsers);
    }

    const openModalEditor = (group_id, event) => {
        if (event.ctrlKey){
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
        console.log('delete group', group_id);
    }

    const saveGroup = (group) => {
        if (group.id == null || group.id == 0){
            // create
        } else {
            // update
        }
        console.log(group);
    }

    const openBlankEditor = () => {
        setEditedGroupId(null);
        setEditorOpened(true);
    }


    const onSetFilters = (filters) => {
        setFilters(filters);
    }

    return (
        <div className={'sk-mw-1400 sk-p-12'}>
            <br />
            <h2>Графики работ</h2>
            <GroupPageToolbar
                companies={companies}
                userData={userData}
                onChangeFilter={onSetFilters}
                // schedTypes={scheduleTypes}
                onAddNewClick={openBlankEditor}
            />
            <br />

            <div className={'sk-group-1col-body'}>
            <div>
                { groupList.map((group)=>(
                    <GroupCardItem
                        key={`grocard_${group.id}`}
                        data={group}
                        opened={openedCooxer === group.id}
                        on_open_cooxer={(value)=>{setOpenedCooxer(value)}}
                        base_users={userList}
                        on_link_update={updateUserLinks}
                        on_open_editor={openModalEditor}
                        />
                ))}

            </div>

            </div>

            <div>
                <GroupEditorModal
                    open={editorOpened}
                    item_list={baseGroupList}
                    target_id={editedGroupId}
                    on_cancel={cancelModalEditor}
                    ctrl_key={ctrKey}
                    on_delete={deleteGroup}
                    user_data={userData}
                    on_save={saveGroup}
                />
            </div>

            
        </div>
    )
}

export default GroupManagerPage;