/* eslint-disable indent */

import styled from 'styled-components';

import { colors } from 'styles/constants';

const Wrapper = styled.footer`
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: ${({ marginLeft }) =>
    marginLeft ? `calc(100% - ${marginLeft}px)` : '100%'};
  height: 40px;
  background-color: #ffffff;
  border-top: rgba(0, 0, 0, 0.02) solid 1px;
  transition: width 100ms ease-out;

  .footer-right {
    float: right;
    height: 40px;
    width: 40px;
    margin-right: 5px;
  }

  .message {
    text-transform: uppercase;
    margin: 8px;
    float: left;

    a {
      color: ${colors.main};
      text-decoration: none;
      font-weight: 600;
    }
  }
`;

export default Wrapper;
