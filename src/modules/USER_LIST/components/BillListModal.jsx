import React, {useEffect, useState} from 'react';
import {Button, Modal, Select, Spin, Tag, Tooltip} from "antd";
import './style/bill_list_modal.css'
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import dayjs from "dayjs";

const BillListModal = (props) => {
    const [isLoadingFilters, setIsLoadingFilters] = useState(false);
    const [isLoadingBillList, setIsLoadingBillList] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const [usersOptions, setUsersOptions] = useState(null);
    const monthsOptions = ([
        {
            id: 1,
            name: 'Январь'
        },
        {
            id: 2,
            name: 'Февраль'
        },
        {
            id: 3,
            name: 'Март'
        },
        {
            id: 4,
            name: 'Апрель'
        },
        {
            id: 5,
            name: 'Май'
        },
        {
            id: 6,
            name: 'Июнь'
        },
        {
            id: 7,
            name: 'Июль'
        },
        {
            id: 8,
            name: 'Август'
        },
        {
            id: 9,
            name: 'Сентябрь'
        },
        {
            id: 10,
            name: 'Октябрь'
        },
        {
            id: 11,
            name: 'Ноябрь'
        },
        {
            id: 12,
            name: 'Декабрь'
        },
    ]);
    const yearsOptions = ([
        {
            id: 2020,
            name: 2020
        },
        {
            id: 2021,
            name: 2021
        },
        {
            id: 2022,
            name: 2022
        },
        {
            id: 2023,
            name: 2023
        },
        {
            id: 2024,
            name: 2024
        },
        {
            id: 2025,
            name: 2025
        },
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
    const [selectedYear, setSelectedYear] = useState(dayjs().year());

    const [billListInfo, setBillListInfo] = useState(null);

    useEffect(() => {
        if (!isMounted) {
            fetchFiltersOptions().then(() => {
                setIsMounted(true);
            });
        }
    }, []);
    useEffect(() => {
        if (isMounted && selectedUser && selectedMonth && selectedYear) {
            const timer = setTimeout(() => {
                fetchBillListInfo().then();
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [selectedUser, selectedMonth, selectedYear]);
    useEffect(() => {
        if (props.userdata && props.userdata.user && props.userdata.user.id) {
            setSelectedUser(props.userdata.user.id);
        }
    }, [props.userdata]);

    const fetchFiltersOptions = async () => {
        if (PRODMODE) {
            try {
                setIsLoadingFilters(true);
                let response = await PROD_AXIOS_INSTANCE.post('',
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (response.data.content) {
                    const filters = response.data.content.filters;
                    setUsersOptions(filters.users);
                }
                setIsLoadingFilters(false);
            } catch (e) {
                console.log(e);
                setIsLoadingFilters(false);
            }
        } else {
            setIsLoadingFilters(true);
            setUsersOptions([
                {
                    id: 46,
                    name: 'Коваленко Оллолошка'
                },
                {
                    id: 47,
                    name: 'Додиков Валера'
                },
                {
                    id: 48,
                    name: 'Мистичный Мэн'
                },
            ]);
            setTimeout(() => setIsLoadingFilters(false), 500);
        }
    };
    const fetchBillListInfo = async () => {
        if (PRODMODE) {
            try {
                setIsLoadingBillList(true);
                let response = await PROD_AXIOS_INSTANCE.post('',
                    {
                        data: {
                            user: selectedUser,
                            month: selectedMonth,
                            year: selectedYear
                        },
                        _token: CSRF_TOKEN
                    }
                );
                if (response.data.content) {
                    setBillListInfo(response.data.content);
                }
                setIsLoadingBillList(false);
            } catch (e) {
                console.log(e);
                setIsLoadingBillList(false);
            }
        } else {
            setIsLoadingBillList(true);
            setBillListInfo(null);
            setTimeout(() => setIsLoadingBillList(false), 500);
        }
    };

    const prepareOptions = (options) => {
        return options ? options.map(option => ({
            value: option.id,
            label: option.name,
        })) : null;
    }

    return (
        <Modal
            title="Расчетный лист офис"
            closable={{ 'aria-label': 'Custom Close Button' }}
            footer={null}
            open={props?.isOpenBillListModal}
            onCancel={props?.handleCloseBillListModal}
            width={'90vw'}
            styles={{
                body: {
                    minHeight: "70vh",
                    overflowY: "auto"
                }
            }}
        >
            <div className={'bill-list-modal-container'}>
                <Spin spinning={isLoadingFilters}
                      size={'large'}
                >
                    <div className={'bill-list-modal-header-wrapper'}>
                        <div className={'bill-list-modal-header'}>
                            <Select placeholder={'Сотрудник'}
                                    style={{width: '300px'}}
                                    options={prepareOptions(usersOptions) ?? []}
                                    value={selectedUser}
                                    onChange={setSelectedUser}
                            />
                            <Select placeholder={'Месяц'}
                                    style={{width: '150px'}}
                                    options={prepareOptions(monthsOptions) ?? []}
                                    value={selectedMonth}
                                    onChange={setSelectedMonth}
                            />
                            <Select placeholder={'Год'}
                                    style={{width: '150px'}}
                                    options={prepareOptions(yearsOptions) ?? []}
                                    value={selectedYear}
                                    onChange={setSelectedYear}
                            />
                        </div>
                        <Tooltip title={'По выбранному году и месяцу'}>
                            <Button>Выгрузить данные по всем</Button>
                        </Tooltip>
                    </div>
                </Spin>
                <Spin spinning={isLoadingBillList}
                      tip={'Загружаем расчетный лист офис...'}
                      size={'large'}
                >
                    <div className={'bill-list-modal-body'}>

                        <div className={'table-by-days'}>
                            <div className={'table-by-days-header'}>События по датам</div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Разгрузка контейнеров</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`8 часов`}><Tag color={'gold'}>15</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'gold'}>16</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'gold'}>17</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'gold'}>18</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'gold'}>19</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'gold'}>20</Tag></Tooltip>
                                </div>
                            </div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Больничный</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`8 часов`}><Tag color={'volcano'}>15</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'volcano'}>16</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'volcano'}>17</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'volcano'}>18</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'volcano'}>19</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'volcano'}>20</Tag></Tooltip>
                                </div>
                            </div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Сверхурочные</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`8 часов`}><Tag color={'lime'}>15</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'lime'}>16</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'lime'}>17</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'lime'}>18</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'lime'}>19</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'lime'}>20</Tag></Tooltip>
                                </div>
                            </div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Местная командировка</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`8 часов`}><Tag color={'cyan'}>15</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'cyan'}>16</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'cyan'}>17</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'cyan'}>18</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'cyan'}>19</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'cyan'}>20</Tag></Tooltip>
                                </div>
                            </div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Длительная командировка</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`8 часов`}><Tag color={'blue'}>15</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'blue'}>16</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'blue'}>17</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'blue'}>18</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'blue'}>19</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'blue'}>20</Tag></Tooltip>
                                </div>
                            </div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Ежегодный отпуск</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`8 часов`}><Tag color={'green'}>15</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'green'}>16</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'green'}>17</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'green'}>18</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'green'}>19</Tag></Tooltip>
                                    <Tooltip title={`8 часов`}><Tag color={'green'}>20</Tag></Tooltip>
                                </div>
                            </div>
                            <div className={'table-by-days-row'}>
                                <div className={'label-cell'}>Потерянное время (неопл. отпуск)</div>
                                <div className={'days-cell'}>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>8</Tag></Tooltip>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>9</Tag></Tooltip>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>10</Tag></Tooltip>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>11</Tag></Tooltip>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>12</Tag></Tooltip>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>13</Tag></Tooltip>
                                    <Tooltip title={`7 часов 59 минут`}><Tag color={'red'}>14</Tag></Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
        </Modal>
    );
}

export default BillListModal;
