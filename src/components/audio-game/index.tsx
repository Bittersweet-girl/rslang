/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import AudioGame from './AudioGame';
import AudioGamePlay from './AudioGamePlay';
import AudioGameResult from './AudioGameResult';
import { getGameWords } from '../../api/words';
import { GameProps } from '../../types';
import { makeAnswerArr, saveAudioStatistic } from './audioGameFunc';
import './audio-game.scss';

const getRandomPageNumber = () => Math.max(3, Math.floor(Math.random() * 29));

export default function AudioMain({ group, currentPage }: GameProps) {
  const hasComeFromMenu = typeof group === 'undefined';
  const [state, setState] = useState({
    isAnswer: false,
    isCorrect: false,
    countCorrect: 0,
    countWrong: 0,
    correctRow: 0,
    index: 0,
    words: [],
    answers: [],
    isGameOver: false,
    isGroupConfirmed: false,
    isGameStarted: false,
    group,
    page: currentPage ?? getRandomPageNumber(),
  });
  const {
    index, isGameStarted, isGameOver, words, isGroupConfirmed, page,
  } = state;
  const currentGroup = state.group;

  useEffect(() => {
    if (isGroupConfirmed) {
      getGameWords({
        group: currentGroup, page, filterLearned: !hasComeFromMenu, amount: 20,
      })
        .then((wordsData) => {
          setState(
            (currentState: any) => ({
              ...currentState,
              words: wordsData,
              isGameStarted: true,
              answers: makeAnswerArr(index, wordsData),
            }),
          );
        });
    }
  }, [currentGroup, page, isGroupConfirmed]);

  // build and save statistic
  useEffect(() => {
    if (isGameOver) {
      saveAudioStatistic(state);
    }
  }, [isGameOver]);

  const confirmGroup = () => setState({ ...state, isGroupConfirmed: true });
  const changeGroup = (newGroup: number) => setState({ ...state, group: newGroup });

  return (
    <section className="audio-game">
      {!isGroupConfirmed && (
        <AudioGame
          onStartGameClick={confirmGroup}
          onGroupChange={changeGroup}
          group={state.group}
          isGroupChangeDisabled={typeof group !== 'undefined'}
        />
      )}

      {!!words.length && !isGameOver && isGameStarted && (
        <AudioGamePlay
          state={state}
          setState={setState}
        />
      )}
      {isGameOver
        && (
        <AudioGameResult
          state={state}
          setState={setState}
        />
        )}
    </section>
  );
}
