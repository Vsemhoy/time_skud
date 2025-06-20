import React, {useEffect, useState} from 'react';
import styles from "../style/user_page.module.css";
import {useOutletContext} from "react-router-dom";
import {Spin} from "antd";

function SchedulesWorkspace(props) {
    const { userIdState, userFIO } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchSchedulesInfo();
    }, []);

    const fetchSchedulesInfo = () => {
        setIsLoading(true);
        
        setTimeout(() => setIsLoading(false), 500);
    };

    return (
        <Spin spinning={isLoading}>
            <div className={styles.sk_schedule_workspace}>
                <div className={styles.sk_schedules_table}></div>
                <div className={styles.sk_schedule_linker}></div>
            </div>
        </Spin>
    );
}

export default SchedulesWorkspace;
