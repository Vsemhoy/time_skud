import React, { useEffect, useState } from "react";
import { Affix, Button, Layout, Pagination, Spin, Tag } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import dayjs from "dayjs";

import { PROD_AXIOS_INSTANCE } from "../../API/API";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import ClaimManagerSidebar from "../SCHED_MANAGER/components/ClaimManagerSidebar";
import SchedListRow from "./components/SchedListRow";
import SchedModalEditor from "./components/SchedModalEditor";
import './components/style/schedmanager.css';
import {
    COMPANIES, PROD_CALENDARS, SCHED_TYPES, SCHEDULE_LIST
} from "./mock/mock";

const { Header, Sider, Content } = Layout;

const SchedManagerPage = (props) => {
    const { userdata } = props;

    useEffect(() => {
      console.log("PROPS", props);
    }, [props]);

    const prepareSelectOptions = (name, options) => {
        return options.map((option) => {
            return ({
                key: `option-${name}-${option.id}`,
                value: option.id,
                label: option.name,
                description: option.description,
            })
        });
    }

    const useCookieState = (key, defaultValue) => {
        const [state, setState] = useState(() => {
            const saved = Cookies.get(key);
            return saved ? JSON.parse(saved) : defaultValue;
        });

        useEffect(() => {
            Cookies.set(key, JSON.stringify(state), { expires: 365 });
        }, [key, state]);

        return [state, setState];
    };

    const [isOpenFilters,            setIsOpenFilters]     = useCookieState('rule_manager_filters', true);
    const [companies,         setCompanies]         = useState([]);
    const [isLoading,       setIsLoading]         = useState(false);
    const [isMounted,       setIsMounted]         = useState(false);
    const [currentPage,     setCurrentPage]       = useState(1);
    const [pageSize,        setPageSize]          = useState(10);
    const [filtersState,      setFiltersState]      = useState([]);
    const [baseProdCalendars, setBaseProdCalendars] = useState([]);
    const [scheduleList,      setScheduleList]      = useState([]);
    const [scheduleTypes,     setScheduleTypes]     = useState([]);
    const [ctrlKey,         setCtrlKey]           = useState(false);
    const [editorModalOpen, setEditorModalOpen]   = useState(false);
    const [editedId,                 setEditedId]          = useState(null);
    const [editedIdtem,              setEditedItem]        = useState(null);
    const [totalCount,      setTotalCount]        = useState(0);

    useEffect(() => {
        fetchInfo().then(() => {
            setIsMounted(true);
        });
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [pageSize, currentPage]);

    const fetchInfo = async (filterParams) => {
        setIsLoading(true);
        await fetchSchedules(filterParams);
        await fetchFilters();
        await fetchProdCalendars();
        // await fetchScheduleTypes();
        // await fetchUsers();
        if (PRODMODE) {
            setIsLoading(false);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };

    const fetchFilters = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/v2/schedule/filterselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );

                if (serverResponse.data.content) {
                    setCompanies(serverResponse.data.content.companies);
                    setScheduleTypes(serverResponse.data.content.schedule_types);
                }

            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setCompanies(COMPANIES);
            setScheduleTypes(SCHED_TYPES);
        }
    };

    const fetchSchedules = async (filterParams) => {
        if (PRODMODE) {
            try {
                setFiltersState(filterParams);
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedule/schedule_get',
                    {
                        data: {filterParams, pageSize, currentPage},
                        _token: CSRF_TOKEN
                    }
                );

                setScheduleList(response.data.content.schedules);
                setTotalCount(response.data.content.count);
                console.log('Response data as JSON:', JSON.stringify(response.data.content, null, 2));
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setScheduleList(SCHEDULE_LIST);
            setTotalCount(5);
        }
    }

    const fetchProdCalendars = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars_get',
                    {
                        data: {},
                        _token: CSRF_TOKEN
                    });
                setBaseProdCalendars(response.data);
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setBaseProdCalendars(PROD_CALENDARS);
        }
    }

    const fetchCreateSchedule = async (body) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedule/schedule',
                {
                    data: body,
                    _token: CSRF_TOKEN
                },
            );
            console.log('response', response);
            if (response.data.data){
                if (body.skud_schedule_type_id < 3){
                    let data = {};
                    data.start_time = body.schedule[1];
                    data.end_time = body.schedule[2];
                    data.enabled_at = body.schedule[0];
                    data.skud_schedule_id = response.data.data.id;
                    data.skud_schedule_type_id = body.skud_schedule_type_id;

                    await fetchUpdateScheduleHistory(data);
                }
            }

            await fetchSchedules(filtersState);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchUpdateSchedule = async (body) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/schedule/schedule/' + body.id,
                {
                    data: body,
                    _token: CSRF_TOKEN
                }
            );
            console.log('users', response);

            if (body.skud_schedule_type_id < 3 &&
                response.data ){
                console.log("I UPDATE HISTORY!!!");
                let data = {};
                data.start_time = body.schedule[1];
                data.end_time = body.schedule[2];
                data.enabled_at = body.schedule[0];
                data.skud_schedule_id = response.data.id;
                data.skud_schedule_type_id = body.skud_schedule_type_id;
                console.log(data, body);
                await fetchUpdateScheduleHistory(data);
            }
            setTimeout(fetchSchedules(filtersState), 200);

            console.log(filtersState);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchUpdateScheduleHistory = async (body) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/schedulehistory/schedulehistory',
                {
                    data: body,
                    _token: CSRF_TOKEN
                }
            );
        } catch (e) {
            console.log(e)
        }
    }

    const handleFilterChanged = async (filterParams) => {
        if (isMounted) {
            await fetchInfo(filterParams);
        }
    };

    const handleChangePageSize = (value) => {
        setPageSize(value);
    };

    const handlePageChange = (value) => {
        setCurrentPage(value);
    };

    const openBlankEditor = () =>{
        setEditedId(null);
        setEditedItem(
            {
                created_at: dayjs().unix(),
                id_company: userdata.user.id_company,
                // company_name: "Arstel",
                // company_color: "#229900",
                skud_schedule_type_id: 1,
                name: "Новый график",
                description: "...",
                start_time: dayjs().unix(),
                end_time: dayjs().unix(),
                target_time: (60*60*8),
                target_unit: 1,
                lunch_start: (60*60*13),
                lunch_end: (60*60*15),
                lunch_time: (60*45),
                schedule: [],
                next_id: null,
                deleted: 0,
                skud_prod_calendar_id: 0,
            }
        );
        setEditorModalOpen(true);
    }

    const openEditorModal = (id, event)=>{
        if (event && event.ctrlKey){
            setCtrlKey(true);
        } else {
            setCtrlKey(false);
        }
        setEditedId(id);
        setEditorModalOpen(true);
    }

    const cancelEditorModal = ()=>{
        setEditorModalOpen(false);
        setCtrlKey(false);
    }

    const saveScheduleForm = (item)=>{
        console.log(item);
        if (item.id){
            fetchUpdateSchedule(item);
        } else {
            fetchCreateSchedule(item);
            setEditedId(null);
            setEditedItem(null);
            setEditorModalOpen(false);
        }
    }

    return (
        <Layout className={'layout'}>
            <Header className={'header'}>
                <Affix>
                    <div className={'sk-header-container'}>
                        <Button color={'default'}
                                variant={isOpenFilters ? 'solid' : 'outlined'}
                                icon={<FilterOutlined />}
                                style={{ width: '125px' }}
                                onClick={() => setIsOpenFilters(!isOpenFilters)}
                        >Фильтры</Button>
                        <h1 className={'page-header'}>Графики работ</h1>
                        <div></div>
                    </div>
                </Affix>
            </Header>
            <Layout className="sk-layout-center">
                <Sider width={isOpenFilters ? "330px" : 0} className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}>
                    <Affix offsetTop={54}>
                        <div className="sk-width-container">
                            <div className="sk-usp-filter-col">
                                <ClaimManagerSidebar
                                    company_list={prepareSelectOptions('company', companies)}
                                    schedules_types_list={prepareSelectOptions('schedule', scheduleTypes)}
                                    on_change_filter={handleFilterChanged}
                                />
                            </div>
                        </div>
                    </Affix>
                </Sider>
                <Content className="content">
                    <div className="sk-content-table-wrapper">
                        <Affix offsetTop={44}>
                            <div className="sk-pagination-wrapper">
                                <div className="sk-pagination-container">
                                    <Pagination
                                        current={currentPage}
                                        total={totalCount}
                                        pageSize={pageSize}
                                        pageSizeOptions={[10, 50, 100]}
                                        locale={{
                                            items_per_page: 'на странице',
                                            jump_to: 'Перейти',
                                            jump_to_confirm: 'OK',
                                            page: 'Страница'
                                        }}
                                        onShowSizeChange={(current, newSize) => handleChangePageSize(newSize)}
                                        onChange={(page) => handlePageChange(page)}
                                    />

                                    <Tag
                                        style={{
                                            width: '160px',
                                            height: '30px',
                                            lineHeight: '27px',
                                            textAlign: 'center',
                                            color: '#868686',
                                            fontSize: '14px',
                                            backgroundColor: '#ededed',
                                            borderColor: '#ededed',
                                        }}
                                    >Всего найдено: {totalCount}</Tag>
                                </div>
                                <Button color={'primary'}
                                        variant={'outlined'}
                                        icon={<PlusOutlined/>}
                                        style={{ width: '125px' }}
                                        onClick={openBlankEditor}
                                >Создать</Button>
                            </div>
                        </Affix>
                        <Spin tip="Ожидайте" spinning={isLoading} style={{width: '100%', height: '100%'}}>
                            <div className="sk-content-table">
                                {scheduleList.map((item, index) => (
                                    <SchedListRow key={index} data={item}
                                        onOpenEditorModal={openEditorModal}
                                        users_count={item.users_count}
                                    />
                                ))}
                            </div>
                        </Spin>
                    </div>
                </Content>
            </Layout>
        {(userdata && userdata?.companies  && userdata.companies?.length > 0) ? (
            <div>
                <SchedModalEditor
                    open={editorModalOpen}
                    on_cancel={cancelEditorModal}
                    on_save={saveScheduleForm}
                    target_id={editedId}
                    data={editedIdtem}
                    userData={userdata}
                    prodCalendars={baseProdCalendars}
                    schedTypes={scheduleTypes}
                    ctrl_key={ctrlKey}
                />
            </div>
        ) : (" ")}

        </Layout>
    )
};

export default SchedManagerPage;