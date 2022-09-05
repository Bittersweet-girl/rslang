/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { AudioGameParam, IProduct, GameWord } from '../../types';
import { checkAnswer, makeAnswerArr } from './audioGameFunc';

const playAudio = (word: IProduct) => {
  const domen = 'https://rslang-database.herokuapp.com/';
  const audioSrc = `${domen}${word.audio}`;
  const audioElement = new Audio(audioSrc);
  audioElement.play();
};

function WordAudio({ word }: GameWord) {
  useEffect(() => playAudio(word));
  return (
    <button type="button" className="audio-game-play__btn_audio" onClick={() => playAudio(word)}>
      <img src="./assets/svg/play.svg" alt="play" className="audio-game-play__play-img" />
    </button>
  );
}

export default function AudioGamePlay({ state, setState }: AudioGameParam) {
  const { index, words, answers } = state;
  const currentWord = words[index];

  function nextQuestion() {
    const newState = { ...state, words: [...words] };
    if (newState.index === newState.words.length - 1) {
      newState.isGameOver = true;
    } else {
      newState.index = state.index + 1;
      newState.isAnswer = false;
      newState.answers = makeAnswerArr(index + 1, words);
    }
    if (state.isCorrect) {
      newState.words[index] = { ...currentWord, isCorrectAnswerAudio: true };
    } else {
      newState.words[index] = { ...currentWord, isCorrectAnswerAudio: false };
    }
    setState(newState);
  }
  function setAnswer(event: React.MouseEvent<HTMLButtonElement>) {
    const newState = { ...state };
    newState.isCorrect = checkAnswer(event, index, words);
    newState.isAnswer = true;
    setState(newState);
  }

  if (!state.isAnswer) {
    return (
      <div className="audio-game-play">
        <WordAudio word={currentWord} key={currentWord.id} />
        <div className="audio-game-play-options-block">
          {answers.map((ans: string, i: number) => (
            <button
              key={i}
              type="button"
              className={`audio-game-play__option audio-game-play__option_${i} btn`}
              onClick={(event) => {
                setAnswer(event);
              }}
            >
              {ans}
            </button>
          ))}
        </div>
        <button className="audio-game-play__btn btn" type="button">Не знаю</button>
      </div>
    );
  }
  return (
    <div className="audio-game-play">
      <WordAudio word={currentWord} key={currentWord.id} />
      <h3>{ currentWord.word }</h3>
      <div className="audio-game-play-options-block">
        {answers.map((ans: string, i: number) => (
          <button key={i} type="button" className={`audio-game-play__option audio-game-play__option_${i} btn`}>
            {ans}
          </button>
        ))}
      </div>
      <button className="audio-game-play__btn btn" type="button" onClick={nextQuestion}>Дальше</button>
    </div>
  );
}
