import { Affix, Button, DatePicker, Radio, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import React, { useEffect, useState } from "react";
import { DS_SKUD_GROUPS } from "../../../CONFIG/DEFAULTSTATE";
import { ClearOutlined, CloseOutlined, CloseSquareOutlined, ToolOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import dayjs from "dayjs";



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


const [schedTypes, setSchedTypes] = useState([]);
const [ruleTypes, setRuleTypes]  = useState([]);



const [selectedSchedType, setSelectedSchedType] = useState(null);
const [selectedRuleType, setSelectedRuleType] = useState(null);



const [dateSchedStart, setDateSchedStart] = useState(dayjs().add(1, 'day').startOf('day'));
const [dateSchedEnd, setDateSchedEnd] = useState(dayjs().add(10, 'year').endOf('day'));


const [dateRuleStart, setDateRuleStart] = useState(dayjs().add(1, 'day').startOf('day'));
const [dateRuleEnd, setDateRuleEnd] = useState(dayjs().add(10, 'year').endOf('day'));

// const [location, setLocation] = useState('usermanager');
//   useEffect(() => {
//       const query = new URLSearchParams(window.location.search);
//       query.set('location', location); // Устанавливаем новый параметр
//       // Обновляем URL без перезагрузки страницы
//       window.history.pushState({}, '', `${window.location.pathname}?${query.toString()}`);
//       window.location.reload();
//   }, [location]);


    useEffect(()=>{
        if (props.schedTypes === undefined){
            return;
        };

        let arr = [
            ({
                key: ``,
                value: null,
                label: 'Все типы',
            })
        ];
        for (let i = 0; i < props.schedTypes.length; i++) {
            const element = props.schedTypes[i];
            arr.push(
                {
                    key: `ajk_${element.id}`,
                    value: element.id,
                    label: element.name,
                });
        }
        setSchedTypes(arr);
    },
    [props.schedTypes]);


    useEffect(()=>{
        if (props.ruleTypes === undefined){
            return;
        };

        let arr = [
            ({
                key: ``,
                value: null,
                label: 'Все типы',
            })
        ];
        for (let i = 0; i < props.ruleTypes.length; i++) {
            const element = props.ruleTypes[i];
            arr.push(
                {
                    key: `ajk_${element.id}`,
                    value: element.id,
                    label: element.name,
                });
        }
        setRuleTypes(arr);
    },
    [props.ruleTypes]);

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
    console.log(sched);
    if (selectedCompany !== 0)
    { 
        sched = sched.filter((item)=>{return item.id_company === selectedCompany});
    };
    if (selectedSchedType != null)
        { 
            sched = sched.filter((item)=>{return item.skud_schedule_type_id === selectedSchedType});
        };

    setScheduleList(
        sched.map(item => ({
            key: item.id,
            label: item.name,
            value: item.id,
        }))
    );
},[props.schedules, selectedCompany, selectedSchedType]);


useEffect(()=>{
    let ruls = props.rules;

    if (selectedCompany !== 0)
    {
        ruls = ruls.filter((item)=>{return item.id_company === selectedCompany});
    }
    if (selectedRuleType !== 0)
        {
            ruls = ruls.filter((item)=>{return item.skud_rule_type_id === selectedRuleType});
        }
    setRuleList(
        ruls.map(item => ({
            key: item.id,
            label: item.name,
            value: item.id,
        }))
    );

},[props.rules, selectedCompany, selectedRuleType]);




