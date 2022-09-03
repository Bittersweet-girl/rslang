import React, { useEffect, useState } from 'react';
import './sprint.scss';
import { GameProps } from '../../types';
import SprintGame from './SprintGame';
import getWords from '../../api/words';
import StartScreen from './StartScreen';
import prepareGameData from './helpers';
import SprintResult from './SprintResult';

export default function Sprint({ group = 1, currentPage = 1 }: GameProps) {
  const [state, setState] = useState({
    countCorrect: 0,
    correctRow: 0,
    total: 0,
    countBonus: 0,
    bonusRatio: 1,
    countWrong: 0,
    score: 0,
    index: 0,
    initialWords: [],
    words: [],
    isGameOver: false,
    isGameStarted: false,
  });
  const { isGameStarted, isGameOver, words } = state;

  useEffect(() => {
    getWords({ group, currentPage })
      .then((wordsData) => setState(
        (currentState: any) => ({
          ...currentState,
          words: prepareGameData(wordsData.data),
          initialWords: wordsData.data,
        }),
      ));
  }, [group, currentPage]);

  const startGame = () => setState({ ...state, isGameStarted: true });

  return (
    <section className="sprint-page">

      {!isGameStarted && !isGameOver && <StartScreen onStartGameClick={startGame} />}

      {/* <h1>SPRINT GAME</h1> */}
      {/* <div>{JSON.stringify({ group, currentPage })}</div> */}
      {words.length && !isGameOver && isGameStarted && (
        <SprintGame
          state={state}
          setState={setState}
        />
      )}

      {isGameOver
          && (
            <SprintResult
              state={state}
              setState={setState}
            />
          )}
    </section>
  );
}
