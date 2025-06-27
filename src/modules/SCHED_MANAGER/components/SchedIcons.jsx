import React from 'react';

import SchedStdSVG from "../../../media/schedule-std.svg";
import SchedFlexSVG from "../../../media/schedule-flex.svg";
import SchedFreeSVG from "../../../media/schedule-free.svg";
import SchedShiftSVG from "../../../media/schedule-shift.svg";
import SchedSumSVG from "../../../media/schedule-sum.svg";
import SchedEmptySVG from "../../../media/schedule-empty.svg";

import { HOST_COMPONENT_ROOT } from '../../../CONFIG/config';

const SchedIcons = ({ type }) => {
    const getImage = (type) => {
        switch (type) {
            case 1:
                return ( <img src={HOST_COMPONENT_ROOT + SchedStdSVG} title='Пятидневка график'/>);
            case 2:
                return (<img src={HOST_COMPONENT_ROOT + SchedFlexSVG}  title='Гибкий график'/>);
            case 3:
                return (<img src={HOST_COMPONENT_ROOT + SchedFreeSVG}  title='Свободный график'/>);
            case 4:
                return (<img  src={HOST_COMPONENT_ROOT + SchedShiftSVG} title='Сменный график'/>);
            case 5:
                return (<img src={HOST_COMPONENT_ROOT + SchedSumSVG}    title='Суммированный график'/>);
            default:
                return (<img src={HOST_COMPONENT_ROOT + SchedEmptySVG}    title='Нет графика'/>);
        }
    };

    const zodiacImage = getImage(type);

    return (
        <>
            {zodiacImage}
        </>
    );
}

export default SchedIcons;