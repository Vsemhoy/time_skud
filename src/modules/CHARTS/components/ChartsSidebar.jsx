import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Input, Select, Space} from "antd";
import dayjs from "dayjs";


const ChartsSidebar = (props) => {
    const initialstate = {
        filterYear: dayjs().year(),
        filterUser: null,
        filterCompany: null,
        filterDepartment: null,
        filterUserStatus: 1,
        filterGroup: null,
    }

    const [filterYear, setFilterYear] = useState(dayjs().year());
    const [filterUser, setFilterUser] = useState(null);
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterUserStatus, setFilterUserStatus] = useState(1);
    const [filterGroup, setFilterGroup] = useState(null);
    const [filterIntersections, setFilterIntersections] = useState(true);

    const setInitialState = () => {
        setFilterYear(initialstate.filterYear);
        setFilterUser(initialstate.filterUser);
        setFilterCompany(initialstate.filterCompany);
        setFilterDepartment(initialstate.filterDepartment);
        setFilterUserStatus(initialstate.filterUserStatus);
        setFilterGroup(initialstate.filterGroup);
    };

    useEffect(() => {
        const params = {};
        if (filterYear) params.year = filterYear;
        if (filterUser) params.users = filterUser;
        if (filterCompany) params.company = filterCompany;
        if (filterDepartment) params.department = filterDepartment;
        if (filterUserStatus) params.user_status_id = filterUserStatus;
        if (filterGroup) params.group_id = filterGroup;
        if (filterIntersections) params.intersections = filterIntersections;

        if (props.on_change_filter){
            props.on_change_filter(params);
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
                    <Select style={{width: '100%',maxHeight: 300, overflow: 'auto',}}
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
