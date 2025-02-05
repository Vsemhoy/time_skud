import { Button, DatePicker, Input, Select } from "antd";
import React, { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { DS_SCHED_TYPES, DS_USER } from "../../../CONFIG/DEFAULTSTATE";


import dayjs from "dayjs";



const GroupPageToolbar = (props) =>{
    const {userData, companies, onAddNewClick, onChangeFilter, schedTypes } = props;
    const location = useLocation();
    const navigate = useNavigate();
    // const [companies, setCompanies] = useState([]);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially
    const [usedType, setUsedType] = useState(null);
    const [usedText, setUsedtext] = useState('');

    const [usedSort, setUsedSort] = useState(0);
    const [sortByValues, setSortByValues] = useState([
        {
            key:'ssv000',
            value:0,
            label:"Сортировка по"
        },
        {
            key:'ssv001',
            value:'department_asc',
            label:"отдел"
        },
        {
            key:'ssv002',
            value:'name_asc',
            label:"Название А-Я"
        },
        {
            key:'ssv003',
            value:'name_desc',
            label:"Название Я-A"
        },
        {
            key:'ssv0021',
            value:'surname_asc',
            label:"Фамилия А-Я"
        },
        {
            key:'ssv0031',
            value:'surname_desc',
            label:"Фамилия Я-A"
        },
        {
            key:'ssv004',
            value:'time_comein_asc',
            label:"Время входа"
        },
        {
            key:'ssv051',
            value:'time_cameout_asc',
            label:"Время выхода"
        },
        {
            key:'ssv0060',
            value:'state_desc',
            label:"Статус"
        },
        {
            key:'ssv0061',
            value:'lost_time_asc',
            label:"Потерянное время"
        },
    ]);



    useEffect(()=>{
        const t = setTimeout(() => {
            let filters = [];

            if (usedType != null && usedType !== 0)
            {
                let fil1 = {type: 'filter', key: 'skud_schedule_type_id', value: usedType};
                filters.push(fil1);
            };
            if (usedCompany != null && usedCompany !== 0)
            {
                let fil1 = {type: 'filter', key: 'id_company', value: usedCompany};
                filters.push(fil1);
            }
            if (usedText != null && usedText.trim() !== "" && usedText.trim().length > 1)
            {
                let fil1 = {type: 'text_filter', key: 'name', value: usedText};
                filters.push(fil1);
            }
            if (onChangeFilter){
                onChangeFilter(filters);
            }
        }, 100);
        return () => clearTimeout(t);
        
    }, [usedType, usedCompany, usedText]);


    const changeAddressBarParam = (key, value, deleteOn = [null]) =>
        {
            const params = new URLSearchParams(window.location.search);
            if (deleteOn.includes(value)){
                params.delete(key);
            } else {
                params.set(key, value);
            };
            navigate(`?${params.toString()}`);
        }

        const clickNew = ()=>{
            if (onAddNewClick)
            {
                onAddNewClick(null);
            }
        }

        const handleUsedTypeChange = (value)=>{
            console.log(value);
            setUsedType(value);
        }
        const handleUsedCompanyChange = (value) => {
            setUsedCompany(value);
            console.log(value);
            // changeAddressBarParam('tgc',value,[0]);
        };


    

    return (
        <div className={"ts-toolbar"}>
        <div className={"sk-flex-gap"}>
            <div className={"sk-m"}>
                {companies.length > 1 ? (
                    <Select 
                        options={companies}
                        value={usedCompany} // Use value instead of defaultValue for controlled component
                        style={{ minWidth: 140 }}
                        onChange={(value)=>{setUsedCompany(value)}}
                    />
                ) : ''}
            </div>
            {schedTypes && schedTypes.length > 0 ? (
                <div>
                <Select
                        defaultValue="lucy"
                        style={{
                            width: 120,
                        }}
                        value={usedType}
                        onChange={(value)=>{setUsedType(value)}}
                        options={[
                            {
                                key: 'schedtype0',
                                value: null,
                                label: 'Все графики',
                            },
                            ...schedTypes
                        ]
                            }
                        />
                </div>

            ) : ""}
            <div>
                
            </div>
        </div>

        <div className={"sk-flex-gap"}>
            <Input 
                placeholder="Поиск по названию или пользователю"
                allowClear={true}
                value={usedText}
                onChange={(event)=>{setUsedtext(event.target.value)}}
                />
                {/* <Select 
                options={sortByValues}
                    width={"150px"}
                    value={usedSort}
                /> */}
            
            </div>

        <div className={"sk-flex-gap"}>
        <Button 
            onClick={clickNew}
        >Добавить новый</Button>
            </div>

        </div>
    );
}

export default GroupPageToolbar;