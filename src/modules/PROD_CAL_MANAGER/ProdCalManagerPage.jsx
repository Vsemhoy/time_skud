import React, { useEffect, useState } from "react";
import { CSRF_TOKEN } from "../../CONFIG/config";
import { DS_USER } from "../../CONFIG/DEFAULTSTATE";
import ProdCalToolbar from "./components/ProdCalToolbar";
import ProdCalItemCard from "./components/ProdCalItemCard";
import ProdCalModal from "./components/ProdCalModal";

const ProdCalManagerPage = (props) => {
    const { userdata } = props;
        const [companies, setCompanies] = useState([
            { key: 0, value: 0, label: 'Все компании' },
            ...DS_USER.companies.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            })),
        ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedCalendarId, setEditedCalendarId] = useState(null);
    const [currentYear, setCurrentYear] = useState(2025);
    
    useEffect(() => {
        if (CSRF_TOKEN){
            setCompanies([{ key: 0, value: 0, label: 'Все компании' },
                ...userdata.companies.map((com) => ({
                    key: com.id,
                    value: Number(com.id),
                    label: com.name,
                }))]
            )}},[userdata]);




    const openModal = () => {
        setIsModalOpen(true);
        console.log('Opened');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const makeEmptyCal = () =>{
        setIsModalOpen(true);
    }

    return (
        <div className={'sk-mw-1000'}>
            <br/>
            <h2>Производственные календари</h2>
            <ProdCalToolbar 
                userData={userdata}
                companies={companies}
                onAddNewClick={makeEmptyCal}
            />
            <br/>

            <div className={'sk-calendar-list'}>
                <ProdCalItemCard 
                    onOpenModal={openModal}
                />
                <ProdCalItemCard 
                    onOpenModal={openModal}
                />
                <ProdCalItemCard 
                    onOpenModal={openModal}
                />
                <ProdCalItemCard 
                    onOpenModal={openModal}
                />
                <ProdCalItemCard 
                    onOpenModal={openModal}
                />

            </div>

            <ProdCalModal 
                userData={userdata}
                is_open={isModalOpen}
                onClose={closeModal}
                year={2025}

            />
        </div>
    )
};

export default ProdCalManagerPage;