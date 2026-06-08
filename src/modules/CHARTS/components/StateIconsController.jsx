import React from 'react';
import StateAirplaneIcon from "../../../assets/media/States/StateAirplaneIcon";
import StateLongVacationIcon from "../../../assets/media/States/StateLongVacationIcon";
import StateSickleaveIcon from "../../../assets/media/States/StateSickleaveIcon";
import StateContainerIcon from "../../../assets/media/States/StateContainerIcon";
import StateSuitcaseIcon from "../../../assets/media/States/StateSuitcaseAction";
import StateHomeIcon from "../../../assets/media/States/StateHomeIcon";
import StopwatchPlusIcon from "../../../assets/media/States/StopwatchPlusIcon";
import StateRockingChairIcon from "../../../assets/media/States/StateRockingChairIcon";
import {AppstoreFilled} from "@ant-design/icons";

const StateIconsController = (props) => {
    const iconSize = props.height ? props.height : '25px';
    const stateIcons = {
        0:  <AppstoreFilled        style={{fontSize: '22px'}}/>,
        8:  <StateSuitcaseIcon     height={iconSize}/>,
        9:  <StateHomeIcon         height={iconSize}/>,
        11: <StopwatchPlusIcon     height={iconSize}/>,
        7:  <StateAirplaneIcon     height={iconSize}/>,
        10: <StateLongVacationIcon height={iconSize}/>,
        6:  <StateSickleaveIcon    height={iconSize}/>,
        13: <StateContainerIcon    height={iconSize}/>,
        24: <StateRockingChairIcon height={iconSize}/>,
    };
    const icon = stateIcons[props.IdState] || null;
    return (
        <div>
            {icon}
        </div>
    );
}

export default StateIconsController;

