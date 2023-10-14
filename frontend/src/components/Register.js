import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  //здесь будут данные, введенные в форму:
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(password, email);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        name="register"
        className="auth__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          required
          type="url"
          className="auth__form-item"
          id="email-input"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
        />
        <span className="error" id="email-input-error"></span>

        <input
          required
          type="password"
          className="auth__form-item"
          id="password-input"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        />
        <span className="error" id="password-input-error"></span>

        <button type="submit" className="auth__form-button">
          Зарегистрироваться
        </button>
        <Link className="auth__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
