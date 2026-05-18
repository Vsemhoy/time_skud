import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';
import styles from "../style/user_page.module.css";
import {
    Button,
    ConfigProvider,
    DatePicker,
    Input,
    Select,
    Spin,
    Tooltip,
    Alert,
    Radio,
    message,
    Modal,
    notification
} from "antd";
import {CSRF_TOKEN, PRODMODE, ROUTE_PREFIX} from "../../../CONFIG/config"
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {
    MOCK_USER,
    COMPANIES,
    DEPARTMENTS,
} from "../mock/mock";
import dayjs from "dayjs";
import {USERS} from "../../CHARTS/mock/mock";
import {ManOutlined, WomanOutlined} from "@ant-design/icons";

const FIELD_CONTROL_STYLE = {width: '100%'};
const USER_ROLES = [
    {
        id: 1,
        name: 'Менеджер',
    },
    {
        id: 2,
        name: 'Администратор',
    },
    {
        id: 3,
        name: 'Бухгалтер',
    },
    {
        id: 4,
        name: 'Инженер',
    },
];

const BaseInfoWorkspace = (props) => {
    const navigate = useNavigate();
    const { currentUser, userIdState, savingInfo, onSavedInfo, onUpdateBaseInfo, onUpdateSavingInfo, prepareAndShowAlert } = useOutletContext();
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertDescription, setAlertDescription] = useState('');

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
    const [sex, setSex] = useState(null);
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
    const [innerPhone, setInnerPhone] = useState(0);
    const [telegramID, setTelegramID] = useState('');
    const [email, setEmail] = useState('');
    const [dateLeave, setDateLeave] = useState('');
    const [dateEnter, setDateEnter] = useState('');
    const [rating, setRating] = useState('');
    const [status, setStatus] = useState({
        id: 0,
        name: 'Работает',
    });
    const [role, setRole] = useState({
        id: null,
        name: '',
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
        rating, status, role, boss, login, password, cardNumber, conditionalCard, allowEntry
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
            if (!company.id) {
                setCompany(newCompany);
            }
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

    useEffect(() => {
        if (!boss?.id || !bosses?.length) {
            return;
        }

        const selectedBoss = bosses.find((item) => Number(item.id) === Number(boss.id));

        if (selectedBoss && selectedBoss !== boss) {
            setBoss(selectedBoss);
        }
    }, [boss?.id, bosses]);

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
            //if (PRODMODE) {
                try {
                    const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/userbaseinfo/${userIdState}`,
                        {
                            _token: CSRF_TOKEN
                        }
                    );
                    if (serverResponse.data.content) {
                        setContent(serverResponse.data.content);
                    }
                } catch (error) {
                    console.error('Error fetching user base info:', error);
                    prepareAndShowAlert(
                        'error',
                        'Произошла ошибка',
                        error.response?.data?.message || error.message || 'Неизвестная ошибка'
                    );
                }
            // } else {
            //     setCompany(MOCK_USER.company);
            //     setSurname(MOCK_USER.surname);
            //     setName(MOCK_USER.name);
            //     setPatronymic(MOCK_USER.patronymic);
            //     setDepartment(MOCK_USER.department);
            //     setOccupy(MOCK_USER.occupy);
            //     setInnerPhone(MOCK_USER.innerPhone);
            //     setTelegramID(MOCK_USER.telegramID);
            //     setEmail(MOCK_USER.email);
            //     setDateLeave(MOCK_USER.dateLeave ? dayjs(MOCK_USER.dateLeave, 'DD.MM.YYYY') : null);
            //     setDateEnter(MOCK_USER.dateEnter ? dayjs(MOCK_USER.dateEnter, 'DD.MM.YYYY') : null);
            //     setRating(MOCK_USER.rating);
            //     setStatus(MOCK_USER.status);
            //     setBoss(MOCK_USER.boss);
            //     setLogin(MOCK_USER.login);
            //     setPassword(MOCK_USER.password);
            //     setCardNumber(MOCK_USER.cardNumber);
            //     setConditionalCard(MOCK_USER.conditionalCard);
            //     setAllowEntry(MOCK_USER.allowEntry);
            // }
        }
    };
    const setContent = (content) => {
        setSex(content?.sex);
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
        setRole(
            content?.role
            ?? USER_ROLES.find((item) => Number(item.id) === Number(content?.sales_role))
            ?? {id: null, name: ''}
        );
        setBoss(content?.boss ?? {id: content?.boss_id ?? null, name: ''});
        setLogin(content?.login);
        setPassword(content?.password);
        setCardNumber(content?.cardNumber);
        setConditionalCard(content?.conditionalCard);
        if (content?.allowEntry) {
            setAllowEntry(content?.allowEntry);
        }
    };
    const fetchSelects = async () => {
        //if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/userbaseinfoselects`,
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
                prepareAndShowAlert(
                    'error',
                    'Произошла ошибка',
                    error.response?.data?.message || error.message || 'Неизвестная ошибка'
                );
            }
        // } else {
        //     setCompanies(COMPANIES);
        //     setDepartments(DEPARTMENTS);
        //     setBosses(USERS);
        // }
    };
    const createUser = async () => {
        //if (PRODMODE) {
            try {
                const sales_role = (role?.id !== undefined && role?.id !== null) ? Number(role.id) : null;
                const info = {
                    sex, company, surname, name, patronymic, department, occupy,
                    innerPhone, telegramID, email, dateLeave, dateEnter,
                    rating, status, sales_role, boss, login, password, cardNumber, conditionalCard, allowEntry
                }
                const data = {
                    id: userIdState,
                    info
                }
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/createuser`,
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
                prepareAndShowAlert(
                    'error',
                    'Произошла ошибка',
                    e.response?.data?.message || e.message || 'Неизвестная ошибка'
                );
            }
        // } else {
        //     setTimeout(() => {
        //         onSavedInfo();
        //         onUpdateSavingInfo(false, 568);
        //     }, 500);
        // }
    };
    const sendUpdatedInfo = async () => {
        //if (PRODMODE) {
            try {
                const sales_role = (role?.id !== undefined && role?.id !== null) ? Number(role.id) : null;
                const data = {
                    sex, company, surname, name, patronymic, department, occupy,
                    innerPhone, telegramID, email, dateLeave, dateEnter,
                    rating, status, sales_role, boss, login, password, cardNumber, conditionalCard, allowEntry
                }
                console.log(data);
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/updateuserbaseinfo/${userIdState}`,
                    {
                        data,
                        _token: CSRF_TOKEN
                    }
                );
                prepareAndShowAlert(
                    'success',
                    'Успех',
                    'Данные успешно обновлены!'
                );
                setTimeout(() => onSavedInfo(), 500);
                if (serverResponse.data.content) {
                    setContent(serverResponse.data.content);
                }
            } catch (e) {
                console.log(e);
                prepareAndShowAlert(
                    'error',
                    'Произошла ошибка',
                    e.response?.data?.message || e.message || 'Неизвестная ошибка'
                );
                onSavedInfo();
            }
        // } else {
        //     prepareAndShowAlert('info',
        //         'Демо-версия',
        //         'Демо-версия'
        //     );
        //     setTimeout(() => {
        //         onSavedInfo();
        //         onUpdateSavingInfo(false, 568);
        //     }, 500);
        // }
    };
    const confirmDeleteUser = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            fetchDeleteUser().then();
        }
    };
    const fetchDeleteUser = async () => {
        //if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/deleteuser/${userIdState}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                navigate(`/hr/usermanager`);
            } catch (e) {
                console.log(e);
                prepareAndShowAlert(
                    'error',
                    'Произошла ошибка',
                    e.response?.data?.message || e.message || 'Неизвестная ошибка'
                );
            }
        // } else {
        //     setTimeout(() => {
        //         onSavedInfo();
        //         //onUpdateSavingInfo(false, 568);
        //         navigate(`/hr/usermanager`);
        //     }, 500);
        // }
    }
    const IsDisableAllowEntry = () => {
        console.log(userIdState === 'new')
        if (userIdState === 'new') return true;
        if (!cardNumber) return true;
        return false;
    };
    /*const prepareAndShowAlert = (type, message, description) => {
        setIsAlertVisible(true);
        setAlertType(type);
        setAlertMessage(message);
        setAlertDescription(description);
    };*/

    const renderField = ({key, label, control, tooltip, wide}) => {
        const row = (
            <div className={`${styles.sk_info_line} ${wide ? styles.sk_info_line_wide : ''}`}>
                <p className={styles.sk_line_label}>{label}</p>
                <div className={styles.sk_field_control}>{control}</div>
            </div>
        );

        if (!tooltip) {
            return React.cloneElement(row, {key});
        }

        return (
            <Tooltip key={key} title={tooltip}>
                {row}
            </Tooltip>
        );
    };

    const mainInfoFields = [
        {
            key: 'company',
            label: 'Компания',
            control: (
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
                            style={FIELD_CONTROL_STYLE}
                            status="warning"
                            fieldNames={{
                                value: 'id',
                                label: 'name',
                            }}
                    />
                </ConfigProvider>
            ),
        },
        {
            key: 'surname',
            label: 'Фамилия',
            control: (
                <Input placeholder="Фамилия"
                       value={surname}
                       onChange={(e) => setSurname(e.target.value)}
                       status="warning"
                />
            ),
        },
        {
            key: 'name',
            label: 'Имя',
            control: (
                <Input placeholder="Имя"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       status="warning"
                />
            ),
        },
        {
            key: 'patronymic',
            label: 'Отчество',
            control: (
                <Input placeholder="Отчество"
                       value={patronymic}
                       onChange={(e) => setPatronymic(e.target.value)}
                       status="warning"
                />
            ),
        },
        {
            key: 'department',
            label: 'Отдел',
            tooltip: userIdState === 'new' ? 'Пользователи без отдела могут быть не видны в списках' : null,
            control: (
                <Select placeholder="Отдел"
                        value={(department.id !== undefined && department.id !== null) ? +department.id : null}
                        options={departments}
                        onChange={(id) => setDepartment(departments.find(c => c.id === id))}
                        style={FIELD_CONTROL_STYLE}
                        fieldNames={{
                            value: 'id',
                            label: 'name',
                        }}
                />
            ),
        },
        {
            key: 'occupy',
            label: 'Должность',
            control: (
                <Input placeholder="Должность"
                       value={occupy}
                       onChange={(e) => setOccupy(e.target.value)}
                       status="warning"
                />
            ),
        },
        {
            key: 'role',
            label: 'Роль',
            tooltip: 'Необходимо указывать для сотрудников работающих в модуле отдела продаж',
            control: (
                <Select placeholder="Роль"
                        value={(role.id !== undefined && role.id !== null) ? +role.id : null}
                        options={USER_ROLES}
                        onChange={(id) => setRole(USER_ROLES.find(c => Number(c.id) === Number(id)) ?? {id: null, name: ''})}
                        style={FIELD_CONTROL_STYLE}
                        allowClear
                        fieldNames={{
                            value: 'id',
                            label: 'name',
                        }}
                />
            ),
        },
        {
            key: 'innerPhone',
            label: 'Внутренний телефон',
            control: (
                <Input placeholder="Внутренний телефон"
                       value={innerPhone}
                       onChange={(e) => setInnerPhone(e.target.value)}
                       status="warning"
                />
            ),
        },
        {
            key: 'telegramID',
            label: 'Телеграм ID',
            control: (
                <Input placeholder="Телеграм ID"
                       value={telegramID}
                       onChange={(e) => setTelegramID(e.target.value)}
                />
            ),
        },
        {
            key: 'email',
            label: 'Эл. почта',
            control: (
                <Input placeholder="Эл. почта"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
            ),
        },
        {
            key: 'dateLeave',
            label: 'Дата ухода',
            control: (
                <DatePicker placeholder="Дата ухода"
                            value={dateLeave}
                            onChange={(e) => setDateLeave(e)}
                            format={"DD.MM.YYYY"}
                            style={FIELD_CONTROL_STYLE}
                />
            ),
        },
        {
            key: 'dateEnter',
            label: 'Дата приёма',
            control: (
                <DatePicker placeholder="Дата приёма"
                            value={dateEnter}
                            onChange={(e) => setDateEnter(e)}
                            format={"DD.MM.YYYY"}
                            style={FIELD_CONTROL_STYLE}
                />
            ),
        },
        {
            key: 'rating',
            label: 'Рейтинг',
            tooltip: userIdState === 'new' ? 'Рейтинг определяет порядок сортировки пользователя в списках старой системы' : null,
            control: (
                <Input placeholder="Рейтинг"
                       value={rating}
                       onChange={(e) => setRating(e.target.value)}
                       status="warning"
                />
            ),
        },
        {
            key: 'status',
            label: 'Статус',
            control: (
                <Select placeholder="Статус"
                        value={(status.id !== undefined && status.id !== null) ? +status.id : null}
                        options={statuses}
                        onChange={(id) => setStatus(statuses.find(c => c.id === id))}
                        style={FIELD_CONTROL_STYLE}
                        status="warning"
                        fieldNames={{
                            value: 'id',
                            label: 'name',
                        }}
                />
            ),
        },
        {
            key: 'boss',
            label: 'Руководитель',
            wide: true,
            tooltip: userIdState === 'new' ? 'Каждый новый пользователь должен иметь руководителя' : null,
            control: (
                <Select placeholder="Руководитель"
                        value={(boss.id !== undefined && boss.id !== null && Number(boss.id) !== 0) ? +boss.id : null}
                        options={bosses}
                        onChange={(id) => setBoss(bosses.find(c => Number(c.id) === Number(id)) ?? {id: id ?? null, name: ''})}
                        style={FIELD_CONTROL_STYLE}
                        status="warning"
                        fieldNames={{
                            value: 'id',
                            label: 'name',
                        }}
                        showSearch
                        optionFilterProp="name"
                        allowClear
                />
            ),
        },
    ];

    const accessFields = [
        {
            key: 'login',
            label: 'Логин',
            control: (
                <Input placeholder="Не менее пяти символов"
                       value={login}
                       onChange={(e) => setLogin(e.target.value)}
                />
            ),
        },
        {
            key: 'password',
            label: 'Пароль',
            tooltip: userIdState !== 'new' ? 'Для изменения пароля впишите новый' : 'Один пароль для старой и новой системы',
            control: (
                <Input placeholder="Не менее четырех символов"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
            ),
        },
        {
            key: 'cardNumber',
            label: 'Номер карточки',
            control: (
                <Input placeholder="Карточка для доступа в офис"
                       value={cardNumber}
                       onChange={(e) => setCardNumber(e.target.value)}
                />
            ),
        },
        {
            key: 'conditionalCard',
            label: 'Условная карточка',
            control: (
                <Select placeholder="Стелс / Нормальная"
                        value={(conditionalCard.id !== undefined && conditionalCard.id !== null) ? +conditionalCard.id : null}
                        options={conditionalCards}
                        onChange={(id) => setConditionalCard(conditionalCards.find(c => c.id === id))}
                        style={FIELD_CONTROL_STYLE}
                        fieldNames={{
                            value: 'id',
                            label: 'name',
                        }}
                />
            ),
        },
        {
            key: 'allowEntry',
            label: 'Разрешить вход',
            control: (
                <Select placeholder="Да / Нет"
                        value={(allowEntry.id !== undefined && allowEntry.id !== null) ? +allowEntry.id : null}
                        options={allowEntries}
                        onChange={(id) => setAllowEntry(allowEntries.find(c => c.id === id))}
                        style={FIELD_CONTROL_STYLE}
                        fieldNames={{
                            value: 'id',
                            label: 'name',
                        }}
                        disabled={IsDisableAllowEntry()}
                />
            ),
        },
    ];

    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_base_workspace}>
                <section className={styles.sk_user_info_column}>
                    <div className={styles.sk_section_header}>
                        <p className={styles.sk_column_header}>Основные данные пользователя</p>
                        <Radio.Group
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            optionType="button"
                            buttonStyle="solid"
                            size="small"
                            className={styles.sk_sex_switch}
                        >
                            <Radio.Button value={1}>
                                <ManOutlined /> Муж
                            </Radio.Button>
                            <Radio.Button value={2}>
                                <WomanOutlined /> Жен
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className={styles.sk_fields_grid}>
                        {mainInfoFields.map(renderField)}
                    </div>
                </section>
                <section className={styles.sk_user_info_column}>
                    <div className={styles.sk_section_header}>
                        <p className={styles.sk_column_header}>Настройки доступа</p>
                    </div>
                    <div className={styles.sk_fields_grid}>
                        {accessFields.map(renderField)}
                    </div>
                    <div className={styles.sk_danger_zone}>
                        {currentUser?.user?.super && userIdState !== 'new' && (
                            <Button
                                 type="primary"
                                 danger
                                 onClick={confirmDeleteUser}
                            >Удалить пользователя</Button>
                        )}
                    </div>
                </section>
            </div>
            {isAlertVisible && (
                <Alert
                    message={alertMessage}
                    description={alertDescription}
                    type={alertType}
                    showIcon
                    closable
                    style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        zIndex: 9999,
                        width: 350
                    }}
                    onClose={() => setIsAlertVisible(false)}
                />
            )}
        </Spin>
    );
}

export default BaseInfoWorkspace;
