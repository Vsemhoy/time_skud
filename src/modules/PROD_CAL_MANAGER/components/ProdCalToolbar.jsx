import { Button, DatePicker, Select } from "antd";
import React, { useState, useEffect, use } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { DS_USER } from "../../../CONFIG/DEFAULTSTATE";


import dayjs from "dayjs";



const ProdCalToolbar = (props) =>{
    const {userData, companies, onAddNewClick } = props;
    const location = useLocation();
    const navigate = useNavigate();
    // const [companies, setCompanies] = useState([]);
    const [usedCompany, setUsedCompany] = useState(0); // Default to 0 initially



    const handleUsedCompanyChange = (value) => {
        setUsedCompany(value);
        changeAddressBarParam('tgc',value,[0]);
    };


    const changeAddressBarParam = (key, value, deleteOn = [null]) =>
        {
            const params = new URLSearchParams(window.location.search);
            if (deleteOn.includes(value)){
                params.delete(key);
            } else {
                params.set(key, value);
            };
            navigate(`?${params.toString()}`);
        }

        const clickNew = ()=>{
            if (onAddNewClick)
            {
                onAddNewClick();
            }
        }

    return (
        <div className={"ts-toolbar"}>
        <div className={"sk-flex-gap"}>
            <div className={"sk-m"}>
                {companies.length > 1 ? (
                    <Select 
                        options={companies}
                        value={usedCompany} // Use value instead of defaultValue for controlled component
                        style={{ minWidth: 140 }}
                        onChange={handleUsedCompanyChange}
                    />
                ) : ''}


            </div>
            <div>
           
            </div>
            <div>
                
            </div>
        </div>

        <div className={"sk-flex-gap"}>
        <Button 
            onClick={clickNew}
        >Добавить новый</Button>
            </div>

        </div>
    );
}

export default ProdCalToolbar;