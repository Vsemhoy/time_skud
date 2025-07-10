import React, { useEffect, useState } from "react";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { DS_PROD_CALENDARS, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import ProdCalToolbar from "./components/ProdCalToolbar";
import ProdCalItemCard from "./components/ProdCalItemCard";
import ProdCalModal from "./components/ProdCalModal";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import dayjs from "dayjs";
import {Affix, Button, Empty, Layout, Pagination, Spin, Tag} from "antd";

import {EditOutlined, FilterOutlined, PlusOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";
import RuleEditorModal from "../RULE_MANAGER/components/ruleeditormodal";
import Cookies from "js-cookie";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";




const { Header, Sider, Content } = Layout;


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
    const [calendarList, setCalendarList] = useState(!PRODMODE ? DS_PROD_CALENDARS : []);
    const [baseCalendarList, setBaseCalendarList] = useState(!PRODMODE ? DS_PROD_CALENDARS : []);
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

        if (!PRODMODE){
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
    /**
     * БОГДАН
     */
    const prepareSelectOptions = (name, options) => {
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

    const handleFilterChanged = async (filterParams) => {
        if (isMounted) {
        //     await fetchInfo(filterParams);
        }
    };
    /**
     * БОГДАН
     */

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
                                    // current_rules_list={prepareSelectOptions('current_rules_list', currentRules)}
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
                                        // current={currentPage}
                                        // total={count}
                                        // pageSize={pageSize}
                                        pageSizeOptions={[10, 50, 100]}
                                        locale={{
                                            items_per_page: 'на странице',
                                            jump_to: 'Перейти',
                                            jump_to_confirm: 'OK',
                                            page: 'Страница'
                                        }}
                                        // onShowSizeChange={(current, newSize) => handleChangePageSize(newSize)}
                                        // onChange={(page) => handlePageChange(page)}
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
                                    >Всего найдено: {0}</Tag>
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
                {/*                {baseRuleList.map((rule, index) => (*/}
                {/*                    <div key={`${rule.id}-${index}`}*/}
                {/*                         className="sk-department-block"*/}
                {/*                    >*/}
                {/*                        <div className="sk-department-header"*/}
                {/*                             onDoubleClick={() => openCloseRules(rule.id)}*/}
                {/*                        >*/}
                {/*                            <div className="sk-department-header-hover-container">*/}

                {/*                                /!*<RuleIcons type={rule.rule_type_id} />*!/*/}

                {/*                                <p className="sk-department-header-p">{rule.id}</p>*/}
                {/*                                <p className="sk-department-header-p" style={{flexGrow: 1}}>{rule.name}</p>*/}

                {/*                                <Tag title={rule.id}*/}
                {/*                                     color={rule.company_color}>{rule.company_name.toUpperCase()}</Tag>*/}
                {/*                                <div style={{display: 'inline-block', marginRight: '10px'}}*/}
                {/*                                     title="пользователей">{rule.users_count ?? 0} <UserOutlined/></div>*/}
                {/*                                <div className={'sk-card-call-to-modal'}*/}
                {/*                                     onClick={() => onOpenModalEditor(rule.id)}*/}
                {/*                                >*/}
                {/*                                    <EditOutlined/>*/}
                {/*                                </div>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                        {closedRules.find(item => item === rule.id) && (*/}
                {/*                            <div className="sk-person-rows">*/}
                {/*                                {users.map((user, idx) => {*/}
                {/*                                    if (userRules[user.id]?.includes(+rule.id)) {*/}
                {/*                                        return (*/}
                {/*                                            <div key={`${user.id}-${idx}`} className={`sk-person-row`}>*/}
                {/*                                                <div className="sk-person-row-basic">*/}
                {/*                                                    <div className="sk-person-row-basic-hover-container">*/}
                {/*                                                        <p className="sk-person-row-p">{user.id}</p>*/}
                {/*                                                        <div className="sk-person-row-content">*/}
                {/*                                                            <p className="sk-person-row-p">{`${user.surname} ${user.name} ${user.patronymic}`}</p>*/}
                {/*                                                            <p className="sk-person-row-p occupy">{user.occupy}</p>*/}
                {/*                                                        </div>*/}
                {/*                                                        <NavLink to={'/hr/users/' + user.id + "/rules"}>*/}
                {/*                                                            <Button color={'default'}*/}
                {/*                                                                    variant={'outlined'}*/}
                {/*                                                                    icon={<EditOutlined/>}*/}
                {/*                                                            >Редактировать</Button>*/}
                {/*                                                        </NavLink>*/}
                {/*                                                    </div>*/}
                {/*                                                </div>*/}
                {/*                                            </div>*/}
                {/*                                        );*/}
                {/*                                    }*/}
                {/*                                    return '';*/}
                {/*                                })}*/}
                {/*                            </div>*/}
                {/*                        )}*/}
                {/*                    </div>*/}
                {/*                ))}*/}
                            </div>
                        </Spin>
                    </div>
                </Content>
            </Layout>

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
        </Layout>
    )
};

export default ProdCalManagerPage;

/**
 *
 *         <div className={'sk-mw-1000'}>
 *             <br/>
 *             <h2>Производственные календари!</h2>
 *             <ProdCalToolbar
 *                 userData={userdata}
 *                 companies={companies}
 *                 onAddNewClick={openModal}
 *                 onChangeCompany={changeCompany}
 *                 allow_delete={allowDeleteSet}
 *             />
 *             <br/>
 *
 *             <div className={'sk-calendar-list'}>
 *                 {
 *                     calendarList.map((jcal)=>(
 *                         <ProdCalItemCard
 *                          onOpenModal={openModal}
 *                          data={jcal}
 *                          key={`clitem_${jcal.id}`}
 *                          allow_delete={allowDeleteSet}
 *                         />
 *                     ))
 *                 }
 *                 {calendarList.length === 0 ? (
 *                     <Empty description={"Ничего не найдено"}/>
 *                 ): ""}
 *
 *             </div>
 *
 *             <ProdCalModal
 *                 userData={userdata}
 *                 is_open={isModalOpen}
 *                 onClose={closeModal}
 *                 data={editedItem}
 *                 onSave={saveCalendar}
 *                 allow_delete={allowDelete}
 *                 onDelete={delete_calendar}
 *                 data_list={baseCalendarList}
 *             />
 *         </div>
 */