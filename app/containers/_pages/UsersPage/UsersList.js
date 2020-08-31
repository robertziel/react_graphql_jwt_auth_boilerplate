import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Paper,
  Scroll,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from 'components/_ui-elements';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';
import FetchedContent from 'containers/FetchedContent';

import messages from './messages';

function UsersList() {
  const fetcher = useApiFetcher();
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  // Pagination
  const [pagination, setPagination] = useState({ page: 0, rowsPerPage: 10 });

  const changePage = (event, newPage) => {
    setPagination({ page: newPage, rowsPerPage: pagination.rowsPerPage });
  };

  const changeRowsPerPage = (event) => {
    setPagination({ page: 0, rowsPerPage: event.target.value });
  };

  const fetchData = () => {
    fetcher.get({
      path: '/users',
      params: {
        page: pagination.page + 1,
        per_page: pagination.rowsPerPage,
      },
      afterSuccess: (result) => {
        setCount(result.count);
        setUsers(result.users);
      },
    });
  };

  useEffect(() => fetchData(), [pagination]);

  return (
    <Paper fullHeight noPadding pagination>
      <Scroll>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width="200px">
                <FormattedMessage {...messages.labelUsername} />
              </TableCell>
              <TableCell>
                <FormattedMessage {...messages.labelEmail} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FetchedContent tableRow processing={fetcher.processing}>
              {users.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </FetchedContent>
          </TableBody>
        </Table>
      </Scroll>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={count}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={changePage}
        onChangeRowsPerPage={changeRowsPerPage}
      />
    </Paper>
  );
}

export default UsersList;
