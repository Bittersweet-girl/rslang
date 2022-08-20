/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './header.scss';
import { IRender } from '../../interfaces/interfaces';

export default function Header(props: IRender) {
  return (
    <header className="header">
      <div className="header-content">
        <button type="button" className="header__logo_btn" onClick={() => props.setRender('main')}> </button>
        <nav className="header-menu">
          <button type="button" className="header-menu__button btn header-menu__button_dict" onClick={() => props.setRender('dict')}>Учебник</button>
          <button type="button" className="header-menu__button btn header-menu__button_audio" onClick={() => props.setRender('audio')}>Аудиовызов</button>
          <button type="button" className="header-menu__button btn header-menu__button_sprint" onClick={() => props.setRender('sprint')}>Спринт</button>
          <button type="button" className="header-menu__button btn header-menu__button_stat" onClick={() => props.setRender('statistic')}>Статистика</button>
          <button type="button" className="header-menu__button btn header-menu__button_about" onClick={() => props.setRender('about')}>О Команде</button>
        </nav>
        <button type="button" className="header__user btn">Войти</button>
      </div>
    </header>
  );
}
