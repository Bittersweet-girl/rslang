/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './header.scss';
import { IRender } from '../../interfaces/interfaces';
import { COLORS } from '../constants';

export default function Header(props: IRender) {
  function changePage(page: string) {
    props.setRender(page);
    sessionStorage.setItem('page', page);
  }
  return (
    <header className="header">
      <div className="header-content">
        <button type="button" className="header__logo_btn" onClick={() => changePage('main')}> </button>
        <nav className="header-menu">
          <div className="header-menu-list">
            <button type="button" className="header-menu__button btn header-menu__button_dict" onClick={() => changePage('dict')} style={props.render === 'dict' ? COLORS[2] : COLORS[0]}>Учебник</button>
            <div className="header-menu-list-content">
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_one"
                onClick={() => {
                  changePage('dict');
                  sessionStorage.setItem('group', '0');
                }}
              >
                Раздел первый
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_two"
                onClick={() => {
                  changePage('dict');
                  sessionStorage.setItem('group', '1');
                }}
              >
                Раздел второй
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_three"
                onClick={() => {
                  changePage('dict');
                  sessionStorage.setItem('group', '2');
                }}
              >
                Раздел третий
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_four"
                onClick={() => {
                  changePage('dict');
                  sessionStorage.setItem('group', '3');
                }}
              >
                Раздел четвертый
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_five"
                onClick={() => {
                  changePage('dict');
                  sessionStorage.setItem('group', '4');
                }}
              >
                Раздел пятый
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_six"
                onClick={() => {
                  changePage('dict');
                  sessionStorage.setItem('group', '5');
                }}
              >
                Раздел шестой
              </button>
              <button type="button" className="header-menu-list__button btn header-menu-list__button_difficult" onClick={() => changePage('dict')}>Сложные слова</button>
            </div>
          </div>
          <button type="button" className="header-menu__button btn header-menu__button_audio" onClick={() => changePage('audio')} style={props.render === 'audio' ? COLORS[3] : COLORS[0]}>Аудиовызов</button>
          <button type="button" className="header-menu__button btn header-menu__button_sprint" onClick={() => changePage('sprint')} style={props.render === 'sprint' ? COLORS[4] : COLORS[0]}>Спринт</button>
          <button type="button" className="header-menu__button btn header-menu__button_stat" onClick={() => changePage('statistic')} style={props.render === 'statistic' ? COLORS[5] : COLORS[0]}>Статистика</button>
          <button type="button" className="header-menu__button btn header-menu__button_about" onClick={() => changePage('about')} style={props.render === 'about' ? COLORS[6] : COLORS[0]}>О Команде</button>
        </nav>
        <button
          type="button"
          className="header__user btn"
          onClick={props.onLoginClick}
        >
          Войти

        </button>
      </div>
    </header>
  );
}
