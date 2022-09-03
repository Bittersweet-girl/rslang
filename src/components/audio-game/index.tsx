/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import AudioGame from './AudioGame';
import AudioGamePlay from './AudioGamePlay';

export default function AudioMain() {
  const [isPlayGame, setPlayGame] = useState(false);
  return (
    <section className="audio-game">
      {!isPlayGame && <AudioGame onPlayClick={() => setPlayGame(true)} />}
      {isPlayGame && <AudioGamePlay />}
    </section>
  );
}
