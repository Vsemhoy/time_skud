import React, { useEffect, useState } from "react";
import './style/schedentitycard.css';
import { Checkbox } from "antd";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

const SchedEntityCard = (props)=>{



    return (
        <div className="sk-sched-card-item">
            <div className={'sk-sched-card-body'}>
                <div>
                    <UserOutlined></UserOutlined>
                    {/* <AppstoreOutlined></AppstoreOutlined> */}
                </div>
                <div>
                    CARD NAME
                </div>
            </div>
            <div>
                <Checkbox checked={true} />
            </div>
        </div>
    )
};

export default SchedEntityCard;