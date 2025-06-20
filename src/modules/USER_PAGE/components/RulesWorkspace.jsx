import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import {Spin} from "antd";

function RulesWorkspace(props) {
    const { userIdState, userFIO } = useOutletContext();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchRulesInfo();
    }, []);

    const fetchRulesInfo = () => {
        setIsLoading(true);

        setTimeout(() => setIsLoading(false), 500);
    };

    return (
        <Spin spinning={isLoading}>
            <div></div>
        </Spin>
    );
}

export default RulesWorkspace;
