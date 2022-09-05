import React, { useEffect, useState } from 'react';
import { getLeurnedWords, getTodayStatistic } from '../../api/statistic';
import './statistic.scss';

export default function Statistic() {
  const [statistic, setStatistic] = useState({
    sprint: {
      correct: 0, correctRow: 0, wrong: 0, newWords: 0,
    },
    audio: {
      correct: 0, correctRow: 0, wrong: 0, newWords: 0,
    },
  });
  const [learned, setLearned] = useState({ words: [], count: 0 });

  useEffect(() => {
    getTodayStatistic()
      .then((gamesStat) => setStatistic(gamesStat));
    getLeurnedWords()
      .then((data: any) => setLearned(data));
  }, []);

  const correctSprint = statistic.sprint.correct;
  const newSprint = statistic.sprint.newWords;
  const correctRowSprint = statistic.sprint.correctRow;
  const wrongSprint = statistic.sprint.wrong;
  const trySprintPercent = Math.round((correctSprint / (correctSprint + wrongSprint)) * 100);
  const sprintPercent = Object.is(NaN, trySprintPercent) ? 0 : trySprintPercent;

  const correctAudio = statistic.audio.correct;
  const newAudio = statistic.audio.newWords;
  const correctRowAudio = statistic.audio.correctRow;
  const wrongAudio = statistic.audio.wrong;
  const tryAudioPercent = Math.round((correctAudio / (correctAudio + wrongAudio)) * 100);
  const audioPercent = Object.is(NaN, tryAudioPercent) ? 0 : tryAudioPercent;

  const tryTotalCorrect = Math.round(
    (correctAudio + correctSprint
     / (correctAudio + correctSprint + wrongAudio + wrongSprint)) * 100,
  );

  const totalPercent = Object.is(NaN, tryTotalCorrect) ? 0 : tryTotalCorrect;

  return (
    <section className="statistic">
      <h1 className="statistic__header">Прогресс за сегодня</h1>
      <div className="statistic__total">
        <div className="statistic__total__item">
          <h2 className="statistic__total__title orange">
            {' '}
            { newAudio + newSprint ?? '0'}
          </h2>
          <span className="statistic__total__subtitle">
            новых
            <br />
            слов
          </span>
        </div>
        <div className="statistic__total__item">
          <h2 className="statistic__total__title pink">{ `${totalPercent}%` ?? '0'}</h2>
          <span className="statistic__total__subtitle">
            правильных
            <br />
            ответов
          </span>
        </div>
        <div className="statistic__total__item">
          <h2 className="statistic__total__title magenta">
            {' '}
            { learned.count ?? '0'}
            {' '}
          </h2>
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
              Новых слов за день:
            </p>
            <span className="statistic__games__score">
              {newAudio ?? '0'}
            </span>
          </div>
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Правильных ответов:
            </p>
            <span className="statistic__games__score">
              {`${audioPercent}%` ?? '0'}
            </span>
          </div>
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Самая длинная серия
              <br />
              правильных ответов:
            </p>
            <span className="statistic__games__score">
              {correctRowAudio ?? '0'}
            </span>
          </div>
        </div>

        <div className="statistic__games__item">
          <img className="statistic__games__img" src="./assets/svg/sprint-game.svg" alt="sprint-game" />
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Новых слов за день:
            </p>
            <span className="statistic__games__score">
              {newSprint ?? '0'}
            </span>
          </div>
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Правильных ответов:
            </p>
            <span className="statistic__games__score">
              {`${sprintPercent}%` ?? '0'}
            </span>

          </div>
          <div className="statistic__games__title">
            <p className="statistic__games__desc">
              Самая длинная серия
              <br />
              правильных ответов:
            </p>
            <span className="statistic__games__score">
              {correctRowSprint ?? '0'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
