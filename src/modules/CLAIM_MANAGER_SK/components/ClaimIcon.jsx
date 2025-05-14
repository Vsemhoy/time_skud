
import React, { useEffect, useState } from 'react';

import { 
    MoonOutlined,
    CarOutlined,
    SmallDashOutlined,
    RocketOutlined,
    DollarOutlined,
    MedicineBoxOutlined,
    TruckOutlined,
    BlockOutlined,
    SmileOutlined,
    DockerOutlined
 } from "@ant-design/icons";
    import { getWeekDayString, secondsToTime } from "../../../components/Helpers/TextHelpers";
    import { USER_STATE_PLACES } from "../../../CONFIG/DEFFORMS";



    const iconMap = {
        MoonOutlined,
        CarOutlined,
        SmallDashOutlined,
        RocketOutlined,
        DollarOutlined,
        MedicineBoxOutlined,
        TruckOutlined,
        BlockOutlined,
        SmileOutlined,
        DockerOutlined
    };

    const DynamicIcon = (iconName) => {
        console.log('iconName', iconName)
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent  /> : null;
    };




const ClaimIcon = (props, children) => {
    const [value, setValue] = useState('SmallDashOutlined');
    const [title, setTitle] = useState('');

    const [icon, setIcon] = useState(<SmallDashOutlined />);

    useEffect(() => {
      setIcon(DynamicIcon(props.icon));
    }, [props.icon]);

    useEffect(() => {
      setTitle(props.title);
    }, [props.title]);

  return (
    <div title={title}>
        {icon}
    </div>
  );
};

export default ClaimIcon;