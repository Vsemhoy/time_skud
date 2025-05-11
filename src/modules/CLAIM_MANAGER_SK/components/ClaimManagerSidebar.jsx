import { Button, DatePicker, Input, Select, Switch } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const ClaimManagerSidebar = (props) => {

    const claimStatuses = [
        {
            key: 'cs145324',
            label: 'Все',
            value: null
        },
        {
            key: 'cs2453524',
            label: 'Новые',
            value: 1
        },
        {
            key: 'cs34537424',
            label: 'Принятые',
            value: 2
        },
        {
            key: 'cs45327424',
            label: 'Отклоненные',
            value: 3
        },
    ];



    const initialstate = {
        filterUserName: '',
        filterReason: '',
        filterCompany: null,
        filterDepartment: null,
        filterBoss: null,
        filterEventInterval: [null, null],
        filterStatus: null,
        filterShowClosed: false,
        filterApprover: '',
        filterDurationStart: 0,
        filterDurationEnd: 0
    }
    
    const [filterUserName, setFilterUserName] = useState('');
    const [filterReason, setFilterReason] = useState('');
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterBoss, setFilterBoss] = useState(null);
    const [filterEventInterval, setFilterEventInterval] = useState([null, null]);
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterShowClosed, setFilterShowClosed] = useState(false);
    const [filterApprover, setFilterApprover] = useState('');
    const [filterDurationStart, setFilterDurationStart] = useState(0);
    const [filterDurationEnd, setFilterDurationEnd] = useState(0);


    const setInitialState = () => {
        setFilterUserName(initialstate.filterUserName);
        setFilterReason(initialstate.filterReason);
        setFilterCompany(initialstate.filterCompany);
        setFilterDepartment(initialstate.filterDepartment);
        setFilterBoss(initialstate.filterBoss);
        setFilterEventInterval(initialstate.filterEventInterval);
        setFilterStatus(initialstate.filterStatus);
        setFilterShowClosed(initialstate.filterShowClosed);
        setFilterApprover(initialstate.filterApprover);
        setFilterDurationStart(initialstate.filterDurationStart);
        setFilterDurationEnd(initialstate.filterDurationEnd);
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
            setCompanyList(
                props.company_list.filter(com => com.id != 1)
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
            ));
        }

      },[props.company_list]);




    useEffect(() => {
      const params = {};
        if (filterUserName?.trim()) params.userName = filterUserName.trim();
        if (filterReason?.trim()) params.reason = filterReason.trim();
        if (filterCompany) params.id_company = filterCompany;
        if (filterDepartment) params.departmentId = filterDepartment;
        if (filterBoss) params.boss = filterBoss;
        if (filterStatus !== null) params.status = filterStatus;
        if (filterApprover) params.approver = filterApprover;
        if (filterShowClosed) params.showClosed = true;
        
        // Обработка интервала дат
        if (filterEventInterval[0]?.isValid() && filterEventInterval[1]?.isValid()) {
            params.startDate = filterEventInterval[0].format('YYYY-MM-DD');
            params.endDate = filterEventInterval[1].format('YYYY-MM-DD');
        }
        
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
    }, [
        filterUserName, filterReason, filterCompany, 
        filterDepartment, filterBoss, filterEventInterval,
        filterStatus, filterShowClosed, filterApprover,
        filterDurationStart, filterDurationEnd]);



    return (
        <div>
            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Пользователь</span>
                <Input
                    style={{ width: '100%' }}
                    placeholder={'Имя пользователя'}
                    allowClear={true}
                    value={filterUserName}
                    onChange={(ev)=>{setFilterUserName(ev.target.value)}}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Причина</span>
                <Input
                    style={{ width: '100%' }}
                    placeholder={'Поиск в тексте причины события'}
                    allowClear={true}
                    value={filterReason}
                    onChange={(ev)=>{setFilterReason(ev.target.value)}}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Компания</span>
                <Select
                    style={{ width: '100%' }}
                    placeholder={'Компания, в которой служит сотрудник'}
                    value={filterCompany}
                    options={companyList}
                    onChange={(ev)=>{setFilterCompany(ev)}}
                    allowClear
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Отдел</span>
                <Select
                    style={{ width: '100%' }}
                    placeholder={'Отдел, где работает сотрудник'}
                    value={filterDepartment}
                    options={props.depart_list.map((dep) => {return ({
                        key: `depid_${dep.id}`,
                        value: dep.id,
                        label: dep.name
                    })})}
                    onChange={(ev)=>{setFilterDepartment(ev)}}
                    allowClear
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Руководитель</span>
                <Select
                    style={{ width: '100%' }}
                    placeholder={'Поиск по имени руководителя'}
                    value={filterBoss}
                    options={bossList}
                    onChange={(ev)=>{setFilterBoss(ev)}}
                    allowClear
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Дата начала и конца события</span>
                <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    placeholder={'Включающий диапазон дат, в которых искать событие'}
                    value={filterEventInterval}
                    onChange={setFilterEventInterval}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Статус заявки</span>
                <Select
                    options={claimStatuses}
                    style={{ width: '100%' }}
                    placeholder={'Принят, отклонён'}
                    value={filterStatus}
                    onChange={(ev)=>{setFilterStatus(ev)}}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Закрытые архивные заявки</span>
                <Switch
                    checked={filterShowClosed}
                    onChange={(ev)=>{setFilterShowClosed(ev)}}
                ></Switch>
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Аппрувер</span>
                <Select
                    style={{ width: '100%' }}
                    placeholder={'Человек, принявший или отклонивший заявку'}
                    value={filterApprover}
                    />
            </div>

            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Продолжительность в днях от __ до __</span>
                <div className="sk-flex-space">
                    <Input
                        type="number"
                        min={0}
                        value={filterDurationStart}
                        onChange={(ev)=>{setFilterDurationStart(ev.target.value)}}
                    />
                    <Input
                        type="number"
                        min={0}
                        value={filterDurationEnd}
                        onChange={(ev)=>{setFilterDurationEnd(ev.target.value)}}
                    />
                </div>

            </div>

            <br />
            <div className={'sk-usp-filter-col-item'} >
            <Button
            danger
            block
            onClick={setInitialState}
            >
                Очистить фильтры
            </Button>
            </div>
        </div>
    )
}

export default ClaimManagerSidebar;