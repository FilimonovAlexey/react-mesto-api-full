import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register(props) {
  const [formParams, setFormParams] = useState({
    email: "",
    password: "",
  });
  
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.handleRegister(formParams);
  }

  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} alt="лого место" />
        <Link to="/sign-in" className="header__nav-link">
          Войти
        </Link>
      </header>

      <form className="entry-form" onSubmit={handleSubmit}>
        <h2 className="entry-form__title">Регистрация</h2>
        <input
          value={formParams.email}
          onChange={handleChange}
          name="email"
          type="email"
          className="entry-form__input"
          placeholder="Email"
          autoComplete="off"
        ></input>
        <span className="entry-form__input-error"></span>
        <input
          value={formParams.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="entry-form__input"
          placeholder="Пароль"
          autoComplete="off"
        ></input>
        <span className="entry-form__input-error"></span>
        <button type="submit" className="entry-form__button">
          Зарегистрироваться
        </button>
        <div className="register-signin">
          <p className="register-signin__p">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register-signin__link">
            Войти
          </Link>
        </div>
      </form>
    </>
  );
}

export default Register;
