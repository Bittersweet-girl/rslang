/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './header.scss';
import { IRender } from '../../interfaces/interfaces';

export default function Header(props: IRender) {
  const colors = [
    { backgroundColor: '' },
    { backgroundColor: '#FDE500' },
    { backgroundColor: '#FE941B' },
    { backgroundColor: '#4FCB64' },
    { backgroundColor: '#15C9FE' },
    { backgroundColor: '#FE95D0' },
    { backgroundColor: '#CC62A5' },
  ];
  function changePage(page: string) {
    props.setRender(page);
    sessionStorage.setItem('page', page);
  }
  return (
    <header className="header">
      <div className="header-content">
        <button type="button" className="header__logo_btn" onClick={() => changePage('main')}> </button>
        <nav className="header-menu">
          <button type="button" className="header-menu__button btn header-menu__button_dict" onClick={() => changePage('dict')} style={props.render === 'dict' ? colors[2] : colors[0]}>Учебник</button>
          <button type="button" className="header-menu__button btn header-menu__button_audio" onClick={() => changePage('audio')} style={props.render === 'audio' ? colors[3] : colors[0]}>Аудиовызов</button>
          <button type="button" className="header-menu__button btn header-menu__button_sprint" onClick={() => changePage('sprint')} style={props.render === 'sprint' ? colors[4] : colors[0]}>Спринт</button>
          <button type="button" className="header-menu__button btn header-menu__button_stat" onClick={() => changePage('statistic')} style={props.render === 'statistic' ? colors[5] : colors[0]}>Статистика</button>
          <button type="button" className="header-menu__button btn header-menu__button_about" onClick={() => changePage('about')} style={props.render === 'about' ? colors[6] : colors[0]}>О Команде</button>
        </nav>
        <button type="button" className="header__user btn">Войти</button>
      </div>
    </header>
  );
}
