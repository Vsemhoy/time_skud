import React, {useEffect, useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from "../style/user_page.module.css";
import {ConfigProvider, DatePicker, Input, Select, Spin, Tooltip} from "antd";
import {CSRF_TOKEN, PRODMODE} from "../../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {
    MOCK_USER,
    COMPANIES,
    DEPARTMENTS,
} from "../mock/mock";
import dayjs from "dayjs";
import {USERS} from "../../CHARTS/mock/mock";

const BaseInfoWorkspace = (props) => {
    const { currentUser, userIdState, savingInfo, onSavedInfo, onUpdateBaseInfo, onUpdateSavingInfo } = useOutletContext();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [bosses, setBosses] = useState([]);
    const [statuses, setStatuses] = useState([
        {
            id: 0,
            name: 'Работает'
        },
        {
            id: 1,
            name: 'Уволен'
        },
    ]);
    const [conditionalCards, setConditionalCards] = useState([
        {
            id: 0,
            name: 'Стелс'
        },
        {
            id: 1,
            name: 'Нормальная'
        },
    ]);
    const [allowEntries, setAllowEntries] = useState([
        {
            id: 0,
            name: 'Нет'
        },
        {
            id: 1,
            name: 'Да'
        },
    ]);

    const [company, setCompany] = useState({
        id: null,
        name: '',
        color: ''
    });
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [department, setDepartment] = useState({
        id: null,
        name: '',
    });
    const [boss, setBoss] = useState({
        id: null,
        name: '',
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
        name: 'Работает',
    });
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [conditionalCard, setConditionalCard] = useState({
        id: null,
        name: '',
    });
    const [allowEntry, setAllowEntry] = useState({
        id: null,
        name: '',
    });

    useEffect(() => {
        if (!isMounted) {
            fetchInfo().then();
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
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
            if (userIdState === 'new') {
                createUser().then();
            } else {
                sendUpdatedInfo().then();
            }
        }
    }, [savingInfo]);

    useEffect(() => {
        if (!currentUser || !currentUser.companies) return;
        const newCurrentUser = currentUser.user;
        const newCompanies = currentUser.companies;
        console.log('newCompanies: ', newCompanies)
        if (newCompanies) {
            const newCompany = newCompanies.find(c => +c.id === +newCurrentUser.active_company);
            console.log('newCompany: ', newCompany)
            setCompanies(newCompanies.filter(item => item.id > 1));
            setCompany(newCompany);
        }
        setTimeout(() => {
            console.log(companies)
            console.log(company)
        }, 500)
    }, [currentUser]);

    useEffect(() => {
        console.log(companies);
        console.log(company);
    }, [companies, company]);

    const fetchInfo = async () => {
        setIsLoading(true);
        await fetchBaseInfo();
        await fetchSelects();
        isCanSave();
        setTimeout(() => setIsLoading(false), 500);
    };
    const isCanSave = () => {
        if (userIdState === 'new') {
            if (company.id && surname && name && patronymic && occupy && rating && boss.id) {
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
                    const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userbaseinfo/${userIdState}`,
                        {
                            _token: CSRF_TOKEN
                        }
                    );
                    if (serverResponse.data.content) {
                        setContent(serverResponse.data.content);
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
                setDateLeave(MOCK_USER.dateLeave ? dayjs(MOCK_USER.dateLeave, 'DD.MM.YYYY') : null);
                setDateEnter(MOCK_USER.dateEnter ? dayjs(MOCK_USER.dateEnter, 'DD.MM.YYYY') : null);
                setRating(MOCK_USER.rating);
                setStatus(MOCK_USER.status);
                setBoss(MOCK_USER.boss);
                setLogin(MOCK_USER.login);
                setPassword(MOCK_USER.password);
                setCardNumber(MOCK_USER.cardNumber);
                setConditionalCard(MOCK_USER.conditionalCard);
                setAllowEntry(MOCK_USER.allowEntry);
            }
        }
    };
    const setContent = (content) => {
        setCompany(content?.company);
        setSurname(content?.surname);
        setName(content?.name);
        setPatronymic(content?.patronymic);
        setDepartment(content?.departament);
        setOccupy(content?.occupy);
        setInnerPhone(content?.innerPhone);
        setTelegramID(content?.telegramID);
        setEmail(content?.email);
        setDateLeave(content.dateLeave ? dayjs(content.dateLeave, 'DD.MM.YYYY') : null);
        setDateEnter(content.dateEnter ? dayjs(content.dateEnter, 'DD.MM.YYYY') : null);
        setRating(content?.rating);
        setStatus(content?.status);
        setBoss(content?.boss);
        setLogin(content?.login);
        setPassword(content?.password);
        setCardNumber(content?.cardNumber);
        setConditionalCard(content?.conditionalCard);
        if (content?.allowEntry) {
            setAllowEntry(content?.allowEntry);
        }
    };
    const fetchSelects = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userbaseinfoselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content
                    setDepartments(content?.departaments);
                    setBosses(content?.bosses);
                }
            } catch (error) {
                console.error('Error fetching users base info selects:', error);
            }
        } else {
            setCompanies(COMPANIES);
            setDepartments(DEPARTMENTS);
            setBosses(USERS);
        }
    };
    const createUser = async () => {
        if (PRODMODE) {
            try {
                const info = {
                    company, surname, name, patronymic, department, occupy,
                    innerPhone, telegramID, email, dateLeave, dateEnter,
                    rating, status, boss, login, password, cardNumber, conditionalCard, allowEntry
                }
                const data = {
                    id: userIdState,
                    info
                }
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/createuser`,
                    {
                        data,
                        _token: CSRF_TOKEN
                    }
                );
                setTimeout(() => onSavedInfo(), 500);
                if (serverResponse.data.content) {
                    onUpdateSavingInfo(false, serverResponse.data.content);
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setTimeout(() => {
                onSavedInfo();
                onUpdateSavingInfo(false, 568);
            }, 500);
        }
    };
    const sendUpdatedInfo = async () => {
        if (PRODMODE) {
            try {
                const data = {
                    company, surname, name, patronymic, department, occupy,
                    innerPhone, telegramID, email, dateLeave, dateEnter,
                    rating, status, boss, login, password, cardNumber, conditionalCard, allowEntry
                }
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/updateuserbaseinfo/${userIdState}`,
                    {
                        data,
                        _token: CSRF_TOKEN
                    }
                );
                setTimeout(() => onSavedInfo(), 500);
                if (serverResponse.data.content) {
                    setContent(serverResponse.data.content);
                }
            } catch (e) {
                console.log(e)
            }
        } else {
            setTimeout(() => {
                onSavedInfo();
                onUpdateSavingInfo(false, 568);
            }, 500);
        }
    };
    const IsDisableAllowEntry = () => {
        console.log(userIdState === 'new')
        if (userIdState === 'new') return true;
        if (!cardNumber) return true;
        return false;
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
                                    value={(company.id !== undefined && company.id !== null) ? +company.id : null}
                                    options={companies}
                                    disabled={userIdState !== 'new'}
                                    onChange={(id) => setCompany(companies.find(c => c.id === id))}
                                    style={{width: 360}}
                                    status="warning"
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}

                            />
                        </ConfigProvider>
                    </div>

                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Фамилия</p>
                        <Input placeholder="Фамилия"
                               value={surname}
                               onChange={(e) => setSurname(e.target.value)}
                               style={{width: 360}}
                               status="warning"
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Имя</p>
                        <Input placeholder="Имя"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               style={{width: 360}}
                               status="warning"
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Отчество</p>
                        <Input placeholder="Отчество"
                               value={patronymic}
                               onChange={(e) => setPatronymic(e.target.value)}
                               style={{width: 360}}
                               status="warning"
                        />
                    </div>
                    <Tooltip title={userIdState === 'new' ? 'Пользователи без отдела могут быть не видны в списках' : null}>
                        <div className={styles.sk_info_line}>
                            <p className={styles.sk_line_label}>Отдел</p>
                            <Select placeholder="Отдел"
                                    value={(department.id !== undefined && department.id !== null) ? +department.id : null}
                                    options={departments}
                                    onChange={(id) => setDepartment(departments.find(c => c.id === id))}
                                    style={{width: 360}}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                            />
                        </div>
                    </Tooltip>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Должность</p>
                        <Input placeholder="Должность"
                               value={occupy}
                               onChange={(e) => setOccupy(e.target.value)}
                               style={{width: 360}}
                               status="warning"
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
                        <DatePicker placeholder="Дата ухода"
                                    value={dateLeave}
                                    onChange={(e) => setDateLeave(e)}
                                    format={"DD.MM.YYYY"}
                                    style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Дата приёма</p>
                        <DatePicker placeholder="Дата приёма"
                                    value={dateEnter}
                                    onChange={(e) => setDateEnter(e)}
                                    format={"DD.MM.YYYY"}
                                    style={{width: 360}}
                        />
                    </div>
                    <Tooltip title={userIdState === 'new' ? 'Рейтинг определяет порядок сортировки пользователя в списках старой системы' : null}>
                        <div className={styles.sk_info_line}>
                            <p className={styles.sk_line_label}>Рейтинг</p>
                            <Input placeholder="Рейтинг"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                style={{width: 360}}
                                status="warning"
                            />
                        </div>
                    </Tooltip>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Статус</p>
                        <Select placeholder="Статус"
                                value={(status.id !== undefined && status.id !== null) ? +status.id : null}
                                options={statuses}
                                onChange={(id) => setStatus(statuses.find(c => c.id === id))}
                                style={{width: 360}}
                                status="warning"
                                fieldNames={{
                                    value: 'id',
                                    label: 'name',
                                }}
                        />
                    </div>
                    <Tooltip title={userIdState === 'new' ? 'Каждый новый пользователь должен иметь руководителя' : null}>
                        <div className={styles.sk_info_line}>
                            <p className={styles.sk_line_label}>Руководитель</p>
                            <Select placeholder="Руководитель"
                                    value={(boss.id !== undefined && boss.id !== null && boss.id !== 0) ? +boss.id : null}
                                    options={bosses}
                                    onChange={(id) => setBoss(bosses.find(c => c.id === id))}
                                    style={{width: 360}}
                                    status="warning"
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    showSearch
                                    optionFilterProp="name"
                                    allowClear
                            />
                        </div>
                    </Tooltip>
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
                    <Tooltip title={userIdState !== 'new' ? 'Для изменения пароля впишите новый' : 'Один пароль для старой и новой системы'}>
                        <div className={styles.sk_info_line}>
                            <p className={styles.sk_line_label}>Пароль</p>
                            <Input placeholder="Не менее четырех символов"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{width: 360}}
                            />
                        </div>
                    </Tooltip>
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
                                value={(conditionalCard.id !== undefined && conditionalCard.id !== null) ? +conditionalCard.id : null}
                                options={conditionalCards}
                                onChange={(id) => setConditionalCard(conditionalCards.find(c => c.id === id))}
                                style={{width: 360}}
                                fieldNames={{
                                    value: 'id',
                                    label: 'name',
                                }}
                                />
                                
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Разрешить вход</p>
                        <Select placeholder="Да / Нет"
                                value={(allowEntry.id !== undefined && allowEntry.id !== null) ? +allowEntry.id : null}
                                options={allowEntries}
                                onChange={(id) => setAllowEntry(allowEntries.find(c => c.id === id))}
                                style={{width: 360}}
                                fieldNames={{
                                    value: 'id',
                                    label: 'name',
                                }}
                                disabled={IsDisableAllowEntry()}
                        />
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default BaseInfoWorkspace;
