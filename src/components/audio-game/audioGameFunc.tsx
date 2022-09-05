/* eslint-disable max-len */
import React from 'react';
import { PreparedWords, IProduct } from '../../types';

export function checkAnswer(event: React.MouseEvent<HTMLButtonElement>, index: number, words: PreparedWords[]) {
  if (event.currentTarget.innerText === words[index].wordTranslate) {
    return true;
  }
  return false;
}
export function makeAnswerArr(num: number, arr: IProduct[]): string[] {
  const items: string[] = [];
  const numArr: number[] = [];
  items.push(arr[num].wordTranslate);

  for (let i = 0; i < 3; i += 1) {
    let v = Math.floor(Math.random() * 20);
    while (num === v || numArr.includes(v)) {
      v = Math.floor(Math.random() * 20);
    }
    numArr.push(v);
    items.push(arr[v].wordTranslate);
  }
  return items;
}
