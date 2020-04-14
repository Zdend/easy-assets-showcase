import React from 'react';

export default function withRerenderCheck(Component, shouldUpdate) {
  return class RerendereCheckContainer extends React.Component {
    shouldComponentUpdate(nextProps) {
      return shouldUpdate(this.props, nextProps);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}
