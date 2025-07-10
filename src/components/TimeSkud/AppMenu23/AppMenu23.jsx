import { Affix, Avatar, Badge, Button, Drawer, Dropdown, Menu } from 'antd';
import React, { useContext, useState } from 'react';
import { HTTP_ROOT } from '../../../CONFIG/config';
import { HomeOutlined, LoginOutlined, NotificationOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { StateContext } from './../../ComStateProvider25/ComStateProvider25';

const AppMenu23 = (props) => {
    const { state, setState } = useContext(StateContext);
    const [notificatorOpened, setNotificatorOpened] = useState(false);
    const [notificatorLoading, setNotificatorLoading] = useState(true);
    const [countOfNotifications, setCountOfNotifications] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedKey = location.pathname;

    const showNotyBar = () => {
        setNotificatorOpened(true);
        setNotificatorLoading(true);
        setTimeout(() => setNotificatorLoading(false), 2000);
    };

    // User dropdown menu
    const userMenuItems = [
        {
            key: 'status',
            label: 'Статус: Онлайн',
        },
        {
            key: 'hr/notify',
            icon: <ThunderboltOutlined />,
            label: 'Нотификатор',
            onClick: () => navigate('/hr/notify')
        },
        {
            key: 'logout',
            icon: <LoginOutlined />,
            label: 'Выйти',
        },
    ];

    // Main navigation menu
    const mainMenuItems = [
        {
            key: 'home',
            icon: <HomeOutlined style={{ fontSize: '20px', color: '#3b3b3b' }} />,
            label: <a href={HTTP_ROOT}></a>,
        },
        {
            key: '/',
            label: <NavLink to="/">Сотрудники</NavLink>,
        },
        {
            key: '/claims',
            label: <NavLink to="/claims">Заявки</NavLink>,
        },
        {
            key: 'menu2',
            label: 'Персонал',
            children: [
                {
                    key: '/hr/usermanager',
                    label: <NavLink to="/hr/usermanager">Управление пользователями</NavLink>,
                    /*key: '/hr/usersettings',
                    label: <NavLink to="/hr/usersettings">Управление пользователями</NavLink>,*/
                },
                {
                    key: '/hr/rules',
                    label: <NavLink to="/hr/rules">Правила</NavLink>,
                },
                {
                    key: '/hr/schedules',
                    label: <NavLink to="/hr/schedules">Графики работы</NavLink>,
                },
                {
                    key: '/hr/calendars',
                    label: <NavLink to="/hr/calendars">Производственные календари</NavLink>,
                },
                {
                    key: '/hr/groups',
                    label: <NavLink to="/hr/groups">Группы пользователей</NavLink>,
                },
                {
                    key: '/monitor/events',
                    label: <NavLink to="/monitor/events">Монитор событий</NavLink>,
                },
            ],
        },
        /*{
            key: '/hr/usermanager',
            label: <NavLink to="/hr/usermanager">Персонал_2</NavLink>,
        },*/
        /*{
            key: 'menu228',
            label: 'Персонал_2',
            children: [
                {
                    key: '/hr/usermanager',
                    label: <NavLink to="/hr/usermanager">Управление пользователями</NavLink>,
                },
            ],
        },*/
        {
            key: 'menu634',
            label: 'ACL',
            children: [
                {
                    key: '/admin/aclskud',
                    label: <NavLink to="admin/aclskud">СКУД доступы и права</NavLink>,
                },
            ],
        },
    ];

    return (
        <div>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={'sk-main-menu'}>
                <Menu
                    mode="horizontal"
                    style={{ background: '#00000000', flex: 1 }}
                    selectedKeys={[selectedKey]}
                    items={mainMenuItems}
                />

                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div onClick={showNotyBar} style={{ cursor: "pointer", marginRight: '24px'}}>
                        <Badge count={countOfNotifications} offset={[2, 24]}>
                            <Avatar style={{ backgroundColor: '#33333300' }}>
                                <NotificationOutlined style={{ fontSize: '36px', color: '#3d3d3d' }} />
                            </Avatar>
                        </Badge>
                    </div>

                    <Dropdown menu={{ items: userMenuItems }} trigger={['hover']}>
                        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            {props.user_act?.user ? (
                                <span style={{fontWeight: 500, color: "#3d3d3d"}}>
                  {props.user_act.user.name} {props.user_act.user.patronymic}
                </span>
                            ) : (
                                <span>Пользователь</span>
                            )}
                        </div>
                    </Dropdown>
                </div>
            </Header>

            <Drawer
                closable
                destroyOnClose
                title="Уведомления"
                placement="right"
                open={notificatorOpened}
                onClose={() => setNotificatorOpened(false)}
            >
                {notificatorLoading ? (
                    <div>Загрузка...</div>
                ) : (
                    <>
                        <Button type="primary" style={{ marginBottom: 16 }} onClick={showNotyBar}>
                            Обновить
                        </Button>
                        <p>Новых уведомлений не найдено...</p>
                    </>
                )}
            </Drawer>
        </div>
    );
}

export default AppMenu23;