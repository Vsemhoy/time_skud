 import React, {useEffect, useRef, useState} from 'react';
import styles from "../style/user_page.module.css";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Alert, Button, DatePicker, Empty, Pagination, Select, Spin, Tag} from "antd";
import {ClearOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {CSRF_TOKEN, ROUTE_PREFIX} from "../../../CONFIG/config"
import {findScheduleBreaks, findScheduleConflicts} from "./schedulePeriods.mjs";
import dayjs from "dayjs";
import SchedIcons from "../../../assets/Comicon/SchedIcons";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";

function SchedulesWorkspace(props) {
    const navigate = useNavigate();
    const { userIdState, prepareAndShowAlert } = useOutletContext();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [allSchedules, setAllSchedules] = useState([]);
    const [scheduleTypes, setScheduleTypes] = useState([{id: 0, name: 'Все типы графиков'}]);
    const [scheduleNames, setScheduleNames] = useState([]);
    const [scheduleTypeFilter, setScheduleTypeFilter] = useState(0);
    const [editedSchedule, setEditedSchedule] = useState({id: 0});
    const [toolbarTypeScheduleId, setToolbarTypeScheduleId] = useState(null);
    const [toolbarNameScheduleId, setToolbarNameScheduleId] = useState(null);
    const [toolbarDateStartSchedule, setToolbarDateStartSchedule] = useState(null);
    const [toolbarDateEndSchedule, setToolbarDateEndSchedule] = useState(null);
    const formRef = useRef(null);

    const filteredSchedules = allSchedules.filter(item => !scheduleTypeFilter || +item.schedule_type === +scheduleTypeFilter);
    const allSchedulesCount = filteredSchedules.length;
    const pageSchedules = filteredSchedules.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const schedules = scheduleTypeFilter ? pageSchedules : findScheduleBreaks(pageSchedules);
    const today = dayjs().startOf('day');
    const activeSchedule = allSchedules.find(item => !dayjs(item.start).startOf('day').isAfter(today) &&
        (!item.end || !dayjs(item.end).endOf('day').isBefore(today))) || {};
    const conflicts = findScheduleConflicts(allSchedules, toolbarDateStartSchedule, toolbarDateEndSchedule, editedSchedule.id);
    const intersections = conflicts.map(item => item.id);
    const invalidPeriod = toolbarDateStartSchedule && toolbarDateEndSchedule && toolbarDateEndSchedule.isBefore(toolbarDateStartSchedule, 'day');
    const isDisabledEndScheduleDate = date => toolbarDateStartSchedule && date.isBefore(toolbarDateStartSchedule, 'day');

    // Load every page without a type filter: hidden assignments must also block overlaps.
    const loadAllSchedules = async () => {
        const result = [];
        let page = 1;
        let total = 0;
        do {
            const response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/userschedules/${userIdState}`, {
                data: {scheduleTypeFilter: 0, currentPage: page, pageSize: 100}, _token: CSRF_TOKEN,
            });
            const content = response.data.content;
            if (!content || !Array.isArray(content.schedules)) throw new Error('Не удалось загрузить привязки графиков');
            total = Number(content.allSchedulesCount);
            if (!Number.isFinite(total) || (!content.schedules.length && result.length < total)) throw new Error('Не удалось загрузить все привязки графиков');
            result.push(...content.schedules);
            page += 1;
        } while (result.length < total);
        return result.sort((a, b) => dayjs(b.start).valueOf() - dayjs(a.start).valueOf());
    };
    const fetchInfo = async () => {
        setIsLoading(true);
        setLoadError(false);
        try {
            const [items, response] = await Promise.all([
                loadAllSchedules(),
                PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/userscheduleselects`, {user_id: userIdState, _token: CSRF_TOKEN}),
            ]);
            if (!response.data.content) throw new Error('Не удалось загрузить список графиков');
            setAllSchedules(items);
            setScheduleTypes([{id: 0, name: 'Все типы графиков'}, ...response.data.content.types]);
            setScheduleNames(response.data.content.names);
        } catch (error) {
            setLoadError(true);
            prepareAndShowAlert('error', 'Не удалось загрузить графики', error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        clearEdit();
        setAllSchedules([]);
        setCurrentPage(1);
        if (userIdState === 'new') navigate(`/hr/usermanager/${userIdState}`);
        else fetchInfo();
    }, [userIdState]);

    const removeSchedule = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы уверены, что хотите удалить этот график?')) {
            await fetchRemoveSchedule(id);
        }
    };
    const fetchRemoveSchedule = async (id) => {
        //if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.delete(`${ROUTE_PREFIX}/hr/userscheduleremove/${id}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                prepareAndShowAlert(
                    'success',
                    'Успех',
                    'График отвязан!'
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching remove user schedule:', error);
                prepareAndShowAlert(
                    'error',
                    'Произошла ошибка',
                    error.response?.data?.message || error.message || 'Неизвестная ошибка'
                );
            }
        // } else {
        //     await fetchInfo();
        // }
    };

    const toEditSchedule = (id) => {
        const schedule = allSchedules.find(item => +item.id === +id);
        setEditedSchedule(schedule);
        setToolbarTypeScheduleId(schedule.schedule_type);
        setToolbarNameScheduleId(schedule.schedule_id);
        setToolbarDateStartSchedule(dayjs(schedule.start));
        setToolbarDateEndSchedule(schedule.end ? dayjs(schedule.end) : null);
        formRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
    };
    const getSelectedScheduleTypeId = () => toolbarTypeScheduleId ||
        scheduleNames.find(item => +item.id === +toolbarNameScheduleId)?.skud_schedule_type_id;
    const isCantAddSchedule = () => Boolean(isLoading || isSaving || loadError || !toolbarNameScheduleId ||
        !toolbarDateStartSchedule || invalidPeriod || conflicts.length);
    const isDisableField = () => Boolean(editedSchedule.id && +editedSchedule.id === +activeSchedule.id);
    const clearEdit = () => {
        setEditedSchedule({id: 0});
        setToolbarTypeScheduleId(null);
        setToolbarNameScheduleId(null);
        setToolbarDateStartSchedule(null);
        setToolbarDateEndSchedule(null);
    };
    const fetchAddOrUpdateSchedule = async () => {
        if (isCantAddSchedule()) return;
        setIsSaving(true);
        try {
            const latest = await loadAllSchedules();
            setAllSchedules(latest);
            if (findScheduleConflicts(latest, toolbarDateStartSchedule, toolbarDateEndSchedule, editedSchedule.id).length) {
                prepareAndShowAlert('error', 'Период занят', 'Привязки обновились. Выберите период без пересечений.');
                return;
            }
            await PROD_AXIOS_INSTANCE.post(editedSchedule.id
                ? `${ROUTE_PREFIX}/hr/userupdateschedules/${editedSchedule.id}`
                : `${ROUTE_PREFIX}/hr/useraddschedules`, {
                data: {
                    userId: userIdState,
                    ...(editedSchedule.id ? {editedSchedule} : {}),
                    toolbarTypeScheduleId: getSelectedScheduleTypeId(),
                    toolbarNameScheduleId,
                    toolbarDateStartSchedule: toolbarDateStartSchedule.format('YYYY-MM-DD'),
                    toolbarDateEndSchedule: toolbarDateEndSchedule?.format('YYYY-MM-DD') || null,
                },
                _token: CSRF_TOKEN,
            });
            prepareAndShowAlert('success', 'Сохранено', editedSchedule.id ? 'Привязка графика обновлена' : 'График привязан');
            clearEdit();
            await fetchInfo();
        } catch (error) {
            prepareAndShowAlert('error', 'Не удалось сохранить график', error.response?.data?.message || error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const timeString = (totalSeconds, mod = null) => {
        if (totalSeconds == null) return '—';
        if (mod === 'm') {
            const totalMinutes = Math.floor(totalSeconds / 60);
            return totalMinutes.toString();
        }

        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');

        if (mod) {
            if (mod === 'h') return `${hours}`;
            if (mod === 'hm') return `${hours}:${minutes}`;
        } else {
            return `${hours}:${minutes}`;
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_schedule_workspace}>
                <div className={styles.sk_schedules_table}>
                    <div className={styles.sk_schedule_table_label}>Графики работы пользователя</div>
                    <div className={styles.sk_pagination_wrapper}>
                        <div className={styles.sk_pagination_container}>
                            <Pagination
                                current={currentPage}
                                total={allSchedulesCount}
                                pageSize={pageSize}
                                pageSizeOptions={[20, 50, 100]}
                                locale={{
                                    items_per_page: 'на странице',
                                    jump_to: 'Перейти',
                                    jump_to_confirm: 'OK',
                                    page: 'Страница'
                                }}
                                onShowSizeChange={(current, newSize) => {setPageSize(newSize); setCurrentPage(1);}}
                                onChange={(page, size) => setCurrentPage(size === pageSize ? page : 1)}
                            />
                            <Tag
                                style={{
                                    width: '160px',
                                    height: '30px',
                                    lineHeight: '27px',
                                    textAlign: 'center',
                                    color: 'var(--app-muted-text-color)',
                                    fontSize: '14px',
                                    backgroundColor: 'var(--row-second-bg-color)',
                                    borderColor: 'var(--table-border-divider-color)',
                                }}
                            >Всего найдено: {allSchedulesCount}</Tag>
                        </div>
                        <Select
                            value={scheduleTypeFilter}
                            options={scheduleTypes}
                            style={{width: '200px'}}
                            onChange={(id) => {setScheduleTypeFilter(id); setCurrentPage(1);}}
                            fieldNames={{
                                value: 'id',
                                label: 'name',
                            }}
                        />
                    </div>
                    {loadError && <Alert type="error" showIcon message="Не удалось проверить привязки" description="Обновите данные перед сохранением." action={<Button onClick={fetchInfo}>Повторить</Button>} />}
                    {!isLoading && !loadError && !allSchedulesCount && <Empty description="Привязок графиков нет. Выберите график и дату начала в форме." />}
                    <div className={styles.sk_schedule_table}>
                        <div className={`${styles.sk_schedule_table_row_wrapper} ${styles.sk_table_row_header}`}>
                            <div className={styles.sk_schedule_table_row}>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Тип</p>
                                </div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}></div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p} style={{textAlign: 'left'}}>Название, описание</p>
                                </div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Работа</p>
                                </div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Обед</p>
                                </div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Начало действия</p>
                                </div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Действует до</p>
                                </div>
                                <div className={`${styles.sk_schedule_table_cell} ${styles.sk_schedule_table_cell_header}`}></div>
                            </div>
                        </div>
                        {schedules.map(schedule => (
                            !schedule.isBreak ? (
                                    <div key={schedule.id} className={`${styles.sk_schedule_table_row_wrapper} 
                                                                       ${+schedule.id === +activeSchedule.id ? styles.sk_table_row_active : ''}
                                                                       ${schedule.id === +editedSchedule.id ? styles.sk_table_row_edit : ''}
                                                                       ${intersections.find(scheduleId => +scheduleId === +schedule.id) ? styles.sk_table_row_danger : ''}`
                                    }>
                                        <div className={`${styles.sk_schedule_table_row}`}>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container} title={schedule.schedule_type}>
                                                    <SchedIcons type={schedule.schedule_type} size={'100%'}/>
                                                </div>
                                            </div>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container}>
                                                    <p className={styles.sk_schedule_p}>{schedule.id}</p>
                                                </div>
                                            </div>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container}>
                                                    <p className={styles.sk_schedule_name}>{schedule.schedule_name}</p>
                                                    <p className={styles.sk_schedule_description}>{schedule.schedule_type_name}</p>
                                                    <Tag color={+schedule.id === +activeSchedule.id ? "green" : "default"}>{+schedule.id === +activeSchedule.id ? "Действует сейчас" : dayjs(schedule.start).isAfter(today) ? "Запланирован" : "Завершён"}</Tag>
                                                </div>
                                            </div>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container_center}>
                                                    <p className={styles.sk_schedule_description}>с {timeString(schedule.enter)}</p>
                                                    <p className={styles.sk_schedule_description}>до {timeString(schedule.leave)}</p>
                                                </div>
                                            </div>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container_center}>
                                                    <p className={styles.sk_schedule_description}>с {timeString(schedule.lunch_start)}</p>
                                                    <p className={styles.sk_schedule_description}>до {timeString(schedule.lunch_end)}</p>
                                                </div>
                                            </div>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container_center}>
                                                    <p className={styles.sk_schedule_name}>{dayjs(schedule.start).format('DD.MM.YYYY')}</p>
                                                </div>
                                            </div>
                                            <div className={styles.sk_schedule_table_cell}>
                                                <div className={styles.sk_schedule_container_center}>
                                                    <p className={styles.sk_schedule_name}>{schedule.end ? dayjs(schedule.end).format('DD.MM.YYYY') : 'Бессрочно'}</p>
                                                </div>
                                            </div>
                                            {+schedule.id !== +editedSchedule.id ? (
                                                <div className={styles.sk_schedule_table_cell}
                                                     style={{padding: '15px', justifyContent: 'center', gridGap: '5px'}}>
                                                    {(+schedule.id === +activeSchedule.id || dayjs(schedule.start).isAfter(today)) && (
                                                        <Button color={'default'}
                                                                variant={'outlined'}
                                                                shape="circle"
                                                                disabled={isSaving} title="Изменить привязку" aria-label="Изменить привязку" icon={<EditOutlined/>}
                                                                onClick={() => toEditSchedule(schedule.id)}
                                                        ></Button>
                                                    )}
                                                    {dayjs(schedule.start).isAfter(today) && (
                                                        <Button color={'default'}
                                                                variant={'outlined'}
                                                                shape="circle"
                                                                disabled={isSaving} title="Отвязать график" aria-label="Отвязать график" icon={<DeleteOutlined/>}
                                                                onClick={() => removeSchedule(schedule.id)}
                                                        ></Button>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className={styles.sk_schedule_table_cell}
                                                     style={{padding: '15px', justifyContent: 'center'}}>
                                                    <Button color={'default'}
                                                            variant={'outlined'}
                                                            shape="circle"
                                                            disabled={isSaving} title="Отменить редактирование" icon={<CloseOutlined/>}
                                                            onClick={() => clearEdit()}
                                                    ></Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div key={schedule.id} className={`${styles.sk_schedule_table_break_row}`}>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info} style={{textAlign: 'left'}}>Без графика: {schedule.breakDays} дн.</p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}>{dayjs(schedule.start).format('DD.MM.YYYY')}</p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}>{dayjs(schedule.end).format('DD.MM.YYYY')}</p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><Button size="small" type="link" disabled={isSaving} onClick={() => {
                                            clearEdit();
                                            setToolbarDateStartSchedule(dayjs(schedule.start));
                                            setToolbarDateEndSchedule(dayjs(schedule.end));
                                            formRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
                                        }}>Привязать</Button></div>
                                    </div>
                            )
                        ))}
                    </div>
                </div>
                <div ref={formRef} className={styles.sk_schedule_form_wrapper}>
                    <div className={styles.sk_schedule_linker}>
                        <div style={{width: '100%'}}>
                            <div className={styles.sk_flex_space}>
                                <span className={'sk-totoro'}>{editedSchedule.id ? "Изменение привязки" : "Привязать график"}</span>
                                <Button type="text" title="Очистить форму" icon={<ClearOutlined/>} onClick={clearEdit} disabled={isSaving} />
                            </div>
                            <p className={styles.sk_schedule_hint}>Выберите график и период его действия. Можно указать прошлые даты, если период свободен.</p>
                            {isDisableField() && <Alert type="info" showIcon message="У действующего графика можно изменить дату окончания." />}
                            <div className={styles.sk_label_select}>1. Выберите график</div>
                            <Select placeholder={'Все типы графиков'} allowClear
                                    value={toolbarTypeScheduleId}
                                    options={scheduleTypes.filter(schedule => +schedule.id !== 0)}
                                    style={{width: '100%'}}
                                    onChange={(id) => {setToolbarTypeScheduleId(id || null); setToolbarNameScheduleId(null);}}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    disabled={isDisableField() || isSaving}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Название графика</div>
                            <Select placeholder={'Название графика'}
                                    value={toolbarNameScheduleId}
                                    options={toolbarTypeScheduleId ? scheduleNames.filter(name => +name.skud_schedule_type_id === +toolbarTypeScheduleId) : scheduleNames}
                                    style={{width: '100%'}}
                                    onChange={(id) => setToolbarNameScheduleId(id)}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    showSearch
                                    optionFilterProp="name"
                                    filterSort={(a, b) => (a.name || '').localeCompare(b.name || '', 'ru')}
                                    disabled={isDisableField() || isSaving}
                            />
                            {toolbarNameScheduleId ? (
                                    (() => {
                                        let start = null;
                                        let end = null;
                                        let duration = null;
                                        let lunch_start = null;
                                        let lunch_end = null;
                                        let lunch_duration = null;

                                        const shedName = scheduleNames.find(name => +name.id === +toolbarNameScheduleId);
                                        if (shedName) {
                                            start          = timeString(shedName.start_time);
                                            end            = timeString(shedName.end_time);
                                            duration       = timeString(shedName.target_time, 'h');
                                            lunch_start    = timeString(shedName.lunch_start);
                                            lunch_end      = timeString(shedName.lunch_end);
                                            lunch_duration = timeString(shedName.lunch_time, 'm');
                                        }
                                        return (
                                            <>
                                                <br/>
                                                <br/>
                                                <div className={styles.sk_expanded_info}>
                                                    <p className={styles.sk_expanded_info_header}>Параметры выбранного
                                                        графика:</p>
                                                    <p className={styles.sk_expanded_info_line}>Рабочее
                                                        время: {start} - {end} ({duration} ч.)</p>
                                                    <p className={styles.sk_expanded_info_line}>Обед: {lunch_start} - {lunch_end} ({lunch_duration} мин.)</p>
                                                </div>
                                            </>
                                        );
                                    })()
                                ) : null
                            }
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>2. Начало действия *</div>
                            <DatePicker placeholder="Дата начала действия графика"
                                        value={toolbarDateStartSchedule}
                                        onChange={(e) => setToolbarDateStartSchedule(e)}
                                        format={"DD.MM.YYYY"}
                                        style={{width: '100%'}}
                                        disabled={isDisableField() || isSaving}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Окончание действия (включительно)</div>
                            <DatePicker placeholder="Бессрочно" disabled={isSaving}
                                        value={toolbarDateEndSchedule}
                                        onChange={(e) => setToolbarDateEndSchedule(e)}
                                        format={"DD.MM.YYYY"}
                                        disabledDate={isDisabledEndScheduleDate}
                                        style={{width: '100%'}}
                            />
                            <br/>
                            <br/>
                            <p className={styles.sk_schedule_hint}>Без даты окончания график действует бессрочно. Для привязки перед существующим графиком укажите окончание не позднее предыдущего дня.</p>
                            {invalidPeriod ? <Alert type="error" showIcon message="Окончание не может быть раньше начала" /> : conflicts.length ? (
                                <Alert type="error" showIcon message="Период пересекается с другими графиками" description={
                                    <ul className={styles.sk_schedule_conflicts}>{conflicts.map(item => <li key={item.id}>
                                        {item.schedule_name}: {dayjs(item.start).format('DD.MM.YYYY')} — {item.end ? dayjs(item.end).format('DD.MM.YYYY') : 'бессрочно'}
                                    </li>)}</ul>
                                } />
                            ) : toolbarDateStartSchedule && !loadError && !isLoading ? <Alert type="success" showIcon message="Период свободен" description={`С ${toolbarDateStartSchedule.format('DD.MM.YYYY')} ${toolbarDateEndSchedule ? 'по ' + toolbarDateEndSchedule.format('DD.MM.YYYY') + ' включительно' : 'без даты окончания'}`} /> : null}
                            {!toolbarNameScheduleId || !toolbarDateStartSchedule ? <p className={styles.sk_schedule_hint}>Для сохранения выберите график и дату начала.</p> : null}
                            <Button block type="primary" loading={isSaving} style={{marginTop: 16}}
                                    disabled={isCantAddSchedule()}
                                    onClick={() => fetchAddOrUpdateSchedule()}
                            >{editedSchedule.id ? "Сохранить изменения" : "Привязать график"}</Button>
                            {editedSchedule.id ? <Button block onClick={clearEdit} disabled={isSaving} style={{marginTop: 8}}>Отменить редактирование</Button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default SchedulesWorkspace;
