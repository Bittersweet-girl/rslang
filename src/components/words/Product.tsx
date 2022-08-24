/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { ITest } from '../../interfaces/interfaces';
import '../dictionary/dictionary.scss';

export default function Product(props: ITest) {
  const domen = 'https://rslang-database.herokuapp.com/';
  const {
    word, transcription, image, audio,
  } = props.product;
  return (
    <li className="dictionary__card">
      <p>
        {word}
        -
        {transcription}
      </p>
      <img className="img" src={domen + image} alt={domen + word} />
      <br />
      <audio src={domen + audio} controls />
    </li>
  );
}
