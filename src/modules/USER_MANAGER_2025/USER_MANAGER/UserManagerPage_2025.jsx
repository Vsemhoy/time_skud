import React, {useEffect, useState} from 'react';
import UserManagerExtraTools from "./components/UserManagerExtraTools";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import './style/user_manager_page.css'
import {Affix, Button, Checkbox, Flex, Layout, Pagination, Select, Spin, Tag} from 'antd';
import {
    CalendarOutlined,
    ClockCircleOutlined,
    EditOutlined,
    FilterOutlined,
    HistoryOutlined, PlusOutlined,
    ToolOutlined
} from "@ant-design/icons";
import {
    DEPARTMENTS,
    GROUPS,
    GROUPS_LIST, RULE_LIST, RULE_TYPE_LIST,
    SCHEDULE_LIST,
    SCHEDULE_TYPE_LIST,
    USERS,
    USERS_BY_DEPARTMENTS
} from "./mock/mock";
import {CSRF_TOKEN, HTTP_ROOT, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {Link, NavLink} from "react-router-dom";
import SchedIcons from "../../../assets/Comicon/SchedIcons";
import RuleIcons from "../../../assets/Comicon/RuleIcons";
const { Header, Sider, Content } = Layout;

const UserManagerPage_2025 = (props) => {

    const useCookieState = (key, defaultValue) => {
        const [state, setState] = useState(() => {
            const saved = Cookies.get(key);
            return saved ? JSON.parse(saved) : defaultValue;
        });

        useEffect(() => {
            Cookies.set(key, JSON.stringify(state), { expires: 365 });
        }, [key, state]);

        return [state, setState];
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [bosses, setBosses] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [enters, setEnters] = useState([]);
    const [userStatuses, setUserStatuses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [currentScheduleTypes, setCurrentScheduleTypes] = useState([]);
    const [currentSchedules, setCurrentSchedules] = useState([]);
    const [currentRuleTypes, setCurrentRuleTypes] = useState([]);
    const [currentRules, setCurrentRules] = useState([]);

    const [closedDepartments, setClosedDepartments] = useState([]);
    const [openRules, setOpenRules] = useState([]);
    const [checkedUsers, setCheckedUsers] = useState([]);

    const [isOpenFilters, setIsOpenFilters] = useCookieState('user_manager_filters', true);
    const [isOpenTools, setIsOpenTools] = useCookieState('user_manager_toolbar', false);

    /* useEffect */
    useEffect(() => {
        fetchInfo().then(() => {
            setIsMounted(true);
        });
    }, []);
    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [pageSize, currentPage]);

    /* fetch + pagination */
    const fetchInfo = async (filterParams) => {
        setIsLoading(true);
        await fetchUsers(filterParams);
        await fetchFilters();
        if (PRODMODE) {
            setIsLoading(false);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };
    const fetchUsers = async (filterParams) => {
         if (PRODMODE) {
             try {
                 const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/users`,
                     {
                          data: {filterParams, currentPage, pageSize},
                         _token: CSRF_TOKEN
                     }
                 );
                 if (serverResponse.data.content) {
                     const content = serverResponse.data.content
                     if (content.users && content.users.length > 0) {
                         filterAndSetUsers(content.users);
                     }
                     if (content.count) {
                         setAllUsersCount(content.count);
                     }
                 }
             } catch (error) {
                 console.error('Error fetching users info:', error);
             }
         } else {
             filterAndSetUsers(USERS);
             setAllUsersCount(USERS.length);
         }
    };
    const fetchFilters = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/filterselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                console.log(serverResponse.data.content)
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content;
                    console.log(content)
                    setBosses(content?.bosses);
                    setCompanies(content?.companies);
                    setEnters([
                        {
                            id: 1,
                            name: 'Разрешен',
                        },
                        {
                            id: 2,
                            name: 'Не разрешен',
                        },
                    ]);
                    setUserStatuses([
                        {
                            id: 1,
                            name: 'Работающие',
                        },
                        {
                            id: 2,
                            name: 'Уволенные',
                        },
                    ]);
                    setGroups(content?.groups);
                    setCurrentScheduleTypes(content?.graphics);
                    setCurrentSchedules(content?.now_graphics);
                    setCurrentRuleTypes(content?.rule_types);
                    setCurrentRules(content?.now_types);
                }
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setBosses(USERS);
            setEnters(USERS);
            setUserStatuses(USERS);
            setGroups(GROUPS_LIST);
            setCurrentScheduleTypes(SCHEDULE_TYPE_LIST);
            setCurrentSchedules(SCHEDULE_LIST);
            setCurrentRuleTypes(RULE_TYPE_LIST);
            setCurrentRules(RULE_LIST);
        }
    };
    const filterAndSetUsers = (newUsers) => {
        setUsers(newUsers.sort((a, b) => a.department - b.department));
        setDepartments([...new Set(newUsers.map(user => JSON.stringify({
            id: user.departament,
            name: user.departament_name
        })))].map(str => JSON.parse(str)).sort((a, b) => a.id - b.id));
    }
    const handleChangePageSize = (value) => {
        setPageSize(value);
    };
    const handlePageChange = (value) => {
        setCurrentPage(value);
    };

    /* open-close table rows */
    const openCloseDepartments = (departmentId) => {
        if (closedDepartments.includes(departmentId)) {
            setClosedDepartments(closedDepartments.filter(id => id !== departmentId));
        } else {
            setClosedDepartments([...closedDepartments, departmentId]);
        }
    };
    const openCloseUserRules = (e, userId) => {
        e.preventDefault();
        if (openRules.includes(userId)) {
            setOpenRules(openRules.filter(id => id !== userId));
        } else {
            setOpenRules([...openRules, userId]);
        }
    };

    /* checkboxes */
    const checkUncheckUser = (userId) => {
        if (checkedUsers.includes(userId)) {
            setCheckedUsers(checkedUsers.filter(id => id !== userId));
        } else {
            setCheckedUsers([...checkedUsers, userId]);
        }
    };
    const checkUncheckDepartment = (departmentId) => {
        const currentUserIds = users
            .filter(user => user.departament === departmentId)
            .map(user => user.id);

        setCheckedUsers(prev => {
            const currentIdsSet = new Set(currentUserIds);
            const prevSet = new Set(prev);
            if (currentUserIds.every(id => prevSet.has(id))) {
                return prev.filter(id => !currentIdsSet.has(id));
            }
            return [...new Set([...prev, ...currentUserIds])];
        });
    };
    const isIndeterminate = (departmentId) => {
        const currentUserIds = users
            .filter(user => user.departament === departmentId)
            .map(user => user.id);
        const checkedUsersSet = new Set(checkedUsers);

        // Получаем массив выбранных пользователей отдела
        const checkedInDepartment = currentUserIds.filter(id => checkedUsersSet.has(id));

        // Indeterminate: если часть пользователей выбрана, но не все
        return checkedInDepartment.length > 0 && checkedInDepartment.length < currentUserIds.length;
    };
    const isChecked = (departmentId) => {
        const currentUserIds = users
            .filter(user => user.departament === departmentId)
            .map(user => user.id);
        const checkedUsersSet = new Set(checkedUsers);

        // Checked: если все пользователи отдела выбраны
        return currentUserIds.length > 0 && currentUserIds.every(id => checkedUsersSet.has(id));
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
    }
    const handleFilterChanged = async (filterParams) => {
        //console.log(filterParams);
        if (isMounted) {
            await fetchInfo(filterParams);
        }
    };

    /* multi tool */
    const setFilters = (e) => {

    };
    const setSelectedGroups = (val) => {

    };
    const removeGroup = async (e, group, userId) => {
        e.preventDefault();
        await fetchRemoveGroup(group.grouplink);
        setUsers(prevUsers => {
            return prevUsers.map(user => {
                if (user.id === userId && user.groups.some(g => g.grouplink === group.grouplink)) {
                    return {
                        ...user,
                        groups: user.groups.filter(g => g.grouplink !== group.grouplink)
                    };
                }
                return user;
            });
        });
    };
    const fetchRemoveGroup = async (groupLinkId) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/usermanagerremovegroup/${groupLinkId}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
            } catch (error) {
                console.error('Error fetching remove user group:', error);
            }
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
                            <h1 className={'page-header'}>Список сотрудников</h1>
                            <Button color="default"
                                    variant={isOpenTools ? 'solid' : 'outlined'}
                                    icon={<ToolOutlined />}
                                    style={{ width: '125px' }}
                                    onClick={() => setIsOpenTools(!isOpenTools)}
                            >Мультитул</Button>
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
                                        user_list={prepareSelectOptions('user', users)}
                                        boss_list={prepareSelectOptions('boss', bosses)}
                                        company_list={prepareSelectOptions('company', companies)}
                                        depart_list={prepareSelectOptions('dep', departments)}
                                        enters_list={prepareSelectOptions('enter', enters)}
                                        user_statuses_list={prepareSelectOptions('user_status', userStatuses)}
                                        groups_list={prepareSelectOptions('group', groups)}
                                        current_chart_types_list={prepareSelectOptions('current_chart_type', currentScheduleTypes)}
                                        current_charts_list={prepareSelectOptions('current_chart', currentSchedules)}
                                        current_rule_types_list={prepareSelectOptions('current_rule_typ', currentRuleTypes)}
                                        current_rules_list={prepareSelectOptions('current_rules_list', currentRules)}

                                        on_change_filter={handleFilterChanged}
                                    />
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className="sk-content-table-wrapper">
                            <Affix offsetTop={44}>
                                <div className="sk-pagination-wrapper">
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
                                            onShowSizeChange={(current, newSize) => handleChangePageSize(newSize)}
                                            onChange={(page) => handlePageChange(page)}
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
                                    <NavLink to={'/hr/usermanager/new'}>
                                        <Button color={'primary'}
                                                variant={'outlined'}
                                                icon={<PlusOutlined/>}
                                                style={{ width: '125px' }}
                                        >Создать</Button>
                                    </NavLink>
                                </div>
                            </Affix>
                            <Spin tip="Ожидайте" spinning={isLoading} style={{width: '100%', height: '100%'}}>
                                <div className="sk-content-table">
                                    {departments.map((department, index) => (
                                        <div key={`${department.id}-${index}`}
                                             className="sk-department-block"
                                        >
                                            <div className="sk-department-header"
                                                 onDoubleClick={() => openCloseDepartments(department.id)}
                                            >
                                                <div className="sk-department-header-hover-container">
                                                    <Checkbox
                                                        indeterminate={isIndeterminate(department.id)}
                                                        checked={isChecked(department.id)}
                                                        onChange={() => checkUncheckDepartment(department.id)}
                                                    />
                                                    <p className="sk-department-header-p">{department.id}</p>
                                                    <p className="sk-department-header-p">{department.name}</p>
                                                </div>
                                            </div>
                                            {!closedDepartments.find(item => item === department.id) && (
                                                <div className="sk-person-rows">
                                                    {users.map((user, idx) => {
                                                        if (+user.departament === +department.id) {
                                                            return (
                                                                <div key={`${user.id}-${idx}`}
                                                                     className={`sk-person-row ${checkedUsers.find(item => item === user.id) ? "sk-row-selected" : ""}`}
                                                                >
                                                                    <div className="sk-person-row-basic"
                                                                         onDoubleClick={(e) => openCloseUserRules(e, user.id)}
                                                                    >
                                                                        <div className="sk-person-row-basic-hover-container">
                                                                            <Checkbox checked={checkedUsers.find(item => item === user.id)}
                                                                                      onChange={() => checkUncheckUser(user.id)}
                                                                            />
                                                                            <p className="sk-person-row-p">{user.id}</p>
                                                                            <div className="sk-person-row-content">
                                                                                <p className="sk-person-row-p">{`${user.surname} ${user.name} ${user.patronymic}`}</p>
                                                                                <p className="sk-person-row-p occupy">{user.occupy}</p>
                                                                            </div>
                                                                            <NavLink to={'/hr/usermanager/' + user.id}>
                                                                                <Button color={'default'}
                                                                                        variant={'outlined'}
                                                                                        icon={<EditOutlined/>}
                                                                                >Редактировать</Button>
                                                                            </NavLink>
                                                                        </div>
                                                                        {user.groups && user.groups.length > 0 && (
                                                                            <div
                                                                                className="sk-person-row-basic-groups">
                                                                                {user.groups.map((group, idx) => {
                                                                                    return (
                                                                                        <Tag
                                                                                            key={`group-tag-${user.id}-${group.id}`}
                                                                                            style={{
                                                                                                color: '#757575',
                                                                                                borderBottom: '1px solid #FF6200',
                                                                                                margin: '0'
                                                                                            }}
                                                                                            closeIcon
                                                                                            onClose={(e) => removeGroup(e, group, user.id)}>
                                                                                            {group.name}
                                                                                        </Tag>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    {openRules.find(item => item === user.id) && (
                                                                        <div className="sk-person-rules">
                                                                            {user.linked_schedule && (
                                                                                <div className="sk-person-schedule">
                                                                                    <div
                                                                                        className="sk-person-schedule-hover-container">
                                                                                        <div className="sk-schedule-cell">
                                                                                            <SchedIcons type={user.linked_schedule.skud_schedule_type_id} size={'100%'}/>
                                                                                            <p>{user.linked_schedule.skud_schedule.name}</p>
                                                                                        </div>
                                                                                        <p className="sk-schedule-cell sk-schedule-cell-center">
                                                                                            {dayjs()
                                                                                                .startOf('day')
                                                                                                .add(user.linked_schedule.skud_schedule.start_time, 'seconds')
                                                                                                .format('HH:mm')}
                                                                                            -
                                                                                            {dayjs()
                                                                                                .startOf('day')
                                                                                                .add(user.linked_schedule.skud_schedule.end_time, 'seconds')
                                                                                                .format('HH:mm')}
                                                                                        </p>
                                                                                        <p className="sk-schedule-cell sk-schedule-cell-center">
                                                                                            {dayjs()
                                                                                                .startOf('day')
                                                                                                .add(user.linked_schedule.skud_schedule.lunch_start, 'seconds')
                                                                                                .format('HH:mm')}
                                                                                            -
                                                                                            {dayjs()
                                                                                                .startOf('day')
                                                                                                .add(user.linked_schedule.skud_schedule.lunch_end, 'seconds')
                                                                                                .format('HH:mm')}
                                                                                        </p>
                                                                                        <p className="sk-schedule-cell sk-schedule-cell-center">
                                                                                            {dayjs()
                                                                                                .startOf('day')
                                                                                                .add(user.linked_schedule.skud_schedule.target_time, 'seconds')
                                                                                                .format('HH:mm')} / день</p>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            {user.linked_rules && user.linked_rules.length > 0 && user.linked_rules.map((rule, idx) => (
                                                                                <div className="sk-person-rule" key={`${user.id}-${rule.id}`}>
                                                                                    <div className="sk-person-rule-hover-container">
                                                                                        <div className="sk-schedule-cell">
                                                                                            <RuleIcons type={rule.type} size={'100%'}/>
                                                                                            <p>{rule.name}</p>
                                                                                        </div>
                                                                                        <p className="sk-schedule-cell sk-schedule-cell-center">
                                                                                            {dayjs()
                                                                                                .startOf('day')
                                                                                                .add(rule.duration_time, 'seconds')
                                                                                                .format('HH:mm')}
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
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
                    <Sider width={isOpenTools ? "330px" : 0}
                           className={`sider ${isOpenTools ? '' : 'sider-hidden'} pl15`}
                    >
                        <Affix offsetTop={54}>
                            <div className="sk-width-container">
                                <UserManagerExtraTools
                                    onChangeFilter={(ev) => {setFilters(ev)}}
                                    onSelectGroups={(val) => {setSelectedGroups(val)}}
                                    onCallToSelectGroups={null}
                                    onCallToClearGroups={null}
                                    selected_users={checkedUsers}
                                    onSelectAllUsers={null}

                                    companies={props.userdata?.companies}
                                    groups={groups}
                                    selectedCompany={null}

                                    schedules={currentSchedules}
                                    schedTypes={currentScheduleTypes}
                                    onBidnSchedules={null}

                                    rules={currentRules}
                                    ruleTypes={currentRuleTypes}
                                    onBidnRules={null}
                                />
                            </div>
                        </Affix>
                    </Sider>
                </Layout>
            </Layout>
        </div>
    );
}

export default UserManagerPage_2025;
