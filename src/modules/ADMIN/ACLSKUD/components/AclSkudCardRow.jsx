import { CaretDownOutlined, CaretUpOutlined, ClearOutlined, CopyOutlined, DeliveredProcedureOutlined, DiffOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";

import React, { useEffect, useState, useId } from 'react';
import AclSkudChecker from './AclSkudChecker';

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



const AclSkudCardRow = (props) => {
    const [itemId, setItemId] = useState(props.data.user_id ? props.data.user_id : props.data.id );
    const [cooxedRow, setCooxedRow] = useState(true);

    const [templateMode, setTemplateMode] = useState(false);

    const handleCooxAction = (ev) => {
        ev.preventDefault();
        if (props.data.type){
            if (props.on_dep_coox){
                props.on_dep_coox(itemId, ev.shiftKey);
            }
        } else {
            if (props.on_user_coox){
                props.on_user_coox(itemId, ev.shiftKey);
            }
        }
    };

    useEffect(() => {
      if (!props.data.type){
        if (props.cooxed_users.includes(itemId)){
            setCooxedRow(true);
        } else {
            setCooxedRow(false);
        }
      }
    }, [props.cooxed_users]);

    useEffect(() => {
        if (props.data.type){
            if (props.cooxed_departs.includes(itemId)){
                setCooxedRow(true);
            } else {
                setCooxedRow(false);
            }
          }
      }, [props.cooxed_departs]);


  return (
    <div key={`checker${useId()}`}>
        <div className={`sk-table-aclskud-row sk-table-aclskud-data  ${props.data.type ? "sk-act-divider" : "sk-act-mainrow"}`}
            onDoubleClick={handleCooxAction}
        >
                <div title={itemId}>
                    <Checkbox></Checkbox>
                </div>
            <div>
                <div onClick={handleCooxAction} className={`${!props.data.type ? "sk-offset-x" : ''}`}>
                    {cooxedRow ? (
                        <div className={'sk-cooxer-arrow'}>
                        <CaretDownOutlined />
                        </div>
                    ) : (
                        <div className={'sk-cooxer-arrow'}>
                        <CaretUpOutlined />
                        </div>
                    )}
                </div>
            </div>
            <div title={itemId}>
                <div className={'sk-table-userName'}>
                    {props.data?.user_name} {props.data?.name}
                </div>
            </div>
            <div>
                {/* <AclSkudChecker /> */}
                <div className={'sk-table-aclskud-multicol'} >
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        
            <div className='sk-flex sk-table-triggers'>
                {!props.data.type ? (
                    <>
                    <div><CopyOutlined /></div>
                    <div><DiffOutlined /></div>
                    <div><ClearOutlined /></div>
                    </>
                ):(
                    <div className={'sk-flex'}
                        onClick={()=>{setTemplateMode(!templateMode)}}
                    >
                    <div style={{padding: '3px', cursor:'pointer'}}><span>ШАБЛОН </span> <DeliveredProcedureOutlined /></div>
                    </div>
                )}

            </div>
        </div>
        
        {(!cooxedRow && props.data.user_surname || templateMode && props.data.type) && claimTypes.map((ct)=>(
            <div className={`sk-table-aclskud-row sk-table-aclskud-data ${templateMode ? "sk-act-templaterow" : "sk-act-subrow"}`}
            key={`checkdser${itemId}_${ct.value}`}
            >
                <div>
                    <Checkbox></Checkbox>
                </div>
                <div>
                    <div>
                        {ct.id}
                    </div>
                </div>
                <div>
                    <div>
                        {ct.label}
                    </div>
                </div>
                <div>
                    <AclSkudChecker  key={`${itemId}_${ct.value}_per`} addkey={`${itemId}_${ct.value}_per`}/>
                </div>
                {/* <div>
                    <AclSkudChecker  key={`${itemId}_${ct.value}_emp`} addkey={`${itemId}_${ct.value}_emp`} />
                </div> */}
                {/* <div>
                    <AclSkudChecker />
                </div> */}
                {/* <div>
                    <AclSkudChecker  key={`${itemId}_${ct.value}_all`} addkey={`${itemId}_${ct.value}_all`} />
                </div> */}
                <div className='sk-flex sk-table-triggers'>
                    <div><CopyOutlined /></div>
                    <div><DiffOutlined /></div>
                    <div><ClearOutlined /></div>
                </div>
            </div>
            ))}
        </div>
        );
    };

export default AclSkudCardRow;