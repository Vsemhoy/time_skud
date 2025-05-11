import { Tag } from "antd";
import dayjs from "dayjs";
import React from "react";
import { getWeekDayString } from "../../../components/Helpers/TextHelpers";
import { RobotOutlined } from "@ant-design/icons";

const EventMonitorListCard = (props) => {


    return (
        <div className={`sk-evemonic-cardrow ${ props.data.direction > 0 ? 'sk-evemonic-exit' : 'sk-evemonic-entrance'} ${props.data.is_custom > 0 ? 'sk-evemonic-cuscard' : 'sk-evemonic-norcard'}`}
        >
            <div>
                {props.data.user_id} - {props.data.pkey}
            </div>
            <div>
                {props.data.is_custom > 0 ? ( <span className="sk-evemonic-creatag" title={`Создано администратором с id ${props.data.creator_id}`}>{props.data.creator_id}</span>)  : (
                    <RobotOutlined />
                )}
            </div>
            <div>
                {props.data.user_surname} {props.data.user_name} {props.data.user_patronymic}
            </div>
            <div>
                {props.data.reason}
            </div>
            <div>
                {dayjs(props.data.datetime_contr).format("DD-MM-YYYY   HH:mm")}
            </div>
            <div>
                {getWeekDayString(dayjs(props.data.datetime_contr).day())}
            </div>
            <div>
                {props.data.direction > 0 ? (
                    <Tag color="volcano">Выход</Tag>
                ):(
                    <Tag color="cyan">Вход</Tag>
                )}
            </div>
        </div>
    )
}

export default EventMonitorListCard;