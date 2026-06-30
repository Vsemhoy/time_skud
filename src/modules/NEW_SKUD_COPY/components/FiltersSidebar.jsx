import React, {useContext, useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Input, Select} from "antd";
import {DS_DEPARTMENTS, DS_USER} from "../../../CONFIG/DEFAULTSTATE";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {StateContext} from "../../../components/ComStateProvider25/ComStateProvider25";
import {ReloadOutlined, SearchOutlined} from "@ant-design/icons";

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
            if (savedFiltersRef.current.usedCompany !== undefined) {
                return;
            }

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
    const handleRefresh = () => {
        if (props.onRefresh) {
            props.onRefresh();
        }
    };

    return (
        <aside className="sk2-filters-panel">
            <header className="sk2-filters-panel__header">
                <div className="sk2-filters-panel__eyebrow">Параметры списка</div>
                <div className="sk2-filters-panel__title">Фильтры сотрудников</div>
            </header>

            <div className="sk2-filters-panel__body">
              <section className="sk2-filter-section">
                <div className="sk2-filter-field">
                  <label className="sk-usp-filter-col-label">Сотрудник</label>
                <Input
                    prefix={<SearchOutlined />}
                    allowClear
                    placeholder="Имя или фамилия"
                    value={props.employeeSearchValue ?? ''}
                    onChange={handleEmployeeSearchChange}
                />
                </div>
              </section>

              <section className="sk2-filter-section sk2-filter-section--stack">
                <div className="sk2-filter-field">
                  <label className="sk-usp-filter-col-label">Компания</label>
                  {companies.length > 1 ? (
                      <Select
                          options={companies}
                          value={usedCompany}
                          onChange={handleUsedCompanyChange}
                      />
                  ) : null}
                </div>

                <div className="sk2-filter-field">
                  <label className="sk-usp-filter-col-label">Отдел</label>
                  <Select
                      options={departments}
                      value={usedDepartment}
                      onChange={handleUsedDepartmentChange}
                  />
                </div>
              </section>

              <section className="sk2-filter-section">
                <div className="sk2-filter-field">
                  <label className="sk-usp-filter-col-label">Сортировка</label>
                  <Select
                      placeholder="Упорядочить по"
                      options={sortByValues}
                      value={usedSort === 0 ? null : usedSort}
                      onChange={handleSortByChange}
                  />
                </div>
              </section>

              <section className="sk2-filter-section sk2-filter-section--option">
                <Checkbox
                    checked={props?.extendedInfo}
                    onChange={() => props.isShowExtended(!props?.extendedInfo)}
                >
                    Показать расширенную информацию
                </Checkbox>
              </section>
            </div>

            <footer className="sk2-filters-panel__actions">
              <Button
                  block
                  icon={<ReloadOutlined />}
                  loading={props.isLoading}
                  onClick={handleRefresh}
              >
                  Обновить данные
              </Button>
              <Button
                  block
                  className="sk2-filters-reset"
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
                  Сбросить фильтры
              </Button>
            </footer>
        </aside>
    );
}

export default FiltersSidebar;
