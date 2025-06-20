import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import {Spin} from "antd";

function GroupsWorkspace(props) {
    const { userIdState, userFIO } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchGroupsInfo();
    }, []);

    const fetchGroupsInfo = () => {
        setIsLoading(true);

        setTimeout(() => setIsLoading(false), 500);
    };

    return (
        <Spin spinning={isLoading}>
            <div></div>
        </Spin>
    );
}

export default GroupsWorkspace;
