import React, { useEffect, useState } from "react";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { DS_PROD_CALENDARS, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import ProdCalToolbar from "./components/ProdCalToolbar";
import ProdCalItemCard from "./components/ProdCalItemCard";
import ProdCalModal from "./components/ProdCalModal";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import dayjs from "dayjs";
import { Empty } from "antd";

const ProdCalManagerPage = (props) => {
    const { userdata } = props;
        const [companies, setCompanies] = useState([
            { key: 0, value: 0, label: 'Все компании' },
            ...DS_USER.companies.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            })),
        ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [callToOpen, setCallToOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({id: null});
    const [selectedCompany, setSelectedCompany] = useState(0)
    const [calendarList, setCalendarList] = useState(PRODMODE ? DS_PROD_CALENDARS : []);
    const [baseCalendarList, setBaseCalendarList] = useState(PRODMODE ? DS_PROD_CALENDARS : []);
    const [allowDelete , setAllowDelete] = useState(false);

    
    useEffect(() => {
        if (CSRF_TOKEN){
            setCompanies([{ key: 0, value: 0, label: 'Все компании' },
                ...userdata.companies.map((com) => ({
                    key: com.id,
                    value: Number(com.id),
                    label: com.name,
                }))]
            );
            get_calendarList();
        }},[userdata]);



    useEffect(()=>{
        if (callToOpen == true){
            setIsModalOpen(true);
            setCallToOpen(false);
        }
    }, [editedItem, callToOpen]);


    const openModal = (item_id) => {
        console.log('item_id', item_id);
        if (item_id == null){
            setEditedItem({id: null});
            setCallToOpen(true);
            return;
        }

        if (PRODMODE){
            let item = DS_PROD_CALENDARS.find((el)=>el.id === item_id);
            setEditedItem(item);
            setCallToOpen(true);
        } else {
            get_calendarItem(item_id);   
        }

        // setIsModalOpen(true);
        // console.log('Opened');
    };


    useEffect(()=>{
        let sorted = baseCalendarList.sort((a, b) => {
            return a.archieved - b.archieved; // Сортировка по возрастанию
        });

        if (selectedCompany == 0){
            setCalendarList(sorted);
        } else {
            setCalendarList(sorted.filter((item) => item.id_company === selectedCompany))
        }
    }, [baseCalendarList, selectedCompany])

    
  /** ------------------ FETCHES ---------------- */
    /**
     * Получение списка календарей
     * @param {*} req 
     * @param {*} res 
     */
    const get_calendarList = async (req, res) => {
      try {
          let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars_get', 
            {
                data: {},
                _token: CSRF_TOKEN
            });
            setBaseCalendarList(response.data);
            // Обновление состояния archieved календарей в соответствии с текущим годом
            for (let i = 0; i < response.data.length; i++) {
                const element = response.data[i];
                if (parseInt(element.year) === dayjs().year() && element.archieved !== 0){
                    element.archieved = 0;
                    update_calendar(element);
                } else if (parseInt(element.year) < dayjs().year() && element.archieved !== 1){
                    element.archieved = 1;
                    update_calendar(element);
                } else if (parseInt(element.year) > dayjs().year() && element.archieved !== -1){
                    element.archieved = -1;
                    update_calendar(element);
                };
            }


            console.log('get_calendarList => ', response.data);
      } catch (e) {
          console.log(e)
      } finally {
          
      }
    }

        /**
     * Получение одного календаря
     * @param {*} req 
     * @param {*} res 
     */
        const get_calendarItem = async (item_id, req, res ) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars_get/' + item_id, 
                    {
                        data: {},
                        _token: CSRF_TOKEN
                    });
                console.log('departs', response);
                setEditedItem(response.data);
            } catch (e) {
                console.log(e)
            } finally {
                setCallToOpen(true);
            }
        }


    /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
        const create_calendar = async (body, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars',
                {
                    data: body, 
                    _token: CSRF_TOKEN
                });
            console.log('users', response);
            // setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            get_calendarList();
        }
    }

    /**
       *  
       * @param {*} req 
       * @param {*} res 
       */
        const update_calendar = async (body, req, res) => {
            console.log('body',body);
            try {
                let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/prodcalendar/prodcalendars/' + body.id,
                    {   
                        data: body, 
                        _token: CSRF_TOKEN
                    }
                );
                console.log('users', response);
                // setBaseUserListData(response.data.data);
            } catch (e) {
                console.log(e)
            } finally {
                setBaseCalendarList(prevList => 
                    prevList.map(item => 
                        item.id === body.id ? { ...item, ...body } : item // Заменяем объект по id
                    )
                );
            }
        }

    /**
       *  
       * @param {*} req 
       * @param {*} res 
       */
    const delete_calendar = async (body, req, res) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/prodcalendar/prodcalendars/' + body.id + '?_token=' + CSRF_TOKEN,
                {   
                    data: body, 
                    _token: CSRF_TOKEN
                }
            );
            console.log('response.data', response.data);
            if (response.data.status === 0){
                get_calendarList();
            }
        } catch (e) {
            console.log(e)
        } finally {

        }
        setIsModalOpen(false);
        setAllowDelete(false);
    }

  /** ------------------ FETCHES END ---------------- */




    const closeModal = () => {
        setIsModalOpen(false);
        setAllowDelete(false);
    };

    const saveCalendar = (data)=>{
        if (data.id == null)
        {
            create_calendar(data);
        } else {
            update_calendar(data);
        }
        setAllowDelete(false);
    }


    const allowDeleteSet = (value)=>{
        setAllowDelete(value);
        console.log('value', value);
    }
    


    const changeCompany = (value)=>{
        setSelectedCompany(value);
    }

    return (
        <div className={'sk-mw-1000'}>
            <br/>
            <h2>Производственные календари</h2>
            <ProdCalToolbar 
                userData={userdata}
                companies={companies}
                onAddNewClick={openModal}
                onChangeCompany={changeCompany}
                allow_delete={allowDeleteSet}
            />
            <br/>

            <div className={'sk-calendar-list'}>
                {
                    calendarList.map((jcal)=>(
                        <ProdCalItemCard
                         onOpenModal={openModal} 
                         data={jcal}
                         key={`clitem_${jcal.id}`}
                         allow_delete={allowDeleteSet}
                        />
                    ))
                }
                {calendarList.length === 0 ? (
                    <Empty description={"Ничего не найдено"}/>
                ): ""}

            </div>

            <ProdCalModal
                userData={userdata}
                is_open={isModalOpen}
                onClose={closeModal}
                data={editedItem}
                onSave={saveCalendar}
                allow_delete={allowDelete}
                onDelete={delete_calendar}
                data_list={baseCalendarList}
            />
        </div>
    )
};

export default ProdCalManagerPage;