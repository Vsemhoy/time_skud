import React, { useEffect, useState, useId } from "react";
import { ACLSKUDROW } from "./AclSkudData";
import { CheckOutlined } from "@ant-design/icons";





const AclSkudChecker = (props) => {

    const [byteNum, setByteNum] = useState(0);
    const [selected, setSelected] = useState(true);
 
    const handleChecboxToggle = (ev, byte) => {
        // Если бит уже установлен - снимаем его, иначе добавляем
        const newByteNum = byteNum & byte ? byteNum & ~byte : byteNum | byte;

        if (ev.shiftKey){
            console.log(234523);
        }

        setByteNum(newByteNum);

        console.log(newByteNum, newByteNum.toString(2).padStart(5,'0'));
        

        // Если нужно передать значение родительскому компоненту
        if (props.onChange) {
            props.onChange(newByteNum);
        }
    };

    // Проверяем, установлен ли бит для конкретного чекбокса
    const isChecked = (byte) => (byteNum & byte) === byte;

  return (
    <div className={'sk-table-aclskud-multicol'} >
      {ACLSKUDROW.map((acc)=>(
        <div
            className={`sk-aclchecker ${isChecked(acc.byte) ? 'ack-checked' : ''} ${setSelected ? 'ack-selected' : ''}`}
            title={acc.title}
            onClick={(ev)=>{handleChecboxToggle(ev, acc.byte)}}
        >
            <div>{isChecked(acc.byte) && <CheckOutlined />}</div>
        </div>
      ))}
      </div>
  );
};

export default AclSkudChecker;