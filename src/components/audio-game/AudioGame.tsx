/* eslint-disable import/no-cycle */
import React from 'react';
// import { BTNS_BG } from '../../constants';

export default function AudioGame({
  onStartGameClick, onGroupChange, group, isGroupChangeDisabled,
}: any) {
  return (
    <div className="audio-game-main">
      <div className="audio-game__logo" />
      <p className="audio-game__text">Очень важный навык - восприятия языка на слух. С помощью этой игры вы сможете запомнить еще больше новых слов. Выберете соотвествующий перевод слова, после того как услышите как оно звучит.</p>
      <h3 className="audio-game__title">Выберите раздел учебника для тренировки</h3>
      <div className="audio-game-group">
        <button
          type="button"
          className={`btn audio-game__btn audio-game__btn-first ${group === 0 ? 'audio-game__btn-first_active' : ''}`}
          onClick={() => onGroupChange(0)}
          disabled={isGroupChangeDisabled}
        >
          A1
        </button>
        <button
          type="button"
          className={`btn audio-game__btn audio-game__btn-second ${group === 1 ? 'audio-game__btn-second_active' : ''}`}
          onClick={() => onGroupChange(1)}
          disabled={isGroupChangeDisabled}
        >
          A2
        </button>
        <button
          type="button"
          className={`btn audio-game__btn audio-game__btn-third ${group === 2 ? 'audio-game__btn-third_active' : ''}`}
          onClick={() => onGroupChange(2)}
          disabled={isGroupChangeDisabled}
        >
          B1
        </button>
        <button
          type="button"
          className={`btn audio-game__btn audio-game__btn-four ${group === 3 ? 'audio-game__btn-four_active' : ''}`}
          onClick={() => onGroupChange(3)}
          disabled={isGroupChangeDisabled}
        >
          B2
        </button>
        <button
          type="button"
          className={`btn audio-game__btn audio-game__btn-five ${group === 4 ? 'audio-game__btn-five_active' : ''}`}
          onClick={() => onGroupChange(4)}
          disabled={isGroupChangeDisabled}
        >
          C1
        </button>
        <button
          type="button"
          className={`btn audio-game__btn audio-game__btn-six ${group === 5 ? 'audio-game__btn_active' : ''}`}
          onClick={() => onGroupChange(5)}
          disabled={isGroupChangeDisabled}
        >
          C2
        </button>
      </div>
      <button type="button" className="audio-game__start btn" onClick={onStartGameClick} disabled={typeof group === 'undefined'}>Начать</button>
      <p className="audio-game__text">Используйте кнопки 1-4 основной клавиатуры для выбора вариантов, пробел для повтора звука и ентер для пропуска или следующего слова.</p>
    </div>
  );
}
