import { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

let intl;

export function getIntl() {
  return intl;
}

export class IntlCatcher extends Component {
  constructor(props) {
    super(props);

    intl = props.intl;

    this.props = props;
  }

  render() {
    return this.props.children;
  }
}

IntlCatcher.propTypes = {
  children: PropTypes.node.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(IntlCatcher);
