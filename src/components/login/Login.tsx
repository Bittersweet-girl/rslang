import './login.scss';
import React, { useState } from 'react';

type LoginProps = {
  onClose: (event: React.MouseEvent<HTMLElement>) => void
};

export default function Login({ onClose }: LoginProps): JSX.Element {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  // const [nameError, setNameError] = useState('');

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    // if (!name) {
    //   setNameError('Введите имя');
    // }
    // TODO validation
  }
  return (
    <>
      <div className="backdrop" onClick={onClose} aria-hidden="true" />
      <div className="login-modal">
        <button type="button" className="login-modal__close" onClick={onClose}> </button>
        <h3 className="login-modal__title">
          Учиться интереснее когда
          {' '}
          <br />
          видишь свой прогресс!
        </h3>
        <p className="login-modal__description">
          Зарегестрируйтесь, чтобы иметь доступ к статистике Вашего обучения и иметь
          {' '}
          <br />
          {' '}
          возможность управлять словарем.
        </p>
        <form className="login-form" onSubmit={onSubmit}>
          {isSignup
          && (
          <input
            type="text"
            className="login-form__input"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          )}
          {/* {nameError && <span>{nameError}</span>} */}
          <input type="email" className="login-form__input" placeholder="E-mail" />
          <input type="password" className="login-form__input" placeholder="Пароль" id="userPassword" />
          {isSignup && <input type="password" className="login-form__input" placeholder="Подтвердите пароль" id="userPassword" />}
          <button
            type="submit"
            className={`btn login-form__submit ${isSignup ? 'login-form__submit--green' : ''}`}
          >
            {isSignup ? 'Зарегестрироваться' : 'Войти'}

          </button>
        </form>
        <div className="login-modal__footer">
          <span>{isSignup ? 'Уже есть аккаунт?' : 'Еще нет аккаунта'}</span>
          <button
            type="button"
            className={`login-modal__footer-btn ${isSignup ? 'login-modal__footer-btn--red' : ''}`}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Войти' : 'Зарегестрироваться'}

          </button>
        </div>
      </div>
    </>
  );
}
