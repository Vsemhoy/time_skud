import React, { useState } from "react";

import dayjs from "dayjs";
import './calcard.css';
import { Badge, Button, Select, Typography } from 'antd';


import { Card } from 'antd';
import { EditOutlined } from "@ant-design/icons";


 
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




const CalCard = (props) => {

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
                    <div class="ant-card-head-title">Название календаря</div>
                    <Button 
                        onClick={openModalClick}
                     icon={(<EditOutlined />)}></Button>
                    <div className="sk-cal-filler"></div>
                    </div>
                </div>
                <div className="sk-cal-card-grid">




                <Card.Grid hoverable={false} className="padding-remove">

                    <div className="sk-cal-title-1">2025</div>
                    <div className="sk-cal-title-2">Март-Июнь</div>
                    <div className={'sk-cal-stats'}>
                        <div><span>200</span> рабочих дней</div>
                        <div><span>1200</span> часов</div>
                        <div><span>{options.length}</span> человек</div>

                    </div>
                </Card.Grid>
                <Card.Grid hoverable={false} >
                    <div className={'sk-cal-description'}>
                    Auto collapse to tag with responsive case. Not recommend use in large form case since responsive calculation has a perf cost.
                    </div>
                    <br />
                    <div>
                        <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        defaultValue={['a10', 'c12']}
                        onChange={handleChange}
                        options={userList}
                        
                        />
                    </div>
                </Card.Grid>
                </div>

            </Card>
            </Badge.Ribbon>
        </div>
    )
};

export default CalCard;