import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";
import { Affix, Button, Dropdown, Select } from "antd";
import React, { useState } from "react";

import './components/style/claimmanager.css';
import ClaimManagerCard from "./components/ClaimManagerCard";
import ClaimEditorDrawer from "./components/ClaimEditorDrawer";
import ClaimManagerSidebar from "./components/ClaimManagerSidebar";
import dayjs from "dayjs";


const claimTypes = [
    {
        key: 'clt_9',
        value: 9, 
        label: 'Отпуск за свой счёт',
        icon: <MoonOutlined />
    },
    {
        key: 'clt_8',
        value: 8, 
        label: 'Кратковременная командировка',
        icon: <CarOutlined />
    },
    {
        key: 'clt_7',
        value: 7, 
        label: 'Длительная командировка',
        icon: <RocketOutlined />
    },
    {
        key: 'clt_10',
        value: 10, 
        label: 'Отпуск',
        icon: <SmileOutlined />
    },
    {
        key: 'clt_11',
        value: 11, 
        label: 'Сверхурочные',
        icon: <DollarOutlined />
    },
    {
        key: 'clt_6',
        value: 6, 
        label: 'Больничные',
        icon: <MedicineBoxOutlined />
    },
    {
        key: 'clt_13',
        value: 13, 
        label: 'Контейнеры',
        icon: <TruckOutlined />
    }
];

const ClaimManagerPage = (props) => {
    const [typeSelect, setTypeSelect] = useState(null);
    const [editorOpened, setEditorOpened] = useState(false);

    const [formType, setFormType] = useState(null);



    const handleEditorOpen = (value) => {
        if (value && value.key){
            let key = parseInt(value.key.replace('clt_', ''));
            setEditorOpened(true);
            setFormType(key);
        }
    }

    const menuProps = {
        items: claimTypes,
        onClick: handleEditorOpen,
      };


    return (
        <div>
            <div style={{padding: '6px'}} className={'sk-mw-1400'}>
            <br/>
            


            <div className={'sk-usp-layout-container'}>
                <div>
                <div
                style={{fontSize:'16px', fontWeight:'500', padding: '16px 0px'}}
                    >Менеджер пользовательских заявок</div>
                    {/* <div
                  
                    >
                        Персона
                    </div>
                    <div
                       
                    >
                        Группа
                    </div>
                    <div
                     
                    >
                        Все
                    </div> */}
                </div>

                <div className="sk-flex-space"> 
        
                    <div className={`sk-claiman-type-selector`}>
                        <div className={`sk-claiman-typeselect-item  ${typeSelect === null ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(null)}} 
                        >
                            <div>
                            <span><BlockOutlined /></span> <span>Все заявки</span>
                            </div>
                                
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 9 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(9)}}
                            style={{background: "#c4e8e5"}}
                        >
                            <div>
                                <span><MoonOutlined /></span> <span>Отпуск СВ</span>

                            </div>
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 8 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(8)}}
                            style={{background: "#e3dbf1"}}
                        >
                            <div>
                                <span><CarOutlined /></span> <span>Крат. ком.</span>

                            </div>
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 7 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(7)}}
                            style={{background: "#e2b4e9"}}
                        >
                            <div>
                            <span><RocketOutlined /></span> <span>Длит. ком.</span>

                            </div>
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 10 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(10)}}
                            style={{background: "#7adfd6"}}
                        >
                            <div>
                            <span><SmileOutlined /></span> <span>Отпуск</span>

                            </div>
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 11 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(11)}}
                            style={{background: "#00ff97"}}
                        >
                            <div>
                            <span><DollarOutlined /></span> <span>Сверхурочн.</span>

                            </div>
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 6 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(6)}}
                            style={{background: "#ffa8a8"}}
                        >
                            <div>
                            <span><MedicineBoxOutlined /></span> <span>Больничн.</span>

                            </div>
                        </div>

                        <div className={`sk-claiman-typeselect-item  ${typeSelect === 13 ? "sk-active" : ""}`}
                            onClick={()=>{setTypeSelect(13)}}
                            style={{background: "#ffc107"}}
                        >
                            <div>
                            <span><MedicineBoxOutlined /></span> <span>Контейн.</span>

                            </div>
                        </div>
                    </div>
                    <div>
                        <Dropdown
                            menu={menuProps}
                            onClick={handleEditorOpen}
                        >
                        <Button 
                            icon={<PlusOutlined />}
                            type={'primary'}
                        >
                            Создать заявку
                        </Button>
                        </Dropdown>
                    </div>
                </div>
            </div>

            <div className={'sk-usp-layout-container'}>
                <div className="sk-usp-filter-col">
                    <ClaimManagerSidebar 

                    />
                </div>


                <div className="sk-usp-content-col">
                    <div className={'sk-arche-stack'}>
                    <Affix offsetTop={0}>
                    <div className="sk-clamen-headerrow">
                    <div className={'sk-clamen-card'}>
                        <div >
                            <div>
                                id
                            </div>
                        </div>
                        <div >
                            <div>
                                Имя пользователя
                            </div>
                        </div>
                        <div >
                            <div>
                                Тип
                            </div>
                        </div>
                        <div >
                            <div>
                                Начало
                            </div>
                        </div>
                        <div >
                            <div>
                                Конец
                            </div>
                        </div>
                        <div >
                            <div>
                                дней
                            </div>
                        </div>
                        <div >
                            <div>
                                Рук.
                            </div>
                        </div>
                        <div >
                            <div>
                                Причина
                            </div>
                        </div>
                        <div >
                            <div>
                                Детали
                            </div>
                        </div>
                        <div >
                            <div>
                                Статус
                            </div>
                        </div>
                        <div >
                            <div>
                                
                            </div>
                        </div>

                    </div>
                    </div>
                    </Affix>
                        <ClaimManagerCard />
                        <ClaimManagerCard />
                        <ClaimManagerCard />
                        <ClaimManagerCard />
                        <ClaimManagerCard />
                        <ClaimManagerCard />
                        <ClaimManagerCard />
                    </div>
                </div>




            </div>


            
            </div>

            <ClaimEditorDrawer
                opened={editorOpened}
                claim_type={formType}
                on_close={()=>{setEditorOpened(false)}}
                claim_types={claimTypes}
            />
        </div>
    )
}

export default ClaimManagerPage;