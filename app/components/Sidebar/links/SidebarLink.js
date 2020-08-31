import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import CommonLinkContent from './CommonLinkContent';
import LinkWrapper from './LinkWrapper';

export default function SidebarLink(props) {
  return (
    <LinkWrapper>
      <NavLink
        exact={props.exact}
        to={props.href}
        className="main-sidebar-link sidebar-link"
      >
        <CommonLinkContent
          fontAwesomeName={props.fontAwesomeName}
          text={props.text}
        />
      </NavLink>
    </LinkWrapper>
  );
}

SidebarLink.propTypes = {
  exact: PropTypes.bool,
  fontAwesomeName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
};
