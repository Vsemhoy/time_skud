import React, { useEffect, useState } from "react";
import "./style/schedlistrow.css";
import { Button, Flex, Tag } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { DS_SCHED_UNITS } from "../../../CONFIG/DEFAULTSTATE";
import SchedIcons from "../../../assets/Comicon/SchedIcons";

const { Text } = Typography;

const FTIME = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const SchedListRow = (props) => {
    const [itemId, setItemId] = useState(props.data.id);
    const [itemData, setItemData] = useState(props.data);
    const [lunchStart, setLunchStart] = useState("");
    const [lunchEnd, setLunchEnd] = useState("");
    const [lunchTime, setLunchTime] = useState("");
    const [unitType, setUinitType] = useState("");
    const [unitTime, setUnitTime] = useState("");
    const [itemType, setItemType] = useState(1);
    const [prodCalendar, setProdCalendar] = useState(null);

    useEffect(() => {
        setItemId(props.data.id);
        setItemData(props.data);

        setLunchStart(FTIME(props.data.lunch_start));
        setLunchEnd(FTIME(props.data.lunch_end));
        setLunchTime(FTIME(props.data.lunch_time));

        setUnitTime(props.data.target_time);
        setUinitType(DS_SCHED_UNITS[props.data.target_unit + 1]?.label ?? "");
        setItemType(props.data.skud_schedule_type_id);
        setProdCalendar(
            props.prodCalendars?.find((calendar) => calendar.id === props.data.skud_prod_calendar_id) ?? null
        );
    }, [props.data, props.prodCalendars]);

    const openEditor = (event) => {
        if (props.onOpenEditorModal) {
            props.onOpenEditorModal(itemId, event);
        }
    };

    const handleDoubleClick = (event) => {
        if (!event.ctrlKey) {
            if (props.onOpenUserManager) {
                props.onOpenUserManager(itemId);
            }
        } else if (props.onOpenEditorModal) {
            props.onOpenEditorModal(itemId);
        }
    };

    const companyName = itemData.company_name ?? prodCalendar?.company_name ?? "";
    const companyColor = itemData.company_color ?? prodCalendar?.company_color;
    const scheduleYear = prodCalendar?.year ?? "";
    const linkedUsersCount =
        props.users_count ??
        itemData.users_count ??
        itemData.schedule_count ??
        itemData.linked_count ??
        itemData.count_links ??
        0;

    return (
        <div className={"sk-schedule-list-row"} onDoubleClick={handleDoubleClick}>
            <div className="sk-row sk-first-row">
                <div>
                    <div>
                        <SchedIcons type={itemData.skud_schedule_type_id} />
                    </div>
                </div>

                <div>
                    <div className={"sk-schedule-list-title"}>{itemData.name}</div>
                    <div>{itemData.description}</div>
                </div>
            </div>
            <div className="sk-row sk-second-row">
                <div className={"sk-flex"} style={{ paddingLeft: 12 }}>
                    <span><Tag color={companyColor}>{companyName.toUpperCase()}</Tag></span>
                    <span><Tag color="blue">{scheduleYear}</Tag></span>
                </div>
                <div>
                    <Text type="secondary" className={"sk-flex"}>
                        <div title={"users"}>{linkedUsersCount} <UserOutlined /></div>
                    </Text>
                </div>
                <div>
                    <Flex gap="small" wrap>
                        <Button color="default" variant="link" onClick={openEditor} title="Редактировать">
                            <EditOutlined />
                        </Button>
                    </Flex>
                </div>
            </div>
        </div>
    );
};

export default SchedListRow;
