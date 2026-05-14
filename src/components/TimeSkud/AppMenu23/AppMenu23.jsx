import { Affix, Avatar, Badge, Button, Drawer, Dropdown, Menu, Switch } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {BFF_PORT, CSRF_TOKEN, HTTP_HOST, HTTP_ROOT, PRODMODE, ROUTE_PREFIX} from '../../../CONFIG/config';
import {HomeOutlined, LoginOutlined, NotificationOutlined, ThunderboltOutlined, UserOutlined} from '@ant-design/icons';
import {matchPath, NavLink, useLocation, useNavigate} from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { StateContext } from './../../ComStateProvider25/ComStateProvider25';
import Chat from "corp-chat-library-antd-react-socket";
import Notificator from "corp-notificator-library-antd-react-socket";

const THEME_STORAGE_KEY = 'skud_theme';

const getSavedThemeMode = () => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
};

const isBrowserNotificationSupported = () => (
    typeof window !== 'undefined' && 'Notification' in window
);

const requestBrowserNotificationPermission = async () => {
    if (!isBrowserNotificationSupported()) {
        return undefined;
    }

    if (Notification.permission !== 'default') {
        return Notification.permission;
    }

    try {
        return await Notification.requestPermission();
    } catch (e) {
        console.log('Cannot request browser notification permission', e);
        return Notification.permission;
    }
};

const getNotificationText = (value) => {
    if (value === null || value === undefined) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    return String(value);
};

const showBrowserNotification = async ({ title, body, tag, data }) => {
    if (!isBrowserNotificationSupported()) {
        return;
    }

    const permission = await requestBrowserNotificationPermission();

    if (permission !== 'granted') {
        return;
    }

    const notificationOptions = {
        body: getNotificationText(body),
        icon: `${window.location.origin}/favicon.ico`,
        data,
    };

    if (tag) {
        notificationOptions.tag = tag;
    }

    new Notification(getNotificationText(title) || 'New notification', notificationOptions);
};

const getChatPayloadMessage = (payload) => (
    payload?.sms
    || payload?.left
    || payload?.right
    || payload?.message
    || payload
);

const getChatSenderName = (message) => {
    const sender = message?.from;
    const fullName = [sender?.surname, sender?.name].filter(Boolean).join(' ');

    return fullName || message?.who || message?.name || 'Новое сообщение';
};

