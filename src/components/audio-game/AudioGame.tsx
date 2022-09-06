/* eslint-disable import/no-cycle */
import React from 'react';
import { BTNS_BG } from '../../constants';

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
          className="audio-game__btn audio-game__btn_first btn"
          onClick={() => {
            onGroupChange(0);
          }}
          disabled={isGroupChangeDisabled}
          style={group === 0 ? BTNS_BG[1] : BTNS_BG[0]}
        >
          A1
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_second btn"
          onClick={() => {
            onGroupChange(1);
          }}
          disabled={isGroupChangeDisabled}
          style={group === 1 ? BTNS_BG[2] : BTNS_BG[0]}
        >
          A2
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_third btn"
          onClick={() => {
            onGroupChange(2);
          }}
          disabled={isGroupChangeDisabled}
          style={group === 2 ? BTNS_BG[3] : BTNS_BG[0]}
        >
          B1
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_four btn"
          onClick={() => {
            onGroupChange(3);
          }}
          disabled={isGroupChangeDisabled}
          style={group === 3 ? BTNS_BG[4] : BTNS_BG[0]}
        >
          B2
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_five btn"
          onClick={() => {
            onGroupChange(4);
          }}
          disabled={isGroupChangeDisabled}
          style={group === 4 ? BTNS_BG[5] : BTNS_BG[0]}
        >
          C1
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_six btn"
          onClick={() => {
            onGroupChange(5);
          }}
          disabled={isGroupChangeDisabled}
          style={group === 5 ? BTNS_BG[6] : BTNS_BG[0]}
        >
          C2
        </button>
      </div>
      <button type="button" className="audio-game__start btn" onClick={onStartGameClick} disabled={typeof group === 'undefined'}>Начать</button>
      <p className="audio-game__text">Используйте кнопки 1-4 основной клавиатуры для выбора вариантов, пробел для повтора звука и ентер для пропуска или следующего слова.</p>
    </div>
  );
}
