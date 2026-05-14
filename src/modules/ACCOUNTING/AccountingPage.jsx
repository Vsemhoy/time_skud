import React, {useEffect, useState} from 'react';
import {Affix, Button, Checkbox, Input, Layout, Select, Skeleton, Spin, Tag} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {EditOutlined, FilterOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";
import Sider from "antd/es/layout/Sider";
import FiltersSidebar from "./components/FiltersSidebar";
import dayjs from "dayjs";
import {CSRF_TOKEN, PRODMODE, ROUTE_PREFIX} from "../../CONFIG/config";
import {DEPARTMENTS, USERS} from "../CHARTS/mock/mock";
import {ShortName} from "../../components/Helpers/TextHelpers";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {NavLink} from "react-router-dom";
import SchedIcons from "../../assets/Comicon/SchedIcons";
import RuleIcons from "../../assets/Comicon/RuleIcons";
import {USERS_MANAGER} from "../USER_MANAGER_2025/USER_MANAGER/mock/mock";
import styles from "./style/accountins.module.css";

const STAFFING_VALUE_FIELDS = [
    ['oplatafact'],
    ['oplatabuh'],
    ['otpusk'],
    ['bollist'],
    ['konteiner'],
    ['countnaruh'],
    ['blacklist'],
    ['bet'],
];
const STAFFING_FORM_FIELDS = [
    'id',
    'surname',
    'name',
    'occupy',
    'user_id',
    'namedep',
    'oplatafact',
    'otpusk',
    'bollist',
    'konteiner',
    'countnaruh',
    'date',
    'blacklist',
    'oplatabuh',
    'bet',
];

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
    const [creatingStaffList, setCreatingStaffList] = useState(false);
    const [filterParams, setFilterParams] = useState({
        year: dayjs().year(),
        month: dayjs().month() + 1,
    });
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
    const [staffingUsers, setStaffingUsers] = useState([]);
    const [usersInfo, setUsersInfo] = useState([]);
    const [departmentsInfo, setDepartmentsInfo] = useState([]);
    const [closedDepartments, setClosedDepartments] = useState([]);
    useEffect(() => {
        if (!isMounted) {
            setYears(prepareYears());
            fetchSelects().then();
            setIsMounted(true);
        }
    }, []);
    useEffect(() => {
        const {month, year} = getStaffingPeriod(filterParams);
        fetchUsersInfo({month, year}).then();
    }, [filterParams.month, filterParams.year]);
    useEffect(() => {
        filterAndSetUsers(staffingUsers, filterParams);
    }, [staffingUsers, filterParams.departments, filterParams.users]);
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
                let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/accounting/selects`,
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
    const getDefaultPeriod = () => ({
        year: dayjs().year(),
        month: dayjs().month() + 1,
    });
    const getStaffingPeriod = (filters = {}) => {
        const defaultPeriod = getDefaultPeriod();
        return {
            year: Number(filters.year) || defaultPeriod.year,
            month: Number(filters.month) || defaultPeriod.month,
        };
    };
    const getStaffingRequestPeriod = (filters = {}) => {
        const {month, year} = getStaffingPeriod(filters);

        return {
            year,
            month: month - 1,
        };
    };
    const extractStaffingUsers = (responseData) => {
        const content = responseData?.content;
        const data = responseData?.data;

        if (Array.isArray(content?.users)) return content.users;
        if (Array.isArray(content)) return content;
        if (Array.isArray(data?.users)) return data.users;
        if (Array.isArray(data)) return data;
        if (Array.isArray(responseData?.users)) return responseData.users;
        if (Array.isArray(responseData)) return responseData;

        return [];
    };
    const fetchUsersInfo = async (filters = filterParams) => {
        const {month, year} = getStaffingRequestPeriod(filters);

        try {
            setIsLoading(true);
            let response = await PROD_AXIOS_INSTANCE.get('/api/finance/data/getdatastafflist', {
                params: {month, year}
            });
            setStaffingUsers(extractStaffingUsers(response.data));
        } catch (e) {
            console.log(e);
            if (!PRODMODE) {
                setStaffingUsers(USERS_MANAGER);
            }
        } finally {
            setIsLoading(false);
        }
    };
    const createStaffList = async () => {
        const {month, year} = getStaffingRequestPeriod(filterParams);

        try {
            setCreatingStaffList(true);
            let response = await PROD_AXIOS_INSTANCE.get('/api/finance/data/createstafflist', {
                params: {month, year}
            });
            setStaffingUsers(extractStaffingUsers(response.data));
        } catch (e) {
            console.log(e);
        } finally {
            setCreatingStaffList(false);
        }
    };
    const prepareStaffListFormData = () => {
        const formData = new FormData();

        staffingUsers.forEach((user, index) => {
            STAFFING_FORM_FIELDS.forEach((fieldName) => {
                formData.append(`data[${index}][${fieldName}]`, user?.[fieldName] ?? '');
            });
        });

        return formData;
    };
    const saveStaffList = async () => {
        try {
            setSavingInfo(true);
            let response = await PROD_AXIOS_INSTANCE.post(
                '/api/finance/data/savedatastafflist',
                prepareStaffListFormData()
            );
            setStaffingUsers(extractStaffingUsers(response.data));
        } catch (e) {
            console.log(e);
        } finally {
            setSavingInfo(false);
        }
    };
    const filterAndSetUsers = (newUsers, filters = filterParams) => {
        const filteredUsers = [...newUsers]
            .filter((user) => !filters.departments || filters.departments.length === 0 || filters.departments.map(String).includes(String(user.departament ?? user.namedep)))
            .filter((user) => !filters.users || filters.users.length === 0 || filters.users.map(String).includes(String(user.user_id ?? user.id)))
            .sort((a, b) => String(a.namedep ?? '').localeCompare(String(b.namedep ?? ''), 'ru'));

        setUsersInfo(filteredUsers);
        setDepartmentsInfo([...new Set(filteredUsers.map(user => JSON.stringify({
            id: user.departament ?? user.namedep,
            name: user.departament_name ?? user.namedep
        })))].map(str => JSON.parse(str)).sort((a, b) => String(a.name ?? '').localeCompare(String(b.name ?? ''), 'ru')));
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
    const isTruthyFlag = (value) => value === true || value === 1 || value === '1';
    const showIdColumn = isTruthyFlag(props.userdata?.user?.is_admin);
    const getUserFieldValue = (user, fieldNames) => {
        const value = fieldNames
            .map((fieldName) => user?.[fieldName])
            .find((fieldValue) => fieldValue !== undefined && fieldValue !== null && fieldValue !== '');

        return value ?? 0;
    };
    const getUserFullName = (user) => [user?.surname, user?.name, user?.secondname ?? user?.patronymic]
        .filter(Boolean)
        .join(' ');
    const updateStaffingUserField = (rowId, fieldName, fieldValue) => {
        setStaffingUsers((currentUsers) => currentUsers.map((user) => {
            if (String(user.id) !== String(rowId)) {
                return user;
            }

            return {
                ...user,
                [fieldName]: fieldValue,
            };
        }));
    };
    const renderTableSkeleton = () => (
        <div className={styles.sk_staffing_skeleton}>
            {[0, 1, 2].map((departmentIndex) => (
                <div key={`skeleton-department-${departmentIndex}`}>
                    <div className={styles.sk_department_header}>
                        <div className={styles.sk_department_header_hover_container}>
                            <Skeleton.Input active size="small" className={styles.sk_skeleton_department_name} />
                        </div>
                    </div>
                    {[0, 1, 2, 3].map((rowIndex) => (
                        <div
                            key={`skeleton-row-${departmentIndex}-${rowIndex}`}
                            className={`${styles.sk_person_row_basic_hover_container} ${showIdColumn ? '' : styles.sk_staffing_grid_no_id}`}
                        >
                            {showIdColumn && (
                                <div className={`${styles.sk_person_row_content}`}>
                                    <Skeleton.Input active size="small" className={styles.sk_skeleton_id} />
                                </div>
                            )}
                            <div className={`${styles.sk_person_row_content}`}>
                                <Skeleton.Input active size="small" className={styles.sk_skeleton_name} />
                            </div>
                            <div className={`${styles.sk_person_row_content}`}>
                                <Skeleton.Input active size="small" className={styles.sk_skeleton_occupy} />
                            </div>
                            {STAFFING_VALUE_FIELDS.map((_, valueIdx) => (
                                <div key={`skeleton-cell-${departmentIndex}-${rowIndex}-${valueIdx}`} className={`${styles.sk_person_row_content} ${styles.sk_person_row_input_cell}`}>
                                    <Skeleton.Input active size="small" className={styles.sk_skeleton_value} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
    const shouldShowCreateStaffList = !isLoading && staffingUsers.length === 0;
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
                                    disabled={disableSaveInfo || isLoading || staffingUsers.length === 0}
                                    loading={savingInfo}
                                    iconPosition={'end'}
                                    style={{width: '125px'}}
                                    onClick={saveStaffList}
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
                        <div className={`sk-content-table-wrapper ${styles.sk_accounting_table_wrapper}`}>
                            <Spin tip="Ожидайте" spinning={false} style={{width: '100%', height: '100%'}}>
                                <div className={`sk-content-table ${styles.sk_accounting_table}`}>
                                    <Affix offsetTop={44}>
                                        <div className={`${styles.sk_table_row_staffingschedule} ${showIdColumn ? '' : styles.sk_staffing_grid_no_id}`}>
                                            {showIdColumn && (
                                                <div className={`${styles.sk_department_table_header}`}>
                                                    <p className={`${styles.sk_department_table_header_p}`}>ID</p>
                                                </div>
                                            )}
                                            <div className={`${styles.sk_department_table_header}`}>
                                                <p className={`${styles.sk_department_table_header_p}`}>ФИО</p>
                                            </div>
                                            <div className={`${styles.sk_department_table_header}`}>
                                                <p className={`${styles.sk_department_table_header_p}`}>Должность</p>
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
                                    </Affix>
                                    {isLoading ? renderTableSkeleton() : departmentsInfo.map((department, index) => (
                                        <div key={`${department.id}-${index}`}>
                                            <Affix offsetTop={96}>
                                                <div className={`${styles.sk_department_header}`}
                                                    onDoubleClick={() => openCloseDepartments(department.id)}
                                                >
                                                    <div className={`${styles.sk_department_header_hover_container}`}>
                                                        <p className={`${styles.sk_department_header_p}`}>{department.name}</p>
                                                    </div>
                                                </div>
                                            </Affix>
                                            {!closedDepartments.find(item => item === department.id) && (
                                                <div className="sk-person-rows">
                                                    {usersInfo.map((user, idx) => {
                                                        if (String(user.departament ?? user.namedep) === String(department.id)) {
                                                            return (
                                                                <div key={`${user.id}-${idx}`} className={`${styles.sk_person_row_basic_hover_container} ${showIdColumn ? '' : styles.sk_staffing_grid_no_id}`}>
                                                                    {showIdColumn && (
                                                                        <div className={`${styles.sk_person_row_content}`}>
                                                                            <p className={`${styles.sk_person_row_p}`}>
                                                                                {user.user_id ?? user.id}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    <div className={`${styles.sk_person_row_content}`}>
                                                                        <p className={`${styles.sk_person_row_p}`} title={getUserFullName(user)}>{getUserFullName(user)}</p>
                                                                    </div>
                                                                    <div className={`${styles.sk_person_row_content}`}>
                                                                        <p className={`${styles.sk_person_row_p_occupy}`} title={user.occupy}>{user.occupy}</p>
                                                                    </div>
                                                                    {STAFFING_VALUE_FIELDS.map((fieldNames, valueIdx) => (
                                                                        <div key={`${user.id}-${valueIdx}`} className={`${styles.sk_person_row_content} ${styles.sk_person_row_input_cell}`}>
                                                                            <Input
                                                                                className={styles.sk_person_row_input}
                                                                                size="small"
                                                                                value={getUserFieldValue(user, fieldNames)}
                                                                                onChange={(event) => updateStaffingUserField(user.id, fieldNames[0], event.target.value)}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        }
                                                        return '';
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {shouldShowCreateStaffList && (
                                        <div className={styles.sk_staffing_empty_state}>
                                            <Button
                                                type="primary"
                                                loading={creatingStaffList}
                                                onClick={createStaffList}
                                            >
                                                На текущий месяц штатное расписание не создано. Создать?
                                            </Button>
                                        </div>
                                    )}
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
