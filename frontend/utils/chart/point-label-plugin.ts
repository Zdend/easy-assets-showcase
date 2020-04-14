import Chartist from 'chartist';

interface PointLabelPluginOptions {
  labelClass?: string;
  labelOffset?: {
    x: number;
    y: number;
  };

  textAnchor?: 'start' | 'middle' | 'end';
  align?: 'left' | 'center' | 'right';
  labelInterpolationFnc?: Function;
}

const defaultOptions: PointLabelPluginOptions = {
  labelClass: 'ct-label',
  labelOffset: {
    x: 0,
    y: -10
  },
  textAnchor: 'middle',
  align: 'center',
  labelInterpolationFnc: Chartist.noop
};

const labelPositionCalculation = {
  point(data) {
    return {
      x: data.x,
      y: data.y
    };
  },
  bar: {
    left(data) {
      return {
        x: data.x1,
        y: data.y1
      };
    },
    center(data) {
      return {
        x: data.x1 + (data.x2 - data.x1) / 2,
        y: data.y1
      };
    },
    right(data) {
      return {
        x: data.x2,
        y: data.y1
      };
    }
  }
};

const ctPointLabelsPlugin = (pluginOptions?: PointLabelPluginOptions) => {
  const options: PointLabelPluginOptions = Chartist.extend({}, defaultOptions, pluginOptions);

  const addLabel = (data, position, series) => {
    // if x and y exist concat them otherwise output only the existing value

    const value =
      data.value.x !== undefined && data.value.y
        ? `${data.value.x}, ${data.value.y}`
        : data.value.y || data.value.x;

    const textLabel = options.labelInterpolationFnc(value, data.index, series);
    if (!textLabel) {
      return;
    }
    data.group
      .elem(
        'text',
        {
          x: position.x + options.labelOffset.x,
          y: position.y + options.labelOffset.y,
          style: `text-anchor: ${options.textAnchor}`
        },
        options.labelClass
      )
      .text(textLabel);
  };

  return chart => {
    if (chart instanceof Chartist.Line || chart instanceof Chartist.Bar) {
      chart.on('draw', data => {
        const positonCalculator =
          (labelPositionCalculation[data.type] &&
            labelPositionCalculation[data.type][options.align]) ||
          labelPositionCalculation[data.type];
        if (positonCalculator) {
          addLabel(data, positonCalculator(data), data.series.data);
        }
      });
    }
  };
};

export default ctPointLabelsPlugin;
