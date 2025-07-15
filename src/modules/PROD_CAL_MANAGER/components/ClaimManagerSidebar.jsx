import { Button, DatePicker, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const ClaimManagerSidebar = (props) => {

    const initialstate = {
        filterName: '',
        filterCompany: null,
        currentRule: null,
    }

    const [companies, setCompanies] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterCompany, setFilterCompany] = useState(null);
    const [currentRule, setCurrentRule] = useState(null);

    const setInitialState = () => {
        setFilterName(initialstate.filterName);
        setFilterCompany(initialstate.filterCompany);
        setCurrentRule(initialstate.currentRule);
    };

    useEffect(() => {
      const params = {};
        if (filterName?.trim()) params.username = filterName.trim();
        if (filterCompany) params.company = filterCompany;
        if (currentRule) params.current_rule_id = currentRule;

        if (props.on_change_filter){
            props.on_change_filter(params);
        }

    }, [filterName, filterCompany, currentRule]);

    useEffect(() => {
        setCompanies(props.company_list);
        console.log(props.company_list)
    }, [props.company_list]);

    return (
        <div style={{maxHeight: '100vh', overflow: 'auto'}}>

            {/*<div className={'sk-usp-filter-col-item'}>*/}
            {/*    <span className={'sk-usp-filter-col-label'}>Поиск по названию</span>*/}
            {/*    <Input style={{width: '100%'}}*/}
            {/*           placeholder={'Поиск по названию'}*/}
            {/*           allowClear={true}*/}
            {/*           value={filterName}*/}
            {/*           onChange={(ev) => {*/}
            {/*               setFilterName(ev.target.value)*/}
            {/*           }}*/}
            {/*    />*/}
            {/*</div>*/}

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
                <span className={'sk-usp-filter-col-label'}>Типы правил</span>
                <Select style={{width: '100%'}}
                        placeholder={'Все типы'}
                        value={currentRule}
                        options={props.years_list}
                        onChange={(ev) => {
                            setCurrentRule(ev)
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