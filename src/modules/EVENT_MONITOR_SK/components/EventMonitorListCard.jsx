import { Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import { getWeekDayString } from "../../../GlobalComponents/Helpers/TextHelpers";

const EventMonitorListCard = (props) => {


    return (
        <div className={`sk-evemonic-cardrow ${props.data.sub_code > 0 ? 'sk-evemonic-exit' : 'sk-evemonic-entrance'}`}>
            <div>
                {props.data.user_id} - {props.data.pkey}
            </div>
            <div>
                {props.data.user_surname} {props.data.user_name} {props.data.user_patronymic}
            </div>
            <div>
                {dayjs(props.data.datetime_contr).format("DD-MM-YYYY   HH:mm")}
            </div>
            <div>
                {getWeekDayString(dayjs(props.data.datetime_contr).day())}
            </div>
            <div>
                {props.data.sub_code > 0 ? (
                    <Tag color="volcano">Выход</Tag>
                ):(
                    <Tag color="cyan">Вход</Tag>
                )}
            </div>
        </div>
    )
}

export default EventMonitorListCard;