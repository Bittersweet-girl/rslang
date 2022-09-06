/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useContext } from 'react';
import { IWordCard, UserSigninResp, Id } from '../../types';
import { UserContext } from '../../contexts';
import './words.scss';

export default function Words(props: IWordCard) {
  const domen = 'https://rslang-database.herokuapp.com/';
  const user: null | UserSigninResp = useContext(UserContext);
  const sessionGroupData = sessionStorage.getItem('group');
  const sessionGroup = Number(sessionGroupData);

  const {
    isActive, handleClick, product, isHard, diffCards, isLearn, learnCards, userData,
  } = props;
  const {
    _id, id, word, transcription, image, audio, wordTranslate, textMeaning, textExample,
    textMeaningTranslate, textExampleTranslate,
  } = product;

  let wordId = id;
  if (!id) {
    wordId = _id;
  }
  const wordData = userData.filter((el: Id) => el.wordId === wordId).map((i: Id) => i.optional)[0];
  const sprintCorrect = wordData?.sprint?.correct ? wordData?.sprint.correct : 0;
  const sprintWrong = wordData?.sprint?.wrong ? wordData?.sprint.wrong : 0;
  const sprintTotal = sprintCorrect + sprintWrong;

  const audioCorrect = wordData?.audio?.correct ? wordData?.audio.correct : 0;
  const audioWrong = wordData?.audio?.wrong ? wordData?.audio.wrong : 0;
  const audioTotal = audioCorrect + audioWrong;

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
  let diffButtonStatus = false;
  let diffButtonText = '+  сложное';
  let learButtonClassName = 'card__status-btn card__status-btn_done';
  if (isActive) {
    cardClassName += ' card_active';
  } if (isHard) {
    cardClassName += ' hard';
    diffButtonClassName += ' card__status-btn_diff-active';
    diffButtonStatus = true;
    diffButtonText = 'сложное';
  } if (isLearn) {
    cardClassName += ' learn';
    learButtonClassName += ' card__status-btn_done-active';
  } if (isHard && sessionGroup === 6) {
    diffButtonText = 'удалить';
    diffButtonStatus = false;
    cardClassName = 'card';
    diffButtonClassName = 'card__status-btn card__status-btn_diff';
  } if (isHard && isActive) {
    cardClassName = 'card card_active';
  }

  function hardStatus(e: React.MouseEvent) {
    e.stopPropagation();
    diffCards(wordId);
  }
  function learnStatus(e: React.MouseEvent) {
    e.stopPropagation();
    learnCards(wordId);
  }
  return (
    <div className={cardClassName}
      onClick={() => {
        handleClick(wordId);
      }}
    >
      <div className="card__main">
        <div>
          <img className="card__image" src={domen + image} alt={word} />
        </div>
        <div className="card__header-wrapper">
          <div>
            <span className="card__word">{word}</span>
            <span className="card__transcription">{transcription}</span>
            <span className="card__word-translate">{wordTranslate}</span>
          </div>
          <audio src={domen + audio} />
          <button type="button" className="card__play-btn" onClick={(e) => play(e)}><img src="./assets/svg/play.svg" alt="play" className="card__play-img" /></button>
        </div>
        {user && (
          <div className="card__button-wrapper">
            <button type="button" className={diffButtonClassName} disabled={diffButtonStatus} onClick={(e) => hardStatus(e)}>{diffButtonText}</button>
            <button type="button" className={learButtonClassName} onClick={(e) => learnStatus(e)}>✓  изучено</button>
          </div>
        )}
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
        {user && (
          <div className="card__button-wrapper card__button-wrapper-games">
            <div className="card__game">
              <div className="card__status-btn">аудиовызов</div>
              <span className="card__game-count">
                {audioCorrect}
                &nbsp;из&nbsp;
                {audioTotal}
              </span>
            </div>
            <div className="card__game">
              <div className="card__status-btn">спринт</div>
              <span className="card__game-count">
                {sprintCorrect}
                &nbsp;из&nbsp;
                {sprintTotal}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
