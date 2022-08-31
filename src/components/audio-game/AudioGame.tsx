import React from 'react';
import './audio-game.scss';

export default function AudioGame() {
  return (
    <section className="audio-game">
      <div className="audio-game__logo" />
      <p className="audio-game__text">Очень важный навык - восприятия языка на слух. С помощью этой игры вы сможете запомнить еще больше новых слов. Выберете соотвествующий перевод слова, после того как услышите как оно звучит.</p>
      <h3 className="audio-game__title">Выберите раздел учебника для тренировки</h3>
      <div className="audio-game-group">
        <button type="button" className="audio-game__btn audio-game__btn_first btn">A1</button>
        <button type="button" className="audio-game__btn audio-game__btn_second btn">A2</button>
        <button type="button" className="audio-game__btn audio-game__btn_third btn">B1</button>
        <button type="button" className="audio-game__btn audio-game__btn_four btn">B2</button>
        <button type="button" className="audio-game__btn audio-game__btn_five btn">C1</button>
        <button type="button" className="audio-game__btn audio-game__btn_six btn">C2</button>
      </div>
      <button type="button" className="audio-game__start btn">Начать </button>
    </section>
  );
}
