import React from 'react';
import './sprint.scss';

export default function StartScreen({ onStartGameClick }:any) {
  return (
    <div className="Start-screen">
      <h1>Стартовое окно</h1>

      <button
        type="button"
        className="game__btn game__button-yes"
        onClick={onStartGameClick}
      >
        Начать
      </button>

    </div>
  );
}
