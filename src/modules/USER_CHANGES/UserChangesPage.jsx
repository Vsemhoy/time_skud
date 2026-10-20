import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, DatePicker, Form, InputNumber, Select, Table, Tag, Typography} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import {PROD_AXIOS_INSTANCE} from '../../API/API';
import {CSRF_TOKEN, ROUTE_PREFIX} from '../../CONFIG/config';
import './userchanges.css';

const entities = {staff: 'Персональные данные', schedule: 'График работы', rule: 'Правило учёта РВ'};
const actions = {create: 'Создание', update: 'Изменение', delete: 'Удаление'};
const colors = {create: 'green', update: 'blue', delete: 'red'};
const fields = {
    surname: 'Фамилия', name: 'Имя', secondname: 'Отчество', patronymic: 'Отчество',
    email: 'Эл. почта', phone: 'Телефон', login: 'Логин', password: 'Пароль',
    password2: 'Пароль', remember_token: 'Токен сессии', id: 'ID',
    staff_id: 'Сотрудник', user_id: 'Сотрудник', id_company: 'Компания',
    id_departament: 'Отдел', occupy: 'Должность', sales_role: 'Роль',
    date_start: 'Дата начала', date_end: 'Дата окончания', schedule_id: 'График',
    rule_id: 'Правило', status: 'Статус', card: 'Номер карточки',
};
const options = (labels) => Object.entries(labels).map(([value, label]) => ({value, label}));
const formatValue = (value) => {
    if (value === null || value === undefined) return '—';
    if (value === '') return '(пустая строка)';
    if (typeof value === 'boolean') return value ? 'Да' : 'Нет';
    return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
};
const errorText = (error) => {
    const errors = error.response?.data?.errors;
    return errors ? Object.values(errors).flat().join(' ') :
        error.response?.data?.message || 'Не удалось загрузить историю изменений. Попробуйте ещё раз.';
};

