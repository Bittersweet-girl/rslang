/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import AudioGame from './AudioGame';
import AudioGamePlay from './AudioGamePlay';
import { getGameWords } from '../../api/words';
import { GameProps } from '../../types';
import prepareGameData from '../sprint-game/helpers';

export default function AudioMain({ group, currentPage }: GameProps) {
  const [state, setState] = useState({
    index: 0,
    initialWords: [],
    words: [],
    isGameOver: false,
    isGroupConfirmed: false,
    isGameStarted: false,
    group,
    page: currentPage || 27,
  });
  const {
    isGameStarted, isGameOver, words, isGroupConfirmed, page,
  } = state;
  const currentGroup = state.group;

  useEffect(() => {
    if (isGroupConfirmed) {
      getGameWords({ group: currentGroup, page, filterLearned: false })
        .then((wordsData) => setState(
          (currentState: any) => ({
            ...currentState,
            words: prepareGameData(wordsData),
            initialWords: wordsData,
            isGameStarted: true,
          }),
        ));
    }
  }, [currentGroup, page, isGroupConfirmed]);

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
