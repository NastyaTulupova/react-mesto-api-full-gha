import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../images/Logo.svg";

function Header({ email, loggedIn, signOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Лого сервиса Mesto" className="header__logo" />
      {loggedIn ? (
        <div className="header__navigation">
          <p className="header__email">{email}</p>
          <Link className="header__link" to="/sign-in" onClick={signOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          className="header__link"
          to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
        >
          {location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
        </Link>
      )}
    </header>
  );
}

export default Header;
