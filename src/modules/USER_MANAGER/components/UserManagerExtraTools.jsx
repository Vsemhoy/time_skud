import { Affix, Button, DatePicker, Radio, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { DS_SKUD_GROUPS } from "../../../CONFIG/DEFAULTSTATE";
import { ClearOutlined, CloseOutlined, CloseSquareOutlined, ToolOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";



const UserManagerExtraTools = (props)=>{

const [ruleList, setRuleList] = useState(props.rules);
const [scheduleList, setScheduleList] = useState(props.schedules);

const [openedConsole, setOpenedConsole] = useState(true);

const [companiesList, setCompaniesList] = useState([]);
const [groupList, setGroupList] = useState([]);


const [selectedSortBy, setSelectedSortBy] = useState("");
const [selectedCompany, setSelectedCompany] = useState(0);
const [selectedGroups, setSelectedGroups] = useState([]);
const [filterText, setFilterText] = useState('');

const [selectedSchedule, setSelectedSchedule] = useState(null);
const [selectedRule, setSelectedRule] = useState(null);

const [selectedUsers, setSelectedUsers] = useState(props.selected_users);

const [selectedTab, setSelectedTab] = useState(1);

// const [location, setLocation] = useState('usermanager');
//   useEffect(() => {
//       const query = new URLSearchParams(window.location.search);
//       query.set('location', location); // Устанавливаем новый параметр
//       // Обновляем URL без перезагрузки страницы
//       window.history.pushState({}, '', `${window.location.pathname}?${query.toString()}`);
//       window.location.reload();
//   }, [location]);

  const setLocation = (location)=>{
    if (props.setRoute){
        props.setRoute(location);
    }
  }


useEffect(()=>{
    setSelectedUsers(props.selected_users);
},[props.selected_users]);

useEffect(()=>{
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
    }
},[props.companies]);


useEffect(()=>{
    setSelectedCompany(props.selectedCompany);
},[props.selectedCompany])




useEffect(()=>{
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
    );
},[props.groups, selectedCompany]);



useEffect(()=>{
    let sched = props.schedules;
    let ruls = props.rules;

    if (selectedCompany !== 0)
    { 
        sched = sched.filter((item)=>{return item.id_company === selectedCompany});
    };


    setScheduleList(
        sched.map(item => ({
            key: item.id,
            label: item.name,
            value: item.id,
        }))
    );
},[props.schedules, selectedCompany]);


useEffect(()=>{
    let ruls = props.rules;

    if (selectedCompany !== 0)
    {
        ruls = ruls.filter((item)=>{return item.id_company === selectedCompany});
    }
    setRuleList(
        ruls.map(item => ({
            key: item.id,
            label: item.name,
            value: item.id,
        }))
    );

},[props.rules, selectedCompany]);




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
                    
                <Affix offsetTop={0}>
                <div className={"sk-tool-console"}>
                    <div className={''} style={{justifyContent: 'space-between'}}>
                        <div>
                        <Radio.Group value={selectedTab} block>
                            <Radio.Button 
                                onClick={()=>{setSelectedTab(1)}}
                                value={1}>Группы</Radio.Button>
                            <Radio.Button
                                onClick={()=>{setSelectedTab(2)}}
                                value={2}>Графики</Radio.Button>
                            <Radio.Button 
                                onClick={()=>{setSelectedTab(3)}}
                                value={3}>Правила</Radio.Button>
                        </Radio.Group>
                        </div>

                        <br />
                        {selectedTab === 1 && (
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
                        )}




                        {selectedTab === 2 && (
                        <div style={{width: '100%'}}>
                            <div className={'sk-flex-space'}>
                                <span>Графики работы</span> 
                                <span
                                    onClick={()=>{setSelectedSchedule(null)}}
                                ><ClearOutlined /></span>
                            </div>
                        
                        <Select
                         style={{width: '100%'}}
                            options={scheduleList}
                            value={selectedSchedule}
                            onChange={(ev)=>{setSelectedSchedule(ev)}}
                            />
                            <br />
                            <br />
                            <div className={"sk-flex"}>
                                <DatePicker />
                                <DatePicker />
                            </div>
                            <br />
                            <div className={"sk-flex"}>
                 
                                <Button 
                                disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                    size={'small'}
                                    block
                                >Привязать график</Button>

                            </div>

                            <br />
                            <a onClick={()=>{setLocation('schedulemanager')}}>Менеджер графиков</a>
                        </div>
                        )}

                        {selectedTab === 3 && (
                        <div style={{width: '100%'}}>
                        
                            <div className={'sk-flex-space'}>
                            <span>Правила учёта РВ</span> 
                                <span
                                    onClick={()=>{setSelectedRule([])}}
                                ><ClearOutlined /></span>
                            </div>
                        <Select
                            style={{width: '100%'}}
                            options={ruleList}
                            value={selectedRule}
                            onChange={(ev)=>{setSelectedRule(ev)}}
                            />
                            <br />
                            <br />

                            <div className={"sk-flex"}>
                                <DatePicker />
                                <DatePicker />
                            </div>
                            <br />
                            <div className={"sk-flex"}>
                                <Button
                                disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                size={'small'}
                                    block
                                >Привязать правила</Button>

                            </div>

                            <br />
                            <a onClick={()=>{setLocation('rulemanager')}}>Менеджер правил учёта РВ</a>
                        </div>
                        )}
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