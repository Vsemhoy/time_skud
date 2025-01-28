import React, { useEffect, useState } from "react";
import './style/schedlistrow.css';
import { Button, Flex } from "antd";
import { BorderlessTableOutlined, BranchesOutlined, ClusterOutlined, CopyOutlined, EditOutlined, HistoryOutlined, InboxOutlined, StarOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Space, Typography } from 'antd';
import dayjs from "dayjs";
import { DS_SCHED_UNITS } from "../../../CONFIG/DEFAULTSTATE";

const { Text, Link } = Typography;



const FDATE = (timestamp) => {
    return dayjs.unix(timestamp).format('DD-MM-YYYY')
};
const FTIME = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}


const Sched_type_icon = (type) => {
    
    switch (type.children) {
        case 1:
            return (<HistoryOutlined className="sk-schedule-list-type-icon" title='Пятидневка график'/>);
        break;
        case 2:
            return (<BranchesOutlined className="sk-schedule-list-type-icon" title='Гибкий график'/>);
        break;
        case 3:
            return (<StarOutlined className="sk-schedule-list-type-icon" title='Свободный график'/>);
        break;
        case 4:
            return (<BorderlessTableOutlined className="sk-schedule-list-type-icon" title='Сменный график'/>);
        break;
        case 5:
            return (<ClusterOutlined className="sk-schedule-list-type-icon" title='Суммированный график'/>);
        break;
        default:

            return "";
    }
}


const SchedListRow = (props)=>{
    const [itemData, setItemData] = useState(props.data);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [lunchStart,  setLunchStart] = useState('');
    const [lunchEnd,  setLunchEnd] = useState('');
    const [lunchTime,  setLunchTime] = useState('');


    const [unitType,  setUinitType] = useState('');
    const [unitTime,  setUnitTime] = useState('');

    

    useEffect(()=>{
        setItemData(props.data)

        setStartTime(FDATE(itemData.start_time));
        setEndTime(FDATE(itemData.end_time));

        setLunchStart(FTIME(itemData.lunch_start));
        setLunchEnd(FTIME(itemData.lunch_end));
        setLunchTime(FTIME(itemData.lunch_time));

        setUnitTime(FTIME(itemData.target_time));
        setUinitType(DS_SCHED_UNITS[itemData.target_unit + 1].label);

    },[props.data]);





    return (
        <div className={'sk-schedule-list-row'}>
            <div className="sk-row, sk-first-row">
                <div>
                    <div><Sched_type_icon>{itemData.id_skud_schedule_type}</Sched_type_icon></div>
                    <div>23</div>
                </div> 

                <div>
                    <div className={'sk-schedule-list-title'}>
                        {itemData.name}
                    </div>
                    <div>
                        {itemData.description}
                    </div>
                </div>

                <div>
                    <div className={'sk-sched-listitem-starttime'}>{startTime}</div>
                    <div className={'sk-sched-listitem-endtime'}>{endTime}</div>
                </div>

                <div>
                    <div>{unitTime}</div>
                </div>

                <div>
                    <div>{unitType}</div>
                </div>

                <div>
                    <div className={'sk-sched-listitem-starttime'}>с {lunchStart}</div>
                    <div className={'sk-sched-listitem-endtime'}>до {lunchEnd}</div>
                </div>


                <div>
                    <div>{lunchTime}</div>
                </div>
            </div>
            <div className="sk-row, sk-second-row">
                <div>
                    Актуален
                </div>
                <div>
                    <Text type="secondary" className={'sk-flex'}>
                        <div title={'пользователей'}>17 <UserOutlined /></div>
                        <div title={'групп'}>3 <InboxOutlined /></div>
                    </Text>
                </div>
                <div>
                <Flex gap="small" wrap>
                    <Button color="default" variant="link" title="Назначить пользователей">
                        <UserSwitchOutlined />
                    </Button>
                    <Button color="default" variant="link" title="Скопировать">
                        <CopyOutlined />
                    </Button>
                    <Button color="default" variant="link" title="Редактировать">
                        <EditOutlined />
                    </Button>
                  </Flex>
                </div>
            </div>
        </div>
    )
};

export default SchedListRow;