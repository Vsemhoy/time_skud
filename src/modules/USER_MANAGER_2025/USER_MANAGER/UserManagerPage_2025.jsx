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
    HistoryOutlined,
    ToolOutlined
} from "@ant-design/icons";
import {DEPARTMENTS, USERS, USERS_BY_DEPARTMENTS} from "./mock/mock";
import {CSRF_TOKEN, HTTP_ROOT, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import dayjs from "dayjs";
const { Header, Sider, Content } = Layout;

const UserManagerPage_2025 = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [bosses, setBosses] = useState([]);
    const [enters, setEnters] = useState([]);
    const [userStatuses, setUserStatuses] = useState([]);
    const [groups, setGroups] = useState([]);
    const [currentChartTypes, setCurrentChartTypes] = useState([]);
    const [currentCharts, setCurrentCharts] = useState([]);
    const [currentRuleTypes, setCurrentRuleTypes] = useState([]);
    const [currentRules, setCurrentRules] = useState([]);

    const [closedDepartments, setClosedDepartments] = useState([]);
    const [openRules, setOpenRules] = useState([]);
    const [checkedUsers, setCheckedUsers] = useState([]);

    const [baseGroupList, setBaseGroupList] = useState([]);
    const [isOpenFilters, setIsOpenFilters] = useState(true);
    const [isOpenTools, setIsOpenTools] = useState(true);

    /* useEffect */
    useEffect(() => {
        setIsLoading(true);
        fetchDepartments().then(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        });
        fetchFilters().then();
    }, []);
    useEffect(() => {
        setIsLoading(true);
        fetchDepartments().then(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        });
    }, [pageSize, currentPage]);

    /* fetch + pagination */
    const fetchDepartments = async () => {
        /*if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/departments`,
                    {

                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content && serverResponse.data.content.length > 0) {
                    setDepartments(serverResponse.data.content);
                    await fetchUsers();
                }
            } catch (error) {
                console.error('Error fetching departments info:', error);
            }
        } else {*/
            await fetchUsers();
            setDepartments(DEPARTMENTS);
        // }
    };
    const fetchUsers = async () => {
        // if (PRODMODE) {
        //     try {
        //         const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/users`,
        //             {
        //
        //                 _token: CSRF_TOKEN
        //             }
        //         );
        //         if (serverResponse.data.content && serverResponse.data.content.length > 0) {
        //             setUsers(serverResponse.data.content);
        //         }
        //     } catch (error) {
        //         console.error('Error fetching users info:', error);
        //     }
        // } else {
            setUsers(USERS);
            setAllUsersCount(USERS.length);
            //setPageSize(50);
            //setCurrentPage(2);
        // }
    };
    const fetchFilters = async () => {
        setBosses(USERS);
        setEnters(USERS);
        setUserStatuses(USERS);
        setGroups(USERS);
        setCurrentChartTypes(USERS);
        setCurrentCharts(USERS);
        setCurrentRuleTypes(USERS);
        setCurrentRules(USERS);
    };
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
            .filter(user => user.department === departmentId)
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
            .filter(user => user.department === departmentId)
            .map(user => user.id);
        const checkedUsersSet = new Set(checkedUsers);

        // Получаем массив выбранных пользователей отдела
        const checkedInDepartment = currentUserIds.filter(id => checkedUsersSet.has(id));

        // Indeterminate: если часть пользователей выбрана, но не все
        return checkedInDepartment.length > 0 && checkedInDepartment.length < currentUserIds.length;
    };
    const isChecked = (departmentId) => {
        const currentUserIds = users
            .filter(user => user.department === departmentId)
            .map(user => user.id);
        const checkedUsersSet = new Set(checkedUsers);

        // Checked: если все пользователи отдела выбраны
        return currentUserIds.length > 0 && currentUserIds.every(id => checkedUsersSet.has(id));
    };

    /* filters */
    const handleFilterChanged = () => {

    };
    const setFilters = (ev) => {

    };
    const setSelectedGroups = (val) => {

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
                                    onClick={() => setIsOpenFilters(!isOpenFilters)}
                            >Фильтры</Button>
                            <h1 className={'page-header'}>Список сотрудников</h1>
                            <Button color="default"
                                    variant={isOpenTools ? 'solid' : 'outlined'}
                                    icon={<ToolOutlined />}
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
                                        user_list={users}
                                        boss_list={bosses}
                                        company_list={props.userData?.companies}
                                        depart_list={departments}
                                        enters_list={enters}
                                        user_statuses_list={userStatuses}
                                        groups_list={groups}
                                        current_chart_types_list={currentChartTypes}
                                        current_charts_list={currentCharts}
                                        current_rule_types_list={currentRuleTypes}
                                        current_rules_list={currentRules}
                                        on_change_filter={handleFilterChanged}
                                    />
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div>
                            <Affix offsetTop={44}>
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
                            </Affix>
                            <Spin tip="Ожидайте" spinning={isLoading} style={{width:'100%', height:'100%'}}>
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
                                                { !closedDepartments.find(item => item === department.id) && (
                                                    <div className="sk-person-rows">
                                                        {users.map((user, idx) => {
                                                            if (+user.department === +department.id) {
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
                                                                                <Button color={'default'}
                                                                                        variant={'outlined'}
                                                                                        icon={<EditOutlined/>}
                                                                                >Редактировать</Button>
                                                                            </div>
                                                                        </div>
                                                                        { openRules.find(item => item === user.id) && user.linked_schedule && (
                                                                            <div className="sk-person-rules">
                                                                                <div className="sk-person-schedule">
                                                                                    <div className="sk-person-schedule-hover-container">
                                                                                        <div className="sk-schedule-cell">
                                                                                            <CalendarOutlined />
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
                                                                                {user.linked_rules.map((rule, idx) => (
                                                                                    <div className="sk-person-rule" key={`${user.id}-${rule.id}`}>
                                                                                        <div className="sk-person-rule-hover-container">
                                                                                            <div className="sk-schedule-cell">
                                                                                                <HistoryOutlined />
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
                                    companies={props.userdata?.companies}
                                    groups={baseGroupList}
                                    onChangeFilter={(ev) => {
                                        setFilters(ev)
                                    }}
                                    onSelectAllUsers={null}
                                    onSelectGroups={(val) => {
                                        setSelectedGroups(val)
                                    }}
                                    onCallToSelectGroups={null}
                                    onCallToClearGroups={null}
                                    selected_users={[]}
                                    rules={[]}
                                    schedules={[]}
                                    selectedCompany={null}

                                    schedTypes={[]}
                                    ruleTypes={[]}
                                    onBidnRules={null}
                                    onBidnSchedules={null}
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
