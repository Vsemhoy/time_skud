import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Affix, Button, Dropdown, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";

import './components/style/claimmanager.css';
import ClaimManagerCard from "./components/ClaimManagerCard";
import ClaimEditorDrawer from "./components/ClaimEditorDrawer";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import dayjs from "dayjs";
import { CSRF_TOKEN, PRODMODE } from "../../CONFIG/config";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import { CLAIM_DEPARTS, CLAIM_STATES, CLAIM_USERS, CLAIMS_MOCKS } from "./CLAIM_MOCK";


const claimTypes = [
    {
        key: 'clt_9',
        value: 9, 
        label: 'Отпуск за свой счёт',
        icon: <MoonOutlined />
    },
    {
        key: 'clt_8',
        value: 8, 
        label: 'Кратковременная командировка',
        icon: <CarOutlined />
    },
    {
        key: 'clt_7',
        value: 7, 
        label: 'Длительная командировка',
        icon: <RocketOutlined />
    },
    {
        key: 'clt_10',
        value: 10, 
        label: 'Отпуск',
        icon: <SmileOutlined />
    },
    {
        key: 'clt_11',
        value: 11, 
        label: 'Сверхурочные',
        icon: <DollarOutlined />
    },
    {
        key: 'clt_6',
        value: 6, 
        label: 'Больничные',
        icon: <MedicineBoxOutlined />
    },
    {
        key: 'clt_13',
        value: 13, 
        label: 'Контейнеры',
        icon: <TruckOutlined />
    }
];

const typeOptions = [
  {
    value: 0,
    label: 'Все заявки',
    icon: <BlockOutlined />,
    background: '#c3c3c3'
  },
  {
    value: 9,
    label: 'Отпуск СВ',
    icon: <MoonOutlined />,
    background: '#c4e8e5'
  },
  {
    value: 8,
    label: 'Крат. ком.',
    icon: <CarOutlined />,
    background: '#e3dbf1'
  },
  {
    value: 7,
    label: 'Длит. ком.',
    icon: <RocketOutlined />,
    background: '#e2b4e9'
  },
  {
    value: 10,
    label: 'Отпуск',
    icon: <SmileOutlined />,
    background: '#7adfb8'
  },
  {
    value: 11,
    label: 'Сверхурочн.',
    icon: <DollarOutlined />,
    background: '#b7ff5c'
  },
  {
    value: 6,
    label: 'Больничн.',
    icon: <MedicineBoxOutlined />,
    background: '#ffa8a8'
  },
  {
    value: 13,
    label: 'Контейн.',
    icon: <DockerOutlined />,
    background: '#ffc107'
  }
];

