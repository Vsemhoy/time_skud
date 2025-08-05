import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Select} from "antd";
import dayjs from "dayjs";


const ChartsSidebar = (props) => {
    const initialState = {
        filterYear: dayjs().year(),
        filterUser: null,
        filterCompany: null,
        filterDepartment: null,
        filterUserStatus: 0,
        filterGroup: null,
    }
    const [isMounted, setIsMounted] = useState(false);
    const [filterYear, setFilterYear] = useState(dayjs().year());
    const [filterUser, setFilterUser] = useState(null);
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterUserStatus, setFilterUserStatus] = useState(1);
    const [filterGroup, setFilterGroup] = useState(null);
    const [filterIntersections, setFilterIntersections] = useState(false);

    const setInitialState = () => {
        setFilterYear(initialState.filterYear);
        setFilterUser(initialState.filterUser);
        setFilterCompany(initialState.filterCompany);
        setFilterDepartment(initialState.filterDepartment);
        setFilterUserStatus(initialState.filterUserStatus);
        setFilterGroup(initialState.filterGroup);
    };

    useEffect(() => {
        if (!isMounted) {
            setInitialState();
            setIsMounted(true);
        }
    }, []);
    useEffect(() => {
        if (isMounted) {
            const params = {};
            if (filterYear) params.year = filterYear;
            if (filterUser) params.users = filterUser;
            if (filterCompany) params.company = filterCompany;
            if (filterDepartment) params.department = filterDepartment;
            if (filterUserStatus || filterUserStatus === 0) params.user_status_id = filterUserStatus;
            if (filterGroup) params.group_id = filterGroup;
            if (filterIntersections) params.intersections = filterIntersections;

            props.on_change_filter(params);
            console.log(params)
        }
    }, [filterYear, filterUser, filterCompany,
        filterDepartment, filterUserStatus, filterGroup, filterIntersections]);
    useEffect(() => {
        if (props.myClaims) {
            setFilterUser(props.user_list.filter(user => user.value === props.currentUser.id).map(user => user.value));
            console.log(props.user_list.filter(user => user.value === props.currentUser.id).map(user => user.value))
        } else {
            const arr = props.user_list.filter(user => user.value === props.currentUser.id).map(user => user.value);
            if (!props.mySubjects && areArraysEqualSimple(arr, filterUser)) {
                setFilterUser([]);
            }
        }
    }, [props.myClaims]);
    useEffect(() => {
        if (props.mySubjects) {
            setFilterUser(props.user_list.filter(user => user.boss_id === props.currentUser.id).map(user => user.value));
            console.log(props.user_list.filter(user => user.boss_id === props.currentUser.id).map(user => user.value))
        } else {
            const arr = props.user_list.filter(user => user.boss_id === props.currentUser.id).map(user => user.value);
            if (!props.myClaims && areArraysEqualSimple(arr, filterUser)) {
                setFilterUser([]);
            }
        }
    }, [props.mySubjects]);
    useEffect(() => {
        if (props.myClaims) {
            const arr = props.user_list.filter(user => user.value === props.currentUser.id).map(user => user.value);
            props.on_change_filter_user('myClaims', areArraysEqualSimple(arr, filterUser));
        }
        if (props.mySubjects) {
            const arr = props.user_list.filter(user => user.boss_id === props.currentUser.id).map(user => user.value);
            props.on_change_filter_user('mySubjects', areArraysEqualSimple(arr, filterUser));
        }
    }, [filterUser]);
    const areArraysEqualSimple = (arr1, arr2) => {
        if (arr1 && arr2) {
            return arr1.length === arr2.length &&
                arr1.every((item, index) => item === arr2[index]);
        }
        return false;
    };
    const renderLabel = (info) => {
        return (
            <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    overflow: 'hidden'
                 }}
            >
                <span style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1,
                    marginRight: 10
                }}>
                  {info.label}
                </span>
                <span style={{
                    color: '#999',
                    flexShrink: 0
                }}>
                  {info.count}
                </span>
            </div>
        );
    };

    return (
        <div style={{height: 'calc(100vh - 17px - 64px - 46px)', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>

            <div>
                <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Год</span>
                    <Select style={{width: '100%'}}
                            placeholder={'Выберите год'}
                            value={filterYear}
                            options={props.year_list}
                            onChange={(ev) => {
                                setFilterYear(ev)
                            }}
                    />
                </div>

                <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Пользователи</span>
                    <Select
                        style={{ width: '100%', maxHeight: 300, overflow: 'auto' }}
                        placeholder="Выберите пользователя"
                        value={filterUser}
                        options={props.user_list.map(user => ({
                            ...user,
                            disabled: !user.match,
                            name: user.label,
                            label: (
                                <span style={!user.match ? { opacity: 0.5 } : {}}>
                                    {user.label}
                                </span>
                            )
                        }))}
                        onChange={setFilterUser}
                        allowClear
                        mode="multiple"
                        showSearch
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            option.name.toLowerCase().includes(input.toLowerCase()) && option.match
                        }
                    />
                </div>

                <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Компания</span>
                    <Select style={{width: '100%'}}
                            placeholder={'Все компании'}
                            value={filterCompany}
                            options={props.company_list.map(dept => ({
                                value: dept.value,
                                label: (renderLabel(dept)),
                                name: dept.label
                            }))}
                            onChange={(ev) => {
                                setFilterCompany(ev)
                            }}
                            allowClear
                            optionLabelProp="name"
                    />
                </div>

                <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Отделы</span>
                    <Select style={{width: '100%'}}
                            placeholder="Все отделы"
                            value={filterDepartment}
                            options={props.depart_list.map(dept => ({
                                value: dept.value,
                                label: (renderLabel(dept)),
                                name: dept.label
                            }))}
                            onChange={(ev) => setFilterDepartment(ev)}
                            allowClear
                            optionLabelProp="name"
                    />
                </div>

                {props.userAls && props.userAls.includes(17) && (
                    <div className={'sk-usp-filter-col-item'}>
                    <span className={'sk-usp-filter-col-label'}>Статус пользователя</span>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Работающие / уволенные"
                            value={filterUserStatus?.toString()}
                            options={props.user_statuses_list.map(dept => ({
                                value: dept.value.toString(),
                                label: renderLabel(dept),
                                name: dept.label
                            }))}
                            onChange={(ev) => setFilterUserStatus(Number(ev))}
                            optionLabelProp="name"
                        />
                    </div>
                )}

                {props.userAls && props.userAls.includes(17) && (
                    <div className={'sk-usp-filter-col-item'}>
                        <span className={'sk-usp-filter-col-label'}>Группа пользователя</span>
                        <Select style={{width: '100%'}}
                                placeholder={'Любая'}
                                value={filterGroup}
                                options={props.groups_list.map(dept => ({
                                    value: dept.value,
                                    label: (renderLabel(dept)),
                                    name: dept.label
                                }))}
                                onChange={(ev) => {
                                    setFilterGroup(ev)
                                }}
                                allowClear
                                optionLabelProp="name"
                        />
                    </div>
                )}

                <div className={'sk-usp-filter-col-item'}>
                    <Checkbox checked={filterIntersections}
                              onChange={() => setFilterIntersections(!filterIntersections)}
                              style={{
                                  marginBottom: '6px',
                                  color: 'gray'
                              }}
                    >
                        Показать пересечения
                    </Checkbox>
                </div>

            </div>

            <div className={'sk-usp-filter-col-item'}>
                <Button block onClick={setInitialState}>Очистить фильтры</Button>
            </div>
        </div>
    )
}

export default ChartsSidebar;
