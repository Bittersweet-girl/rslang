import React from 'react';
import './sprint.scss';
import Timer from './Timer';

export default function SprintGame() {
  return (
    <div className="sprint-game">
      <div className="sprint-game__status">
        <div className="sprint-game__score-status">

          <div className="sprint-game__success-row">
            <div className="sprint-game__success-item" />
            <div className="sprint-game__success-item" />
            <div className="sprint-game__success-item" />
          </div>
          <p>+10 очков за слово</p>

        </div>
        <Timer time={30} onTimeUp={() => {}} />
        <div className="sprint-game__score">0</div>
      </div>
      <p className="sprint-game__word">Spring</p>
      <p className="sprint-game__translate">Весна</p>
      <div className="sprint-game__controllers">
        <button
          type="button"
          className="game__btn game__button-no"
          onClick={() => {}}
        >
          Неверно
        </button>
        <button
          type="button"
          className="game__btn game__button-yes"
          onClick={() => {}}
        >
          Верно
        </button>
      </div>

    </div>
  );
}
