import React, {useEffect, useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from "../style/user_page.module.css";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";

const BaseInfoWorkspace = (props) => {
    const { userIdState, savingInfo, onUpdateBaseInfo, onUpdateSavingInfo } = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);

    const [company, setCompany] = useState({
        id: 2,
        value: 2,
        label: 'Arstel',
        color: '#f2914a'
    });
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [department, setDepartment] = useState({
        id: 0,
        value: null,
        label: '',
    });
    const [occupy, setOccupy] = useState('');
    const [innerPhone, setInnerPhone] = useState('');
    const [telegramID, setTelegramID] = useState('');
    const [email, setEmail] = useState('');
    const [dateLeave, setDateLeave] = useState('');
    const [dateEnter, setDateEnter] = useState('');
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState({
        id: 0,
        value: null,
        label: '',
    });
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [conditionalCard, setConditionalCard] = useState({
        id: 0,
        value: null,
        label: '',
    });
    const [allowEntry, setAllowEntry] = useState({
        id: 0,
        value: null,
        label: '',
    });

    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [conditionalCards, setConditionalCards] = useState([]);
    const [allowEntries, setAllowEntries] = useState([]);

    useEffect(() => {
    }, []);

    useEffect(() => {
    }, [userIdState]);

    useEffect(() => {
        isCanSave();
    }, [
        company, surname, name, patronymic, department, occupy,
        innerPhone, telegramID, email, dateLeave, dateEnter, dateLeave,
        rating, status, login, password, cardNumber, conditionalCard, allowEntry
    ]);

    useEffect(() => {
        if (savingInfo) {
        }
    }, [savingInfo]);

    const isCanSave = () => {
        if (userIdState === 'new') {
                onUpdateBaseInfo(true);
            } else {
                onUpdateBaseInfo(false);
            }
        } else {
            onUpdateBaseInfo(true);
        }
    };
    const sendUpdatedInfo = async () => {
        let content = {};
        try {
            const data = {
                company,surname,name,patronymic,department,occupy,
                innerPhone,telegramID,email,dateLeave,dateEnter,
                rating,status,login,password,cardNumber,conditionalCard,allowEntry
            }
                {
                    data,
                    _token: CSRF_TOKEN
                }
            );
            content = serverResponse.data.content;
        } catch (e) {
            console.log(e)
        }
        setTimeout(() => onUpdateSavingInfo(false, /*content?.id)*/568), 500);
    };
    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_base_workspace}>
                <div className={styles.sk_user_info_column}>
                    <p className={styles.sk_column_header}>Основные данные пользователя</p>

                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Компания</p>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        selectorBg: '#ffffff',
                                        colorBgElevated: '#ffffff',
                                        colorBgContainerDisabled: company.color,
                                        colorTextDisabled: '#ffffff',
                                        colorBorder: '#d9d9d9',
                                        colorBorderDisabled: company.color,
                                    },
                                },
                            }}
                        >
                            <Select placeholder="Компания"
                                    value={company.value}
                                    options={companies}
                                    disabled={userIdState !== 'new'}
                                    onChange={(value) => setCompany(companies.find(c => c.value === value))}
                                    style={{width: 360}}
                            />
                        </ConfigProvider>
                    </div>

                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Фамилия</p>
                        <Input placeholder="Фамилия"
                               value={surname}
                               onChange={(e) => setSurname(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Имя</p>
                        <Input placeholder="Имя"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Отчество</p>
                        <Input placeholder="Отчество"
                               value={patronymic}
                               onChange={(e) => setPatronymic(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Отдел</p>
                        <Select placeholder="Отдел"
                                value={department.value}
                                options={departments}
                                onChange={(value) => setDepartment(departments.find(c => c.value === value))}
                                style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Должность</p>
                        <Input placeholder="Должность"
                               value={occupy}
                               onChange={(e) => setOccupy(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Внутренний телефон</p>
                        <Input placeholder="Внутренний телефон"
                               value={innerPhone}
                               onChange={(e) => setInnerPhone(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Телеграм ID</p>
                        <Input placeholder="Телеграм ID"
                               value={telegramID}
                               onChange={(e) => setTelegramID(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Эл. Почта</p>
                        <Input placeholder="Эл. Почта"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Дата ухода</p>
                               value={dateLeave}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Дата приёма</p>
                               value={dateEnter}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Рейтинг</p>
                        <Input placeholder="Рейтинг"
                               value={rating}
                               onChange={(e) => setRating(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Статус</p>
                        <Select placeholder="Статус"
                                value={status.value}
                                options={statuses}
                                onChange={(value) => setStatus(statuses.find(c => c.value === value))}
                                style={{width: 360}}
                        />
                    </div>
                </div>
                <div className={styles.sk_user_info_column}>
                    <p className={styles.sk_column_header}>Настройки доступа</p>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Логин</p>
                        <Input placeholder="Не менее пяти символов"
                               value={login}
                               onChange={(e) => setLogin(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Пароль</p>
                        <Input placeholder="Не менее четырех символов"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Номер карточки</p>
                        <Input placeholder="Карточка для доступа в офис"
                               value={cardNumber}
                               onChange={(e) => setCardNumber(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Условная карточка</p>
                        <Select placeholder="Стелс / Нормальная"
                                value={conditionalCard.value}
                                options={conditionalCards}
                                onChange={(value) => setConditionalCard(conditionalCards.find(c => c.value === value))}
                                style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Разрешить вход</p>
                        <Select placeholder="Да / Нет"
                                value={allowEntry.value}
                                options={allowEntries}
                                onChange={(value) => setAllowEntry(allowEntries.find(c => c.value === value))}
                                style={{width: 360}}
                        />
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default BaseInfoWorkspace;
