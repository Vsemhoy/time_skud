 import React, {useCallback, useEffect, useState} from 'react';
import styles from "../style/user_page.module.css";
import {useNavigate, useOutletContext} from "react-router-dom";
import {Affix, Button, DatePicker, Pagination, Select, Spin, Tag} from "antd";
import {ClearOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {BASE_ROUTE, CSRF_TOKEN, HOST_COMPONENT_ROOT, PRODMODE} from "../../../CONFIG/config";
import {SCHEDULES, SCHEDULES_NAMES_SELECTS, SCHEDULES_TYPES_SELECT} from "../mock/mock";
import dayjs from "dayjs";
import SchedIcons from "../../../assets/Comicon/SchedIcons";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";

function SchedulesWorkspace(props) {
    const navigate = useNavigate();
    const { userIdState } = useOutletContext();

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [allSchedulesCount, setAllSchedulesCount] = useState(0);

    const [schedules, setSchedules] = useState([]);

    const [scheduleTypes, setScheduleTypes] = useState([
        {
            id: 0,
            name: 'Все типы графиков'
        }
    ]);
    const [scheduleNames, setScheduleNames] = useState([]);

    const [scheduleTypeFilter, setScheduleTypeFilter] = useState(0);

    const [activeSchedule, setActiveSchedule] = useState({});
    const [nextSchedule, setNextSchedule] = useState({});
    const [editedSchedule, setEditedSchedule] = useState({
        id: 0,
    });

    const [toolbarTypeScheduleId, setToolbarTypeScheduleId] = useState(null);
    const [toolbarNameScheduleId, setToolbarNameScheduleId] = useState(null);
    const [toolbarDateStartSchedule, setToolbarDateStartSchedule] = useState(null);
    const [toolbarDateEndSchedule, setToolbarDateEndSchedule] = useState(null);

    const [intersections, setIntersections] = useState([]);

    useEffect(() => {
        if (!isMounted) {
            fetchInfo().then();
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            findActiveSchedule();
            findNextSchedule();
        }
    }, [schedules]);

    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [scheduleTypeFilter, pageSize, currentPage]);

    useEffect(() => {
        if (isMounted) {
            if (editedSchedule.id) {
                setToolbarTypeScheduleId(editedSchedule.schedule_type);
                setToolbarNameScheduleId(editedSchedule.schedule_id);
                setToolbarDateStartSchedule(dayjs(editedSchedule.start));
                setToolbarDateEndSchedule(editedSchedule.end ? dayjs(editedSchedule.end) : null);
            } else {
                setToolbarTypeScheduleId(null);
                setToolbarNameScheduleId(null);
                setToolbarDateStartSchedule(null);
                setToolbarDateEndSchedule(null);
                setIntersections([]);
            }
        }
    }, [editedSchedule]);

    useEffect(() => {
        const arr = [];
        schedules.forEach(schedule => {
            if (+schedule.id !== +editedSchedule.id) {
                if (schedule.end) {
                    if (dayjs(toolbarDateStartSchedule) >= dayjs(schedule.start) && dayjs(toolbarDateStartSchedule) <= dayjs(schedule.end)) {
                        arr.push(schedule.id);
                    }
                    if (dayjs(toolbarDateEndSchedule) >= dayjs(schedule.start) && dayjs(toolbarDateEndSchedule) <= dayjs(schedule.end)) {
                        arr.push(schedule.id);
                    }
                } else {
                    if (+editedSchedule.id === +activeSchedule.id) {
                        if (dayjs(toolbarDateEndSchedule) >= dayjs(schedule.start)) {
                            arr.push(schedule.id);
                        }
                    }
                    if (toolbarDateStartSchedule && +editedSchedule.id !== +activeSchedule.id) {
                        arr.push(schedule.id);
                    }
                }
            }
        });
        setIntersections(arr);
    }, [toolbarDateStartSchedule, toolbarDateEndSchedule]);

    useEffect(() => {
        const now = dayjs().startOf('day'); // Обрезаем время, оставляем только дату
        const startDate = dayjs(toolbarDateStartSchedule).startOf('day'); // Аналогично для начальной даты

        if (startDate.isBefore(now)) {
            const newStart = dayjs().startOf('day'); // Устанавливаем начало текущего дня
            if (!newStart.isSame(startDate, 'day')) { // Проверяем, отличается ли дата
                setToolbarDateStartSchedule(newStart);
            }
        }
    }, [toolbarDateStartSchedule]);

    useEffect(() => {
        const tomorrow = dayjs().add(1, 'day').startOf('day'); // Завтрашняя дата без времени
        const endDate = dayjs(toolbarDateEndSchedule).startOf('day'); // Конечная дата без времени

        if (endDate.isBefore(tomorrow)) {
            const newEnd = dayjs().add(1, 'day').startOf('day'); // Завтрашний день (00:00:00)
            if (!newEnd.isSame(endDate, 'day')) { // Проверяем, отличается ли дата
                setToolbarDateEndSchedule(newEnd);
            }
        }
    }, [toolbarDateEndSchedule]);

    useEffect(() => {
        if (userIdState === 'new') {
            navigate(`/hr/usermanager/${userIdState}`);
        }
    }, [userIdState]);
    const fetchInfo = async () => {
        setIsLoading(true);
        await fetchSchedulesInfo();
        await fetchScheduleTypesSelect();
        setTimeout(() => setIsLoading(false), 500);
    };
    const fetchSchedulesInfo = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userschedules/${userIdState}`,
                    {
                        data: {
                            scheduleTypeFilter,
                            currentPage,
                            pageSize
                        },
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content;
                    if (!scheduleTypeFilter) {
                        setSchedules(findBreaks(content.schedules));
                    } else {
                        setSchedules(content.schedules);
                    }
                    setCurrentPage(content.currentPage);
                    setPageSize(content.pageSize);
                    setAllSchedulesCount(content.allSchedulesCount);
                }
            } catch (error) {
                console.error('Error fetching users schedules:', error);
            }
        } else {
            setSchedules(findBreaks(SCHEDULES));
            console.log(findBreaks(SCHEDULES))
            setCurrentPage(1);
            setPageSize(20);
            setAllSchedulesCount(228);
        }
    };
    const fetchScheduleTypesSelect = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userscheduleselects`,
                    {
                        user_id: userIdState,
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content;
                    setScheduleTypes([ scheduleTypes[0], ...content.types]);
                    setScheduleNames(content.names);
                }
            } catch (error) {
                console.error('Error fetching schedule selects:', error);
            }
        } else {
            setScheduleTypes(SCHEDULES_TYPES_SELECT);
            setScheduleNames(SCHEDULES_NAMES_SELECTS);
        }
    };
    const findBreaks = (schedules) => {
        const result = [...schedules];
        for (let i = result.length - 1; i > 0; i--) {
            const current = result[i];
            const previous = result[i - 1];
            const breakStart = dayjs(previous.start).valueOf();
            const breakEnd = dayjs(current.end).valueOf();
            const breakDuration = breakStart - breakEnd;
            if (breakDuration > 60000) {
                const breakItem = {
                    id: `break-${i}-${Date.now()}`,
                    isBreak: true,
                    start: dayjs(current.end).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    end: dayjs(previous.start).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    breakDuration: breakDuration,
                    breakDays: Math.round(breakDuration / 86400000)
                };
                result.splice(i, 0, breakItem);
            }
        }
        return result;
    };
    const findActiveSchedule = () => {
        console.log('findActiveSchedule')
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const activeSched = schedules.find(schedule => {
            const start = dayjs(schedule.start, 'YYYY-MM-DD HH:mm:ss');
            if (schedule.end) {
                const end = dayjs(schedule.end, 'YYYY-MM-DD HH:mm:ss');
                return start.isBefore(now) && end.isAfter(now);
            }
            return start.isBefore(now)
        });
        if (activeSched) setActiveSchedule(activeSched);
    };
    const findNextSchedule = () => {
        console.log('findNextSchedule')
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const nextSched = schedules.find(schedule => {
            const start = dayjs(schedule.start, 'YYYY-MM-DD HH:mm:ss');
            return start.isAfter(now);
        });
        console.log(nextSched)
        if (nextSched) setNextSchedule(nextSched);
    };


    const removeSchedule = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы уверены, что хотите удалить этот график?')) {
            await fetchRemoveSchedule(id);
        }
    };
    const fetchRemoveSchedule = async (id) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.delete(`/api/hr/userscheduleremove/${id}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching remove user schedule:', error);
            }
        } else {
            await fetchInfo();
        }
    };

    const toEditSchedule = (id) => {
        setEditedSchedule(schedules.find(schedule => +schedule.id === +id));
    };
    const isCantAddSchedule = () => {
        if (scheduleTypeFilter) return true;
        if (editedSchedule.id === activeSchedule.id) {
            if (nextSchedule.id) {
                return (
                    (dayjs(toolbarDateEndSchedule) >= dayjs(nextSchedule.start)) ||
                    !toolbarTypeScheduleId ||
                    !toolbarNameScheduleId ||
                    !toolbarDateStartSchedule ||
                    !toolbarDateEndSchedule ||
                    intersections.length
                );
            }
            return (
                !toolbarTypeScheduleId ||
                !toolbarNameScheduleId ||
                !toolbarDateStartSchedule ||
                intersections.length
            );
        } else if (editedSchedule.id === nextSchedule.id) {
            return (
                !toolbarTypeScheduleId ||
                !toolbarNameScheduleId ||
                !toolbarDateStartSchedule ||
                intersections.length
            );
        } else {
            return (
                !toolbarTypeScheduleId ||
                !toolbarNameScheduleId ||
                !toolbarDateStartSchedule ||
                nextSchedule.id ||
                intersections.length
            );
        }
    };
    const isDisableField = () => {
        return editedSchedule.id === activeSchedule.id;
    };
    const clearEdit = () => {
        setEditedSchedule({id: 0});
    };

    const fetchAddOrUpdateSchedule = async () => {
        if (editedSchedule.id) {
            await fetchUpdateSchedule();
        } else {
            await fetchAddSchedule();
        }
        clearEdit();
    };
    const fetchUpdateSchedule = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userupdateschedules/${editedSchedule.id}`,
                    {
                        data: {
                            userId: userIdState,
                            editedSchedule,
                            toolbarTypeScheduleId,
                            toolbarNameScheduleId,
                            toolbarDateStartSchedule,
                            toolbarDateEndSchedule,
                        },
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching update user schedule:', error);
            }
        } else {
            await fetchInfo();
        }
    }
    const fetchAddSchedule = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/useraddschedules`,
                    {
                        data: {
                            userId: userIdState,
                            toolbarTypeScheduleId,
                            toolbarNameScheduleId,
                            toolbarDateStartSchedule,
                            toolbarDateEndSchedule,
                        },
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching add to user schedule:', error);
            }
        } else {
            await fetchInfo();
        }
    }

    const timeString = (totalSeconds, mod = null) => {
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
                                onShowSizeChange={(current, newSize) => setPageSize(newSize)}
                                onChange={(page) => setCurrentPage(page)}
                            />
                            <Tag
                                style={{
                                    width: '160px',
                                    height: '30px',
                                    lineHeight: '27px',
                                    textAlign: 'center',
                                    color: '#868686',
                                    fontSize: '14px',
                                    backgroundColor: '#ededed',
                                    borderColor: '#ededed',
                                }}
                            >Всего найдено: {allSchedulesCount}</Tag>
                        </div>
                        <Select
                            value={scheduleTypeFilter}
                            options={scheduleTypes}
                            style={{width: '200px'}}
                            onChange={(id) => setScheduleTypeFilter(id)}
                            fieldNames={{
                                value: 'id',
                                label: 'name',
                            }}
                        />
                    </div>
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
                                                    <p className={styles.sk_schedule_name}>{schedule.end ? dayjs(schedule.end).format('DD.MM.YYYY') : '—'}</p>
                                                </div>
                                            </div>
                                            {+schedule.id !== +editedSchedule.id ? (
                                                <div className={styles.sk_schedule_table_cell}
                                                     style={{padding: '15px', justifyContent: 'center', gridGap: '5px'}}>
                                                    {(schedule.id === activeSchedule.id || schedule.id === nextSchedule.id) && (
                                                        <Button color={'default'}
                                                                variant={'outlined'}
                                                                shape="circle"
                                                                icon={<EditOutlined/>}
                                                                onClick={() => toEditSchedule(schedule.id)}
                                                        ></Button>
                                                    )}
                                                    {schedule.id !== activeSchedule.id && schedule.id === nextSchedule.id && (
                                                        <Button color={'default'}
                                                                variant={'outlined'}
                                                                shape="circle"
                                                                icon={<DeleteOutlined/>}
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
                                                            icon={<CloseOutlined/>}
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
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info} style={{textAlign: 'left'}}>Разрыв {schedule.breakDays} дней</p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}>{dayjs(schedule.start).format('DD.MM.YYYY')}</p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}>{dayjs(schedule.end).format('DD.MM.YYYY')}</p></div>
                                        <div className={styles.sk_schedule_table_break_cell}><p className={styles.sk_schedule_table_break_info}></p></div>
                                    </div>
                            )
                        ))}
                    </div>
                </div>
                <Affix offsetTop={10 + 10 + 52 + 52}>
                    <div className={styles.sk_schedule_linker}>
                        <div style={{width: '100%'}}>
                            <div className={styles.sk_flex_space}>
                                <span className={'sk-totoro'}>Привязка нового графика</span>
                                <span style={{cursor: 'pointer'}}
                                      onClick={() => clearEdit()}
                                >
                                    <ClearOutlined/>
                                </span>
                            </div>
                            <br/>
                            <div className={styles.sk_label_select}>Тип привязываемого графика</div>
                            <Select placeholder={'Тип привязываемого графика'}
                                    value={scheduleTypeFilter ? scheduleTypeFilter : toolbarTypeScheduleId}
                                    options={scheduleTypes.filter(schedule => +schedule.id !== 0)}
                                    style={{width: '100%'}}
                                    onChange={(id) => setToolbarTypeScheduleId(id)}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    disabled={(isDisableField() || scheduleTypeFilter)}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Название графика</div>
                            <Select placeholder={'Название графика'}
                                    value={toolbarNameScheduleId}
                                    options={toolbarTypeScheduleId ? scheduleNames.filter(name => name.skud_schedule_type_id === toolbarTypeScheduleId) : scheduleNames}
                                    style={{width: '100%'}}
                                    onChange={(id) => setToolbarNameScheduleId(id)}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    showSearch
                                    optionFilterProp="name"
                                    filterSort={(optionA, optionB) => {
                                        var _a, _b;
                                        return (
                                            (_a = optionA === null || optionA === void 0 ? void 0 : optionA.label) !== null &&
                                            _a !== void 0
                                                ? _a
                                                : ''
                                        )
                                            .toLowerCase()
                                            .localeCompare(
                                                ((_b = optionB === null || optionB === void 0 ? void 0 : optionB.label) !== null &&
                                                    _b !== void 0
                                                        ? _b
                                                        : ''
                                                ).toLowerCase(),
                                            );
                                    }}
                                    disabled={isDisableField()}
                            />
                            {toolbarNameScheduleId ? (
                                    (() => {
                                        let start = null;
                                        let end = null;
                                        let duration = null;
                                        let lunch_start = null;
                                        let lunch_end = null;
                                        let lunch_duration = null;

                                        const shedName = scheduleNames.find(name => name.id === toolbarNameScheduleId);
                                        if (shedName) {
                                            console.log(shedName)
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
                            <div className={styles.sk_label_select}>Дата начала действия графика</div>
                            <DatePicker placeholder="Дата начала действия графика"
                                        value={toolbarDateStartSchedule}
                                        onChange={(e) => setToolbarDateStartSchedule(e)}
                                        format={"DD.MM.YYYY"}
                                        style={{width: '100%'}}
                                        disabled={isDisableField()}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Дата окончания графика</div>
                            <DatePicker placeholder="Дата окончания графика"
                                        value={toolbarDateEndSchedule}
                                        onChange={(e) => setToolbarDateEndSchedule(e)}
                                        format={"DD.MM.YYYY"}
                                        style={{width: '100%'}}
                            />
                            <br/>
                            <br/>
                            <Button block
                                    disabled={isCantAddSchedule()}
                                    onClick={() => fetchAddOrUpdateSchedule()}
                            >Привязать график</Button>
                        </div>
                    </div>
                </Affix>
            </div>
        </Spin>
    );
}

export default SchedulesWorkspace;
