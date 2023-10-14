import React, { useState } from "react";

function Login({ onLogin }) {
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
    if (!formValue.email || !formValue.password) {
      return;
    } else {
      const { email, password } = formValue;
      onLogin(password, email);
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
