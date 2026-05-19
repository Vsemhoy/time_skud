import {Button, DatePicker, Dropdown} from "antd";
import React, { useState, useEffect, use, useContext } from "react";


import dayjs from "dayjs";

import '../../../assets/timeskud.css'
import {
    CaretLeftOutlined, CaretRightOutlined,
    FilterOutlined, PlusOutlined
} from "@ant-design/icons";
import { getWeekDayString } from "../../../components/Helpers/TextHelpers";
import { StateContext } from "../../../components/ComStateProvider25/ComStateProvider25";



const UserListToolbar = (props) => {
    const { state, setState } = useContext(StateContext);
    const {onChange, userData} = props;

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


    return (
        <div style={{width: '100%'}}>
            <div className={'sk-header-container sk-userlist-toolbar-top'}>
                <div className={'sk-flex-space sk-userlist-toolbar-top-left'}>
                    <Button color={'default'}
                            variant={props.isOpenFilters ? 'solid' : 'outlined'}
                            icon={<FilterOutlined />}
                            className={'sk-userlist-compact-btn'}
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

