/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import ButtonCore from '@material-ui/core/Button';

import styled, { css } from 'styled-components';

import { colors } from 'styles/constants';

const Button = styled(({ navbar, ...props }) => <ButtonCore {...props} />)`
  &.MuiButton-root {
    border-radius: 0%;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.23);
    padding: 5px 16px;
  }

  ${({ navbar }) =>
    navbar &&
    css`
      &.MuiButton-root {
        height: 100%;
        width: 100%;
        border: none;

        &:hover {
          background: ${colors.lightMain};
          color: ${colors.main};

          span {
            color: ${colors.main};
          }
        }

        span {
          color: #495057;
          font-size: 30px;
          transition: color 100ms linear;
        }
      }
    `}
`;

export { Button };
