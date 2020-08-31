/* eslint-disable react/jsx-props-no-spreading, indent */
import React from 'react';

import TableRowCore from '@material-ui/core/TableRow';

import styled from 'styled-components';

const TableRow = styled(({ ...props }) => <TableRowCore {...props} />)``;

export { TableRow };
