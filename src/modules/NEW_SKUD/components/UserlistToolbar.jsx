import {Button, DatePicker, Dropdown} from "antd";
import React, { useState, useEffect, use, useContext } from "react";
import {Avatar, Skeleton, Switch} from "antd";


import dayjs from "dayjs";

import '../../../assets/timeskud.css'
import {
    CaretLeftOutlined, CaretRightOutlined,
    FilterOutlined, HomeOutlined, PlusOutlined, UserOutlined
} from "@ant-design/icons";
import {LoginOutlined, ScheduleOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {ListChevronsDownUp, ListChevronsUpDown, PanelRightClose, PanelRightOpen} from "lucide-react";
import { getWeekDayString } from "../../../components/Helpers/TextHelpers";
import { StateContext } from "../../../components/ComStateProvider25/ComStateProvider25";
import {message, Popover, Select} from "antd";
import {CSRF_TOKEN, HTTP_HOST, ROUTE_PREFIX} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";



const UserListToolbar = (props) => {
    const { state, setState } = useContext(StateContext);
    const {onChange, userData} = props;

    const [imExist, setImExist] = useState(false);
    const isSuperUser = props.isSuperUser === true;
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [selectedSuperUserId, setSelectedSuperUserId] = useState(null);
    const [isAddingSuperUser, setIsAddingSuperUser] = useState(false);
    const [themeMode, setThemeMode] = useState(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        return window.localStorage.getItem('skud_theme') === 'dark' ? 'dark' : 'light';
    });



    const today = () => {
        const currentTimestamp = Date.now(); // e.g., 1736425982143
        const currentDate = new Date(currentTimestamp);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate.getTime();
    };


    useEffect(()=>{
        console.log('im_exist.', props.im_exist)
        setImExist(props.im_exist);
    }, [props.im_exist])




    const [usedDate, setUsedDate] = useState(dayjs());



    // Отслеживаем и отсылаем внешние фильтры на сервер
    useEffect(() => {
        
        setDateInContext(usedDate);
        if (props.onChangeExternalFilters){
            let params = {};
    
            params.date =  usedDate.format('YYYY-MM-DD HH:mm:ss');

            props.onChangeExternalFilters(params);
        }

    }, [usedDate])

    const handleUsedDateChange = (value) => {
        if (value == null){
            value = dayjs();
        }
        setUsedDate(value);
    }

    const handleRefresh = () => {
        if (props.onRefresh) {
            props.onRefresh();
        }
    }

    const handleFindMyself = () => {
        if (props.onFindMe) {
            props.onFindMe();
        }
    }

    const handleThemeChange = (checked) => {
        const nextThemeMode = checked ? 'dark' : 'light';
        setThemeMode(nextThemeMode);
        window.localStorage.setItem('skud_theme', nextThemeMode);
        window.location.reload();
    };

    const userMenuItems = [
        ...(isSuperUser ? [
            {
                key: 'home',
                icon: <HomeOutlined />,
                label: <a href={HTTP_HOST}>Домой</a>,
            },
        ] : []),
        {
            key: 'newskud-bill-list',
            icon: <ScheduleOutlined />,
            label: 'Расчетный лист',
            onClick: () => window.dispatchEvent(new CustomEvent('newskud:open-bill-list')),
        },
        {
            key: 'newskud-claims-list',
            icon: <UnorderedListOutlined />,
            label: 'Список заявок',
            onClick: () => window.dispatchEvent(new CustomEvent('newskud:open-claims-list')),
        },
        ...(!isSuperUser ? [{
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
        }] : []),
        {
            key: 'logout',
            icon: <LoginOutlined />,
            label: <a href={`${HTTP_HOST}/logout`}>Выйти</a>,
        },
    ];

    const addUserOptions = (props.baseUsers ?? [])
        .filter((user) => user?.id != null && user?.type !== 'header')
        .map((user) => ({
            value: user.id,
            label: [user.surname, user.name, user.patronymic].filter(Boolean).join(' ') || `ID ${user.id}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    const handleAddSuperUser = async () => {
        if (!selectedSuperUserId) {
            return;
        }

        setIsAddingSuperUser(true);
        try {
            await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/userlist/set-for-super`, {
                data: {
                    user_id: selectedSuperUserId,
                    for_super: 1,
                },
                _token: CSRF_TOKEN,
            });
            message.success('Сотрудник добавлен');
            setSelectedSuperUserId(null);
            setIsAddUserOpen(false);
            props.onRefresh?.();
        } catch (e) {
            console.log(e);
            message.error('Не удалось добавить сотрудника');
        } finally {
            setIsAddingSuperUser(false);
        }
    };

    const addUserPopoverContent = (
        <div className="sk-userlist-add-super-popover">
            <Select
                showSearch
                allowClear
                placeholder="Выберите сотрудника"
                value={selectedSuperUserId}
                options={addUserOptions}
                optionFilterProp="label"
                onChange={setSelectedSuperUserId}
                style={{width: '260px'}}
            />
            <Button
                type="primary"
                loading={isAddingSuperUser}
                disabled={!selectedSuperUserId}
                onClick={handleAddSuperUser}
            >
                Добавить
            </Button>
        </div>
    );

    useEffect(() => {
        if (props.command === "add_day"){
            setUsedDate(usedDate.add(1, 'day'));
        } else if (props.command === "sub_day"){
            setUsedDate(usedDate.add(-1, 'day'));
        }
    }, [props.command]);

    const increaseDate = () => {
        setUsedDate(usedDate.add(1, 'day'));
    }

    const decreaseDate = () => {
        setUsedDate(usedDate.add(-1, 'day'));
    }


    const setDateInContext = (value) => {
        setState(prevState => ({
        ...prevState, // Сохраняем все текущие значения
        date: value, // Обновляем только `date`
        }));
    }

    
    const handleEditorOpen = (value) => {
        if (value && value.key){
            let key = parseInt(value.key.replace('clt_', ''));
            props.handleEditorOpenCreate(key);
        }
    }

    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']

    if (props.isInitialLoading) {
        return (
            <div style={{width: '100%'}}>
                <div className={'sk-header-container sk-userlist-toolbar-top sk-userlist-toolbar-top--skeleton'}>
                    <div className={'sk-flex-space sk-userlist-toolbar-top-left'}>
                        {isSuperUser ? (
                            <>
                                <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-button" />
                                <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-create" />
                            </>
                        ) : (
                            <>
                                <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-button" />
                                <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-icon" />
                            </>
                        )}
                    </div>
                    <div className="sk-flex sk-userlist-toolbar-top-center">
                        <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-arrow" />
                        <Skeleton.Input active size="small" className="sk-userlist-toolbar-skeleton-date" />
                        <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-dot" />
                        <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-arrow" />
                    </div>
                    <div className={'sk-flex-space sk-userlist-toolbar-top-right'}>
                        <Skeleton.Button active size="small" className="sk-userlist-toolbar-skeleton-icon" />
                        <Skeleton.Button active size="small" className={isSuperUser ? 'sk-userlist-toolbar-skeleton-user' : 'sk-userlist-toolbar-skeleton-create'} />
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div style={{width: '100%'}}>
            <div className={'sk-header-container sk-userlist-toolbar-top'}>
                <div className={'sk-flex-space sk-userlist-toolbar-top-left'}>
                    {isSuperUser ? (
                        <>
                            <Popover
                                trigger="click"
                                placement="bottomLeft"
                                open={isAddUserOpen}
                                onOpenChange={setIsAddUserOpen}
                                content={addUserPopoverContent}
                            >
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    className={'sk-userlist-compact-btn'}
                                    title={'Добавить'}
                                >
                                    <span className={'sk-userlist-btn-label'}>Добавить</span>
                                </Button>
                            </Popover>
                            <Button
                                color={'default'}
                                variant={'outlined'}
                                className={'sk-userlist-compact-btn'}
                                icon={props.isSuperListExpanded
                                    ? <span className="sk-userlist-lucide-btn-icon"><ListChevronsDownUp size={16} strokeWidth={2.1} /></span>
                                    : <span className="sk-userlist-lucide-btn-icon"><ListChevronsUpDown size={16} strokeWidth={2.1} /></span>}
                                onClick={props.onToggleSuperListExpanded}
                                title={props.isSuperListExpanded ? 'Свернуть список' : 'Раскрыть весь список'}
                            >
                                <span className={'sk-userlist-btn-label'}>
                                    {props.isSuperListExpanded ? 'Свернуть' : 'Раскрыть весь список'}
                                </span>
                            </Button>
                        </>
                    ) : (
                        <Button color={'default'}
                                variant={props.isOpenFilters ? 'solid' : 'outlined'}
                                icon={<FilterOutlined />}
                                className={'sk-userlist-compact-btn'}
                                title={'Фильтры'}
                                onClick={() => props.setIsOpenFilters(!props.isOpenFilters)}
                        ><span className={'sk-userlist-btn-label'}>Фильтры</span></Button>
                    )}
                    {!isSuperUser && props.imExist && (
                        <Button
                            color={'default'}
                            variant={'outlined'}
                            icon={<UserOutlined />}
                            className={'sk-userlist-compact-btn sk-userlist-icon-only-btn'}
                            title={'Найти себя в списке'}
                            aria-label={'Найти себя в списке'}
                            onClick={handleFindMyself}
                        />
                    )}
                </div>
                <div className="sk-flex sk-userlist-toolbar-top-center">
                    <CaretLeftOutlined
                        title="На предыдущий день"
                        onClick={decreaseDate}
                        className={'sk-usermonic-filter-bacon'}
                    />
                    <div>
                        <DatePicker
                            value={usedDate}
                            onChange={handleUsedDateChange}
                            format={"DD.MM.YYYY"}
                            variant="borderless"
                            size="large"
                            style={{width: '130px'}}
                            title={getWeekDayString(usedDate.day())}
                            allowClear={false}
                            placement="bottomLeft"
                        />
                        <span
                            className="sk-userlist-toolbar-status"
                            role="button"
                            tabIndex={0}
                            onClick={handleRefresh}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    handleRefresh();
                                }
                            }}
                            title={
                                props.isLoadError
                                    ? 'Ошибка подгрузки данных. Нажмите, чтобы обновить данные'
                                    : props.isLoading
                                        ? 'Данные подгружаются. Нажмите, чтобы обновить данные'
                                        : 'Данные актуальны. Нажмите, чтобы обновить данные'
                            }
                        >
                            <span
                                className={`sk-userlist-toolbar-status-dot ${
                                    props.isLoadError
                                        ? 'sk-userlist-toolbar-status-dot--error'
                                        : props.isLoading
                                            ? 'sk-userlist-toolbar-status-dot--loading'
                                            : 'sk-userlist-toolbar-status-dot--ready'
                                }`}
                            />
                        </span>
                    </div>
                    <CaretRightOutlined
                        onClick={increaseDate}
                        className={'sk-usermonic-filter-bacon'}
                        title="На следующий день"
                    />
                </div>
                <div className={'sk-flex-space sk-userlist-toolbar-top-right'}>
                    <Button
                        color={'default'}
                        variant={'outlined'}
                        icon={props.isDetailsSidebarVisible
                            ? <span className="sk-userlist-lucide-btn-icon"><PanelRightClose size={16} strokeWidth={2.1} /></span>
                            : <span className="sk-userlist-lucide-btn-icon"><PanelRightOpen size={16} strokeWidth={2.1} /></span>}
                        className={'sk-userlist-compact-btn sk-userlist-icon-only-btn'}
                        title={props.isDetailsSidebarVisible ? 'Скрыть карточки справа' : 'Показать карточки справа'}
                        aria-label={props.isDetailsSidebarVisible ? 'Скрыть карточки справа' : 'Показать карточки справа'}
                        aria-pressed={!props.isDetailsSidebarVisible}
                        onClick={props.onToggleDetailsSidebar}
                    />
                    {isSuperUser ? (
                        <>
                            <Dropdown menu={{ items: userMenuItems }} trigger={['hover']}>
                                <div
                                    className="sk-userlist-toolbar-user"
                                    title="Пользователь"
                                    role="button"
                                    tabIndex={0}
                                >
                                    <Avatar
                                        size={22}
                                        style={{ backgroundColor: 'var(--app-soft-surface-color)', color: 'var(--app-text-color)' }}
                                        icon={<UserOutlined />}
                                    />
                                    <span>
                                        {props.userData?.user
                                            ? `${props.userData.user.surname} ${props.userData.user.name}`
                                            : 'Пользователь'}
                                    </span>
                                </div>
                            </Dropdown>
                        </>
                    ) : (
                        <Dropdown menu={{items: props.menuProps.items, onClick: handleEditorOpen}} trigger={['hover']}>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                className={'sk-userlist-compact-btn'}
                                title={'Создать заявку'}
                            >
                                <span className={'sk-userlist-btn-label'}>Создать заявку</span>
                            </Button>
                        </Dropdown>
                    )}
                </div>
            </div>
            {/*
            <div className={'sk-userlist-toolbar-currentdate sk-userlist-toolbar-currentdate--employees'}>
                <div className={'sk-userlist-toolbar-xtext'}>
                    <span>{usedDate.date()} {months[usedDate.month()]}, {getWeekDayString(usedDate.day())}</span>
                </div>
            </div>
            */}
        </div>
    );
}

export default UserListToolbar;