const ClaimManagerPage = (props) => {
    const [userData, setUserData] = useState(null);
    const [typeSelect, setTypeSelect] = useState(null);
    const [editorOpened, setEditorOpened] = useState(false);

    const [formType, setFormType] = useState(null);
    const [filterPack, setFilterPack] = useState({});

    const [baseUserList, setBaseUserList] = useState([]);
    const [userList, setUserList] = useState([]);


    const [departList, setDepartList] = useState([]);
    const [bossList, setBossList] = useState([]);
    const [baseApproverList, setBaseApproverList] = useState([]);
    const [approverList, setApproverList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [claimList, setClaimList] = useState([]);
    const [baseClaimList, setBaseClaimList] = useState([]);

    const [page, setPage] = useState(1);
    const [onPage, setOnPage] = useState(30);
    const [total, setTotal] = useState(30);

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        setOnPage(pageSize);
    };

    const handleEditorOpen = (value) => {
        if (value && value.key){
            let key = parseInt(value.key.replace('clt_', ''));
            setEditorOpened(true);
            setFormType(key);
        }
    }

    const menuProps = {
        items: claimTypes,
        onClick: handleEditorOpen,
      };

    useEffect(()=>{
        setUserData(props.userdata);
    },[props.userdata]);



    useEffect(()=>{
        if (PRODMODE){
            get_departlist();
            get_stateList();
            get_userList();
            get_approverList();
            get_claimList([]);
        } else {
            //mock data
            setDepartList(CLAIM_DEPARTS);
            setBaseUserList(CLAIM_USERS);
            setStateList(CLAIM_STATES);
            setBaseClaimList(CLAIMS_MOCKS);
        }
    },[]);

    useEffect(()=>{
        setUserList(baseUserList);
    },[baseUserList]);

    useEffect(()=>{
        setClaimList(baseClaimList);
    },[baseClaimList]);

    const handleFilterChanged = (filter) => {

        filter.page = page;
        filter.onPage = onPage;
        setFilterPack(filter);
        console.log('filter', filter)
    }

    useEffect(() => {
      handleFilterChanged(filterPack);
    }, [typeSelect, page, onPage]);


    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            
            let pack = JSON.parse(JSON.stringify(filterPack));
            if (typeSelect !== 0){
                pack.type = typeSelect;
            } else {
                pack.type = null;
            }
            console.log('PACK', pack);
            get_claimList(pack);
        }, 800);
        return () => clearTimeout(debounceTimer);
    }, [filterPack, typeSelect]);

    // ------------------ FetchWorld ----------------------



    const get_claimList = async (filters, req, res) => {
        try {
            console.log("FILTERES" , filters);
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getclaims', 
                {
                    data: filters,
                    _token: CSRF_TOKEN
                });
                setBaseClaimList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const get_userList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getusers', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setBaseUserList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const get_approverList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getapprovers', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setBaseApproverList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const get_stateList = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getstates', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setStateList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const get_departlist = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getdepartments', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                setDepartList(response.data.content);
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const set_claimStatus = async (req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/setclaimstatus', 
                {
                    data: {
                    
                    },
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    const create_claim = async (claimObj, req, res) => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/createclaim', 
                {
                    data: claimObj,
                    _token: CSRF_TOKEN
                });
                console.log('response data => ', response.data);
                get_claimList(filterPack);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }


    // ------------------ FetchWorld ----------------------



    const handleSetTypeSelect = (ev, value) => {

        if (ev.button === 0){
            setTypeSelect(value);
            
        } else if (ev.button === 1 && value !== 0){
            // Средней кнопкой мыши мы открываем редактор
            ev.preventDefault();
            setFormType(value);
            setEditorOpened(true);
        }
    }

    const handleMakeClaim = (claim) => {
        console.log(claim);
        create_claim(claim);
    }

    return (
        <div>
            <div style={{padding: '6px'}} className={'sk-mw-1400'}>
            <br/>



            <div className={'sk-usp-layout-container'}>
                <div>
                <div
                style={{fontSize:'16px', fontWeight:'500', padding: '16px 0px'}}
                    >Менеджер пользовательских заявок</div>
                </div>

                <div className="sk-flex-space"> 
        
                    <div className={`sk-claiman-type-selector`}>
                        {typeOptions.map(option => (
                            <div
                            key={option.value === null ? 'all' : option.value}
                            className={`sk-claiman-typeselect-item ${typeSelect === option.value ? 'sk-active' : ''}`}
                            onMouseDown={(ev)=>{handleSetTypeSelect(ev, option.value)}}
                            style={{ background: option.background }}
                            >
                            <div>
                                <span className="sk-claim-select-icon">{option.icon}</span>
                                <span>{option.label}</span>
                            </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Dropdown
                            menu={menuProps}
                            onClick={handleEditorOpen}
                        >
                        <Button 
                            icon={<PlusOutlined />}
                            type={'primary'}
                        >
                            Создать заявку
                        </Button>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className={'sk-usp-layout-container'}>
                <div className="sk-usp-filter-col">
                    <ClaimManagerSidebar 
                        user_list={baseUserList}
                        depart_list={departList}
                        company_list={userData?.companies}
                        on_change_filter={handleFilterChanged}
                    />
                </div>


                <div >

                    <div>
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={3}
                            total={total}
                            onChange={setPage}
                            defaultPageSize={30}
                            pageSizeOptions={[30,60,100,200,300]}
                        />
                    </div>
                    <br />

                    <div className="sk-usp-content-col">
                        <div className={'sk-arche-stack'}>
                        <Affix offsetTop={0}>
                        <div className="sk-clamen-headerrow">
                        <div className={'sk-clamen-card'}>
                            <div >
                                <div>
                                    id
                                </div>
                            </div>
                            <div >
                                <div>
                                    Имя пользователя
                                </div>
                            </div>
                            <div >
                                <div>
                                    Тип
                                </div>
                            </div>
                            <div >
                                <div>
                                    Начало
                                </div>
                            </div>
                            <div >
                                <div>
                                    Конец
                                </div>
                            </div>
                            <div >
                                <div>
                                    дней
                                </div>
                            </div>
                            <div >
                                <div>
                                    Рук.
                                </div>
                            </div>
                            <div >
                                <div>
                                    Причина
                                </div>
                            </div>
                            <div >
                                <div>
                                    Детали
                                </div>
                            </div>
                            <div >
                                <div>
                                    Статус
                                </div>
                            </div>
                            <div >
                                <div>
                                    
                                </div>
                            </div>

                        </div>



                        </div>
                        </Affix>
                        {claimList.map((claim) => (
                            <ClaimManagerCard data={claim} />
                        ))}
                            

                        </div>
                    </div>




                </div>
            </div>
            
            </div>

            <ClaimEditorDrawer
                user_list={userList}
                opened={editorOpened}
                claim_type={formType}
                on_close={()=>{setEditorOpened(false)}}
                claim_types={claimTypes}
                on_send={handleMakeClaim}
            />
        </div>
    )
}

export default ClaimManagerPage;