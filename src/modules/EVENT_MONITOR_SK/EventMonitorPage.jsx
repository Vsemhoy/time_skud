import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Empty, Skeleton } from 'antd';
import EventMonitorToolbar from './components/EventMonitorToolbar';

import './components/style/eventmonitor.css';
import { PROD_AXIOS_INSTANCE } from '../../API/API';
import {CSRF_TOKEN, ROUTE_PREFIX} from '../../CONFIG/config'
import EventMonitorListCard from './components/EventMonitorListCard';

const EventMonitorPage = (props) => {
    const [baseArchEvents, setBaseArchEvents] = useState([]);

    const [queryParams, setQueryParams] = useState({
        start: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    });

    const [userToSearch, setUserToSearch] = useState(null);

    const [totalRowsInQuery, setTotalRowsInQuery] = useState(0);
    const [eventsLoading, setEventsLoading] = useState(false);
    const isTruthyFlag = (value) => value === true || value === 1 || value === '1';
    const getAclId = (acl) => Number(acl?.id ?? acl?.acl_id ?? acl);
    const hasAcl = (aclId) => (
        Array.isArray(props.userdata?.acls)
        && props.userdata.acls.some((acl) => getAclId(acl) === aclId)
    );
    const hasFullEventUserAccess = Boolean(
        isTruthyFlag(props.userdata?.user?.super)
        || isTruthyFlag(props.userdata?.user?.is_admin)
        || hasAcl(71)
    );
    const canCreateEvent = Boolean(
        hasFullEventUserAccess
        || hasAcl(77)
    );


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
        setEventsLoading(true);
        try {
            let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/eventmonitor/getevents`, 
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
            setEventsLoading(false);
        }
    }

    // ------------------ FetchWorld END ----------------------


    const handleCustomEventCreation = () => {
        get_arch_events(queryParams);
        // Call to reload page after insert user's action
    }


    

return (
    <EventMonitorToolbar
        on_chang_query_params={(data)=>{setQueryParams(data)}}
        pagination_total={totalRowsInQuery}
        on_create_event={handleCustomEventCreation}
        user_to_search={userToSearch}
        can_create_event={canCreateEvent}
        event_user_scope={hasFullEventUserAccess ? 'all' : 'warehouse'}
        header={(
            <div className="sk-event-monitor-content-header">
                <h2>Монитор событий СКУД</h2>
                <span>Найдено: {totalRowsInQuery}</span>
            </div>
        )}
        table_header={(
            <div className={`sk-evemonic-cardrow sk-evemonic-headerrow`}>
                <div>id</div>
                <div>src</div>
                <div>Сотрудник</div>
                <div>Причина</div>
                <div>Время события</div>
                <div>День</div>
                <div>Тип</div>
            </div>
        )}
    >
        <div className={'sk-arche-stack sk-event-monitor-table'}>
            {eventsLoading ? (
                <div className="sk-event-monitor-skeleton">
                    {Array.from({length: 12}).map((_, index) => (
                        <div className="sk-evemonic-cardrow sk-evemonic-skeleton-row" key={`event-monitor-skeleton-${index}`}>
                            <div><Skeleton.Input active size="small" /></div>
                            <div><Skeleton.Avatar active size="small" shape="circle" /></div>
                            <div><Skeleton.Input active size="small" /></div>
                            <div><Skeleton.Input active size="small" /></div>
                            <div><Skeleton.Input active size="small" /></div>
                            <div><Skeleton.Input active size="small" /></div>
                            <div><Skeleton.Button active size="small" /></div>
                        </div>
                    ))}
                </div>
            ) : baseArchEvents.length == 0 ? (
                <div className="sk-event-monitor-empty">
                    <Empty />
                </div>
            ):(
                <>
                    {baseArchEvents.map((arche)=>(
                        <EventMonitorListCard
                            key={`${arche.user_id}-${arche.pkey}-${arche.datetime_contr}`}
                            data={arche}
                            setUserToSearch={(name)=>{setUserToSearch(name)}}
                        />
                    ))}
                </>

            )}
        </div>
    </EventMonitorToolbar>
);

};

export default EventMonitorPage;
