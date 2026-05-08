import React, {useEffect, useState} from 'react';
import {Button, Modal, Pagination, Radio, Spin, Tag, Tooltip} from "antd";
import {DollarOutlined} from "@ant-design/icons";
import {CSRF_TOKEN, ROUTE_PREFIX} from "../../../CONFIG/config"
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import StateIconsController from "../../CHARTS/components/StateIconsController";
import '../../CHARTS/style/patch.css'
import '../../CLAIM_MANAGER_SK/components/style/claimmanager.css'
import ClaimManagerCard from "../../CLAIM_MANAGER_SK/components/ClaimManagerCard";
import TransportPriceModal from "../../CLAIM_MANAGER_SK/components/TransportPriceModal";

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
    const [upPrice, setUpPrice] = useState(null);
    const [downPrice, setDownPrice] = useState(null);
    const [isOpenTransportPopup, setIsOpenTransportPopup] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchAclBase().then();
        fetchChartStates().then();
        fetchClaims().then();
        get_transport_price().then();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchClaims().then();
    }, [props.doUpdateModal]);

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
            let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/aclskud/getMyAcls`,
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
            try {
                let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getstates`,
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
        // } else {
        //     setChartStates(prepareStates([
        //         {
        //             "id": 0,
        //             "badge": "все",
        //             "text": "Все заявки",
        //             "color": "#c3c3c3",
        //             "icon": "SmileOutlined",
        //             "need_work": 0,
        //             "need_approved": 0,
        //             "sort_order": 0,
        //             "title": "Все заявки",
        //             "name": "Все заявки",
        //             "fillable": 1
        //         },
        //     ]));
        // }
    };

    const fetchClaims = async () => {
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
                    filters.boss_id = null;
                    filters.user_id = null;
                }
                let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getclaims`,
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
        // } else {
        //     setAllClaimsCount(80);
        //     setTimeout(() => setIsLoading(false), 500);
        // }
    };

    const get_transport_price = async () => {
        try {
            let response = await PROD_AXIOS_INSTANCE.get(`${ROUTE_PREFIX}/transport/price`, {});
            if (response.data.content) {
                setUpPrice(response.data.content?.up?.price);
                setDownPrice(response.data.content?.down?.price);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const canUpdatePrices = () => {
        return props?.userData?.user && props?.userData?.acls &&
            (props.userData.user.super || props.userData.user.is_admin || props.userData.acls.find(acl => +acl === 151));
    };

    const transportPriceTooltipTitle = (
        <div>
            <div style={{fontWeight: 600}}>Текущая стоимость проезда</div>
            <div>Наземный: {upPrice ?? '-'}</div>
            <div>Подземный: {downPrice ?? '-'}</div>
            {canUpdatePrices() && <div style={{marginTop: '4px', opacity: 0.85}}>Нажмите, чтобы изменить</div>}
        </div>
    );

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
                    <div
                        className={'sk-content-table-wrapper-claims-modal affix-in-modal'}
                        style={{
                            outline: '2px solid var(--app-soft-surface-color)',
                            backgroundColor: 'var(--app-soft-surface-color)'
                        }}
                    >
                        <div className="sk-claim-list-modal-toolbar">
                            <Radio.Group
                                className="sk-charts-type-radio"
                                value={selectedChartState}
                            >
                                {chartStates.map(state => (
                                    <Radio.Button
                                        key={state.value}
                                        value={state.value}
                                        onClick={() => setSelectedChartState(state.value)}
                                        style={+selectedChartState === +state.value ? {'--chart-radio-active-color': reactiveColor || state.color} : undefined}
                                    >
                                        <span className="sk-charts-type-radio-label">
                                            {state.label}
                                        </span>
                                    </Radio.Button>
                                ))}
                            </Radio.Group>

                            <Tooltip title={transportPriceTooltipTitle}>
                                <div
                                    className="sk_transport_price_wrapper sk_transport_price_wrapper--filters-closed small"
                                    onClick={() => {
                                        if (canUpdatePrices()) {
                                            setIsOpenTransportPopup(true);
                                        }
                                    }}
                                >
                                    <div className={'sk_transport_price_icon small'}>
                                        <DollarOutlined />
                                    </div>
                                    <p className={'sk_transport_price_header small'}>Текущая стоимость проезда</p>
                                    <div className={'sk_transport_price_label_container small'}>
                                        <p className={'sk_transport_price_label'}>Наземный :  <span className={'sk_transport_price'}>{upPrice}</span></p>
                                        <p className={'sk_transport_price_label'}>Подземный: <span className={'sk_transport_price'}>{downPrice}</span></p>
                                    </div>
                                </div>
                            </Tooltip>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: 'var(--app-soft-surface-color)'
                            }}
                        >
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
                                        color: 'var(--app-muted-text-color)',
                                        fontSize: '14px',
                                        backgroundColor: 'var(--row-second-bg-color)',
                                        borderColor: 'var(--table-border-divider-color)',
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
                    <div className="sk-usp-content-col">
                        <div className={'sk-arche-stack'}>
                            <div className="sk-clamen-headerrow affix-in-modal" style={{top: '93px'}}>
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
                                        <Tooltip title={"Количество наземных поездок"}>
                                            <div style={{textAlign: 'center'}}>
                                                🚎
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip title={"Количество подземных поездок"}>
                                            <div style={{textAlign: 'center'}}>
                                                Ⓜ️
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <div>
                                            Сумма
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            {canUpdatePrices() && (
                <TransportPriceModal isOpenTransportPopup={isOpenTransportPopup}
                                     setIsOpenTransportPopup={setIsOpenTransportPopup}
                                     updateCurrentPrices={get_transport_price}
                />
            )}
        </Modal>
    );
}

export default ClaimListModal;
