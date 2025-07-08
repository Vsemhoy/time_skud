import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {Affix, Button, DatePicker, Pagination, Select, Spin, Tag} from "antd";
import styles from "../style/user_page.module.css";
import {ClearOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
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
        }
    }, [rules]);

    useEffect(() => {
        if (isMounted) {
            findNextRules();
        }
    }, [activeRules]);

    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [ruleTypeFilter, pageSize, currentPage]);

    useEffect(() => {
        if (isMounted) {
            if (editedRule.id) {
                setToolbarTypeRuleId(editedRule.schedule_type);
                setToolbarNameRuleId(editedRule.schedule_id);
                setToolbarDateStartRule(dayjs(editedRule.start));
                setToolbarDateEndRule(dayjs(editedRule.end));
            } else {
                setToolbarTypeRuleId(null);
                setToolbarNameRuleId(null);
                setToolbarDateStartRule(null);
                setToolbarDateEndRule(null);
            }
        }
    }, [editedRule]);

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
            const end = dayjs(rule.end, 'YYYY-MM-DD HH:mm:ss');
            return start.isBefore(now) && end.isAfter(now);
        });

        if (activeRulesList.length > 0) {
            setActiveRules(activeRulesList);
        } else {
            setActiveRules([]);
        }
    };
    const findNextRules = () => {
        const nextRulesList = rules.filter(rule => {
            const activeRuleByType = activeRules.find(activeRule => rule.rule_type_id === activeRule.rule_type_id);
            if (activeRuleByType) {
                if (rule.id > activeRuleByType.id) {
                    return true
                } else {
                    return false;
                }
            } else {
                return true;
            }
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
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`/api/hr/userruleremove/${userIdState}`,
                    {
                        data: {
                            ruleId: id
                        },
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
    const isDisableField = () => {
        return false;
    };
    const clearEdit = () => {
        setEditedRule({id: 0});
    };
    const isCanAddSchedule = () => {
        return true;
    };

    const fetchAddOrUpdateRule = async () => {

    };

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
                                                           ${activeRules.find(r => r.id === rule.id) ? styles.sk_table_row_active : ''}`
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
                                            <p className={styles.sk_rules_name}>{dayjs(rule.end).format('DD.MM.YYYY')}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.sk_rules_table_cell}`}
                                         style={{padding: '15px', justifyContent: 'space-between'}}>
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
                                    value={toolbarTypeRuleId}
                                    options={ruleTypes.filter(schedule => +schedule.id !== 0)}
                                    style={{width: '100%'}}
                                    onChange={(id) => setToolbarTypeRuleId(id)}
                                    fieldNames={{
                                        value: 'id',
                                        label: 'name',
                                    }}
                                    disabled={isDisableField()}
                            />
                            <br/>
                            <br/>
                            <div className={styles.sk_label_select}>Название привязываемого правила</div>
                            <Select placeholder={'Название привязываемого правила'}
                                    value={toolbarNameRuleId}
                                    options={ruleNames}
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
                                        value={toolbarDateStartRule}
                                        onChange={(e) => setToolbarDateStartRule(e)}
                                        format={"DD.MM.YYYY"}
                                        style={{width: '100%'}}
                            />
                            <br/>
                            <br/>
                            <Button block
                                    disabled={isCanAddSchedule()}
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
