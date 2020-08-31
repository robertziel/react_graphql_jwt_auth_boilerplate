/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import DialogCore from '@material-ui/core/Dialog';

import styled from 'styled-components';

const Dialog = styled(({ ...props }) => <DialogCore {...props} />)``;

export { Dialog };
