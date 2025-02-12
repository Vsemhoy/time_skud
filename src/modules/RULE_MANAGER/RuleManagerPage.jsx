import React, { useEffect, useState } from "react";
import { DS_PROD_CALENDARS, DS_RULE_TYPES, DS_RULES, DS_SCHEDULE_ENTITIES, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import RuleToolbar from "./components/RuleToolbar";
import { PRODMODE } from "../../CONFIG/config";
import RuleCardItem from "./components/rulecarditem";
import RuleEditorModal from "./components/ruleeditormodal";


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
        const [ctrKey, setCtrlKey] = useState(false);
    
        const [editorOpened, setEditorOpened] = useState(false);
        const [editedRuleId, setEditedRuleId] = useState(0);
    
        const [filters, setFilters] = useState([]);

    useEffect(()=>{
        if (PRODMODE){
        }
        setBaseEntityList(DS_SCHEDULE_ENTITIES);
        setRuleTypes(DS_RULE_TYPES);
        setBaseRuleList(DS_RULES);
    },[]);


    useEffect(()=>{
        setEntityList(baseEntityList);
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



    const openModal = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }


    const updateUserLinks = (group_id, added, removed) => {
        let newUsers = [];
        // for (let i = 0; i < baseUserList.length; i++) {
        //     const user = baseUserList[i];
        //     if (added.includes( user.id ))
        //     {
        //         user.user_group_id = group_id;
        //         console.log('first', group_id)
        //     }
        //     if (removed.includes( user.id ))
        //     {
        //         user.user_group_id = 0;
        //         console.log('second', group_id)
        //     }
        //     newUsers.push(user);   
        // }
        // update_links(
        // {
        //     group_id: group_id,
        //     linked_users : added,
        //     unlinked_users: removed,
        // });
        // setBaseUserList(newUsers);
    }

    const openModalEditor = (group_id, event) => {
        if (event.ctrlKey){
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

    const deleteGroup = (group_id) => {
        console.log('delete group', group_id);
        // delete_group(group_id);
    }

    const saveGroup = (group) => {
        if (group.id == null || group.id == 0){
            // create
            // create_group(group);
        } else {
            // update
            // update_group(group);
        }
        console.log(group);
    }

    const openBlankEditor = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }


    const onSetFilters = (filters) => {
        setFilters(filters);
    }

    return (
        <div className={'sk-mw-1000'}>
            <br/>
            <h2>Правила учёта рабочего времени</h2>
                <RuleToolbar
                    companies={companies}
                    userData={userdata}
                    ruleTypes={ruleTypes}
                    onChangeFilter={onSetFilters}
                    onAddNewClick={openModal}
                />
            {/* <ProdCalToolbar 
                onChangeCompany={changeCompany}
            /> */}
            <br/> 

            <div className={'sk-calendar-list'}>
            <div>
            </div>
                {
                    ruleList.map((group)=>(
                        <RuleCardItem
                        key={`grocard_${group.id}`}
                        data={group}
                        opened={openedCooxer === group.id}
                        on_open_cooxer={(value)=>{setOpenedCooxer(value)}}
                        base_users={entityList}
                        on_link_update={updateUserLinks}
                        on_open_editor={openModalEditor}
                        />
                    ))
                }


            </div>
            <RuleEditorModal
                    open={editorOpened}
                    item_list={baseRuleList}
                    target_id={editedRuleId}
                    on_cancel={cancelModalEditor}
                    ctrl_key={ctrKey}
                    on_delete={deleteGroup}
                    user_data={userdata}
                    on_save={saveGroup}
                    type_list={ruleTypes}
            />
        </div>
    )
};

export default RuleManagerPage;

