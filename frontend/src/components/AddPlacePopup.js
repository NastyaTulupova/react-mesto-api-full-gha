import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isPreloadingAddPlacePopup,
}) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  React.useEffect(() => {
   setPlaceName("");
   setPlaceLink("");
  }, [isOpen]);

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceLink(e) {
    setPlaceLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isPreloadingAddPlacePopup ? "Сохранение..." : "Создать"}
    >
      <div className="form__input-container">
        <input
          required
          type="text"
          className="form__item"
          id="place-name-input"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={placeName ?? ""}
          onChange={handleChangePlaceName}
        />
        <span className="error" id="place-name-input-error"></span>
      </div>
      <div className="form__input-container">
        <input
          required
          type="url"
          className="form__item"
          id="link-input"
          name="link"
          placeholder="Ссылка на картинку"
          value={placeLink ?? ""}
          onChange={handleChangePlaceLink}
        />
        <span className="error" id="link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
