/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import SliderCore from '@material-ui/core/Slider';

import styled from 'styled-components';

import { colors } from 'styles/constants';

const Slider = styled(({ ...props }) => <SliderCore {...props} />)`
  &.MuiSlider-root {
    color: ${colors.main};

    .MuiSlider-thumb {
      &.MuiSlider-active,
      &:hover {
        box-shadow: 0px 0px 0px 14px ${colors.lightMain}66;
      }
    }
  }
`;

export { Slider };
