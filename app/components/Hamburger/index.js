import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function Hamburger(props) {
  const openClassName = props.isOpen ? 'open' : '';
  const className = `hamburger ${openClassName}`;

  return (
    <Wrapper className={className} onClick={props.onClick}>
      <div className="hamburger-container">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Wrapper>
  );
}

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Hamburger;
