import { Alert, Button, DatePicker, Input, Select } from "antd";
import React, { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { DS_USER } from "../../../CONFIG/DEFAULTSTATE";


import dayjs from "dayjs";



const RuleToolbar = (props) =>{
    const {userData, onAddNewClick, onChangeFilter, ruleTypes } = props;
    const location = useLocation();
    const navigate = useNavigate();
    // const [companies, setCompanies] = useState([]);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially
    const [usedType, setUsedType] = useState(0);
    const [usedText, setUsedtext] = useState('');

    const [typeName, setTypeName] = useState(null);
    const [typeDescr, setTypeDescr] = useState(null);
    const [typeColor, setTypeColor] = useState('');

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

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        if(userData?.companies){
            setCompanies([
                { key: 0, value: 0, label: 'Все компании' },
                ...userData.companies?.reverse().map((com) => ({
                    key: com.id,
                    value: Number(com.id),
                    label: com.name,
                })),
            ])
        };
    }, [userData.companies]);

    console.log(ruleTypes);
    const [rules, setRules] = useState([
        { key: 0, value: 0, label: 'Все правила' }
    ]);

    useEffect(()=>{
        setRules([
        { key: 0, value: 0, label: 'Все правила' },
        ...ruleTypes.map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    },[ruleTypes]);


    useEffect(()=>{
        const t = setTimeout(() => {
            let filters = [];

            if (usedType != null && usedType !== 0)
            {
                let fil1 = {type: 'filter', key: 'rule_type_id', value: usedType};
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


        const changeUsedType = (value) =>{
            setUsedType(value);
            if (value !== 0){
                for (let i = 0; i < ruleTypes.length; i++) {
                    const element = ruleTypes[i];
                    if (element.id == value){
                        setTypeName(element.name);
                        setTypeDescr(element.description);
                        setTypeColor(element.color);
                        break;
                    }
                }
            } else {
                setTypeName(null);
                setTypeDescr(null);
                setTypeColor('');
            }
        }
        

    return (
        <div>
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
            {rules && rules.length > 0 ? (
                <div>
                <Select
                        defaultValue={0}
                        style={{
                            width: 120,
                        }}
                        value={usedType}
                        onChange={changeUsedType}
                        options={rules}
                        />
                </div>

            ) : ""}
            <div>
                
            </div>
        </div>

        <div className={"sk-flex-gap"} style={{width:"100%", paddingRight: 15}}>
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
            onClick={clickNew}>
                Создать правило
        </Button>
            </div>
            </div>
            {typeName != null ? (
                <div className={`sk-rule-info `}
                    style={{border: `1px solid ${typeColor}`, background: `${typeColor.slice(0, -2)}22`}}>
                    <h3>{typeName}</h3>
                    <p >{typeDescr}</p>
                    </div>

            ):""}

        </div>
    );
}


export default RuleToolbar;