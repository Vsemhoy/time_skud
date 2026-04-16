import React from 'react';
import StateTrainIcon from "../../../assets/media/States/StateTrainIcon";
import StateLongVacationIcon from "../../../assets/media/States/StateLongVacationIcon";
import StateSickleaveIcon from "../../../assets/media/States/StateSickleaveIcon";
import StateContainerIcon from "../../../assets/media/States/StateContainerIcon";
import StateSuitcaseIcon from "../../../assets/media/States/StateSuitcaseAction";
import StateHomeIcon from "../../../assets/media/States/StateHomeIcon";
import StopwatchPlusIcon from "../../../assets/media/States/StopwatchPlusIcon";
import {AppstoreFilled} from "@ant-design/icons";

const StateIconsController = (props) => {
    const stateIcons = {
        0:  <AppstoreFilled        style={{fontSize: '22px'}}/>,
        8:  <StateSuitcaseIcon     height={props.height ? props.height : '25px'}/>,
        9:  <StateHomeIcon         height={props.height ? props.height : '25px'}/>,
        11: <StopwatchPlusIcon     height={props.height ? props.height : '25px'}/>,
        7:  <StateTrainIcon        height={props.height ? props.height : '25px'}/>,
        10: <StateLongVacationIcon height={props.height ? props.height : '25px'}/>,
        6:  <StateSickleaveIcon    height={props.height ? props.height : '25px'}/>,
        13: <StateContainerIcon    height={props.height ? props.height : '25px'}/>,
    };
    const icon = stateIcons[props.IdState] || null;
    return (
        <div>
            {icon}
        </div>
    );
}

export default StateIconsController;

