import React from 'react';


import Pig from "../../media/ruletypes/piggy-bank-coin-svgrepo-com.svg";
import Recycle from "../../media/ruletypes/recycle-svgrepo-com.svg";
import Magic from "../../media/ruletypes/magic-svgrepo-com.svg";
import Bed from "../../media/ruletypes/bed-svgrepo-com.svg";
import Eraser from "../../media/ruletypes/eraser-svgrepo-com.svg";
import Auto from "../../media/ruletypes/auto-focus-svgrepo-com.svg";

import Owl from "../../media/zodiac/owl-bird-shape-svgrepo-com.svg";




import { HOST_COMPONENT_ROOT } from '../../CONFIG/config';
import BedRuleIcon from "./Rule/BedRuleIcon";
import BirdRuleIcon from "./Rule/BirdRuleIcon";
import AshtrayRuleIcon from "./Rule/AshtrayRuleIcon";
import TrashbinMorningRuleIcon from "./Rule/TrashbinMorningRuleIcon";
import TrashbinEveningRuleIcon from "./Rule/TrashbinEveningRuleIcon";
import PiggyBankRuleIcon from "./Rule/PiggyBankRuleIcon";
import LockRuleIcon from "./Rule/LockRuleIcon";


const RuleIcons = ({ type, size }) => {
    const getImage = (type) => {
        switch (type) {
            case 1:
                return (<BedRuleIcon height={size}/>);
            case 2:
                return (<BirdRuleIcon height={size} />);
            case 3:
                return (<AshtrayRuleIcon height={size} />);
            case 4:
                return (<TrashbinMorningRuleIcon height={size} />);
            case 5:
                return (<TrashbinEveningRuleIcon height={size} />);
            case 6:
                return (<PiggyBankRuleIcon height={size} />);
            case 7:
                return (<LockRuleIcon height={size} />);
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