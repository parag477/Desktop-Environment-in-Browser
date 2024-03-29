import type { DefaultTheme } from 'styled-components';
import vantaWaves from 'utils/vantaWaves';

const colors = {
  background: '#000',
  highlight: '#76B9ED',
  startButton: '#FFF',
  taskbar: 'rgba(0, 0, 0, 60%)',
  taskbarHover: 'hsla(0, 0%, 25%, 70%)',
  text: 'rgba(255, 255, 255, 80%)',
  window: '#808080'
};

const formats = {
  date: <Intl.DateTimeFormatOptions>{
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  },
  time: <Intl.DateTimeFormatOptions>{
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }
};

const sizes = {
  clock: {
    fontSize: '12px',
    width: '76px'
  },
  startButton: {
    iconSize: '19px',
    width: '36px'
  },
  taskbar: {
    blur: '5px',
    entry: {
      borderSize: '2px',
      fontSize: '12px',
      icon: {
        margin: '0 5px',
        size: '16px'
      },
      maxWidth: '161px'
    },
    height: '30px'
  }
};

const wallpaper = vantaWaves({
  color: 0x274c,
  shininess: 35,
  waveHeight: 15,
  waveSpeed: 0.3,
  zoom: 0.9
});

const defaultTheme: DefaultTheme = {
  colors,
  formats,
  sizes,
  wallpaper
};

export default defaultTheme;
