import {loadFont as loadFredoka} from '@remotion/google-fonts/Fredoka';
import {loadFont as loadCaveat} from '@remotion/google-fonts/Caveat';

export const FONT = loadFredoka('normal', {weights: ['500', '600', '700'], subsets: ['latin']}).fontFamily;
export const HAND = loadCaveat('normal', {weights: ['700'], subsets: ['latin']}).fontFamily;

export const C = {
  bg: '#FBF6EC',
  ink: '#23232B',
  paper: '#FFFFFF',
  green: '#2DB77A',
  greenLight: '#9EDDB0',
  yellow: '#FFD166',
  gold: '#F6C343',
  red: '#EF476F',
  blue: '#3A86FF',
  navy: '#1D3557',
  sky: '#E3F1F4',
  ground: '#EFE3CB',
  wall: '#E8EEF1',
  wallDark: '#D3DEE3',
  floor: '#D9C9AC',
  wood: '#C98F5E',
  woodDark: '#A8744A',
  stone: '#F1EADC',
  stoneDark: '#E0D6C3',
  soft: '#EDE4D2',
  gray: '#9AA5B1',
};

export const SW = 9;
