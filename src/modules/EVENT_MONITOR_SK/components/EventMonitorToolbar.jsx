import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { selectWord } from "@uiw/react-md-editor";
import { Button, DatePicker, Drawer, Pagination, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/transfer/search";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { CSRF_TOKEN, PRODMODE } from "../../../CONFIG/config";
import { DS_DEFAULT_USERS } from "../../../CONFIG/DEFAULTSTATE";
import { PROD_AXIOS_INSTANCE } from "../../../API/API";

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


    // [[ DRAWER ]]
    const [openCustomDrawer, setOpenCustomDrawer] = useState(false);
    const [baseUserlist, setBaseUserList] = useState([]);
    const [formUsers, setFormUsers] = useState( []);
    const [formStartTime , setFormStartTime] = useState( dayjs() );
    const [formEndTime, setFormEndTime] = useState( dayjs() );
    const [formReason, setFormReason] = useState('');
    const [formValid, setFormValid] = useState(false);

    const [currentTextVariant, setCurrentTextVariant] = useState(0);
    const textVariants = [
        "Ещё не получил пропуск",
        "Забыл пропуск",
        "В процессе замены пропуска",
        "Ошибка скуд",
        "Забыл приложить карточку к считывателю",
        "Служебная необходимость:",
        "Поломка системы контроля доступа"
    ];
    // [[ DRAWER ]]

    useEffect(()=>{
        if (openCustomDrawer === true){
            if (baseUserlist.length === 0){
                if (PRODMODE){
                    get_arch_users();
                } else {
                    setBaseUserList(DS_DEFAULT_USERS);
                }
            }
        }
    },[openCustomDrawer]);


    const controllers = [
        {
            key: "contr_0",
            value: null,
            label: "Все контроллеры"
        }
    ];

    useEffect(() => {
      if (props.user_to_search){
        setTargetString(props.user_to_search);
      }
    }, [props.user_to_search]);

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
        setFormStartTime(targetStartDate?.hour(9).minute(15))
    },[targetStartDate]);

    useEffect(()=>{ 
        setFormEndTime(targetEndDate?.hour(18).minute(0))
    },[targetStartDate]);
    
    
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

    },[targetEndDate, targetStartDate, selectedSource, selectedDateUnit, selectedController, targetString, paginatorPage, paginatorOnPage]);

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





    const handleCreateEvent = () =>{
        if (formValid){
            let obj = {
                users: formUsers,
                start: formStartTime?.format('YYYY-MM-DD HH:mm:ss'),
                end:    formEndTime?.format('YYYY-MM-DD HH:mm:ss'),
                reason: formReason
            };
            write_user_action(obj);
        }
    }



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
    

                /**
         * Запись кастомного события в БД
         * @param {*} req 
         * @param {*} res 
         */
                const write_user_action = async (data, req, res) => {
                    try {
                        let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/eventmonitor/makeevent', 
                            {
                                data: data,
                                _token: CSRF_TOKEN
                            });
                            if (response.data){
                                alert("Событие сохранено");
                                if (props.on_create_event){
                                    if (formStartTime === null){
                                        if (targetStartDate.isBefore(formEndTime) && targetEndDate.isAfter(formEndTime))
                                        {
                                            props.on_create_event();
                                        }
                                    };
                                    if (formEndTime === null || (formStartTime != null && formEndTime != null)){
                                        if (targetStartDate.isBefore(formStartTime) && targetEndDate.isAfter(formStartTime))
                                        {
                                            props.on_create_event();
                                        }
                                    }
                                }
                            }
                    } catch (e) {
                        console.log(e)
                    } finally {
                        
                    }
                }
        // ------------------ FetchWorld END ----------------------





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


    const handleChangeVariants = (event) => {
        // Проверка на пустой ввод или совпадение с вариантами
        let isValid = false;
        if (formReason.trim() === "") {
          isValid = true;
        } else {
          isValid = textVariants.includes(formReason);
        }
      
        if (!isValid) return;
        let canSet = false;
      
        let newIndex = currentTextVariant;
      
        if (event.key === 'ArrowDown') {
          newIndex++;
          if (newIndex >= textVariants.length) {  // Было >, теперь >=
            newIndex = 0;
          }
          canSet = true;
        } 
        else if (event.key === 'ArrowUp') {
          newIndex--;
          if (newIndex < 0) {
            newIndex = textVariants.length - 1;
          }
          canSet = true;
        }
        if (canSet){
            setFormReason(textVariants[newIndex]);
            setCurrentTextVariant(newIndex);
        }
      }


    return (
        <div className={'sk-event-monitor-toolbar'}>
            <div className={'sk-flex'}>
                <Select
                disabled
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
            <div className={'sk-flex-space'}>
            <div className={'sk-flex'}>
                </div>
                <div className={'sk-flex'}>
                <Select
                    style={{width: '160px'}}
                    placeholder={'Диапазон времени'}
                    value={selectedDateUnit}
                    options={dateunits}
                    onChange={(va)=>{setSelectedDateUnit(va)}}
                    />
                <Button
                    onClick={()=>{handleMoveDate(0)}}
                title="Смещение на диапазон в прошлое"
                ><LeftOutlined /></Button>
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
                <div className={'sk-flex'}>
                    <Button color="cyan" variant="solid"
                        onClick={()=> {setOpenCustomDrawer(true)}}
                    >
                        Создать событие
                    </Button>
                </div>
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




            <Drawer
                closable
                destroyOnClose
                title={<span>Ручное дабовление записи</span>}
                placement="right"
                open={openCustomDrawer}
                // loading={loading}
                onClose={() => setOpenCustomDrawer(false)}
            >
                <div style={{display:'flex', flexDirection: 'column'}}>


                <label className={'sk-drform-label'}>
                    <strong>Сотрудник</strong></label>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        options={
                            baseUserlist.map((item)=>{return {
                                key: `usrke_${item.id}`,
                                value: item.id,
                                label: (item.id).toString().padStart(4, '0') + " -  " + item.surname + " " + item.name + " " + item.patronymic
                            }
                            })
                        }
                        value={formUsers}
                        onChange={setFormUsers}
                        filterOption={(input, option) => 
                            option?.label?.toLowerCase().includes(input.toLowerCase())
                        }
                        showSearch
                    />
                <br />
                <div className={'sk-dform-enttab'}>
                    <label className={'sk-drform-label'}>
                        Вход
                        </label>
                    <DatePicker
                        showTime={true}
                        showSecond={false}
                        allowClear={true}
                        value={formStartTime}
                        format={'DD-MM-YYYY  HH:mm'}
                        onChange={setFormStartTime}
                    />

                </div>
                <br />
                {formStartTime?.format('YYYY-MM-DD HH:mm') === formEndTime?.format('YYYY-MM-DD HH:mm') && (
                    <div>Время входа и выхода не должно совпадать<br /><br /></div>
                )}
                <div className={'sk-dform-exttab'}>
                <label className={'sk-drform-label'}>
                    Выход
                    </label>
                    <DatePicker
                    showTime={true}
                    showSecond={false}
                    allowClear={true}
                    value={formEndTime}
                    format={'DD-MM-YYYY  HH:mm'}
                    onChange={setFormEndTime}
                />
                </div>
                <br />
                <label className={'sk-drform-label'}>
                <strong>Причина</strong> *(обязательно)
                    </label>
                    <TextArea maxLength={255}
                        rows={7}
                        required
                        onChange={(ev)=>{setFormReason(ev.target.value)}}
                        value={formReason}
                        onKeyDown={handleChangeVariants}
                        placeholder="Нажмите стрелку вниз\вверх на клавиатуре, чтобы выбрать шаблонный текст"
                    ></TextArea>

                <br />
                {formValid ? (
                    <Button
                    type="primary"
                    onClick={handleCreateEvent}
                    block >
                    Сохранить
                </Button>
                ) : (
                    <Button
                    disabled
                    block >
                    Сохранить
                </Button>
                )}
                
                </div>
            </Drawer>


        </div>
    )
}

export default EventMonitorToolbar;