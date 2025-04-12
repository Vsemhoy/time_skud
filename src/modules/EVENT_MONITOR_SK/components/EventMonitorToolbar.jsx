import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { selectWord } from "@uiw/react-md-editor";
import { Button, DatePicker, Pagination, Select } from "antd";
import Search from "antd/es/transfer/search";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

const EventMonitorToolbar = (props)=>
{
    const [selectedController, setSelectedController] = useState(null);
    const [selectedDateUnit, setSelectedDateUnit] = useState('day');

    const [targetStartDate, setTargetStartDate] = useState(dayjs().startOf('day'));
    const [targetEndDate, setTargetEndDate] = useState(dayjs().endOf('day'));

    const [targetString, setTargetString] = useState("");

    const [selectedSource, setSelectedSource] = useState(null);

    const [paginatorTotal, setPaginatorTotal] = useState(0);
    const [paginatorPage, setPaginatorPage] = useState(1);
    const [paginatorOnPage, setPaginatorOnPage] = useState(100);

    const controllers = [
        {
            key: "contr_0",
            value: null,
            label: "Все контроллеры"
        }
    ];

    useEffect(()=>{
        setPaginatorTotal(props.pagination_total);
    },[props.pagination_total]);
    

    const dateunits = [
        {
            key: "dunny_0",
            value: 'day',
            label: "День"
        },
        {
            key: "dunny_1",
            value: 'week',
            label: "Неделя"
        },
        {
            key: "dunny_2",
            value: 'month',
            label: "Месяц"
        },
        {
            key: "dunny_3",
            value: 'quart',
            label: "Квартал"
        },
        {
            key: "dunny_4",
            value: 'year',
            label: "Год"
        },
    ];

    const sources = [
        {
            key: "surce_0",
            value: null,
            label: "Все"
        },
        {
            key: "surce_1",
            value: 'main',
            label: "От контроллеров"
        },
        {
            key: "surce_2",
            value: 'extra',
            label: "Созданные вручную"
        },
    ]



    const onChange = (date, dateString) => {
        // console.log(date, dateString);
        handleChangeDateRange(date);
    };

    const handleChangeDateRange = (date) => {
        setPaginatorPage(1);
        if (selectedDateUnit === 'day'){
            setTargetStartDate(date.startOf('day'));
            setTargetEndDate(date.endOf('day'));

        } else if (selectedDateUnit === 'week'){
            setTargetStartDate(date.startOf('week').startOf('day'));
            setTargetEndDate(date.endOf('week').endOf('day'));

        } else if (selectedDateUnit === 'month')
        {
            setTargetStartDate(date.startOf('month').startOf('day'));
            setTargetEndDate(date.endOf('month').endOf('day'));

        } else if (selectedDateUnit === 'quart')
        {
            setTargetStartDate(date.startOf('month').startOf('day'));
            setTargetEndDate(date.endOf('month').add(2,'month').endOf('month').endOf('day'));

        } else {
            setTargetStartDate(date.startOf('year').startOf('day'));
            setTargetEndDate(date.endOf('year').endOf('day'));
        }
        
    }

    
    useEffect(()=>{ 

            let q_params = {
                start: targetStartDate.format('YYYY-MM-DD HH:mm:ss'),
                end: targetEndDate.format('YYYY-MM-DD HH:mm:ss'),
                unit: selectedDateUnit,
                page: paginatorPage,
                on_page: paginatorOnPage
            };
            if (selectedSource !== null){
                q_params.source = selectedSource;
            };
            if (selectedController !== null){
                q_params.controller = selectedController;
            };
            if (targetString !== null && targetString.trim() !== ""){
                q_params.string = targetString;
            };
            if (props.on_chang_query_params){
                props.on_chang_query_params(q_params);
            }

    },[targetEndDate, targetStartDate, selectedSource, selectedDateUnit, selectedController, paginatorPage, paginatorOnPage]);

    useEffect(()=>{
        handleChangeDateRange(targetStartDate);
    },[selectedDateUnit]);


    const handleMoveDate = (direction) => {
        console.log(direction);
        setPaginatorPage(1);
        if (direction === 0){
            // to the past
            if (selectedDateUnit === 'day'){
                setTargetStartDate(targetStartDate.subtract(1, 'day').startOf('day'));
                setTargetEndDate(targetStartDate.subtract(1, 'day').endOf('day'));
    
            } else if (selectedDateUnit === 'week'){
                setTargetStartDate(targetStartDate.subtract(1, 'week').startOf('week').startOf('day'));
                setTargetEndDate(targetStartDate.subtract(1, 'week').endOf('week').endOf('day'));
    
            } else if (selectedDateUnit === 'month')
            {
                setTargetStartDate(targetStartDate.subtract(1, 'month').startOf('month').startOf('day'));
                setTargetEndDate(targetStartDate.subtract(1, 'month').endOf('month').endOf('day'));
    
            } else if (selectedDateUnit === 'quart')
            {
                setTargetStartDate(targetStartDate.subtract(3, 'month').startOf('month').startOf('day'));
                setTargetEndDate(targetStartDate.subtract(3, 'month').endOf('month').add(2,'month').endOf('month').endOf('day'));
    
            } else {
                setTargetStartDate(targetStartDate.subtract(1, 'year').startOf('year').startOf('day'));
                setTargetEndDate(targetStartDate.subtract(1, 'year').endOf('year').endOf('day'));
            }
        } else {
            if (selectedDateUnit === 'day'){
                setTargetStartDate(targetStartDate.add(1, 'day').startOf('day'));
                setTargetEndDate(targetStartDate.add(1, 'day').endOf('day'));
    
            } else if (selectedDateUnit === 'week'){
                setTargetStartDate(targetStartDate.add(1, 'week').startOf('week').startOf('day'));
                setTargetEndDate(targetStartDate.add(1, 'week').endOf('week').endOf('day'));
    
            } else if (selectedDateUnit === 'month')
            {
                setTargetStartDate(targetStartDate.add(1, 'month').startOf('month').startOf('day'));
                setTargetEndDate(targetStartDate.add(1, 'month').endOf('month').endOf('day'));
    
            } else if (selectedDateUnit === 'quart')
            {
                setTargetStartDate(targetStartDate.add(3, 'month').startOf('month').startOf('day'));
                setTargetEndDate(targetStartDate.add(3, 'month').endOf('month').add(2,'month').endOf('month').endOf('day'));
    
            } else {
                setTargetStartDate(targetStartDate.add(1, 'year').startOf('year').startOf('day'));
                setTargetEndDate(targetStartDate.add(1, 'year').endOf('year').endOf('day'));
            }
        }
    }


    const handlePaginationChange = (val, page) => {
        console.log(val);
        console.log(page);
        setPaginatorOnPage(page);
        setPaginatorPage(val);
    }





    return (
        <div className={'sk-event-monitor-toolbar'}>
            <div className={'sk-flex'}>
                <Select
                    style={{width: '160px'}}
                    placeholder={'Контроллер'}
                    value={selectedController}
                    options={controllers}
                    onChange={(va)=>{setSelectedController(va)}}
                    />
                <Search
                    placeholder="Поиск по имени, фамилии или должности"
                    value={targetString}
                    onChange={(ev)=>{setTargetString(ev.target.value)}}
                />
                <Select
                    style={{width: '220px'}}
                    placeholder={'Где событие создано'}
                    value={selectedSource}
                    options={sources}
                    onChange={(va)=>{setSelectedSource(va)}}
                    />
            </div>
            <br />
            <div className={'sk-flex'}>
                <Button
                    onClick={()=>{handleMoveDate(0)}}
                title="Смещение на диапазон в прошлое"
                ><LeftOutlined /></Button>
                <Select
                    style={{width: '160px'}}
                    placeholder={'Диапазон времени'}
                    value={selectedDateUnit}
                    options={dateunits}
                    onChange={(va)=>{setSelectedDateUnit(va)}}
                    />

                {selectedDateUnit === 'day' && (
                    <DatePicker onChange={onChange}
                        format={"DD-MM-YYYY"}
                        value={targetStartDate}
                    />
                )}
                    {selectedDateUnit === 'week' && (
                    <DatePicker
                    value={targetStartDate}
                    onChange={onChange} picker="week" />
                )}
                    {selectedDateUnit === 'month' && (
                    <DatePicker
                    value={targetStartDate}
                    onChange={onChange} picker="month" />
                )}
                {selectedDateUnit === 'quart' && (
                    <DatePicker
                    value={targetStartDate}
                    onChange={onChange} picker="quarter" />
                )}
                {selectedDateUnit === 'year' && (
                    <DatePicker
                    value={targetStartDate}
                    onChange={onChange} picker="year" />
                )}
                <Button
                onClick={()=>{handleMoveDate(1)}}
                title="Смещение на диапазон в будущее"
                ><RightOutlined /></Button>
            </div>

            <div className={'sk-flex'} style={{justifyContent:'center', padding: '18px'}}>
            <Pagination
                showQuickJumper
                defaultCurrent={paginatorPage} total={paginatorTotal}
                onChange={handlePaginationChange} 
                pageSize={paginatorOnPage}
                pageSizeOptions={[
                    100, 200, 500, 1000, 10000
                ]}

            />

            </div>
        </div>
    )
}

export default EventMonitorToolbar;