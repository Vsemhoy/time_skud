import React from 'react';
import StateTrainIcon from "../../../assets/media/States/StateTrainIcon";
import StateLongVacationIcon from "../../../assets/media/States/StateLongVacationIcon";
import StateSickleaveIcon from "../../../assets/media/States/StateSickleaveIcon";
import StateContainerIcon from "../../../assets/media/States/StateContainerIcon";
import StateSuitcaseIcon from "../../../assets/media/States/StateSuitcaseAction";

const StateIconsController = (props) => {
    const stateIcons = {
        8:  <StateSuitcaseIcon height={'25px'} />,

        7:  <StateTrainIcon height={'25px'} />,
        10: <StateLongVacationIcon height={'25px'} />,
        6:  <StateSickleaveIcon height={'25px'} />,
        13: <StateContainerIcon height={'25px'} />,
    };
    const icon = stateIcons[props.IdState] || null;
    return (
        <div>
            {icon}
        </div>
    );
}

export default StateIconsController;
