import React from 'react';
import { GameProps } from '../../types';

export default function Sprint(props: GameProps) {
  return (
    <section className="sprint-game">
      <h1>SPRINT GAME</h1>
      <div>{JSON.stringify(props)}</div>
    </section>
  );
}
