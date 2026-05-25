import React from 'react';
import {
    BriefcaseBusiness,
    BriefcaseMedical,
    ClockPlus,
    Forklift,
    House,
    Plane,
    TreePalm,
} from 'lucide-react';

const lucideStateIcons = {
    8: BriefcaseBusiness,
    9: House,
    11: ClockPlus,
    7: Plane,
    10: TreePalm,
    6: BriefcaseMedical,
    13: Forklift,
};

export const hasLucideStateIcon = (idState) => Boolean(lucideStateIcons[Number(idState)]);

const StateLucideIconsController = ({ IdState, size = 16, strokeWidth = 2, ...props }) => {
    const IconComponent = lucideStateIcons[Number(IdState)];

    if (!IconComponent) {
        return null;
    }

    return <IconComponent size={size} strokeWidth={strokeWidth} {...props} />;
};

export default StateLucideIconsController;
