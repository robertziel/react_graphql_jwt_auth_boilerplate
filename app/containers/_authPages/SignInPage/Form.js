import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SubmitButton, Note, Grid, TextField } from 'components/_ui-elements';

import { setAuthenticationToken } from 'containers/BackendApiConnector/actions';
import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import { signedInNotify } from './notifications';

function Form({ intl, onSignInSuccess }) {
  const fetcher = useApiFetcher();

  // Form state
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    fetcher.post({
      disableRetry: true,
      signIn: true,
      path: '/auth/sign_in',
      body: {
        email,
        password,
      },
      afterSuccess: (result) => {
        setErrorMessage(result.error_message);

        if (result.authentication_token) {
          onSignInSuccess(result.authentication_token);
          signedInNotify();
        }
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <Note error message={errorMessage} />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formEmail)}
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPassword)}
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
        />
      </Grid>
      <Grid>
        <SubmitButton processing={fetcher.processing}>
          <FormattedMessage {...messages.formButton} />
        </SubmitButton>
      </Grid>
    </form>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSignInSuccess: (token) => dispatch(setAuthenticationToken(token)),
    dispatch,
  };
}

Form.propTypes = {
  intl: intlShape.isRequired,
  onSignInSuccess: PropTypes.func,
};

export default injectIntl(connect(null, mapDispatchToProps)(Form));
