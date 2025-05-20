import React, { useEffect, useState, memo  } from "react";
import { ACLSKUDROW, ACLSKUDROW2 } from "./AclSkudData";
import { CheckOutlined } from "@ant-design/icons";


const AclCheckbox = memo(({ checked, title, onToggle }) => {
  // console.log(`Render checkbox: ${title}`); // Для отладки перерисовок

  return (
    <div
      className={`sk-aclchecker ${checked ? "ack-checked" : ""}`}
      title={title}
      onClick={onToggle}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <div>{checked && <CheckOutlined />}</div>
    </div>
  );
});


const AclSkudChecker = (props) => {
    const [toSend, setToSend] = useState(null);
    const [lastToggled, setLastToggled] = useState(null);
    const [loaded, setLoaded] = useState(false);
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
    const [prevBox, setPrevBox] = useState(checkboxes);

    useEffect(() => {
      if (!loaded){
        setCheckboxes(
            {
              param_pers_create:  props.checkboxes.param_pers_create,
              param_pers_edit:    props.checkboxes.param_pers_edit,
              param_pers_approve: props.checkboxes.param_pers_approve,
              param_subo_create:  props.checkboxes.param_subo_create,
              param_subo_edit:    props.checkboxes.param_subo_edit, 
              param_subo_approve: props.checkboxes.param_subo_approve,
              param_any_create:   props.checkboxes.param_any_create,
              param_any_edit:     props.checkboxes.param_any_edit,  
              param_any_approve:  props.checkboxes.param_any_approve, 
          }
        )
        console.log('uFFECT', checkboxes);
        setLoaded(true);
      }
    }, [props.checkboxes]);

    const handleChecboxToggle = (ev, key) => {
        if (ev.shiftKey){
            let run = false;
            let setValue = null;
            console.log(lastToggled,key);
            let newChecks = JSON.parse(JSON.stringify(checkboxes));
            for (const keyer in newChecks) {
              if (Object.prototype.hasOwnProperty.call(newChecks, keyer)) {
                if (!run){
                  run = true;
                  setValue = !newChecks[keyer];
                };
                newChecks[keyer] = setValue;
                
              }
            }
            console.log(newChecks);
            setCheckboxes(newChecks);
        } else {

          setCheckboxes((prev) => ({
                ...prev,
                [key]: !checkboxes[key],
              }));
              setLastToggled(key);
        }
        setToSend(checkboxes);
    };

    useEffect(() => {
      
        props.on_change(checkboxes, props.data.type);
      
    }, [toSend]);

  return (
    <div className={'sk-table-aclskud-multicol'} >
      {Object.entries(checkboxes).map(([key, value])=>(
        <AclCheckbox 
        key={`accheck_${key}`}
        checked={checkboxes[key]}
        title={key}
        onToggle={(ev)=>{handleChecboxToggle(ev, key)}} ></AclCheckbox>

      ))}
      </div>
  );
};

export default AclSkudChecker;