export default function UserChangesPage() {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [staffNames, setStaffNames] = useState({});
    const [usersError, setUsersError] = useState('');
    const [query, setQuery] = useState({currentPage: 1, pageSize: 50});
    const [result, setResult] = useState({changes: [], allChangesCount: 0});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [reload, setReload] = useState(0);
    const [filtersOpen, setFiltersOpen] = useState(true);
    const filterTimer = useRef();
    const filterVersion = useRef(0);

    useEffect(() => () => {
        clearTimeout(filterTimer.current);
        filterVersion.current += 1;
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/claims/getusers`,
            {data: {}, _token: CSRF_TOKEN}, {signal: controller.signal})
            .then(({data}) => setUsers((data.content ?? []).map((user) => {
                const name = [user.surname, user.name, user.patronymic ?? user.secondname].filter(Boolean).join(' ');
                return {
                    value: Number(user.id),
                    name,
                    searchLabel: `${name} ${user.id}`,
                    label: <span><Tag>{user.id}</Tag> {name}</span>,
                };
            })))
            .catch(() => {
                if (!controller.signal.aborted) setUsersError('Не удалось загрузить список сотрудников. Можно указать ID вручную.');
            });
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const {staffId, ...data} = query;
        setLoading(true);
        setError('');
        setResult({changes: [], allChangesCount: 0});
        PROD_AXIOS_INSTANCE.post(
            `${ROUTE_PREFIX}/hr/userchanges${staffId ? `/${staffId}` : ''}`,
            {data, _token: CSRF_TOKEN},
            {signal: controller.signal},
        ).then(({data: response}) => {
            if (!response.content || !Array.isArray(response.content.changes)) {
                throw new Error('Некорректный ответ сервера');
            }
            setResult(response.content);
        }).catch((err) => {
            if (!controller.signal.aborted) setError(errorText(err));
        }).finally(() => {
            if (!controller.signal.aborted) setLoading(false);
        });
        return () => controller.abort();
    }, [query, reload]);

    useEffect(() => {
        const missingIds = [...new Set(result.changes
            .filter((record) => !record.staff_name)
            .map((record) => record.staff_id))]
            .filter((id) => id != null && !(id in staffNames)
                && !users.some((user) => user.value === Number(id) && user.name));
        if (!missingIds.length) return;

        const controller = new AbortController();
        Promise.all(missingIds.map(async (id) => {
            try {
                const {data} = await PROD_AXIOS_INSTANCE.post(
                    `${ROUTE_PREFIX}/hr/selecteduserinfosmall/${id}`,
                    {_token: CSRF_TOKEN},
                    {signal: controller.signal},
                );
                return [id, data.content?.fio?.trim() || null];
            } catch {
                return [id, null];
            }
        })).then((entries) => {
            if (!controller.signal.aborted) {
                setStaffNames((previous) => ({...previous, ...Object.fromEntries(entries)}));
            }
        });
        return () => controller.abort();
    }, [result.changes, users, staffNames]);

    const applyFilters = (changedValues) => {
        clearTimeout(filterTimer.current);
        const version = ++filterVersion.current;
        const delay = 'actorId' in changedValues || (usersError && 'staffId' in changedValues) ? 350 : 0;
        filterTimer.current = setTimeout(async () => {
            try {
                const values = await form.validateFields();
                if (version !== filterVersion.current) return;
                setQuery((previous) => ({
                    currentPage: 1,
                    pageSize: previous.pageSize,
                    ...values,
                    dateFrom: values.dateFrom?.format('YYYY-MM-DD'),
                    dateTo: values.dateTo?.format('YYYY-MM-DD'),
                }));
            } catch {
                // Invalid filters remain visible in the form; keep the last valid query.
            }
        }, delay);
    };
    const columns = [
        {title: 'Дата и время', dataIndex: 'created_at', width: 145, render: (value) =>
            value && dayjs(value).isValid() ? <>{dayjs(value).format('DD.MM.YYYY')} <span className="user-changes-time">{dayjs(value).format('HH:mm:ss')}</span></> : '—'},
        {title: 'Сотрудник', dataIndex: 'staff_id', width: 170, render: (id, record) =>
            <Link to={`/hr/usermanager/${id}`}><Tag title="Номер сотрудника">{id}</Tag> {record.staff_name || users.find((user) => user.value === Number(id))?.name || staffNames[id] || (id in staffNames ? 'ФИО недоступно' : 'Загрузка ФИО…')}</Link>},
        {title: 'Автор', dataIndex: 'actor_name', width: 170, render: (name, record) =>
            <>{record.actor_id != null && <Tag title="Номер автора">{record.actor_id}</Tag>} {name || 'Автор не найден'}</>},
        {title: 'Раздел', dataIndex: 'entity_type', width: 150, align: 'center', render: (value) =>
            entities[value] || value},
        {title: 'Действие', dataIndex: 'action', width: 105, render: (value) => <Tag color={colors[value]}>{actions[value] || value}</Tag>},
        {title: 'Изменения', dataIndex: 'changes', width: 420, render: (changes) =>
            <table className="user-changes-diff">
                <thead><tr><th>Поле</th><th>Было</th><th>Стало</th></tr></thead>
                <tbody>{(changes ?? []).filter((change) => change.column !== 'recruitment_date').map((change, index) => (
                    <tr key={`${change.column}-${index}`}>
                        <th title={change.column}>{fields[change.column] || change.column}</th>
                        {change.redacted ? <td colSpan={2}><Typography.Text type="secondary">Значение скрыто</Typography.Text></td> :
                            <><td>{formatValue(change.old)}</td><td>{formatValue(change.new)}</td></>}
                    </tr>
                ))}</tbody>
            </table>},
    ];

    return (
        <div className="user-changes-page">
            <header className="user-changes-toolbar">
                <Button className="user-changes-filter-toggle" icon={<FilterOutlined />}
                    aria-expanded={filtersOpen} aria-controls="user-changes-filters"
                    onClick={() => setFiltersOpen((value) => !value)}>Фильтры</Button>
                <Typography.Title level={2}>История изменений</Typography.Title>
            </header>
            <div className={`user-changes-layout${filtersOpen ? '' : ' without-filters'}`}>
            <aside id="user-changes-filters" className="user-changes-sidebar" hidden={!filtersOpen}>
                {usersError && <Alert type="warning" message={usersError} showIcon style={{marginBottom: 16}} />}
                <Form form={form} layout="vertical" onValuesChange={applyFilters}>
                    <div className="user-changes-filters">
                        <Form.Item name="staffId" label="Сотрудник">
                            {usersError ? <InputNumber min={1} precision={0} placeholder="ID сотрудника" style={{width: '100%'}} /> :
                                <Select allowClear showSearch optionFilterProp="searchLabel" placeholder="Все сотрудники" options={users} />}
                        </Form.Item>
                        <Form.Item name="entityType" label="Раздел">
                            <Select allowClear placeholder="Все разделы" options={options(entities)} />
                        </Form.Item>
                        <Form.Item name="action" label="Действие">
                            <Select allowClear placeholder="Все действия" options={options(actions)} />
                        </Form.Item>
                        <Form.Item name="actorId" label="ID автора">
                            <InputNumber min={1} precision={0} placeholder="Любой автор" style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item name="dateFrom" label="Дата с">
                            <DatePicker locale={locale} format="DD.MM.YYYY" style={{width: '100%'}} />
                        </Form.Item>
                        <Form.Item name="dateTo" label="Дата по" dependencies={['dateFrom']} rules={[
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    const from = getFieldValue('dateFrom');
                                    return value && from && value.isBefore(from, 'day')
                                        ? Promise.reject(new Error('Конец периода раньше начала'))
                                        : Promise.resolve();
                                },
                            }),
                        ]}>
                            <DatePicker locale={locale} format="DD.MM.YYYY" style={{width: '100%'}} />
                        </Form.Item>
                    </div>
                </Form>
            </aside>
            <main className="user-changes-results">
            {error && <Alert type="error" showIcon message={error} action={<Button onClick={() => setReload((value) => value + 1)}>Повторить</Button>} />}
            <Table
                className="user-changes-table"
                size="small"
                bordered
                rowKey="id"
                columns={columns}
                dataSource={result.changes}
                loading={loading}
                scroll={{x: 1160}}
                locale={{emptyText: error ? 'История не загружена' : 'Изменений по заданным условиям нет'}}
                pagination={{
                    position: ['topLeft'],
                    current: result.currentPage ?? query.currentPage,
                    pageSize: result.pageSize ?? query.pageSize,
                    total: result.allChangesCount,
                    showSizeChanger: true,
                    pageSizeOptions: [25, 50, 100],
                    showTotal: (total) => `Всего записей: ${total}`,
                    onChange: (currentPage, pageSize) => setQuery((previous) => ({
                        ...previous, pageSize, currentPage: pageSize !== previous.pageSize ? 1 : currentPage,
                    })),
                }}
            />
            </main>
            </div>
        </div>
    );
}
