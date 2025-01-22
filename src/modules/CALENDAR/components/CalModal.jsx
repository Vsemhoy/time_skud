import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from 'antd';
import "./calmodal.css";
import dayjs from "dayjs";

const CalModal = ({ is_open, onClose, startdate, rangeEnd }) => {
    const [open, setOpen] = useState(is_open);
    const [calendarDays, setCalendarDays] = useState([]);

    const [startDate, setStartDate] = useState(startdate ? dayjs(startdate) : dayjs());
    // const [endRange, setEndRange] useState(startDate ? dayjs(startDate) : dayjs());

    useEffect(() => {
        console.log('is_open' + ' => ' + is_open);
        setOpen(is_open);

        generateCalendarDays();
    }, [is_open]);


    const handleOk = () => {
        setOpen(false);
        if (onClose){
            onClose(); // Вызываем функцию закрытия из родительского компонента
        }
    };

    const handleCancel = () => {
        setOpen(false);
        if (onClose){
            onClose(); // Вызываем функцию закрытия из родительского компонента
        }
    };




    const generateCalendarDays = () => {
        
        // const startOfYear = dayjs().subtract(1, 'year').startOf('year'); // Начало предыдущего года
        // const endOfYear = dayjs().add(1, 'year').startOf('year').subtract(1, 'day').endOf('week'); // Конец следующего года

        const startOfYear = dayjs(startDate).startOf('year').day(1); // Последний понедельник
        // Определяем первое воскресенье следующего года
        const endOfYear = dayjs(startDate).add(1, 'year').startOf('year').add(1, 'week').day(0); // Первое воскресенье

        const firstDate = dayjs(startDate).startOf('year');
        const lastDate = dayjs(firstDate).add(1, 'year');
        console.log('firstdate' + ' => ' + firstDate.unix);

        const daysArray = [];
        let currentDate = startOfYear;

        while (currentDate.isBefore(endOfYear) || currentDate.isSame(endOfYear)) {
            daysArray.push({
                value: currentDate.date(),
                month: currentDate.month() + 1, // Месяцы начинаются с 0
                date: currentDate.format('YYYY-MM-DD'),
                is_weekend: currentDate.day() === 0 || currentDate.day() === 6, // Воскресенье (0) или Суббота (6),
                week_day: currentDate.day(),
                is_outrange: currentDate.isBefore(firstDate) || currentDate.isAfter(lastDate),
            });
            currentDate = currentDate.add(1, 'day');
        }

        setCalendarDays(daysArray);
    };



    return (
        <>
            <Modal
                title="Календарь на 2025 для буржуев"
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <div class='sk-cal-modal-head'>
                    Head bar
                </div>
                <div class='sk-cal-modal-toolbar'>
                <Input type="text" maxLength={500} title="" placeholder="Описание..." />
                    Head bar
                </div>
                <div class='sk-cal-modal-calendar'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="sk-calendar-top-rule">

                                            <div className="sk-trule-item">ПН</div>
                                            <div className="sk-trule-item">ВТ</div>
                                            <div className="sk-trule-item">СР</div>
                                            <div className="sk-trule-item">ЧТ</div>
                                            <div className="sk-trule-item">ПТ</div>
                                            <div className="sk-trule-item">СБ</div>
                                            <div className="sk-trule-item">ВС</div>

                                            <div className="sk-trule-item">ПН</div>
                                            <div className="sk-trule-item">ВТ</div>
                                            <div className="sk-trule-item">СР</div>
                                            <div className="sk-trule-item">ЧТ</div>
                                            <div className="sk-trule-item">ПТ</div>
                                            <div className="sk-trule-item">СБ</div>
                                            <div className="sk-trule-item">ВС</div>
  
                                            <div className="sk-trule-item">ПН</div>
                                            <div className="sk-trule-item">ВТ</div>
                                            <div className="sk-trule-item">СР</div>
                                            <div className="sk-trule-item">ЧТ</div>
                                            <div className="sk-trule-item">ПТ</div>
                                            <div className="sk-trule-item">СБ</div>
                                            <div className="sk-trule-item">ВС</div>
                                      
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                <div className="sk-calendar-body">
                                    {calendarDays.map((day) => (
                                            <div key={day.date} className={`sk-calendar-item ${day.is_weekend ? 'weekend' : ''} ${day.is_outrange ? 'outrange' : ''}`}
                                                title={day.date + " - " + day.week_day}
                                            >
                                                {day.value}
                                            </div>
                                        ))}
                                </div>
                                </td>
                                <td>
                                <div className="sk-calendar-side-rule">
                                        <div className="sk-srule-item">ЯНВ</div>
                                        <div className="sk-srule-item">ФЕВ</div>
                                        <div className="sk-srule-item">МАР</div>
                                        <div className="sk-srule-item">АПР</div>
                                        <div className="sk-srule-item">МАЙ</div>
                                        <div className="sk-srule-item">ИЮН</div>
                                        <div className="sk-srule-item">ИЮЛ</div>
                                        <div className="sk-srule-item">АВГ</div>
                                        <div className="sk-srule-item">СЕН</div>
                                        <div className="sk-srule-item">ОКТ</div>
                                        <div className="sk-srule-item">НОЯ</div>
                                        <div className="sk-srule-item">ДЕК</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    

                </div>
                
            </Modal>
        </>
    );
};

export default CalModal;
