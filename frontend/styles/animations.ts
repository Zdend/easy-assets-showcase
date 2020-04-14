export const explodingStroke = `
@keyframes exploding-stroke {
  0% {
      stroke-width: 2px;
      opacity: 1
  }

  100% {
      stroke-width: 20px;
      opacity: 0
  }
}
`;

export const draw = `
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
`;
