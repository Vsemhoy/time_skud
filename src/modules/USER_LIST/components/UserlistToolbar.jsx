import { Button, Collapse, DatePicker, Drawer, Select } from "antd";
import React, { useState, useEffect, use, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';


import dayjs from "dayjs";

import '../../../components/TimeSkud/Style/timeskud.css'
import { BranchesOutlined, CrownOutlined, DoubleLeftOutlined, DoubleRightOutlined, RightOutlined, RightSquareOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { DS_DEPARTMENTS, DS_USER } from "../../../CONFIG/DEFAULTSTATE";
import { CSRF_TOKEN } from "../../../CONFIG/config";
import { getMonthName, getWeekDayString } from "../../../components/Helpers/TextHelpers";
import { StateContext } from "../../../components/ComStateProvider25/ComStateProvider25";


const UserListToolbar = (props) => {
    const { state, setState } = useContext(StateContext);
    const {onChange, userData} = props;
    const location = useLocation();
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([
        { key: 'nullCompany', value: 0, label: 'Все компании' },
        ...DS_USER.companies.filter(item => item.id !== 1).map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    const [baseUserListData, setBaseUserListData] = useState(props.baseUsers);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially
    const [usedSort, setUsedSort] = useState(0);
    const [imExist, setImExist] = useState(false);
    const [extFilters, setExtFilters] = useState([{date: dayjs()}]);



    const [openDrawer, setOpenDrawer] = useState(false);


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

    useEffect(()=>{
        setBaseUserListData(props.baseUsers);
    },[props.baseUsers]);

    const [departments, setDepartments]  = useState([
        { key: 'dep_25345', value: 0, label: 'Все отделы' },
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


    useEffect(()=>{
        console.log('im_exist.', props.im_exist)
        setImExist(props.im_exist);
    }, [props.im_exist])

    useEffect(()=>{

        let deps = [{ key: 0, value: 0, label: 'Все отделы' },
                  { key: 'dep_634567', value: userData.user.id_departament, label: 'Мой отдел'},
                  ...props.departments.map((dep)=>
                      ({
                      key: `departament_${dep.id}`,
                      value: dep.id,
                      label: dep.name
                  })
              )];
        setDepartments(deps);
    }, [props.departments]);




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
            setUsedDate(dayjs.unix(Number(targetDateValue)));
        }
    }, [location.search]); // Dependency array ensures this runs when location.search changes



    // Отслеживаем и отсылаем внешние фильтры на сервер
    useEffect(() => {
        
        setDateInContext(usedDate);
        if (props.onChangeExternalFilters){
            let params = {};
    
            params.date =  usedDate.format('YYYY-MM-DD HH:mm:ss');

            props.onChangeExternalFilters(params);
        }

    }, [usedDate])


    useEffect(() => {
        if (props.onChangeInnerSort)
        {
            // let userList = JSON.parse(JSON.stringify(baseUserListData));
            // userList = filterUserListByCompany(userList, usedCompany);
            // userList = filterUserListByDepartment(userList, usedDepartment);


            // userList = sortUserList(userList, usedSort);
                console.log('CALL TO SORT', usedSort);
                props.onChangeInnerSort(usedSort);
            // onChange(userList);
        }

    }, [usedSort]);

    useEffect(() => {
        if (props.onChangeInnerFilers)
        {
            let filters = [{ key :'id_company', value: usedCompany},
                {key : 'depart_id', value: usedDepartment}
            ];
                console.log('CALL TO FILTER', filters);
                props.onChangeInnerFilers(filters);
        }

    }, [usedCompany, usedDepartment]);


    useEffect(() => {
        if (CSRF_TOKEN){
            setCompanies([
                { key: 'nullCompany', value: 0, label: 'Все компании' },
                ...userData.companies.filter((item) => { return item.id !== 1}).map((com) => ({
                    key: com.id,
                    value: Number(com.id),
                    label: com.name,
                }))]
            )}},[userData]);




    const handleUsedCompanyChange = (value) => {
        setUsedCompany(value);
        // changeAddressBarParam('tgc',value,[0]);
    };
    const handleUsedDepartmentChange = (value) => {
        setUsedDepartment(value);
        // changeAddressBarParam('dep',value,[0]);
    };
    const handleUsedDateChange = (value) => {
        if (value == null){
            value = dayjs();
        }
        setUsedDate(value);
        setDateInContext(usedDate);
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


    const setDateInContext = (value) => {
        const params = new URLSearchParams(window.location.search);
        params.set('date', value.unix());
        navigate(`?${params.toString()}`);
        // if (deleteOn.includes('date')){
        //     params.delete('date');
        // } else {
        // };

        setState(prevState => ({
        ...prevState, // Сохраняем все текущие значения
        date: value, // Обновляем только `date`
        }));
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


    const move_boss_to_top = (arr) => {
        // Создаем копию массива для безопасности
        const newArray = [...arr];
        
        // Ищем босса
        const bossIndex = newArray.findIndex(user => user?.user_id === 46);
        
        // Если босс найден и не на первом месте
        if (bossIndex > 0) {
          // Извлекаем босса
          const [boss] = newArray.splice(bossIndex, 1);
          // Вставляем в начало
          newArray.unshift(boss);
        }
        
        return newArray;
      };

    // _----------------------------------------
    //    const sortUserList = (userList, sortByValue) => {
    //     console.log('sortBy' + ' => ' + sortByValue);
    //     // await setUserListData(DS_DEFAULT_USERS.sort((a, b) => b.department - a.department));
    //     // Копируем текущие данные для сортировки
    //     let sortedData = userList;
    //     setUsedSort(sortByValue);
    //     switch (sortByValue) {
    //         case "department_asc":
    //             sortedData.sort((a, b) => a.department_id - b.department_id);
    //             sortedData = move_boss_to_top(sortedData);
    //             sortedData = insertDepartmentNames(sortedData);
    //             break;
    
    //         case "department_desc":
    //             sortedData.sort((a, b) => b.department_id - a.department_id);
    //             break;
    
    //         case "name_asc":
    //             sortedData.sort((a, b) => a.user_name.localeCompare(b.user_name));
    //             break;
    
    //         case "name_desc":
    //             sortedData.sort((a, b) => b.user_name.localeCompare(a.user_name));
    //             break;
    
    //         case "surname_asc":
    //             sortedData.sort((a, b) => a.user_surname.localeCompare(b.user_surname));
    //             break;
    
    //         case "surname_desc":
    //             sortedData.sort((a, b) => b.user_surname.localeCompare(a.user_surname));
    //             break;
    
    //         case "state_asc":
    //             sortedData.sort((a, b) => a.current_state - b.current_state);
    //             break;
    
    //         case "state_desc":
    //           sortedData.sort((a, b) => b.current_state - a.current_state);
    //         //   console.log( sortedData);
    //           break;
    
    //         default:
    //             // Сортировка по умолчанию (например, по department ASC)
    //             sortedData.sort((a, b) => a.department_id - b.department_id);
    //             sortedData = move_boss_to_top(sortedData);
    //             sortedData = insertDepartmentNames(sortedData);
    //             break;
    //     }
        
    //     return sortedData;
    // }


    // const filterUserListByCompany = (userList, id_company)=>{
    //     if (id_company == 0 || id_company == null){
    //         return userList;
    //     };
    //     return userList.filter(item => item.id_company === Number( id_company));
    // }


    // const filterUserListByDepartment = (userList, depart_id) =>
    // {
    //     if (depart_id == null || depart_id == 0){
    //         return userList;
    //     };
    //     return userList.filter(item => item.department_id === Number(depart_id));
    // }


//     const insertDepartmentNames = (dataArray) => {
//         let newDataArray = [];
//         let next = -1; // next department ID
    
//         for (let i = 0; i < dataArray.length; i++){
//           let dep_id = dataArray[i].department_id;
          
//           if (dep_id != next){
//             // insert custom row
//             let crow = customRow(dep_id);
//             // console.log('crow', crow);
//             newDataArray.push(crow);
//           }
//           if (i < dataArray.length - 1){
//             next = dep_id;
//           }; 
//             newDataArray.push(dataArray[i]);
//           }
        
//         // console.log('dataArray' + ' => ' + newDataArray);
//         return newDataArray;
//       }

//     const getDepartmentNameById = (id) => {
//       const department = DS_DEPARTMENTS.find(dept => dept.id === id);
//       return department ? department.name : null; // Возвращаем имя или null, если не найдено
//   };


//   // Добавляем кастомную строку в зависимости от значения sortBy
//   const customRow = (dep_id) => {
//     return {
//     id: `custom_row_dep_${dep_id}`,
//       key: `custom_row_dep_${dep_id}`, // Уникальный ключ для строки
//       name: getDepartmentNameById(dep_id) ? getDepartmentNameById(dep_id) : '<департамент удалён>',
//       surname: null,
//       patronymic: null,
//       enter: '', // Пустые значения для других полей
//       exit: '',
//       losttime: '',
//       type: 'header'
//       };
//   };



    const handleFindMyself = ()=>{
        if (props.on_find_me){
            props.on_find_me();
        }
    }


    return (
        <div style={{width: '100%'}}>


        
            <div className={"sk-flex sk-flex-space sk-sermonic-tolbar-bar"}
            style={{width: '100%', padding: '6px 14px', alignItems: 'center'}}

            >
            <div className={'sk-flex-space'}>

                <RightSquareOutlined
                    
                    className={`sk-usermonic-filter-bacon ${(usedCompany !== 0 &&  parseInt(usedCompany) > 1 )
                        || (usedDepartment !== 0 && parseInt(usedDepartment) > 0)  || (usedSort !== 0 && usedSort != 'department_asc') ? 'sk-fried-bacon' : ''}`}
                    onClick={()=>{setOpenDrawer(true)}}
                    title="Фильтры и сотрировки"
                    />
                {/* {usedDepartment} {usedCompany} {usedSort} */}

            </div>



            <div className="sk-flex">
                <DoubleLeftOutlined
                    title="На предыдущий день"
                    onClick={decreaseDate}
                    className={'sk-usermonic-filter-bacon'}
                    />


                <DatePicker 
                    // defaultValue={usedDate}
                    value={usedDate}
                    onChange={handleUsedDateChange}
                    format={"DD-MM-YYYY"}
                    variant="borderless"
                    size="large"
                    title={getWeekDayString( usedDate.day())}
                    />

                    <DoubleRightOutlined
                    onClick={increaseDate}
                    className={'sk-usermonic-filter-bacon'}
                    title="На следующий день"
                    />
            

            </div>

            <div>
                {imExist ? (
                    <CrownOutlined 
                        title="Найти себя в списке"
                        onClick={handleFindMyself}
                        className={'sk-usermonic-filter-bacon'}
                    />
                   
                ):(
                    <div style={{minWidth: '34px'}}></div>
                )}

            </div>


        </div>

        <div className={'sk-usermonic-after-toolbar'}>
            <div className={'sk-usermonic-toolbar-xtext'}
                onDoubleClick={()=>{setUsedDate(dayjs())}}
                title="Выбранный день. Двойной клик скинет вас на сегодняшнюю дату."
            >
                {getMonthName(usedDate.month())}'{usedDate.year()}, {getWeekDayString( usedDate.day())}
            </div>
            <div></div>
        </div>
        
                <br />
            <Drawer
                open={openDrawer}
                placement="left"
                onClose={()=>{setOpenDrawer(false)}}
                title=<span className={'sk-flex-space'}>Фильтры и сортировки</span>
                style={{background: 'white !important'}}
                className="sk-bg-white"
            >
            <div>


                <div className={'sk-usermonic-drawer-row'}>
                    <div className={'sk-labed-um'}>Компания</div>
                    {companies.length > 1 ? (
                    <Select 
                        variant={'borderless'}
                        style={{ width: '100%' }}
                        options={companies}
                        value={usedCompany} // Use value instead of defaultValue for controlled component
                        onChange={handleUsedCompanyChange}
                    />
                    ) : ''}
                </div>




                <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Отдел</div>
                        <Select 
                            variant={'borderless'}
                            style={{ width: '100%' }}
                            options={departments}
                            value={usedDepartment} // Use value instead of defaultValue for controlled component
      
                            onChange={handleUsedDepartmentChange}
                        />
                    </div>
                </div>


                <div className={'sk-usermonic-drawer-row'}>
                <div className={'sk-labed-um'}>Сортировка</div>
                <Select
                                            variant={'borderless'}
                                            style={{ width: '100%' }}
                    placeholder={'Упорядочить по'}
                    options={sortByValues}
                    value={usedSort == 0 ? null : usedSort}
                    allowClear={true}
                    onChange={handleSortByChange}
                />
                </div>

                
                <div>
                    {parseInt(usedCompany) > 1 || parseInt(usedDepartment) > 0 || usedSort != 'department_asc' ? (
                        <div>
                            <br />
                            <Button
                            danger
                            block
                            onClick={()=>{
                                setUsedCompany(0); setUsedDepartment(0); setUsedSort('department_asc');
                            }}
                            >
                                Очистить фильтры
                            </Button>
                        </div>
                    ): ""}
                    
                </div>

            </Drawer>
        </div>
    );
}

export default UserListToolbar;
