/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import { COLORS } from '../../constants';
import { IDictMenu } from '../../types';
import { UserContext } from '../../contexts';

export default function DictionaryMenu(props: IDictMenu) {
  const user = useContext(UserContext);
  const {
    group, changeGroup,
  } = props;
  return (
    <nav className="dictionary-menu">
      <button
        type="button"
        className="dictionary-menu__button dictionary-menu__button_first btn"
        onClick={() => {
          changeGroup(0);
          sessionStorage.setItem('group', '0');
        }}
        style={group === 0 ? COLORS[1] : COLORS[0]}
      >
        <span className="dictionary__button-sub" style={group === 0 ? COLORS[8] : COLORS[9]}>A1</span>
        Начальный
      </button>
      <button
        type="button"
        className="dictionary-menu__button dictionary-menu__button_second btn"
        onClick={() => {
          changeGroup(1);
          sessionStorage.setItem('group', '1');
        }}
        style={group === 1 ? COLORS[2] : COLORS[0]}
      >
        <span className="dictionary__button-sub" style={group === 1 ? COLORS[8] : COLORS[9]}>A2</span>
        Начальный
      </button>
      <button
        type="button"
        className="dictionary-menu__button dictionary-menu__button_third btn"
        onClick={() => {
          changeGroup(2);
          sessionStorage.setItem('group', '2');
        }}
        style={group === 2 ? COLORS[3] : COLORS[0]}
      >
        <span className="dictionary__button-sub" style={group === 2 ? COLORS[8] : COLORS[9]}>B1</span>
        Средний
      </button>
      <button
        type="button"
        className="dictionary-menu__button dictionary-menu__button_fourth btn"
        onClick={() => {
          changeGroup(3);
          sessionStorage.setItem('group', '3');
        }}
        style={group === 3 ? COLORS[4] : COLORS[0]}
      >
        <span className="dictionary__button-sub" style={group === 3 ? COLORS[8] : COLORS[9]}>B2</span>
        Средний
      </button>
      <button
        type="button"
        className="dictionary-menu__button dictionary-menu__button_fifth btn"
        onClick={() => {
          changeGroup(4);
          sessionStorage.setItem('group', '4');
        }}
        style={group === 4 ? COLORS[5] : COLORS[0]}
      >
        <span className="dictionary__button-sub" style={group === 4 ? COLORS[8] : COLORS[9]}>С1</span>
        Сложный
      </button>
      <button
        type="button"
        className="dictionary-menu__button dictionary-menu__button_sixth btn"
        onClick={() => {
          changeGroup(5);
          sessionStorage.setItem('group', '5');
        }}
        style={group === 5 ? COLORS[6] : COLORS[0]}
      >
        <span className="dictionary__button-sub" style={group === 5 ? COLORS[8] : COLORS[9]}>С2</span>
        Сложный
      </button>
      {user && (
        <button
          type="button"
          className="dictionary-menu__button dictionary-menu__button_seven btn"
          onClick={() => {
            changeGroup(6);
            sessionStorage.setItem('group', '6');
          }}
          style={group === 6 ? COLORS[7] : COLORS[0]}
        >
          <span className="dictionary__button-sub dictionary__button-sub_dot" style={group === 6 ? COLORS[8] : COLORS[9]}>●</span>
          Сложные слова
        </button>
      )}
    </nav>
  );
}
