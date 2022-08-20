/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { IProduct } from './interfaces';

export default function Product(props: IProduct) {
  const domen = 'https://rslang-database.herokuapp.com/';
  const {
    id, word, transcription, image, audio,
  } = props;
  return (
    <div key={id}>
      <p>
        {word}
        -
        {transcription}
      </p>
      <img className="img" src={domen + image} alt={domen + word} />
      <br />
      <audio src={domen + audio} controls />
    </div>
  );
}
