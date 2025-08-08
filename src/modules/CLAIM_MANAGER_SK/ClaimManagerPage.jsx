
import {Affix, Button, ConfigProvider, Dropdown, Layout, Pagination, Segmented, Select, Tag} from "antd";
import React, { useEffect, useState } from "react";

import './components/style/claimmanager.css';
import ClaimManagerCard from "./components/ClaimManagerCard";
import ClaimEditorDrawer from "./components/ClaimEditorDrawer";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import dayjs from "dayjs";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import { CLAIM_ACL_MOCK, CLAIM_BASE_CLAIM_TYPES, CLAIM_DEPARTS, CLAIM_STATES, CLAIM_USERS, CLAIMS_MOCKS } from "./CLAIM_MOCK";
import "../CHARTS/style/patch.css";
import "../USER_MANAGER_2025/USER_MANAGER/style/user_manager_page.css"

import {
    BarChartOutlined, IssuesCloseOutlined, RobotOutlined,
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined,
    TruckOutlined,
    BlockOutlined,
    DockerOutlined,
    PlusOutlined,
    PlusCircleOutlined, FilterOutlined
} from "@ant-design/icons";
import {BASE_CLAIM_TYPES, USER_STATE_PLACES} from "../../CONFIG/DEFFORMS";
import {CHART_STATES, USDA} from "../CHARTS/mock/mock";
import StateIconsController from "../CHARTS/components/StateIconsController";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import styles from "../CHARTS/style/charts.module.css";


const iconMap = {
    MinusCircleOutlined,
    AppleOutlined,
    RestOutlined,
    CheckOutlined,
    SafetyCertificateOutlined,
    MedicineBoxOutlined,
    RocketOutlined,
    CarOutlined,
    MoonOutlined,
    SmileOutlined,
    DollarOutlined,
    HeatMapOutlined,
    TruckOutlined,
    BlockOutlined,
    DockerOutlined,
    PlusOutlined
  };

const DynamicIcon = ({ iconName, ...props }) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent {...props} /> : null;
  };
{/* <DynamicIcon iconName={props.data.state_icon} />}); */}




