const colours = [
  '#fadb14',
  '#faad14',
  '#a0d911',
  '#1890ff',
  '#13c2c2',
  '#eb2f96',
  '#722ed1',
  '#2f54eb',
  '#f5222d',
  '#fa541c'
];

export const getColor = (key: string): string => {
  const number = (key.length && key.charCodeAt(0) % colours.length) || 0;
  return colours[number];
};
