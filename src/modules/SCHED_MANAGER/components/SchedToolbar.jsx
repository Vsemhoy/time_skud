import { Button, DatePicker, Input, Select } from "antd";
import React, { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { DS_SCHED_TYPES, DS_USER } from "../../../CONFIG/DEFAULTSTATE";


import dayjs from "dayjs";



const SchedToolbar = (props) =>{
    const {userData, companies, onAddNewClick, onChangeFilter, schedTypes } = props;
    const location = useLocation();
    const navigate = useNavigate();
    // const [companies, setCompanies] = useState([]);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially
    const [usedType, setUsedType] = useState(null);

    const [filterText, setFiltertext] = useState(null);
    const [filterDateInterval, setFilterDateInterval] = useState([dayjs().startOf('year'), dayjs().endOf('year')]);



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
            if (filterText != null && filterText.trim() !== "" && filterText.trim().length > 1)
            {
                let fil1 = {type: 'text_filter', key: 'name', value: filterText};
                filters.push(fil1);
            }
            if (onChangeFilter){
                onChangeFilter(filters);
            }
        }, 100);
        return () => clearTimeout(t);
        
    }, [usedType, usedCompany, filterText]);


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


            <Input
                placeholder={'Поиск по названию или имени пользователя/группы в графике'}
                allowClear={true}
                value={filterText}
                onChange={(event)=> {setFiltertext(event.target.value)}}
                style={{width: '100%'}}
            />
            </div>
        </div>


        <div className={"sk-flex-gap"} >
            <DatePicker.RangePicker 
                    value={filterDateInterval}
                    onChange={(value)=>{setFilterDateInterval(value)}}
                />

        </div>


        <div className={"sk-flex-gap"}>
        <Button 
            onClick={clickNew}
        >Создать график</Button>
            </div>

        </div>
    );
}

export default SchedToolbar;