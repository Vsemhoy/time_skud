import React, {useState} from 'react';
import UserManagerExtraTools from "./components/UserManagerExtraTools";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};
const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
};
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
};
const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};

const UserManagerPage_2025 = (props) => {
    const [baseGroupList, setBaseGroupList] = useState([]);

    const handleFilterChanged = () => {

    };

    const setFilters = (ev) => {

    };

    const setSelectedGroups = (val) => {

    };

    return (
        <div className={'mega-pidor'}>

            <Layout className={'layout'}>
                <Header style={headerStyle}>Header</Header>
                <Layout>
                    <Sider width="25%" style={siderStyle}>
                        Sider
                    </Sider>
                    <Content style={contentStyle}>Content</Content>
                </Layout>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>

            {/*<ClaimManagerSidebar
                user_list={[]}
                depart_list={[]}
                company_list={props.userData?.companies}
                on_change_filter={handleFilterChanged}
            />

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
            />*/}

        </div>
    );
}

export default UserManagerPage_2025;
