import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker, Empty } from 'antd';
import EventMonitorToolbar from './components/EventMonitorToolbar';
import { data } from 'react-router-dom';

import './components/style/eventmonitor.css';
import { PROD_AXIOS_INSTANCE } from '../../API/API';
import { CSRF_TOKEN } from '../../CONFIG/config';
import EventMonitorListCard from './components/EventMonitorListCard';

const EventMonitorPage = (props) => {
    const [date, setDate] = useState(dayjs('2025-04-10', 'YYYY-MM-DD'));

    const [baseArchEvents, setBaseArchEvents] = useState([]);

    const [queryParams, setQueryParams] = useState({
        start: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    });

    const [userToSearch, setUserToSearch] = useState(null);

    const [totalRowsInQuery, setTotalRowsInQuery] = useState(0);


    useEffect(()=>{
        const debounceTimer = setTimeout(() => {
        console.log(queryParams);
        get_arch_events(queryParams);
        }, 800);
        return () => clearTimeout(debounceTimer);
    },[queryParams]);



    // ------------------ FetchWorld ----------------------
    /**
     * Получение списка групп
     * @param {*} req 
     * @param {*} res 
     */
    const get_arch_events = async (data, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/eventmonitor/getevents', 
                {
                    data: data,
                    _token: CSRF_TOKEN
                });
                setBaseArchEvents(response.data.content);
                setTotalRowsInQuery(response.data.total);
                console.log('get_calendarList => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
            
        }
    }

    // ------------------ FetchWorld END ----------------------


    const handleCustomEventCreation = () => {
        get_arch_events(queryParams);
        // Call to reload page after insert user's action
    }


    

return (
    <div className={'sk-mw-1400'} style={{padding: '12px'}}>
    <br/>
    <h2>Монитор событий СКУД</h2>

    <EventMonitorToolbar 
        on_chang_query_params={(data)=>{setQueryParams(data)}}
        pagination_total={totalRowsInQuery}
        on_create_event={handleCustomEventCreation}
        user_to_search={userToSearch}
    />
    
    <div className={'sk-arche-stack'}>
        {baseArchEvents.length == 0 ? (
            <Empty />
        ):(
            <>
            <div className={`sk-evemonic-cardrow`}>
                <div>id</div>
                <div>src</div>
                <div>Имя сотрудника</div>
                <div>Причина</div>
                <div>Время события</div>
                <div>День</div>
                <div>Тип</div>
            </div>
                {baseArchEvents.map((arche)=>(
                    <EventMonitorListCard
                        data={arche}
                        setUserToSearch={(name)=>{setUserToSearch(name)}}
                    />
                ))}
            </>

        )}
    </div>
    </div>
);

};

export default EventMonitorPage;
