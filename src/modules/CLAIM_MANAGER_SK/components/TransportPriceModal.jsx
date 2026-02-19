import React, {useEffect, useState} from 'react';
import {Button, DatePicker, Input, Modal, Select} from "antd";
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {OLD_DOWN_TRANSPORT_PRICES, OLD_UP_TRANSPORT_PRICES} from "../CLAIM_MOCK";

const TransportPriceModal = ({isOpenTransportPopup, setIsOpenTransportPopup, updateCurrentPrices}) => {
    const [newPrice, setNewPrice] = useState(null);
    const [newType, setNewType] = useState(null);
    const [newDate, setNewDate] = useState(null);
    const [oldUpTransportPrices, setOldUpTransportPrices] = useState([]);
    const [oldDownTransportPrices, setOldDownTransportPrices] = useState([]);

    const getInfo = async () => {
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.get('/api/transport/price/history',
                    {
                        data: {},
                        _token: CSRF_TOKEN
                    }
                );
                if (response.data.content) {
                    setOldUpTransportPrices(response.data.content.up);
                    setOldDownTransportPrices(response.data.content.down);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            setOldUpTransportPrices(OLD_UP_TRANSPORT_PRICES);
            setOldDownTransportPrices(OLD_DOWN_TRANSPORT_PRICES);
        }
    };

    const saveNewPrice = async () => {
        const startDate = newDate ? newDate.format('DD.MM.YYYY') : null;
        if (PRODMODE) {
            try {
                let response = await PROD_AXIOS_INSTANCE.post('/api/transport/price',
                    {
                        data: {
                            price: +newPrice,
                            type_transport: newType,
                            start: startDate,
                        },
                        _token: CSRF_TOKEN
                    }
                );
                clearInputs();
                await getInfo();
                updateCurrentPrices();
            } catch (e) {
                console.log(e);
            }
        } else {
            clearInputs();
        }
    };

    const clearInputs = () => {
        setNewPrice(null);
        setNewType(null);
        setNewDate(null);
    }

    useEffect(() => {
        getInfo().then();
    }, [])

    return (
        <Modal
            title="Добавить новую стоимость проезда"
            closable={{ 'aria-label': 'Custom Close Button' }}
            footer={null}
            open={isOpenTransportPopup}
            onCancel={() => setIsOpenTransportPopup(false)}
            width={650}
        >
            <div style={{display: 'flex', gap: '10px', width: '610px'}}>
                <div className={'modal_form_wrapper'}>
                    <div>
                        <p>Укажите тип транспорта:</p>
                        <Select options={[
                            {
                                value: 1,
                                label: 'Наземный транспорт'
                            },
                            {
                                value: 2,
                                label: 'Подземный транспорт'
                            },
                        ]}
                                value={newType}
                                onChange={setNewType}
                                style={{width: '100%'}}

                        />
                        <p style={{marginTop: '10px'}}>Укажите цену:</p>
                        <Input palceholder={'Новая цена'}
                               value={newPrice}
                               onChange={(e) => setNewPrice(e.target.value)}
                               style={{width: '100%'}}
                               suffix={'₽'}
                               type={'number'}
                        />
                        <p style={{marginTop: '10px'}}>Укажите дату начала действия:</p>
                        <DatePicker format={'DD.MM.YYYY'}
                                    style={{width: '100%'}}
                                    onChange={(e) => setNewDate(e)}
                                    value={newDate}
                        />
                    </div>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
                        <Button type="primary"
                                onClick={saveNewPrice}
                                style={{marginTop: '10px'}}
                        >Сохранить</Button>
                    </div>
                </div>
                <div>
                    <p>Наземный транспорт:</p>
                    <div className={'modal_old_prices'}>
                        {oldUpTransportPrices.map(upPrice => (
                            <div className={'modal_old_price'} key={upPrice.id + 'oldUp'}>
                                <p>{upPrice.price}</p>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <p>{upPrice.start}</p>
                                    -
                                    {upPrice.end ? <p>{upPrice.end}</p> : <p>...</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p>Подземный транспорт:</p>
                    <div className={'modal_old_prices'}>
                        {oldDownTransportPrices.map(downPrice => (
                            <div className={'modal_old_price'} key={downPrice.id + 'oldDown'}>
                                <p>{downPrice.price}</p>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <p>{downPrice.start}</p>
                                    -
                                    {downPrice.end ? <p>{downPrice.end}</p> : <p>...</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TransportPriceModal;
