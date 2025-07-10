import React, { useEffect, useState } from "react";

import './style/prodcalitemcard.css';
import { Badge, Button, Flex, Select, Tag, Typography } from 'antd';


import { Card } from 'antd';

import { CheckCircleFilled, ClockCircleOutlined, CloseCircleOutlined, EditOutlined, ExclamationCircleOutlined, MinusCircleFilled, MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import ChineseZodiac from "../../../assets/Comicon/ChineseZodiac";


 
  const { Title } = Typography;
  const options = [];
  for (let i = 0; i < 100000; i++) {
    const value = `${i.toString(36)}${i}`;
    options.push({
      label: value,
      value,
      disabled: i === 10,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };




const ProdCalItemCard = ({onOpenModal, data, allow_delete}) => {

const [ userList, setUserList] = useState(options);
const [ calData, setCalData] = useState(data);

    const openModalClick = (event) => {
        if (event.ctrlKey){
            console.log(event);
            if (allow_delete){
                allow_delete(true);
            }
        }
        if (onOpenModal){
            console.log(calData);
            onOpenModal(calData.id);
        }
    }

    useEffect(()=>{
        setCalData(data);
    }, [data]);

    return (
        <div className={`sk-cal-card ${calData.archieved === 1 ? "skc-archieved ": ""}`}> 
          
            <Card className="">
                <div className={'sk-cal-first-row'}>
                    <div>
                        <ChineseZodiac year={calData.year}></ChineseZodiac>
                    </div>
                    <div className="ant-card-head-title sk-cal-item-head">
                        <strong>{calData.year}</strong>
                    </div>

                    <div className={'sk-cal-stats'}><span>{calData.schedule.total}</span> всего дней</div>
                    <div className={'sk-cal-stats'}><span>{calData.schedule.wtotal}</span> рабочих</div>
                    <div className={'sk-cal-stats'}><span>{calData.schedule.htotal}</span> выходных</div>
                </div>
                <div className={"sk-row sk-cal-second-row"}>
                    <div>
                    <Flex gap={'4px 0'} wrap>
                        <span><Tag color={calData.company_color} >{calData.company_name.toUpperCase()}</Tag></span>
                        { calData.count_links ? (
                            <Tag color="#108ee9">Графики: {calData.count_links}</Tag>
                        ) : "" }
                        
                    </Flex>
                    </div>
                    <div className={'sk-cal-butts'}>

                    {/* <Flex gap={'4px 0'} wrap>
                        <Tag color="blue">Глинтерник М.</Tag>
                    </Flex> */}
                    {/* <span className={'sk-dead-text'}>{calData.schedule.year} год</span> */}
 
                    <Flex gap={'4px 0'} wrap style={{}}>
                        { calData.archieved == 0 ? (
                            <Tag icon={<SyncOutlined spin />} color="#87d068">
                            активен
                        </Tag>
                        ) : "" }
                        { calData.archieved == -1 ? (
                            <Tag icon={<ClockCircleOutlined />} color="#f78533">
                            ожидает
                        </Tag>
                        ) : "" }
                        { calData.archieved == 1 ? (
                            <Tag icon={<MinusCircleOutlined />} color="default">
                            архивирован
                        </Tag>
                        ) : "" }   
                    </Flex>
                    </div>
                    <Button color="default" variant="text"
                        onClick={openModalClick}
                     icon={(<EditOutlined />)}></Button>

                </div>

            </Card>
         
        </div>
    )
};

export default ProdCalItemCard;