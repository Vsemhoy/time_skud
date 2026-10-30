import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, InputNumber, Popconfirm, Space, Table, Typography } from 'antd';
import axios from 'axios';
import { ROUTE_PREFIX, CSRF_TOKEN, HTTP_HOST } from '../../../CONFIG/config';

const duration = (seconds) => `${Number((Number(seconds || 0) / 3600).toFixed(3))} ч`;
const errorText = (e) => Object.values(e.response?.data?.errors || {}).flat().join(' ') || e.response?.data?.message || 'Не удалось выполнить операцию';
// A forbidden bank is a permissions error, not an expired login session.
const bankApi = axios.create({ baseURL: HTTP_HOST, withCredentials: true, timeout: 300000 });
const post = async (path, data) => (await bankApi.post(`${ROUTE_PREFIX}/timeskud/time-bank/${path}`, { data, _token: CSRF_TOKEN })).data.content;

export default function TimeBankPanel({ userId, claimId, claimType, readOnly = false, debitStart, debitEnd, allowAdjust = true }) {
  const [bank, setBank] = useState(null);
  const [preview, setPreview] = useState(null);
  const [hours, setHours] = useState(null);
  const [adjustHours, setAdjustHours] = useState(null);
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState(false);
  const [quote, setQuote] = useState(null);
  const [quoteError, setQuoteError] = useState('');
  useEffect(() => {
    let cancelled = false;
    setQuote(null); setQuoteError('');
    if (!userId || !debitStart || !debitEnd) return;
    const timer = setTimeout(() => post('quote', { user_id: userId, start: debitStart, end: debitEnd })
      .then(value => { if (!cancelled) setQuote(value); })
      .catch(e => { if (!cancelled) setQuoteError(errorText(e)); }), 350);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [userId, debitStart, debitEnd]);
  const load = () => post('show', { user_id: userId, claim_id: claimId }).then(setBank);
  useEffect(() => {
    let cancelled = false;
    setBank(null); setPreview(null); setHours(null); setError(''); setHistory(false);
    if (userId) post('show', { user_id: userId, claim_id: claimId })
      .then(value => { if (!cancelled) setBank(value); })
      .catch(e => { if (!cancelled) setError(errorText(e)); });
    return () => { cancelled = true; };
  }, [userId, claimId]);
  const run = async (action) => {
    setBusy(true); setError('');
    try { await action(); } catch (e) { setError(errorText(e)); setPreview(null); }
    finally { setBusy(false); }
  };
  const creditable = [6, 10, 13].includes(Number(claimType));
  return <Space direction="vertical" style={{ width: '100%', margin: '16px 0' }}>
    <Typography.Title level={5}>Банк времени</Typography.Title>
    {error && <Alert type="error" showIcon message={error} />}
    {quoteError && <Alert type="warning" showIcon message={quoteError} />}
    {quote && <Alert type="info" message={`Стоимость выбранного отгула: ${duration(quote.seconds)}`} />}
    {bank && <>
      <Space wrap><span>Баланс: <b>{duration(bank.balance_seconds)}</b></span><span>Резерв: {duration(bank.reserved_seconds)}</span><span>Доступно: <b>{duration(bank.available_seconds)}</b></span></Space>
      {bank.credit ? <Alert type="success" message={`По заявке начислено ${duration(bank.credit.seconds)}. Подтверждение выполнено, повторное начисление запрещено.`} />
        : !readOnly && claimId && creditable && (Number(claimType) === 13 ? bank.can_credit_containers : bank.can_manage) && <>
          {Number(claimType) === 13 && <Space><span>Часов за контейнеры</span><InputNumber min={1} max={100000} precision={0} step={1} value={hours} onChange={value => { setHours(value); setPreview(null); }} /></Space>}
          <Button loading={busy} disabled={Number(claimType) === 13 && !hours} onClick={() => run(async () => {
            setPreview(await post(`preview/${claimId}`, { hours: Number(claimType) === 13 ? hours : null }));
          })}>Рассчитать начисление</Button>
          {preview && <Alert type="info" message={`К начислению: ${duration(preview.seconds)}`} description="После подтверждения начисление по этой заявке нельзя повторить. Исправления доступны админу и суперу через корректировку." />}
          {preview?.seconds > 0 && <Popconfirm title={`Начислить ${duration(preview.seconds)}?`} description="Подтвердить начисление по заявке можно только один раз." onConfirm={() => run(async () => {
            await post(`confirm/${claimId}`, { token: preview.token }); setPreview(null); await load();
          })}><Button type="primary" disabled={busy}>Подтвердить начисление</Button></Popconfirm>}
        </>}
      <Button type="link" onClick={() => setHistory(!history)}>{history ? 'Скрыть историю' : 'История операций и резервов'}</Button>
      {history && <>
        <Table size="small" rowKey="id" dataSource={bank.entries} pagination={{ pageSize: 8 }} columns={[
          { title: 'Дата', dataIndex: 'created_at' },
          { title: 'Заявка', dataIndex: 'claim_id', render: id => id ? `№${id}` : '—' },
          { title: 'Часы', dataIndex: 'seconds', render: duration },
          { title: 'Основание', dataIndex: 'reason' },
          { title: 'Подтвердил', dataIndex: 'actor_id', render: id => id ? `#${id}` : 'Система' },
        ]} />
        {bank.reservations.map(r => <div key={r.claim_id}>Заявка №{r.claim_id}: зарезервировано {duration(r.seconds)}</div>)}
      </>}
      {allowAdjust && bank.can_adjust && <Space direction="vertical">
        <Typography.Text>Ручная корректировка (положительное или отрицательное число часов)</Typography.Text>
        <InputNumber value={adjustHours} step={1} precision={0} onChange={setAdjustHours} />
        <Input.TextArea placeholder="Обязательная причина корректировки" value={reason} onChange={e => setReason(e.target.value)} />
        <Popconfirm title="Применить корректировку баланса?" onConfirm={() => run(async () => {
          const key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16; return (c === 'x' ? r : (r & 3) | 8).toString(16); });
          await post('adjust', { user_id: userId, seconds: adjustHours * 3600, reason, key });
          setAdjustHours(null); setReason(''); await load();
        })}><Button disabled={busy || !adjustHours || !reason.trim()}>Скорректировать</Button></Popconfirm>
      </Space>}
    </>}
  </Space>;
}
