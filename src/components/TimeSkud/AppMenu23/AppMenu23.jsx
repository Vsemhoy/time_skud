import { Affix, Avatar, Badge, Button, Drawer, Dropdown, Menu } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { HTTP_ROOT } from '../../../CONFIG/config';
import { HomeOutlined, LoginOutlined, NotificationOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {matchPath, NavLink, useLocation, useNavigate} from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { StateContext } from './../../ComStateProvider25/ComStateProvider25';

const AppMenu23 = (props) => {
    const { state, setState } = useContext(StateContext);
    const [notificatorLoading, setNotificatorLoading] = useState(true);

    const [countOfNotifications, setCountOfNotifications] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedKey = location.pathname;

    const showNotyBar = () => {
        if (props.on_open_notificator){
            props.on_open_notificator();
            
        }
        // setNotificatorOpened(true);
        setNotificatorLoading(true);
        setTimeout(() => setNotificatorLoading(false), 2000);
    };

    useEffect(() => {
      setCountOfNotifications(props.count_of_notifications);
      console.log(props.count_of_notifications);
    }, [props.count_of_notifications]);



    const getSelectedKeys = () => {
        const path = location.pathname;
        if (matchPath('/hr/usermanager/*', path)) {
            return ['/hr/usermanager'];
        }
        return [path];
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
            key: '/userlist',
            label: <NavLink to="/userlist">Сотрудники 2025</NavLink>,
        },
        {
            key: 'menu1',
            label: 'Заявки',
            children: [
                {
                    key: '/claims',
                    label: <NavLink to="/claims">Монитор заявок</NavLink>,
                },
                {
                    key: '/charts',
                    label: 'Графики заявок',
                    children: [
                        {
                            key: '/charts/shortvacation',
                            label: <NavLink to="/charts/shortvacation">Неоплачиваемый отпуск</NavLink>,
                        },
                        {
                            key: '/charts/shorttrip',
                            label: <NavLink to="/charts/shorttrip">Местная командировка</NavLink>,
                        },
                        {
                            key: '/charts/longtrip',
                            label: <NavLink to="/charts/longtrip">Длительная командировка</NavLink>,
                        },
                        {
                            key: '/charts/longvacation',
                            label: <NavLink to="/charts/longvacation">Оплачиваемый отпуск</NavLink>,
                        },
                        {
                            key: '/charts/overtime',
                            label: <NavLink to="/charts/overtime">Сверхурочные</NavLink>,
                        },
                        {
                            key: '/charts/sickleave',
                            label: <NavLink to="/charts/sickleave">Больничный</NavLink>,
                        },
                        {
                            key: '/charts/containers',
                            label: <NavLink to="/charts/containers">Контейнеры</NavLink>,
                        },
                    ]
                },
                {
                    key: '/calendars',
                    label: <NavLink to="/calendars">Календарь</NavLink>,
                },
            ]
        },
        {
            key: 'menu2',
            label: 'Персонал',
            children: [
                {
                    key: '/hr/usermanager',
                    label: <NavLink to="/hr/usermanager">Управление пользователями</NavLink>,
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
        {
            key: 'menu3',
            label: 'Бухгалтерия',
            children: [
                {
                    key: '/accounting/staffingschedule',
                    label: <NavLink to="/accounting/staffingschedule">Штатное расписание</NavLink>,
                },
                {
                    key: '/accounting/bankcard',
                    label: <NavLink to="/accounting/bankcard">Банковские карты</NavLink>,
                },
                {
                    key: '/accounting/productioncalendar',
                    label: <NavLink to="/accounting/productioncalendar">Производственный календарь</NavLink>,
                },
                {
                    key: '/accounting/surcharges',
                    label: <NavLink to="/accounting/surcharges">Доплаты</NavLink>,
                },
                {
                    key: '/accounting/rewards',
                    label: <NavLink to="/accounting/rewards">Вознаграждения</NavLink>,
                },{
                    key: '/accounting/retentions',
                    label: <NavLink to="/accounting/retentions">Удержания</NavLink>,
                },
            ]
        },
        {
            key: '/admin/aclskud',
            label: <NavLink to="admin/aclskud">ACL</NavLink>,
        },
        /*{
            key: 'menu4',
            label: 'ACL',
            children: [
                {
                    key: '/admin/aclskud',
                    label: <NavLink to="admin/aclskud">СКУД доступы и права</NavLink>,
                },
            ],
        },*/
    ];

    useEffect(() => {
        console.log(props.user_act)
    }, [props.user_act]);

    const getMenuItems = () => {
        console.log(props.user_act)
        return mainMenuItems.filter(item => {
            const shouldShowItem = (() => {
                switch (item.key) {
                    case 'menu2': return props.user_act && props.user_act.user && (props.user_act.user.id_departament === 2 || props.user_act.user.super === 1);
                    case 'menu3': return props.user_act && props.user_act.acls && props.user_act.acls.includes(82);
                    case '/admin/aclskud': return props.user_act && props.user_act.user && props.user_act.user.super === 1;
                    default: return true;
                }
            })();
            if (shouldShowItem && item.children) {
                item.children = item.children.filter(child => {
                    return true;
                });
                if (item.children.length === 0) return false;
            }

            return shouldShowItem;
        });
    };

    return (
        <div>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className={'sk-main-menu'}>
                <Menu
                    mode="horizontal"
                    style={{ background: '#00000000', flex: 1 }}
                    selectedKeys={getSelectedKeys()}
                    items={getMenuItems()}
                />

                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <div onClick={showNotyBar} style={{ cursor: "pointer", marginRight: '24px'}}>
                        <Badge count={countOfNotifications} offset={[4, 32]}>
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

            {/* <Drawer
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
            </Drawer> */}
        </div>
    );
}

export default AppMenu23;