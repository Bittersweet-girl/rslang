import React, { useEffect } from 'react';
import { SprintGameParam, State } from '../../types';
import './sprint.scss';
import Timer from './Timer';

export default function SprintGame({
  state, setState,
}: SprintGameParam): JSX.Element {
  const {
    words, index, countBonus, isGameOver,
  } = state;

  const currentWord = words[index];

  const onCorrectAnswer = () => {
    const newState = { ...state, words: [...words] };
    // const difficulty = newState.words[index].meta?.difficulty;
    // const isNew = newState.words[index].meta?.optional;
    newState.total += 1;
    newState.countCorrect += 1;
    newState.correctRow += 1;
    newState.countBonus += 1;
    if (newState.countBonus > 3) {
      newState.countBonus = 1;
      newState.bonusRatio *= 2;
    }
    newState.score += 10 * newState.bonusRatio;
    if (newState.index === newState.words.length - 1) {
      newState.isGameOver = true;
    } else {
      newState.index = state.index + 1;
    }
    newState.words[index] = { ...currentWord, isCorrectAnswer: true };
    setState(newState);
  };

  const onWrongAnswer = () => {
    const newState = { ...state, words: [...words] };
    newState.countWrong += 1;
    newState.correctRow = 0;
    newState.countBonus = 0;
    newState.bonusRatio = 1;
    if (newState.index === newState.words.length - 1) {
      newState.isGameOver = true;
    } else {
      newState.index = state.index + 1;
    }
    newState.words[index] = { ...currentWord, isCorrectAnswer: false };
    setState(newState);
  };

  const onLeftBtnClick = currentWord.isCorrect ? onWrongAnswer : onCorrectAnswer;
  const onRightBtnClick = currentWord.isCorrect ? onCorrectAnswer : onWrongAnswer;

  useEffect(() => {
    const onKeypress = (e:any) => {
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        onLeftBtnClick();
      }

      if (e.code === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        onRightBtnClick();
      }
    };
    window.addEventListener('keyup', onKeypress);
    return () => {
      window.removeEventListener('keyup', onKeypress);
    };
  }, [onLeftBtnClick, onRightBtnClick]);

  // if (!currentWord) {
  //   return null;
  // }
  return (
    <div className="sprint-game">
      <div className="sprint-game__status">
        <div className="sprint-game__score-status">

          <div className="sprint-game__success-row">
            <div className={`sprint-game__success-item ${countBonus >= 1 ? 'sprint-game__success-item_check' : ''}`} />
            <div className={`sprint-game__success-item ${countBonus >= 2 ? 'sprint-game__success-item_check' : ''}`} />
            <div className={`sprint-game__success-item ${countBonus >= 3 ? 'sprint-game__success-item_check' : ''}`} />
          </div>
          <p>
            {' '}
            {`+${10 * state.bonusRatio} очков за слово`}
          </p>

        </div>
        {!isGameOver && (
          <Timer
            time={30}
            onTimeUp={() => setState((s:State) => ({ ...s, isGameOver: true }))}
          />
        )}
        <div className="sprint-game__score">{state.score}</div>
      </div>
      <p className="sprint-game__word">{currentWord.word}</p>
      <p className="sprint-game__translate">{currentWord.fakeTranslation}</p>
      <div className="sprint-game__controllers">
        <button
          type="button"
          className="game__btn game__button-no"
          onClick={onLeftBtnClick}
        >
          Неверно
        </button>

        <button
          type="button"
          className="game__btn game__button-yes"
          onClick={onRightBtnClick}
        >
          Верно
        </button>
      </div>

    </div>
  );
}
