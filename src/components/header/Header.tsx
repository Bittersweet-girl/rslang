/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import './header.scss';
import { IHeaderProps } from '../../types';
import { COLORS, PAGE_DICTIONARY } from '../../constants';
import { UserContext } from '../../contexts';
import useNavigation from '../../hooks/useNavigation';

export default function Header(props: IHeaderProps) {
  const { page, navigate } = useNavigation();
  function changePage(newPage: string) {
    navigate(newPage);
  }
  const user = useContext(UserContext);

  return (
    <header className="header">
      <div className="header-content">
        <button type="button" className="header__logo_btn" onClick={() => changePage('main')}> </button>
        <nav className="header-menu">
          <div className="header-menu-list">
            <button
              type="button"
              className="header-menu__button btn header-menu__button_dict"
              onClick={() => changePage('dictionary')}
              style={page === PAGE_DICTIONARY ? COLORS[10] : COLORS[0]}
            >
              Учебник
            </button>
            <div className={page === PAGE_DICTIONARY ? 'header-menu-list-content-dict' : 'header-menu-list-content'}>
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
              {user && (
                <button
                  type="button"
                  className="header-menu-list__button btn header-menu-list__button_difficult"
                  onClick={() => changePage('dictionary')}
                >
                  Сложные слова
                </button>
              )}
            </div>
          </div>
          <button
            type="button"
            className="header-menu__button btn header-menu__button_audio"
            onClick={() => changePage('audio')}
            style={page === 'audio' ? COLORS[11] : COLORS[0]}
          >
            Аудиовызов
          </button>
          <button
            type="button"
            className="header-menu__button btn header-menu__button_sprint"
            onClick={() => changePage('sprint')}
            style={page === 'sprint' ? COLORS[12] : COLORS[0]}
          >
            Спринт

          </button>
          <button
            type="button"
            className="header-menu__button btn header-menu__button_stat"
            onClick={() => changePage('statistic')}
            style={page === 'statistic' ? COLORS[13] : COLORS[0]}
          >
            Статистика

          </button>
          <button
            type="button"
            className="header-menu__button btn header-menu__button_about"
            onClick={() => changePage('about')}
            style={page === 'about' ? COLORS[14] : COLORS[0]}
          >
            О Команде

          </button>
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
