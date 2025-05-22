import React, { useEffect, useState, useRef, memo } from "react";
import { CheckOutlined } from "@ant-design/icons";

const AclCheckbox = memo(({ checked, title, onToggle }) => (
  <div
    className={`sk-aclchecker ${checked ? "ack-checked" : ""}`}
    title={title}
    onClick={onToggle}
    style={{ cursor: "pointer", userSelect: "none" }}
  >
    {checked && <CheckOutlined />}
  </div>
));

const DEBOUNCE_DELAY = 3000; // 3 секунды

const AclSkudChecker = ({ checkboxes: initialCheckboxes, data, on_change, onForceSave, canClose }) => {
  const [checkboxes, setCheckboxes] = useState({ ...initialCheckboxes });
  const [status, setStatus] = useState("saved"); // saved | pending | saving
  const debounceTimer = useRef(null);
  const prevCheckboxes = useRef(initialCheckboxes);

  // Обновляем локальное состояние при изменении пропсов
  useEffect(() => {
    setCheckboxes({ ...initialCheckboxes });
    prevCheckboxes.current = initialCheckboxes;
    setStatus("saved");
  }, [initialCheckboxes]);

  const handleCheckboxToggle = (ev, key) => {
    setCheckboxes((prev) => {
      const newState = { ...prev };
      if (ev.shiftKey) {
        let run = false;
        let setValue = null;
        for (const k in newState) {
          if (!run) {
            run = true;
            setValue = !newState[k];
          }
          newState[k] = setValue;
        }
      } else {
        newState[key] = !prev[key];
      }
      return newState;
    });
    setStatus("pending");
  };

  // Функция сохранения — вызывается и по таймеру, и принудительно
  const saveChanges = () => {
    if (JSON.stringify(prevCheckboxes.current) === JSON.stringify(checkboxes)) {
      // Нет изменений — ничего не делаем
      setStatus("saved");
      return Promise.resolve();
    }
    setStatus("saving");
    return new Promise((resolve) => {
      on_change(checkboxes, data.type);
      prevCheckboxes.current = checkboxes;
      setStatus("saved");
      resolve();
    });
  };

  // Debounce эффект для автоматического сохранения
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (status === "pending") {
      debounceTimer.current = setTimeout(() => {
        saveChanges();
        debounceTimer.current = null;
      }, DEBOUNCE_DELAY);
    }
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [checkboxes, status]);

  // Обработка принудительного сохранения при закрытии
  // useEffect(() => {
  //   if (canClose) {
  //     console.log('ONFORCE');  
  //     // Если есть несохранённые изменения — сохранить перед закрытием
  //     if (status === "pending") {
  //       if (debounceTimer.current) {
  //         clearTimeout(debounceTimer.current);
  //         debounceTimer.current = null;
  //       }
  //       saveChanges().then(() => {
  //         if (onForceSave) onForceSave(); 
  //       });
  //     } else {
  //       if (onForceSave) onForceSave();
  //     }
  //   }
  // }, [canClose]);

  return (
    <div className={`sk-table-aclskud-multicol ${status === "pending" ? 'sk-pending-row' : ''} ${status === "saving" ? 'sk-saving-row' : ''} ${status === "saved" ? 'sk-saved-row' : ''}`}>
      {Object.entries(checkboxes).map(([key, value]) => (
        <AclCheckbox
          key={`accheck_${key}`}
          checked={value}
          title={key}
          onToggle={(ev) => handleCheckboxToggle(ev, key)}
        />
      ))}
      {/* <div style={{ marginTop: 8, fontSize: 12, color: status === "pending" ? "orange" : status === "saving" ? "blue" : "green" }}>
        {status === "pending" && "Есть несохранённые изменения"}
        {status === "saving" && "Сохраняем..."}
        {status === "saved" && "Все изменения сохранены"}
      </div> */}
    </div>
  );
};

export default AclSkudChecker;
