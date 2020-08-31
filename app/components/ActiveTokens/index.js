import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import SecurityIcon from '@material-ui/icons/Security';

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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import FetchedContent from 'containers/FetchedContent';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import Wrapper from './Wrapper';

function ActiveTokens() {
  const fetcher = useApiFetcher();
  const [activeTokens, setActiveTokens] = useState([]);
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
      path: '/auth/active_tokens',
      params: {
        page: pagination.page + 1,
        per_page: pagination.rowsPerPage,
      },
      afterSuccess: (result) => {
        setCount(result.count);
        setActiveTokens(result.authentication_tokens);
      },
    });
  };

  useEffect(() => fetchData(), [pagination]);

  return (
    <Wrapper>
      <Paper fullHeight noPadding>
        <Toolbar>
          <Typography>
            <SecurityIcon />
            <FormattedMessage {...messages.header} />
          </Typography>
        </Toolbar>
        <Scroll>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell width="200px">
                  <FormattedMessage {...messages.labelIp} />
                </TableCell>
                <TableCell width="200px">
                  <FormattedMessage {...messages.labelBrowser} />
                </TableCell>
                <TableCell width="200px">
                  <FormattedMessage {...messages.labelPlatform} />
                </TableCell>
                <TableCell width="200px">
                  <FormattedMessage {...messages.labelLastUsedAt} />
                </TableCell>
                <TableCell width="200px">
                  <FormattedMessage {...messages.labelExpiresAt} />
                </TableCell>
                <TableCell width="200px">
                  <FormattedMessage {...messages.labelCreatedAt} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <FetchedContent tableRow processing={fetcher.processing}>
                {activeTokens.map((activeToken) => (
                  <TableRow hover key={activeToken.id}>
                    <TableCell>{activeToken.ip}</TableCell>
                    <TableCell>{activeToken.browser}</TableCell>
                    <TableCell>{activeToken.platform}</TableCell>
                    <TableCell>{activeToken.last_used_at}</TableCell>
                    <TableCell>{activeToken.expires_at}</TableCell>
                    <TableCell>{activeToken.created_at}</TableCell>
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
    </Wrapper>
  );
}

export default ActiveTokens;
