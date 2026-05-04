import React, { useState, useEffect } from "react";
import { formatMoscowDateTime } from "../../../components/Helpers/DateTimeHelpers";

const UserlistEventDumpCard = (props) => {

    const [eventDump, setEventDump] = useState([]);
    const themeSafeClass = props.themeSafe ? ' sk-umsmi-card--theme-safe' : '';
    const themeSafeTableClass = props.themeSafe ? ' sk-uml-table-dumper--theme-safe' : '';

    const normalizeEventDump = (rawData) => {
        if (!rawData) {
            return [];
        }

        const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

        if (!Array.isArray(parsedData)) {
            return [];
        }

        if (parsedData.length === 0) {
            return [];
        }

        if (
            Object.prototype.hasOwnProperty.call(parsedData[0], 'direction') ||
            Object.prototype.hasOwnProperty.call(parsedData[0], 'diraction')
        ) {
            return parsedData.map((item) => ({
                d: Number(item.direction ?? item.diraction ?? 0),
                t: item.datetime,
                c: 0,
                r: '',
            }));
        }

        return parsedData;
    };

    useEffect(()=>{ 

        try {
            setEventDump(normalizeEventDump(props.data));
        } catch (e) {
            console.log('event dump parse error', e);
            setEventDump([]);
        }

    },[props.data]);

    return (
        <div className={`sk-w-padding-18 sk-umsmi-card${themeSafeClass}`}>

        <table className={`sk-uml-table-dumper${themeSafeTableClass}`} style={{borderCollapse:'collapse'}}>
            <thead>
                <tr style={{fontWeight: '500'}}>
                    <td>Вход</td>
                    <td>Выход</td>
                </tr>
            </thead>
            <tbody>
                {eventDump.map((evt, index)=>(
                    <tr key={`evdkey_${index}`} 
                    className={`${evt.c && evt.c ===1 ? 'sk-uml-custom' : ''}`}>
                        <td className={`${evt.d !== 0 && evt.c ? "sk-uml-cuscontent" : ""}`}>{evt.d === 0 ? formatMoscowDateTime(evt.t) : evt.c && evt.c === 1 ? evt.r : '' }</td>
                        <td className={`${evt.d === 0 && evt.c ? "sk-uml-cuscontent" : ""}`}>{evt.d === 1 ? formatMoscowDateTime(evt.t)  : evt.c && evt.c === 1 ? evt.r : '' }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserlistEventDumpCard;




