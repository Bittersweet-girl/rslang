/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React from 'react';
import { PreparedWords, IProduct } from '../../types';

export function checkAnswer(event: React.MouseEvent<HTMLButtonElement>, index: number, words: PreparedWords[]) {
  if (event.currentTarget.innerText === words[index].wordTranslate) {
    return true;
  }
  return false;
}

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
  let items: string[] = [];
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
  items = shuffle(items);
  return items;
}
