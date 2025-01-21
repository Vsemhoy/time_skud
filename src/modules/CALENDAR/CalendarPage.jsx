import React from "react";
import './style/calendar.css';
import dayjs from "dayjs";
import { duration } from "moment";

const CalendarPage = () => {

    let days = [];
    let startDate = "01 jan 2024";

    for (let i = 0; i < 365; i++) {
        const element = [];//array[i];
        let obj = {
            key: `day_${i}`,
            id: `day_${i}`,
            date: startDate,
            comment: 'Hola',
            is_weekend: 0,
            duration: (60*60*8),
        }
    }

    return (
        <div>

            <h1>Календарь вилл хер</h1>

            <div className={'sk-calen-container'}>

            </div>

        </div>
    )
};

export default CalendarPage;