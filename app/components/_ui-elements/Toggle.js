/* eslint-disable indent */

import styled, { css } from 'styled-components';

import { colors } from 'styles/constants';
import ToggleCore from './ToggleCore';

const Toggle = styled(ToggleCore)`
  ${({ navbar }) =>
    navbar &&
    css`
      &.MuiInputBase-root {
        cursor: pointer;
        height: 100%;
        width: 100%;

        .MuiSelect-root {
          width: inherit;
          height: inherit;
          padding: 0px;
          transition: background 100ms, color 100ms linear;
          background-color: inherit;
          font-size: 20px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: center;

          &:focus {
            background: inherit;
          }

          &:hover {
            background: ${colors.lightMain};
            color: ${colors.main};
          }
        }

        .MuiSvgIcon-root {
          display: none;
        }
      }
    `}
`;

export { Toggle };
