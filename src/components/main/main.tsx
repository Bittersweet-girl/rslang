import React from 'react';
import './main.scss';

export default function Main() {
  return (
    <main className="main">
      <div className="main-content">
        <div className="main-top">
          <div className="main-top-text">
            <h1 className="main-top__title">Изучай английский весело!</h1>
            <p className="main-top__text">
              Изучать английский можно и без скучной
              зубрежки! Узнавай, играй, запоминай и следи
              за своими достижениями!
            </p>
          </div>
          <div className="main-top-img" />
        </div>
      </div>
    </main>
  );
}
