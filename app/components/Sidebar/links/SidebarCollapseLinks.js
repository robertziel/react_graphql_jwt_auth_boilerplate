import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { matchPath, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { colors } from 'styles/constants';

import CommonLinkContent from './CommonLinkContent';
import LinkWrapper from './LinkWrapper';

class SidebarCollapseLinks extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = { collapsed: this.isSectionActive() };
  }

  linkMatchPath(link) {
    return matchPath(this.props.location.pathname, {
      path: link.href,
    });
  }

  isSectionActive() {
    return this.props.links.some((link) => this.linkMatchPath(link));
  }

  toggle() {
    this.setState((state) => ({ collapsed: !state.collapsed }));
  }

  renderLink(link, index) {
    return (
      <NavLink
        key={index}
        exact={link.exact}
        to={link.href}
        className="sidebar-link sidebar-collapse-link"
      >
        <div className="line"></div>
        <div className="evaporating">
          <FormattedMessage {...link.text} />
        </div>
      </NavLink>
    );
  }

  render() {
    const CollapseLinks = styled.div`
      &:not(.show) {
        width: 200px;
        height: 0px;
        overflow: hidden;
      }

      .sidebar-collapse-link {
        position: relative;
        height: 40px;
        width: calc(100% - 20px);
        margin: 10px;
        border-radius: 5px;

        .line {
          background: ${colors.lightMain};
          border-radius: 5px;
          width: 6px;
          height: 40px;
          position: absolute;
          left: 20px;
          transition: left 100ms linear;
        }

        span {
          margin-left: 30px;
          padding-left: 10px;
          font-size: 17px;
          line-height: 41px;
        }
      }
    `;

    const StyledLinkWrapper = styled(LinkWrapper)`
      .collapse-icon {
        position: absolute;
        right: 0px;
        top: 17px;
      }
    `;

    const buttonActiveClassName = this.isSectionActive() ? ' active' : '';

    const buttonClassName = `main-sidebar-link sidebar-link ${buttonActiveClassName}`;

    const collapseLinksClassName = `collapse ${
      this.state.collapsed ? 'show' : ''
    }`;

    return (
      <StyledLinkWrapper>
        <button type="button" onClick={this.toggle} className={buttonClassName}>
          <CommonLinkContent
            fontAwesomeName={this.props.fontAwesomeName}
            text={this.props.text}
          />
          <FontAwesome
            name="angle-down"
            className="collapse-icon evaporating"
          />
        </button>
        <CollapseLinks className={collapseLinksClassName}>
          {this.props.links.map((link, index) => this.renderLink(link, index))}
        </CollapseLinks>
      </StyledLinkWrapper>
    );
  }
}

SidebarCollapseLinks.propTypes = {
  fontAwesomeName: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
  text: PropTypes.object.isRequired,
};

export default withRouter(SidebarCollapseLinks);
