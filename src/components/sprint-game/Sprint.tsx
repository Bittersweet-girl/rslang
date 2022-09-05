import React, { useEffect, useState } from 'react';
import './sprint.scss';
import { GameProps } from '../../types';
import SprintGame from './SprintGame';
import { getGameWords } from '../../api/words';
import StartScreen from './StartScreen';
import prepareGameData, { saveSprintStatistic } from './helpers';
import SprintResult from './SprintResult';

const getRandomPageNumber = () => Math.max(3, Math.floor(Math.random() * 29));

export default function Sprint({ group, currentPage }: GameProps) {
  const hasComeFromMenu = typeof group === 'undefined';
  // console.log('hasComeFromMenu', hasComeFromMenu);

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
    isGroupConfirmed: false,
    isGameStarted: false,
    group,
    page: currentPage ?? getRandomPageNumber(),
  });

  const {
    isGameStarted, isGameOver, words, isGroupConfirmed, page,
  } = state;

  const currentGroup = state.group;

  useEffect(() => {
    if (isGroupConfirmed) {
      getGameWords({
        group: currentGroup, page, filterLearned: !hasComeFromMenu, amount: 60,
      })
        .then((wordsData) => setState(
          (currentState: any) => ({
            ...currentState,
            words: prepareGameData(wordsData),
            initialWords: wordsData,
            isGameStarted: true,
            isGroupConfirmed: false,
          }),
        ));
    }
  }, [currentGroup, page, isGroupConfirmed]);

  // build and save statistic
  useEffect(() => {
    if (isGameOver) {
      saveSprintStatistic(state);
    }
  }, [isGameOver]);

  // console.log('word.meta', words);

  const confirmGroup = () => setState({ ...state, isGroupConfirmed: true });
  const changeGroup = (newGroup:number) => setState({ ...state, group: newGroup });

  return (
    <section className="sprint-page">

      {!isGroupConfirmed && !isGameStarted && !isGameOver && (
        <StartScreen
          onStartGameClick={confirmGroup}
          onGroupChange={changeGroup}
          group={state.group}
          isGroupChangeDisabled={!hasComeFromMenu}
        />
      )}

      {!!words.length && !isGameOver && isGameStarted && (
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
