import React, { useState } from "react";

import dayjs from "dayjs";
import './style/prodcalitemcard.css';
import { Badge, Button, Flex, Select, Tag, Typography } from 'antd';


import { Card } from 'antd';

import { CheckCircleFilled, ClockCircleOutlined, CloseCircleOutlined, EditOutlined, ExclamationCircleOutlined, MinusCircleFilled, MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";


 
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




const ProdCalItemCard = (props) => {

const [ userList, setUserList] = useState(options);

    const openModalClick = () => {
        if (props.onOpenModal){
            props.onOpenModal('hello');
        }
    }

    return (
        <div className={'sk-cal-card'}> 
            <Badge.Ribbon text="Arstel"  style={{background:"#ff4700"}}>
            <Card className="">
            <div class="ant-card-head">
                <div class="ant-card-head-wrapper">
                    <div class="ant-card-head-title sk-cal-item-head"><strong>2025</strong></div>
                    <Button 
                        onClick={openModalClick}
                     icon={(<EditOutlined />)}></Button>
                    <div className="sk-cal-filler"></div>
                    </div>
                </div>
                <div className="sk-cal-card-grid">




                <Card.Grid hoverable={false} className="padding-remove">
                    <div className={'sk-cal-stats'}>
                        <div><span>212</span> рабочих дней</div>
                        <div><span>212</span> сокращенных дней</div>
                        <div><span>131</span> выходных</div>
                        {/* <div><span>365</span> всего</div> */}
                    </div>
                </Card.Grid>
                <Card.Grid hoverable={false} >
                    {/* <div className={'sk-cal-description'}>
                    Auto collapse to tag with responsive case. Not recommend use in large form case since responsive calculation has a perf cost.
                    </div> */}
                    <br />
                    <div className={'sk-cal-butts'}>
                    <Flex gap={'4px 0'} wrap>
                        <Tag color="#108ee9">12 графиков</Tag>
                    </Flex>
                    {/* <Flex gap={'4px 0'} wrap>
                        <Tag color="blue">Глинтерник М.</Tag>
                    </Flex> */}
                    <span className={'sk-dead-text'}>2025 год</span>
 
                    <Flex gap={'4px 0'} wrap style={{}}>

                        <Tag icon={<SyncOutlined spin />} color="#87d068">
                            активен
                        </Tag>

                        <Tag icon={<ClockCircleOutlined />} color="#f78533">
                            ожидает
                        </Tag>

                        <Tag icon={<MinusCircleOutlined />} color="default">
                            архивирован
                        </Tag>
                    </Flex>
                    </div>
                </Card.Grid>
                </div>

            </Card>
            </Badge.Ribbon>
        </div>
    )
};

export default ProdCalItemCard;