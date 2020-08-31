/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import styled, { css } from 'styled-components';

const Wrapper = styled(({ tableRow, ...props }) => <div {...props} />)`
  width: 100%;
  height: 100%;

  div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
  }

  ${({ tableRow }) =>
    tableRow &&
    css`
      position: relative;
      min-height: 200px;
    `}
`;

export default Wrapper;
