import React from 'react';
import { PAGE_DICTIONARY } from '../../constants';
import useNavigation from '../../hooks/useNavigation';
import { GameWord, AudioGameParam } from '../../types';
import '../sprint-game/sprint.scss';

function Word({ word }: GameWord) {
  const playAudio = () => {
    const domen = 'https://rslang-database.herokuapp.com/';
    const audioSrc = `${domen}${word.audio}`;
    const audioElement = new Audio(audioSrc);
    audioElement.play();
  };

  return (
    <div className="sprint-data__word">
      <button type="button" className="word-audio" onClick={playAudio}> </button>
      <div className="word">{word.word}</div>
      <div className="word-translate">{`― ${word.wordTranslate}`}</div>
    </div>
  );
}

export default function AudioGameResult({ state, setState }: AudioGameParam) {
  const { navigate } = useNavigation();
  const { words } = state;
  const correctAnswers = words.filter((word) => word.isCorrectAnswerAudio);
  const wrongAnswers = words.filter((word) => word.isCorrectAnswerAudio === false);

  return (
    <div className="audio-game-res sprint-statistic">
      <h1>Молодец! Так держать!</h1>
      <div className="statistic-data scrollbar">
        <h2>
          Результат
          {' '}

          {' '}
          баллов
        </h2>
        <div className="statistic-data__title">
          <p className="statistic-data__title-text">Ошибок</p>
          <div className="statistic-data__wrong">{wrongAnswers.length}</div>
        </div>

        {wrongAnswers.map((word) => <Word word={word} key={word.id} />)}

        <div className="statistic-data__line" />
        <div className="statistic-data__title">
          <p className="statistic-data__title-text">Знаю</p>
          <div className="statistic-data__coorect">{correctAnswers.length}</div>
        </div>

        {correctAnswers.map((word) => <Word word={word} key={word.id} />)}
      </div>

      <div className="sprint-statistic__buttons">
        <button
          type="button"
          className="game__btn btn-dictionary"
          onClick={() => navigate(PAGE_DICTIONARY)}
        >
          Перейти в учебник

        </button>

        <button
          type="button"
          className="game__btn btn-repeat"
          onClick={() => {
            setState({
              ...state,
              isAnswer: false,
              isCorrect: false,
              index: 0,
              words: [],
              answers: [],
              isGameOver: false,
              isGroupConfirmed: false,
              isGameStarted: false,
            });
          }}
        >
          Сыграть еще раз
        </button>
      </div>
    </div>
  );
}
