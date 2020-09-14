import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container, Divider, H1, Link, Paper } from 'components/_ui-elements';

import Form from './Form';
import messages from './messages';

function SignUpPage() {
  return (
    <Container fullHeight centerContent>
      <Paper topLine>
        <H1>
          <FormattedMessage {...messages.title} />
        </H1>
        <Divider />
        <Form />
        <Link href="/sign-in">
          <FormattedMessage {...messages.signIn} />
        </Link>
      </Paper>
    </Container>
  );
}

export default SignUpPage;
