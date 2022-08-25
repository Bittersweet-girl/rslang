import './login.scss';
import React, { useState } from 'react';
import { create, signin, UserSigninResp } from '../../api/user';

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

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    // if (!name) {
    //   setNameError('Введите имя');
    // }
    // TODO validation
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
          {error && <span className="login-form__error">{error}</span>}
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
          <input
            type="email"
            className="login-form__input"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-form__input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
          <input
            type="password"
            className="login-form__input"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          )}
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
