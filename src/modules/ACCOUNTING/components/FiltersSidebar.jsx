import {Button, Input, Select, Space} from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const FiltersSidebar = (props) => {

    const initialstate = {
        filterYear: dayjs().year(),
        filterMonth: dayjs().month(),
        filterDepartments: null,
        filterUser: null,
    }

    const [filterYear, setFilterYear] = useState(null);
    const [filterMonth, setFilterMonth] = useState(null);
    const [filterDepartments, setFilterDepartments] = useState(null);
    const [filterUser, setFilterUser] = useState(null);

    const setInitialState = () => {
        setFilterYear(initialstate.filterYear);
        setFilterMonth(initialstate.filterMonth);
        setFilterDepartments(initialstate.filterDepartments);
        setFilterUser(initialstate.filterUser);
    };

    useEffect(() => {
        setInitialState();
    }, []);

    useEffect(() => {
        const params = {};
        if (filterYear) params.year = filterYear;
        if (filterMonth) params.month = filterMonth;
        if (filterDepartments) params.departments = filterDepartments;
        if (filterUser) params.users = filterUser;

        if (props.on_change_filter){
            props.on_change_filter(params);
        }
    }, [filterYear, filterMonth, filterDepartments, filterUser]);

    return (
        <div style={{maxHeight: '100vh', overflow: 'auto'}}>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Год</span>
                <Select style={{width: '100%'}}
                        value={filterYear}
                        options={props.years_list}
                        onChange={(ev) => {
                            setFilterYear(ev)
                        }}
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Месяц</span>
                <Select style={{width: '100%'}}
                        value={filterMonth}
                        options={props.months_list}
                        onChange={(ev) => {
                            setFilterMonth(ev)
                        }}
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Отделы</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все отделы'}
                        value={filterDepartments}
                        options={props.departments_list}
                        onChange={(ev) => {
                            setFilterDepartments(ev)
                        }}
                        allowClear
                        mode="multiple"
                        optionRender={option => (
                            <Space>
                                <span>{option.label}</span>
                            </Space>
                        )}
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Пользователи</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все пользователи'}
                        value={filterUser}
                        options={props.user_list}
                        onChange={(ev) => {
                            setFilterUser(ev)
                        }}
                        allowClear
                        mode="multiple"
                        optionRender={option => (
                            <Space>
                                <span>{option.label}</span>
                            </Space>
                        )}
                />
            </div>

            <br/>
            <div className={'sk-usp-filter-col-item'}>
                <Button block onClick={setInitialState}>Очистить фильтры</Button>
            </div>
        </div>
    )
}

export default FiltersSidebar;
