import React, {useEffect, useState} from 'react';
import {Affix, Button, Checkbox, Input, Layout, Select, Spin, Tag} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {EditOutlined, FilterOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";
import Sider from "antd/es/layout/Sider";
import FiltersSidebar from "./components/FiltersSidebar";
import dayjs from "dayjs";
import {CSRF_TOKEN, PRODMODE} from "../../CONFIG/config";
import {DEPARTMENTS, USERS} from "../CHARTS/mock/mock";
import {ShortName} from "../../components/Helpers/TextHelpers";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {NavLink} from "react-router-dom";
import SchedIcons from "../../assets/Comicon/SchedIcons";
import RuleIcons from "../../assets/Comicon/RuleIcons";
import {USERS_MANAGER} from "../USER_MANAGER_2025/USER_MANAGER/mock/mock";
import styles from "./style/accountins.module.css";

const AccountingPage = (props) => {
    const useCookieState = (key, defaultValue) => {
        const [state, setState] = useState(() => {
            const saved = Cookies.get(key);
            return saved ? JSON.parse(saved) : defaultValue;
        });

        useEffect(() => {
            Cookies.set(key, JSON.stringify(state), { expires: 365 });
        }, [key, state]);

        return [state, setState];
    }
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isOpenFilters, setIsOpenFilters] = useCookieState('user_manager_filters', true);
    const [disableSaveInfo, setdDisableSavingInfo] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);
    const [filterParams, setFilterParams] = useState([]);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([
        {id: 1, 'name': 'Январь'},
        {id: 2, 'name': 'Февраль'},
        {id: 3, 'name': 'Март'},
        {id: 4, 'name': 'Апрель'},
        {id: 5, 'name': 'Май'},
        {id: 6, 'name': 'Июнь'},
        {id: 7, 'name': 'Июль'},
        {id: 8, 'name': 'Август'},
        {id: 9, 'name': 'Сентябрь'},
        {id: 10, 'name': 'Октябрь'},
        {id: 11, 'name': 'Ноябрь'},
        {id: 12, 'name': 'Декабрь'},
    ]);
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [usersInfo, setUsersInfo] = useState([]);
    const [departmentsInfo, setDepartmentsInfo] = useState([]);
    const [closedDepartments, setClosedDepartments] = useState([]);
    useEffect(() => {
        if (!isMounted) {
            setYears(prepareYears());
            fetchInfo().then();
            setIsMounted(true);
        }
    }, []);
    const fetchInfo = async () => {
        await fetchSelects();
        await fetchUsersInfo();
    };
    const prepareYears = () => {
        const startYear = 2016;
        const endYear = dayjs().year();
        const yearsArr = [];
        for (let i = startYear; i <= endYear; i++) {
            yearsArr.push({id: i, name: i});
        }
        return yearsArr;
    };
    const fetchSelects = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/accounting/selects',
                    {
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    const content = response.data.content;
                    setUsers(content.users);
                    setDepartments(content.departaments);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setUsers(USERS);
            setDepartments(DEPARTMENTS);
        }
    };
    const fetchUsersInfo = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/accounting/getstaffingschedule',
                    {
                        data: {
                            filterParams
                        },
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    const content = response.data.content;
                    filterAndSetUsers(content.users);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            filterAndSetUsers(USERS_MANAGER);
        }
    };
    const filterAndSetUsers = (newUsers) => {
        setUsersInfo(newUsers.sort((a, b) => a.department - b.department));
        setDepartmentsInfo([...new Set(newUsers.map(user => JSON.stringify({
            id: user.departament,
            name: user.departament_name
        })))].map(str => JSON.parse(str)).sort((a, b) => a.id - b.id));
    };
    const btnHeader = () => {
        return savingInfo ? 'Сохраняем' : 'Сохранить';
    };
    const prepareShortFio = (users) => {
        return users.map((user) => {
            return {
                id: user.id,
                name: ShortName(user.surname, user.name, user.patronymic),
                boss_id: user.boss_id,
                id_company: user.id_company,
            }
        });
    }
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
    const handleFilterChanged = async (filtersSelected) => {
        setFilterParams(filtersSelected);
    };
    const openCloseDepartments = (departmentId) => {
        if (closedDepartments.includes(departmentId)) {
            setClosedDepartments(closedDepartments.filter(id => id !== departmentId));
        } else {
            setClosedDepartments([...closedDepartments, departmentId]);
        }
    };
    return (
        <div className={'mega-layout'}>
            <Layout className={'layout'}>
                <Header className={'header'}>
                    <Affix>
                        <div className={'sk-header-container'}>
                            <Button color={'default'}
                                    variant={isOpenFilters ? 'solid' : 'outlined'}
                                    icon={<FilterOutlined />}
                                    style={{ width: '125px' }}
                                    onClick={() => setIsOpenFilters(!isOpenFilters)}
                            >Фильтры</Button>
                            <h1 className={'page-header'}>Штатное расписание</h1>
                            <Button type="primary"
                                    disabled={disableSaveInfo}
                                    loading={savingInfo}
                                    iconPosition={'end'}
                                    style={{width: '125px'}}
                                    onClick={() => setSavingInfo(true)}
                            >{btnHeader()}</Button>
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
                                    <FiltersSidebar
                                        years_list={prepareSelectOptions('year', years)}
                                        months_list={prepareSelectOptions('month', months)}
                                        departments_list={prepareSelectOptions('departments', departments)}
                                        user_list={prepareSelectOptions('user', prepareShortFio(users))}
                                        on_change_filter={handleFilterChanged}
                                    />
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className="sk-content-table-wrapper">
                            <Spin tip="Ожидайте" spinning={isLoading} style={{width: '100%', height: '100%'}}>
                                <div className="sk-content-table">
                                    <div className={`${styles.sk_table_row_staffingschedule}`}>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>ID</p>
                                        </div><div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>ФИО, должность</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Оклад факт. руб.</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Оклад бух. руб.</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Отпуск %</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Бол. лист %</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Контейнер, руб.</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Нарушение, руб.</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Черный список %</p>
                                        </div>
                                        <div className={`${styles.sk_department_table_header}`}>
                                            <p className={`${styles.sk_department_table_header_p}`}>Ставка, руб.</p>
                                        </div>
                                    </div>
                                    {departmentsInfo.map((department, index) => (
                                        <div key={`${department.id}-${index}`}>
                                            <div className={`${styles.sk_department_header}`}
                                                 onDoubleClick={() => openCloseDepartments(department.id)}
                                            >
                                                <div className={`${styles.sk_department_header_hover_container}`}>
                                                    <p className={`${styles.sk_department_header_p}`}>{department.id}</p>
                                                    <p className={`${styles.sk_department_header_p}`}>{department.name}</p>
                                                </div>
                                            </div>
                                            {!closedDepartments.find(item => item === department.id) && (
                                                <div className="sk-person-rows">
                                                    {usersInfo.map((user, idx) => {
                                                        if (+user.departament === +department.id) {
                                                            return (
                                                                <div key={`${user.id}-${idx}`} className={`${styles.sk_person_row_basic_hover_container}`}>
                                                                    <div className={`${styles.sk_person_row_content}`}>
                                                                        <p className={`${styles.sk_person_row_p}`}>
                                                                            {user.id}
                                                                        </p>
                                                                    </div>
                                                                    <div className={`${styles.sk_person_row_content}`}>
                                                                        <p className={`${styles.sk_person_row_p}`}>{`${user.surname} ${user.name} ${user.patronymic}`}</p>
                                                                        <p className={`${styles.sk_person_row_p_occupy}`}>{user.occupy}</p>
                                                                    </div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                    <div className={`${styles.sk_person_row_content}`}><Input value={0}/></div>
                                                                </div>
                                                            );
                                                        }
                                                        return '';
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Spin>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default AccountingPage;
