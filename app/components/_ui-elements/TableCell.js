/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import TableCellCore from '@material-ui/core/TableCell';

import styled from 'styled-components';

const TableCell = styled(({ ...props }) => <TableCellCore {...props} />)``;

export { TableCell };
