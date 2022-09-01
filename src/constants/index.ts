/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import Main from '../components/main/Main';
import Dictionary from '../components/dictionary/Dictionary';
import AudioMain from '../components/audio-game/index';
import Sprint from '../components/sprint-game/Sprint';
import Statistic from '../components/statistic/Statistic';
import About from '../components/about/About';

export const COLORS = [
  { backgroundColor: '' },
  { borderColor: '#FDE500', color: '#000000', boxShadow: 'none' },
  { borderColor: '#FE941B', color: '#000000', boxShadow: 'none' },
  { borderColor: '#4FCB64', color: '#000000', boxShadow: 'none' },
  { borderColor: '#15C9FE', color: '#000000', boxShadow: 'none' },
  { borderColor: '#FE95D0', color: '#000000', boxShadow: 'none' },
  { borderColor: '#CC62A5', color: '#000000', boxShadow: 'none' },
  { borderColor: '#CC62A5', color: '#000000', boxShadow: 'none' },
  { color: '#ffffff' },
  { color: '' },
  { backgroundColor: '#FE941B' },
  { backgroundColor: '#4FCB64' },
  { backgroundColor: '#15C9FE' },
  { backgroundColor: '#FE95D0' },
  { backgroundColor: '#CC62A5' },
];

export const PAGE_DICTIONARY = 'dictionary';
export const PAGE_SPRINT = 'sprint';
export const PAGE_AUDIO = 'audio';
export const PAGE_MAIN = 'main';

export const pages = {
  dictionary: Dictionary,
  main: Main,
  null: Main,
  audio: AudioMain,
  sprint: Sprint,
  statistic: Statistic,
  about: About,
};

export const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

export const BTNS_BG = [
  { backgroundColor: '' },
  { backgroundColor: '#FDE500' },
  { backgroundColor: '#FE941B' },
  { backgroundColor: '#4FCB64' },
  { backgroundColor: '#15C9FE' },
  { backgroundColor: '#FE95D0' },
  { backgroundColor: '#CC62A5' },
];
