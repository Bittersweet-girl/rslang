/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
import { IProduct, AudioGameState } from '../../types';
import { saveStatistic } from '../../api/statistic';
import { difficulties } from '../../constants';
import { saveUserWord } from '../../api/words';

function shuffle(array: any) {
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function makeAnswerArr(num: number, arr: IProduct[]): string[] {
  // console.log('arr', arr);
  const length = arr.length;
  let items: string[] = [];
  const numArr: number[] = [];
  items.push(arr[num].wordTranslate);
  for (let i = 0; i < 3; i += 1) {
    let v = Math.floor(Math.random() * length);
    while (num === v || numArr.includes(v)) {
      v = Math.floor(Math.random() * length);
    }
    numArr.push(v);
    items.push(arr[v].wordTranslate);
  }
  items = shuffle(items);
  return items;
}

function isWordJustLearned(word: any) {
  if (!word.isCorrectAnswerAudio || !word?.meta?.optional?.audio) {
    return false;
  }
  const dif = word.meta.difficulty;
  const { correctRow } = word.meta.optional.audio;

  if (dif === difficulties.HARD && correctRow === 4) {
    return true;
  }
  if (dif === difficulties.EASY && correctRow === 2) {
    return true;
  }
  return false;
}

export function saveAudioStatistic(state: AudioGameState) {
  let newWords = 0;
  let learned = 0;
  const {
    words, longestCorrectRow, countCorrect, countWrong,
  } = state;
  const playedWords = words.filter(({ isCorrectAnswerAudio }) => typeof isCorrectAnswerAudio !== 'undefined');
  playedWords.forEach((word) => {
    const isNew = !word?.meta?.optional?.audio;
    const isJustLearned = isWordJustLearned(word);
    let difficulty = word.meta?.difficulty || difficulties.EASY;
    const optional = word.meta?.optional || {};
    const audio = optional.audio || {
      correct: 0,
      wrong: 0,
      correctRow: 0,
    };
    if (isNew) {
      newWords += 1;
    }
    if (isJustLearned) {
      learned += 1;
      difficulty = difficulties.LEARNED;
    }

    // console.log('isJustLearned', isJustLearned);
    // console.log('sprint.correctRow ', audio.correctRow);

    if (word.isCorrectAnswerAudio) {
      audio.correctRow += 1;
      audio.correct += 1;
    } else {
      difficulty = difficulty === difficulties.LEARNED ? difficulties.EASY : difficulty;
      audio.correctRow = 0;
      audio.wrong += 1;
    }

    const wordData = {
      difficulty,
      optional: {
        ...optional,
        audio,
      },
    };
    saveUserWord({ wordId: word.id, wordData, usePut: !!word.meta });
  });

  // build words statistic
  saveStatistic({
    game: 'audio', wrong: countWrong, correct: countCorrect, longestCorrectRow, newWords, learned,
  });
}
