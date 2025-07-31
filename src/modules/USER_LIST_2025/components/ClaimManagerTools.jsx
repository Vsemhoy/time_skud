import React, { useEffect, useState, useContext } from "react";
import { Affix, Button, DatePicker, Modal, Radio, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import { QuestionCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { Link } from "react-router-dom";
import { BASE_ROUTE, CSRF_TOKEN, PRODMODE } from "../../../CONFIG/config";
import {DS_RULES, DS_SCHEDULE_LIST, DS_SKUD_GROUPS} from "../../../CONFIG/DEFAULTSTATE";
import {StateContext} from "../../../components/ComStateProvider25/ComStateProvider25";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";


const ClaimManagerTools = (props)=>{
    const { state, setState } = useContext(StateContext);

    const [baseRuleList, setBaseRuleList] = useState([]);
    const [ruleList, setRuleList] = useState(props.rules);
    
    const [baseScheduleList, setBaseScheduleList] = useState([]);
    const [scheduleList, setScheduleList] = useState(props.schedules);

    const [openedConsole, setOpenedConsole] = useState(true);

    const [companiesList, setCompaniesList] = useState([]);
    const [groupList, setGroupList] = useState([]);


    const [selectedSortBy, setSelectedSortBy] = useState("");
    const [selectedCompany, setSelectedCompany] = useState(0);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [filterText, setFilterText] = useState('');

    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [selectedRule, setSelectedRule] = useState('');

    const [selectedUsers, setSelectedUsers] = useState(props.selected_users);

    const [selectedTab, setSelectedTab] = useState(1);


    const [schedTypes, setSchedTypes] = useState([]);
    const [ruleTypes, setRuleTypes]  = useState([]);



    const [selectedSchedType, setSelectedSchedType] = useState('');
    const [selectedRuleType, setSelectedRuleType] = useState('');
    const [baseGroupList, setBaseGroupList] = useState([]);


    const [dateSchedStart, setDateSchedStart] = useState(dayjs().add(1, 'day').startOf('day'));
    const [dateSchedEnd, setDateSchedEnd] = useState(dayjs().add(10, 'year').endOf('day'));


    const [dateRuleStart, setDateRuleStart] = useState(dayjs().add(1, 'day').startOf('day'));
    const [dateRuleEnd, setDateRuleEnd] = useState(dayjs().add(10, 'year').endOf('day'));

    const [formStart, setFormStart] = useState(dayjs().add(1,'day').startOf('day'));
    const [formEnd, setFormEnd]  = useState(dayjs().add(1,'month').endOf('day'));

    const [openModalSchedInfo, setOpenModalSchedInfo] = useState(false);
    const [openModalRuleTypeInfo, setOpenModalRuleTypeInfo] = useState(false);


    useEffect(() => {
      if (PRODMODE){
          get_ruleList();
          get_scheduleList();
          get_groupList();
      } else {
          setBaseRuleList(DS_RULES);
          setBaseScheduleList(DS_SCHEDULE_LIST);
          setBaseGroupList(DS_SKUD_GROUPS);
      }
    }, []);




    useEffect(() => {
        if (baseScheduleList === undefined) return;

        let sh = baseScheduleList;

        if (selectedCompany !== null && selectedCompany > 1){
            sh = baseScheduleList.filter((item)=> item.id_company === selectedCompany);
        }

        if (selectedSchedType != null && selectedSchedType != "")
        {
          setScheduleList(sh.filter((item)=> item.skud_schedule_type_id === selectedSchedType).map((item)=>(
              {
                  key: `ajrk_${item.id}`,
                  value: item.id,
                  label: item.name,
                }
            )));
        } else {
            setScheduleList(sh.filter((item)=> item.skud_schedule_type_id !== selectedSchedType).map((item)=>(
              {
                  key: `arejk_${item.id}`,
                  value: item.id,
                  label: item.name,
                }
            )));
      }
    }, [baseScheduleList, selectedSchedType, selectedCompany]);

    useEffect(() => {
        if (baseRuleList === undefined) return;

        let rl = baseRuleList;

        if (selectedCompany !== null && selectedCompany > 1){
            rl = baseRuleList.filter((item)=> item.id_company === selectedCompany);
        }

        if (selectedRuleType != null && selectedRuleType != "")
        {
          setRuleList(rl.filter((item)=> item.rule_type_id === selectedRuleType).map((item)=>(
              {
                  key: `rrajk_${item.id}`,
                  value: item.id,
                  label: item.name,
                }
            )));
        } else {
            setRuleList(rl.filter((item)=> item.rule_type_id !== selectedRuleType).map((item)=>(
              {
                  key: `ajrrk_${item.id}`,
                  value: item.id,
                  label: item.name,
                }
            )));
      }
    }, [baseRuleList, selectedRuleType,selectedCompany]);


    /* useEffects */
    useEffect(()=>{
            if (props.schedTypes === undefined){
                return;
            };

            let baseCount = 0;
            if (baseScheduleList){
                if (selectedCompany !== null && selectedCompany > 1){
                    baseCount = baseScheduleList.filter((item)=> item.id_company === selectedCompany).length;
                } else {
                    baseCount = baseScheduleList.length;
                }
            }

            let arr = [
                ({
                    key: ``,
                    value: '',
                    label: <span className="sk-flex-space"><span>Все типы</span><span>{baseCount}</span></span>,
                })
            ];
            for (let i = 0; i < props.schedTypes.length; i++) {
                const element = props.schedTypes[i];
                let localCount = 0;
                if (baseScheduleList){
                    if (selectedCompany !== null && selectedCompany > 1){
                        localCount = baseScheduleList.filter((item)=> item.id_company === selectedCompany && item.skud_schedule_type_id === element.id).length;
                    } else {
                        localCount = baseScheduleList.filter((item)=> item.skud_schedule_type_id === element.id).length;
                    }
                }
                arr.push(
                    {
                        key: `ajk_${element.id}`,
                        value: element.id,
                        label: <span className="sk-flex-space"><span>{element.name}</span><span>{localCount}</span></span>,
                    });
            }
            setSchedTypes(arr);
        },
        [props.schedTypes, selectedCompany]);




    useEffect(()=>{
            if (props.ruleTypes === undefined){
                return;
            };

            let baseCount = 0;
            if (baseRuleList){
                if (selectedCompany !== null && selectedCompany > 1){
                    baseCount = baseRuleList.filter((item)=> item.id_company === selectedCompany).length;
                } else {
                    baseCount = baseRuleList.length;
                }
            }

            let arr = [
                ({
                    key: ``,
                    value: '',
                    label: <span className="sk-flex-space"><span>Все типы</span><span>{baseCount}</span></span>,
                })
            ];
            for (let i = 0; i < props.ruleTypes.length; i++) {
                const element = props.ruleTypes[i];
                let localCount = 0;
                if (baseRuleList){
                    if (selectedCompany !== null && selectedCompany > 1){
                        localCount = baseRuleList.filter((item)=> item.id_company === selectedCompany && item.rule_type_id === element.id).length;
                    } else {
                        localCount = baseRuleList.filter((item)=> item.rule_type_id === element.id).length;
                    }
                }
                arr.push(
                    {
                        key: `ajk56_${element.id}`,
                        value: element.id,
                        label: <span className="sk-flex-space"><span>{element.name}</span><span>{localCount}</span></span>,
                    });
            }
            setRuleTypes(arr);
        },
        [props.ruleTypes, selectedCompany]);


    useEffect(()=>{
        setSelectedUsers(props.selected_users);
    },[props.selected_users]);



    useEffect(()=>{
        if (props.companies?.length){
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
        console.log(selectedCompany);
    },[props.selectedCompany])


    useEffect(() => {
        let gro = baseGroupList;
        setGroupList([]);
        if (selectedCompany !== null && selectedCompany > 1){
            gro = baseGroupList.filter((item)=> item.id_company === selectedCompany);
        }

            setGroupList(
                gro.map(item => ({
                    key: item.id,
                    label: <span title={item.name}>{item.name}</span>,
                    value: item.id,
                    color: item.company_color
                }))
            );
        
    }, [baseGroupList, selectedCompany]);




    const handleSelectAll = (ev) => {
        if (props.onSelectAllUsers){
            props.onSelectAllUsers(ev.target.checked);
        }
    }


    /* ------------------------- FETCH ---------------------- */

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


    /**
     * Перелинковка юзеров с правилами массовая
     * @param {*} req 
     * @param {*} res 
     */
            const create_links_with_rules = async (body, req, res) => {
                console.log('body',body);
                try {
                    let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/bindrules',
                        {   
                            data: body, 
                            _token: CSRF_TOKEN
                        }
                    );
                    
                    if (response){
                      
                    }
  
                } catch (e) {
                    console.log(e)
                } finally {
              }
          }

    /**
     * Перелинковка юзеров с графиками
     * @param {*} req 
     * @param {*} res 
     */
          const create_links_with_schedules = async (body, req, res) => {
              console.log('body',body);
              try {
                  let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/bindschedules',
                      {   
                          data: body, 
                          _token: CSRF_TOKEN
                      }
                  );
                  
                  if (response){
                  }

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
    const bind_groups_to_users = async (users, groups, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/bindgroups', 
                {
                    data: {
                        users: users,
                        groups: groups
                    },
                    _token: CSRF_TOKEN
                });
                // setBaseGroupList(response.data.content);
                console.log('get_calendarList => ', response.data);
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
    const unlink_groups_for_users = async (users, groups, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/usermanager/unlinkgroups', 
                {
                    data: {
                        users: users,
                        groups: groups
                    },
                    _token: CSRF_TOKEN
                });
                // setBaseGroupList(response.data.content);
                console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }



    /* ------------------------- FETCH ---------------------- */



    const handleSetStartSched = (value)=>{
        if (value.startOf('day').unix() <= dayjs().startOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        setFormStart(value.startOf('day'));
    }

    const handleSetEndSched = (value)=>{
        if (value !== null && value.endOf('day').unix() <= dayjs().endOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        if (value !== null){
            value = value.endOf('day');
        }
        setFormEnd(value);
    }

    const handleSetStartRule = (value)=>{
        if (value.startOf('day').unix() <= dayjs().startOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        setFormStart(value.startOf('day'));
    }

    const handleSetEndRule = (value)=>{
        if (value !== null && value.endOf('day').unix() <= dayjs().endOf('day').unix())
        {
            value = dayjs().add(1, 'day');
        }
        if (value !== null){
            value = value.endOf('day');
        }
        setFormEnd(value);
    }

    const handleKeyDown = (e, callback) => {
        // If formStart is null, set it to today's date
        let currentDate = e.target.value;
        if (currentDate === ""){
            currentDate = dayjs();
        } else {
            currentDate = dayjs(currentDate);
        }
        console.log(currentDate);

        switch (e.key) {
            case "ArrowLeft":
                // Subtract 1 day
                currentDate = currentDate.subtract(1, "day");
                break;
            case "ArrowRight":
                // Add 1 day
                currentDate = currentDate.add(1, "day");
                break;
            case "ArrowUp":
                // Add 1 month
                currentDate = currentDate.add(1, "month");
                break;
            case "ArrowDown":
                // Subtract 1 month
                currentDate = currentDate.subtract(1, "month");
                break;
            default:
                return; // Do nothing for other keys
        }

        // Prevent default browser behavior for arrow keys
        e.preventDefault();

        // Update the date picker value
        if (callback){
            callback(currentDate);
        }
    };

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

    const callToSelectGroups = ()=>{
        bind_groups_to_users(selectedUsers, selectedGroups);
        if (props.on_action){
            props.on_action();
        }
    }

    const callToClearGroups = ()=>{
        unlink_groups_for_users(selectedUsers, selectedGroups);
        if (props.on_action){
            props.on_action();
        }
    }

    const callToBindSchedules = ()=>{
        if (props.onBidnSchedules){
            props.onBidnSchedules(
                selectedSchedule,
                formStart,
                formEnd,
            )
        }
    }

    const callToBindRules = ()=>{
        if (props.onBidnRules){
            props.onBidnRules(
                selectedRule,
                formStart,
                formEnd,
            )
        }
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
            unlink_groups_for_users(selectedUsers, groups);
    
            // let bus = JSON.parse(JSON.stringify(baseUserList));
            // if (groups && groups.length){
            //     for (let i = 0; i < bus.length; i++) {
            //         const element = bus[i];
        
            //         if (selectedUsers.includes(element.id)){
            //             for (let g = 0; g < groups.length; g++) {
            //                 const grp = groups[g];
            //                 const indexxer = element.groups.indexOf(grp);
            //                 if (indexxer > -1) {
            //                     bus[i].groups.splice(indexxer, 1);
            //                 }
            //         }
            //     }
            // }
    
            // } else {
            //     console.log('ELSE - empty groups - clear all existed');
            //     for (let i = 0; i < bus.length; i++) {
            //         const element = bus[i];
    
            //         if (selectedUsers.includes(element.id)){
            //                 bus[i].groups = [];
            //             }
            //         }
            //     }
            // setBaseUserList(bus);
        }
    
    
        const handleBindSchedules = ()=>{
            let start = formStart;
            let end   = formEnd;
            let schedule = selectedSchedule;
            const data = {
                users: selectedUsers,
                schedule_id: schedule,
                start: start.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: !end ? null : end.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
              };
            create_links_with_schedules(data);
        }
    
    
        const handleBindRules = ()=>{
            let start = formStart;
            let end   = formEnd;
            let rule = selectedRule;
            const data = {
                users: selectedUsers,
                rule_id: rule,
                rule_type: null,
                start: start.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: !end ? null : end.endOf('day').format('YYYY-MM-DD HH:mm:ss'),
              };
            create_links_with_rules(data);
        }

    return (
        <div>
            <div>
                <Affix offsetTop={46}>
                    <div className={"sk-tool-console"}>
                        <div className={''} style={{justifyContent: 'space-between'}}>
                            <div>
                                <Radio.Group value={selectedTab} block>
                                    <Radio.Button
                                        onClick={() => {
                                            setSelectedTab(1)
                                        }}
                                        value={1}>Мои</Radio.Button>
                                    <Radio.Button
                                        onClick={() => {
                                            setSelectedTab(2)
                                        }}
                                        value={2}>Подчиненные</Radio.Button>
                                </Radio.Group>
                            </div>
                            <br/>
                            {selectedTab === 1 && (
                                <div style={{width: '100%'}}>
                                    <Button
                                        // size={'small'}
                                        // disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                        onClick={callToSelectGroups}
                                        block
                                    >Командировка</Button>

                                    <Button
                                        // size={'small'}
                                        // disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                        onClick={callToSelectGroups}
                                        block
                                    >Отпуск</Button>

                                    <Button
                                        // size={'small'}
                                        // disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                        onClick={callToSelectGroups}
                                        block
                                    >Больничные</Button>


                                    <Button
                                        // size={'small'}
                                        // disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                        onClick={callToSelectGroups}
                                        block
                                    >СВО</Button>

                                    <Button
                                        // size={'small'}
                                        // disabled={selectedUsers.length === 0 || selectedGroups.length === 0 ? true : false}
                                        onClick={callToSelectGroups}
                                        block
                                    >Полный отпуск+</Button>
                                </div>



                            )}
                            {selectedTab === 2 && (
                                <div style={{width: '100%'}}>
                                    <div className={'sk-flex-space'}>
                                        <span className={'sk-totoro'}>Графики работы</span>
                                    </div>
                                    <br/>
                                    <label>Фильтр типа графика</label>
                                    <div className={'sk-flex-space'}>
                                        <Select
                                            status="warning"
                                            style={{width: '100%'}}
                                            options={schedTypes}
                                            onChange={(ev) => {
                                                setSelectedSchedType(ev)
                                            }}
                                            value={selectedSchedType}
                                        />
                                        <Button
                                            onClick={() => {
                                                setOpenModalSchedInfo(true)
                                            }}
                                        ><QuestionCircleOutlined/></Button>
                                    </div>
                                    <br/>
                                    <label>Выберите график работы</label>
                                    <Select
                                        status="error"
                                        style={{width: '100%'}}
                                        options={scheduleList}
                                        value={selectedSchedule}
                                        onChange={(ev) => {
                                            setSelectedSchedule(ev)
                                        }}
                                    />
                                    <br/>
                                    <br/>
                                    <div className={"sk-flex"}>
                                        <div>
                                            <label>Начало действия</label>
                                            <DatePicker
                                                value={formStart}
                                                onChange={handleSetStartSched}
                                                onKeyDown={(event) => {
                                                    handleKeyDown(event, setFormStart)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label>Завершение</label>
                                            <DatePicker
                                                value={formEnd}
                                                allowClear={true}
                                                onChange={handleSetEndSched}
                                                onKeyDown={(event) => {
                                                    handleKeyDown(event, setFormEnd)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"sk-flex"}>
                                        <Button
                                            disabled={selectedUsers.length === 0 || selectedSchedule == null ? true : false}
                                            size={'small'}
                                            block
                                            onClick={handleBindSchedules}
                                        >Привязать график</Button>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>

                                    <Link to={BASE_ROUTE + "/hr/schedules"}>Менеджер графиков</Link>
                                    <br/>
                                    <br/>
                                    <div>
                                        Начало действия нового графика может быть не раньше завтрашнего дня.
                                        <br/>
                                        <br/>
                                        Чтобы задать график бессрочно, оставьте второе поле даты пустым.
                                        <br/>
                                        <br/>
                                        При привязки группы:
                                        <br/>
                                        - Если существуют группы, окончания которых пересекается с началом действия
                                        устанавливаемой группы, то дата окончания существующих
                                        пересекаемых групп устанавливаются датой на день меньше, относительно начала
                                        устанавливаемой.
                                        <br/>
                                        - Если существуют группы, дата начала которых равна или больше даты начала
                                        устанавливаемой группы, то все найденные совпадения удаляются из базы данных.
                                    </div>
                                </div>
                            )}

                            {selectedTab === 3 && (
                                <div style={{width: '100%'}}>

                                    <div className={'sk-flex-space'}>
                                        <span className={'sk-totoro'}>Правила учёта РВ</span>
                                        <br/>
                                        <br/>

                                    </div>
                                    <label>Фильтр типа правила</label>
                                    <div className={'sk-flex-space'}>
                                        <Select
                                            status="warning"
                                            style={{width: '100%'}}
                                            options={ruleTypes}
                                            onChange={(ev) => {
                                                setSelectedRuleType(ev)
                                            }}
                                            value={selectedRuleType}
                                        />
                                        <Button
                                            onClick={() => {
                                                setOpenModalRuleTypeInfo(true)
                                            }}
                                        ><QuestionCircleOutlined/></Button>
                                    </div>
                                    <br/>
                                    <br/>
                                    <label>Выберите правило учёта РВ</label>
                                    <Select
                                        status="error"
                                        style={{width: '100%'}}
                                        options={ruleList}
                                        value={selectedRule}
                                        onChange={(ev) => {
                                            setSelectedRule(ev)
                                        }}
                                    />
                                    <br/>
                                    <br/>
                                    <div className={"sk-flex"}>
                                        <div>
                                            <label>Начало действия</label>
                                            <DatePicker
                                                value={formStart}
                                                onChange={handleSetStartRule}
                                                onKeyDown={(event) => {
                                                    handleKeyDown(event, setFormStart)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label>Завершение</label>
                                            <DatePicker
                                                allowClear={true}
                                                onChange={handleSetEndRule}
                                                value={formEnd}
                                                onKeyDown={(event) => {
                                                    handleKeyDown(event, setFormEnd)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <br/>
                                    <div className={"sk-flex"}>
                                        <Button
                                            disabled={selectedUsers.length === 0 || selectedRule == null ? true : false}
                                            size={'small'}
                                            block
                                            onClick={handleBindRules}
                                        >Привязать правила</Button>
                                    </div>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <Link to={BASE_ROUTE + "/hr/rules"}>Менеджер правил учёта РВ</Link>
                                    <br/>
                                    <br/>
                                    <div>
                                        Начало действия нового правила может быть не раньше завтрашнего дня.
                                        <br/>
                                        <br/>
                                        Чтобы задать правило бессрочно, оставьте второе поле даты пустым.
                                        <br/>
                                        <br/>
                                        При привязки группы:
                                        <br/>
                                        - Если существуют правила с таким же типом, окончания которых пересекается с
                                        началом действия устанавливаемого правила, то дата окончания существующих
                                        пересекаемых правил устанавливаются датой на день меньше, относительно начала
                                        устанавливаемого правила.
                                        <br/>
                                        - Если существуют правила, дата начала которых равна или больше даты начала
                                        устанавливаемой группы, то все найденные совпадения удаляются из базы данных.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Affix>
            </div>
        </div>
    );
};

export default ClaimManagerTools;