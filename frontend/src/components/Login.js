import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    } else {
      onLogin(email, password);
    }
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        name="login"
        className="auth__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          required
          type="email"
          className="auth__form-item"
          id="email-input"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeEmail}
        />
        <span className="error" id="email-input-error"></span>

        <input
          required
          type="password"
          className="auth__form-item"
          id="password-input"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={handleChangePassword}
        />
        <span className="error" id="password-input-error"></span>

        <button type="submit" className="auth__form-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
