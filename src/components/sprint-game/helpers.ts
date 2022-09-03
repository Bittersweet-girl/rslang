import { IProduct, PreparedWords } from '../../types';

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