const AppMenu23 = (props) => {
    const { state, setState } = useContext(StateContext);
    const [notificatorLoading, setNotificatorLoading] = useState(true);

    const [countOfNotifications, setCountOfNotifications] = useState(0);
    const [themeMode, setThemeMode] = useState(getSavedThemeMode);
    const navigate = useNavigate();
    const location = useLocation();
    const selectedKey = location.pathname;
    const homeHref = `${window.location.origin}/`;

    const handleHomeClick = (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        event.preventDefault();
        window.location.assign(homeHref);
    };

    const showNotyBar = () => {
        if (props.on_open_notificator){
            props.on_open_notificator();
            
        }
        // setNotificatorOpened(true);
        setNotificatorLoading(true);
        setTimeout(() => setNotificatorLoading(false), 2000);
    };

    useEffect(() => {
        requestBrowserNotificationPermission();

        const enableBrowserNotifications = () => {
            requestBrowserNotificationPermission();
        };

        window.addEventListener('click', enableBrowserNotifications, { once: true, capture: true });
        window.addEventListener('keydown', enableBrowserNotifications, { once: true, capture: true });

        return () => {
            window.removeEventListener('click', enableBrowserNotifications, { capture: true });
            window.removeEventListener('keydown', enableBrowserNotifications, { capture: true });
        };
    }, []);

    const handleNewNotification = useCallback(async (notification) => {
        await showBrowserNotification({
            title: notification?.name || 'Новое уведомление',
            body: notification?.message || notification?.content,
            tag: notification?.id ? `notification-${notification.id}` : undefined,
            data: notification,
        });
    }, []);

    const handleNewChatMessage = useCallback(async (payload) => {
        const message = getChatPayloadMessage(payload);

        await showBrowserNotification({
            title: getChatSenderName(message),
            body: message?.text || payload?.text || payload?.content || payload?.message || '',
            tag: message?.id ? `chat-message-${message.id}` : undefined,
            data: payload,
        });
    }, []);

    useEffect(() => {
      setCountOfNotifications(props.count_of_notifications);
      console.log(props.count_of_notifications);
    }, [props.count_of_notifications]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === THEME_STORAGE_KEY) {
                setThemeMode(event.newValue === 'dark' ? 'dark' : 'light');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleThemeChange = (checked) => {
        const nextThemeMode = checked ? 'dark' : 'light';

        setThemeMode(nextThemeMode);
        window.localStorage.setItem(THEME_STORAGE_KEY, nextThemeMode);
        window.location.reload();
    };



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
            key: 'theme',
            label: (
                <div
                    onClick={(event) => event.stopPropagation()}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', minWidth: '160px' }}
                >
                    <span>Темная тема</span>
                    <Switch
                        size="small"
                        checked={themeMode === 'dark'}
                        onChange={handleThemeChange}
                    />
                </div>
            ),
        },
        /*{
            key: 'hr/notify',
            icon: <ThunderboltOutlined />,
            label: 'Нотификатор',
            onClick: () => navigate('/hr/notify')
        },*/
        {
            key: `${HTTP_HOST}/logout`,
            icon: <LoginOutlined />,
            label: <NavLink to={`${HTTP_HOST}/logout`}>Выйти</NavLink>,
        },
    ];

    // Main navigation menu
    const mainMenuItems = [
        {
            key: 'home',
            className: 'sk-home-menu-item',
            icon: (
                <a
                    href={HTTP_HOST}
                    aria-label="Домой"
                    //onClick={handleHomeClick}
                    style={{display: 'inline-flex', alignItems: 'center', color: 'var(--app-text-color)'}}
                >
                    <HomeOutlined style={{ fontSize: '20px', color: 'var(--app-text-color)' }} />
                </a>
            ),
            label: null,
        },
        {
            key: '/',
            label: <NavLink to="/">Сотрудники</NavLink>,
        },
        /*{
            key: '/userlist',
            label: <NavLink to="/userlist">Сотрудники 2025</NavLink>,
        },*/
        {
            key: 'menu1',
            label: 'Заявки',
            children: [
                {
                    key: '/claims',
                    label: <NavLink to="/claims">Список заявок</NavLink>,
                },
                /*{
                    key: '/claims/settings',
                    label: <NavLink to="/claims/settings">Настройка командировок</NavLink>,
                },*/
                {
                    key: '/charts',
                    label: 'Графики заявок',
                    children: [
                        {
                            key: '/charts/shorttrip',
                            label: <NavLink to="/charts/shorttrip">Местная командировка</NavLink>,
                        },
                        {
                            key: '/charts/shortvacation',
                            label: <NavLink to="/charts/shortvacation">Неоплачиваемый отпуск</NavLink>,
                        },
                        {
                            key: '/charts/overtime',
                            label: <NavLink to="/charts/overtime">Сверхурочные</NavLink>,
                        },
                        {
                            key: '/charts/longtrip',
                            label: <NavLink to="/charts/longtrip">Командировка</NavLink>,
                        },
                        {
                            key: '/charts/longvacation',
                            label: <NavLink to="/charts/longvacation">Отпуск</NavLink>,
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
                /*{
                    key: '/calendars',
                    label: <NavLink to="/calendars">Календарь</NavLink>,
                },*/
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
                    key: '/accounting/surcharges',
                    label: <NavLink to="/accounting/surcharges">Доплаты</NavLink>,
                },
            ]
        },
        {
            key: '/admin/aclskud',
            label: <NavLink to="admin/aclskud">Доступы СКУД</NavLink>,
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

    const isTruthyFlag = (value) => value === true || value === 1 || value === '1';

    const getMenuItems = () => {
        console.log(props.user_act)
        const currentUser = props.user_act?.user;
        const hasFullMenuAccess = isTruthyFlag(currentUser?.super) || isTruthyFlag(currentUser?.is_admin);

        return mainMenuItems.filter(item => {
            const shouldShowItem = (() => {
                switch (item.key) {
                    case 'menu2': return hasFullMenuAccess || (currentUser && currentUser.id_departament === 2);
                    case 'menu3': return isTruthyFlag(currentUser?.is_admin) || isTruthyFlag(currentUser?.super);
                    case '/admin/aclskud': return hasFullMenuAccess;
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>

                    <Chat userdata={props.user_act}
                          httpParams={{
                              HTTP_HOST: HTTP_HOST,
                              BFF_PORT: BFF_PORT,
                              CSRF_TOKEN: CSRF_TOKEN,
                              PRODMODE: PRODMODE,
                              PROD_AXIOS_INSTANCE: null,
                          }}
                          fetchParams={{
                              fetchChatsListPath: `${HTTP_HOST}${ROUTE_PREFIX}/sms`,
                              fetchChatMessagesPath: `${HTTP_HOST}${ROUTE_PREFIX}/sms`,
                              sendSmsPath: `${HTTP_HOST}${ROUTE_PREFIX}/sms/create/sms`,
                              markMessagesAsReadPath: `${HTTP_HOST}${ROUTE_PREFIX}/sms/read`,
                          }}
                          socketSubscribe={{
                              subscribeToChat: 'subscribeToChat'
                          }}
                          socketActions={{
                              newSms: 'new:sms',
                              updateSms: 'update:sms',
                          }}
                          onNewMessage={handleNewChatMessage}
                    />

                    <Notificator userdata={props.user_act}
                                 httpParams={{
                                     HTTP_HOST: HTTP_HOST,
                                     BFF_PORT: BFF_PORT,
                                     CSRF_TOKEN: CSRF_TOKEN,
                                     PRODMODE: PRODMODE,
                                     PROD_AXIOS_INSTANCE: null,
                                 }}
                                 socketSubscribe={{
                                     subscribeToNotification: 'subscribe:notification'
                                 }}
                                 socketActions={{
                                     newNotification: 'new:notification',
                                     readNotification: 'read:notification',
                                 }}
                                 onNewNotification={handleNewNotification}
                    />

                    {/*<div onClick={showNotyBar} style={{ cursor: "pointer", width: '46px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Badge count={countOfNotifications} offset={[4, 32]}>
                            <Avatar style={{ backgroundColor: '#33333300' }}>
                                <NotificationOutlined style={{ fontSize: '36px', color: '#3d3d3d' }} />
                            </Avatar>
                        </Badge>
                    </div>*/}

                    <Dropdown menu={{ items: userMenuItems }} trigger={['hover']}>
                        <div
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                height: '32px',
                                padding: '0 10px',
                                borderRadius: '6px',
                                border: '1px solid var(--table-border-divider-color)',
                                background: 'color-mix(in srgb, var(--app-surface-gray-color) 78%, transparent)',
                                boxShadow: '0 6px 18px rgba(34, 60, 80, 0.08)',
                                backdropFilter: 'blur(6px)',
                                boxSizing: 'border-box',
                            }}
                        >
                            {props.user_act?.user ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1 }}>
                                    <Avatar
                                        size={22}
                                        style={{ backgroundColor: 'var(--app-soft-surface-color)', color: 'var(--app-text-color)' }}
                                        icon={<UserOutlined />}
                                    ></Avatar>
                                    <span style={{fontWeight: 500, color: "var(--app-text-color)", fontSize: '14px', whiteSpace: 'nowrap'}}>
                                      {props.user_act.user.surname} {props.user_act.user.name}
                                    </span>
                                </div>
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