const ClaimManagerPage = (props) => {
    const [userData, setUserData] = useState(null);
    const [typeSelect, setTypeSelect] = useState(0);
    const [editorOpened, setEditorOpened] = useState(false);

    const [isOpenFilters, setIsOpenFilters] = useState(true);

    const [formType, setFormType] = useState(null);
    const [filterPack, setFilterPack] = useState({});

    const [baseUserList, setBaseUserList] = useState([]);
    const [userList, setUserList] = useState([]);


    const [departList, setDepartList] = useState([]);
    const [baseApproverList, setBaseApproverList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [claimList, setClaimList] = useState([]);
    const [baseClaimList, setBaseClaimList] = useState([]);

    const [aclBase, setAclBase] = useState({});

    const [page, setPage] = useState(1);
    const [onPage, setOnPage] = useState(30);
    const [total, setTotal] = useState(1);

    const [baseClaimTypes, setBaseClaimTypes] = useState([]);
    const [claimTypes, setClaimTypes] = useState([]);
    const [claimTypeOptions, setClaimTypeOptions] = useState([]);
    const [reactiveColor, setReactiveColor] = useState('#c3c3c3');

    const [showOnlyCrew, setShowOnlyCrew] = useState(false);
    const [showOnlyMine, setShowOnlyMine] = useState(false);
    const [editorMode, setEditorMode] = useState('create');
    const [editedClaim, setEditedClaim] = useState(null);

    const [selectedClaimId, setSelectedClaimId] = useState(0);

    const onShowSizeChange = (current, pageSize) => {
        setOnPage(pageSize);
    };

    useEffect(() => {
      if (total < page * onPage){
        setPage(1);
      }
    }, [total]);

    const handleEditorOpen = (value) => {
        if (value && value.key){
            let key = parseInt(value.key.replace('clt_', ''));
            setEditorMode('create');
            setEditorOpened(true);
            setFormType(key);
        }
    }

    const menuProps = {
        items: claimTypes,
        onClick: handleEditorOpen,
      };

    useEffect(()=>{
        setUserData(props.userdata);
    },[props.userdata]);



    useEffect(()=>{
        setAclBase([]);
        if (PRODMODE){
            get_aclbase();
            get_departlist();
            get_stateList();
            get_userList();
            get_approverList();
            get_claimList([]);
        } else {
            //mock data
            setAclBase(CLAIM_ACL_MOCK);
            setDepartList(CLAIM_DEPARTS);
            setBaseUserList(CLAIM_USERS);
            setStateList(CLAIM_STATES);
            setBaseClaimList(CLAIMS_MOCKS);
            setBaseClaimTypes(BASE_CLAIM_TYPES);
            setTotal(CLAIMS_MOCKS.length);
            setUserData(USDA);
        }
    },[]);



    useEffect(() => {
      let clats = [];
        let clabs = [
            {
                value: 0,
                label: (
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span>Все заявки</span>
                    </div>
                ),
                background: '#c3c3c3',
                creatable: false
            }
        ];
        const MYID = userData?.user?.id;
        if (!MYID) {
            return;
        }

        // Фильтруем кнопки разных типов, чтоыбы не выводить запрещенные пользователю
        for (let i = 0; i < baseClaimTypes.length; i++) {
            const claimType = baseClaimTypes[i];
            const formType  = claimType.id;
            let allowType = false;
            for (let n = 0; n < baseUserList.length; n++) {
                const userCard = baseUserList[n];
                if (aclBase[userCard.id_company] && aclBase[userCard.id_company][formType] && aclBase[userCard.id_company][formType]?.includes('ANY_CLAIM_CREATE')){
                    // фильтр, если есть привилегия создавать для всех в компании, добавляем в список
                    allowType = true;
                    break;
                } else if (userCard.boss_id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][formType] && aclBase[userCard.id_company][formType]?.includes('TEAM_CLAIM_CREATE')){
                    // Если челик мой подчиненный и у меня есть права добавлять подчиненным
                    allowType = true;
                    break;
                } else if (userCard.id === MYID && aclBase[userCard.id_company] && aclBase[userCard.id_company][formType] && aclBase[userCard.id_company][formType]?.includes('PERS_CLAIM_CREATE')){
                    allowType = true;
                    break;
                }
            }

            let clat = {
                key: `clt_${claimType.id}`,
                value: claimType.id,
                label: claimType.text,
                color: claimType.color,
                icon: <StateIconsController IdState={claimType.id}/>
        }
            ;
            if (allowType && claimType.fillable === 1) {
                clats.push(clat);
            }

            if (allowType){
                clabs.push({
                        value: claimType.id,
                        label: (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>{claimType.title}</span>
                            </div>
                        ),
                        background: claimType.color,
                })
            };

        }
        setClaimTypes(clats);
        setClaimTypeOptions(clabs);
    }, [baseUserList, baseClaimTypes, aclBase, userData]);


    useEffect(()=>{
        setUserList(baseUserList);
    },[baseUserList]);

    useEffect(()=>{
        setClaimList(baseClaimList);
    },[baseClaimList]);

    const handleFilterChanged = (filter) => {
        console.log(filter)
        const safeFilter = (filter && !Array.isArray(filter)) ? JSON.parse(JSON.stringify(filter)) : {};
        console.log('PAGE', page);
        safeFilter.page = page;
        safeFilter.onPage = onPage;
        setFilterPack(safeFilter);
    }

    useEffect(() => {
      handleFilterChanged(filterPack);
    }, [typeSelect, page, onPage]);


    useEffect(() => {
        console.log('FAPAK', filterPack);
        const debounceTimer = setTimeout(() => {
            let pack = JSON.parse(JSON.stringify(filterPack));
            if (typeSelect !== 0){
                pack.type = typeSelect;
            } else {
                pack.type = null;
            }
            get_claimList(pack);
        }, 800);
        return () => clearTimeout(debounceTimer);
    }, [filterPack, typeSelect, showOnlyCrew, showOnlyMine]);

    // ------------------ FetchWorld ----------------------

    const get_claimList = async (filters, req, res) => {
        if (PRODMODE) {
            try {
                if (showOnlyCrew){
                    filters.boss_id = userData?.user.id;
                };
                if (showOnlyMine){
                    filters.user_id = userData?.user.id;
                };

                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getclaims',
                    {
                        data: filters,
                        _token: CSRF_TOKEN
                    });
                setBaseClaimList(response.data.content);
                setTotal(response.data.total);
                console.log('response data => ', response.data);
            } catch (e) {
                console.log(e)
            } finally {
            }
        } else {
            setBaseClaimList(CLAIMS_MOCKS);
            setTotal(CHART_STATES.length);
        }
    }

    const get_aclbase = async (req, res) => {
        try {
            
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getMyAcls',
                {
                    data: [],
                    _token: CSRF_TOKEN
                });
                setAclBase(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const get_userList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getusers', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setBaseUserList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const get_approverList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getapprovers', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setBaseApproverList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const get_stateList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getstates', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setBaseClaimTypes(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const get_departlist = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getdepartments', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setDepartList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const set_claimStatus = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/setclaimstatus', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const create_claim = async (claimObj, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/createclaim', 
                {
                    data: claimObj,
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
                get_claimList(filterPack);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const update_claim = async (claimObj, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updateclaim', 
                {
                    data: claimObj,
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
                get_claimList(filterPack);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const update_claim_state = async (claimObj, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updatestate', 
                {
                    data: claimObj,
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
                get_claimList(filterPack);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const delete_claim = async (claim_id, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/deleteclaim', 
                {
                    data: {id: claim_id},
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
                get_claimList(filterPack);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    // ------------------ FetchWorld ----------------------

    const handleSetTypeSelect = (ev, value) => {
        if (ev.button === 0){
            setTypeSelect(value);
            setReactiveColor(claimTypeOptions.find(op => +op.value === +value).background);
        } else if (ev.button === 1 && value !== 0){
            // Средней кнопкой мыши мы открываем редактор
            ev.preventDefault();
            setFormType(value);
            setEditorMode('create');
            setEditorOpened(true);
            setSelectedClaimId(0);
        }
    }

    const handleSaveClaim = (claim, editmode) => {
        if (editmode === 'create'){
            create_claim(claim);
        } else if (editmode === 'update'){
            console.log('update claim');
            update_claim(claim);
        }
        setEditorOpened(false);
        setTimeout(() => {
            setSelectedClaimId(0);
            console.log(999999999);
        }, 555);
    }

    const handleOpenInfo = (id, obj) => {
        // setViewerOpened(true);
        // setOpenedId(id);
        let type = obj.skud_current_state_id;
        setEditedClaim(obj);
        setFormType(type);
        setEditorMode('read');
        setEditorOpened(true);
        setSelectedClaimId(id);
    }

    const handleEditEvent = (id, obj)=> {
        let type = obj.skud_current_state_id;
        setEditedClaim(obj);
        setFormType(type);
        setEditorMode('update');
        setEditorOpened(true);
        setSelectedClaimId(id);
    }

    const handleApproveEvent = (id, type)=> {
        const obj = {
            id: id,
            state: 1,
        };
        update_claim_state(obj)
        setEditorOpened(false);
        setTimeout(() => {
            setSelectedClaimId(0);
            console.log(888888333333);
        }, 555);
    }

    const handleDeclineEvent = (id, type)=> {
        const obj = {
            id: id,
            state: 2,
        };
        update_claim_state(obj);
        setEditorOpened(false);
        setTimeout(() => {
            setSelectedClaimId(0);
            console.log(555555555555);
        }, 555);
    }

    const handleGetBackEvent = (id)=> {
        // let type = obj.skud_current_state_id;
        // setEditedClaim(obj);
        // setFormType(type);
        // setEditorMode('update');
        setTimeout(() => {
            setSelectedClaimId(0);
            console.log(1111111111111);
        }, 555);
        setEditorOpened(false);
        delete_claim(id);
    }

    const handleCloseEditor = ()=> {
        if (editorOpened){
            setEditorOpened(false);
            setEditorMode('read');
    
            setTimeout(() => {
                console.log(2222222222222222);
                setSelectedClaimId(0);
            }, 555);
        }
    }

    const handleSetPage = (ev) => {
        console.log(ev);
        setPage(ev);
    }

    return (
        <div className={'mega-layout'}>
            {/*<div className={'sk-content-table-wrapper'}>
                    <ConfigProvider
                        theme={{
                            components: {
                                Segmented: {
                                    itemSelectedBg: reactiveColor,
                                    itemSelectedColor: 'black',
                                    height: '150px'
                                },
                            },
                        }}
                    >
                        <Segmented
                            value={typeSelect}
                            options={claimTypeOptions.map(opt => ({
                                ...opt,
                                label: (
                                    <div
                                        onMouseDown={(e) => handleSetTypeSelect(e, opt.value)}
                                        style={{display: 'flex', alignItems: 'center', gap: '8px'}}
                                    >
                                        <StateIconsController IdState={opt.value}/>
                                        <span>{opt.label}</span>
                                    </div>
                                )
                            }))}
                            onChange={(value) => setTypeSelect(value)}
                        />
                    </ConfigProvider>
                </div>*/}
            {/*<div className={'sk-flex-space'}>
                    <div className="sk-flex">
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={total}
                            onChange={handleSetPage}
                            defaultPageSize={30}
                            pageSizeOptions={[30, 60, 100, 200, 300]}
                            locale={{
                                items_per_page: 'на странице',
                                jump_to: 'Перейти',
                                jump_to_confirm: 'OK',
                                page: 'Страница'
                            }}
                        />
                        <span className="sk-antipager-total">Всего найдено: {total}</span>
                    </div>
                    <div className="sk-flex-space">
                        <Button color="default" variant={showOnlyMine ? "solid" : "filled"}
                                onClick={() => {
                                    setShowOnlyCrew(false);
                                    setShowOnlyMine(!showOnlyMine)
                                }}
                        >Мои заявки</Button>
                        <Button color="default" variant={showOnlyCrew ? "solid" : "filled"}
                                onClick={() => {
                                    setShowOnlyCrew(!showOnlyCrew);
                                    setShowOnlyMine(false)
                                }}
                        >Мои сотрудники</Button>
                    </div>
                </div>*/}

            <Layout className={'layout'}>
                <Header className={'header'}>
                    <Affix>
                        <div className={'sk-header-container'}>
                            <Button color={'default'}
                                    variant={isOpenFilters ? 'solid' : 'outlined'}
                                    icon={<FilterOutlined />}
                                    style={{ width: '140px' }}
                                    onClick={() => setIsOpenFilters(!isOpenFilters)}
                            >Фильтры</Button>
                            {/*<h1 className={'page-header'}>Менеджер пользовательских заявок</h1>*/}
                            <h1 className={'page-header'}>Список заявок</h1>
                            {claimTypes.length > 0 ? (
                                <Dropdown
                                    menu={menuProps}
                                    onClick={handleEditorOpen}
                                    style={{ width: '140px' }}
                                >
                                    <Button
                                        icon={<PlusOutlined/>}
                                        type={'primary'}
                                    >
                                        Создать заявку
                                    </Button>
                                </Dropdown>
                            ) : (
                                <div style={{ width: '140px' }}></div>
                            )}
                        </div>
                    </Affix>
                </Header>
                <Layout className="sk-layout-center">
                    <Sider width={isOpenFilters ? "330px" : 0}
                           className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}
                    >
                        <Affix offsetTop={54}>
                            <div className="sk-width-container">
                                <div className="sk-usp-filter-col">
                                    <ClaimManagerSidebar
                                        user_list={baseUserList}
                                        depart_list={departList}
                                        company_list={userData?.companies}
                                        on_change_filter={handleFilterChanged}
                                    />
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className="sk-content-table-wrapper">
                            <Affix offsetTop={44}>
                                <div style={{backgroundColor: '#f3f3f3', outline: '2px solid #f3f3f3'}}>
                                    <div style={{paddingTop: '5px'}}>
                                        <ConfigProvider
                                            theme={{
                                                components: {
                                                    Segmented: {
                                                        itemSelectedBg: reactiveColor,
                                                        itemSelectedColor: 'black',
                                                        height: '150px'
                                                    },
                                                },
                                            }}
                                        >
                                            <Segmented value={typeSelect}
                                                       options={claimTypeOptions.map(opt => ({
                                                           ...opt,
                                                           label: (
                                                               <div
                                                                   onMouseDown={(e) => handleSetTypeSelect(e, opt.value)}
                                                                   style={{display: 'flex', alignItems: 'center', gap: '8px'}}
                                                               >
                                                                   <StateIconsController IdState={opt.value}/>
                                                                   <span>{opt.label}</span>
                                                               </div>
                                                           )
                                                       }))}
                                                       onChange={(value) => setTypeSelect(value)}
                                            />
                                        </ConfigProvider>
                                    </div>
                                    <div className={styles.sk_pagination_wrapper}>
                                        <div className="sk-pagination-container">
                                            <Pagination
                                                defaultCurrent={1}
                                                total={total}
                                                pageSize={30}
                                                pageSizeOptions={[30, 60, 100, 200, 300]}
                                                locale={{
                                                    items_per_page: 'на странице',
                                                    jump_to: 'Перейти',
                                                    jump_to_confirm: 'OK',
                                                    page: 'Страница'
                                                }}
                                                onShowSizeChange={onShowSizeChange}
                                                onChange={handleSetPage}
                                            />

                                            <Tag
                                                style={{
                                                    width: '160px',
                                                    height: '30px',
                                                    lineHeight: '27px',
                                                    textAlign: 'center',
                                                    color: '#868686',
                                                    fontSize: '14px',
                                                    backgroundColor: '#ededed',
                                                    borderColor: '#ededed',
                                                }}
                                            >Всего найдено: {total}</Tag>
                                        </div>
                                        <div className="sk-pagination-container">
                                            <Button color={'default'}
                                                    variant={showOnlyMine ? 'solid' : 'outlined'}
                                                    style={{width: '140px'}}
                                                    onClick={(ev) => {
                                                        setShowOnlyCrew(false);
                                                        setShowOnlyMine(!showOnlyMine);
                                                    }}
                                            >Мои заявки</Button>
                                            {userList && userData && userList.find(user => +user.boss_id === +userData.id) && (
                                                <Button color={'default'}
                                                        variant={showOnlyCrew ? 'solid' : 'outlined'}
                                                        style={{width: '140px'}}
                                                        onClick={(ev) => {
                                                            setShowOnlyCrew(!showOnlyCrew);
                                                            setShowOnlyMine(false);
                                                        }}
                                                >Мои сотрудники</Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Affix>
                        </div>
                        <div className="sk-usp-content-col">
                            <div className={'sk-arche-stack'}
                                 style={{paddingBottom: '44vw'}}
                            >
                                <Affix offsetTop={135}>
                                    <div className="sk-clamen-headerrow">
                                        <div className={'sk-clamen-card'}>
                                            <div>
                                                <div>
                                                    Тип
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Пользователь
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Статус
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Начало
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Конец
                                                </div>
                                            </div>
                                            <div>
                                                <div title="количество дней в заявке">
                                                    Дней
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Информация
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    id
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    Исп
                                                </div>
                                            </div>
                                            <div>
                                                <div>

                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </Affix>
                                {claimList.map((claim, idx) => (
                                    <ClaimManagerCard
                                        key={`${claim.id}-ClaimManagerCard-${idx}`}
                                        data={claim}
                                        my_id={userData?.user?.id}
                                        on_click={handleOpenInfo}
                                        acl_base={aclBase}
                                        selected={claim.id === selectedClaimId}
                                        on_approve={handleApproveEvent}
                                        on_decline={handleDeclineEvent}
                                        on_edit={handleEditEvent}
                                        on_get_back={handleGetBackEvent}
                                    />
                                ))}


                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>

            {/*<div style={{padding: '6px'}} className={'sk-mw-1400'}>*/}
            {/*<br/>*/}
            {/*<div className={'sk-usp-layout-container'}>
                        <div>
                            <div
                                style={{fontSize: '16px', fontWeight: '500', padding: '16px 0px'}}
                            >Менеджер пользовательских заявок
                            </div>
                        </div>

                        <div className="sk-flex-space">

                             <div className={`sk-claiman-type-selector`}>
                                {claimTypeOptions.map(option => (
                                    <div
                                    key={option.value === null ? 'all' : option.value}
                                    className={`sk-claiman-typeselect-item ${typeSelect === option.value ? 'sk-active' : ''}`}
                                    onMouseDown={(ev)=>{handleSetTypeSelect(ev, option.value)}}
                                    style={{ background: option.background }}
                                    >
                                    <div>
                                        <span className="sk-claim-select-icon">{option.icon}</span>
                                        <span>{option.label}</span>
                                    </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {claimTypes.length > 0 && (

                                    <Dropdown
                                        menu={menuProps}
                                        onClick={handleEditorOpen}
                                    >
                                        <Button
                                            icon={<PlusOutlined/>}
                                            type={'primary'}
                                        >
                                            Создать заявку
                                        </Button>
                                    </Dropdown>
                                )}
                            </div>
                        </div>
                    </div>*/}
            {/*<div className={'sk-usp-layout-container'}>
                        <div className="sk-usp-filter-col">
                            <Affix offsetTop={0}>

                                <ClaimManagerSidebar
                                    user_list={baseUserList}
                                    depart_list={departList}
                                    company_list={userData?.companies}
                                    on_change_filter={handleFilterChanged}
                                />
                            </Affix>
                        </div>


                        <div>
                            <div className={'sk-flex-space'}>
                                <div className="sk-flex">
                                    <Pagination
                                        showSizeChanger
                                        onShowSizeChange={onShowSizeChange}
                                        defaultCurrent={1}
                                        total={total}
                                        onChange={handleSetPage}
                                        defaultPageSize={30}
                                        pageSizeOptions={[30, 60, 100, 200, 300]}
                                        locale={{
                                            items_per_page: 'на странице',
                                            jump_to: 'Перейти',
                                            jump_to_confirm: 'OK',
                                            page: 'Страница'
                                        }}
                                    />
                                    <span className="sk-antipager-total">Всего найдено: {total}</span>
                                </div>
                                <div className="sk-flex-space">
                                    <Button color="default" variant={showOnlyMine ? "solid" : "filled"}
                                            onClick={() => {
                                                setShowOnlyCrew(false);
                                                setShowOnlyMine(!showOnlyMine)
                                            }}
                                    >Мои заявки</Button>
                                    <Button color="default" variant={showOnlyCrew ? "solid" : "filled"}
                                            onClick={() => {
                                                setShowOnlyCrew(!showOnlyCrew);
                                                setShowOnlyMine(false)
                                            }}
                                    >Мои сотрудники</Button>
                                </div>
                            </div>

                            <br/>

                            <div className="sk-usp-content-col">
                                <div className={'sk-arche-stack'}
                                     style={{paddingBottom: '44vw'}}
                                >
                                    <Affix offsetTop={0}>
                                        <div className="sk-clamen-headerrow">
                                            <div className={'sk-clamen-card'}>
                                                <div>
                                                    <div>
                                                        id
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        Пользователь
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        Инфо
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        Начало
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        Конец
                                                    </div>
                                                </div>
                                                <div>
                                                    <div title="количество дней в заявке">
                                                        дней
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        id
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        утв
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        исп
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>

                                                    </div>
                                                </div>

                                            </div>


                                        </div>
                                    </Affix>
                                    {claimList.map((claim, idx) => (
                                        <ClaimManagerCard
                                            key={`${claim.id}-ClaimManagerCard-${idx}`}
                                            data={claim}
                                            my_id={userData?.user?.id}
                                            on_click={handleOpenInfo}
                                            acl_base={aclBase}
                                            selected={claim.id === selectedClaimId}
                                            on_approve={handleApproveEvent}
                                            on_decline={handleDeclineEvent}
                                            on_edit={handleEditEvent}
                                            on_get_back={handleGetBackEvent}
                                        />
                                    ))}


                                </div>
                            </div>


                        </div>
                    </div>*/}
            {/*</div>*/}

            <ClaimEditorDrawer
                data={editedClaim}
                mode={editorMode}
                acl_base={aclBase}
                user_list={userList}
                opened={editorOpened}
                claim_type={formType}
                on_close={handleCloseEditor}

                claim_types={claimTypes}
                on_send={handleSaveClaim}
                my_id={userData?.user?.id}
                on_get_back={handleGetBackEvent}
                on_approve={handleApproveEvent}
                on_decline={handleDeclineEvent}
            />


        </div>
    )
}

export default ClaimManagerPage;