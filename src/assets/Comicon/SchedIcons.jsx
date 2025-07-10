import React from 'react';

import ScheduleStandardIcon from "./Schedule/ScheduleStandardIcon";
import ScheduleShiftIcon from "./Schedule/ScheduleShiftIcon";
import ScheduleFreeIcon from "./Schedule/ScheduleFreeIcon";
import ScheduleFlexIcon from "./Schedule/ScheduleFlexIcon";
import ScheduleSumIcon from "./Schedule/ScheduleSumIcon";
import ScheduleEmptyIcon from "./Schedule/ScheduleEmptyIcon";

const SchedIcons = ({ type, size }) => {
    const getImage = (type) => {
        switch (type) {
            case 1:
                return ( <ScheduleStandardIcon height={size}/> );
            case 2:
                return ( <ScheduleFlexIcon height={size}/> );
            case 3:
                return ( <ScheduleFreeIcon height={size}/> );
            case 4:
                return ( <ScheduleShiftIcon height={size}/> );
            case 5:
                return ( <ScheduleSumIcon height={size}/> );
            default:
                return ( <ScheduleEmptyIcon height={size}/> );
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