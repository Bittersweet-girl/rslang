/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { IRender } from './interfaces';

export default function Header(props: IRender) {
  return (
    <div className="header">
      <button type="button" className="logo" onClick={() => props.setRender('main')}>Logo</button>
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
