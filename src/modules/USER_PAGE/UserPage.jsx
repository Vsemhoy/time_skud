import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Button, ConfigProvider, Input, Select, Tag} from "antd";
import styles from './style/user_page.module.css'
const UserPage = () => {
    const [isOpenUserPage,     setIsOpenUserPage] =     useState(true);
    const [isOpenUserSchedule, setIsOpenUserSchedule] = useState(false);
    const [isOpenUserRules,    setIsOpenUserRules] =    useState(false);
    const [isOpenUserGroups,   setIsOpenUserGroups] =   useState(false);

    const {userId} = useParams();
    const [userFIO, setUserFIO] = useState("");

    const [disableSaveInfo, setdDisableSavingInfo] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);

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
        value: 0,
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
        value: 0,
        label: '',
    });
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [conditionalCard, setConditionalCard] = useState({
        id: 0,
        value: 0,
        label: '',
    });
    const [allowEntry, setAllowEntry] = useState({
        id: 0,
        value: 0,
        label: '',
    });

    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [conditionalCards, setConditionalCards] = useState([]);
    const [allowEntries, setAllowEntries] = useState([]);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = () => {
        if (userId === 'new') {
            setUserFIO('Новый сотрудник');
        } else {
            setUserFIO('Арчи Гавриил Дессус');
            setCompany({
                id: 2,
                value: 2,
                label: 'Arstel',
                color: '#f2914a'
            });
            setSurname('Арчи');
            setName('Гавриил');
            setPatronymic('Дессус');
            setDepartment({
                id: 2,
                value: 2,
                label: 'Монтажный отдел',
            });
            setOccupy('Руководитель');
            setInnerPhone('228');
            setTelegramID('22834525453');
            setEmail('test@test.com');
            setDateLeave('12.09.2025');
            setDateEnter('12.09.2029');
            setRating('40');
            setStatus({
                id: 1,
                value: 1,
                label: 'Работает',
            });
            setLogin('agd');
            setPassword('');
            setCardNumber('55GKEK24MM');
            setStatus({
                id: 2,
                value: 2,
                label: 'Нормальная',
            });
            setStatus({
                id: 1,
                value: 1,
                label: 'Да',
            });
        }
        setCompanies([
            {
                value: 1,
                label: 'FreeCompany'
            },
            {
                value: 2,
                label: 'Arstel'
            },
            {
                value: 3,
                label: 'Rondo'
            },
        ]);
        setDepartments([
            {
                value: 1,
                label: 'Администрация'
            },
            {
                value: 2,
                label: 'Монтажный отдел'
            },
            {
                value: 3,
                label: 'IT отдел'
            },
        ]);
        setStatuses([
            {
                value: 1,
                label: 'Работает'
            },
            {
                value: 2,
                label: 'Уволен'
            },
        ]);
        setConditionalCards([
            {
                value: 1,
                label: 'Стелс'
            },
            {
                value: 2,
                label: 'Нормальная'
            },
        ]);
        setAllowEntries([
            {
                value: 1,
                label: 'Да'
            },
            {
                value: 2,
                label: 'Нет'
            },
        ]);
    };

    const btnHeader = () => {
        if (userId === 'new') {
            return savingInfo ? 'Создаем' : 'Создать пользователя';
        } else {
            return savingInfo ? 'Сохраняем' : 'Сохранить';
        }
    }

    return (
        <div className={styles.sk_mega_layout}>
            <div className={styles.sk_user_tabs}>
                <Button color={'default'}
                        variant={isOpenUserPage ? 'solid' : 'outlined'}
                        onClick={() => setIsOpenUserPage(!isOpenUserPage)}
                >Основная информация</Button>
                <Button color={'default'}
                        variant={isOpenUserSchedule ? 'solid' : 'outlined'}
                        onClick={() => setIsOpenUserSchedule(!isOpenUserSchedule)}
                >График работы</Button>
                <Button color={'default'}
                        variant={isOpenUserRules ? 'solid' : 'outlined'}
                        onClick={() => setIsOpenUserRules(!isOpenUserRules)}
                >Правила учёта РВ</Button>
                <Button color={'default'}
                        variant={isOpenUserGroups ? 'solid' : 'outlined'}
                        onClick={() => setIsOpenUserGroups(!isOpenUserGroups)}
                >Группы</Button>
            </div>
            <div className={styles.sk_user_header}>
                {userId !== 'new' && (<p className={styles.sk_user_id}>{userId}</p>)}
                <h1 className={styles.sk_user_name}>{userFIO}</h1>
                <Button type="primary"
                        disabled={disableSaveInfo}
                        loading={savingInfo}
                        iconPosition={'end'}
                        style={{width: '200px'}}
                >{btnHeader()}</Button>
            </div>
            <div className={styles.sk_workspace}>
                <div className={styles.sk_user_info_column}>
                    <p className={styles.sk_column_header}>Основные данные пользователя</p>

                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Компания</p>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        selectorBg: '#ffffff', // Фон обычного Select
                                        colorBgElevated: '#ffffff', // Фон выпадающего списка
                                        colorBgContainerDisabled: company.color, // Фон disabled Select
                                        colorTextDisabled: '#ffffff', // Текст disabled Select
                                        colorBorder: '#d9d9d9', // Граница обычного Select
                                        colorBorderDisabled: company.color, // Граница disabled Select
                                    },
                                },
                            }}
                        >
                            <Select placeholder="Компания"
                                    defaultValue={company.label}
                                    options={companies}
                                    disabled={userId !== 'new'}
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
                                defaultValue={department.label}
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
                                defaultValue={status.label}
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
                                defaultValue={conditionalCard.label}
                                options={conditionalCards}
                                onChange={(value) => setConditionalCard(conditionalCards.find(c => c.value === value))}
                                style={{width: 360}}
                        />
                    </div>
                    <div className={styles.sk_info_line}>
                        <p className={styles.sk_line_label}>Разрешить вход</p>
                        <Select placeholder="Да / Нет"
                                defaultValue={allowEntry.label}
                                options={allowEntries}
                                onChange={(value) => setAllowEntry(allowEntries.find(c => c.value === value))}
                                style={{width: 360}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage;
