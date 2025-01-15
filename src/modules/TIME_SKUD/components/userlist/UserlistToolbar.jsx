import { Button, DatePicker, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import dayjs from "dayjs";

import '../../style/timeskud.css'
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { DS_DEPARTMENTS, DS_USER } from "../../../../CONFIG/DEFAULTSTATE";


const UserListToolbar = (props) => {
    const { onSortBy } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([
        { key: 0, value: 0, label: 'Все компании' },
        ...DS_USER.companies.map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially
    const [sortByValues, setSortByValues] = useState([
        {
            key:'ssv001',
            value:'department_asc',
            label:"отдел"
        },
        {
            key:'ssv002',
            value:'name_asc',
            label:"Имя А-Я"
        },
        {
            key:'ssv003',
            value:'name_desc',
            label:"Имя Я-A"
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
    ])


    const [departments, setDepartments]  = useState([
        { key: 0, value: 0, label: 'Все' },
        ...DS_DEPARTMENTS.map((dep)=>
            ({
            key: `departament_${dep.id}`,
            value: dep.id,
            label: dep.name
        })
    )
    ]);
    const [usedDepartment, setUsedDepartment] = useState(0);

    const today = () => {
        const currentTimestamp = Date.now(); // e.g., 1736425982143
        const currentDate = new Date(currentTimestamp);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate.getTime();
    };


    const [usedDate, setUsedDate] = useState(dayjs());

    /**
     * Ловим в адресной строке переданные параметры:
     * Компания, департамент, дата
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const targetCompanyValue = params.get('tgc'); 
        const targetDepartmentValue = params.get('dep');
        const targetDateValue = params.get('date');

        if (targetCompanyValue) {
            setUsedCompany(Number(targetCompanyValue));
        };
        if (targetDepartmentValue){
            setUsedDepartment(Number(targetDepartmentValue));
        }
        if (targetDateValue){
            setUsedDate(dayjs(Number(targetDateValue)));
        }
    }, [location.search]); // Dependency array ensures this runs when location.search changes

    useEffect(() => {
        changeAddressBarParam('date',usedDate.valueOf(),[0]);
    }, [usedDate])


    const handleUsedCompanyChange = (value) => {
        setUsedCompany(value);
        changeAddressBarParam('tgc',value,[0]);
    };
    const handleUsedDepartmentChange = (value) => {
        setUsedDepartment(value);
        changeAddressBarParam('dep',value,[0]);
    };
    const handleUsedDateChange = (value) => {
        if (value == null){
            value = dayjs();
        }
        setUsedDate(value);
        changeAddressBarParam('date',value.valueOf(),[0]);
    }
    const increaseDate = () => {
        setUsedDate(usedDate.add(1, 'day'));
        
    }
    const decreaseDate = () => {
        setUsedDate(usedDate.add(-1, 'day'));
        
    }

    const handleSortByChange = (value) => {
        // console.log('value' + ' => ' + value);
        if (typeof onSortBy == 'function'){
            onSortBy(value);
        }
    }




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





    return (
        <div style={{display: 'flex'}} className={"sk-flex-gap"}>
            <div className={"sk-m"}>
                {companies.length > 2 ? (
                    <Select
                        options={companies}
                        value={usedCompany} // Use value instead of defaultValue for controlled component
                        style={{ minWidth: 140 }}
                        onChange={handleUsedCompanyChange}
                    />
                ) : ''}

            <Select
                options={departments}
                value={usedDepartment} // Use value instead of defaultValue for controlled component
                style={{ minWidth: 140 }}
                onChange={handleUsedDepartmentChange}
            />
            </div>
            <div>
            <Button 
                onClick={decreaseDate}
            ><StepBackwardOutlined /></Button>
            <DatePicker 
                // defaultValue={usedDate}
                value={usedDate}
                onChange={handleUsedDateChange}
                />
            <Button 
                onClick={increaseDate}
            ><StepForwardOutlined /></Button>
            </div>
            <div>
            <Select
                placeholder={'Упорядочить по'}
                options={sortByValues}
                allowClear={true}
                onChange={handleSortByChange}
            />
            </div>



            
        </div>
    );
}

export default UserListToolbar;
