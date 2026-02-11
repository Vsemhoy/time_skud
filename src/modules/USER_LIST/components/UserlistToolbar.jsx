import {Button, Collapse, DatePicker, Drawer, Dropdown, Select} from "antd";
import React, { useState, useEffect, use, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import dayjs from "dayjs";

import '../../../assets/timeskud.css'
import {
    CaretLeftOutlined, CaretRightOutlined, CarryOutOutlined, DiffOutlined,
    FilterOutlined, ScheduleOutlined, SearchOutlined, UnorderedListOutlined
} from "@ant-design/icons";
import { getMonthName, getWeekDayString } from "../../../components/Helpers/TextHelpers";
import { StateContext } from "../../../components/ComStateProvider25/ComStateProvider25";



const UserListToolbar = (props) => {
    const { state, setState } = useContext(StateContext);
    const {onChange, userData} = props;
    const location = useLocation();
    const navigate = useNavigate();

    const [imExist, setImExist] = useState(false);



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
        setDateInContext(usedDate);
    }

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
        const params = new URLSearchParams(window.location.search);
        params.set('date', value.unix());
        navigate(`?${params.toString()}`);

        setState(prevState => ({
        ...prevState, // Сохраняем все текущие значения
        date: value, // Обновляем только `date`
        }));
    }

    



    const handleFindMyself = ()=>{
        if (props.on_find_me){
            props.on_find_me();
        }
    }

    const handleEditorOpen = (value) => {
        if (value && value.key){
            let key = parseInt(value.key.replace('clt_', ''));
            props.handleEditorOpenCreate(key);
        }
    }

    const openScheduleKPPModal = () => {
        props.openScheduleKPPModal();
    };

    const openBillListKPPModal = () => {
        props.openBillListKPPModal();
    };

    const openScheduleBuildersModal = () => {
        props.openScheduleBuildersModal();
    };

    const openBillListBuildersModal = () => {
        props.openBillListBuildersModal();
    };

    const openBillListModal = () => {
        props.openBillListModal();
    };

    const openClaimsModal = () => {
        props.openClaimsModal();
    };

    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря']


    return (
        <div style={{width: '100%'}}>
            <div className={'sk-header-container sk-userlist-toolbar-top'}>
                <div className={'sk-flex-space sk-userlist-toolbar-top-left'}>
                    <Button color={'default'}
                            variant={props.isOpenFilters ? 'solid' : 'outlined'}
                            icon={<FilterOutlined />}
                            className={'sk-userlist-compact-btn'}
                            style={{ width: '150px' }}
                            title={'Фильтры'}
                            onClick={() => props.setIsOpenFilters(!props.isOpenFilters)}
                    ><span className={'sk-userlist-btn-label'}>Фильтры</span></Button>
                </div>
                <div className="sk-flex sk-userlist-toolbar-top-center">
                    <CaretLeftOutlined
                        title="На предыдущий день"
                        onClick={decreaseDate}
                        className={'sk-usermonic-filter-bacon'}
                    />
                    <DatePicker
                        value={usedDate}
                        onChange={handleUsedDateChange}
                        format={"DD.MM.YYYY"}
                        variant="borderless"
                        size="large"
                        title={getWeekDayString(usedDate.day())}
                        allowClear={false}
                    />
                    <CaretRightOutlined
                        onClick={increaseDate}
                        className={'sk-usermonic-filter-bacon'}
                        title="На следующий день"
                    />
                </div>
                <div className={'sk-flex-space sk-userlist-toolbar-top-right'}>
                    {props.menuProps.items.length > 0 ? (
                        <Dropdown
                            menu={props.menuProps}
                            onClick={handleEditorOpen}
                            style={{ width: '150px' }}
                        >
                            <Button
                                icon={<DiffOutlined/>}
                                type={'primary'}
                                className={'sk-userlist-compact-btn'}
                                title={'Создать заявку'}
                            >
                                <span className={'sk-userlist-btn-label'}>Создать заявку</span>
                            </Button>
                        </Dropdown>
                    ) : (
                        <div style={{ width: '140px' }}></div>
                    )}
                </div>
            </div>
            <div className={'sk-userlist-toolbar-currentdate sk-userlist-toolbar-currentdate--employees'}>
                <div className={'sk-userlist-toolbar-xtext'}
                     onDoubleClick={() => {
                         setUsedDate(dayjs())
                     }}
                     title="Выбранный день. Двойной клик скинет вас на сегодняшнюю дату."
                >
                    {/*{getMonthName(usedDate.month() + 1)}, {getWeekDayString(usedDate.day())}*/}
                    {usedDate.date()} {months[usedDate.month()]}, {getWeekDayString(usedDate.day())}
                </div>
                <div className={'sk-userlist-toolbar-findme'}>
                    {imExist && (
                        <Button color={'default'}
                                variant={'outlined'}
                                icon={<SearchOutlined />}
                                className={'sk-userlist-compact-btn'}
                                title={'Найти себя в списке'}
                                onClick={handleFindMyself}
                        ><span className={'sk-userlist-btn-label'}>Найти себя в списке</span></Button>
                    )}
                </div>
                <div className={'sk-userlist-toolbar-actions'}>
                    {props.userData && props.userData.acls && props.userData.acls.find(acl => acl === 95) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<CarryOutOutlined/>}
                                 className={'sk-userlist-compact-btn'}
                                 onClick={openScheduleKPPModal}
                                 title={'График КПП'}
                        ><span className={'sk-userlist-btn-label'}>КПП</span></Button>
                    )}

                    {props.userData && props.userData.acls && props.userData.acls.find(acl => acl === 95) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<ScheduleOutlined/>}
                                 className={'sk-userlist-compact-btn'}
                                 onClick={openBillListKPPModal}
                                 title={'Расчетный лист КПП'}
                        ><span className={'sk-userlist-btn-label'}>КПП</span></Button>
                    )}

                    {props.userData && props.userData.acls && props.userData.acls.find(acl => acl === 96) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<CarryOutOutlined/>}
                                 className={'sk-userlist-compact-btn'}
                                 onClick={openScheduleBuildersModal}
                                 title={'График строителей'}
                        ><span className={'sk-userlist-btn-label'}>Строители</span></Button>
                    )}

                    {props.userData && props.userData.acls && props.userData.acls.find(acl => acl === 107) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<ScheduleOutlined/>}
                                 className={'sk-userlist-compact-btn'}
                                 onClick={openBillListBuildersModal}
                                 title={'Расчетный лист строителей'}
                        ><span className={'sk-userlist-btn-label'}>Строители</span></Button>
                    )}

                    <Button color={'default'}
                            variant={'outlined'}
                            icon={<ScheduleOutlined />}
                            className={'sk-userlist-compact-btn'}
                            title={'Расчетный лист офис'}
                            onClick={openBillListModal}
                    ><span className={'sk-userlist-btn-label'}>Расчетный лист офис</span></Button>

                    <Button color={'default'}
                            variant={'outlined'}
                            icon={<UnorderedListOutlined />}
                            className={'sk-userlist-compact-btn'}
                            style={{ width: '150px' }}
                            title={'Список заявок'}
                            onClick={openClaimsModal}
                    ><span className={'sk-userlist-btn-label'}>Список заявок</span></Button>
                </div>
            </div>
        </div>
    );
}

export default UserListToolbar;
