/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import ContainerCore from '@material-ui/core/Container';

import styled, { css } from 'styled-components';

const Container = styled(({ centerContent, fullHeight, ...props }) => (
  <ContainerCore {...props} />
))`
  ${({ centerContent }) =>
    centerContent &&
    css`
      &.MuiContainer-root {
        display: flex;
        align-items: center;
        justify-content: center;

        .MuiPaper-root {
          max-width: 100%;
          width: 500px;
        }
      }
    `}

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}
`;

export { Container };
