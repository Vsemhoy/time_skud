import React, { useEffect, useState } from "react";
import './style/schedlistrow.css';
import { Button, Flex, Tag } from "antd";
import { BorderlessTableOutlined, BranchesOutlined, ClusterOutlined, CopyOutlined, EditOutlined, HistoryOutlined, InboxOutlined, StarOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Space, Typography } from 'antd';
import dayjs from "dayjs";
import { DS_SCHED_UNITS } from "../../../CONFIG/DEFAULTSTATE";
import { HOST_COMPONENT_ROOT, HTTP_HOST } from "../../../CONFIG/config";

import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import SchedEmptySVG from "../../../media/schedule-empty.svg";
import SchedIcons from "../../../assets/Comicon/SchedIcons";

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
            return ( <img src={HOST_COMPONENT_ROOT + SchedStdSVG} title='Пятидневка график'/>);
        break;
        case 2:
            return (<img src={HOST_COMPONENT_ROOT + SchedFlexSVG}  title='Гибкий график'/>);
        break;
        case 3:
            return (<img src={HOST_COMPONENT_ROOT + SchedFreeSVG}  title='Свободный график'/>);
        break;
        case 4:
            return (<img  src={HOST_COMPONENT_ROOT + SchedShiftSVG} title='Сменный график'/>);
        break;
        case 5:
            return (<img src={HOST_COMPONENT_ROOT + SchedSumSVG}    title='Суммированный график'/>);
        break;
        default:

        return (<img src={HOST_COMPONENT_ROOT + SchedEmptySVG}    title='Нет графика'/>);
    }
}


const SchedListRow = (props)=>{

    const [itemId, setItemId] = useState(props.data.id);

    const [itemData, setItemData] = useState(props.data);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [lunchStart,  setLunchStart] = useState('');
    const [lunchEnd,  setLunchEnd] = useState('');
    const [lunchTime,  setLunchTime] = useState('');


    const [unitType,  setUinitType] = useState('');
    const [unitTime,  setUnitTime] = useState('');

    const [itemType, setItemType] = useState(1);

    useEffect(()=>{
        setItemData(props.data)

        setStartTime(FDATE(itemData.start_time));
        setEndTime(FDATE(itemData.end_time));

        setLunchStart(FTIME(itemData.lunch_start));
        setLunchEnd(FTIME(itemData.lunch_end));
        setLunchTime(FTIME( itemData.lunch_time));

        setUnitTime(itemData.target_time);
        setUinitType(DS_SCHED_UNITS[itemData.target_unit + 1].label);

        setItemType(props.data.skud_schedule_type_id);


    },[props.data]);


    const openEditor = (event) => {
        if (props.onOpenEditorModal)
        {
            props.onOpenEditorModal(itemId, event);
        }
    }

    const openUserManager = (event) => {
        if (props.onOpenUserManager)
        {
            props.onOpenUserManager(itemId);
        }
    }

    const handleDoubleClick = (event) => {
        if (!event.ctrlKey){
            if (props.onOpenUserManager)
            {
                props.onOpenUserManager(itemId);
            }
        } else {
            if (props.onOpenEditorModal)
            {
                props.onOpenEditorModal(itemId);
            }
        }
    }

    // const onDoubleClick = (event) => {

    // }


    return (
        <div className={'sk-schedule-list-row'}
            onDoubleClick={handleDoubleClick}
        >
            <div className="sk-row sk-first-row">
                <div>
                    <div>
                        <SchedIcons type={itemData.skud_schedule_type_id} />
                    </div>
                    
                </div> 

                <div>
                    <div className={'sk-schedule-list-title'}>
                        {itemData.name}
                    </div>
                    <div>
                        {itemData.description}
                    </div>
                </div>


            </div>
            <div className="sk-row sk-second-row">
                <div className={"sk-flex"} style={{paddingLeft: 12}}>
                    
                    <span><Tag color={itemData.company_color} >{itemData.company_name.toUpperCase()}</Tag></span>
                    <span><Tag color="blue">{ dayjs.unix(itemData.start_time).format('YYYY') ?? ""}</Tag></span>
                </div>
                <div>
                    <Text type="secondary" className={'sk-flex'}>
                        <div title={'пользователей'}>{props.users_count ?? 0} <UserOutlined /></div>
                    </Text>
                </div>
                <div>
                <Flex gap="small" wrap>
                    {/*<Button color="default" variant="link"*/}
                    {/*    onClick={openUserManager}*/}
                    {/*title="Назначить пользователей">*/}
                    {/*    <UserSwitchOutlined />*/}
                    {/*</Button>*/}
                    {/* <Button color="default" variant="link"
                    title="Скопировать">
                        <CopyOutlined />
                    </Button> */}
                    <Button color="default" variant="link"
                        onClick={openEditor}
                    title="Редактировать">
                        <EditOutlined />
                    </Button>
                  </Flex>
                </div>
            </div>
        </div>
    )
};

export default SchedListRow;