import React, {useEffect, useMemo, useState} from 'react';
import {Affix, Button, Empty, Input, InputNumber, Layout, Select, Skeleton, Spin, message} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {FilterOutlined, PlusOutlined, SaveOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import {PRODMODE} from "../../CONFIG/config";
import {PROD_AXIOS_INSTANCE} from "../../API/API";
import {USERS} from "../CHARTS/mock/mock";
import {ShortName} from "../../components/Helpers/TextHelpers";
import styles from "./style/accountins.module.css";

const MONTHS = [
    {id: 1, name: 'Январь'},
    {id: 2, name: 'Февраль'},
    {id: 3, name: 'Март'},
    {id: 4, name: 'Апрель'},
    {id: 5, name: 'Май'},
    {id: 6, name: 'Июнь'},
    {id: 7, name: 'Июль'},
    {id: 8, name: 'Август'},
    {id: 9, name: 'Сентябрь'},
    {id: 10, name: 'Октябрь'},
    {id: 11, name: 'Ноябрь'},
    {id: 12, name: 'Декабрь'},
];

const AccountingSurchargesPage = () => {
    const useCookieState = (key, defaultValue) => {
        const [state, setState] = useState(() => {
            const saved = Cookies.get(key);
            return saved ? JSON.parse(saved) : defaultValue;
        });

        useEffect(() => {
            Cookies.set(key, JSON.stringify(state), {expires: 365});
        }, [key, state]);

        return [state, setState];
    };

    const [isOpenFilters, setIsOpenFilters] = useCookieState('accounting_surcharge_filters', true);
    const [filterParams, setFilterParams] = useState({
        year: dayjs().year(),
        month: dayjs().month() + 1,
    });
    const [users, setUsers] = useState([]);
    const [surcharges, setSurcharges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [savingInfo, setSavingInfo] = useState(false);
    const [formRow, setFormRow] = useState({
        user_id: null,
        message: '',
        price: null,
    });

    const years = useMemo(() => {
        const result = [];
        for (let year = 2016; year <= dayjs().year() + 1; year += 1) {
            result.push({value: year, label: year});
        }
        return result;
    }, []);

    const months = useMemo(() => MONTHS.map((month) => ({
        value: month.id,
        label: month.name,
    })), []);

    const getSurchargeDate = (filters = filterParams) => (
        dayjs()
            .year(Number(filters.year))
            .month(Number(filters.month) - 1)
            .date(1)
            .startOf('day')
            .unix()
    );

    const getUserFullName = (user) => [user?.surname, user?.name, user?.secondname ?? user?.patronymic]
        .filter(Boolean)
        .join(' ');

    const getUserShortName = (user) => (
        ShortName(user?.surname, user?.name, user?.patronymic ?? user?.secondname) || getUserFullName(user)
    );

    const userOptions = useMemo(() => users
        .filter((user) => String(user?.deleted ?? '0') !== '1')
        .map((user) => ({
            value: user.id,
            label: getUserShortName(user),
            user,
        }))
        .sort((a, b) => String(a.label ?? '').localeCompare(String(b.label ?? ''), 'ru')), [users]);

    const usersById = useMemo(() => users.reduce((acc, user) => {
        acc[String(user.id)] = user;
        return acc;
    }, {}), [users]);

    const extractStaffList = (responseData) => {
        if (Array.isArray(responseData)) return responseData;
        if (Array.isArray(responseData?.content)) return responseData.content;
        if (Array.isArray(responseData?.data)) return responseData.data;
        if (Array.isArray(responseData?.users)) return responseData.users;
        return [];
    };

    const fetchSelects = async () => {
        try {
            const response = await PROD_AXIOS_INSTANCE.get('/api/finance/data/api/stafflist');
            setUsers(extractStaffList(response.data));
        } catch (e) {
            console.log(e);
            if (!PRODMODE) {
                setUsers(USERS);
            }
        }
    };

    const extractSurcharges = (responseData) => {
        if (Array.isArray(responseData)) return responseData;
        if (Array.isArray(responseData?.content)) return responseData.content;
        if (Array.isArray(responseData?.data)) return responseData.data;
        return [];
    };

    const fetchSurcharges = async (filters = filterParams) => {
        try {
            setIsLoading(true);
            const response = await PROD_AXIOS_INSTANCE.get('/api/finance/data/api/surcharge', {
                params: {date: getSurchargeDate(filters)},
            });
            setSurcharges(extractSurcharges(response.data));
        } catch (e) {
            console.log(e);
            if (!PRODMODE) {
                setSurcharges([]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSelects().then();
    }, []);

    useEffect(() => {
        fetchSurcharges(filterParams).then();
    }, [filterParams.year, filterParams.month]);

    const selectedUser = formRow.user_id ? usersById[String(formRow.user_id)] : null;
    const canSave = Boolean(formRow.user_id && formRow.message?.trim() && formRow.price !== null && formRow.price !== '');

    const prepareSurchargeFormData = () => {
        const formData = new FormData();
        const date = getSurchargeDate();

        formData.append('surcharge[0][user_id]', formRow.user_id);
        formData.append('surcharge[0][message]', formRow.message.trim());
        formData.append('surcharge[0][price]', formRow.price);
        formData.append('surcharge[0][date]', date);
        formData.append('surcharge[0][pinfo][id]', selectedUser?.id ?? formRow.user_id);
        formData.append('surcharge[0][pinfo][surname]', selectedUser?.surname ?? '');
        formData.append('surcharge[0][pinfo][name]', selectedUser?.name ?? '');
        formData.append('surcharge[0][pinfo][deleted]', selectedUser?.deleted ?? 0);

        return formData;
    };

    const saveSurcharge = async () => {
        if (!canSave) return;

        try {
            setSavingInfo(true);
            await PROD_AXIOS_INSTANCE.post('/api/finance/data/api/surcharge', prepareSurchargeFormData());
            setFormRow({
                user_id: null,
                message: '',
                price: null,
            });
            await fetchSurcharges(filterParams);
            message.success('Доплата сохранена');
        } catch (e) {
            console.log(e);
            message.error('Не удалось сохранить доплату');
        } finally {
            setSavingInfo(false);
        }
    };

    const getSurchargeUser = (surcharge) => surcharge?.pinfo ?? usersById[String(surcharge?.user_id)] ?? null;
    const getSurchargeUserName = (surcharge) => {
        const user = getSurchargeUser(surcharge);
        return getUserFullName(user) || `ID ${surcharge?.user_id ?? ''}`;
    };

    const renderSkeleton = () => (
        <div className={styles.sk_surcharge_skeleton}>
            {[0, 1, 2, 3].map((rowIndex) => (
                <div key={`surcharge-skeleton-${rowIndex}`} className={styles.sk_surcharge_row}>
                    <div className={styles.sk_person_row_content}>
                        <Skeleton.Input active size="small" className={styles.sk_skeleton_name} />
                    </div>
                    <div className={styles.sk_person_row_content}>
                        <Skeleton.Input active size="small" className={styles.sk_skeleton_occupy} />
                    </div>
                    <div className={styles.sk_person_row_content}>
                        <Skeleton.Input active size="small" className={styles.sk_skeleton_value} />
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={'mega-layout'}>
            <Layout className={'layout'}>
                <Header className={'header'}>
                    <Affix>
                        <div className={'sk-header-container'}>
                            <Button
                                color={'default'}
                                variant={isOpenFilters ? 'solid' : 'outlined'}
                                icon={<FilterOutlined />}
                                style={{width: '125px'}}
                                onClick={() => setIsOpenFilters(!isOpenFilters)}
                            >
                                Фильтры
                            </Button>
                            <h1 className={'page-header'}>Доплаты</h1>
                            <Button
                                type="primary"
                                disabled={!canSave}
                                loading={savingInfo}
                                icon={<SaveOutlined />}
                                style={{width: '125px'}}
                                onClick={saveSurcharge}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </Affix>
                </Header>
                <Layout className="sk-layout-center">
                    <Sider
                        width={isOpenFilters ? "330px" : 0}
                        className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}
                    >
                        <Affix offsetTop={54}>
                            <div className="sk-width-container">
                                <div className="sk-usp-filter-col">
                                    <div className={'sk-usp-filter-col-item'}>
                                        <span className={'sk-usp-filter-col-label'}>Год</span>
                                        <Select
                                            style={{width: '100%'}}
                                            value={filterParams.year}
                                            options={years}
                                            onChange={(year) => setFilterParams((current) => ({...current, year}))}
                                        />
                                    </div>
                                    <div className={'sk-usp-filter-col-item'}>
                                        <span className={'sk-usp-filter-col-label'}>Месяц</span>
                                        <Select
                                            style={{width: '100%'}}
                                            value={filterParams.month}
                                            options={months}
                                            onChange={(month) => setFilterParams((current) => ({...current, month}))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Affix>
                    </Sider>
                    <Content className="content">
                        <div className={`sk-content-table-wrapper ${styles.sk_accounting_table_wrapper}`}>
                            <Spin tip="Ожидайте" spinning={false} style={{width: '100%', height: '100%'}}>
                                <div className={`sk-content-table ${styles.sk_accounting_table}`}>
                                    <Affix offsetTop={44}>
                                        <div className={styles.sk_table_row_surcharges}>
                                            <div className={styles.sk_department_table_header}>
                                                <p className={styles.sk_department_table_header_p}>ФИО</p>
                                            </div>
                                            <div className={styles.sk_department_table_header}>
                                                <p className={styles.sk_department_table_header_p}>Причина</p>
                                            </div>
                                            <div className={styles.sk_department_table_header}>
                                                <p className={styles.sk_department_table_header_p}>Сумма</p>
                                            </div>
                                        </div>
                                    </Affix>
                                    <div className={styles.sk_surcharge_add_row}>
                                        <div className={styles.sk_person_row_content}>
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder="Сотрудник"
                                                optionFilterProp="label"
                                                value={formRow.user_id}
                                                options={userOptions}
                                                onChange={(userId) => setFormRow((current) => ({...current, user_id: userId}))}
                                            />
                                        </div>
                                        <div className={styles.sk_person_row_content}>
                                            <Input
                                                placeholder="Причина"
                                                value={formRow.message}
                                                onChange={(event) => setFormRow((current) => ({...current, message: event.target.value}))}
                                                onPressEnter={saveSurcharge}
                                            />
                                        </div>
                                        <div className={styles.sk_person_row_content}>
                                            <InputNumber
                                                placeholder="Сумма"
                                                min={0}
                                                precision={2}
                                                stringMode
                                                value={formRow.price}
                                                onChange={(price) => setFormRow((current) => ({...current, price}))}
                                                onPressEnter={saveSurcharge}
                                            />
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                disabled={!canSave}
                                                loading={savingInfo}
                                                onClick={saveSurcharge}
                                            />
                                        </div>
                                    </div>
                                    {isLoading ? renderSkeleton() : (
                                        <>
                                            {surcharges.map((surcharge) => (
                                                <div key={surcharge.id ?? `${surcharge.user_id}-${surcharge.message}-${surcharge.price}`} className={styles.sk_surcharge_row}>
                                                    <div className={styles.sk_person_row_content}>
                                                        <p className={styles.sk_person_row_p} title={getSurchargeUserName(surcharge)}>
                                                            {getSurchargeUserName(surcharge)}
                                                        </p>
                                                    </div>
                                                    <div className={styles.sk_person_row_content}>
                                                        <p className={styles.sk_person_row_p} title={surcharge.message}>
                                                            {surcharge.message}
                                                        </p>
                                                    </div>
                                                    <div className={styles.sk_person_row_content}>
                                                        <p className={styles.sk_surcharge_price}>
                                                            {Number(surcharge.price ?? 0).toLocaleString('ru-RU', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                            {surcharges.length === 0 && (
                                                <div className={styles.sk_surcharge_empty_state}>
                                                    <Empty description="Доплат за выбранный месяц нет" />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </Spin>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AccountingSurchargesPage;
