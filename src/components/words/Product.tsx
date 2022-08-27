/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef } from 'react';
import { ITest } from '../../interfaces/interfaces';
import './product.scss';

export default function Product(props: ITest) {
  const domen = 'https://rslang-database.herokuapp.com/';

  const { isActive, handleClick, product } = props;
  const {
    id, word, transcription, image, audio, wordTranslate, textMeaning, textExample,
    textMeaningTranslate, textExampleTranslate,
  } = product;

  const audioSrc = domen + audio;
  const audioElement = useRef(new Audio(audioSrc));
  function play(e: React.MouseEvent) {
    e.stopPropagation();
    audioElement.current.play();
  }
  function createMarkup(str: string) {
    return { __html: str };
  }
  return (
    <div className={isActive ? 'card_active' : 'card'} onClick={() => handleClick(id)}>
      <img className="card__image" src={domen + image} alt={word} />
      <h2 className="card__word">{word}</h2>
      <span className="card__word-translate">{wordTranslate}</span>
      <br />
      <div className="card__audio-wrapper">
        <span className="card__transcription">{transcription}</span>
        <audio src={domen + audio} />
        <button type="button" className="card__play-btn" onClick={(e) => play(e)}><img src="./assets/svg/play.svg" alt="play" className="card__play-img" /></button>
      </div>
      <div className="card__examples">
        <b>Значение</b>
        <div dangerouslySetInnerHTML={createMarkup(textMeaning)}></div>
        <span>{textMeaningTranslate}</span>
      </div>
      <div className="card__examples">
        <b>Пример</b>
        <div dangerouslySetInnerHTML={createMarkup(textExample)}></div>
        <span>{textExampleTranslate}</span>
      </div>
    </div>
  );
}
