/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { IProduct } from './interfaces';

export function Product(props: IProduct) {
  const domen = 'https://rslang-database.herokuapp.com/';
  return (
    <div key={props.id}>
      <p>
        { props.word }
        -
        { props.transcription }
      </p>
      <img className="img" src={domen + props.image} alt={domen + props.word} />
      <br />
      <audio src={domen + props.audio} controls />
    </div>
  );
}
