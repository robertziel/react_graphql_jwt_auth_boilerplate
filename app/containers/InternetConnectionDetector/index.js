import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  internetConnectionBackNotify,
  noInternetConnectionNotify,
} from './notifications';

let online = true;
let offlineNotification = null;

class InternetConnectionDetector extends Component {
  componentDidMount() {
    window.addEventListener('online', this.updateIndicator);
    window.addEventListener('offline', this.updateIndicator);
    this.updateIndicator();
  }

  updateIndicator() {
    online = navigator.onLine;

    // Update notification
    if (online) {
      if (offlineNotification) {
        internetConnectionBackNotify();
        offlineNotification.remove();
      }
    } else {
      offlineNotification = noInternetConnectionNotify();
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

InternetConnectionDetector.propTypes = {
  children: PropTypes.node.isRequired,
};

export function isOnline() {
  return online;
}

export default InternetConnectionDetector;
