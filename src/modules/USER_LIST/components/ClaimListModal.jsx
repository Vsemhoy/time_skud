import React, {useEffect, useState} from 'react';
import {Affix, Button, ConfigProvider, Modal, Pagination, Segmented, Spin, Tag} from "antd";
import styles from "../../CHARTS/style/charts.module.css";
import MonthsRange from "../../CHARTS/components/MonthsRange";
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {CHART_STATES, USERS_PAGE} from "../../CHARTS/mock/mock";
import StateIconsController from "../../CHARTS/components/StateIconsController";
import '../../CHARTS/style/patch.css'
import {CLAIMS_MOCKS} from "../../CLAIM_MANAGER_SK/CLAIM_MOCK";
import ClaimManagerCard from "../../CLAIM_MANAGER_SK/components/ClaimManagerCard";

const ClaimListModal = (props) => {

    const [isLoading, setIsLoading] = useState(false);

    const [chartStates, setChartStates] = useState([]);
    const [selectedChartState, setSelectedChartState] = useState(0);
    const [reactiveColor, setReactiveColor] = useState('#fff');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [allClaimsCount, setAllClaimsCount] = useState(0);

    const [claimsPage, setClaimsPage] = useState(null);

    const [myClaims, setMyClaims] = useState(true);
    const [mySubjects, setMySubjects] = useState(false);

    const [aclBase, setAclBase] = useState({});
    const [selectedClaimId, setSelectedClaimId] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        fetchAclBase().then();
        fetchChartStates().then();
        fetchClaims().then();
    }, []);

    useEffect(() => {
        if (chartStates && chartStates.length > 0) {
            setReactiveColor((chartStates.find(item => item.value === selectedChartState))?.color)
        }
    }, [chartStates, selectedChartState]);

    useEffect(() => {
        setIsLoading(true);
        fetchClaims().then();
    }, [currentPage, pageSize, selectedChartState, myClaims, mySubjects]);

    const fetchAclBase = async () => {
        try {
            let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/aclskud/getMyAcls',
                {
                    data: [],
                    _token: CSRF_TOKEN
                });
            setAclBase(response.data.content);
            console.log('response data => ', response.data);
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const fetchChartStates = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getstates',
                    {
                        _token: CSRF_TOKEN
                    });
                if (response.data.content) {
                    setChartStates(prepareStates([
                        {
                            "id": 0,
                            "badge": "все",
                            "text": "Все заявки",
                            "color": "#c3c3c3",
                            "icon": "SmileOutlined",
                            "need_work": 0,
                            "need_approved": 0,
                            "sort_order": 0,
                            "title": "Все заявки",
                            "name": "Все заявки",
                            "fillable": 1
                        },
                        ...response.data.content
                    ]));
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setChartStates(prepareStates([
                {
                    "id": 0,
                    "badge": "все",
                    "text": "Все заявки",
                    "color": "#c3c3c3",
                    "icon": "SmileOutlined",
                    "need_work": 0,
                    "need_approved": 0,
                    "sort_order": 0,
                    "title": "Все заявки",
                    "name": "Все заявки",
                    "fillable": 1
                },
                ...CHART_STATES
            ]));
        }
    };

    const fetchClaims = async () => {
        if (PRODMODE) {
            try {
                const filters = {};
                filters.type = selectedChartState;
                filters.page = currentPage;
                filters.onPage = pageSize;
                if (mySubjects){
                    filters.boss_id = props?.userData?.user?.id;
                } else if (myClaims){
                    filters.user_id = props?.userData?.user?.id;
                } else {
                    filters.boss_id = props?.userData?.user?.id;
                    filters.user_id = props?.userData?.user?.id;
                }
                let response = await PROD_AXIOS_INSTANCE.post('/api/timeskud/claims/getclaims',
                    {
                        data: filters,
                        _token: CSRF_TOKEN
                    });
                setClaimsPage(response.data.content);
                setAllClaimsCount(response.data.total);
                setTimeout(() => setIsLoading(false), 500);
            } catch (e) {
                console.log(e);
            }
        } else {
            setClaimsPage(CLAIMS_MOCKS);
            setAllClaimsCount(80);
            setTimeout(() => setIsLoading(false), 500);
        }
    };

    const prepareStates = (states) => {
        return states.filter(state => state.fillable).map(state => ({
            label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StateIconsController IdState={state.id} />
                    <span>{state.title}</span>
                </div>
            ),
            value: state.id,
            color: state.color,
            name: state.name
        }))
    };

    const handleOpenInfo = (id, obj) => {
        props.on_click(id, obj);
        setSelectedClaimId(id);
    };

    const handleApproveEvent = (id, type)=> {
        props.on_approve(id);
        setSelectedClaimId(0);
    };

    const handleDeclineEvent = (id, type)=> {
        props.on_decline(id);
        setSelectedClaimId(0);
    };

    const handleEditEvent = (id, obj)=> {
        props.on_edit(id, obj);
        setSelectedClaimId(id);
    };

    const handleGetBackEvent = (id)=> {
        props.on_get_back(id);
        setSelectedClaimId(0);
    };

    return (
        <Modal
            title="Список заявок"
            closable={{ 'aria-label': 'Custom Close Button' }}
            footer={null}
            open={props?.isOpenClaimsModal}
            onCancel={props?.handleCloseClaimModal}
            width={'90vw'}
            styles={{
                body: {
                    height: "70vh",
                    overflowY: "auto"
                }
            }}
        >
            <div style={{width: '100%', height: '100%'}}>
                <Spin spinning={isLoading}>
                    <Affix offsetTop={0}>
                        <div className={'sk-content-table-wrapper-claims-modal'} style={{outline: '2px solid #f3f3f3', backgroundColor: '#f3f3f3'}}>
                            <div style={{paddingTop: '5px'}}>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Segmented: {
                                                itemSelectedBg: reactiveColor,
                                                itemSelectedColor: 'black',
                                                height: '150px'
                                            },
                                        },
                                    }}
                                >
                                    <Segmented
                                        value={selectedChartState}
                                        options={chartStates}
                                        onChange={value => setSelectedChartState(value)}
                                    />
                                </ConfigProvider>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <div className="sk-pagination-container">
                                    <Pagination
                                        current={currentPage}
                                        total={allClaimsCount}
                                        pageSize={pageSize}
                                        pageSizeOptions={[10, 20, 30]}
                                        locale={{
                                            items_per_page: 'на странице',
                                            jump_to: 'Перейти',
                                            jump_to_confirm: 'OK',
                                            page: 'Страница'
                                        }}
                                        onShowSizeChange={(current, newSize) => setPageSize(newSize)}
                                        onChange={(page) => setCurrentPage(page)}
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
                                    >Всего найдено: {allClaimsCount}</Tag>
                                </div>
                                <div className="sk-pagination-container">
                                    <Button color={'default'}
                                            variant={myClaims ? 'solid' : 'outlined'}
                                            style={{width: '140px'}}
                                            onClick={(ev) => {
                                                setMySubjects(false);
                                                setMyClaims(!myClaims);
                                            }}
                                    >Мои заявки</Button>
                                    <Button color={'default'}
                                            variant={mySubjects ? 'solid' : 'outlined'}
                                            style={{width: '140px'}}
                                            onClick={(ev) => {
                                                setMyClaims(false);
                                                setMySubjects(!mySubjects);
                                            }}
                                    >Мои сотрудники</Button>
                                </div>
                            </div>
                        </div>
                    </Affix>
                    <div className="sk-usp-content-col">
                        <div className={'sk-arche-stack'}
                             style={{paddingBottom: '44vw'}}
                        >
                            <Affix offsetTop={0}>
                                <div className="sk-clamen-headerrow">
                                    <div className={'sk-clamen-card'}>
                                        <div>
                                            <div>
                                                Тип
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Пользователь
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Статус
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Начало
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Конец
                                            </div>
                                        </div>
                                        <div>
                                            <div title="количество дней в заявке">
                                                Дней
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Информация
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                id
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Исп
                                            </div>
                                        </div>
                                        <div>
                                            <div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Affix>
                            {claimsPage && claimsPage.map((claim, idx) => (
                                <ClaimManagerCard
                                    key={`${claim.id}-ClaimManagerCard-${idx}`}
                                    data={claim}
                                    my_id={props?.userData?.user?.id}
                                    acl_base={aclBase}
                                    selected={claim.id === selectedClaimId}
                                    on_click={handleOpenInfo}
                                    on_approve={handleApproveEvent}
                                    on_decline={handleDeclineEvent}
                                    on_edit={handleEditEvent}
                                    on_get_back={handleGetBackEvent}
                                />
                            ))}
                        </div>
                    </div>
                </Spin>
            </div>
        </Modal>
    );
}

export default ClaimListModal;
