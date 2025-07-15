import React, {useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {Affix, Button, ConfigProvider, Layout, Pagination, Segmented, Slider, Tag} from "antd";
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
import {CHART_STATES, USDA} from "./mock/mock";
import dayjs from "dayjs";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
const  Charts = (props) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [isMounted, setIsMounted] = useState(false);
    const [isOpenFilters, setIsOpenFilters] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [allUsersCount, setAllUsersCount] = useState(100);

    const [chartStates, setChartStates] = useState([]);
    const [selectedChartState, setSelectedChartState] = useState(null);
    const [reactiveColor, setReactiveColor] = useState(null);

    const [years, setYears] = useState([]);
    const [nameOrOccupy, setNameOrOccupy] = useState([]);
    const [bosses, setBosses] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [userStatuses, setUserStatuses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [scheduleTypes, setScheduleTypes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [ruleTypes, setRuleTypes] = useState([]);
    const [rules, setRules] = useState([]);

    const [myClaims, setMyClaims] = useState(false);
    const [mySubjects, setMySubjects] = useState(false);

    const [rangeValues, setrangeValues] = useState([dayjs().month(),dayjs().month()]);

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

    useEffect(() => {
        if (!isMounted) {
            fetchInfo().then();
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            const pathSegments = location.pathname.split('/').filter(Boolean);
            const lastSegment = pathSegments[pathSegments.length - 1];
            console.log(lastSegment)
            const chart = chartStates.find(state => state.name === lastSegment);
            if (chart && chart.value) {
                setSelectedChartState(chart.value);
            }
        }
    }, [chartStates, location.pathname]);

    useEffect(() => {
        if (isMounted) {
            setReactiveColor(chartStates.find(state => +state.value === +selectedChartState) ?
                chartStates.find(state => +state.value === +selectedChartState).color :
                '#1890ff');
        }
    }, [selectedChartState]);

    const fetchInfo = async (filterParams) => {
        await fetchSelects();
        await fetchChartStates();
    };
    const fetchSelects = async () => {
        if (PRODMODE) {

        } else {

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
                    setChartStates(response.data.content);
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setChartStates(CHART_STATES
                .filter(state => state.fillable)
                .map(state => ({
                    label: state.badge,
                    value: state.id,
                    icon: iconComponents[state.icon] || null,
                    color: state.color,
                    name: state.name
                })));
        }
    };
    const navigateTo = (value) => {
        const name = chartStates.find(state => +state.value === +value)?.name;
        if (name) {
            navigate(`../charts/${name}`, { relative: 'path' });
        }
    };


    /* filters */
    const prepareSelectOptions = (name, options) => {
        if (options && options.length > 0) {
            return options.map((option) => {
                return ({
                    key: `option-${name}-${option.id}`,
                    value: option.id,
                    label: option.name
                })
            });
        } else {
            return [];
        }
    };
    const handleFilterChanged = async (filterParams) => {
        if (isMounted) {
            await fetchInfo(filterParams);
        }
    };

    return (
        <div className={'mega-layout'}>
            <Outlet />
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
                            <h1 className={'page-header'}>График больничных</h1>
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
                                        nameOrOccupy={prepareSelectOptions('nameOrOccupy', nameOrOccupy)}
                                        boss_list={prepareSelectOptions('boss', bosses)}
                                        company_list={prepareSelectOptions('company', companies)}
                                        depart_list={prepareSelectOptions('dep', departments)}
                                        user_statuses_list={prepareSelectOptions('user_status', userStatuses)}
                                        groups_list={prepareSelectOptions('group', groups)}
                                        schedule_types_list={prepareSelectOptions('schedule_type', scheduleTypes)}
                                        schedules_list={prepareSelectOptions('schedule', schedules)}
                                        rule_types_list={prepareSelectOptions('rule_typ', ruleTypes)}
                                        rules_list={prepareSelectOptions('rules_list', rules)}

                                        userAls={PRODMODE ? props?.userdata?.acls : USDA.acls}

                                        on_change_filter={handleFilterChanged}
                                    />
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className="sk-content-table-wrapper">
                            <Affix offsetTop={44}>
                                <div>
                                    <div>
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
                                                pageSizeOptions={[50, 100]}
                                                locale={{
                                                    items_per_page: 'на странице',
                                                    jump_to: 'Перейти',
                                                    jump_to_confirm: 'OK',
                                                    page: 'Страница'
                                                }}
                                                onShowSizeChange={(current, newSize) => pageSize(newSize)}
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
                                            >Мои заявки</Button>
                                            <Button color={'default'}
                                                    variant={mySubjects ? 'solid' : 'outlined'}
                                                    style={{width: '140px'}}
                                            >Мои сотрудники</Button>
                                        </div>
                                    </div>
                                    <div style={{padding: '6px 42px', width: '100%'}}>
                                        <Slider
                                            style={{width: '100%'}}
                                            range marks={marks} step={null} defaultValue={[3, 5]}
                                            value={rangeValues}
                                            min={1}
                                            max={12}
                                            onChange={setrangeValues}
                                        />
                                    </div>
                                </div>
                            </Affix>
                        </div>
                    </Content>

                </Layout>
            </Layout>
        </div>
    );
}

export default Charts;
