/* eslint-disable max-len */
import React from 'react';
import { PreparedWords } from '../../types';

export default function checkAnswer(event: React.MouseEvent<HTMLButtonElement>, index: number, words: PreparedWords[]) {
  if (event.currentTarget.innerText === words[index].wordTranslate) {
    return true;
  }
  return false;
}
