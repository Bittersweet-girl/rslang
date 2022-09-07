/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  AudioGameParam, IProduct, GameWord, PreparedWords,
} from '../../types';
import { makeAnswerArr } from './audioGameFunc';

const domen = 'https://rslang-database.herokuapp.com/';

const playAudio = (word: IProduct) => {
  const audioSrc = `${domen}${word.audio}`;
  const audioElement = new Audio(audioSrc);
  audioElement.play();
};
const wrongAudio = () => {
  const audioSrc = './assets/sounds/wrong.mp3';
  const audioElement = new Audio(audioSrc);
  audioElement.play();
};
const rightAudio = () => {
  const audioSrc = './assets/sounds/right.mp3';
  const audioElement = new Audio(audioSrc);
  audioElement.play();
};

function WordAudio({ word }: GameWord) {
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
      newState.countCorrect += 1;
      newState.correctRow += 1;
      newState.words[index] = { ...currentWord, isCorrectAnswerAudio: true };
    } else {
      newState.countWrong += 1;
      newState.correctRow = 0;
      newState.words[index] = { ...currentWord, isCorrectAnswerAudio: false };
    }
    setState(newState);
  }
  function checkAnswer(i: number, checkIindex: number, checkWords: PreparedWords[]) {
    if (answers[i] === checkWords[checkIindex].wordTranslate) {
      return true;
    }
    return false;
  }
  function setAnswer(i: number) {
    const newState = { ...state };
    newState.isCorrect = checkAnswer(i, index, words);
    newState.isAnswer = true;
    setState(newState);
  }
  function noAnswer() {
    const newState = { ...state };
    newState.isCorrect = false;
    newState.isAnswer = true;
    setState(newState);
  }

  useEffect(() => {
    if (state.isAnswer && state.isCorrect) {
      rightAudio();
    } else if (state.isAnswer && !state.isCorrect) {
      wrongAudio();
    }
    playAudio(words[index]);
    const onKeypress = (e: any) => {
      if (e.code === 'Digit1') {
        e.preventDefault();
        e.stopPropagation();
        setAnswer(0);
      }
      if (e.code === 'Digit2') {
        e.preventDefault();
        e.stopPropagation();
        setAnswer(1);
      }
      if (e.code === 'Digit3') {
        e.preventDefault();
        e.stopPropagation();
        setAnswer(2);
      }
      if (e.code === 'Digit4') {
        e.preventDefault();
        e.stopPropagation();
        setAnswer(3);
      }
      if (e.code === 'Space') {
        e.preventDefault();
        e.stopPropagation();
        playAudio(words[index]);
      }
      if (e.code === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (state.isAnswer) {
          nextQuestion();
        } else {
          noAnswer();
        }
      }
    };
    window.addEventListener('keyup', onKeypress);
    return () => {
      window.removeEventListener('keyup', onKeypress);
    };
  }, [state.isAnswer, state.isCorrect]);

  if (!state.isAnswer) {
    return (
      <div className="audio-game-play">
        <img className="audio-game-play__image" src="./assets/svg/quest.svg" alt="question" />
        <WordAudio word={currentWord} key={currentWord.id} />
        <h3> </h3>
        <div className="audio-game-play-options-block">
          {answers.map((ans: string, i: number) => (
            <button
              key={i}
              type="button"
              className={`audio-game-play__option audio-game-play__option_${i} btn`}
              onClick={() => {
                setAnswer(i);
              }}
            >
              {i + 1}
              {'   '}
              {ans}
            </button>
          ))}
        </div>
        <button className="audio-game-play__btn btn" type="button" onClick={noAnswer}>Не знаю</button>
      </div>
    );
  }
  return (
    <div className="audio-game-play">
      <img className="audio-game-play__image" src={domen + currentWord.image} alt={currentWord.word} />
      <WordAudio word={currentWord} key={currentWord.id} />
      <h3>{ currentWord.word }</h3>
      <div className="audio-game-play-options-block">
        {answers.map((ans: string, i: number) => {
          const classCorrect: string = (ans === currentWord.wordTranslate) ? 'correct' : 'wrong';
          return (
            <button key={i} type="button" className={`audio-game-play__option btn ${classCorrect}`}>
              {ans}
            </button>
          );
        })}
      </div>
      <button className="audio-game-play__btn btn" type="button" onClick={nextQuestion}>Дальше</button>
    </div>
  );
}
