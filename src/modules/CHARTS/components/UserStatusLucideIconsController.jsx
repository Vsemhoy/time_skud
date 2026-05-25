import React from 'react';
import {
    Apple,
    BriefcaseBusiness,
    BriefcaseMedical,
    Check,
    CircleAlert,
    ClockPlus,
    Coffee,
    Coins,
    DoorOpen,
    Footprints,
    Forklift,
    Flame,
    Globe,
    House,
    LogIn,
    LogOut,
    Map,
    OctagonMinus,
    Plane,
    ShieldCheck,
    TreePalm,
    TriangleAlert,
} from 'lucide-react';

const userStatusIcons = {
    0: OctagonMinus,
    1: OctagonMinus,
    2: Apple,
    3: Footprints,
    4: Check,
    5: ShieldCheck,
    6: BriefcaseMedical,
    7: Plane,
    8: BriefcaseBusiness,
    9: House,
    10: TreePalm,
    11: ClockPlus,
    12: Map,
    13: Forklift,
    14: Check,
    15: LogIn,
    16: TriangleAlert,
    17: Flame,
    18: CircleAlert,
    19: LogOut,
    20: Coffee,
    21: DoorOpen,
    22: Coins,
    23: Globe,
};

const legacyStatusIcons = {
    OctagonMinus,
    Apple,
    Footprints,
    Check,
    ShieldCheck,
    BriefcaseMedical,
    Plane,
    BriefcaseBusiness,
    House,
    TreePalm,
    ClockPlus,
    Map,
    Forklift,
    LogIn,
    TriangleAlert,
    Flame,
    CircleAlert,
    LogOut,
    Coffee,
    DoorOpen,
    Coins,
    Globe,
    MinusCircleOutlined: OctagonMinus,
    AppleOutlined: Apple,
    RestOutlined: Footprints,
    CheckOutlined: Check,
    SafetyCertificateOutlined: ShieldCheck,
    MedicineBoxOutlined: BriefcaseMedical,
    RocketOutlined: Plane,
    CarOutlined: BriefcaseBusiness,
    MoonOutlined: House,
    SmileOutlined: TreePalm,
    DollarOutlined: ClockPlus,
    HeatMapOutlined: Map,
    TruckOutlined: Forklift,
    LoginOutlined: LogIn,
    WarningOutlined: TriangleAlert,
    FireOutlined: Flame,
    ExlamationCircleOutlined: CircleAlert,
    ExclamationCircleOutlined: CircleAlert,
    Logoutoutlined: LogOut,
    LogoutOutlined: LogOut,
    JavaOutlined: Coffee,
    TwitterOutlined: DoorOpen,
    GoldOutlined: Coins,
    GlobalOutlined: Globe,
};

export const hasUserStatusLucideIcon = (idState) => Boolean(userStatusIcons[Number(idState)]);
export const hasUserStatusLucideIconName = (iconName) => Boolean(legacyStatusIcons[String(iconName ?? '').trim()]);

const UserStatusLucideIconsController = ({ IdState, IconName, size = 16, strokeWidth = 2, ...props }) => {
    const normalizedIconName = String(IconName ?? '').trim();
    const IconComponent = legacyStatusIcons[normalizedIconName] || userStatusIcons[Number(IdState)];

    if (!IconComponent) {
        return null;
    }

    return <IconComponent size={size} strokeWidth={strokeWidth} {...props} />;
};

export default UserStatusLucideIconsController;
