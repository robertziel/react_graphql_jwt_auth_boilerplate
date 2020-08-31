/* eslint-disable indent */

import styled, { css } from 'styled-components';

import NoteCore from './NoteCore';

const Note = styled(NoteCore)`
  background: #ffffff;
  padding: 5px;
  font-weight: 200;

  ${({ error }) =>
    error &&
    css`
      background: linear-gradient(
        27deg,
        rgb(236, 75, 75) 0%,
        rgb(255, 63, 63) 65%,
        rgb(255, 112, 112) 100%
      );
      font-weight: 400;
      color: white;
    `}
`;

export { Note };
