import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

const UserlistEventDumpCard = (props) => {

    const [eventDump, setEventDump] = useState([]);

    useEffect(()=>{ 

        if (typeof props.data === 'string'){
            setEventDump(JSON.parse(props.data));
        } else {
            setEventDump(props.data);
        }

    },[props.data]);

    return (
        <div className="sk-w-padding-18">

        
        <table className="sk-uml-table-dumper">
            <thead>
                <tr>
                    <th></th>
                    <th>Вход</th>
                    <th>Выход</th>
                </tr>
            </thead>
            <tbody>
                {eventDump.map((evt, index)=>(
                    <tr>
                        <td>{index + 1}</td>
                        <td>{evt.d === 0 ? dayjs(evt.t).format('HH:mm') : ""}</td>
                        <td>{evt.d > 0 ? dayjs(evt.t).format('HH:mm') : ""}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default UserlistEventDumpCard;