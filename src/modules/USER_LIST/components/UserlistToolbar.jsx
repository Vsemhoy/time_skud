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
            <div className={'sk-header-container'}>
                <div className={'sk-flex-space'}>
                    <Button color={'default'}
                            variant={props.isOpenFilters ? 'solid' : 'outlined'}
                            icon={<FilterOutlined />}
                            style={{ width: '150px' }}
                            onClick={() => props.setIsOpenFilters(!props.isOpenFilters)}
                    >Фильтры</Button>
                </div>
                <div className="sk-flex">
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
                <div className={'sk-flex-space'}>
                    {props.menuProps.items.length > 0 ? (
                        <Dropdown
                            menu={props.menuProps}
                            onClick={handleEditorOpen}
                            style={{ width: '150px' }}
                        >
                            <Button
                                icon={<DiffOutlined/>}
                                type={'primary'}
                            >
                                Создать заявку
                            </Button>
                        </Dropdown>
                    ) : (
                        <div style={{ width: '140px' }}></div>
                    )}
                </div>
            </div>
            <div className={'sk-userlist-toolbar-currentdate'}>
                <div className={'sk-userlist-toolbar-xtext'}
                     onDoubleClick={() => {
                         setUsedDate(dayjs())
                     }}
                     title="Выбранный день. Двойной клик скинет вас на сегодняшнюю дату."
                >
                    {/*{getMonthName(usedDate.month() + 1)}, {getWeekDayString(usedDate.day())}*/}
                    {usedDate.date()} {months[usedDate.month()]}, {getWeekDayString(usedDate.day())}
                </div>
                <div style={{display: 'flex'}}>
                    {imExist && (
                        <Button color={'default'}
                                variant={'outlined'}
                                icon={<SearchOutlined />}
                                onClick={handleFindMyself}
                        >Найти себя в списке</Button>
                    )}
                </div>
                <div style={{display: 'flex', gap: '10px'}}>
                    {props.userData.acls.find(acl => acl === 95) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<CarryOutOutlined/>}
                                 onClick={openScheduleKPPModal}
                        >График КПП</Button>
                    )}

                    {props.userData.acls.find(acl => acl === 95) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<ScheduleOutlined/>}
                                 onClick={openBillListKPPModal}
                        >Расчетный лист КПП</Button>
                    )}

                    {props.userData.acls.find(acl => acl === 96) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<CarryOutOutlined/>}
                                 onClick={openScheduleBuildersModal}
                        >График строителей</Button>
                    )}

                    {props.userData.acls.find(acl => acl === 107) && (
                        <Button  color={'default'}
                                 variant={'outlined'}
                                 icon={<ScheduleOutlined/>}
                                 onClick={openBillListBuildersModal}
                        >Расчетный лист строителей</Button>
                    )}

                    <Button color={'default'}
                            variant={'outlined'}
                            icon={<ScheduleOutlined />}
                            onClick={openBillListModal}
                    >Расчетный лист офис</Button>

                    <Button color={'default'}
                            variant={'outlined'}
                            icon={<UnorderedListOutlined />}
                            style={{ width: '150px' }}
                            onClick={openClaimsModal}
                    >Список заявок</Button>
                </div>
            </div>
        </div>
    );
}

export default UserListToolbar;
