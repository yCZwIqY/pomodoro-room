const colors = {
  primary: '#9F51FE',
  secondary: '#6F53FD',
  base: '#BC93FF',
  shadow: '#D1D8FF',
  'sub-base': '#C2FDFF',
  text: '#60CFFF',
  'text-accent': '#228AED'
};

const fontSize = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px'
};

const gradiant = {
  linear: `linear-gradient(0deg, ${colors.primary}, ${colors.secondary})`,
  'linear-4': `linear-gradient(90deg, ${colors.primary}, ${colors.secondary}, ${colors.primary}, ${colors.secondary}, ${colors.primary})`,
  radial: `radial-gradient(circle, ${colors.primary}, ${colors.secondary})`
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
export default { colors, fontSize, gradiant, buttonColors };
