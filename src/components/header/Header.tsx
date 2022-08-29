/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import './header.scss';
import { IRender } from '../../types';
import { COLORS } from '../../constants';
import { UserContext } from '../../contexts';

export default function Header(props: IRender) {
  function changePage(page: string) {
    props.setRender(page);
    sessionStorage.setItem('page', page);
  }
  const user = useContext(UserContext);

  return (
    <header className="header">
      <div className="header-content">
        <button type="button" className="header__logo_btn" onClick={() => changePage('main')}> </button>
        <nav className="header-menu">
          <div className="header-menu-list">
            <button type="button" className="header-menu__button btn header-menu__button_dict" onClick={() => changePage('dictionary')} style={props.render === 'dictionary' ? COLORS[10] : COLORS[0]}>Учебник</button>
            <div className={props.render === 'dictionary' ? 'header-menu-list-content-dict' : 'header-menu-list-content'}>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_one"
                onClick={() => {
                  changePage('dictionary');
                  sessionStorage.setItem('group', '0');
                }}
              >
                Раздел первый
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_two"
                onClick={() => {
                  changePage('dictionary');
                  sessionStorage.setItem('group', '1');
                }}
              >
                Раздел второй
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_three"
                onClick={() => {
                  changePage('dictionary');
                  sessionStorage.setItem('group', '2');
                }}
              >
                Раздел третий
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_four"
                onClick={() => {
                  changePage('dictionary');
                  sessionStorage.setItem('group', '3');
                }}
              >
                Раздел четвертый
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_five"
                onClick={() => {
                  changePage('dictionary');
                  sessionStorage.setItem('group', '4');
                }}
              >
                Раздел пятый
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_six"
                onClick={() => {
                  changePage('dictionary');
                  sessionStorage.setItem('group', '5');
                }}
              >
                Раздел шестой
              </button>
              <button
                type="button"
                className="header-menu-list__button btn header-menu-list__button_difficult"
                onClick={() => changePage('dictionary')}
              >
                Сложные слова
              </button>
            </div>
          </div>
          <button type="button" className="header-menu__button btn header-menu__button_audio" onClick={() => changePage('audio')} style={props.render === 'audio' ? COLORS[11] : COLORS[0]}>Аудиовызов</button>
          <button type="button" className="header-menu__button btn header-menu__button_sprint" onClick={() => changePage('sprint')} style={props.render === 'sprint' ? COLORS[12] : COLORS[0]}>Спринт</button>
          <button type="button" className="header-menu__button btn header-menu__button_stat" onClick={() => changePage('statistic')} style={props.render === 'statistic' ? COLORS[13] : COLORS[0]}>Статистика</button>
          <button type="button" className="header-menu__button btn header-menu__button_about" onClick={() => changePage('about')} style={props.render === 'about' ? COLORS[14] : COLORS[0]}>О Команде</button>
        </nav>
        {!user && (
          <button
            type="button"
            className="header__user btn"
            onClick={props.onLoginClick}
          >
            Войти
          </button>
        )}
        {user && (
          <button
            type="button"
            className="header__user_logout btn"
            onClick={props.signout}
          >
            Выйти
          </button>
        )}

      </div>
    </header>
  );
}
