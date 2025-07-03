import React, {useEffect, useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from "../style/user_page.module.css";
import {ConfigProvider, Input, Select, Spin} from "antd";
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {
    MOCK_USER,
    ALLOW_ENTRIES,
    COMPANIES,
    CONDITIONAL_CARDS,
    DEPARTMENTS,
    STATUSES
} from "../mock/mock";
import {USERS} from "../../USER_MANAGER_2025/USER_MANAGER/mock/mock";

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
        setIsLoading(true);
        fetchBaseInfo().then();
        fetchSelects().then();
        isCanSave();
        setTimeout(() => setIsLoading(false), 500);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchBaseInfo().then();
        fetchSelects().then();
        isCanSave();
        setTimeout(() => setIsLoading(false), 500);
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
            sendUpdatedInfo().then();
        }
    }, [savingInfo]);

    const isCanSave = () => {
        if (userIdState === 'new') {
            if (company.id && surname && name && patronymic && occupy && rating && status.id) {
                onUpdateBaseInfo(true);
            } else {
                onUpdateBaseInfo(false);
            }
        } else {
            onUpdateBaseInfo(true);
        }
    };
    const fetchBaseInfo = async () => {
        if (userIdState !== 'new') {
            if (PRODMODE) {
                try {
                    const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userbaseinfo`,
                        {
                            data: {id: userIdState},
                            _token: CSRF_TOKEN
                        }
                    );
                    if (serverResponse.data.content) {
                        const content = serverResponse.data.content
                        setCompany(content?.company);
                        setSurname(content?.surname);
                        setName(content?.name);
                        setPatronymic(content?.patronymic);
                        setDepartment(content?.department);
                        setOccupy(content?.occupy);
                        setInnerPhone(content?.innerPhone);
                        setTelegramID(content?.telegramID);
                        setEmail(content?.email);
                        setDateLeave(content?.dateLeave);
                        setDateEnter(content?.dateEnter);
                        setRating(content?.rating);
                        setStatus(content?.status);
                        setLogin(content?.login);
                        setPassword(content?.password);
                        setCardNumber(content?.cardNumber);
                        setConditionalCard(content?.conditionalCard);
                        setAllowEntry(content?.allowEntry);
                    }
                } catch (error) {
                    console.error('Error fetching user base info:', error);
                }
            } else {
                setCompany(MOCK_USER.company);
                setSurname(MOCK_USER.surname);
                setName(MOCK_USER.name);
                setPatronymic(MOCK_USER.patronymic);
                setDepartment(MOCK_USER.department);
                setOccupy(MOCK_USER.occupy);
                setInnerPhone(MOCK_USER.innerPhone);
                setTelegramID(MOCK_USER.telegramID);
                setEmail(MOCK_USER.email);
                setDateLeave(MOCK_USER.dateLeave);
                setDateEnter(MOCK_USER.dateEnter);
                setRating(MOCK_USER.rating);
                setStatus(MOCK_USER.status);
                setLogin(MOCK_USER.login);
                setPassword(MOCK_USER.password);
                setCardNumber(MOCK_USER.cardNumber);
                setConditionalCard(MOCK_USER.conditionalCard);
                setAllowEntry(MOCK_USER.allowEntry);
            }
        }
    };
    const fetchSelects = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userbaseinfoselects`,
                    {
                        data: {id: userIdState},
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content
                    setCompanies(content?.companies);
                    setDepartments(content?.departments);
                    setStatuses(content?.statuses);
                    setConditionalCards(content?.conditional_cards);
                    setAllowEntries(content?.allow_entries);
                }
            } catch (error) {
                console.error('Error fetching users base info selects:', error);
            }
        } else {
            setCompanies(COMPANIES);
            setDepartments(DEPARTMENTS);
            setStatuses(STATUSES);
            setConditionalCards(CONDITIONAL_CARDS);
            setAllowEntries(ALLOW_ENTRIES);
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
            const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/updateuserbaseinfo`,
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
                        <Input placeholder="Дата ухода"
                               value={dateLeave}
                               onChange={(e) => setDateLeave(e.target.value)}
                               style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Дата приёма</p>
                        <Input placeholder="Дата приёма"
                               value={dateEnter}
                               onChange={(e) => setDateEnter(e.target.value)}
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