const handleSelectAll = (ev) => {
    if (props.onSelectAllUsers){
        props.onSelectAllUsers(ev.target.checked);
    }
}



    const handleSetStartSched = (value)=>{
        if (value.startOf('day').unix() <= dayjs().startOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        setDateSchedStart(value.startOf('day'));
    }

    const handleSetEndSched = (value)=>{
        if (value !== null && value.endOf('day').unix() <= dayjs().endOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        if (value !== null){
            value = value.endOf('day');
        }
        setDateSchedEnd(value);
    }

    const handleSetStartRule = (value)=>{
        if (value.startOf('day').unix() <= dayjs().startOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        setDateRuleStart(value.startOf('day'));
    }

    const handleSetEndRule = (value)=>{
        if (value !== null && value.endOf('day').unix() <= dayjs().endOf('day').unix())
            {
                value = dayjs().add(1, 'day');
            }
            if (value !== null){
                value = value.endOf('day');
            }
        setDateRuleEnd(value);
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
                                <span  className={'sk-totoro'}>Группы </span> <span
                                    onClick={()=>{setSelectedGroups([])}}
                                ><ClearOutlined /></span>
                            </div>
                            <br />
                            <label>Выберите группу для назначения/снятия</label>
                        <Select
                            placeholder={'Группы'}
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
                            <br />
                            <br />

                            <div>
                                Группы существуют только для группировки пользователей для удобства поиска.
                            <br />
                            <br />
                                Назначенная группа ни на что не влияет.
                            <br />
                            <br />
                                Каждому пользователю может быть назначено несколько групп.
                            <br />
                            <br />
                                - Чтобы назначить группы (группу), выберите чекбоксами нужных пользователей и нажмите "Привязать группы"
                            <br />
                                - Чтобы удалить все группы для выбранных пользователей, очистите поле выбора группы и нажмите "Удалить группы"
                            <br />
                                - Чтобы удалить конкретны группы для выбранных пользователей, выберите нужные в списке групп и нажмите "Удалить группы"
                            </div>
                        </div>
                        )}




                        {selectedTab === 2 && (
                        <div style={{width: '100%'}}>
                            <div className={'sk-flex-space'}>
                                <span className={'sk-totoro'}>Графики работы</span> 
                                
                            </div>
                            <br />
                            <label>Фильтр типа графика</label>
                        <Select
                            status="warning"
                            style={{width: '100%'}}
                            options={schedTypes}
                            onChange={(ev)=>{setSelectedSchedType(ev)}}
                            value={selectedSchedType}
                        />

                        <br />  
                        <br />  
                        <label>Выберите график работы</label>
                        <Select
                            status="error"
                            style={{width: '100%'}}
                            options={scheduleList}
                            value={selectedSchedule}
                            onChange={(ev)=>{setSelectedSchedule(ev)}}
                            />
                            <br />
                            <br />
                            <div className={"sk-flex"}>
                            <div>
                            <label>Начало действия</label>
                                <DatePicker
                                    value={dateSchedStart}
                                    onChange={handleSetStartSched}
                                />
                                </div>
                                <div>
                                <label>Завершение</label>
                                <DatePicker
                                    value={dateSchedEnd}
                                    allowClear={true}
                                    onChange={handleSetEndSched}
                                />
                                </div>
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
                            <br />
                            <br />
                            <a onClick={()=>{setLocation('schedulemanager')}}>Менеджер графиков</a>

                            <br />
                            <br />
                            <div>
                                Начало действия нового графика может быть не раньше завтрашнего дня.
                            <br />
                            <br />
                                Чтобы задать график бессрочно, оставьте второе поле даты пустым.
                            <br />
                            <br />
                                При привязки группы:
                            <br />
                                - Если существуют группы, окончания которых пересекается с началом действия устанавливаемой группы, то дата окончания существующих 
                                пересекаемых групп устанавливаются датой на день меньше, относительно начала устанавливаемой.
                            <br />
                                - Если существуют группы, дата начала которых равна или больше даты начала устанавливаемой группы, то все найденные совпадения удаляются из базы данных.
                            </div>
                        </div>
                        )}

                        {selectedTab === 3 && (
                        <div style={{width: '100%'}}>
                        
                            <div className={'sk-flex-space'}>
                            <span className={'sk-totoro'}>Правила учёта РВ</span> 
                            <br />  
                            <br />  
                                
                            </div>
                        <label>Фильтр типа графика</label>
                        <Select
                            status="warning"
                            style={{width: '100%'}}
                            options={ruleTypes}
                            onChange={(ev)=>{setSelectedRuleType(ev)}}
                            value={selectedRuleType}
                        />
                        <br />  
                        <br />  

                        <label>Выберите график</label>
                        <Select
                            status="error"
                            style={{width: '100%'}}
                            options={ruleList}
                            value={selectedRule}
                            onChange={(ev)=>{setSelectedRule(ev)}}
                            />
                            <br />
                            <br />


                            <div className={"sk-flex"}>
                                <div>
                                <label>Начало действия</label>
                                    <DatePicker
                                        value={dateRuleStart}
                                        onChange={handleSetStartRule}
                                    />
                                </div>
                                <div>
                                <label>Завершение</label>
                                <DatePicker
                                    allowClear={true}
                                    onChange={handleSetEndRule}
                                    value={dateRuleEnd}
                                />
                                </div>
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
                            <br />
                            <br />
                            <a onClick={()=>{setLocation('rulemanager')}}>Менеджер правил учёта РВ</a>

                            <br />
                            <br />
                            <div>
                                Начало действия нового правила может быть не раньше завтрашнего дня.
                            <br />
                            <br />
                                Чтобы задать правило бессрочно, оставьте второе поле даты пустым.
                            <br />
                            <br />
                                При привязки группы:
                            <br />
                                - Если существуют правила с таким же типом, окончания которых пересекается с началом действия устанавливаемого правила, то дата окончания существующих 
                                пересекаемых правил устанавливаются датой на день меньше, относительно начала устанавливаемого правила.
                            <br />
                                - Если существуют правила, дата начала которых равна или больше даты начала устанавливаемой группы, то все найденные совпадения удаляются из базы данных.
                            </div>
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