import React, { useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isPreloadingEditProfilePopup, setIsPreloadingEditProfilePopup] =
    React.useState(false);
  const [isPreloadingAddPlacePopup, setIsPreloadingAddPlacePopup] =
    React.useState(false);
  const [isPreloadingEditAvatarPopup, setIsPreloadingEditAvatarPopup] =
    React.useState(false);
  const [loggedIn, setloggedIn] = React.useState(localStorage.getItem('loggedIn') || false);
  const [email, setEmail] = React.useState({});
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [tooltipTitle, setTooltipTitle] = useState("");
  const [tooltipIcon, setTooltipIcon] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfoServer(), api.getInitialCardsServer()])
        .then(([resUser, resCard]) => {
          setCurrentUser(resUser);
          setCards(resCard);
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`));
  }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c === card ? newCard : c))
        );
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`));
  }

  //Обработчик удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCardServer(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`));
  }

  //Обработчик данных юзера
  function handleUpdateUser(user) {
    setIsPreloadingEditProfilePopup(true);
    api
      .setUserInfoServer(user)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`))
      .finally(() => setIsPreloadingEditProfilePopup(false));
  }

  //Обработчик аватара юзера
  function handleUpdateAvatar(item) {
    setIsPreloadingEditAvatarPopup(true);
    api
      .setUserAvatarServer(item)
      .then((resUser) => {
        setCurrentUser(resUser);
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`))
      .finally(() => setIsPreloadingEditAvatarPopup(false));
  }

  function handleAddCard(item) {
    setIsPreloadingAddPlacePopup(true);
    api
      .addNewCardServer(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка ${error}`))
      .finally(() => setIsPreloadingAddPlacePopup(false));
  }

  function showErrorInfoTooltip() {
    setIsInfoTooltipPopupOpen(true);
    setTooltipTitle("Что-то пошло не так!");
    setTooltipIcon("fail");
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsInfoTooltipPopupOpen(true);
        setTooltipTitle("Вы успешно зарегистрировались!");
        setTooltipIcon("success");
      })
      .catch((error) => {
        showErrorInfoTooltip();
        console.log(`Произошла ошибка ${error}`);
      });
  }



  const handleTokenCheck = () => {
  if (localStorage.getItem('loggedIn')) {
      auth
        .getData()
        .then((data) => {
          setloggedIn(true);
          setEmail(data.email);
          navigate("/", { replace: true });
        })
        .catch((error) => console.log(`Произошла ошибка ${error}`));
    }};

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        localStorage.setItem('loggedIn', true);
        setEmail(email);
        setloggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        showErrorInfoTooltip();
        console.log(`Произошла ошибка ${error}`);
      });
  }

  function signOut() {
    setloggedIn(false);
    localStorage.removeItem('loggedIn');
  }

  React.useEffect(() => {

    handleTokenCheck();
 
  },[]);
  
  return (
    
    <CurrentUserContext.Provider value={currentUser}>
    
      <div className="page">
        <Header 
        email={email} 
        signOut={signOut} 
        loggedIn={loggedIn} 
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />

          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloadingEditProfilePopup={isPreloadingEditProfilePopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          isPreloadingAddPlacePopup={isPreloadingAddPlacePopup}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloadingEditAvatarPopup={isPreloadingEditAvatarPopup}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          title={tooltipTitle}
          icon={tooltipIcon}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
