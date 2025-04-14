import React, { useState } from "react";
import { DatePicker, Radio, Space, Tabs } from 'antd';
import { Button, Card, Checkbox, Empty, Tag, Transfer, Typography, TabsProps } from "antd";
import dayjs from "dayjs";
 


const SideBar = (props) => {

    return (
        <div>
            Sidebar content
        </div>
    );
};



const MainContent = (props) => {

    return (
        <div>
            Main page content
        </div>
    );
};

const items = [
    {
      key: '1',
      label: 'События СКУД',
      children: <MainContent/>,
    },
    {
      key: '2',
      label: 'Заявки и заявления',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Заявки',
      children: 'Content of Tab Pane 3',
    },
    {
        key: '4',
        label: 'Задачи',
        children: 'Content of Tab Pane 3',
      },
  ];

  const onChangUnit = (unit) => {

  }

const HomePage = () => {
    const [selectedFullDate, setSelectedFullDate] = useState(dayjs());




    const changeFullDate = (date) => {
        setSelectedFullDate(date);
    }

    const changeTabAction = (ev)=>{
        console.log(ev);
    };


    
    return (
        <div className={'sk-mw-1400'} style={{padding: '12px'}}>
            <div>
            <h1>Главная страница юзера</h1>
            </div>

            <div className={"sk-2col-body"}>
                <div>
                    <div className={"sk-homepage-control"}>
                   
                        <Space direction="horizontal">
                            <Radio.Group defaultValue="c" buttonStyle="solid">
                            <Radio.Button value="a">День</Radio.Button>
                            <Radio.Button value="b">
                                Месяц
                            </Radio.Button>
                            <Radio.Button value="c">Год</Radio.Button>
                            </Radio.Group>
                            <DatePicker
                                onChange={onChangUnit}
                                placeholder="Выберите дату"
                                value={selectedFullDate}
                                onChange={changeFullDate}
                            />
                            {/* <DatePicker onChange={onChangUnit} picker="week" /> */}
                            <DatePicker onChange={onChangUnit} picker="month" placeholder="Месяц"
                                value={selectedFullDate}
                                onChange={changeFullDate}
                            />
                            {/* <DatePicker onChange={onChangUnit} picker="quarter" /> */}
                            <DatePicker onChange={onChangUnit} picker="year" placeholder="Год"
                                value={selectedFullDate}
                                onChange={changeFullDate}
                            />
                        </Space>
                        <br/>
                    </div>
                    <Tabs 
                    tabPosition={"left"}
                    defaultActiveKey="1" 
                    items={items} onChange={changeTabAction} 
                    />
                </div>


                <div>
                    Sidebar content
                </div>
            </div>

        </div>
    )
};

export default HomePage;