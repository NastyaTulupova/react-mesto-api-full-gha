import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <form
          className={`form form_type_${name}`} 
          name={`${name}-form`} 
          noValidate
          onSubmit={onSubmit}
        >
          <h3 className="form__title">{title}</h3>
          <div className="form__inputs-container">
            {children}
            <button type="submit" className="form__button">
              {buttonText}
            </button>
          </div>
        </form>
        <button
          type="button"
          className="popup__close-icon"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
