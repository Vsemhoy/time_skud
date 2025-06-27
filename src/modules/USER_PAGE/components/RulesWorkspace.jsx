import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {Affix, Button, Pagination, Select, Spin, Tag} from "antd";
import styles from "../style/user_page.module.css";
import {ClearOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {RULES} from "../mock/mock";
import dayjs from "dayjs";
import {HOST_COMPONENT_ROOT} from "../../../CONFIG/config";
import RuleIcons from "../../RULE_MANAGER/components/RuleIcons";

function RulesWorkspace(props) {
    const navigate = useNavigate();
    const { userIdState, userFIO } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);
    const [rules, setRules] = useState([]);

    useEffect(() => {
        fetchRulesInfo();
    }, []);

    useEffect(() => {
        if (userIdState === 'new') {
            navigate(`/hr/users/${userIdState}`);
        }
    }, [userIdState]);

    const fetchRulesInfo = () => {
        setIsLoading(true);
        setRules(RULES);
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

    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_rules_workspace}>
                <div className={styles.sk_rules_table_container}>
                    <div className={styles.sk_rules_table_label}>Правила учета рабочего времени пользователя</div>
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
                            placeholder={'Все типы правил'}
                            mode={'multiple'}
                            options={[]}
                            style={{width: '200px'}}
                            onChange={(ev) => {
                            }}
                            tagRender={tagRender}
                        />
                    </div>
                    <div className={styles.sk_rules_table}>
                        <div className={`${styles.sk_rules_table_row_wrapper} ${styles.sk_table_row_header}`}>
                            <div className={styles.sk_rules_table_row}>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Тип</p>
                                </div>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}></div>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}
                                       style={{textAlign: 'left'}}>Название, описание</p>
                                </div>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Время, мин.</p>
                                </div>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Начало действия</p>
                                </div>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}>
                                    <p className={styles.sk_schedule_table_header_p}>Действует до</p>
                                </div>
                                <div className={`${styles.sk_rules_table_cell} ${styles.sk_rules_table_cell_header}`}></div>
                            </div>
                        </div>
                        {rules.map(rule => (
                            <div key={rule.id} className={styles.sk_rules_table_row_wrapper}>
                                <div className={styles.sk_rules_table_row}>
                                    <div className={`${styles.sk_rules_table_cell}`}>
                                        <div className={styles.sk_rules_container}>
                                            <p className={styles.sk_rules_icon}><RuleIcons type={rule.rule_type_id}/></p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}>
                                        <div className={styles.sk_rules_container}>
                                        <p className={styles.sk_rules_p}>{rule.id}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}>
                                        <div className={styles.sk_rules_container}>
                                            <p className={styles.sk_rules_name}>{rule.name}</p>
                                            <p className={styles.sk_rules_description}>{rule.name_2}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}>
                                        <div className={styles.sk_rules_container_center}>
                                            <p className={styles.sk_rules_name}>{dayjs(rule.duration_time).format('HH:mm')}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}>
                                        <div className={styles.sk_rules_container_center}>
                                            <p className={styles.sk_rules_name}>{dayjs(rule.start).format('DD.MM.YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}>
                                        <div className={styles.sk_rules_container_center}>
                                            <p className={styles.sk_rules_name}>{dayjs(rule.start).format('DD.MM.YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}
                                         style={{padding: '15px', justifyContent: 'space-between'}}>
                                        <Button color={'default'}
                                                variant={'outlined'}
                                                shape="circle"
                                                icon={<EditOutlined/>}
                                        ></Button>
                                        <Button color={'default'}
                                                variant={'outlined'}
                                                shape="circle"
                                                icon={<DeleteOutlined/>}
                                        ></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Affix offsetTop={10 + 10 + 52 + 52}>
                    <div className={styles.sk_rules_linker}>
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
                </Affix>
            </div>
        </Spin>
);
}

export default RulesWorkspace;
