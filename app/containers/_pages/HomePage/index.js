/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1, Paper } from 'components/_ui-elements';

import messages from './messages';

export default function HomePage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper></Paper>
      </Grid>
    </Grid>
  );
}
