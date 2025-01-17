import { Button, DatePicker, Select } from "antd";
import React, { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import dayjs from "dayjs";

import '../../style/timeskud.css'
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { DS_DEPARTMENTS, DS_USER } from "../../../../CONFIG/DEFAULTSTATE";
import { CSRF_TOKEN } from "../../../../CONFIG/config";


const UserListToolbar = (props) => {
    const {onChange, onDateChange, userData} = props;
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
    const [baseUserListData, setBaseUserListData] = useState(props.baseUsers);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially
    const [usedSort, setUsedSort] = useState(0);
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

    console.log(userData);
    const [departments, setDepartments]  = useState([
        { key: 'dep_25345', value: 0, label: 'Все отделы' },
        { key: 'dep_634567', value: userData.user.id_departament, label: 'Мой отдел'},
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
        if (typeof onDateChange === 'function')
        {
            onDateChange(usedDate);
        }
    }, [usedDate])


    useEffect(() => {
        if (typeof onChange === 'function')
        {
            let userList = JSON.parse(JSON.stringify(baseUserListData));
            userList = filterUserListByCompany(userList, usedCompany);
            userList = filterUserListByDepartment(userList, usedDepartment);
            userList = sortUserList(userList, usedSort);

            onChange(userList);
        }

    }, [usedCompany, usedDepartment, usedSort])


    useEffect(() => {
        if (CSRF_TOKEN){
            setCompanies({ key: 0, value: 0, label: 'Все компании' },
                ...userData.companies.map((com) => ({
                    key: com.id,
                    value: Number(com.id),
                    label: com.name,
                }))
            )}})



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
        setUsedSort(value);
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




    // _----------------------------------------
       const sortUserList = (userList, sortByValue) => {
        console.log('sortBy' + ' => ' + sortByValue);
        // await setUserListData(DS_DEFAULT_USERS.sort((a, b) => b.department - a.department));
        // Копируем текущие данные для сортировки
        let sortedData = userList;
        setUsedSort(sortByValue);
        switch (sortByValue) {
            case "department_asc":
                sortedData.sort((a, b) => a.department - b.department);
                sortedData = insertDepartmentNames(sortedData);
                break;
    
            case "department_desc":
                sortedData.sort((a, b) => b.department - a.department);
                break;
    
            case "name_asc":
                sortedData.sort((a, b) => a.name.localeCompare(b.name));
                break;
    
            case "name_desc":
                sortedData.sort((a, b) => b.name.localeCompare(a.name));
                break;
    
            case "surname_asc":
                sortedData.sort((a, b) => a.surname.localeCompare(b.surname));
                break;
    
            case "surname_desc":
                sortedData.sort((a, b) => b.surname.localeCompare(a.surname));
                break;
    
            case "state_asc":
                sortedData.sort((a, b) => a.state - b.state);
                break;
    
            case "state_desc":
              sortedData.sort((a, b) => b.state - a.state);
              console.log( sortedData);
              break;
    
            default:
                // Сортировка по умолчанию (например, по department ASC)
                sortedData.sort((a, b) => a.department - b.department);
                sortedData = insertDepartmentNames(sortedData);
                break;
        }
        return sortedData;
    }

    const filterUserListByCompany = (userList, id_company)=>{
        if (id_company == 0 || id_company == null){
            return userList;
        };
        return userList.filter(item => item.id_company === Number( id_company));
    }

    const filterUserListByDepartment = (userList, depart_id) =>
    {
        if (depart_id == null || depart_id == 0){
            return userList;
        };
        return userList.filter(item => item.department === Number(depart_id));
    }

    const insertDepartmentNames = (dataArray) => {
        let newDataArray = [];
        let next = -1; // next department ID
    
        for (let i = 0; i < dataArray.length; i++){
          let dep_id = dataArray[i].department;
          
          if (dep_id != next){
            // insert custom row
            let crow = customRow(dep_id);
            console.log('crow', crow);
            newDataArray.push(crow);
          }
          if (i < dataArray.length - 1){
            next = dep_id;
          }; 
            newDataArray.push(dataArray[i]);
          }
        
        console.log('dataArray' + ' => ' + newDataArray);
        return newDataArray;
      }

    const getDepartmentNameById = (id) => {
      const department = DS_DEPARTMENTS.find(dept => dept.id === id);
      return department ? department.name : null; // Возвращаем имя или null, если не найдено
  };

  // Добавляем кастомную строку в зависимости от значения sortBy
  const customRow = (dep_id) => {
    return {
      key: `custom_row_dep_${dep_id}`, // Уникальный ключ для строки
      name: getDepartmentNameById(dep_id) ? getDepartmentNameById(dep_id) : '<департамент удалён>',
      surname: null,
      patronymic: null,
      enter: '', // Пустые значения для других полей
      exit: '',
      losttime: '',
      type: 'header'
      };
  };


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
                minWidth={130}
                placeholder={'Упорядочить по'}
                options={sortByValues}
                value={usedSort == 0 ? null : usedSort}
                allowClear={true}
                onChange={handleSortByChange}
            />
            </div>



            
        </div>
    );
}

export default UserListToolbar;
