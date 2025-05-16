import React, { useEffect, useState, useId } from "react";
import { ACLSKUDROW, ACLSKUDROW2 } from "./AclSkudData";
import { CheckOutlined } from "@ant-design/icons";





const AclSkudChecker = (props) => {

    const [byteNum, setByteNum] = useState(0);
    const [selected, setSelected] = useState(true);
 
    const [checkboxes, setCheckboxes] = useState(
        {
          param_pers_create: false,
          param_pers_edit: false,
          param_pers_approve: false,
          param_subo_create: false,
          param_subo_edit: false,
          param_subo_approve: false,
          param_any_create: false,
          param_any_edit: false,
          param_any_approve: false,
      }
    );

    const handleChecboxToggle = (ev, key) => {
        // Если бит уже установлен - снимаем его, иначе добавляем
        // const newByteNum = byteNum & byte ? byteNum & ~byte : byteNum | byte;

        // if (ev.shiftKey){
        //     console.log(234523);
        // }

        // setByteNum(newByteNum);

        // console.log(newByteNum, newByteNum.toString(2).padStart(5,'0'));
        console.log('checkboxes', checkboxes[key])

      setCheckboxes((prev) => ({
            ...prev,
            [key]: !checkboxes[key],
          }));
        // Если нужно передать значение родительскому компоненту
        // if (props.onChange) {
        //     props.onChange(newByteNum);
        // }
        console.log('checkboxes', checkboxes)
    };

    // Проверяем, установлен ли бит для конкретного чекбокса
    const isChecked = (byte) => (byteNum & byte) === byte;

  return (
    <div className={'sk-table-aclskud-multicol'} >
      {Object.entries(checkboxes).map(([key, value])=>(
        <div
            className={`sk-aclchecker ${isChecked(value) ? 'ack-checked' : ''} ${setSelected ? 'ack-selected' : ''}`}
            title={key}
            onClick={(ev)=>{handleChecboxToggle(ev, key)}}
        >
            <div>{value && <CheckOutlined />}</div>
        </div>
      ))}
      </div>
  );
};

export default AclSkudChecker;