/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import Main from '../components/main/Main';
import Dictionary from '../components/dictionary/Dictionary';
import Audio from '../components/audio-game/Audio';
import Sprint from '../components/sprint-game/Sprint';
import Statistic from '../components/statistic/Statistic';
import About from '../components/about/About';

export const COLORS = [
  { backgroundColor: '' },
  { backgroundColor: '#FDE500' },
  { backgroundColor: '#FE941B' },
  { backgroundColor: '#4FCB64' },
  { backgroundColor: '#15C9FE' },
  { backgroundColor: '#FE95D0' },
  { backgroundColor: '#CC62A5' },
];

export const pages = {
  dictionary: Dictionary,
  main: Main,
  null: Main,
  audio: Audio,
  sprint: Sprint,
  statistic: Statistic,
  about: About,
};
