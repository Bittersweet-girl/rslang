import './login.scss';
import React, { useState } from 'react';
import { create, signin } from '../../api/user';
import { UserSigninResp } from '../../types';

type LoginProps = {
  onClose: () => void,
  setUser: (data: UserSigninResp) => void,
};

export default function Login({ onClose, setUser }: LoginProps): JSX.Element {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [nameError, setNameError] = useState('');
  const [passError, setPassError] = useState('');
  const [passLengthError, setPassLengthError] = useState('');

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (isSignup && !name) {
      setNameError('Введите имя');
      return;
    }
    if (password.length < 8) {
      setPassLengthError('Пароль должен быть не менее 8 символов');
      return;
    }
    if (isSignup && !confirmPassword) {
      setPassError('Введите подтверждение пароля!');
      return;
    }
    if (isSignup && (password !== confirmPassword)) {
      setPassError('Пароли не совпадают!');
      return;
    }

    try {
      if (isSignup) {
        await create({ name, email, password });
      }
      const { data } = await signin({ email, password });
      localStorage.setItem('user', JSON.stringify(data));
      setError('');
      setUser(data);
      onClose();
    } catch (err) {
      setError(String(err));
    }
  }

  return (
    <>
      <div className="backdrop" onClick={onClose} aria-hidden="true" />
      <div className={`login-modal ${error ? 'login-modal_error' : ''}`}>
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
          {error && <p className="login-form__error">{error}</p>}
          {nameError && <p className="login-form__error">{nameError}</p>}
          {isSignup
          && (
          <input
            type="text"
            className={`login-form__input ${nameError ? 'login-form__input_error' : ''}`}
            placeholder="Имя"
            value={name}
            onChange={(e) => {
              setError('');
              setNameError('');
              setName(e.target.value);
            }}
          />
          )}
          <input
            type="email"
            className="login-form__input"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setError('');
              setEmail(e.target.value);
            }}
          />
          {passLengthError && <p className="login-form__error">{passLengthError}</p>}
          <input
            type="password"
            className={`login-form__input ${passLengthError ? 'login-form__input_error' : ''}`}
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setError('');
              setPassLengthError('');
              setPassword(e.target.value);
            }}
            onBlur={() => {
              if (password.length < 8) {
                setPassLengthError('Пароль должен быть не менее 8 символов');
              }
            }}
          />
          {passError && <p className="login-form__error">{passError}</p>}
          {isSignup && (
          <input
            type="password"
            className={`login-form__input ${passError ? 'login-form__input_error' : ''}`}
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => {
              setError('');
              setPassError('');
              setConfirmPassword(e.target.value);
            }}
            onBlur={() => {
              if (isSignup && !confirmPassword) {
                setPassError('Введите подтверждение пароля!');
                return;
              }
              if (isSignup && (password !== confirmPassword)) {
                setPassError('Пароли не совпадают!');
              }
            }}
          />
          )}
          <button
            type="submit"
            className={`btn login-form__submit ${isSignup ? 'login-form__submit_green' : ''}`}
          >
            {isSignup ? 'Зарегестрироваться' : 'Войти'}

          </button>
        </form>
        <div className="login-modal__footer">
          <span>{isSignup ? 'Уже есть аккаунт?' : 'Еще нет аккаунта'}</span>
          <button
            type="button"
            className={`login-modal__footer-btn ${isSignup ? 'login-modal__footer-btn_red' : ''}`}
            onClick={() => {
              setError('');
              setNameError('');
              setPassError('');
              setPassLengthError('');
              setIsSignup(!isSignup);
            }}
          >
            {isSignup ? 'Войти' : 'Зарегестрироваться'}

          </button>
        </div>
      </div>
    </>
  );
}
