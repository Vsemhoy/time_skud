import React, { useEffect, useState, useContext } from "react";
import { Affix, Button, DatePicker, Modal, Radio, Select, Tag } from "antd";
import Search from "antd/es/transfer/search";
import {
    AppleOutlined,
    CarOutlined,
    CheckOutlined,
    DollarOutlined, ExclamationCircleOutlined,
    FireOutlined, GoldOutlined,
    HeatMapOutlined, JavaOutlined,
    LoginOutlined, LogoutOutlined,
    MedicineBoxOutlined,
    MinusCircleOutlined,
    MoonOutlined,
    QuestionCircleOutlined,
    RestOutlined,
    RocketOutlined,
    SafetyCertificateOutlined,
    SmileOutlined,
    TruckOutlined, TwitterOutlined,
    WarningOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

import { Link } from "react-router-dom";
import { BASE_ROUTE, CSRF_TOKEN, PRODMODE } from "../../../CONFIG/config";
import {DS_RULES, DS_SCHEDULE_LIST, DS_SKUD_GROUPS} from "../../../CONFIG/DEFAULTSTATE";
import {StateContext} from "../../../components/ComStateProvider25/ComStateProvider25";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {CLAIMLISTS} from "../mock/mock";
import ClaimEditorDrawer from "../../CLAIM_MANAGER_SK/components/ClaimEditorDrawer";
import {CLAIM_ACL_MOCK, USDA} from "../../CHARTS/mock/mock";


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

    const [openModalCreateF, setOpenModalCreate] = useState(false);

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
    const [editorMode, setEditorMode] = useState('read');
    const [claimForDrawer, setClaimForDrawer] = useState(null);
    const [selectedChartState, setSelectedChartState] = useState(null);
    const [reactiveColor, setReactiveColor] = useState(null);
    const [editorOpened, setEditorOpened] = useState(false);

    const openCreateDrawer = () => {
        setEditorMode('create');
        setSelectedChartState(6)
        prepareDrawer();
    };

    const prepareDrawer = (currentChart = null, user = null, start = null) => {
        if (currentChart) {
            setClaimForDrawer({
                id: currentChart?.id,
                user_id: user?.id,
                start: currentChart?.start,
                end: currentChart?.end,
                is_approved: currentChart?.approved,
                skud_current_state_id: selectedChartState,
                info: currentChart?.info,
                days_count: currentChart ? dayjs(currentChart.end).diff(dayjs(currentChart.start), 'day') : null,
                state_color: reactiveColor,
                usr_name: user?.name,
                usr_surname: user?.surname,
                usr_patronymic: user?.patronymic,
                id_company: user?.id_company,
                boss_id: user?.boss_id
            });
        } else {
            setEditorMode('create');
            console.log({
                start,
                user_id: user?.id,
                usr_name: user?.name,
                usr_surname: user?.surname,
                usr_patronymic: user?.patronymic,
                id_company: user?.id_company,
                boss_id: user?.boss_id
            })
            setClaimForDrawer({
                start: start,
                user_id: user?.id,
                usr_name: user?.name,
                usr_surname: user?.surname,
                usr_patronymic: user?.patronymic,
                id_company: user?.id_company,
                boss_id: user?.boss_id
            });
        }
        setEditorOpened(true);
    };

    const handleCloseEditor = ()=> {
        if (editorOpened){
            setEditorOpened(false);
            setEditorMode('read');
            setTimeout(() => {
                setClaimForDrawer(null);
            }, 555);
        }
    };

    const handleSaveClaim = (claim, editmode) => {
        if (editmode === 'create'){
            create_claim(claim).then();
        } else if (editmode === 'update'){
            //console.log('update claim');
            update_claim(claim).then();
        }
        setEditorOpened(false);
        setTimeout(() => {
            setClaimForDrawer(null);
        }, 555);
    };

    const create_claim = async (claimObj) => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/createclaim',
                    {
                        data: claimObj,
                        _token: CSRF_TOKEN
                    });
                //console.log('response data => ', response.data);
                // debounceFetchUsers();
            } catch (e) {
                console.log(e)
            }
        }
    };

    const update_claim = async (claimObj) => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updateclaim',
                    {
                        data: claimObj,
                        _token: CSRF_TOKEN
                    });
                //console.log('response data => ', response.data);
                // debounceFetchUsers();
            } catch (e) {
                console.log(e)
            }
        }
    };

    const handleGetBackEvent = (id)=> {
        setTimeout(() => {
            setClaimForDrawer(null);
        }, 555);
        setEditorOpened(false);
        // delete_claim(id).then();
    };
    const handleApproveEvent = (id)=> {
        const obj = {
            id: id,
            state: 1,
        };
        // update_claim_state(obj).then();
        setEditorOpened(false);
        setTimeout(() => {
            setClaimForDrawer(null);
        }, 555);
    };
    const handleDeclineEvent = (id)=> {
        const obj = {
            id: id,
            state: 2,
        };
        // update_claim_state(obj).then();
        setEditorOpened(false);
        setTimeout(() => {
            setClaimForDrawer(null);
        }, 555);
    };

    const iconComponents = {
        MinusCircleOutlined: <MinusCircleOutlined />,
        AppleOutlined: <AppleOutlined />,
        RestOutlined: <RestOutlined />,
        SafetyCertificateOutlined: <SafetyCertificateOutlined />,
        MedicineBoxOutlined: <MedicineBoxOutlined />,
        RocketOutlined: <RocketOutlined />,
        CarOutlined: <CarOutlined />,
        MoonOutlined: <MoonOutlined />,
        SmileOutlined: <SmileOutlined />,
        DollarOutlined: <DollarOutlined />,
        HeatMapOutlined: <HeatMapOutlined />,
        TruckOutlined: <TruckOutlined />,
        CheckOutlined: <CheckOutlined />,
        LoginOutlined: <LoginOutlined />,
        WarningOutlined: <WarningOutlined />,
        FireOutlined: <FireOutlined />,
        ExlamationCircleOutlined: <ExclamationCircleOutlined />,
        Logoutoutlined: <LogoutOutlined />,
        JavaOutlined: <JavaOutlined />,
        TwitterOutlined: <TwitterOutlined />,
        GoldOutlined: <GoldOutlined />,
    };


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
                                    {props.claimList && props.claimList.map((claim, index) => {
                                        return (
                                            <Button
                                                style={{
                                                    marginBottom: 5,
                                                    borderColor: claim.color,
                                                }}
                                                key={index}
                                                icon={iconComponents[claim.icon]}
                                                onClick={openCreateDrawer}
                                                block
                                            >
                                                {claim.title}
                                            </Button>
                                        );
                                    })}
                                </div>



                            )}



                        </div>
                    </div>
                </Affix>
            </div>
            {claimForDrawer && (
                <ClaimEditorDrawer
                    data={claimForDrawer}
                    mode={editorMode}
                    acl_base={props.aclBase}
                    user_list={props.users}
                    opened={editorOpened}
                    claim_type={selectedChartState}
                    on_close={handleCloseEditor}
                    claim_types={props.claimList}
                    on_send={handleSaveClaim}
                    // my_id={PRODMODE ? currentUser?.id : USDA.user.id}
                    on_get_back={handleGetBackEvent}
                    on_approve={handleApproveEvent}
                    on_decline={handleDeclineEvent}
                />
            )}
        </div>
    );
};

export default ClaimManagerTools;