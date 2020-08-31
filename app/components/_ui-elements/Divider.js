/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import DividerCore from '@material-ui/core/Divider';

import styled from 'styled-components';

const Divider = styled(({ ...props }) => <DividerCore {...props} />)``;

export { Divider };
