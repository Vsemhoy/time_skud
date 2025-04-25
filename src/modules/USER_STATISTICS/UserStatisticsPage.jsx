import React, { useEffect, useMemo, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./components/style/userstatisticspage.css";
import DemoChart from "./components/style/DemoChart";
import {  Button, DatePicker, Drawer, Pagination, Select } from "antd";
import dayjs from "dayjs";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { DS_DEFAULT_USERS, DS_DEPARTMENTS } from "../../CONFIG/DEFAULTSTATE";



const UserStatisticsPage = (props)=>{
    const { userdata } = props;

    const [openMode, setOpenMode] = useState(1); // 1 - personal, 2 - group / 3 - all

    const [selectedDateUnit, setSelectedDateUnit] = useState('day');

    const [targetStartDate, setTargetStartDate] = useState(dayjs().startOf('day'));
    const [targetEndDate, setTargetEndDate] = useState(dayjs().endOf('day'));

    const [targetString, setTargetString] = useState("");



    const [paginatorTotal, setPaginatorTotal] = useState(0);
    const [paginatorPage, setPaginatorPage] = useState(1);
    const [paginatorOnPage, setPaginatorOnPage] = useState(100);




    // [[ DRAWER ]]
    const [baseUserlist, setBaseUserList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [baseDepartList, setBaseDepartList] = useState([]);

    const [openCustomDrawer, setOpenCustomDrawer] = useState(false);
    const [formUsers, setFormUsers] = useState( []);
    const [formStartTime , setFormStartTime] = useState( dayjs() );
    const [formEndTime, setFormEndTime] = useState( dayjs() );
    const [formReason, setFormReason] = useState('');
    const [formValid, setFormValid] = useState(false);




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


    useEffect(() => {
      if (PRODMODE){
        get_stats({
            start: dayjs().startOf('day').format('YYYY-MM-DD HH:mm'),
            end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm'),
            users_id: [57, 36, 505]
        });
      } else {
        setBaseUserList(DS_DEFAULT_USERS);
        setBaseDepartList(DS_DEPARTMENTS);
      }
    

    }, [])
    


    useEffect(() => {
        // will apply filters
      setUserList(baseUserlist);
    }, [baseUserlist])
    

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
        setFormStartTime(targetStartDate?.hour(9).minute(15))
    },[targetStartDate]);

    useEffect(()=>{ 
        setFormEndTime(targetEndDate?.hour(18).minute(0))
    },[targetStartDate]);
    
    
    // useEffect(()=>{ 

    //         let q_params = {
    //             start: targetStartDate.format('YYYY-MM-DD HH:mm:ss'),
    //             end: targetEndDate.format('YYYY-MM-DD HH:mm:ss'),
    //             unit: selectedDateUnit,
    //             page: paginatorPage,
    //             on_page: paginatorOnPage
    //         };
    //         if (selectedSource !== null){
    //             q_params.source = selectedSource;
    //         };
    //         if (selectedController !== null){
    //             q_params.controller = selectedController;
    //         };
    //         if (targetString !== null && targetString.trim() !== ""){
    //             q_params.string = targetString;
    //         };
    //         if (props.on_chang_query_params){
    //             props.on_chang_query_params(q_params);
    //         }

    // },[targetEndDate, targetStartDate, selectedSource, selectedDateUnit, selectedController, targetString, paginatorPage, paginatorOnPage]);

    useEffect(()=>{
        handleChangeDateRange(targetStartDate);
    },[selectedDateUnit]);


    useEffect(()=>{ 
        let points = 0;
        if (formEndTime || formStartTime){
            points++;
        };
        if (formReason.length > 1){
            points++;
        };
        if (formUsers.length > 0){
            points++;
        };
        if (formEndTime && formStartTime && formEndTime.isSame(formStartTime)){
            points--;
        }
        setFormValid(points > 2);

    },[formEndTime, formStartTime, formReason, formUsers]);



 // ------------------ FetchWorld ----------------------
        /**
         * Получение списка пользователей
         * @param {*} req 
         * @param {*} res 
         */
        const get_arch_users = async (req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/eventmonitor/getusers', 
                    {
                        data: [],
                        _token: CSRF_TOKEN
                    });
                    setBaseUserList(response.data.content);
                    // console.log('get_calendarList => ', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                
            }
        }
    


        //     /**
        //      * Получение списка отделов
        //      * @param {*} req 
        //      * @param {*} res 
        //      */
        //     const get_departments = async (req, res) => {
        //       try {
        //           let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/departaments/departaments?_token=' + CSRF_TOKEN);
        //           console.log('departs', response);
        //           // setOrganizations(organizations_response.data.org_list)
        //           // setTotal(organizations_response.data.total_count)
        //           setDepartments(response.data.data);
        //       } catch (e) {
        //           console.log(e)
        //       } finally {
        //           // setLoadingOrgs(false)
        //       }
        //   }
        
        
    /**
     * Получение списка пользователей
     * @param {*} req 
     * @param {*} res 
     */
        const get_stats = async (filters, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/userlist/statistic', 
                {
                    data: filters,
                    _token: CSRF_TOKEN
                });
                if (response && response.data){
                    console.log(response.data.content);
                }
        } catch (e) {
            console.log(e)
        } finally {
            // setLoadingOrgs(false)
        }
    }
    /** ------------------ FETCHES END ---------------- */




        const handleMoveDate = (direction) => {
            // console.log(direction);
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
            setPaginatorOnPage(page);
            setPaginatorPage(val);
        }


    return (
        <div style={{padding: '6px'}} className={'sk-mw-1400'}>
            <br/>
            <span>Статистика</span>


            <div className={'sk-usp-layout-container'}>
                <div className={'sk-usp-openmode-group'}>
                    <div
                        className={`${openMode === 1 ? 'sk-active': ''}`}
                        onClick={()=>{setOpenMode(1)}}
                    >
                        Персона
                    </div>
                    <div
                        className={`${openMode === 2 ? 'sk-active': ''}`}
                        onClick={()=>{setOpenMode(2)}}
                    >
                        Группа
                    </div>
                    <div
                        className={`${openMode === 3 ? 'sk-active': ''}`}
                        onClick={()=>{setOpenMode(3)}}
                    >
                        Все
                    </div>
                </div>
                <div>
                    filters
                </div>
            </div>

            <div className={'sk-usp-layout-container'}>
                <div className="sk-usp-filter-col">
                    
                    <div className={'sk-usp-filter-col-item'} >
                    <span className={'sk-usp-filter-col-label'}>Период</span>
                    <Select
                        style={{ width: '100%' }}
                        placeholder={'Диапазон времени'}
                        value={selectedDateUnit}
                        options={dateunits}
                        onChange={(va)=>{setSelectedDateUnit(va)}}
                        />
                    </div>
                    
                    <div className={'sk-usp-filter-col-item'} >
                        <span className={'sk-usp-filter-col-label'}>Дата</span>
                        <div
                            style={{display: 'flex'}}
                        >
                            <Button
                                onClick={()=>{handleMoveDate(0)}}
                            title="Смещение на диапазон в прошлое"
                            ><LeftOutlined /></Button>
                            {selectedDateUnit === 'day' && (
                                <DatePicker onChange={onChange}
                                    format={"DD-MM-YYYY"}
                                    value={targetStartDate}
                                    style={{ width: '100%' }}
                                />
                            )}
                                {selectedDateUnit === 'week' && (
                                <DatePicker
                                style={{ width: '100%' }}
                                value={targetStartDate}
                                onChange={onChange} picker="week" />
                            )}
                                {selectedDateUnit === 'month' && (
                                <DatePicker
                                style={{ width: '100%' }}
                                value={targetStartDate}
                                onChange={onChange} picker="month" />
                            )}
                            {selectedDateUnit === 'quart' && (
                                <DatePicker
                                style={{ width: '100%' }}
                                value={targetStartDate}
                                onChange={onChange} picker="quarter" />
                            )}
                            {selectedDateUnit === 'year' && (
                                <DatePicker
                                style={{ width: '100%' }}
                                value={targetStartDate}
                                onChange={onChange} picker="year" />
                            )}
                            <Button
                            onClick={()=>{handleMoveDate(1)}}
                            title="Смещение на диапазон в будущее"
                            ><RightOutlined /></Button>
                        </div>
                    </div>

                {openMode === 1 ? (
                    <>
                    <div className={'sk-usp-filter-col-item'} >
                        <span className={'sk-usp-filter-col-label'}>Выберите вашего бойца</span>
                        <Select
                            style={{ width: '100%' }}
                            options={
                            userList.map((item)=>{return {
                                key: `usrke_${item.id}`,
                                value: item.id,
                                label: (item.id).toString().padStart(4, '0') + " -  " + item.surname + " " + item.name + " " + item.patronymic
                            }
                            })
                        }
                        ></Select>
                    </div>

                    <div className={'sk-usp-filter-col-item'} >
                        Персона разделяет показатели на разные графики:<br />
                        - Время входа по временной шкале и время выхода на ней же<br />
                        - Общее время, 
                        - Рабочее время,
                        - Потерянное время,
                        - Время для отработки<br />
                        - Опоздания в динамике для всех по временной шкале<br />
                        - Количество опозданий для пользователя на день<br />
                        Также статистика отображает:<br />
                        - Среднее время для каждого показателя в диапазоне с учётом количества рабочих дней<br />
                        - Суммарное время для каждого нужного показателя<br />
                        - Количество рабочих дней для каждого юзера общее<br />
                    </div>

                    <div className={'sk-usp-filter-col-item'} >

                    </div>
                    </>
                ) : ''}

                {openMode === 2 ? (
                    <>
                    <div className={'sk-usp-filter-col-item'} >
                        <span className={'sk-usp-filter-col-label'}>Отдел</span>
                        <Select
                            style={{ width: '100%' }}
                            options={
                            baseDepartList.map((item)=>{return {
                                key: `usrke_${item.id}`,
                                value: item.id,
                                label: (item.id).toString().padStart(2, '0') + " - " + item.name,
                            }
                            })
                        }
                        ></Select>
                    </div>

                    <div className={'sk-usp-filter-col-item'} >

                    </div>
                    </>
                ) : ''}

                {openMode === 3 ? (
                    <>
                    <div className={'sk-usp-filter-col-item'} >
                        <span className={'sk-usp-filter-col-label'}>Сотрудники</span>
                        <Select
                            style={{ width: '100%' }}
                             mode="multiple"
                            options={
                            userList.map((item)=>{return {
                                key: `usrke_${item.id}`,
                                value: item.id,
                                label: (item.id).toString().padStart(3, '0') + " -  " + item.surname + " " + item.name + " " + item.patronymic
                            }
                            })
                        }
                        ></Select>
                    </div>

                    <div className={'sk-usp-filter-col-item'} >
                        Группа разделяет показатели на разные графики:<br />
                        - Время входа для всех<br />
                        - Время выхода<br />
                        - Общее время<br />
                        - Рабочее время<br />
                        - Потерянное время<br />
                        - Время для отработки<br />
                        - Опоздания в динамике для всех по временной шкале<br />
                        - Количество опозданий для пользователя на день<br />
                        Также статистика отображает:<br />
                        - Среднее время для каждого показателя в диапазоне с учётом количества рабочих дней<br />
                        - Суммарное время для каждого нужного показателя<br />
                        - Количество рабочих дней для каждого юзера общее<br />
                    </div>

                    <div className={'sk-usp-filter-col-item'} >

                    </div>
                    </>
                ) : ''}


                    <div className={'sk-usp-filter-col-item'} >

                    </div>

                    <div className={'sk-usp-filter-col-item'} >

                    </div>




                </div>

                <div className="sk-usp-content-col">
                    <DemoChart />
                </div>
            </div>
        </div>
    )
};

export default UserStatisticsPage;