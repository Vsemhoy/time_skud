import { Button, DatePicker, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const ClaimManagerSidebar = (props) => {

    const initialstate = {
        filterUserNameOrDepartment: '',
        filterCompany: null,
        filterDepartment: null,
        filterBoss: null,
        filterEnter: null,
        filterUserStatus: null,
        filterGroup: null,
        currentScheduleType: null,
        currentSchedule: null,
        currentRuleType: null,
        currentRule: null,
    }
    
    const [filterUserNameOrDepartment, setFilterUserNameOrDepartment] = useState('');
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterBoss, setFilterBoss] = useState(null);
    const [filterEnter, setFilterEnter] = useState(null);
    const [filterUserStatus, setFilterUserStatus] = useState(null);
    const [filterGroup, setFilterGroup] = useState(null);
    const [currentScheduleType, setCurrentScheduleType] = useState(null);
    const [currentSchedule, setCurrentSchedule] = useState(null);
    const [currentRuleType, setCurrentRuleType] = useState(null);
    const [currentRule, setCurrentRule] = useState(null);

    useEffect(() => {
      if (props.on_select_company)
      {
        props.on_select_company(filterCompany);
      }
    }, [filterCompany]);

    const setInitialState = () => {
        setFilterUserNameOrDepartment(initialstate.filterUserNameOrDepartment);
        setFilterCompany(initialstate.filterCompany);
        setFilterDepartment(initialstate.filterDepartment);
        setFilterBoss(initialstate.filterBoss);
        setFilterEnter(initialstate.filterEnter);
        setFilterUserStatus(initialstate.filterUserStatus);
        setFilterGroup(initialstate.filterGroup);
        setCurrentScheduleType(initialstate.currentScheduleType);
        setCurrentSchedule(initialstate.currentSchedule);
        setCurrentRuleType(initialstate.currentRuleType);
        setCurrentRule(initialstate.currentRule);
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
        if (filterUserNameOrDepartment?.trim()) params.username = filterUserNameOrDepartment.trim();
        if (filterCompany) params.company = filterCompany;
        if (filterDepartment) params.department = filterDepartment;
        if (filterBoss) params.boss_id = filterBoss;
        if (filterEnter) params.enter_id = filterEnter;
        if (filterUserStatus) params.user_status_id = filterUserStatus;
        if (filterGroup) params.group_id = filterGroup;
        if (currentScheduleType) params.current_chart_type_id = currentScheduleType;
        if (currentSchedule) params.current_chart_id = currentSchedule;
        if (currentRuleType) params.current_rule_type_id = currentRuleType;
        if (currentRule) params.current_rule_id = currentRule;

        if (props.on_change_filter){
            props.on_change_filter(params);
        }
    }, [filterUserNameOrDepartment, filterCompany,
              filterDepartment, filterBoss,
              filterEnter, filterUserStatus, filterGroup,
              currentScheduleType, currentSchedule,
              currentRuleType, currentRule]);



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
                        options={props.boss_list}
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

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Вход</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Разрешен'}*/}
            {/*            value={filterEnter}*/}
            {/*            options={props.enters_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setFilterEnter(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Статус пользователя</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Работающие / уволенные'}*/}
            {/*            value={filterUserStatus}*/}
            {/*            options={props.user_statuses_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setFilterUserStatus(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Группа пользователя</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Любая'}*/}
            {/*            value={filterGroup}*/}
            {/*            options={props.groups_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setFilterGroup(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Текущий тип графика</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Все типы'}*/}
            {/*            value={currentScheduleType}*/}
            {/*            options={props.current_chart_types_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setCurrentScheduleType(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Текущий график</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Любые графики'}*/}
            {/*            value={currentSchedule}*/}
            {/*            options={props.current_charts_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setCurrentSchedule(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Текущие типы правил</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Все типы'}*/}
            {/*            value={currentRuleType}*/}
            {/*            options={props.current_rule_types_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setCurrentRuleType(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Текущие правила</span>*/}
            {/*    <Select style={{width: '100%'}}*/}
            {/*            placeholder={'Любые правила'}*/}
            {/*            value={currentRule}*/}
            {/*            options={props.current_rules_list}*/}
            {/*            onChange={(ev) => {*/}
            {/*                setCurrentRule(ev)*/}
            {/*            }}*/}
            {/*            allowClear*/}
            {/*    />*/}
            {/*</div>*/}

            <br/>
            <div className={'sk-usp-filter-col-item'}>
                <Button block onClick={setInitialState}>Очистить фильтры</Button>
            </div>
        </div>
    )
}

export default ClaimManagerSidebar;