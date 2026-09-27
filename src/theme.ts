import {continueRender, delayRender, staticFile} from 'remotion';

// Fonts are self-hosted in public/fonts so rendering never depends on the network.
const loaded: Record<string, boolean> = {};
export const localFont = (family: string, file: string, weight = '100 900') => {
  if (typeof window === 'undefined' || typeof FontFace === 'undefined' || loaded[family]) return family;
  loaded[family] = true;
  const h = delayRender(`font ${family}`);
  const ff = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format('woff2')`, {weight});
  ff.load()
    .then(() => {
      document.fonts.add(ff);
      continueRender(h);
    })
    .catch(() => continueRender(h));
  return family;
};

export const FONT = localFont('Fredoka', 'fredoka.woff2', '300 700');
export const HAND = localFont('Caveat', 'caveat.woff2', '400 700');

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
