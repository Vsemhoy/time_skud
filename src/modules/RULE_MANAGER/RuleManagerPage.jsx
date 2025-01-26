import React, { useEffect, useState } from "react";
import { DS_PROD_CALENDARS, DS_USER } from "../../CONFIG/DEFAULTSTATE";
import RuleToolbar from "./components/RuleToolbar";

const RuleManagerPage = (props) => {
    const { userdata } = props;
        const [companies, setCompanies] = useState([
            { key: 0, value: 0, label: 'Все компании' },
            ...DS_USER.companies.map((com) => ({
                key: com.id,
                value: Number(com.id),
                label: com.name,
            })),
        ]);

    return (
        <div className={'sk-mw-1000'}>
            <br/>
            <h2>Правила учёта рабочего времени</h2>
            <RuleToolbar
                companies={companies}
                userData={userdata}
                />
            {/* <ProdCalToolbar 
                onAddNewClick={openModal}
                onChangeCompany={changeCompany}
            /> */}
            <br/>

            <div className={'sk-calendar-list'}>
            <div>
                fjaksdjfkl jaskldfjklasdjfk jaskldfjklasdjfkasd jfkajsdkfja

                dasjfkajs;dfj askldjf kl
            </div>
                {/* {
                    calendarList.map((jcal)=>(
                        <ProdCalItemCard
                         onOpenModal={openModal} 
                         data={jcal}
                         key={`clitem_${jcal.id}`}
                        />
                    ))
                } */}


            </div>

            <div>modal</div>
        </div>
    )
};

export default RuleManagerPage;

