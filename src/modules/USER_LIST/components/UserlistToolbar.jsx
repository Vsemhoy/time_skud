import {Button, Collapse, DatePicker, Drawer, Select} from "antd";
import React, { useState, useEffect, use, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import dayjs from "dayjs";

import '../../../assets/timeskud.css'
import {
    CaretLeftOutlined, CaretRightOutlined, DiffOutlined,
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




    const getDateFromSearch = (search) => {
        const params = new URLSearchParams(search);
        const targetDateValue = params.get('date');
        const routeDate = targetDateValue ? dayjs.unix(Number(targetDateValue)) : null;

        return routeDate && routeDate.isValid() ? routeDate : dayjs();
    };

    const [usedDate, setUsedDate] = useState(() => getDateFromSearch(location.search));

    useEffect(() => {
        const routeDate = getDateFromSearch(location.search);
        if (!routeDate.isSame(usedDate, 'second')){
            setUsedDate(routeDate);
        }
    }, [location.search]);



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

    const handleEditorButtonClick = (item) => {
        handleEditorOpen(item);
    }

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
                            title={
                                props.isLoadError
                                    ? 'Ошибка подгрузки данных'
                                    : props.isLoading
                                        ? 'Данные подгружаются'
                                        : 'Данные актуальны'
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
                    <Button color={'default'}
                            variant={'outlined'}
                            icon={<ScheduleOutlined />}
                            className={'sk-userlist-compact-btn'}
                            title={'Расчетный лист офис'}
                            onClick={openBillListModal}
                    ><span className={'sk-userlist-btn-label'}>Расчетный лист офис</span></Button>
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
                    <span>{usedDate.date()} {months[usedDate.month()]}, {getWeekDayString(usedDate.day())}</span>
                </div>
                <div className={'sk-userlist-toolbar-findme'}>
                    {imExist && (
                        <Button color={'default'}
                                variant={'outlined'}
                                icon={<SearchOutlined />}
                                className={'sk-userlist-compact-btn'}
                                title={'Найти себя в списке'}
                                size={'small'}
                                onClick={handleFindMyself}
                        ><span className={'sk-userlist-btn-label'}>Найти себя в списке</span></Button>
                    )}
                </div>
                <div className={'sk-userlist-toolbar-actions'}>
                    {props.menuProps.items.map((item) => (
                        <Button
                            key={item.key}
                            color={'default'}
                            variant={'outlined'}
                            icon={<span className={'sk-userlist-claim-btn-icon'} style={{marginTop: '3px'}}>{item.icon || <DiffOutlined />}</span>}
                            className={'sk-userlist-compact-btn sk-userlist-claim-btn'}
                            title={item.badge}
                            size={'small'}
                            onClick={() => handleEditorButtonClick(item)}
                        >
                            <span className={'sk-userlist-btn-label'}>{item.badge}</span>
                        </Button>
                    ))}

                    <Button color={'default'}
                            variant={'outlined'}
                            icon={<ScheduleOutlined />}
                            className={'sk-userlist-compact-btn'}
                            style={{ width: '150px' }}
                            title={'Список заявок'}
                            size={'small'}
                            onClick={openClaimsModal}
                    ><span className={'sk-userlist-btn-label'}>Список заявок</span></Button>

                </div>
            </div>
        </div>
    );
}

export default UserListToolbar;
