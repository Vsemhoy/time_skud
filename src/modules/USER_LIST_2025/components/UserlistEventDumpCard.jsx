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
        <div className="sk-w-padding-18 sk-umsmi-card">

    <div className="sk-umsmi-card-title">Скуд-события за день:</div>
        <table className="sk-uml-table-dumper" style={{borderCollapse:'collapse'}}>
            <thead>
                <tr style={{fontWeight: '500'}}>
                    <td></td>
                    <td>Вход</td>
                    <td>Выход</td>
                </tr>
            </thead>
            <tbody>
                {eventDump.map((evt, index)=>(
                    <tr key={`evdkey_${index}`} 
                    className={`${evt.c && evt.c ===1 ? 'sk-uml-custom' : ''}`}>
                        <td>{index + 1}</td>
                        <td className={`${evt.d !== 0 && evt.c ? "sk-uml-cuscontent" : ""}`}>{evt.d === 0 ? dayjs(evt.t).format('HH:mm') : evt.c && evt.c === 1 ? evt.r : '' }</td>
                        <td className={`${evt.d === 0 && evt.c ? "sk-uml-cuscontent" : ""}`}>{evt.d > 0 ? dayjs(evt.t).format('HH:mm')  : evt.c && evt.c === 1 ? evt.r : '' }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserlistEventDumpCard;