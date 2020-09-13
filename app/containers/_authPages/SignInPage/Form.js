import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SubmitButton, Note, Grid, TextField } from 'components/_ui-elements';

import { setAuthenticationToken } from 'containers/ApiConnector/actions';
import { useMutation } from 'containers/ApiConnector/apollo/fetchers';

import messages from './messages';
import { signedInNotify } from './notifications';
import { AUTH_LOGIN_MUTATION } from './graphql';

function Form({ intl, onSignInSuccess }) {
  // Form state
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [login, { loading }] = useMutation(AUTH_LOGIN_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      email,
      password,
    },
    onCompleted: (data) => {
      const feedback = data.authLogin;

      if (feedback.token) {
        onSignInSuccess(feedback.token);
        signedInNotify();
      } else {
        setErrorMessage(
          intl.formatMessage(messages.wrongSignInCredentialsError),
        );
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    login();
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
          required
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPassword)}
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          required
        />
      </Grid>
      <Grid>
        <SubmitButton processing={loading}>
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
