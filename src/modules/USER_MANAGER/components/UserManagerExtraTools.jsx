import { Affix, Button, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { DS_SKUD_GROUPS } from "../../../CONFIG/DEFAULTSTATE";
import { ClearOutlined, CloseOutlined, CloseSquareOutlined, ToolOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";



const UserManagerExtraTools = (props)=>{

const sortByOptions = [
    {
        key: `sort_null`,
        label: "Без сортировки",
        value: ''
    },
    {
        key: `sort_username_asc`,
        label: "Имя А-Z",
        value: 'username_asc'
    },
    {
        key: `sort_username_desc`,
        label: "Имя Z-А",
        value: 'username_desc'
    },
    {
        key: `sort_surname_asc`,
        label: "Фамилия А-Z",
        value: 'surname_asc'
    },
    {
        key: `sort_surname_desc`,
        label: "Фамилия Z-А",
        value: 'surname_desc'
    },
    {
        key: `sort_department`,
        label: "Отдел А-Я",
        value: 'department_asc'
    },
];

const [openedConsole, setOpenedConsole] = useState(false);

const [companiesList, setCompaniesList] = useState([]);
const [groupList, setGroupList] = useState([]);


const [selectedSortBy, setSelectedSortBy] = useState("");
const [selectedCompany, setSelectedCompany] = useState(0);
const [selectedGroups, setSelectedGroups] = useState([]);
const [filterText, setFilterText] = useState('');

const [selectedUsers, setSelectedUsers] = useState(props.selected_users);

useEffect(()=>{
    setSelectedUsers(props.selected_users);
},[props.selected_users]);

useEffect(()=>{
    console.log(props.companies);
    if (props.companies.length){
        let coms = props.companies.filter((item)=>{return item.id !== 1});
        if (coms.length > 1){
            coms.push({
                id: 0,
                name: 'Все компании',
            });

            coms = coms.sort((a, b)=> {return a.id - b.id});
            setCompaniesList(coms.map(item => ({
                key: item.id.toString(), // Преобразование в строку для безопасности
                label: item.name,
                value: item.id,
                
              })));
        }

        console.log(coms);
    }
},[props.companies]);


useEffect(()=>{
    console.log( props.groups);
    setSelectedGroups([]);
    let grop = props.groups;
    if (selectedCompany !== 0)
    {
        grop = grop.filter((item)=>{return item.id_company === selectedCompany});
    }
    setGroupList(
        grop.map(item => ({
            key: item.id,
            label: item.name,
            value: item.id,
            color: item.company_color
        }))
    )
},[props.groups, selectedCompany]);

const handleSelectAll = (ev) => {
    if (props.onSelectAllUsers){
        props.onSelectAllUsers(ev.target.checked);
    }
}





const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    
    // Находим соответствующий group в groupList по value
    const group = groupList.find(item => item.value === value);
    const color = group?.color; // Получаем цвет из найденного group
    
    const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    return (
        <Tag
            color={color}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
        >
            {label}
        </Tag>
    );
};


    // useEffect(()=>{
    //     if (props.onSelectGroups)
    //     {
    //         props.onSelectGroups(selectedGroups);
    //     }
    // }, [selectedGroups, selectedCompany, filterText, selectedSortBy]);

    const callToSelectGroups = ()=>{
        if (props.onCallToSelectGroups)
        {
            props.onCallToSelectGroups(selectedGroups);
        }
    }

    const callToClearGroups = ()=>{
        if (props.onCallToClearGroups)
        {
            props.onCallToClearGroups(selectedGroups);
        }
    }

    return (
        <div>
            {openedConsole ? (
                <div>
                    <div className={`sk-toolbox-trigger ${openedConsole ? 'opened' : 'closed'}`}
                    onClick={()=>{setOpenedConsole(false)}}
                >
                    Скрыть панель инструментов <CloseOutlined />
                </div>
                <Affix offsetTop={0}>
                <div className={"sk-tool-console"}>
                    <div className={'sk-flex sk-flex-divider'} style={{justifyContent: 'space-between'}}>
                        <div>
                            <Checkbox
                            title={"Выделить всех"}
                                onChange={handleSelectAll}
                            />
                        </div>
                        <div style={{width: '100%'}}>
                            <div className={'sk-flex-space'}>
                                <span>Группы </span> <span
                                    onClick={()=>{setSelectedGroups([])}}
                                ><ClearOutlined /></span>
                            </div>
                        <Select
                            placeholder={'Фильтр по группам, включающим пользователей'}
                            value={selectedGroups}
                            mode={'multiple'}
                            options={groupList}
                            style={{ width: '100%' }}
                            onChange={(ev)=>{setSelectedGroups(ev)}}
                            tagRender={tagRender}
                        />
                            <br />
                            <br />
                            <div className={"sk-flex"}>

                                <Button 
                                    size={'small'}
                                    onClick={callToClearGroups}
                                    block
                                    danger
                                    disabled={selectedUsers.length === 0}
                                    >Удалить группы</Button>
                            <Button
                                size={'small'}
                                disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                onClick={callToSelectGroups}
                                block
                            >Привязать группы</Button>
                                                        <br />
                            </div>
                        </div>
                        <div style={{width: '100%'}}>
                            <div className={'sk-flex-space'}>
                                <span>Графики работы</span> 
                                <span
                                    onClick={()=>{setSelectedGroups([])}}
                                ><ClearOutlined /></span>
                            </div>
                        
                        <Select
                         style={{width: '100%'}}
                            options={companiesList}
                            value={selectedCompany}
                            onChange={(ev)=>{setSelectedCompany(ev)}}
                            />
                            <br />
                            <br />
                            <div className={"sk-flex"}>
                            <Button 
                                size={'small'}
                                    onClick={callToClearGroups}
                                    block
                                    disabled={selectedUsers.length === 0}
                                    >Удалить график</Button>
                                <Button 
                                disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                    size={'small'}
                                    block
                                >Привязать график</Button>

                            </div>
                        </div>
                        <div style={{width: '100%'}}>
                        
                            <div className={'sk-flex-space'}>
                            <span>Правила учёта РВ</span> 
                                <span
                                    onClick={()=>{setSelectedGroups([])}}
                                ><ClearOutlined /></span>
                            </div>
                        <Select
                            style={{width: '100%'}}
                            options={companiesList}
                            value={selectedCompany}
                            onChange={(ev)=>{setSelectedCompany(ev)}}
                            />
                            <br />
                            <br />
                            <div className={"sk-flex"}>
                            <Button 
                            size={'small'}
                                disabled={selectedUsers.length === 0}
                                    onClick={callToClearGroups}
                                    block
                                    >Удалить правило </Button>
                                <Button
                                disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                size={'small'}
                                    block
                                >Привязать правила</Button>

                            </div>
                        </div>
                    </div>
         
         


              
                </div>
                </Affix>
                </div>
            ):(
                <div 
                    onClick={()=>{setOpenedConsole(true)}}
                    className={`sk-toolbox-trigger ${openedConsole ? 'opened' : 'closed'}`}
                >
                    <ToolOutlined /> Открыть панель инструментов
                </div>
            )}

        </div>
    );
};

export default UserManagerExtraTools;