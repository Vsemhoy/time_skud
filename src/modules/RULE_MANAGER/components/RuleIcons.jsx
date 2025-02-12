import React from 'react';


import Pig from "../../../media/ruletypes/piggy-bank-coin-svgrepo-com.svg";
import Recycle from "../../../media/ruletypes/recycle-svgrepo-com.svg";
import Magic from "../../../media/ruletypes/magic-svgrepo-com.svg";
import Bed from "../../../media/ruletypes/bed-svgrepo-com.svg";
import Eraser from "../../../media/ruletypes/eraser-svgrepo-com.svg";


import Owl from "../../../media/zodiac/owl-bird-shape-svgrepo-com.svg";




import { HOST_COMPONENT_ROOT } from '../../../CONFIG/config';


const RuleIcons = ({ type }) => {
    const getImage = (type) => {
        switch (type) {
            case 1:
                return ( <img src={HOST_COMPONENT_ROOT + Bed} title='Опоздание'/>);
            case 2:
                return ( <img src={HOST_COMPONENT_ROOT + Recycle} title='Переработка'/>);
            case 3:
                return ( <img src={HOST_COMPONENT_ROOT + Magic} title='Перекуры'/>);
            case 4:
                return ( <img src={HOST_COMPONENT_ROOT + Eraser} title='Глобальная отработка'/>);
            case 5:
                return ( <img src={HOST_COMPONENT_ROOT + Pig} title='Накопление времени'/>);

            default:
                return ( <img src={HOST_COMPONENT_ROOT + Owl} title='Не тот год'/>);
        }
    };

    const zodiacImage = getImage(type);

    return (
        <>
            {zodiacImage}
        </>
    );
};

export default RuleIcons;