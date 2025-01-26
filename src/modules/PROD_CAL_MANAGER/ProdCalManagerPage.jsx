import React, { useEffect, useState } from "react";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { DS_PROD_CALENDARS, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import ProdCalToolbar from "./components/ProdCalToolbar";
import ProdCalItemCard from "./components/ProdCalItemCard";
import ProdCalModal from "./components/ProdCalModal";
import { PROD_AXIOS_INSTANCE } from "../../API/API";

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

    
    useEffect(() => {
        if (CSRF_TOKEN){
            setCompanies([{ key: 0, value: 0, label: 'Все компании' },
                ...userdata.companies.map((com) => ({
                    key: com.id,
                    value: Number(com.id),
                    label: com.name,
                }))]
            )}},[userdata]);



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
          let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/prodcalendars?_token=' + CSRF_TOKEN);
          console.log('departs', response);
          setBaseCalendarList(response.data.data);
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
        const get_calendarItem = async (req, res, item_id) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.get('/api/timeskud/prodcalendars' + item_id + '?_token=' + CSRF_TOKEN);
                console.log('departs', response);
                setCalendarList(response.data.data);
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
            let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/prodcalendars?_token=' + CSRF_TOKEN,
                {data: body});
            console.log('users', response);
            // setBaseUserListData(response.data.data);
        } catch (e) {
            console.log(e)
        } finally {
            get_calendarList();
        }
    }

    /**
       * Получение списка пользователей
       * @param {*} req 
       * @param {*} res 
       */
        const update_calendar = async (body, req, res) => {
            try {
                let response = await PROD_AXIOS_INSTANCE.update('/api/timeskud/prodcalendars?_token=' + CSRF_TOKEN,
                    {data: body}
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
  /** ------------------ FETCHES END ---------------- */




    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveCalendar = (data)=>{
        if (data.id == null)
        {
            create_calendar(data);
        } else {
            update_calendar(data);
        }
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
            />
            <br/>

            <div className={'sk-calendar-list'}>
                {
                    calendarList.map((jcal)=>(
                        <ProdCalItemCard
                         onOpenModal={openModal} 
                         data={jcal}
                         key={`clitem_${jcal.id}`}
                        />
                    ))
                }


            </div>

            <ProdCalModal
                userData={userdata}
                is_open={isModalOpen}
                onClose={closeModal}
                data={editedItem}
                onSave={saveCalendar}
            />
        </div>
    )
};

export default ProdCalManagerPage;