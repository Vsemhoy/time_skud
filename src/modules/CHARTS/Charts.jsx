import React, {useEffect, useRef, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {Affix, Button, ConfigProvider, Layout, Pagination, Segmented, Slider, Spin, Tag} from "antd";
import {
    AppleOutlined,
    CarOutlined,
    CheckOutlined,
    DollarOutlined,
    ExclamationCircleOutlined,
    FilterOutlined,
    FireOutlined, GoldOutlined,
    HeatMapOutlined,
    JavaOutlined,
    LoginOutlined,
    LogoutOutlined,
    MedicineBoxOutlined,
    MinusCircleOutlined,
    MoonOutlined,
    PlusOutlined,
    RestOutlined,
    RocketOutlined,
    SafetyCertificateOutlined,
    SmileOutlined,
    TruckOutlined,
    TwitterOutlined,
    WarningOutlined
} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ChartsSidebar from "./components/ChartsSidebar";
import styles from "./style/charts.module.css"
import {CSRF_TOKEN, PRODMODE} from "../../CONFIG/config";
import {CHART_STATES, GROUPS, USDA} from "./mock/mock";
import dayjs from "dayjs";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {USERS, DEPARTMENTS} from "./mock/mock";
const  Charts = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingChart, setIsLoadingChart] = useState(false);
    const [isOpenFilters, setIsOpenFilters] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [filterParams, setFilterParams] = useState(null);

    const [usersPage, setUsersPage] = useState(null);

    const [chartStates, setChartStates] = useState([]);
    const [selectedChartState, setSelectedChartState] = useState(null);
    const [reactiveColor, setReactiveColor] = useState(null);

    const [activeYear, setActiveYear] = useState(dayjs().year());

    const [acls, setAcls] = useState([]);
    const [currentUser, setCurrentUser] = useState({id:0});
    const [years, setYears] = useState([]);
    const [users, setUsers] = useState([]);
    const [bosses, setBosses] = useState([]);
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

    const [myClaims, setMyClaims] = useState(false);
    const [mySubjects, setMySubjects] = useState(false);

    const [rangeValues, setRangeValues] = useState([dayjs().month() + 1,dayjs().month() + 1]);

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
    const marks = {
        1: 'Январь',
        2: 'Февраль',
        3: 'Март',
        4: 'Апрель',
        5: 'Май',
        6: 'Июнь',
        7: 'Июль',
        8: 'Август',
        9: 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь',
    };

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
        if (props.userdata) {
            if (props.userdata.companies) {
                setCompanies(props.userdata.companies);
            }
            if (props.userdata.acls) {
                setAcls(props.userdata.acls);
            }
            if (props.userdata.user) {
                setCurrentUser(props.userdata.user);
            }
        }
    }, [props.userdata]);
    useEffect(() => {
        if (isMounted) {
            setIsLoadingChart(true);
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                fetchUsers().then(r => setTimeout(() => setIsLoadingChart(false), 500));
                debounceTimer.current = null;
            }, 1000);
        }
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
        };
    }, [currentPage, pageSize, filterParams, selectedChartState, rangeValues, isMounted]);
    useEffect(() => {
        const pathSegments = location.pathname.split('/').filter(Boolean);
        const lastSegment = pathSegments[pathSegments.length - 1];
        console.log(lastSegment)
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

    const fetchInfo = async () => {
        await fetchSelects();
        await fetchChartStates();
        //await fetchUsers();
    };
    const fetchSelects = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/chart/selects',
                    {
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    const content = response.data.content;
                    setYears(updateYears());
                    setUsers(content.users);
                    setDepartments(content.departaments);
                    setGroups(content.groups);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setYears(updateYears());
            setUsers(USERS);
            setDepartments(DEPARTMENTS);
            setGroups(GROUPS);
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
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            console.log(prepareRangeValuesToServer())
            setUsersPage(USERS);
            setCurrentPage(1);
            setPageSize(10);
            setAllUsersCount(80);
        }
    };
    const prepareStates = (states) => {
        return states.filter(state => state.fillable).map(state => ({
                label: state.badge,
                value: state.id,
                icon: iconComponents[state.icon] || null,
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
                    boss_id: option.boss_id
                })
            });
        } else {
            return [];
        }
    };
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
                                <Button color={'primary'}
                                        variant={'solid'}
                                        icon={<PlusOutlined/>}
                                        style={{ width: '140px' }}
                                >Создать заявку</Button>
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
                                            user_list={prepareSelectOptions('users', users)}
                                            boss_list={prepareSelectOptions('boss', bosses)}
                                            company_list={prepareSelectOptions('company', companies)}
                                            depart_list={prepareSelectOptions('dep', departments)}
                                            user_statuses_list={prepareSelectOptions('user_status', userStatuses)}
                                            groups_list={prepareSelectOptions('group', groups)}
                                            userAls={PRODMODE ? acls : USDA.acls}
                                            currentUser={PRODMODE ? currentUser : USDA.user}
                                            myClaims={myClaims}
                                            mySubjects={mySubjects}
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
                                    <div>
                                        <div style={{marginTop: '5px'}}>
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Segmented: {
                                                            itemSelectedBg: reactiveColor,
                                                            itemSelectedColor: 'black',
                                                            /*itemHoverColor: '#1890ff',
                                                            itemHoverBg: '#e6f7ff',
                                                            itemActiveBg: '#bae7ff',*/
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
                                                    pageSizeOptions={[10, 20]}
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
                                                <Button color={'default'}
                                                        variant={mySubjects ? 'solid' : 'outlined'}
                                                        style={{width: '140px'}}
                                                        onClick={(ev) => {
                                                            setMyClaims(false);
                                                            setMySubjects(!mySubjects);
                                                        }}
                                                >Мои сотрудники</Button>
                                            </div>
                                        </div>
                                        <div style={{padding: '6px 42px', width: '100%'}}>
                                            <Slider
                                                style={{width: '100%'}}
                                                range marks={marks} step={null}
                                                value={rangeValues}
                                                min={1}
                                                max={12}
                                                onChange={(ev) => {
                                                    console.log('Slider value changed:', ev);
                                                    setRangeValues(ev);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Affix>
                            </div>
                            <Outlet context={{
                                isLoadingChart,
                                selectedChartState,
                                usersPage
                            }}/>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </Spin>
    );
}

export default Charts;
