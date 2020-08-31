/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import TextFieldCore from '@material-ui/core/TextField';

import styled from 'styled-components';

import { colors } from 'styles/constants';

const TextField = styled(({ ...props }) => <TextFieldCore {...props} />)`
  width: 100%;

  .MuiFormLabel-root.Mui-focused {
    color: ${colors.main};
  }

  .MuiInputBase-root {
    .MuiOutlinedInput-notchedOutline {
      border-radius: 0px;
    }

    &.Mui-focused {
      &:after,
      .MuiOutlinedInput-notchedOutline {
        border-color: ${colors.main};
      }
    }
  }
`;

export { TextField };
