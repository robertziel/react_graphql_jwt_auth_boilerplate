/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import TablePaginationCore from '@material-ui/core/TablePagination';

import styled from 'styled-components';

const TablePagination = styled(({ ...props }) => (
  <TablePaginationCore {...props} />
))`
  background-color: #fdfcfc;
  border-top: 1px solid rgba(224, 224, 224, 1);
`;

export { TablePagination };
