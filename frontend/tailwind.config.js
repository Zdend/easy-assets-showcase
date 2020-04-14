// https://tailwindcss.com/docs/configuration#core-plugins
const plugins = [
  { name: 'margin', variants: ['responsive'] },
  'padding',
  'backgroundColor',
  'cursor',
  'position',
  'maxHeight',
  'maxWidth',
  'height',
  'width',
  'alignSelf',
  'alignItems',
  'alignContent',
  'justifyContent',
  'fontSize',
  { name: 'display', variants: ['responsive'] },
  'fontWeight',
  'overflow',
  { name: 'textAlign', variants: ['responsive'] },
  'textTransform',
  'zIndex',
  'float',
  'flex',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap'
];

module.exports = {
  important: true,
  theme: {
    screens: {
      // 'xs': { max: '575px' },
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      'xxl': '1600px',
    },
  },
  variants: plugins.reduce((result, plugin) => {
    const name = typeof plugin === 'object' ? plugin.name : plugin;
    const variants =
      typeof plugin === 'object' && Array.isArray(plugin.variants) ? plugin.variants : [];
    return {
      ...result,
      [name]: variants
    };
  }, {}),
  plugins: [],
  corePlugins: plugins.map(plugin => (typeof plugin === 'object' ? plugin.name : plugin)),
};
