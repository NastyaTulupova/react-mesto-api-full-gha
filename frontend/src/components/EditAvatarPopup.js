import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isPreloadingEditAvatarPopup,
}) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isPreloadingEditAvatarPopup ? "Сохранение..." : "Сохранить"}
    >
      <div className="form__input-container">
        <input
          required
          type="url"
          className="form__item"
          id="avatar-input"
          name="avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef}
        />
        <span className="error" id="avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
