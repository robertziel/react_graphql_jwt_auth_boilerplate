import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import styled from 'styled-components';
import { colors } from 'styles/constants';

import Hamburger from 'components/Hamburger/index';
import { toggleSidebar } from './actions';
import { sidebarToggleSelector } from './selectors';

const Div = styled.div`
  height: 60px;
  background: #fafbfc;

  .logo-section {
    width: 200px;
    float: left;

    a {
      .logo {
        position: relative;
        height: 100%;
        color: #000000;
        font-size: 30px;
        font-weight: 300;
        padding-left: 15px;
        padding-top: 8px;

        span {
          font-size: 10px;
          position: absolute;
          top: 40px;
          left: 129px;
          color: ${colors.main};
          font-weight: 300;
        }
      }
    }
  }

  .hamburger {
    float: right;
    height: 60px;
    width: 60px;
    padding-top: 8px;
  }
`;

function SidebarLogo(props) {
  return (
    <Div>
      <div className="logo-section">
        <a href={props.href} target="_blank">
          <div className="logo">
            Simple Panel
            <span>React Client</span>
          </div>
        </a>
      </div>
      <Hamburger
        isOpen={props.isHamburgerOpen}
        onClick={props.onHamburgerClick}
      />
    </Div>
  );
}

SidebarLogo.propTypes = {
  isHamburgerOpen: PropTypes.bool.isRequired,
  onHamburgerClick: PropTypes.func.isRequired,
  href: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onHamburgerClick: () => dispatch(toggleSidebar()),
    dispatch,
  };
}

function mapStateToProps() {
  return createSelector(sidebarToggleSelector(), (isHamburgerOpen) => ({
    isHamburgerOpen,
  }));
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarLogo);
