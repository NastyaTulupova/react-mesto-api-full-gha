import React from "react";
import tooltipFail from "../images/Tooltip_Fail.svg";
import tooltipSuccess from "../images/Tooltip_Success.svg";

function InfoTooltip({ isOpen, onClose, title, icon }) {
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__tooltip-container">
        <div className="popup__tooltip-icon">
          {icon === "success" && (
            <img src={tooltipSuccess} alt="Операция выполнена успешно" />
          )}
          {icon === "fail" && (
            <img src={tooltipFail} alt="Ошибка выполнения операции" />
          )}
        </div>
        <h2 className="popup__tooltip-title">{title}</h2>
        <button type="button" className="popup__close-icon" onClick={onClose} />
      </div>
    </div>
  );
}

export default InfoTooltip;
