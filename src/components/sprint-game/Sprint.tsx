import React from 'react';
import './sprint.scss';
import { GameProps } from '../../types';
import SprintGame from './SprintGame';

export default function Sprint(props: GameProps) {
  return (
    <section className="sprint-page">
      {/* <h1>SPRINT GAME</h1> */}
      <div>{JSON.stringify(props)}</div>
      <SprintGame />
    </section>
  );
}
