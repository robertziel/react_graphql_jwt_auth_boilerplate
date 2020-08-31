import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';

export default function CommonLinkContent(props) {
  return (
    <div className="sidebarlink-container">
      <div className="mask"></div>
      <div className="sidebarlink-icon">
        <FontAwesome name={props.fontAwesomeName} />
      </div>
      <div className="evaporating">
        <FormattedMessage {...props.text} />
      </div>
    </div>
  );
}

CommonLinkContent.propTypes = {
  fontAwesomeName: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};
