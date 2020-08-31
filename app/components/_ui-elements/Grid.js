/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import GridCore from '@material-ui/core/Grid';

import styled, { css } from 'styled-components';

const Grid = styled(({ fullHeight, fullHeightMinusHeader, ...props }) => (
  <GridCore {...props} />
))`
  padding: 10px;

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}

  ${({ fullHeightMinusHeader }) =>
    fullHeightMinusHeader &&
    css`
      height: calc(100% - 100px);
    `}
`;

export { Grid };
