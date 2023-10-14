import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isPreloadingEditProfilePopup,
}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isPreloadingEditProfilePopup ? "Сохранение..." : "Сохранить"}
    >
      <div className="form__input-container">
        <input
          required
          type="text"
          className="form__item"
          id="name-input"
          name="name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          value={name || ""}
        />
        <span className="error" id="name-input-error"></span>
      </div>
      <div className="form__input-container">
        <input
          required
          type="text"
          className="form__item"
          id="about-input"
          name="about"
          placeholder="Ваш род деятельности"
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          value={description || ""}
        />
        <span className="error" id="about-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
