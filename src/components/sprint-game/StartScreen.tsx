import React from 'react';
import './sprint.scss';

export default function StartScreen({
  onStartGameClick, onGroupChange, group, isGroupChangeDisabled,
}:any) {
  return (
    <section className="start-screen">
      <div className="start-screen__container">
        <div className="start-screen__logo" />
        <p className="start-screen__text">Очень важный навык - восприятия языка на слух. С помощью этой игры вы сможете запомнить еще больше новых слов. Выберете соотвествующий перевод слова, после того как услышите как оно звучит.</p>
        {!isGroupChangeDisabled && <h3 className="start-screen__title">Выберите раздел учебника для тренировки</h3>}
        {isGroupChangeDisabled && <h3 className="start-screen__title">Слова будут взяты из указанного раздела</h3>}
        <div className="start-screen-group">
          <button
            type="button"
            className={`btn start-screen__btn start-screen__btn-first ${group === 0 ? 'start-screen__btn-first_active' : ''}`}
            onClick={() => onGroupChange(0)}
            disabled={isGroupChangeDisabled}
          >
            A1
          </button>
          <button
            type="button"
            className={`btn start-screen__btn start-screen__btn-second ${group === 1 ? 'start-screen__btn-second_active' : ''}`}
            onClick={() => onGroupChange(1)}
            disabled={isGroupChangeDisabled}
          >
            A2
          </button>
          <button
            type="button"
            className={`btn start-screen__btn start-screen__btn-third ${group === 2 ? 'start-screen__btn-third_active' : ''}`}
            onClick={() => onGroupChange(2)}
            disabled={isGroupChangeDisabled}
          >
            B1
          </button>
          <button
            type="button"
            className={`btn start-screen__btn start-screen__btn-four ${group === 3 ? 'start-screen__btn-four_active' : ''}`}
            onClick={() => onGroupChange(3)}
            disabled={isGroupChangeDisabled}
          >
            B2
          </button>
          <button
            type="button"
            className={`btn start-screen__btn start-screen__btn-five ${group === 4 ? 'start-screen__btn-five_active' : ''}`}
            onClick={() => onGroupChange(4)}
            disabled={isGroupChangeDisabled}
          >
            C1
          </button>
          <button
            type="button"
            className={`btn start-screen__btn start-screen__btn-six ${group === 5 ? 'start-screen__btn-six_active' : ''}`}
            onClick={() => onGroupChange(5)}
            disabled={isGroupChangeDisabled}
          >
            C2
          </button>
        </div>

        <button
          type="button"
          className="btn start-screen__start"
          onClick={onStartGameClick}
          disabled={typeof group === 'undefined'}
        >
          Начать
        </button>

      </div>

    </section>
  );
}
