import React, {useEffect, useState} from 'react';
import {Button, Input, Select} from "antd";
import dayjs from "dayjs";

const ChartsSidebar = (props) => {
    const initialstate = {
        filterYear: {
            value: 0,
            label: dayjs().year()
        },
        filterUserNameOrOccupy: '',
        filterCompany: null,
        filterDepartment: null,
        filterUserStatus: null,
        filterGroup: null,
    }

    const [filterYears, setFilterYears] = useState(null);
    const [filterUserNameOrOccupy, setFilterUserNameOrOccupy] = useState('');
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterUserStatus, setFilterUserStatus] = useState(null);
    const [filterGroup, setFilterGroup] = useState(null);

    const setInitialState = () => {
        setFilterYears(initialstate.filterYear);
        setFilterUserNameOrOccupy(initialstate.filterUserNameOrOccupy);
        setFilterCompany(initialstate.filterCompany);
        setFilterDepartment(initialstate.filterDepartment);
        setFilterUserStatus(initialstate.filterUserStatus);
        setFilterGroup(initialstate.filterGroup);
    };

    const [bossList, setBossList] = useState([]);
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        if (props.user_list && props.user_list.length > 0) {
            // 1. Собираем уникальные boss_id
            const bossIds = new Set();
            props.user_list.forEach(user => {
                if (user.boss_id && user.boss_id !== 0) {
                    bossIds.add(user.boss_id);
                }
            });

            // 2. Формируем массив объектов только для тех, кто является чьим-то боссом
            const bosses = props.user_list
                .filter(user => bossIds.has(user.id))
                .map(user => ({
                    key: `userkey_${user.id}`,
                    value: user.id,
                    label: (
                        <div className="sk-flex-space">
                            <div>{`${user.surname} ${user.name} ${user.patronymic}`}</div>
                            <div>{user.id}</div>
                        </div>
                    ),
                }));

            setBossList(bosses);
        } else {
            setBossList([]);
        }
    }, [props.user_list]);




    useEffect(()=>{
        //console.log('props.company_list', props.company_list);
        if (props.company_list){
            setCompanyList([{ key: 0, value: 0, label: 'Все компании' },
                ...props.company_list.filter(com => com.id != 1)
                    .map(com => ({
                            key: `usercom_${com.id}`,
                            value: com.id,
                            label: (
                                <div className="sk-flex-space">
                                    <div>{`${com.name}`}</div>
                                    <div>{com.id}</div>
                                </div>
                            ),
                        })
                    )]
            );
        }

    },[props.company_list]);

    useEffect(() => {
        const params = {};
        if (filterUserNameOrOccupy?.trim()) params.username = filterUserNameOrOccupy.trim();
        if (filterCompany) params.company = filterCompany;
        if (filterDepartment) params.department = filterDepartment;
        if (filterUserStatus) params.user_status_id = filterUserStatus;
        if (filterGroup) params.group_id = filterGroup;

        if (props.on_change_filter){
            props.on_change_filter(params);
        }
    }, [filterYears, filterUserNameOrOccupy, filterCompany,
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
                <span className={'sk-usp-filter-col-label'}>Пользователь / должность</span>
                <Input style={{width: '100%'}}
                       placeholder={'Имя пользователя / должность'}
                       allowClear={true}
                       value={filterUserNameOrOccupy}
                       onChange={(ev) => {
                           setFilterUserNameOrOccupy(ev.target.value)
                       }}
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Компания</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все компании'}
                        value={filterCompany}
                        options={props.company_list}
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
