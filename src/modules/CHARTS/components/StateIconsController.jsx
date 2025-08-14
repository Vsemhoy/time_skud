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
        0:  <AppstoreFilled        style={{fontSize: '22px'}}                               title={'Все заявки'}/>,
        8:  <StateSuitcaseIcon     height={props.height ? props.height : '25px'}            title={'Местная командировка'}/>,
        9:  <StateHomeIcon         height={props.height ? props.height : '25px'}            title={'Неоплачиваемый отпуск'}/>,
        11: <StopwatchPlusIcon     height={props.height ? props.height : '25px'}            title={'Сверхурочные'}/>,
        7:  <StateTrainIcon        height={props.height ? props.height : '25px'}            title={'Командировка'}/>,
        10: <StateLongVacationIcon height={props.height ? props.height : '25px'}            title={'Отпуск'}/>,
        6:  <StateSickleaveIcon    height={props.height ? props.height : '25px'}            title={'Больничный'}/>,
        13: <StateContainerIcon    height={props.height ? props.height : '25px'}            title={'Контейнеры'}/>,
    };
    const icon = stateIcons[props.IdState] || null;
    return (
        <div>
            {icon}
        </div>
    );
}

export default StateIconsController;
