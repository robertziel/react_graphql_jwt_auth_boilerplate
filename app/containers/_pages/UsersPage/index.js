import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';

import UsersList from './UsersList';
import messages from './messages';

export default function UsersPage() {
  return (
    <Grid container fullHeight>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item fullHeightMinusHeader xs={12}>
        <UsersList />
      </Grid>
    </Grid>
  );
}
