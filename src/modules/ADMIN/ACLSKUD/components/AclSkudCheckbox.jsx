import React, { useEffect, useState, useRef, memo } from "react";
import { CheckOutlined, StopOutlined } from "@ant-design/icons";

const AclCheckbox = memo(({ checked, title, onToggle, user_id, column_id, row_id, depart_id = null }) => {
    const [isChecked, setIsChecked] = useState(checked);
    const [blinClass, setBlinClass] = useState(false);
    const toggleState = (ev) => {
      if (onToggle){
        onToggle(ev, user_id, column_id, row_id, !isChecked, depart_id);
      }
      setIsChecked(!isChecked);
    }
    // if (user_id === 46){
    //   console.log(checked, user_id, column_id, row_id, depart_id );
    // }

    useEffect(() => {
      setIsChecked(checked);
      setBlinClass(true);

      setTimeout(() => {
        setBlinClass(false);
      }, 1400);
    }, [checked]);

    return (
  <div
    className={`sk-aclchecker ${checked ? "ack-checked" : ""} ${blinClass ? "ack-checke-blink" : ""} `}
    title={title}
    onMouseDown={toggleState}
    style={{ cursor: "pointer", userSelect: "none" }}
  >
    {isChecked ? <CheckOutlined style={{color: 'green'}} /> : <StopOutlined style={{color: 'red'}}/>}
  </div>
)});

export default AclCheckbox;