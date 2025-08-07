import React, {useEffect, useRef, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Affix, Button, ConfigProvider, Layout, Pagination, Segmented, Spin, Tag} from "antd";
import {FilterOutlined, PlusOutlined,} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ChartsSidebar from "./components/ChartsSidebar";
import styles from "./style/charts.module.css"
import {CSRF_TOKEN, PRODMODE} from "../../CONFIG/config";
import {CHART_STATES, GROUPS, USDA, USERS_PAGE, CLAIM_ACL_MOCK, STATUSES, COMPANIES, CLAIM_ITEM} from "./mock/mock";
import dayjs from "dayjs";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {USERS, DEPARTMENTS} from "./mock/mock";
import ClaimEditorDrawer from "../CLAIM_MANAGER_SK/components/ClaimEditorDrawer";
import {ShortName} from "../../components/Helpers/TextHelpers";
import "./style/patch.css";
import MonthsRange from "./components/MonthsRange";
import StateIconsController from "./components/StateIconsController";
const  Charts = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingChart, setIsLoadingChart] = useState(false);
    const [isOpenFilters, setIsOpenFilters] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [filterParams, setFilterParams] = useState(null);

    const [usersPage, setUsersPage] = useState(null);

    const [chartStates, setChartStates] = useState([]);
    const [selectedChartState, setSelectedChartState] = useState(null);
    const [reactiveColor, setReactiveColor] = useState(null);

    const [activeYear, setActiveYear] = useState(dayjs().year());

    const [acls, setAcls] = useState([]);
    const [currentUser, setCurrentUser] = useState(PRODMODE ? {id:0} : USDA.user);
    const [years, setYears] = useState([]);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [userStatuses, setUserStatuses] = useState([
        {
            id: 1,
            name: 'Работают'
        },
        {
            id: 2,
            name: 'Уволенные'
        },
    ]);
    const [groups, setGroups] = useState([]);
    const [intersections, setIntersections] = useState(false);

    const [myClaims, setMyClaims] = useState(false);
    const [mySubjects, setMySubjects] = useState(false);

    const [editorMode, setEditorMode] = useState('read');
    const [editorOpened, setEditorOpened] = useState(false);
    const [claimForDrawer, setClaimForDrawer] = useState(null);
    const [aclBase, setAclBase] = useState(null);

    //const [rangeValues, setRangeValues] = useState([1,12]);
    const [rangeValues, setRangeValues] = useState([dayjs().month()+1,dayjs().month()+1]);

    const marks2 = [
        {id: 1, name: 'Январь'},
        {id: 2, name: 'Февраль'},
        {id: 3, name: 'Март'},
        {id: 4, name: 'Апрель'},
        {id: 5, name: 'Май'},
        {id: 6, name: 'Июнь'},
        {id: 7, name: 'Июль'},
        {id: 8, name: 'Август'},
        {id: 9, name: 'Сентябрь'},
        {id: 10, name: 'Октябрь'},
        {id: 11, name: 'Ноябрь'},
        {id: 12, name: 'Декабрь'},
    ];

    const debounceTimer = useRef(null);

    useEffect(() => {
        if (!isMounted) {
            setIsLoading(true);
            fetchInfo().then(r => {
                setIsMounted(true);
                setTimeout(() => setIsLoading(false), 500);
            });
        }
    }, []);
    useEffect(() => {
        if (PRODMODE) {
            if (props.userdata) {
                if (props.userdata.companies) {
                    //setCompanies(props.userdata.companies);
                }
                if (props.userdata.acls) {
                    setAcls(props.userdata.acls);
                }
                if (props.userdata.user) {
                    setCurrentUser(props.userdata.user);
                }
            }
        }
    }, [props.userdata]);
    useEffect(() => {
        if (isMounted) {
            debounceFetchUsers();
        }
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [currentPage, pageSize, filterParams, selectedChartState, rangeValues, isMounted]);
    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        //console.log(lastSegment)
        const chart = chartStates.find(state => state.name === lastSegment);
        if (chart && chart.value) {
            setSelectedChartState(chart.value);
        }
    }, [chartStates, location.pathname]);
    useEffect(() => {
        setReactiveColor(chartStates.find(state => +state.value === +selectedChartState) ?
            chartStates.find(state => +state.value === +selectedChartState).color :
            '#1890ff');
    }, [selectedChartState]);

    /* fetch */
    const fetchInfo = async () => {
        await fetchSelects();
        await fetchChartStates();
        await fetchAclBase();
    };
    const fetchSelects = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/chart/selects',
                    {
                        data: {
                            filterParams
                        },
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    const content = response.data.content;
                    setYears(updateYears());
                    setUsers(content.users);
                    setDepartments(content.departaments);
                    setGroups(content.groups);
                    setUserStatuses(content.statuses);
                    setCompanies(content.companies);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setYears(updateYears());
            setUsers(USERS);
            setDepartments(DEPARTMENTS);
            setGroups(GROUPS);
            setUserStatuses(STATUSES);
            setCompanies(COMPANIES);
        }
    };
    const fetchChartStates = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getstates',
                    {
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    setChartStates(prepareStates(response.data.content));
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setChartStates(prepareStates(CHART_STATES));
        }
    };
    const fetchAclBase = async () => {
        if (PRODMODE) {
            try {

                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getMyAcls',
                    {
                        data: [],
                        _token: CSRF_TOKEN
                    });
                setAclBase(response.data.content);
                //console.log('response data => ', response.data);
            } catch (e) {
                console.log(e)
            }
        } else {
            setAclBase(CLAIM_ACL_MOCK);
        }
    };

    const debounceFetchUsers = () => {
        setIsLoadingChart(true);
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            fetchUsers().then(r => setTimeout(() => setIsLoadingChart(false), 500));
            debounceTimer.current = null;
        }, 1000);
    };
    const fetchUsers = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/chart/users',
                    {
                        data: {
                            filterParams,
                            currentPage,
                            pageSize,
                            selectedChartState,
                            rangeValues: prepareRangeValuesToServer()
                        },
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    const content = response.data.content;
                    setUsersPage(content.users);
                    setAllUsersCount(content.count);
                    await fetchSelects();
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            //console.log(prepareRangeValuesToServer())
            setUsersPage(USERS_PAGE);
            setCurrentPage(1);
            setPageSize(10);
            setAllUsersCount(80);
        }
    };


    /* prepare */
    const prepareStates = (states) => {
        return states.filter(state => state.fillable).map(state => ({
                label: (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <StateIconsController IdState={state.id} />
                        <span>{state.title}</span>
                    </div>
                ),
                value: state.id,
                color: state.color,
                name: state.name
            }))
    };
    const prepareRangeValuesToServer = () => {
        if (!rangeValues || rangeValues.length === 0) {
            return [];
        }

        const [firstMonth, secondMonth] = rangeValues;

        // Начало первого месяца указанного года
        const startTimestamp = dayjs()
            .year(activeYear) // Указываем нужный год
            .month(firstMonth - 1) // Месяцы в dayjs: 0-11
            .startOf('month')
            .valueOf();

        // Если есть второй месяц
        if (secondMonth !== undefined) {
            const endTimestamp = dayjs()
                .year(activeYear)
                .month(secondMonth - 1)
                .endOf('month')
                .valueOf();

            return [{
                start: startTimestamp,
                end: endTimestamp
            }];
        }

        // Если только один месяц
        return [{
            start: startTimestamp,
            end: dayjs()
                .year(activeYear)
                .month(firstMonth - 1)
                .endOf('month')
                .valueOf()
        }];
    };
    const navigateTo = (value) => {
        const name = chartStates.find(state => +state.value === +value)?.name;
        if (name) {
            navigate(`../charts/${name}`, { relative: 'path' });
        }
    };
    const returnHeader = () => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        // eslint-disable-next-line default-case
        switch (lastSegment) {
            case 'sickleave':
                return 'График больничных';
            case 'longtrip':
                return 'График длительных командировок';
            case 'shorttrip':
                return 'График местных командировок';
            case 'shortvacation':
                return 'График отпусков за свой счет';
            case 'longvacation':
                return 'График отпусков';
            case 'overtime':
                return 'График сверхурочных';
            case 'containers':
                return 'График контейнеров';
        }
    };
    const updateYears = () => {
        const startYear = 2024;
        const arrYears = [];
        for (let i = startYear; i <= dayjs().year() + 1; i++) {
            arrYears.push({
                id: i,
                name: i,
            });
        }
        return arrYears;
    };


    /* filters */
    const prepareSelectOptions = (name, options) => {
        if (options && options.length > 0) {
            return options.map((option) => {
                return ({
                    key: `option-${name}-${option.id}`,
                    value: option.id,
                    label: option.name,
                    boss_id: option.boss_id,
                    id_company: option.id_company,
                    count: option.count,
                    match: option.match,
                })
            });
        } else {
            return [];
        }
    };
    const prepareShortFio = (users) => {
        return users.map((user) => {
            return {
                id: user.id,
                name: ShortName(user.surname, user.name, user.patronymic),
                boss_id: user.boss_id,
                id_company: user.id_company,
                match: user.match,
            }
        }).sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.match - a.match);
    }
    const handleFilterChanged = async (filters) => {
        setFilterParams(filters);
        setActiveYear(filters.year);
    };
    const handleFilterUsersChanged = (name, bool) => {
        // eslint-disable-next-line default-case
        switch (name) {
            case 'myClaims':
                setMyClaims(bool);
                break;
            case 'mySubjects':
                setMySubjects(bool);
                break;
        }
    };


    /* drawer */
    const openCreateDrawer = () => {
        prepareDrawerByBtn();
    };
    const prepareDrawerByBtn = () => {
        let canCreateByBtnAny = false;
        let canCreateByBtnTeam = false;
        let canCreateByBtnPers = false;
        if (
            aclBase[currentUser.id_company] &&
            aclBase[currentUser.id_company][selectedChartState] &&
            (
                aclBase[currentUser.id_company][selectedChartState]?.includes('PERS_CLAIM_CREATE')
            )
        ) { // случай нажатия на кнопку создать заявку, где не передается пользователь, которому создается, подставляем себя
            canCreateByBtnPers = true;
        } else if (
            aclBase[currentUser.id_company] &&
            aclBase[currentUser.id_company][selectedChartState] &&
            (
                aclBase[currentUser.id_company][selectedChartState]?.includes('TEAM_CLAIM_CREATE')
            )
        ) { // случай нажатия на кнопку создать заявку, где не передается пользователь, которому создается, никого не подставляем, селект с тиммейтами
            canCreateByBtnTeam = true;
        } else if (
            aclBase[currentUser.id_company] &&
            aclBase[currentUser.id_company][selectedChartState] &&
            (
                aclBase[currentUser.id_company][selectedChartState]?.includes('ANY_CLAIM_CREATE')
            )
        ) { // случай нажатия на кнопку создать заявку, где не передается пользователь, которому создается, никого не подставляем, селект со всеми
            canCreateByBtnAny = true;
        }

        if (canCreateByBtnPers || canCreateByBtnTeam || canCreateByBtnAny) {
            setEditorMode('create');
            if (canCreateByBtnPers) {
                console.log(1)
                setClaimForDrawer({
                    start: null,
                    user_id: currentUser?.id,
                    usr_name: currentUser?.name,
                    usr_surname: currentUser?.surname,
                    usr_patronymic: currentUser?.patronymic,
                    id_company: currentUser?.id_company,
                    boss_id: currentUser?.boss_id
                });
            } else if (canCreateByBtnTeam) {
                console.log(3)
                setClaimForDrawer({
                    start: null,
                    user_id: null,
                    usr_name: null,
                    usr_surname: null,
                    usr_patronymic: null,
                    id_company: currentUser?.id_company,
                    boss_id: currentUser?.boss_id
                });
            } else if (canCreateByBtnAny) {
                console.log(3)
                setClaimForDrawer({
                    start: null,
                    user_id: null,
                    usr_name: null,
                    usr_surname: null,
                    usr_patronymic: null,
                    id_company: currentUser?.id_company,
                    boss_id: null
                });
            }

            setEditorOpened(true);
        }
    };
    const prepareDrawerByChart = async (currentChart = null, user = null, start = null) => {
        if (currentChart) {
            await fetch_claim(currentChart?.id);
            setEditorOpened(true);
        } else {
            let canCreateByChartAny = false;
            let canCreateByChartTeam = false;
            let canCreateByChartPers = false;
            if (user && aclBase[user.id_company] &&
                aclBase[user.id_company][selectedChartState] &&
                aclBase[user.id_company][selectedChartState]?.includes('ANY_CLAIM_CREATE')
            ) { //создаешь заявку для любого сотрудника выбрав себя на графике
                canCreateByChartAny = true;
            } else if (user && user.boss_id === currentUser.id &&
                aclBase[user.id_company] &&
                aclBase[user.id_company][selectedChartState] &&
                aclBase[user.id_company][selectedChartState]?.includes('TEAM_CLAIM_CREATE')
            ) { // создаешь заявку для своего сотрудника выбрав его на графике
                canCreateByChartTeam = true;
            } else if (user && user.id === currentUser.id &&
                aclBase[user.id_company] &&
                aclBase[user.id_company][selectedChartState] &&
                aclBase[user.id_company][selectedChartState]?.includes('PERS_CLAIM_CREATE')
            ) { // создаешь заявку для себя выбрав себя на графике
                canCreateByChartPers = true;
            }

            if (canCreateByChartAny || canCreateByChartTeam || canCreateByChartPers) {
                setEditorMode('create');
                if (canCreateByChartPers) {
                    console.log(1)
                    setClaimForDrawer({
                        start: start,
                        user_id: currentUser?.id,
                        usr_name: currentUser?.name,
                        usr_surname: currentUser?.surname,
                        usr_patronymic: currentUser?.patronymic,
                        id_company: currentUser?.id_company,
                        boss_id: currentUser?.boss_id
                    });
                } else if (canCreateByChartAny || canCreateByChartTeam) {
                    console.log(2)
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
            }
        }
    };

    const fetch_claim = async (claim_id) => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/chart/getclaimitem',
                    {
                        data: {
                            claim_id
                        },
                        _token: CSRF_TOKEN
                    });
                //console.log('response data => ', response.data);
                setClaimForDrawer(response?.data.content);
            } catch (e) {
                console.log(e)
            }
        } else {
            const claim_item = CLAIM_ITEM;
            claim_item.skud_current_state_id = selectedChartState;
            setClaimForDrawer(claim_item);
        }
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
                debounceFetchUsers();
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
                debounceFetchUsers();
            } catch (e) {
                console.log(e)
            }
        }
    };
    const delete_claim = async (claim_id) => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/deleteclaim',
                    {
                        data: {id: claim_id},
                        _token: CSRF_TOKEN
                    });
                //console.log('response data => ', response.data);
                debounceFetchUsers();
            } catch (e) {
                console.log(e)
            }
        }
    };
    const update_claim_state = async (claimObj) => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/updatestate',
                    {
                        data: claimObj,
                        _token: CSRF_TOKEN
                    });
                //console.log('response data => ', response.data);
                debounceFetchUsers();
            } catch (e) {
                console.log(e)
            }
        }
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
    const handleGetBackEvent = (id)=> {
        setTimeout(() => {
            setClaimForDrawer(null);
        }, 555);
        setEditorOpened(false);
        delete_claim(id).then();
    };
    const handleApproveEvent = (id)=> {
        const obj = {
            id: id,
            state: 1,
        };
        update_claim_state(obj).then();
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
        update_claim_state(obj).then();
        setEditorOpened(false);
        setTimeout(() => {
            setClaimForDrawer(null);
        }, 555);
    };
    const onPreviousMonth = () => {
        let startMonth = rangeValues[0];
        let endMonth = rangeValues[1];
        startMonth--;
        endMonth--;
        setRangeValues([startMonth, endMonth]);
    };
    const onNextMonth = () => {
        let startMonth = rangeValues[0];
        let endMonth = rangeValues[1];
        startMonth++;
        endMonth++;
        setRangeValues([startMonth, endMonth]);
    };
    const handleSetActiveMonth = (monthId) => {
        setRangeValues([monthId, monthId]);
    };
    const handleSetRangeValues = (arr) => {
        setRangeValues(arr);
    };
    const isCanCreate = () => {
        if (aclBase && currentUser.id > 0 && selectedChartState && aclBase[currentUser.id_company] && aclBase[currentUser.id_company][selectedChartState]) {
            console.log(currentUser)
            console.log(aclBase[currentUser.id_company])
            return (
                aclBase[currentUser.id_company][selectedChartState]?.includes('PERS_CLAIM_CREATE') ||
                aclBase[currentUser.id_company][selectedChartState]?.includes('TEAM_CLAIM_CREATE') ||
                aclBase[currentUser.id_company][selectedChartState]?.includes('ANY_CLAIM_CREATE')
            );
        } else return false;
    };

    return (
        <Spin spinning={isLoading}>
            <div className={'mega-layout'}>
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
                                <h1 className={'page-header'}>{returnHeader()}</h1>
                                {isCanCreate() ? (
                                    <Button color={'primary'}
                                         variant={'solid'}
                                         icon={<PlusOutlined/>}
                                         style={{width: '140px'}}
                                         onClick={openCreateDrawer}
                                    >Создать заявку</Button>
                                ) : (
                                    <div style={{width: '140px'}}></div>
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
                                        <ChartsSidebar
                                            year_list={prepareSelectOptions('years', years)}
                                            user_list={prepareSelectOptions('users', prepareShortFio(users))}
                                            company_list={prepareSelectOptions('company', companies)}
                                            depart_list={prepareSelectOptions('dep', departments)}
                                            user_statuses_list={prepareSelectOptions('user_status', userStatuses)}
                                            groups_list={prepareSelectOptions('group', groups)}
                                            userAls={PRODMODE ? acls : USDA.acls}
                                            currentUser={PRODMODE ? currentUser : USDA.user}
                                            myClaims={myClaims}
                                            mySubjects={mySubjects}
                                            intersections={intersections}
                                            on_change_filter={handleFilterChanged}
                                            on_change_filter_user={handleFilterUsersChanged}
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
                                                <Segmented
                                                    value={selectedChartState}
                                                    options={chartStates}
                                                    onChange={value => navigateTo(value)}
                                                />
                                            </ConfigProvider>
                                        </div>
                                        <div className={styles.sk_pagination_wrapper}>
                                            <div className="sk-pagination-container">
                                                <Pagination
                                                    current={currentPage}
                                                    total={allUsersCount}
                                                    pageSize={pageSize}
                                                    pageSizeOptions={[100, 200]}
                                                    locale={{
                                                        items_per_page: 'на странице',
                                                        jump_to: 'Перейти',
                                                        jump_to_confirm: 'OK',
                                                        page: 'Страница'
                                                    }}
                                                    onShowSizeChange={(current, newSize) => setPageSize(newSize)}
                                                    onChange={(page) => setCurrentPage(page)}
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
                                                >Всего найдено: {allUsersCount}</Tag>
                                            </div>
                                            <div className="sk-pagination-container">
                                                <Button color={'default'}
                                                        variant={myClaims ? 'solid' : 'outlined'}
                                                        style={{width: '140px'}}
                                                        onClick={(ev) => {
                                                            setMySubjects(false);
                                                            setMyClaims(!myClaims);
                                                        }}
                                                >Мои заявки</Button>
                                                {users.find(user => +user.boss_id === +currentUser.id) && (
                                                    <Button color={'default'}
                                                         variant={mySubjects ? 'solid' : 'outlined'}
                                                         style={{width: '140px'}}
                                                         onClick={(ev) => {
                                                             setMyClaims(false);
                                                             setMySubjects(!mySubjects);
                                                         }}
                                                    >Мои сотрудники</Button>
                                                )}
                                            </div>
                                        </div>
                                        <div className={'sk-super-ckartch-patch'}>
                                            <MonthsRange
                                                range={marks2}
                                                rangeValues={rangeValues}
                                                setActiveMonth={handleSetActiveMonth}
                                                setRangeValues={handleSetRangeValues}
                                            />
                                        </div>
                                    </div>
                                </Affix>
                            </div>
                            <Outlet context={{
                                isLoadingChart,
                                usersPage,
                                selectedChartState,
                                reactiveColor,
                                rangeValues,
                                setRangeValues,
                                activeYear,
                                renderIntersections: filterParams?.intersections,
                                openDrawer: (currentChart, user, start) => prepareDrawerByChart(currentChart, user, start),
                                onPreviousMonth,
                                onNextMonth,
                            }}/>
                        </Content>
                    </Layout>
                </Layout>
                {claimForDrawer && (
                    <ClaimEditorDrawer
                        data={claimForDrawer}
                        mode={editorMode}
                        acl_base={aclBase}
                        user_list={users}
                        opened={editorOpened}
                        claim_type={selectedChartState}
                        on_close={handleCloseEditor}
                        claim_types={chartStates}
                        on_send={handleSaveClaim}
                        my_id={PRODMODE ? currentUser?.id : USDA.user.id}
                        on_get_back={handleGetBackEvent}
                        on_approve={handleApproveEvent}
                        on_decline={handleDeclineEvent}
                    />
                )}
            </div>
        </Spin>
    );
}

export default Charts;
