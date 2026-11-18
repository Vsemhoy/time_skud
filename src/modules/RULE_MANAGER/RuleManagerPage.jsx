import PersonnelEditAction from "../../components/PersonnelEditAction";
import FiltersToggle from "../../components/FiltersToggle";
import PersonnelTable from '../../components/PersonnelTable';
import {getSavedSkudPageTheme, SKUD_PAGE_THEMES} from '../../Utils/skudPageTheme';
import React, { useEffect, useState } from "react";
import {CSRF_TOKEN, PRODMODE, ROUTE_PREFIX} from "../../CONFIG/config"
import RuleEditorModal from "./components/ruleeditormodal";
import "./style/rule_manager_page.css";
import { PROD_AXIOS_INSTANCE } from "../../API/API";
import {Affix, Button, Pagination, Tag, Layout, Spin} from "antd";
import {
    USERS_MANAGER
} from "../USER_MANAGER_2025/USER_MANAGER/mock/mock";
import {
    COMPANIES,
    RULE_TYPE_LIST,
    RULE_LIST, USER_RULES,
} from "./mock/mock"
import {
    EditOutlined,
    FilterOutlined,
    PlusOutlined, UserOutlined
} from "@ant-design/icons";
import Cookies from "js-cookie";
import ClaimManagerSidebar from "../RULE_MANAGER/components/ClaimManagerSidebar";
import {NavLink} from "react-router-dom";
import RuleIcons from "../../assets/Comicon/RuleIcons";
const { Header, Sider, Content } = Layout;


