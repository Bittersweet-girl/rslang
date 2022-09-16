import {
  GameState, IProduct, PreparedWords,
} from '../../types';
import { saveStatistic } from '../../api/statistic';
import { difficulties } from '../../constants';
import { saveUserWord } from '../../api/words';

function shuffle(words: PreparedWords[]) {
  const shuffledWords = [...words];
  return shuffledWords.sort(() => Math.random() - 0.5);
}

export default function prepareGameData(words: IProduct[]): PreparedWords[] {
  const preparedWords = words.map((word) => {
    const shouldFakeTranslation = Math.random() > 0.5;
    const randomIndex = Math.floor(Math.random() * (words.length - 1));

    if (shouldFakeTranslation) {
      const fakeTranslation = words.filter(
        (item) => item !== word,
      )[randomIndex].wordTranslate;
      return {
        ...word,
        fakeTranslation,
        isCorrect: false,
      };
    }
    return { ...word, fakeTranslation: word.wordTranslate, isCorrect: true };
  });
  return shuffle(preparedWords);
}

function isWordJustLearned(word: any) {
  if (!word.isCorrectAnswer || !word?.meta?.optional?.sprint) {
    return false;
  }

  const dif = word.meta.difficulty;
  // console.log('dif', dif);
  const { correctRow } = word.meta.optional.sprint;
  // console.log('word.meta.optional', word.meta.optional);
  // console.log('correctRow', correctRow);
  if (dif === difficulties.HARD && correctRow === 4) {
    return true;
  }
  if (dif === difficulties.EASY && correctRow === 2) {
    return true;
  }
  return false;
}

// game, correct, wrong, correctRow, newWords, learnedWords,
// const defaultMeta = {
//   difficulty: difficulties.EASY, // | learned | easy | 'hard'
//   optional: {
//     sprint: {
//       correct: 0,
//       wrong: 0,
//       correctRow: 0,
//     },
//   },
// };

export function saveSprintStatistic(state: GameState) {
  let newWords = 0;
  let learned = 0;
  const {
    words, longestCorrectRow, countCorrect, countWrong,
  } = state;
  // console.log('from-saveSprintStatistic');

  const playedWords = words.filter(({ isCorrectAnswer }) => typeof isCorrectAnswer !== 'undefined');
  playedWords.forEach((word) => {
    const isNew = !word?.meta?.optional?.sprint;
    const isJustLearned = isWordJustLearned(word);

    let difficulty = word.meta?.difficulty || difficulties.EASY;
    const optional = word.meta?.optional || {};
    const sprint = optional.sprint || {
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
    // console.log('sprint.correctRow ', sprint.correctRow);

    if (word.isCorrectAnswer) {
      sprint.correctRow += 1;
      sprint.correct += 1;
    } else {
      difficulty = difficulty === difficulties.LEARNED ? difficulties.EASY : difficulty;
      sprint.correctRow = 0;
      sprint.wrong += 1;
    }

    // console.log('sprint', sprint);
    const wordData = {
      difficulty,
      optional: {
        ...optional,
        sprint,
      },
    };
    saveUserWord({ wordId: word.id, wordData, usePut: !!word.meta });
  });

  // build words statistic
  saveStatistic({
    game: 'sprint', wrong: countWrong, correct: countCorrect, longestCorrectRow, newWords, learned,
  });
}
