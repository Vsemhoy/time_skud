import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {Affix, Button, DatePicker, Pagination, Select, Spin, Tag} from "antd";
import styles from "../style/user_page.module.css";
import {ClearOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {
    RULES,
    RULES_NAMES_SELECT,
    RULES_TYPES_SELECT,
} from "../mock/mock";
import dayjs from "dayjs";
import {CSRF_TOKEN, HOST_COMPONENT_ROOT, PRODMODE} from "../../../CONFIG/config";
import RuleIcons from "../../RULE_MANAGER/components/RuleIcons";
import {PROD_AXIOS_INSTANCE} from "../../../API/API";
import {DEF_SCHEDULE as activeRule} from "../../../CONFIG/DEFFORMS";

function RulesWorkspace(props) {
    const navigate = useNavigate();
    const { userIdState } = useOutletContext();

    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [allRulesCount, setAllRulesCount] = useState(0);

    const [rules, setRules] = useState([]);

    const [ruleNames, setRuleNames] = useState([]);
    const [ruleTypes, setRuleTypes] = useState([
        {
            id: 0,
            name: 'Все типы правил'
        }
    ]);
    const [ruleTypeFilter, setRuleTypeFilter] = useState(0);

    const [activeRules, setActiveRules] = useState([]);
    const [nextRules, setNextRules] = useState([]);
    const [editedRule, setEditedRule] = useState({
        id: 0,
    });

    const [toolbarTypeRuleId, setToolbarTypeRuleId] = useState(null);
    const [toolbarNameRuleId, setToolbarNameRuleId] = useState(null);
    const [toolbarDateStartRule, setToolbarDateStartRule] = useState(null);
    const [toolbarDateEndRule, setToolbarDateEndRule] = useState(null);

    const [intersections, setIntersections] = useState([]);

    useEffect(() => {
        if (!isMounted) {
            fetchInfo().then();
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            findActiveRules();
            findNextRules();
        }
    }, [rules]);

    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [ruleTypeFilter, pageSize, currentPage]);

    useEffect(() => {
        if (isMounted) {
            if (editedRule.id) {
                setToolbarTypeRuleId(editedRule.rule_type_id);
                setToolbarNameRuleId(editedRule.id);
                setToolbarDateStartRule(dayjs(editedRule.start));
                setToolbarDateEndRule(editedRule.end ? dayjs(editedRule.end) : null);
            } else {
                setToolbarTypeRuleId(null);
                setToolbarNameRuleId(null);
                setToolbarDateStartRule(null);
                setToolbarDateEndRule(null);
            }
        }
    }, [editedRule]);

    useEffect(() => {
        const arr = [];
        rules.forEach(rule => {
            if (+rule.id !== +editedRule.id && +rule.rule_type_id === +toolbarTypeRuleId) {
                if (rule.end) {
                    if (dayjs(toolbarDateStartRule) >= dayjs(rule.start) && dayjs(toolbarDateStartRule) <= dayjs(rule.end)) {
                        arr.push(rule.id);
                    }
                    if (dayjs(toolbarDateEndRule) >= dayjs(rule.start) && dayjs(toolbarDateEndRule) <= dayjs(rule.end)) {
                        arr.push(rule.id);
                    }
                } else {
                    if (activeRules.find(rule => +rule.id === +editedRule.id)) {
                        if (dayjs(toolbarDateEndRule) >= dayjs(rule.start)) {
                            arr.push(rule.id);
                        }
                    }
                    if (toolbarDateStartRule && !activeRules.find(rule => +rule.id === +editedRule.id)) {
                        arr.push(rule.id);
                    }
                }
            }
        });
        setIntersections(arr);
    }, [toolbarDateStartRule, toolbarDateEndRule]);

    useEffect(() => {
        const now = dayjs().startOf('day'); // Обрезаем время, оставляем только дату
        const startDate = dayjs(toolbarDateStartRule).startOf('day'); // Аналогично для начальной даты

        if (startDate.isBefore(now)) {
            const newStart = dayjs().startOf('day'); // Устанавливаем начало текущего дня
            if (!newStart.isSame(startDate, 'day')) { // Проверяем, отличается ли дата
                setToolbarDateStartRule(newStart);
            }
        }
    }, [toolbarDateStartRule]);

    useEffect(() => {
        const tomorrow = dayjs().add(1, 'day').startOf('day'); // Завтрашняя дата без времени
        const endDate = dayjs(toolbarDateEndRule).startOf('day'); // Конечная дата без времени

        if (endDate.isBefore(tomorrow)) {
            const newEnd = dayjs().add(1, 'day').startOf('day'); // Завтрашний день (00:00:00)
            if (!newEnd.isSame(endDate, 'day')) { // Проверяем, отличается ли дата
                setToolbarDateEndRule(newEnd);
            }
        }
    }, [toolbarDateEndRule]);

    useEffect(() => {
        console.log(intersections);
    }, [intersections]);

    useEffect(() => {
        if (userIdState === 'new') {
            navigate(`/hr/users/${userIdState}`);
        }
    }, [userIdState]);

    const fetchInfo = async () => {
        setIsLoading(true);
        await fetchRulesInfo();
        await fetchRulesTypesSelect();
        setTimeout(() => setIsLoading(false), 500);
    };
    const fetchRulesInfo = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userrules/${userIdState}`,
                    {
                        data: {
                            ruleTypeFilter,
                            currentPage,
                            pageSize
                        },
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content;
                    setRules(content.schedules);
                    setCurrentPage(content.currentPage);
                    setPageSize(content.pageSize);
                    setAllRulesCount(content.allRulesCount);
                }
            } catch (error) {
                console.error('Error fetching users rules:', error);
            }
        } else {
            setRules(RULES);
            setCurrentPage(1);
            setPageSize(20);
            setAllRulesCount(228);
        }
    };
    const fetchRulesTypesSelect = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userruleselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    const content = serverResponse.data.content;
                    setRuleTypes([ ruleTypes[0], ...content.types]);
                    setRuleNames(content.names);
                }
            } catch (error) {
                console.error('Error fetching rules select:', error);
            }
        } else {
            setRuleTypes(RULES_TYPES_SELECT);
            setRuleNames(RULES_NAMES_SELECT);
        }
    };
    const findActiveRules = () => {
        const now = dayjs();
        const activeRulesList = rules.filter(rule => {
            const start = dayjs(rule.start, 'YYYY-MM-DD HH:mm:ss');
            if (rule.end) {
                const end = dayjs(rule.end, 'YYYY-MM-DD HH:mm:ss');
                return start.isBefore(now) && end.isAfter(now);
            }
            return start.isBefore(now)
        });

        if (activeRulesList.length > 0) {
            setActiveRules(activeRulesList);
        } else {
            setActiveRules([]);
        }
    };
    const findNextRules = () => {
        const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const nextRulesList = rules.filter(rule => {
            const start = dayjs(rule.start, 'YYYY-MM-DD HH:mm:ss');
            return start.isAfter(now);
        });

        if (nextRulesList.length > 0) {
            setNextRules(nextRulesList);
        } else {
            setNextRules([]);
        }
    };

    const removeRule = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Вы уверены, что хотите удалить это правило?')) {
            await fetchRemoveRule(id);
        }
    };
    const fetchRemoveRule = async (id) => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.delete(`/api/hr/userruleremove/${id}`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching remove user rule:', error);
            }
        } else {
            await fetchInfo();
        }
    };

    const toEditRule = (id) => {
        setEditedRule(rules.find(schedule => +schedule.id === +id));
    };
    const isCantAddRule = () => {
        if (activeRules.find(rule => rule.id === editedRule.id)) {
            if (nextRules.find(rule => rule.rule_type_id === editedRule.rule_type_id)) {
                const next = nextRules.find(rule => rule.rule_type_id === editedRule.rule_type_id);
                return (
                    (dayjs(toolbarDateEndRule) >= dayjs(next.start)) ||
                    !toolbarTypeRuleId ||
                    !toolbarNameRuleId ||
                    !toolbarDateStartRule ||
                    !toolbarDateEndRule ||
                    intersections.length
                );
            }
            return (
                !toolbarTypeRuleId ||
                !toolbarNameRuleId ||
                !toolbarDateStartRule ||
                intersections.length
            );
        } else if (nextRules.find(rule => rule.id === editedRule.id)) {
            return (
                !toolbarTypeRuleId ||
                !toolbarNameRuleId ||
                !toolbarDateStartRule ||
                intersections.length
            );
        } else {
            return (
                !toolbarTypeRuleId ||
                !toolbarNameRuleId ||
                !toolbarDateStartRule ||
                intersections.length ||
                nextRules.find(rule => rule.rule_type_id === editedRule.rule_type_id)
            );
        }
    };
    const isDisableField = () => {
        return activeRules.find(rule => rule.id === editedRule.id);
    };
    const clearEdit = () => {
        setEditedRule({id: 0});
    };

    const fetchAddOrUpdateRule = async () => {
        if (editedRule.id) {
            await fetchUpdateRule();
        } else {
            await fetchAddRule();
        }
        clearEdit();
    };
    const fetchUpdateRule = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userupdaterules/${editedRule.id}`,
                    {
                        data: {
                            userId: userIdState,
                            editedRule,
                            toolbarTypeRuleId,
                            toolbarNameRuleId,
                            toolbarDateStartRule,
                            toolbarDateEndRule,
                        },
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching update user rule:', error);
            }
        } else {
            await fetchInfo();
        }
    }
    const fetchAddRule = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/useraddrule`,
                    {
                        data: {
                            userId: userIdState,
                            toolbarTypeRuleId,
                            toolbarNameRuleId,
                            toolbarDateStartRule,
                            toolbarDateEndRule,
                        },
                        _token: CSRF_TOKEN
                    }
                );
                await fetchInfo();
            } catch (error) {
                console.error('Error fetching add to user rule:', error);
            }
        } else {
            await fetchInfo();
        }
    }

    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_rules_workspace}>
                <div className={styles.sk_rules_table_container}>
                    <div className={styles.sk_rules_table_label}>Правила учета рабочего времени пользователя</div>
                    <div className={styles.sk_pagination_wrapper}>
                        <div className={styles.sk_pagination_container}>
                            <Pagination
                                current={currentPage}
                                total={allRulesCount}
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
                            >Всего найдено: {allRulesCount}</Tag>
                        </div>
                        <Select
                            value={ruleTypeFilter}
                            options={ruleTypes}
                            style={{width: '200px'}}
                            onChange={(id) => setRuleTypeFilter(id)}
                            fieldNames={{
                                value: 'id',
                                label: 'name',
                            }}
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
                            <div key={rule.id} className={`${styles.sk_rules_table_row_wrapper}
                                                           ${activeRules.find(r => r.id === rule.id) ? styles.sk_table_row_active : ''}
                                                           ${intersections.find(ruleId => +ruleId === +rule.id) ? styles.sk_table_row_danger : ''}
                                                           ${+rule.id === +editedRule.id ? styles.sk_table_row_edit : ''}`
                            }>
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
                                            <p className={styles.sk_rules_name}>{rule.end ? dayjs(rule.end).format('DD.MM.YYYY') : '—'}</p>
                                        </div>
                                    </div>
                                    {+rule.id !== +editedRule.id ? (
                                        <div className={`${styles.sk_rules_table_cell}`}
                                              style={{padding: '15px', justifyContent: 'center', gridGap: '5px'}}>
                                            {(activeRules.find(r => r.id === rule.id) || nextRules.find(r => r.id === rule.id)) && (
                                                <Button color={'default'}
                                                        variant={'outlined'}
                                                        shape="circle"
                                                        icon={<EditOutlined/>}
                                                        onClick={() => toEditRule(rule.id)}
                                                ></Button>
                                            )}
                                            {nextRules.find(r => r.id === rule.id) && (
                                                <Button color={'default'}
                                                        variant={'outlined'}
                                                        shape="circle"
                                                        icon={<DeleteOutlined/>}
                                                        onClick={() => removeRule(rule.id)}
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
                        ))}
                    </div>
                </div>
                <Affix offsetTop={10 + 10 + 52 + 52}>
                    <div className={styles.sk_rules_linker}>
                        <div style={{width: '100%'}}>
                            <div className={styles.sk_flex_space}>
                                <span className={'sk-totoro'}>Привязка нового правила</span>
                                <span style={{cursor: 'pointer'}}
                                      onClick={() => clearEdit()}
                                >
                                    <ClearOutlined/>
                                </span>
                            </div>
                            <br/>
                            <div className={styles.sk_label_select}>Тип привязываемого правила</div>
                            <Select placeholder={'Тип привязываемого правила'}
                                    value={ruleTypeFilter ? ruleTypeFilter : toolbarTypeRuleId}
                                    options={ruleTypes.filter(schedule => +schedule.id !== 0)}
                                    style={{width: '100%'}}
                                    onChange={(id) => setToolbarTypeRuleId(id)}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    disabled={(isDisableField() || ruleTypeFilter)}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Название привязываемого правила</div>
                            <Select placeholder={'Название привязываемого правила'}
                                    value={toolbarNameRuleId}
                                    options={toolbarTypeRuleId ? ruleNames.filter(name => name.rule_type_id === toolbarTypeRuleId) : ruleNames}
                                    style={{width: '100%'}}
                                    onChange={(id) => setToolbarNameRuleId(id)}
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
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Дата начала действия правила</div>
                            <DatePicker placeholder="Дата начала действия правила"
                                        value={toolbarDateStartRule}
                                        onChange={(e) => setToolbarDateStartRule(e)}
                                        format={"DD.MM.YYYY"}
                                        style={{width: '100%'}}
                                        disabled={isDisableField()}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Дата окончания действия правила</div>
                            <DatePicker placeholder="Дата окончания действия правила"
                                        value={toolbarDateEndRule}
                                        onChange={(e) => setToolbarDateEndRule(e)}
                                        format={"DD.MM.YYYY"}
                                        style={{width: '100%'}}
                            />
                            <br/>
                            <br/>
                            <Button block
                                    disabled={isCantAddRule()}
                                    onClick={() => fetchAddOrUpdateRule()}
                            >Привязать правило</Button>
                        </div>
                    </div>
                </Affix>
            </div>
        </Spin>
);
}

export default RulesWorkspace;
