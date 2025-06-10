import React, {useEffect, useState} from 'react';
import UserManagerExtraTools from "./components/UserManagerExtraTools";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import './style/user_manager_page.css'
import {Affix, Button, Checkbox, Flex, Layout, Pagination, Select, Tag} from 'antd';
import {EditOutlined, FilterOutlined, ToolOutlined} from "@ant-design/icons";
import {DEPARTMENTS, USERS, USERS_BY_DEPARTMENTS} from "./mock/mock";
import {CSRF_TOKEN, HTTP_ROOT, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
const { Header, Footer, Sider, Content } = Layout;

const UserManagerPage_2025 = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [pageSizePicker, setPageSizePicker] = useState([
        {value: 50, label: '50 на странице'},
        {value: 100, label: '100 на странице'},
    ]);
    const [allUsersCount, setAllUsersCount] = useState(0);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);
    const [closedDepartments, setClosedDepartments] = useState([]);
    const [openSchedules, setOpenSchedules] = useState([]);

    const [baseGroupList, setBaseGroupList] = useState([]);
    const [isOpenFilters, setIsOpenFilters] = useState(false);
    const [isOpenTools, setIsOpenTools] = useState(false);

    useEffect(() => {
        fetchDepartments().then();
        fetchUsers().then();
    }, []);
    const fetchDepartments = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/departments`,
                    {

                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content && serverResponse.data.content.length > 0) {
                    setDepartments(serverResponse.data.content);
                }
            } catch (error) {
                console.error('Error fetching departments info:', error);
            }
        } else {
            setDepartments(DEPARTMENTS);
        }
    }
    const fetchUsers = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/users`,
                    {

                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content && serverResponse.data.content.length > 0) {
                    setUsers(serverResponse.data.content);
                }
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setUsers(USERS);
            setPageSize(50);
            setCurrentPage(1);
            setAllUsersCount(USERS.length);
            console.log(Math.ceil(allUsersCount / pageSize))
        }
    }
    const handleChangePageSize = (value) => {
        console.log(`selected ${value}`);
    };

    const openCloseDepartments = (departmentId) => {
        if (closedDepartments.includes(departmentId)) {
            setClosedDepartments(closedDepartments.filter(id => id !== departmentId));
        } else {
            setClosedDepartments([...closedDepartments, departmentId]);
        }
    }
    const openCloseUserSchedules = (userId) => {
        if (openSchedules.includes(userId)) {
            setOpenSchedules(openSchedules.filter(id => id !== userId));
        } else {
            setOpenSchedules([...openSchedules, userId]);
        }
    }

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
                                        user_list={[]}
                                        depart_list={[]}
                                        company_list={props.userData?.companies}
                                        on_change_filter={handleFilterChanged}
                                    />
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className={'sk-content-table'}>
                            <Affix offsetTop={47}>
                                <div className="sk-pagination-container">
                                    <Pagination defaultCurrent={currentPage}
                                                total={allUsersCount}
                                                defaultPageSize={50}
                                                showTotal={total => `Всего ${total} пользователей`}
                                    />
                                    <Select
                                        defaultValue={pageSize}
                                        style={{ width: 160 }}
                                        onChange={handleChangePageSize}
                                        options={pageSizePicker}
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
                            {departments.map((department, index) => (
                                <div key={`${department.id}-${index}`}
                                     className="sk-department-block"
                                >
                                    <div className="sk-department-header"
                                         onDoubleClick={() => openCloseDepartments(department.id)}
                                    >
                                        <Checkbox />
                                        <p className="sk-department-header-p">{department.id}</p>
                                        <p className="sk-department-header-p">{department.name}</p>
                                    </div>
                                    { !closedDepartments.find(item => item === department.id) && (
                                        <div className="sk-person-rows">
                                            {users.map((user, idx) => {
                                                if (+user.department === +department.id) {
                                                    return (
                                                        <div key={`${user.id}-${idx}`}
                                                             className="sk-person-row"
                                                        >
                                                            <div className="sk-person-row-basic"
                                                                 onDoubleClick={() => openCloseUserSchedules(user.id)}
                                                            >
                                                                <Checkbox/>
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
                                                            { openSchedules.find(item => item === user.id) && (
                                                                <div className="sk-person-schedules">
                                                                    <div className="sk-person-schedule">
                                                                        <div className="sk-schedule-cell">Стандартный график с
                                                                            девяти до шести
                                                                        </div>
                                                                        <p className="sk-schedule-cell">9:15 - 18:00</p>
                                                                        <p className="sk-schedule-cell">13:00 - 15:00</p>
                                                                        <p className="sk-schedule-cell">8:00 / день</p>
                                                                    </div>
                                                                    <div className="sk-person-schedule">
                                                                        <div className="sk-schedule-cell">Стандартный график с
                                                                            девяти до шести
                                                                        </div>
                                                                        <p className="sk-schedule-cell">9:15 - 18:00</p>
                                                                        <p className="sk-schedule-cell">13:00 - 15:00</p>
                                                                        <p className="sk-schedule-cell">8:00 / день</p>
                                                                    </div>
                                                                    <div className="sk-person-schedule">
                                                                        <div className="sk-schedule-cell">Стандартный график с
                                                                            девяти до шести
                                                                        </div>
                                                                        <p className="sk-schedule-cell">9:15 - 18:00</p>
                                                                        <p className="sk-schedule-cell">13:00 - 15:00</p>
                                                                        <p className="sk-schedule-cell">8:00 / день</p>
                                                                    </div>
                                                                    <div className="sk-person-schedule">
                                                                        <div className="sk-schedule-cell">Стандартный график с
                                                                            девяти до шести
                                                                        </div>
                                                                        <p className="sk-schedule-cell">9:15 - 18:00</p>
                                                                        <p className="sk-schedule-cell">13:00 - 15:00</p>
                                                                        <p className="sk-schedule-cell">8:00 / день</p>
                                                                    </div>
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
