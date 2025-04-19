import React from "react";
import { Tabs } from 'antd';
import "./components/style/userstatisticspage.css";
import DemoChart from "./components/style/DemoChart";



const UserStatisticsPage = (props)=>{
    const { userdata } = props;

    const onChange = key => {
        console.log(key);
      };

    return (
        <div style={{padding: '6px'}} className={'sk-mw-1400'}>
            <br/>
            <span>Статистика</span>

            <div className={'sk-usp-layout-container'}>
                <div className="sk-usp-filter-col">
                    filters
                </div>

                <div className="sk-usp-content-col">
                    <DemoChart />
                </div>
            </div>
        </div>
    )
};

export default UserStatisticsPage;