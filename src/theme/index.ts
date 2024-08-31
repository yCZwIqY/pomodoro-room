const colors = {
  primary: '#9F51FE',
  secondary: '#6F53FD',
  base: '#A77DFE',
  shadow: '#D1D8FF',
  'sub-base': '#C2FDFF',
  text: '#60CFFF',
  'text-accent': '#228AED',
  'pink-shadow': '#B20D78',
  yellow: '#FFC90C'
};

const fontSize = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px'
};

const gradiant = {
  linear: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
  'linear-4': `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
  radial: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`,
  'pink-linear': `linear-gradient(0deg, #FBDBFF, #FF7AD8)`
};

const buttonColors = {
  red: {
    bg: '#FF4672',
    shadow: '#FF265A'
  },
  green: {
    bg: '#92F200',
    shadow: '#39BD01'
  },
  purple: {
    bg: '#B169FA',
    shadow: '#8014EE'
  },
  yellow: {
    bg: '#FFF635',
    shadow: '#FFC90C'
  },
  blue: {
    bg: '#4CDAFE',
    shadow: '#00ADE3'
  },
  pink: {
    bg: '#FF60D2',
    shadow: '#FF29C3'
  }
};

const device = {
  mobile: `screen and (max-width: 375px)`,
  tablet: `screen and (max-width: 768px)`,
  laptop: `screen and (max-width: 1024px)`
};
export default { colors, fontSize, gradiant, buttonColors, device };
