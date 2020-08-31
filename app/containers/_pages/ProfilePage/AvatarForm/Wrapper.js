/* eslint-disable indent */

import styled from 'styled-components';

import { colors } from 'styles/constants';

const Wrapper = styled.div`
  float: right;

  .MuiPaper-root {
    position: relative;
    height: 200px;
    width: 200px;

    .MuiButton-root {
      padding: 0px;

      .avatar {
        width: 100%;
      }

      .set-avatar-message {
        position: absolute;
        top: 0px;
        background: #00000082;
        color: white;
        padding: 5px;
        width: 100%;
        text-align: center;
      }

      .file-input {
        display: none;
      }

      &:hover {
        background: ${colors.main};
      }
    }
  }
`;

export default Wrapper;
