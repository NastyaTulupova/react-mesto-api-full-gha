import React from "react";
import heartVector from "../images/Heart_Vector.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  const [isLiked, setisLiked] = React.useState(card.likes.some((i) => i === currentUser._id));
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some((i) => i === currentUser._id);

  //Создаём переменную, которую после зададим в `className` для кнопки лайка

  const [cardLikeButtonClassName, setcardLikeButtonClassName] = React.useState(`gallery__heart ${
    isLiked && "gallery__heart_active"
  }`);



  React.useEffect(() => {

    setisLiked (card.likes.some((i) => i === currentUser._id))
    setcardLikeButtonClassName (`gallery__heart ${
      isLiked && "gallery__heart_active"
    }`)
 
  },[card.likes, isLiked, currentUser._id]);


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="gallery__item">
      <img
        className="gallery__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="gallery__title-heart-area">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like-conteiner">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          >
            <img src={heartVector} alt="Изображение иконки сердца" />
          </button>
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="gallery__trash"
          onClick={handleDeleteClick}
        />
      )}
    </li>
  );
}

export default Card;
