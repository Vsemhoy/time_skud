import { Affix, Button, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { DS_SKUD_GROUPS } from "../../../CONFIG/DEFAULTSTATE";
import { CloseOutlined, CloseSquareOutlined, ToolOutlined } from "@ant-design/icons";
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
                    <div className={'sk-toolbox-trigger'}
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
                            <span>Группы</span>
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
                                    onClick={callToClearGroups}
                                    block
                                    >Удалить все группы выделенным</Button>
                            <Button
                                disabled={selectedGroups.length ? false : true}
                                onClick={callToSelectGroups}
                                block
                            >Привязать группы</Button>
                                                        <br />
                            </div>
                        </div>
                        <div style={{width: '100%'}}>
                        <span>Графики</span>
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
                                    onClick={callToClearGroups}
                                    block
                                    >Удалить все</Button>
                                <Button
                                    block
                                >Привязать выбранный график</Button>

                            </div>
                        </div>
                        <div style={{width: '100%'}}>
                        <span>Правила</span>
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
                                    onClick={callToClearGroups}
                                    block
                                    >Удалить все </Button>
                                <Button
                                    block
                                >Привязать выбранные правила</Button>

                            </div>
                        </div>
                    </div>
         
         


              
                </div>
                </Affix>
                </div>
            ):(
                <div className={'sk-toolbox-trigger'}
                    onClick={()=>{setOpenedConsole(true)}}
                >
                    <ToolOutlined /> Открыть панель инструментов
                </div>
            )}

        </div>
    );
};

export default UserManagerExtraTools;