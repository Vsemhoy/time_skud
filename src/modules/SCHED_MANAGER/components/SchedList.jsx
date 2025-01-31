import React, { useEffect, useState } from "react";
import './style/schedlistrow.css';
import { Button, Flex } from "antd";
import { CopyOutlined, EditOutlined, InboxOutlined, UserOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Space, Typography } from 'antd';
import SchedListRow from "./SchedListRow";

const { Text, Link } = Typography;



const SchedList = (props)=>{
    const {userData, companies, dataSchedules} = props;
    const [scheduleList, setScheduleList] = useState(dataSchedules);

    useEffect(()=>{
        setScheduleList(dataSchedules);
        console.log(dataSchedules);
    }, [dataSchedules])


    // const openUserModal = (id)=>{
    //     setUserManagerModalOpen(true);
    // }
    // const openEditorModal = (id)=>{
    //     setEditorModalOpen(true);
    // }

    return (
        <div className={'sk-schedule-list'}>
                    <div className={'sk-schedule-list-head'}>
                        
                        <div className="sk-row, sk-first-row sk-flex-child-bottom">
                        <div>
                            N
                        </div> 
    
                        <div>
                            Название
                        </div>

                        <div>
                            График
                        </div>
    
                        <div>
                            Время действия
                        </div>
    
                        <div>
                            Целев. время
                        </div>

                        <div>
                            Единица расчета
                        </div>
    
                        <div>
                            Время обеда
                        </div>
    
    
                        <div>Продолжит. обеда</div>
                    </div>
                <div className="sk-row, sk-second-row">
                    <div>
                        
                    </div>
                </div>
    
            </div>
            <div className={'sk-schedule-list'}>
            { scheduleList.map((item, index) => (
                <SchedListRow key={index} data={item}
                    onOpenEditorModal={props.onOpenEditorModal}
                    onOpenUserManager={props.onOpenUserManager}
                 />
            )) }
            </div>
        </div>
    )
};

export default SchedList;