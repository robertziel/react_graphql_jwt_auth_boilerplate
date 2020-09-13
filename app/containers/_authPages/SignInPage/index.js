import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container, Divider, H1, Paper } from 'components/_ui-elements';

import Form from './Form';
import messages from './messages';

function SignInPage() {
  return (
    <Container fullHeight centerContent>
      <Paper topLine>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <Divider />
        <Form />
      </Paper>
    </Container>
  );
}

export default SignInPage;
