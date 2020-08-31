/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import TableCore from '@material-ui/core/Table';

import styled from 'styled-components';

const Table = styled(({ ...props }) => <TableCore {...props} />)``;

export { Table };
