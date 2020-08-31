/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Grid, H1 } from 'components/_ui-elements';

import messages from './messages';

export default function NotFound() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Divider />
      </Grid>
    </Grid>
  );
}
