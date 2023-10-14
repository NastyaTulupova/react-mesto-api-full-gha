import React from "react";

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__image-container">
        <figure>
          <img className="popup__image" alt={card.name} src={card.link} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
        <button
          type="button"
          className="popup__close-icon popup__close-icon_type_image"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
