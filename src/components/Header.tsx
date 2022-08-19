/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { IRender } from './interfaces';

export function Header(props: IRender) {
  return (
    <div className="header">
      <div className="logo" onClick={() => props.setRender('main')}>Logo</div>
      <nav className="header__menu">
        <button type="button" className="header__menu_button" onClick={() => props.setRender('dict')}>Dictionary</button>
        <button type="button" className="header__menu_button" onClick={() => props.setRender('audio')}>Audio game</button>
        <button type="button" className="header__menu_button" onClick={() => props.setRender('sprint')}>Sprint game</button>
        <button type="button" className="header__menu_button" onClick={() => props.setRender('statistic')}>Statistic</button>
        <button type="button" className="header__menu_button" onClick={() => props.setRender('about')}>About App</button>
      </nav>
    </div>
  );
}