const RuleManagerPage = (props) => {
    const isMain = getSavedSkudPageTheme() === SKUD_PAGE_THEMES.MAIN;
    const { userdata } = props;

    const prepareSelectOptions = (name, options) => {
        return options.map((option) => {
            return ({
                key: `option-${name}-${option.id}`,
                value: option.id,
                label: option.name,
                description: option.description,
            })
        });
    }

    const useCookieState = (key, defaultValue) => {
        const [state, setState] = useState(() => {
            const saved = Cookies.get(key);
            return saved ? JSON.parse(saved) : defaultValue;
        });

        useEffect(() => {
            Cookies.set(key, JSON.stringify(state), { expires: 365 });
        }, [key, state]);

        return [state, setState];
    };
    const [isOpenFilters, setIsOpenFilters] = useCookieState(isMain ? 'RuleManagerPage_main_filters' : 'rule_manager_filters', !isMain);
    const [baseRuleList, setBaseRuleList] = useState([]);
    const [editorOpened, setEditorOpened] = useState(false);
    const [editedRuleId, setEditedRuleId] = useState(0);
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [currentRules, setCurrentRules] = useState([]);
    const [closedRules, setClosedRules] = useState([]);
    const [users, setUsers] = useState([]);
    const [userRules , setUserRules] = useState([]);
    const [filtersState, setFiltersState] = useState([]);
    const [count, setCount] = useState(0);

    const handleChangePageSize = (value) => {
        setPageSize(value);
    };
    const handlePageChange = (value) => {
        setCurrentPage(value);
    };

    const openModal = () => {
        setEditedRuleId(null);
        setEditorOpened(true);
    }

    const cancelModalEditor = ()=>{
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    const saveRule = (data) => {
        if (data.duration_time !== 0){
            data.duration_time = data.duration_time * 60;
        }
        if (data.id === null || data.id === 0){
            // create
            fetchCreateRule(data);
        } else {
            // update
            fetchUpdateRule(data);
        }
        setEditedRuleId(0);
        setEditorOpened(false);
    }

    useEffect(() => {
        fetchInfo().then(() => {
            setIsMounted(true);
        });
    }, []);

    useEffect(() => {
        if (isMounted) {
            fetchInfo().then();
        }
    }, [pageSize, currentPage]);

    const handleFilterChanged = async (filterParams) => {
        if (isMounted) {
            await fetchInfo(filterParams);
        }
    };

    /* fetch + pagination */
    const fetchInfo = async (filterParams) => {
        setIsLoading(true);
        await fetchRules(filterParams);
        await fetchFilters();
        await fetchUsers();
        if (PRODMODE) {
            setIsLoading(false);
        } else {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };

    const fetchRules = async (filterParams) => {
        if (PRODMODE) {
            try {
                setFiltersState(filterParams);
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/v2/rule/rules`,
                    {
                        data: {filterParams, pageSize, currentPage},
                        _token: CSRF_TOKEN
                    }
                );

                setBaseRuleList(serverResponse.data.content);
                setCount(serverResponse.data.count);
                console.log('Response data as JSON:', JSON.stringify(serverResponse.data.content, null, 2));
                console.log(serverResponse.data.count);
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setBaseRuleList(RULE_LIST);
        }
    };

    const fetchUsers = async (filterParams) => {
        if (PRODMODE) {
            try {
                setFiltersState(filterParams);
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/v2/rule/users`,
                    {
                        data: {filterParams},
                        _token: CSRF_TOKEN
                    }
                );

                setUsers(serverResponse.data.content.users);
                setUserRules(serverResponse.data.content.user_rules);
            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setUsers(USERS_MANAGER);
            setUserRules(USER_RULES);

            console.log(USER_RULES);
        }
    };

    const fetchFilters = async () => {
        if (PRODMODE) {
            try {
                const serverResponse = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/hr/v2/rule/filterselects`,
                    {
                        _token: CSRF_TOKEN
                    }
                );
                if (serverResponse.data.content) {
                    setCompanies(serverResponse.data.content.companies);
                    setCurrentRules(serverResponse.data.content.rule_types_list);
                }

                console.log('Response data as JSON:', JSON.stringify(serverResponse.data.content, null, 2));

            } catch (error) {
                console.error('Error fetching users info:', error);
            }
        } else {
            setCompanies(COMPANIES);
            setCurrentRules(RULE_TYPE_LIST);
        }
    };

    const fetchCreateRule = async (body) => {
        if (PRODMODE){
            try {
                let response = await PROD_AXIOS_INSTANCE.post(`${ROUTE_PREFIX}/timeskud/rules/rules`,
                    {
                        data: body,
                        _token: CSRF_TOKEN
                    });
                console.log('rules', response);
                await fetchUsers(filtersState);
                await fetchRules(filtersState);
            } catch (e) {
                console.log(e)
            }
        } else {

        }
    }

    const fetchUpdateRule = async (body) => {
        if (PRODMODE){
            try {
                let response = await PROD_AXIOS_INSTANCE.put(`${ROUTE_PREFIX}/timeskud/rules/rules/` + body.id,
                    {
                        data: body,
                        _token: CSRF_TOKEN
                    });
                await fetchUsers(filtersState);
                await fetchRules(filtersState);
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        console.log(companies);
    }, [companies]);

    const openCloseRules = (ruleId) => {
        if (closedRules.includes(ruleId)) {
            setClosedRules(closedRules.filter(id => id !== ruleId));
        } else {
            setClosedRules([...closedRules, ruleId]);
        }
    };

    const onOpenModalEditor = (ruleId) => {
        setEditedRuleId(ruleId);
        setEditorOpened(true);
    }

    const createAction = (
        <Button color={'primary'}
            variant={isMain ? 'solid' : 'outlined'}
            icon={<PlusOutlined/>}
            style={{ width: '125px' }}
            onClick={openModal}
        >Создать</Button>
    );
    const PanelWrapper = isMain ? 'div' : Affix;
    return (
        <Layout className={isMain ? "rule-layout sk-personnel-main sk-claims-viewport" : "rule-layout"}>
            <Header className={'header'}>
                <PanelWrapper>
                    <div className="sk-header-container ui-pagebar ui-pagebar--centered">
                        <FiltersToggle color={'default'}
                                aria-expanded={isOpenFilters}
                                variant={isOpenFilters ? 'solid' : 'outlined'}
                                icon={<FilterOutlined />}
                                style={{ width: '125px' }}
                                onClick={() => setIsOpenFilters(!isOpenFilters)}
                        >Фильтры</FiltersToggle>
                        <h1 className={'page-header'}>Правила учёта рабочего времени</h1>
                        {isMain ? <div className="sk-personnel-actions">{createAction}</div> : <div />}
                    </div>
                </PanelWrapper>
            </Header>
            <Layout className="sk-layout-center">
                <Sider width={isOpenFilters ? (isMain ? 320 : 330) : 0} className={`sider ${isOpenFilters ? '' : 'sider-hidden'} pr15`}>
                    <PanelWrapper {...(isMain ? {} : {offsetTop: 54})}>
                        <div className="sk-width-container">
                            <div className="sk-usp-filter-col">
                                    {isMain && <h2 className="sk-claims-filter-title">Фильтры</h2>}
                                <ClaimManagerSidebar
                                    company_list={prepareSelectOptions('company', companies)}
                                    current_rules_list={prepareSelectOptions('current_rules_list', currentRules)}
                                    on_change_filter={handleFilterChanged}
                                />
                            </div>
                        </div>
                    </PanelWrapper>
                </Sider>
                <Content className="content">
                    <div className="sk-content-table-wrapper">
                        <PanelWrapper {...(isMain ? {} : {offsetTop: 44})}>
                            <div className="sk-pagination-wrapper ui-pagination">
                                <div className="sk-pagination-container">
                                    <Pagination
                                        showQuickJumper={isMain}
                                        current={currentPage}
                                        total={count}
                                        pageSize={pageSize}
                                        pageSizeOptions={[10, 50, 100]}
                                        locale={{
                                            items_per_page: 'на странице',
                                            jump_to: 'Перейти',
                                            jump_to_confirm: 'OK',
                                            page: 'Страница'
                                        }}
                                        onShowSizeChange={(current, newSize) => handleChangePageSize(newSize)}
                                        onChange={(page) => handlePageChange(page)}
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
                                    >Всего найдено: {count}</Tag>
                                </div>
                                {!isMain && createAction}
                            </div>
                        </PanelWrapper>
                        <Spin tip="Ожидайте" spinning={isLoading} style={{width: '100%', height: '100%'}}>
                            {isMain ? (
                                <PersonnelTable label="Правила учёта рабочего времени" headings={['ID','Правило','Компания','Сотрудники','Действия']} empty={!baseRuleList.length}>
                                    {baseRuleList.map(rule => (
                                        <React.Fragment key={rule.id}>
                                            <tr onDoubleClick={() => openCloseRules(rule.id)}>
                                                <td>{rule.id}</td>
                                                <td><div className="sk-personnel-icon-label"><RuleIcons type={rule.rule_type_id} size="20px" />{rule.name}</div></td>
                                                <td>{rule.company_name}</td>
                                                <td><Button size="small" aria-expanded={closedRules.includes(rule.id)} onClick={() => openCloseRules(rule.id)}>
                                                    {rule.users_count ?? 0} <UserOutlined />
                                                </Button></td>
                                                <td><PersonnelEditAction label="Редактировать правило" onClick={() => onOpenModalEditor(rule.id)} /></td>
                                            </tr>
                                            {closedRules.includes(rule.id) && <tr><td colSpan={5}>
                                                <PersonnelTable label={`Сотрудники — ${rule.name}`} headings={['ID','Сотрудник','Должность','Действия']}
                                                    empty={!users.some(user => userRules[user.id]?.includes(+rule.id))}>
                                                    {users.filter(user => userRules[user.id]?.includes(+rule.id)).map(user => (
                                                        <tr key={user.id}><td>{user.id}</td><td>{[user.surname,user.name,user.patronymic].filter(Boolean).join(' ')}</td>
                                                            <td>{user.occupy}</td><td><PersonnelEditAction to={`/hr/usermanager/${user.id}/rules`} /></td></tr>
                                                    ))}
                                                </PersonnelTable>
                                            </td></tr>}
                                        </React.Fragment>
                                    ))}
                                </PersonnelTable>
                            ) : <div className="sk-content-table">
                                {baseRuleList.map((rule, index) => (
                                    <div key={`${rule.id}-${index}`}
                                         className="sk-department-block"
                                    >
                                        <div className="sk-department-header"
                                             onDoubleClick={() => openCloseRules(rule.id)}
                                        >
                                            <div className="sk-department-header-hover-container">

                                                {/*<RuleIcons type={rule.rule_type_id} />*/}

                                                <p className="sk-department-header-p">{rule.id}</p>
                                                <p className="sk-department-header-p" style={{flexGrow: 1}}>{rule.name}</p>

                                                <Tag title={rule.id}
                                                     color={rule.company_color}>{rule.company_name.toUpperCase()}</Tag>
                                                <div style={{display: 'inline-block', marginRight: '10px'}}
                                                     title="пользователей">{rule.users_count ?? 0} <UserOutlined/></div>
                                                <div className={'sk-card-call-to-modal'}
                                                     onClick={() => onOpenModalEditor(rule.id)}
                                                >
                                                    <EditOutlined/>
                                                </div>
                                            </div>
                                        </div>
                                        {closedRules.find(item => item === rule.id) && (
                                            <div className="sk-person-rows">
                                                {users.map((user, idx) => {
                                                            if (userRules[user.id]?.includes(+rule.id)) {
                                                                return (
                                                                        <div key={`${user.id}-${idx}`} className={`sk-person-row`}>
                                                                            <div className="sk-person-row-basic">
                                                                                <div className="sk-person-row-basic-hover-container">
                                                                                    <p className="sk-person-row-p">{user.id}</p>
                                                                                    <div className="sk-person-row-content">
                                                                                        <p className="sk-person-row-p">{`${user.surname} ${user.name} ${user.patronymic}`}</p>
                                                                                        <p className="sk-person-row-p occupy">{user.occupy}</p>
                                                                                    </div>
                                                                                    <NavLink to={'/hr/users/' + user.id + "/rules"}>
                                                                                        <Button color={'default'}
                                                                                                variant={'outlined'}
                                                                                                icon={<EditOutlined/>}
                                                                                        >Редактировать</Button>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                );
                                                            }
                                                    return '';
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>}
                        </Spin>
                    </div>
                </Content>
            </Layout>

            <RuleEditorModal
                open={editorOpened}
                item_list={baseRuleList}
                target_id={editedRuleId}
                on_cancel={cancelModalEditor}
                user_data={userdata}
                on_save={saveRule}
                type_list={currentRules}
            />
        </Layout>
    )
};

export default RuleManagerPage;
