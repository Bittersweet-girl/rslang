/* eslint-disable import/no-cycle */
import React from 'react';
// import axios from 'axios';
import './audio-game.scss';
import { AudioGameParam, IProduct, GameWord } from '../../types';
import checkAnswer from './audioGameFunc';

function Word({ word }: GameWord) {
  const playAudio = () => {
    const domen = 'https://rslang-database.herokuapp.com/';
    const audioSrc = `${domen}${word.audio}`;
    const audioElement = new Audio(audioSrc);
    audioElement.play();
  };
  return (
    <button type="button" className="audio-game-play__btn_audio" onClick={playAudio}>
      <img src="./assets/svg/play.svg" alt="play" className="audio-game-play__play-img" />
    </button>
  );
}

function makeAnswerArr(num: number, arr: IProduct[]) {
  const items: string[] = [];
  const numArr: number[] = [];
  items.push(arr[num].wordTranslate);

  for (let i = 0; i < 3; i += 1) {
    let v = Math.floor(Math.random() * 20);
    while (num === v || numArr.includes(v)) {
      v = Math.floor(Math.random() * 20);
    }
    numArr.push(v);
    items.push(arr[v].wordTranslate);
  }
  return items;
}

export default function AudioGamePlay({ state, setState }: AudioGameParam) {
  const { index, words } = state;
  const currentWord = words[index];
  const items = makeAnswerArr(index, words);
  return (
    <div className="audio-game-play">
      <Word word={currentWord} key={currentWord.id} />
      <div className="audio-game-play-options-block">
        {items.map((ans: string, i: number) => (
          <button type="button" className={`audio-game-play__option audio-game-play__option_${i} btn`} onClick={(event) => checkAnswer(event, index, words)}>
            {ans}
          </button>
        ))}
      </div>
      <button className="audio-game-play__btn btn" type="button">Не знаю</button>
    </div>
  );
}
