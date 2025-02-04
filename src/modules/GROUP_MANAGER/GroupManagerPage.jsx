import React, { useEffect, useState } from "react";
import GroupPageToolbar from "./components/grouppagetoolbar";
import { Button, Flex, Input, Splitter, Typography } from 'antd';
import GroupCardItem from "./components/groupcarditem";
import GroupUserCardItem from "./components/groupusercarditem";

import "./components/style/groupcard.css";
import { DS_DEFAULT_USERS, DS_GROUP_USERS, DS_SKUD_GROUPS } from "../../CONFIG/DEFAULTSTATE";
import GroupEditorModal from "./components/groupeditormodal";


const Desc = (props) => (
    <Flex
      justify="center"
      align="center"
      style={{
        height: '100%',
      }}
    >
      <Typography.Title
        type="secondary"
        level={5}
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        {props.text}
      </Typography.Title>
    </Flex>
  );


const ContextGroupStack = () => {
    return (
        <div>
            <h4>Группы</h4>

            <br/>

        </div>
    )
};

const ContextUserStack = (props) => {
    const [userList, setUserList] = useState([]);
    useEffect(()=>{
        setUserList(props.userList);
    },[props.userList]);

    return (
        <div>
            <h4>Сотрудники</h4>
            <br/>
            <div>
                {
                    userList.map((user)=>(
                      <GroupUserCardItem user_data={user}/>  
                    ))
                }
            </div>
        </div>
    )
};


const GroupManagerPage = ()=>{
    const [baseUserList, setBaseUserList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [baseGroupList, setBaseGroupList] = useState([]);
    const [groupList, setGroupList] = useState([]);

    const [openedCooxer, setOpenedCooxer] = useState(0);


    const [editorOpened, setEditorOpened] = useState(false);
    const [editedGroupId, setEditedGroupId] = useState(0);

    useEffect(()=>{
        setBaseUserList(DS_GROUP_USERS);
        setBaseGroupList(DS_SKUD_GROUPS);
    },[]);

    useEffect(()=>{
        setUserList(baseUserList);
    },[baseUserList]);

    useEffect(()=>{
        setGroupList(baseGroupList);
    },[baseGroupList]);




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

    const openModalEditor = (group_id) => {
        console.log('group_id', group_id)
        setEditedGroupId(group_id);
        setEditorOpened(true);
    }


    return (
        <div className={'sk-mw-1400 sk-p-12'}>
            <br />
            <h2>Графики работ</h2>
            <GroupPageToolbar
                // companies={companies}
                // userData={userdata}
                // onChangeFilter={onSetFilters}
                // schedTypes={scheduleTypes}
                // onAddNewClick={openBlankEditor}
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
                    on_cancel={()=>{setEditorOpened(false)}}
                />
            </div>

            
        </div>
    )
}

export default GroupManagerPage;