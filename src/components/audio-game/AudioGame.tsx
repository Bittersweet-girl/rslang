/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { BTNS_BG } from '../../constants';
import { IAudioProps } from '../../types';
import './audio-game.scss';

export default function AudioGame(props: IAudioProps) {
  const [isDisabled, setDisabled] = useState(true);
  const [isActive, setActive] = useState(false);
  const [group, setGroup] = useState('');

  useEffect(() => {
    setActive(true);
    if (group === '') setActive(false);
    setDisabled(false);
    if (!isActive) setDisabled(true);
  });

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
            setGroup('0');
          }}
          style={group === '0' ? BTNS_BG[1] : BTNS_BG[0]}
        >
          A1
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_second btn"
          onClick={() => {
            setGroup('1');
          }}
          style={group === '1' ? BTNS_BG[2] : BTNS_BG[0]}
        >
          A2
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_third btn"
          onClick={() => {
            setGroup('2');
          }}
          style={group === '2' ? BTNS_BG[3] : BTNS_BG[0]}
        >
          B1
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_four btn"
          onClick={() => {
            setGroup('3');
          }}
          style={group === '3' ? BTNS_BG[4] : BTNS_BG[0]}
        >
          B2
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_five btn"
          onClick={() => {
            setGroup('4');
          }}
          style={group === '4' ? BTNS_BG[5] : BTNS_BG[0]}
        >
          C1
        </button>
        <button
          type="button"
          className="audio-game__btn audio-game__btn_six btn"
          onClick={() => {
            setGroup('5');
          }}
          style={group === '5' ? BTNS_BG[6] : BTNS_BG[0]}
        >
          C2
        </button>
      </div>
      <button type="button" className="audio-game__start btn" disabled={isDisabled} onClick={props.onPlayClick}>Начать</button>
    </div>
  );
}
