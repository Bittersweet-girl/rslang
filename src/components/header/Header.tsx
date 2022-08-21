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
          <div className="header-menu-list">
            <button type="button" className="header-menu__button btn header-menu__button_dict" onClick={() => props.setRender('dict')}>Учебник</button>
            <div className="header-menu-list-content">
              <button type="button" className="header-menu-list__button btn header-menu-list__button_one">Раздел первый</button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_two">Раздел второй</button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_three">Раздел третий</button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_four">Раздел четвертый</button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_five">Раздел пятый</button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_six">Раздел шестой</button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_difficult">Сложные слова</button>
            </div>
          </div>
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
