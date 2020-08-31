/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import TableBodyCore from '@material-ui/core/TableBody';

import styled from 'styled-components';

const TableBody = styled(({ ...props }) => <TableBodyCore {...props} />)`
  position: relative;
`;

export { TableBody };
