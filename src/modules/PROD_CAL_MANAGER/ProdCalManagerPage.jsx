import React, { useEffect, useState } from "react";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { DS_USER } from "../../CONFIG/DEFAULTSTATE";
import ProdCalItemCard from "./components/ProdCalItemCard";
import ProdCalModal from "./components/ProdCalModal";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import dayjs from "dayjs";
import {Affix, Button, Empty, Layout, Pagination, Spin, Tag} from "antd";

import {FilterOutlined, PlusOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import {YEARS, PROD_CALENDARS, COMPANIES} from "./mock/mock";

const { Header, Sider, Content } = Layout;

const ProdCalManagerPage = (props) => {
    const { userdata } = props;

    const prepareSelectOptions = (name, options) => {
        console.log(options);
        return options.map((option) => {
            return ({
                key: `option-${name}-${option.id}`,
                value: option.id,
                label: option.name
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

    const [isOpenFilters, setIsOpenFilters] = useCookieState('prod_manager_filters', true);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [filtersState, setFiltersState] = useState([]);
    const [years, setYears] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [callToOpen, setCallToOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({id: null});
    const [calendarList, setCalendarList] = useState([]);
    const [allowDelete , setAllowDelete] = useState(false);
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        fetchInfo().then(() => {
            setIsMounted(true);
        });
    }, []);

    useEffect(()=>{
        if (callToOpen == true){
            setIsModalOpen(true);
            setCallToOpen(false);
        }
    }, [editedItem, callToOpen]);

    const handleFilterChanged = async (filterParams) => {
        if (isMounted) {
            await fetchInfo(filterParams);
        }
    };

    const fetchInfo = async (filterParams) => {
        setIsLoading(true);
        await fetchCalendars(filterParams);
        await fetchFilters();
        if (PRODMODE) {
            setIsLoading(false);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };

    const fetchCalendars = async (filterParams) => {
        if (PRODMODE) {
            try {
                setFiltersState(filterParams);
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars_get',
                    {
                        data: {filterParams, pageSize, currentPage},
                        _token: CSRF_TOKEN
                    });
                setCalendarList(response.data.content.calendars);
                setCount(response.data.content.count);
                // Обновление состояния archieved календарей в соответствии с текущим годом
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    if (parseInt(element.year) === dayjs().year() && element.archieved !== 0){
                        element.archieved = 0;
                        await fetchUpdateCalendar(element);
                    } else if (parseInt(element.year) < dayjs().year() && element.archieved !== 1){
                        element.archieved = 1;
                        await fetchUpdateCalendar(element);
                    } else if (parseInt(element.year) > dayjs().year() && element.archieved !== -1){
                        element.archieved = -1;
                        await fetchUpdateCalendar(element);
                    };
                }
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setCalendarList(PROD_CALENDARS);
        }
    }

    const fetchFilters = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/v2/prodcalendar/filterselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    setCompanies(serverResponse.data.content.companies);
                    setYears(serverResponse.data.content.years);
                }

                console.log('Response data as JSON:', JSON.stringify(serverResponse.data.content, null, 2));

            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setCompanies(COMPANIES);
            setYears(YEARS);

            console.log("XKHJGBKFJDHS", YEARS);
        }
    };

    const fetchDeleteCalendar = async (body) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.delete('/api/timeskud/prodcalendar/prodcalendars/' + body.id + '?_token=' + CSRF_TOKEN,
                {
                    data: body,
                    _token: CSRF_TOKEN
                }
            );

            await fetchCalendars(filtersState)
        } catch (e) {
            console.log(e)
        }

        setIsModalOpen(false);
        setAllowDelete(false);
    }

    const fetchUpdateCalendar  = async (body) => {
        console.log('body',body);
        try {
            let response = await PROD_AXIOS_INSTANCE.put('/api/timeskud/prodcalendar/prodcalendars/' + body.id,
                {
                    data: body,
                    _token: CSRF_TOKEN
                }
            );
            console.log('users', response);
           await fetchCalendars(filtersState);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchCreateCalendar = async (body) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/prodcalendar/prodcalendars',
                {
                    data: body,
                    _token: CSRF_TOKEN
                });

            await fetchCalendars(filtersState);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchGetCalendarItem = async (item_id) => {
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

    const handleChangePageSize = (value) => {
        setPageSize(value);
    };

    const handlePageChange = (value) => {
        setCurrentPage(value);
    };

    const allowDeleteSet = (value)=>{
        setAllowDelete(value);
        console.log('value', value);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setAllowDelete(false);
    };

    const saveCalendar = (data)=>{
        if (data.id == null)
        {
            fetchCreateCalendar(data);
        } else {
            fetchUpdateCalendar(data);
        }
        setAllowDelete(false);
    }

    const openModal = (item_id) => {
        console.log('item_id', item_id);
        if (item_id == null){
            setEditedItem({id: null});
            setCallToOpen(true);
            return;
        }

        if (!PRODMODE){
            let item = PROD_CALENDARS.find((el)=>el.id === item_id);
            setEditedItem(item);
            setCallToOpen(true);
        } else {
            fetchGetCalendarItem(item_id);
        }

        // setIsModalOpen(true);
        // console.log('Opened');
    };

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
                        <h1 className={'page-header'}>Производственные календари</h1>
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
                                    years_list={prepareSelectOptions('years', years)}
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
                                        total={count}
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
                                    >Всего найдено: {count}</Tag>
                                </div>
                                <Button color={'primary'}
                                        variant={'outlined'}
                                        icon={<PlusOutlined/>}
                                        style={{ width: '125px' }}
                                        onClick={openModal}
                                >Создать</Button>
                            </div>
                        </Affix>
                        <Spin tip="Ожидайте" spinning={isLoading} style={{width: '100%', height: '100%'}}>
                            <div className="sk-content-table">
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
                        </Spin>
                    </div>
                </Content>
            </Layout>

            {(userdata && userdata?.companies  && userdata.companies?.length > 0) ? (
                <ProdCalModal
                    userData={userdata}
                    is_open={isModalOpen}
                    onClose={closeModal}
                    data={editedItem}
                    onSave={saveCalendar}
                    allow_delete={allowDelete}
                    onDelete={fetchDeleteCalendar}
                    data_list={calendarList}
                />
            ) : (" ")}
        </Layout>
    )
};

export default ProdCalManagerPage;
