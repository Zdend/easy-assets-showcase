import React, { Component } from 'react';
import throttle from 'lodash.throttle';

export default function throttleRender(ComponentToThrottle, ...throttleArgs) {
  return class ThrottledContainer extends Component {
    updateThrottled = throttle(this.forceUpdate, ...throttleArgs);

    shouldComponentUpdate() {
      this.updateThrottled();
      return false;
    }

    componentWillUnmount() {
      this.updateThrottled.cancel();
    }

    render() {
      return <ComponentToThrottle {...this.props} />;
    }
  };
}
