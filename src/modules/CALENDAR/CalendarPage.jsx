import React, { useState } from "react";
import './style/calendar.css';
import dayjs from "dayjs";
import { duration } from "moment";
import CalCard from "./components/items/CalCard";
import CalModal from "./components/CalModal";

const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    

    const openModal = () => {
        setIsModalOpen(true);
        console.log('Opened');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>

            <h1>Календарь вилл хер</h1>

            <div className={'sk-calen-container'}>
                <div className={'sk-cal-card-stack'}>
                    <CalCard 
                    onOpenModal={openModal} />
                    <CalCard 
                    onOpenModal={openModal} />
                    <CalCard 
                    onOpenModal={openModal} />
                </div>
            </div>


            <CalModal 
                is_open={isModalOpen} onClose={closeModal}
            />
        </div>
    )
};

export default CalendarPage;