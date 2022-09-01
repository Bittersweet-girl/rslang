/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
// import { BTNS_BG } from '../../constants';
import './audio-game.scss';
// import useNavigation from '../../hooks/useNavigation';
import Loader from '../loader/Loader';

export default function AudioGamePlay() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="audio-game-play">
      PLAY
      {loading && <Loader />}
    </div>
  );
}
