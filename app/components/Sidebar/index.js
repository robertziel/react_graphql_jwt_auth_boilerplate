import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { sidebarToggleSelector } from './selectors';
import messages from './messages';
import SidebarLink from './links/SidebarLink';
import SidebarLogo from './SidebarLogo';
import SidebarCollapseLinks from './links/SidebarCollapseLinks';
import SidebarCollapse from './SidebarCollapse';

export function Sidebar(props) {
  return (
    <SidebarCollapse
      className={`sidebar-collapse ${props.collapse ? ' collapsed' : ''}`}
    >
      <SidebarLogo href="https://robertz.co" />
      <SidebarLink
        exact
        href="/"
        text={messages.dashboradPage}
        fontAwesomeName="home"
      />
      <SidebarLink
        exact
        href="/profile"
        text={messages.profilePage}
        fontAwesomeName="user"
      />
      <SidebarCollapseLinks
        text={messages.multipleChoice}
        fontAwesomeName="folder"
        links={[
          { exact: true, href: '/one-page', text: messages.onePage },
          { exact: true, href: '/two-page', text: messages.twoPage },
        ]}
      />
      <SidebarCollapseLinks
        text={messages.multipleChoice}
        fontAwesomeName="folder"
        links={[{ exact: true, href: '/three-page', text: messages.threePage }]}
      />
      <SidebarLink
        exact
        href="/not-found-page"
        text={messages.notFoundPage}
        fontAwesomeName="exclamation-triangle"
      />
    </SidebarCollapse>
  );
}

Sidebar.propTypes = {
  collapse: PropTypes.bool.isRequired,
};

function mapStateToProps() {
  return createSelector(sidebarToggleSelector(), (collapse) => ({
    collapse,
  }));
}

export default connect(mapStateToProps)(Sidebar);
