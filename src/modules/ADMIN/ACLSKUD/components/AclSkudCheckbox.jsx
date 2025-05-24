import React, { useEffect, useState, useRef, memo } from "react";
import { CheckOutlined } from "@ant-design/icons";

const AclCheckbox = memo(({ checked, title, onToggle }) => {
    const [isChecked, setIsChecked] = useState(checked);
    const toggleState = () => {
        setIsChecked(!isChecked);
        if (onToggle){
            onToggle();
        }
    }
    return (
  <div
    className={`sk-aclchecker ${checked ? "ack-checked" : ""}`}
    title={title}
    onClick={toggleState}
    style={{ cursor: "pointer", userSelect: "none" }}
  >
    {isChecked && <CheckOutlined />}
  </div>
)});

export default AclCheckbox;