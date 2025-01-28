import React, { useEffect, useState } from "react";
import SchedToolbar from "./components/SchedToolbar";
import { DS_PROD_CALENDARS, DS_SCHEDULE_LIST, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import SchedCardItem from "./components/SchedCardItem";
import SchedEntityCard from "./components/SchedEntityCard";
import './components/style/schedmanager.css';
import TabPane from "antd/es/tabs/TabPane";
import { Tabs } from "antd";
import SchedListRow from "./components/SchedListRow";
import SchedList from "./components/SchedList";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import SchedModalEditor from "./components/SchedModalEditor";
import SchedModalUsers from "./components/SchedModalUsers";

const SchedManagerPage = (props) => {
    const { userdata } = props;
    const [companies, setCompanies] = useState([
        { key: 0, value: 0, label: 'Все компании' },
        ...DS_USER.companies.map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    const [baseScheduleList, setBaseScheduleList] = useState(PRODMODE ? DS_SCHEDULE_LIST : []);
    const [scheduleList, setScheduleList] = useState([]);


    const [userManagerModalOpen, setUserManagerModalOpen] = useState(false);
    const [editorModalOpen, setEditorModalOpen] = useState(false);
    const [editedId, setEditedId] = useState(null);
    const [editedIdtem, setEditedItem] = useState(null);



    // Функция для получения данных с API
    const getScheduleList = async () => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedules/schedules_get', {
                data: {},
                _token: CSRF_TOKEN
            });
            setBaseScheduleList(response.data); // Устанавливаем полученные данные в baseScheduleList
            console.log('get_scheduleList => ', response.data);
        } catch (e) {
            console.error(e);
        }
    };



    // Эффект для загрузки данных при монтировании компонента
    useEffect(() => {
        if (!PRODMODE) {
            // getScheduleList(); // Загружаем данные только если не в режиме продакшн
        } else {
        }
        setBaseScheduleList(DS_SCHEDULE_LIST);
        console.log(baseScheduleList);
    }, []);


    // Эффект для обновления scheduleList при изменении baseScheduleList
    useEffect(() => {
        setScheduleList(baseScheduleList);
        console.log(baseScheduleList);
    }, [baseScheduleList]);




    
    const openUserModal = (id)=>{
        setEditedItem(baseScheduleList.find((el)=> el.id === id));
        setEditedId(id);
        setUserManagerModalOpen(true);
    }
    const cancelUsersModal = ()=>{
        setUserManagerModalOpen(false);
    }

    
    const openEditorModal = (id)=>{
        setEditedItem(baseScheduleList.find((el)=> el.id === id));
        setEditedId(id);
        setEditorModalOpen(true);
    }
    const cancelEditorModal = ()=>{
        setEditorModalOpen(false);
    }


    return (
        <div className={'sk-mw-1400'}>
            <br />
            <h2>Графики работ</h2>
            <SchedToolbar
                companies={companies}
                userData={userdata}
            />
            <br />

            <div className={'sk-sched-1col-body'}>
                <div className={'sk-sched-main-col'}>
                    <SchedList
                        dataSchedules={scheduleList}
                        onOpenEditorModal={openEditorModal}
                        onOpenUserManager={openUserModal}
                    />
                </div>

            </div>

            <div>modal</div>

            <SchedModalEditor
                open={editorModalOpen}
                on_cancel={cancelEditorModal}
                target_id={editedId}
                data={editedIdtem}
                userData={userdata}
                />

            <SchedModalUsers
                open={userManagerModalOpen}
                on_cancel={cancelUsersModal}
                target_id={editedId}
                data={editedIdtem}
                userData={userdata}
                />
        </div>
    )
};

export default SchedManagerPage;
