import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Button, Card, Col, DatePicker, Descriptions, Empty, Row, Skeleton, Space, Table, Tabs, Tag, Typography } from 'antd';
import { UserOutlined, ReloadOutlined, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { PROD_AXIOS_INSTANCE } from '../../API/API';
import { ROUTE_PREFIX, CSRF_TOKEN } from '../../CONFIG/config';
import TimeBankPanel from '../CLAIM_MANAGER_SK/components/TimeBankPanel';
import { formatMoscowDateTime } from '../../components/Helpers/DateTimeHelpers';

const hours = value => value == null ? '—' : `${Number((Number(value) / 3600).toFixed(2))} ч`;
const clock = value => value == null ? '—' : `${String(Math.floor(value / 3600)).padStart(2, '0')}:${String(Math.floor(value % 3600 / 60)).padStart(2, '0')}`;
const statuses = { 0: ['На согласовании', 'gold'], 1: ['Согласована', 'green'], 2: ['Отклонена', 'red'], 3: ['Отменена', 'default'] };

export default function AccountPage({ userdata }) {
  const userId = userdata?.user?.id;
  const [month, setMonth] = useState(dayjs().startOf('month'));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError('');
    PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/me`, { data: { month: month.format('YYYY-MM') }, _token: CSRF_TOKEN })
      .then(response => { if (!cancelled) setData(response.data.content); })
      .catch(e => { if (!cancelled) setError(e.response?.data?.message || 'Не удалось загрузить личный кабинет'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [userId, month, revision]);

  const profile = data?.profile;
  const name = profile ? [profile.surname, profile.name, profile.secondname].filter(Boolean).join(' ') : 'Сотрудник';
  const schedule = data?.schedule;
  return <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 16px 40px' }}>
    <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }} wrap>
      <div><Typography.Title level={2} style={{ margin: 0 }}>Личный кабинет</Typography.Title><Typography.Text type="secondary">Мои данные, рабочее время и заявки</Typography.Text></div>
      <Button icon={<ReloadOutlined />} loading={loading} onClick={() => setRevision(v => v + 1)}>Обновить</Button>
    </Space>
    {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 16 }} />}
    {!data && loading ? <Skeleton active paragraph={{ rows: 8 }} /> : data && <>
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={10}>
          <Card style={{ height: '100%' }}>
            <Space align="start" size={16} style={{ marginBottom: 24 }}>
              <Avatar size={64} icon={<UserOutlined />} />
              <div><Typography.Title level={4} style={{ margin: '0 0 4px' }}>{name}</Typography.Title><Typography.Text type="secondary">{profile.occupy || 'Должность не указана'}</Typography.Text></div>
            </Space>
            <Descriptions column={1} size="small" items={[
              { key: 'company', label: 'Компания', children: data.company || '—' },
              { key: 'department', label: 'Подразделение', children: data.department || '—' },
              { key: 'manager', label: 'Руководитель', children: data.manager || '—' },
              { key: 'email', label: 'Почта', children: profile.email || '—' },
              { key: 'phone', label: 'Телефон', children: profile.phone || '—' },
            ]} />
          </Card>
        </Col>
        <Col xs={24} lg={14}>
          <Card style={{ height: '100%' }}>
            <TimeBankPanel key={`${profile.id}-${revision}`} userId={profile.id} readOnly allowAdjust={false} />
            <Typography.Text type="secondary">Часы начисляются после подтверждения руководителем. Согласованные отгулы резервируют часы до списания.</Typography.Text>
          </Card>
        </Col>
        <Col span={24}>
          <Card title={<Space><ClockCircleOutlined />Текущий график</Space>}>
            {schedule ? <Space size="large" wrap>
              <b>{schedule.name || 'Рабочий график'}</b><span>{clock(schedule.start_time)} — {clock(schedule.end_time)}</span>
              <span>Норма: {hours(schedule.target_time)}</span><span>Обед: {hours(schedule.lunch_time)}</span>
            </Space> : <Typography.Text type="secondary">График не назначен</Typography.Text>}
          </Card>
        </Col>
        <Col span={24}>
          <Card title={<Space><CalendarOutlined />Мой месяц</Space>} extra={<DatePicker picker="month" allowClear={false} value={month} onChange={setMonth} format="MM.YYYY" />}>
            <Tabs items={[
              { key: 'claims', label: `Мои заявки (${data.claims.length})`, children: <Table rowKey="id" dataSource={data.claims} loading={loading} size="middle" scroll={{ x: 650 }} pagination={{ pageSize: 8 }} locale={{ emptyText: <Empty description="За этот месяц заявок нет" /> }} columns={[
                { title: 'Заявка', dataIndex: 'id', render: (id, row) => <Link to={`/claims?id=${id}`}>№{id} · {row.skud_current_state?.title || 'Заявка'}</Link> },
                { title: 'Начало', dataIndex: 'start', render: value => formatMoscowDateTime(value, 'DD.MM.YYYY HH:mm') },
                { title: 'Окончание', dataIndex: 'end', render: value => formatMoscowDateTime(value, 'DD.MM.YYYY HH:mm') },
                { title: 'Статус', dataIndex: 'state', render: value => <Tag color={statuses[value]?.[1]}>{statuses[value]?.[0] || '—'}</Tag> },
                { title: 'Банк', dataIndex: 'uses_time_bank', render: value => value ? 'Из банка времени' : '—' },
              ]} /> },
              { key: 'attendance', label: 'Учёт времени', children: <>
                <Alert type="info" showIcon message="Зачтённое время учитывает график и заявки, включая отпуск и отгулы. Оно не равно фактическому присутствию и не начисляется в банк автоматически." style={{ marginBottom: 16 }} />
                <Table rowKey="control_date" dataSource={data.daily} loading={loading} scroll={{ x: 650 }} pagination={{ pageSize: 10 }} locale={{ emptyText: <Empty description="За этот месяц расчёта пока нет" /> }} columns={[
                  { title: 'Дата', dataIndex: 'control_date', render: value => dayjs(value).format('DD.MM.YYYY') },
                  { title: 'Вход', dataIndex: 'enter_time', render: value => value ? formatMoscowDateTime(typeof value === 'number' ? new Date(value * 1000) : value, 'HH:mm') : '—' },
                  { title: 'Выход', dataIndex: 'exit_time', render: value => value ? formatMoscowDateTime(typeof value === 'number' ? new Date(value * 1000) : value, 'HH:mm') : '—' },
                  { title: 'Зачтено', dataIndex: 'job_time_count', render: hours },
                  { title: 'Недоработка', dataIndex: 'lost_time_count', render: hours },
                ]} />
              </> },
            ]} />
          </Card>
        </Col>
      </Row>
    </>}
  </div>;
}
