/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import LinearProgressCore from '@material-ui/core/LinearProgress';

import styled from 'styled-components';

import { colors } from 'styles/constants';

const LinearProgress = styled(({ ...props }) => (
  <LinearProgressCore {...props} />
))`
  .MuiLinearProgress-colorPrimary {
    background-color: ${colors.lightMain};
  }

  .MuiLinearProgress-barColorPrimary {
    background-color: ${colors.main};
  }
`;

export { LinearProgress };
