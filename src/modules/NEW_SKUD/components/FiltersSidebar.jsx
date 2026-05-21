import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Input, Select} from "antd";
import {DS_DEPARTMENTS, DS_USER} from "../../../CONFIG/DEFAULTSTATE";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../components/ComStateProvider25/ComStateProvider25";
import {ReloadOutlined, UserOutlined} from "@ant-design/icons";

const FILTERS_STORAGE_KEY = 'time_skud:new_skud:sidebar_filters';

const getSavedFilters = () => {
    if (typeof window === 'undefined') {
        return {};
    }

    try {
        return JSON.parse(window.localStorage.getItem(FILTERS_STORAGE_KEY)) || {};
    } catch (e) {
        console.log('filters localStorage parse error', e);
        return {};
    }
};

const FiltersSidebar = (props) => {
    const { state, setState } = useContext(StateContext);
    const navigate = useNavigate();
    const savedFiltersRef = useRef(getSavedFilters());
    const didRestoreSavedFiltersRef = useRef(false);
    const [companies, setCompanies] = useState([
        { key: 'nullCompany', value: 0, label: 'Все компании' },
        ...DS_USER.companies.filter(item => item.id !== 1).map((com) => ({
            key: com.id,
            value: Number(com.id),
            label: com.name,
        })),
    ]);
    const [usedCompany, setUsedCompany] = useState(Number(savedFiltersRef.current.usedCompany ?? 0)); // Default to 0 initially
    const [usedSort, setUsedSort] = useState(savedFiltersRef.current.usedSort ?? 0);
    const [usedDate, setUsedDate] = useState(dayjs());
    const [usedDepartment, setUsedDepartment] = useState(Number(savedFiltersRef.current.usedDepartment ?? 0));

    const [activeCompany, setActiveCompany] = useState(0);

    const [departments, setDepartments]  = useState([
        { key: 'dep_25345', value: 0, label: 'Все отделы' },
        ...DS_DEPARTMENTS.map((dep)=>
            ({
                key: `departament_${dep.id}`,
                value: dep.id,
                label: dep.name
            })
        )
    ]);

    useEffect(() => {
        if (didRestoreSavedFiltersRef.current) {
            return;
        }

        didRestoreSavedFiltersRef.current = true;

        if (typeof savedFiltersRef.current.extendedInfo === 'boolean' && props.isShowExtended) {
            props.isShowExtended(savedFiltersRef.current.extendedInfo);
        }

        if (typeof savedFiltersRef.current.employeeSearchValue === 'string' && props.onEmployeeSearchChange) {
            props.onEmployeeSearchChange(savedFiltersRef.current.employeeSearchValue);
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify({
            usedCompany,
            usedDepartment,
            usedSort,
            extendedInfo: Boolean(props.extendedInfo),
            employeeSearchValue: props.employeeSearchValue ?? '',
        }));
    }, [usedCompany, usedDepartment, usedSort, props.extendedInfo, props.employeeSearchValue]);

    const [sortByValues, setSortByValues] = useState([
        {
            key:'ssv001',
            value:'department_asc',
            label:"отдел"
        },
        {
            key:'ssv002',
            value:'name_asc',
            label:"Имя А-Я"
        },
        {
            key:'ssv003',
            value:'name_desc',
            label:"Имя Я-A"
        },
        {
            key:'ssv0021',
            value:'surname_asc',
            label:"Фамилия А-Я"
        },
        {
            key:'ssv0031',
            value:'surname_desc',
            label:"Фамилия Я-A"
        },
        {
            key:'ssv004',
            value:'time_comein_asc',
            label:"Время входа"
        },
        {
            key:'ssv051',
            value:'time_cameout_asc',
            label:"Время выхода"
        },
        {
            key:'ssv0060',
            value:'state_desc',
            label:"Статус"
        },
        {
            key:'ssv0061',
            value:'lost_time_asc',
            label:"Потерянное время"
        },
    ]);

    useEffect(() => {
        if (props.onChangeInnerFilers)
        {
            let filters = [{ key :'id_company', value: usedCompany},
                {key : 'depart_id', value: usedDepartment}
            ];
            console.log('CALL TO FILTER', filters);
            props.onChangeInnerFilers(filters);
        }

    }, [usedCompany, usedDepartment]);

    useEffect(() => {
        if (props.onChangeInnerSort)
        {
            // let userList = JSON.parse(JSON.stringify(baseUserListData));
            // userList = filterUserListByCompany(userList, usedCompany);
            // userList = filterUserListByDepartment(userList, usedDepartment);


            // userList = sortUserList(userList, usedSort);
            console.log('CALL TO SORT', usedSort);
            props.onChangeInnerSort(usedSort);
            // onChange(userList);
        }

    }, [usedSort]);

    useEffect(() => {
        if (props.activeCompany) {
            setActiveCompany(props.activeCompany);
            setUsedCompany(props.activeCompany);
        }
    }, [props.activeCompany]);

    const setDateInContext = (value) => {
        const params = new URLSearchParams(window.location.search);
        params.set('date', value.unix());
        navigate(`?${params.toString()}`);
        // if (deleteOn.includes('date')){
        //     params.delete('date');
        // } else {
        // };

        setState(prevState => ({
            ...prevState, // Сохраняем все текущие значения
            date: value, // Обновляем только `date`
        }));
    }
    const handleUsedCompanyChange = (value) => {
        setUsedCompany(value);
        // changeAddressBarParam('tgc',value,[0]);
    };
    const handleUsedDepartmentChange = (value) => {
        setUsedDepartment(value);
        // changeAddressBarParam('dep',value,[0]);
    };
    const handleSortByChange = (value) => {
        setUsedSort(value);
    };
    const handleEmployeeSearchChange = (event) => {
        if (props.onEmployeeSearchChange) {
            props.onEmployeeSearchChange(event.target.value);
        }
    };
    const handleFindMyself = () => {
        if (props.onFindMe) {
            props.onFindMe();
        }
    };
    const handleRefresh = () => {
        if (props.onRefresh) {
            props.onRefresh();
        }
    };

    return (
        <div>
            <div className="sk-userlist-sidebar-tools">
                <div className={'sk-usp-filter-col-label'}>Сотрудник</div>
                <Input
                    allowClear
                    placeholder="Сотрудник"
                    value={props.employeeSearchValue ?? ''}
                    onChange={handleEmployeeSearchChange}
                />
                {props.imExist && (
                    <Button
                        block
                        icon={<UserOutlined />}
                        onClick={handleFindMyself}
                    >
                        Найти себя
                    </Button>
                )}
                <Button
                    block
                    icon={<ReloadOutlined />}
                    loading={props.isLoading}
                    onClick={handleRefresh}
                >
                    Обновить данные
                </Button>
            </div>
            <br/>
            <div>
                <div>
                    <div className={'sk-usp-filter-col-label'}>Компания</div>
                    {companies.length > 1 ? (
                        <Select
                            style={{width: '100%'}}
                            options={companies}
                            value={usedCompany}
                            onChange={handleUsedCompanyChange}
                        />
                    ) : ''}
                </div>
                <br/>
                <div>
                    <div className={'sk-usp-filter-col-label'}>Отдел</div>
                    <Select
                        style={{width: '100%'}}
                        options={departments}
                        value={usedDepartment}

                        onChange={handleUsedDepartmentChange}
                    />
                </div>
                <br/>
            </div>


            <div>
                <div className={'sk-usp-filter-col-label'}>Сортировка</div>
                <Select
                    style={{width: '100%'}}
                    placeholder={'Упорядочить по'}
                    options={sortByValues}
                    value={usedSort === 0 ? null : usedSort}
                    onChange={handleSortByChange}
                />
                <br/>
            </div>
            <br/>
            {(
                <div>
                    <Checkbox checked={props?.extendedInfo}
                              onChange={() => props.isShowExtended(!props?.extendedInfo)}
                              style={{
                                  marginBottom: '6px',
                                  color: 'gray'
                              }}
                    >
                        Показать расширенную информацию
                    </Checkbox>
                </div>
            )}

            <div>
                <div>
                    <br/>
                    <Button
                        block
                        onClick={() => {
                            setUsedCompany(0);
                            setUsedDepartment(0);
                            setUsedSort('department_asc');
                            if (props.onEmployeeSearchChange) {
                                props.onEmployeeSearchChange('');
                            }
                            if (props.isShowExtended) {
                                props.isShowExtended(false);
                            }
                        }}
                    >
                        Очистить фильтры
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FiltersSidebar;
