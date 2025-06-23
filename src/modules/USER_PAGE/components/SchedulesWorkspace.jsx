import React, {useEffect, useState} from 'react';
import styles from "../style/user_page.module.css";
import {Link, useOutletContext} from "react-router-dom";
import {Button, Pagination, Select, Spin, Tag} from "antd";
import {ClearOutlined} from "@ant-design/icons";
import {BASE_ROUTE} from "../../../CONFIG/config";
import {SCHEDULES} from "../mock/mock";

function SchedulesWorkspace(props) {
    const { userIdState, userFIO } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedulesInfo();
    }, []);

    const fetchSchedulesInfo = () => {
        setIsLoading(true);
        setSchedules(SCHEDULES);
        setTimeout(() => setIsLoading(false), 500);
    };

    const [groupList, setGroupList] = useState([]);
    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;

        // Находим соответствующий group в groupList по value
        const group = groupList.find(item => item.value === value);
        const color = group?.color; // Получаем цвет из найденного group

        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginInlineEnd: 4 }}
            >
                {label}
            </Tag>
        );
    };

    const scheduleIcon = () => {
      switch (schedules.length) {
          case 1:
              return styles.schedule_std;
          case 2:
              return styles.schedule_std;
          case 3:
              return styles.schedule_std;
          case 4:
              return styles.schedule_std;
          case 5:
              return styles.schedule_std;
          case 6:
              return styles.schedule_std;
          default:
              return '';
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
                                current={1}
                                total={228}
                                pageSize={10}
                                pageSizeOptions={[10, 50, 100]}
                                locale={{
                                    items_per_page: 'на странице',
                                    jump_to: 'Перейти',
                                    jump_to_confirm: 'OK',
                                    page: 'Страница'
                                }}
                                onShowSizeChange={(current, newSize) => {
                                }}
                                onChange={() => {
                                }}
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
                            >Всего найдено: {228}</Tag>
                        </div>
                        <Select
                            placeholder={'Все типы графиков'}
                            mode={'multiple'}
                            options={[]}
                            style={{width: '200px'}}
                            onChange={(ev) => {
                            }}
                            tagRender={tagRender}
                        />
                    </div>
                    <div className={styles.sk_schedule_table}>
                        <div className={`${styles.sk_schedule_table_row_wrapper} ${styles.sk_table_row_header}`}>
                            <div className={styles.sk_schedule_table_row}>
                            <div className={styles.sk_schedule_table_cell}>
                                <p>Тип</p>
                            </div>
                            <div className={styles.sk_schedule_table_cell}></div>
                            <div className={styles.sk_schedule_table_cell}>
                                <p style={{width: '100%'}}>Название, описание</p>
                            </div>
                            <div className={styles.sk_schedule_table_cell}>
                                <p>Работа</p>
                            </div>
                            <div className={styles.sk_schedule_table_cell}>
                                <p>Обед</p>
                            </div>
                            <div className={styles.sk_schedule_table_cell}>
                                <p>Начало действия</p>
                            </div>
                            <div className={styles.sk_schedule_table_cell}>
                                <p>Действует до</p>
                            </div>
                            <div className={styles.sk_schedule_table_cell}></div>
                        </div>
                        </div>
                        {schedules.map(schedule => (
                            <div className={styles.sk_schedule_table_row_wrapper}>
                                <div className={`${styles.sk_schedule_table_row}`}>
                                    <div className={styles.sk_schedule_table_cell}>
                                        <p className={`${styles.sk_schedule_icon} ${scheduleIcon()}`}></p>
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
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                </div>
                                {/*<div className={`${styles.sk_schedule_table_break_row}`}>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                    <div className={styles.sk_schedule_table_cell}><p></p></div>
                                </div>*/}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.sk_schedule_linker}>
                    <div style={{width: '100%'}}>
                        <div className={styles.sk_flex_space}>
                            <span className={'sk-totoro'}>Группы </span>
                            <span
                                onClick={() => {
                                }}
                            >
                                <ClearOutlined/>
                            </span>
                        </div>
                        <br/>
                        <div className={styles.sk_label_select}>Тип привязываемого графика</div>
                        <Select
                            placeholder={'Группы'}
                            mode={'multiple'}
                            options={[]}
                            style={{width: '100%'}}
                            onChange={(ev) => {
                            }}
                            tagRender={tagRender}
                        />
                        <br/>
                        <br/>
                        <div className={styles.sk_label_select}>Название графика (селект с поиском)</div>
                        <Select
                            placeholder={'Группы'}
                            mode={'multiple'}
                            options={[]}
                            style={{width: '100%'}}
                            onChange={(ev) => {
                            }}
                            tagRender={tagRender}
                        />
                        <br/>
                        <br/>
                        <div className={styles.sk_label_select}>Дата начала действия графика</div>
                        <Select
                            placeholder={'Группы'}
                            mode={'multiple'}
                            options={[]}
                            style={{width: '100%'}}
                            onChange={(ev) => {
                            }}
                            tagRender={tagRender}
                        />
                        <br/>
                        <br/>
                        <div className={styles.sk_label_select}>Дата окончания графика</div>
                        <Select
                            placeholder={'Группы'}
                            mode={'multiple'}
                            options={[]}
                            style={{width: '100%'}}
                            onChange={(ev) => {
                            }}
                            tagRender={tagRender}
                        />
                        <br/>
                        <br/>
                        <Button block>Привязать графики</Button>
                    </div>
                </div>
            </div>
        </Spin>
    );
}

export default SchedulesWorkspace;
