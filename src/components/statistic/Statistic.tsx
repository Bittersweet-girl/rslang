import React from 'react';
import './statistic.scss';

export default function Statistic() {
  return (
    <section className="statistic">
      <h1 className="statistic__header">Прогресс за сегодня</h1>
      <div className="statistic__total">
        <div className="statistic__total__item">
          <h2 className="statistic__total__title orange">10</h2>
          <span className="statistic__total__subtitle">
            новых
            <br />
            слов
          </span>
        </div>
        <div className="statistic__total__item">
          <h2 className="statistic__total__title pink">95%</h2>
          <span className="statistic__total__subtitle">
            правильных
            <br />
            ответов
          </span>
        </div>
        <div className="statistic__total__item">
          <h2 className="statistic__total__title magenta">2 </h2>
          <span className="statistic__total__subtitle">
            изученых
            <br />
            слов
          </span>
        </div>
      </div>
      <div className="statistic__games">
        <div className="statistic__games__item">
          <img className="statistic__games__img" src="./assets/svg/audio-game.svg" alt="audio-game" />
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Новых слов за день
            </p>
            <span className="statistic__games__score">
              15
            </span>
          </div>
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Правильных ответов
            </p>
            <span className="statistic__games__score">
              20%
            </span>
          </div>
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Самая длинная серия
              <br />
              правильных ответов
            </p>
            <span className="statistic__games__score">
              3
            </span>
          </div>
        </div>
        <div className="statistic__games__item">
          <img className="statistic__games__img" src="./assets/svg/sprint-game.svg" alt="sprint-game" />
          <div className="statistic__games__title">
            <span className="statistic__games__score">
              15
            </span>
            <p className="statistic__games__desc">
              новых слов за день
            </p>
          </div>
          <div className="statistic__games__title">
            <span className="statistic__games__score">
              20%
            </span>
            <p className="statistic__games__desc">
              правильных ответов
            </p>
          </div>
          <div className="statistic__games__title">
            <span className="statistic__games__score">
              3
            </span>
            <p className="statistic__games__desc">
              самая длинная серия
              <br />
              правильных ответов
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
