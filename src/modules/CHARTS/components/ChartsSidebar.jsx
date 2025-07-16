import React, {useEffect, useState} from 'react';
import {Button, Input, Select, Space} from "antd";
import dayjs from "dayjs";

const ChartsSidebar = (props) => {
    const initialstate = {
        filterYear: dayjs().year(),
        filterUser: null,
        filterCompany: null,
        filterDepartment: null,
        filterUserStatus: null,
        filterGroup: null,
    }

    const [filterYears, setFilterYears] = useState(dayjs().year());
    const [filterUser, setFilterUser] = useState(null);
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterUserStatus, setFilterUserStatus] = useState(null);
    const [filterGroup, setFilterGroup] = useState(null);

    const setInitialState = () => {
        setFilterYears(initialstate.filterYear);
        setFilterUser(initialstate.filterUser);
        setFilterCompany(initialstate.filterCompany);
        setFilterDepartment(initialstate.filterDepartment);
        setFilterUserStatus(initialstate.filterUserStatus);
        setFilterGroup(initialstate.filterGroup);
    };

    useEffect(() => {
        const params = {};
        if (filterUser) params.users = filterUser;
        if (filterCompany) params.company = filterCompany;
        if (filterDepartment) params.department = filterDepartment;
        if (filterUserStatus) params.user_status_id = filterUserStatus;
        if (filterGroup) params.group_id = filterGroup;

        if (props.on_change_filter){
            props.on_change_filter(params);
        }
    }, [filterYears, filterUser, filterCompany,
        filterDepartment, filterUserStatus, filterGroup]);



    return (
        <div style={{maxHeight: '100vh', overflow: 'auto'}}>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Год</span>
                <Select style={{width: '100%'}}
                        placeholder={'Выберите год'}
                        value={filterYears}
                        options={props.year_list}
                        onChange={(ev) => {
                            setFilterYears(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Пользователи</span>
                <Select style={{width: '100%'}}
                        placeholder={'Выберите пользователя'}
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

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Компания</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все компании'}
                        value={filterCompany}
                        options={props.company_list.filter(company => company.value > 1)}
                        onChange={(ev) => {
                            setFilterCompany(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Отдел</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все отделы'}
                        value={filterDepartment}
                        options={props.depart_list}
                        onChange={(ev) => {
                            setFilterDepartment(ev)
                        }}
                        allowClear
                />
            </div>

            {props.userAls && props.userAls.includes(17) && (
                <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Статус пользователя</span>
                    <Select style={{width: '100%'}}
                            placeholder={'Работающие / уволенные'}
                            value={filterUserStatus}
                            options={props.user_statuses_list}
                            onChange={(ev) => {
                                setFilterUserStatus(ev)
                            }}
                            allowClear
                    />
                </div>
            )}

            {props.userAls && props.userAls.includes(17) && (
                <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Группа пользователя</span>
                    <Select style={{width: '100%'}}
                            placeholder={'Любая'}
                            value={filterGroup}
                            options={props.groups_list}
                            onChange={(ev) => {
                                setFilterGroup(ev)
                            }}
                            allowClear
                    />
                </div>
            )}

            <br/>
            <div className={'sk-usp-filter-col-item'}>
                <Button block onClick={setInitialState}>Очистить фильтры</Button>
            </div>
        </div>
    )
}

export default ChartsSidebar;
