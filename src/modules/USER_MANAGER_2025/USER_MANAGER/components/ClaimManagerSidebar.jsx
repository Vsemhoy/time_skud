import { Button, DatePicker, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const ClaimManagerSidebar = (props) => {

    const initialstate = {
        filterUserNameOrDepartment: '',
        filterCompany: null,
        filterDepartment: null,
        filterBoss: null,
        filterStatus: null,
        filterShowDeleted: false,
        filterDurationStart: 0,
        filterDurationEnd: 0, 
        filterShowEvaluated: 0
    }
    
    const [filterUserNameOrDepartment, setFilterUserNameOrDepartment] = useState('');
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterBoss, setFilterBoss] = useState(null);
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterShowDeleted, setFilterShowDeleted] = useState(false);
    const [filterShowEvaluated, setFilterShowEvaluated] = useState(0);
    const [filterDurationStart, setFilterDurationStart] = useState(0);
    const [filterDurationEnd, setFilterDurationEnd] = useState(0);

    const setInitialState = () => {
        setFilterUserNameOrDepartment(initialstate.filterUserNameOrDepartment);
        setFilterCompany(initialstate.filterCompany);
        setFilterDepartment(initialstate.filterDepartment);
        setFilterBoss(initialstate.filterBoss);
        setFilterStatus(initialstate.filterStatus);
        setFilterShowDeleted(initialstate.filterShowDeleted);
        setFilterDurationStart(initialstate.filterDurationStart);
        setFilterDurationEnd(initialstate.filterDurationEnd);
        setFilterShowEvaluated(initialstate.filterShowEvaluated);
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
        console.log('props.company_list', props.company_list);
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
        if (filterUserNameOrDepartment?.trim()) params.username = filterUserNameOrDepartment.trim();
        if (filterCompany) params.company = filterCompany;
        if (filterDepartment) params.department = filterDepartment;
        if (filterBoss) params.boss_id = filterBoss;
        if (filterStatus !== null) params.state = filterStatus;

        if (filterShowDeleted) params.deleted = true;
        if (filterShowEvaluated !== null) params.evaluated = filterShowEvaluated;
        
        // Фильтр по продолжительности
        if (filterDurationStart > 0) params.durationStart = parseInt(filterDurationStart);
        if (filterDurationEnd > 0) params.durationEnd = parseInt(filterDurationEnd);

        if (parseInt(filterDurationEnd) < parseInt(filterDurationStart)){
            setFilterDurationEnd(parseInt(filterDurationStart));
            params.durationEnd = parseInt(filterDurationStart);
        }
        if (props.on_change_filter){
            props.on_change_filter(params);
        }
    }, [filterUserNameOrDepartment, filterCompany,
              filterDepartment, filterBoss,
              filterStatus, filterShowDeleted,
              filterDurationStart, filterDurationEnd, filterShowEvaluated]);



    return (
        <div style={{maxHeight: '100vh', overflow: 'auto'}}>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Пользователь / должность</span>
                <Input style={{width: '100%'}}
                        placeholder={'Имя пользователя / должность'}
                        allowClear={true}
                        value={filterUserNameOrDepartment}
                        onChange={(ev) => {
                            setFilterUserNameOrDepartment(ev.target.value)
                        }}
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Руководитель</span>
                <Select style={{width: '100%'}}
                        placeholder={'Выберите руководителя'}
                        value={filterBoss}
                        options={props.boss_list.map((boss) => {
                            return ({
                                key: `boss${boss.id}`,
                                value: boss.id,
                                label: boss.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterBoss(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Компания</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все компании'}
                        value={filterCompany}
                        options={props.company_list.map((company) => {
                            return ({
                                key: `company${company.id}`,
                                value: company.id,
                                label: company.name
                            })
                        })}
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
                        options={props.depart_list.map((dep) => {
                            return ({
                                key: `depid_${dep.id}`,
                                value: dep.id,
                                label: dep.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterDepartment(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Вход</span>
                <Select style={{width: '100%'}}
                        placeholder={'Разрешен'}
                        options={props.enters_list.map((enter) => {
                            return ({
                                key: `enter${enter.id}`,
                                value: enter.id,
                                label: enter.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterStatus(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Статус пользователя</span>
                <Select style={{width: '100%'}}
                        placeholder={'Работающие / уволенные'}
                        options={props.user_statuses_list.map((user_status) => {
                            return ({
                                key: `user_status${user_status.id}`,
                                value: user_status.id,
                                label: user_status.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterStatus(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Группа пользователя</span>
                <Select style={{width: '100%'}}
                        placeholder={'Любая'}
                        options={props.groups_list.map((group) => {
                            return ({
                                key: `group${group.id}`,
                                value: group.id,
                                label: group.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterShowEvaluated(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Текущий тип графика</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все типы'}
                        options={props.current_chart_types_list.map((current_chart_type) => {
                            return ({
                                key: `current_chart_type${current_chart_type.id}`,
                                value: current_chart_type.id,
                                label: current_chart_type.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterShowEvaluated(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Текущий график</span>
                <Select style={{width: '100%'}}
                        placeholder={'Любые графики'}
                        options={props.current_charts_list.map((current_chart) => {
                            return ({
                                key: `current_chart${current_chart.id}`,
                                value: current_chart.id,
                                label: current_chart.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterShowEvaluated(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Текущие типы правил</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все типы'}
                        options={props.current_rule_types_list.map((current_rule_typ) => {
                            return ({
                                key: `current_rule_typ${current_rule_typ.id}`,
                                value: current_rule_typ.id,
                                label: current_rule_typ.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterShowEvaluated(ev)
                        }}
                        allowClear
                />
            </div>

            <div className={'sk-usp-filter-col-item'}>
                <span className={'sk-usp-filter-col-label'}>Текущие правила</span>
                <Select style={{width: '100%'}}
                        placeholder={'Любые правила'}
                        options={props.current_rules_list.map((current_rules_list) => {
                            return ({
                                key: `current_rules_list${current_rules_list.id}`,
                                value: current_rules_list.id,
                                label: current_rules_list.name
                            })
                        })}
                        onChange={(ev) => {
                            setFilterShowEvaluated(ev)
                        }}
                        allowClear
                />
            </div>

            <br/>
            <div className={'sk-usp-filter-col-item'}>
                <Button block onClick={setInitialState}>Очистить фильтры</Button>
            </div>
        </div>
    )
}

export default ClaimManagerSidebar;