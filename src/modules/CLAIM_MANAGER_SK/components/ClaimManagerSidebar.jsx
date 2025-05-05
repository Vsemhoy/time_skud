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
            value: null
        },
        {
            key: 'cs34537424',
            label: 'Принятые',
            value: null
        },
        {
            key: 'cs45327424',
            label: 'Отклоненные',
            value: null
        },
    ]

    const initialstate = {
        filterUserName: '',
        filterReason: '',
        filterCompany: null,
        filterDepartment: null,
        filterBoss: '',
        filterEventInterval: [dayjs(), dayjs()],
        filterStatus: null,
        filterShowClosed: false,
        filterApprover: '',
        filterDurationStart: 1,
        filterDurationEnd: 1
    }
    
    const [filterUserName, setFilterUserName] = useState('');
    const [filterReason, setFilterReason] = useState('');
    const [filterCompany, setFilterCompany] = useState(null);
    const [filterDepartment, setFilterDepartment] = useState(null);
    const [filterBoss, setFilterBoss] = useState('');
    const [filterEventInterval, setFilterEventInterval] = useState([dayjs(), dayjs()]);
    const [filterStatus, setFilterStatus] = useState(null);
    const [filterShowClosed, setFilterShowClosed] = useState(false);
    const [filterApprover, setFilterApprover] = useState('');
    const [filterDurationStart, setFilterDurationStart] = useState(1);
    const [filterDurationEnd, setFilterDurationEnd] = useState(1);


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
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Компания</span>
                <Select
                    style={{ width: '100%' }}
                    placeholder={'Компания, в которой служит сотрудник'}
                    value={filterCompany}
                    options={companyList}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Отдел</span>
                <Select
                    style={{ width: '100%' }}
                    placeholder={'Отдел, где работает сотрудник'}
                    value={filterDepartment}
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
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Дата начала и конца события</span>
                <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    placeholder={'Включающий диапазон дат, в которых искать событие'}
                    value={filterEventInterval}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Статус заявки</span>
                <Select
                    options={claimStatuses}
                    style={{ width: '100%' }}
                    placeholder={'Принят, отклонён'}
                    value={filterStatus}
                    />
            </div>


            <div className={'sk-usp-filter-col-item'} >
                <span className={'sk-usp-filter-col-label'}>Закрытые архивные заявки</span>
                <Switch
                    checked={filterShowClosed}
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
                        min={1}
                        value={filterDurationStart}
                    />
                    <Input
                        type="number"
                        min={1}
                        filter={filterDurationEnd}
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