import React, { useEffect, useState, useRef, memo } from "react";
import { CheckOutlined } from "@ant-design/icons";

const AclCheckbox = memo(({ checked, title, onToggle, user_id, column_id, row_id, depart_id }) => {
    const [isChecked, setIsChecked] = useState(checked);
    
    const toggleState = (ev) => {
      if (onToggle){
        onToggle(ev, user_id, depart_id, column_id, row_id, !isChecked);
      }
      setIsChecked(!isChecked);
    }
    // if (user_id === 46){
    //   console.log(checked, user_id, column_id, row_id, depart_id );
    // }

    useEffect(() => {
      setIsChecked(checked)
    }, [checked]);

    return (
  <div
    className={`sk-aclchecker ${checked ? "ack-checked" : ""}`}
    title={title}
    onMouseDown={toggleState}
    style={{ cursor: "pointer", userSelect: "none" }}
  >
    {isChecked && <CheckOutlined />}
  </div>
)});

export default AclCheckbox;