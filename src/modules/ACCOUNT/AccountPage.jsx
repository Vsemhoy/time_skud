import React, { useEffect, useState } from "react";
import { DatePicker, Radio, Space, Tabs } from 'antd';
import { Button, Card, Checkbox, Empty, Tag, Transfer, Typography, TabsProps } from "antd";
import dayjs from "dayjs";
 import "./components/style/accountpage.css";
import AccPageSideBar from "./components/accpagesidebar";


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
            <div className={"sk-ap-tab-title"}>
                Main page content
            </div>
            <div>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </div>
        </div>
    );
};




const ApDayTab = (props) => {
    const [userData, setUserData] = useState(props.user_data);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const items = [
        {
          key: '1',
          label: 'Общая статистика за год',
          children: <MainContent/>,
        },
        {
          key: '2',
          label: 'Заявки и заявления',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '3',
          label: 'События за год',
          children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Задачи',
            children: 'Content of Tab Pane 3',
          },
      ];

    useEffect(()=>{ 
        setSelectedDate(props.date);
    },[props.date]);

    return (
        <div className={'sk-ap-tab-container'}>
            <Tabs 
                tabPosition={"left"}
                defaultActiveKey="1" 
                items={items}  
                />
        </div>
    )
};


const ApMonthTab = (props) => {
    const [userData, setUserData] = useState(props.user_data);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const items = [
        {
          key: '11',
          label: 'Общая статистика за месяц',
          children: <MainContent/>,
        },
        {
          key: '12',
          label: 'Заявки и заявления',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '13',
          label: 'События за месяц',
          children: 'Content of Tab Pane 3',
        },
        {
            key: '14',
            label: 'Задачи',
            children: 'Content of Tab Pane 3',
          },
      ];

    useEffect(()=>{ 
        setSelectedDate(props.date);
    },[props.date]);

    return (
        <div className={'sk-ap-tab-container'}>
            <Tabs 
                tabPosition={"left"}
                defaultActiveKey="1" 
                items={items}  
                />
        </div>
    )
};


const ApYeartab = (props) => {
    const [userData, setUserData] = useState(props.user_data);
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const items = [
        {
          key: '111',
          label: 'События за день',
          children: <MainContent/>,
        },
        {
          key: '112',
          label: 'Заявки и заявления',
          children: 'Content of Tab Pane 2',
        },
        {
          key: '113',
          label: 'События за год',
          children: 'Content of Tab Pane 3',
        },
        {
            key: '1114',
            label: 'Задачи',
            children: 'Content of Tab Pane 3',
          },
      ];

    useEffect(()=>{ 
        setSelectedDate(props.date);
    },[props.date]);

    return (
        <div className={'sk-ap-tab-container'}>
            <Tabs 
                tabPosition={"left"}
                defaultActiveKey="1" 
                items={items}  
                />
        </div>
    )
};





const AccountPage = (props) => {
    const [userData, setUserData] = useState(props.userdata);
    const [selectedFullDate, setSelectedFullDate] = useState(dayjs());
    const [selectedUnit, setSelectedUnit] = useState("d");



    const changeFullDate = (date) => {
        setSelectedFullDate(date);
    }
    const changeUnit = (unit) => {
        setSelectedUnit(unit.target.value);
    }

    const changeTabAction = (ev)=>{
        console.log(ev);
    };


    
    return (
        <div className={'sk-mw-1200'}>
            <div>
            <h1>Главная страница юзера</h1>
            </div>

            <div className={"sk-2col-body"}>
                <div>
                    <div className={"sk-homepage-control"}>
                   
                        <Space direction="horizontal">
                            <Radio.Group defaultValue="c" buttonStyle="solid">
                            <Radio.Button onChange={changeUnit} value="d">День</Radio.Button>
                            {/* <Radio.Button onChange={changeUnit} value="w">Неделя</Radio.Button> */}
                            <Radio.Button onChange={changeUnit} value="m">Месяц</Radio.Button>
                            <Radio.Button onChange={changeUnit} value="y">Год</Radio.Button>
                            </Radio.Group>
                            { selectedUnit === "d" ? (
                                <DatePicker
                                    sta
                                    placeholder="Выберите дату"
                                    value={selectedFullDate}
                                    onChange={changeFullDate}
                                />

                            ): ""}
                            {/* <DatePicker onChange={onChangUnit} picker="week" /> */}
                            {/* { selectedUnit === "w" ? (
                                <DatePicker 
                                    picker="week" placeholder="Неделя"
                                    value={selectedFullDate}
                                    onChange={changeFullDate}
                                />

                            ): ""} */}
                            { selectedUnit === "m" ? (
                                <DatePicker 
                                    picker="month" placeholder="Месяц"
                                    value={selectedFullDate}
                                    onChange={changeFullDate}
                                />

                            ): ""}
                            {/* <DatePicker onChange={onChangUnit} picker="quarter" /> */}
                            { selectedUnit === "y" ? (
                                <DatePicker 
                                    picker="year" placeholder="Год"
                                    value={selectedFullDate}
                                    onChange={changeFullDate}
                                />

                            ): ""}
                        </Space>
                        <br/>
                    </div>

                    { selectedUnit === "d" ? (
                        <ApDayTab 
                        user_data={userData} 
                        date={selectedFullDate}
                        /> 
                        ): ""}
                        { selectedUnit === "m" ? (
                            <ApMonthTab
                            user_data={userData} 
                            date={selectedFullDate}
                            /> 
                        ): ""}
                        { selectedUnit === "y" ? (
                            <ApYeartab
                            user_data={userData} 
                            date={selectedFullDate}
                            /> 
                        ): ""}
                </div>


                <div>
                    <AccPageSideBar />
                    
                </div>
            </div>

        </div>
    )
};

export default AccountPage;