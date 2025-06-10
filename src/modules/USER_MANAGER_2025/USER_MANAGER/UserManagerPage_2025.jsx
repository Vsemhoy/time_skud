import React, {useEffect, useState} from 'react';
import UserManagerExtraTools from "./components/UserManagerExtraTools";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import './style/user_manager_page.css'
import {Affix, Button, Flex, Layout} from 'antd';
import {FilterOutlined, ToolOutlined} from "@ant-design/icons";
import {USERS_BY_DEPARTMENTS} from "./mock/mock";
const { Header, Footer, Sider, Content } = Layout;


const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};

const UserManagerPage_2025 = (props) => {
    const [serverInfo, setServerInfo] = useState([]);
    const [baseGroupList, setBaseGroupList] = useState([]);
    const [isOpenFilters, setIsOpenFilters] = useState(true);
    const [isOpenTools, setIsOpenTools] = useState(true);

    useEffect(() => {
        fetchInfo();
    }, []);

    const fetchInfo = () => {
        setServerInfo(USERS_BY_DEPARTMENTS);
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
                        >
                            Фильтры
                        </Button>
                        <h1 className={'page-header'}>Учёт кривозубых крестьян</h1>
                        <Button color="default"
                                variant={isOpenTools ? 'solid' : 'outlined'}
                                icon={<ToolOutlined />}
                                onClick={() => setIsOpenTools(!isOpenTools)}
                        >
                            Мутьтитул
                        </Button>
                    </div>
                    </Affix>
                </Header>
                <Layout>
                    <Sider width={isOpenFilters ? "330px" : 0} className={'sider'}>
                        <Affix offsetTop={54}>
                            <div className="sk-usp-filter-col">
                                <ClaimManagerSidebar
                                    user_list={[]}
                                    depart_list={[]}
                                    company_list={props.userData?.companies}
                                    on_change_filter={handleFilterChanged}
                                />
                            </div>
                        </Affix>
                    </Sider>
                    <Content className={'content'}>
                        <div className={'sk-content-table'}>
                            {serverInfo.map((item, index) => (
                                <div>
                                    <div className={'sk-department-header'} key={item.id}>{item.name}</div>
                                    <div className={'sk-person-rows'}>
                                        {item.users.map((user) => (
                                            <div className={'sk-person-row'} key={user.id}>{user.name}</div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Content>
                    <Sider width={isOpenTools ? "330px" : 0} className={'sider'}>
                        <Affix offsetTop={54}>
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
                        </Affix>
                    </Sider>
                </Layout>
            </Layout>
        </div>
    );
}

export default UserManagerPage_2025;
