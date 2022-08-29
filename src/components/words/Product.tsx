/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef } from 'react';
import { ITest } from '../../interfaces/interfaces';
import './product.scss';

export default function Product(props: ITest) {
  const domen = 'https://rslang-database.herokuapp.com/';

  const {
    isActive, handleClick, product, isHard, diffCards, isLearn, learnCards,
  } = props;
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
  let cardClassName = 'card';
  let diffButtonClassName = 'card__status-btn card__status-btn_diff';
  let learButtonClassName = 'card__status-btn card__status-btn_done';
  if (isActive) {
    cardClassName += ' card_active';
  } if (isHard) {
    cardClassName += ' hard';
    diffButtonClassName += ' card__status-btn_diff-active';
  } if (isLearn) {
    cardClassName += ' learn';
    learButtonClassName += ' card__status-btn_done-active';
  }

  function hardStatus(e: React.MouseEvent) {
    e.stopPropagation();
    diffCards(id);
  }
  function learnStatus(e: React.MouseEvent) {
    e.stopPropagation();
    learnCards(id);
  }
  return (
    <div className={cardClassName} onClick={() => handleClick(id)}>
      <img className="card__image" src={domen + image} alt={word} />
      <br />
      <div className="card__header-wrapper">
        <div>
          <span className="card__word">{word}</span>
          <span className="card__transcription">{transcription}</span>
          <span className="card__word-translate">{wordTranslate}</span>
        </div>
        <audio src={domen + audio} />
        <button type="button" className="card__play-btn" onClick={(e) => play(e)}><img src="./assets/svg/play.svg" alt="play" className="card__play-img" /></button>
      </div>
      <div className="card__button-wrapper">
        <button type="button" className={diffButtonClassName} onClick={(e) => hardStatus(e)}>+  сложное</button>
        <button type="button" className={learButtonClassName} onClick={(e) => learnStatus(e)}>✓  изучено</button>
      </div>
      <div className="card__extra">
        <div className="card__examples">
          <div dangerouslySetInnerHTML={createMarkup(textMeaning)}></div>
          <span className="card__examples_translate">{textMeaningTranslate}</span>
        </div>
        <div className="card__examples">
          <div dangerouslySetInnerHTML={createMarkup(textExample)}></div>
          <span className="card__examples_translate">{textExampleTranslate}</span>
        </div>
        <div className="card__button-wrapper card__button-wrapper-games">
          <div className="card__game">
            <div className="card__status-btn">аудиовызов</div>
            <span className="card__game-count">2 из 3</span>
          </div>
          <div className="card__game">
            <div className="card__status-btn">спринт</div>
            <span className="card__game-count">2 из 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
