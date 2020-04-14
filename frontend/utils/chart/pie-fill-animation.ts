import Chartist, { ChartistStatic } from 'chartist';

export const registerFillAnimation = (chartist: ChartistStatic['Pie'], duration: number = 500) => {
  chartist.on('draw', data => {
    if (data.type === 'slice') {
      // Get the total path length in order to use for dash array animation
      // eslint-disable-next-line no-underscore-dangle
      const pathLength = data.element._node.getTotalLength();

      // Set a dasharray that matches the path length as prerequisite to animate dashoffset
      data.element.attr({
        'stroke-dasharray': `${pathLength}px ${pathLength}px`
      });

      // Create animation definition while also assigning an ID to the animation for later sync usage
      const animationDefinition = {
        'stroke-dashoffset': {
          id: `anim${data.index}`,
          dur: duration,
          from: `${-pathLength}px`,
          to: '0px',
          easing: Chartist.Svg.Easing.easeOutQuint,
          // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
          fill: 'freeze'
        }
      };

      // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
      if (data.index !== 0) {
        // @ts-ignore
        animationDefinition['stroke-dashoffset'].begin = `anim${data.index - 1}.end`;
      }

      // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
      data.element.attr({
        'stroke-dashoffset': `${-pathLength}px`
      });

      // We can't use guided mode as the animations need to rely on setting begin manually
      // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
      data.element.animate(animationDefinition, false);
    }
  });
};
