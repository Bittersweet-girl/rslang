/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import AudioGame from './AudioGame';
import AudioGamePlay from './AudioGamePlay';
import { getGameWords } from '../../api/words';
import { GameProps } from '../../types';
import { makeAnswerArr } from './audioGameFunc';
import './audio-game.scss';

export default function AudioMain({ group, currentPage }: GameProps) {
  const [state, setState] = useState({
    isAnswer: false,
    isCorrect: false,
    index: 0,
    words: [],
    answers: [],
    isGameOver: false,
    isGroupConfirmed: false,
    isGameStarted: false,
    group,
    page: currentPage || 27,
  });
  const {
    index, isGameStarted, isGameOver, words, isGroupConfirmed, page,
  } = state;
  const currentGroup = state.group;

  useEffect(() => {
    if (isGroupConfirmed) {
      getGameWords({ group: currentGroup, page, filterLearned: false })
        .then((wordsData) => setState(
          (currentState: any) => ({
            ...currentState,
            words: wordsData,
            isGameStarted: true,
            answers: makeAnswerArr(index, wordsData),
          }),
        ));
    }
  }, [currentGroup, page, isGroupConfirmed]);
  // console.log('index');
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
    </section>
  );
}
