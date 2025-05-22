import { CaretDownOutlined, CaretUpOutlined, ClearOutlined, CopyOutlined, DeliveredProcedureOutlined, DiffOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { AimOutlined, BlockOutlined, BugOutlined, CarOutlined, DockerOutlined, DollarOutlined, MedicineBoxOutlined, MoonOutlined, PlusCircleOutlined, PlusOutlined, RocketOutlined, SmileOutlined, TruckOutlined } from "@ant-design/icons";

import React, { useEffect, useState, useId, memo } from 'react';
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



const AclSkudCardRow = memo((props) => {
    const [itemId, setItemId] = useState(props.data.user_id ? props.data.user_id : props.data.id );
    const [cooxedRow, setCooxedRow] = useState(true);

    const [templateMode, setTemplateMode] = useState(false);

    const [userData, setUserData] = useState({});

    const [copyItems, setCopyItems] = useState([]);


    useEffect(() => {
      setUserData(props.data);
    }, [props.data]);

    useEffect(() => {
        setTemplateMode(props.trigger_templates);
    }, [props.trigger_templates]);

    const handleCooxAction = (ev) => {
        if (ev.target.closest('.sk-table-template-trigger')){ return ;}
        console.log('COOX');
        ev.preventDefault();
        if (userData.type){
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
      if (!userData.type){
        if (props.cooxed_users.includes(itemId)){
            console.log('close users');
            setCooxedRow(true);
        } else {
            setCooxedRow(false);
        }
      }
    }, [props.cooxed_users]);

    
    useEffect(() => {
        if (userData.type){
            console.log(props.cooxed_departs, itemId);
            if (props.cooxed_departs.includes(itemId)){
                setCooxedRow(true);
            } else {
                setCooxedRow(false);
            }
          }
      }, [props.cooxed_departs]);



      const handleCopyRow = (type, row_id, user) => {
        if (props.on_copy_rows){
            props.on_copy_rows(type, row_id, user);
        }
      }

      const handlePasteRow = (type, row_id, user) => {
        if (props.on_paste_rows){
            props.on_paste_rows(type, row_id, user);
        }
      }

      const handleClearRow = (type, row_id, user) => {
        if (props.on_clear_rows){
            props.on_clear_rows(type, row_id, user);
        }
      }



      const handleSetTemplateMode = (ev) => {
        if (ev.shiftKey){
            ev.preventDefault();
            if (props.on_toggle_all_templates)
            {
                console.log('HLKFDDKL');
                props.on_toggle_all_templates(!templateMode);
            }
        } else {
            setTemplateMode(!templateMode);
        }

      }


      const handleCheckboxesChange = (values, type)=>{
        const data = {};
        data.id = itemId;
        data.values = values;
        data.type = type;
        if (templateMode){
            data.table = 'templates';
        } else {
            data.table = 'users';
        }
        if (props.on_change_acls){
            props.on_change_acls(data);
        }
      };

      const handleForceSave = () => {
        console.log('canclose');
      }


  return (
    <div key={`checker${useId()}`} className={`${templateMode && userData.type ? 'sk-row-wrapper-of-template' : ''}`}>
        <div className={`sk-table-aclskud-row sk-table-aclskud-data  ${userData.type ? "sk-act-divider" : "sk-act-mainrow"}`}
            onDoubleClick={handleCooxAction}
        >
                <div title={itemId}>
                    <Checkbox></Checkbox>
                </div>
            <div>
                <div onClick={handleCooxAction} className={`${!userData.type ? "sk-offset-x" : ''}`}>
                    {cooxedRow ? (
                        <div className={'sk-cooxer-arrow'} title='Показать вложенные элементы'>
                        <CaretDownOutlined />
                        </div>
                    ) : (
                        <div className={'sk-cooxer-arrow'}  title='Скрыть вложенные элементы'>
                        <CaretUpOutlined />
                        </div>
                    )}
                </div>
            </div>
            <div title={itemId}>
                <div className={'sk-table-userName sk-flex-space'}>
                    <div>
                    {userData?.surname} {userData?.name} {userData?.secondname}
                    </div>
                    {userData.type && (
                        <div>
                            <div className={'sk-flex sk-table-template-trigger'}
                                onMouseDown={handleSetTemplateMode}
                                title='Для открытия/скрытия всех шаблонов кликнуть с зажатым Shift'
                            >
                            <div style={{padding: '3px', cursor:'pointer'}}>
                                <span>ШАБЛОН </span> <DeliveredProcedureOutlined /></div>
                            </div>
                        </div>
                    )}
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
        
            <div className={`sk-flex sk-table-triggers ${templateMode ? 'sk-fttx-buttons': ''}`}>
                {!userData.type ? (
                    <>
                    <div
                        onClick={()=>{handleCopyRow('all_user', userData.user_id, userData)}}
                        title={'Скопировать все строки'}
                    ><CopyOutlined /></div>
                    <div
                        onClick={handlePasteRow('all_user', userData.user_id, userData)}
                        title={'Заменить все строки'}
                    ><DiffOutlined /></div>
                    <div
                        onClick={handleClearRow('all_user', userData.user_id, userData)}
                        title={'Очистить все строки'}
                    ><ClearOutlined /></div>
                    </>
                ):(
                        <>
                        {templateMode && (
                            <>
                                <div
                                    title='Скопировать все строки шаблона'
                                    onClick={()=>{handleCopyRow('all_template', userData.id, null)}}
                                    ><CopyOutlined /></div>
                                <div
                                    title='Вставить все строки шаблона'
                                    onClick={handlePasteRow('all_template', userData.id, null)}
                                    ><DiffOutlined /></div>
                                <div
                                    title='Очистить шаблон'
                                    onClick={handleClearRow('all_template', userData.id, null)}
                                ><ClearOutlined /></div>
                            </>
                        )}
                        </>
                )}

            </div>
        </div>
        
        {(!cooxedRow && userData.surname || templateMode && userData.type ) && Object.keys(userData.acls).map((key, index)=>(
                <AclRow
                    key={`checkdser${itemId}_${key}`}
                    itemId={itemId}
                    keyName={key}
                    aclData={userData.acls[key]}
                    userType={userData.type}
                    onChange={handleCheckboxesChange}
                    onCopy={handleCopyRow}
                    onPaste={handlePasteRow}
                    onClear={handleClearRow}
              />
            ))}
        </div>
        );
    });

export default AclSkudCardRow;




const AclRow = React.memo(({ itemId, keyName, aclData, userType, onChange, onCopy, onPaste, onClear, forceSave, onForceSave, canClose }) => {
    return (
      <div className={`sk-table-aclskud-row sk-table-aclskud-data ${userType ? "sk-act-templaterow" : "sk-act-subrow"}`} key={`checkdser${itemId}_${keyName}`}>
        <div><Checkbox /></div>
        <div><div>{keyName}</div></div>
        <div><div>{aclData.name}</div></div>
        <div>
          <AclSkudChecker
            addkey={`${itemId}_${keyName}_per`}
            checkboxes={aclData.items}
            on_change={onChange}
            data={{ type: keyName }}
            forceSave={forceSave}

          />
        </div>
        <div className='sk-flex sk-table-triggers'>
          <div title='Скопировать строку' onClick={() => onCopy(userType ? 'template_row' : 'user_row', keyName)}><CopyOutlined /></div>
          <div title='Вставить строку' onClick={() => onPaste(userType ? 'template_row' : 'user_row', keyName)}><DiffOutlined /></div>
          <div title='Очистить строку' onClick={() => onClear(userType ? 'template_row' : 'user_row', keyName)}><ClearOutlined /></div>
        </div>
      </div>
    );
  });