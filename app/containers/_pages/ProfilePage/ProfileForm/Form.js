import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Divider,
  Grid,
  SubmitButton,
  TextField,
} from 'components/_ui-elements';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import {
  profileUpdateFailedNotify,
  profileUpdateSucceededNotify,
} from './notifications';

function Form({ intl, user }) {
  const fetcher = useApiFetcher();

  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();

    fetcher.post({
      disableRetry: true,
      path: '/profile',
      body: {
        email,
        password,
        password_confirmation: passwordConfirmation,
        username,
      },
      afterSuccess: (result) => {
        if (result.profile) {
          profileUpdateSucceededNotify();
          setErrorMessages({});
        } else {
          setErrorMessages(result.error_messages);
          profileUpdateFailedNotify();
        }
      },
    });
  };

  const passwordErrorMessage = () => {
    const message = errorMessages.password ? `${errorMessages.password}. ` : '';
    return message + intl.formatMessage(messages.formPasswordLeaveBlank);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <TextField
          defaultValue={username}
          label={intl.formatMessage(messages.formUsername)}
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined"
          helperText={errorMessages.username}
          error={!!errorMessages.username}
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={email}
          label={intl.formatMessage(messages.formEmail)}
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          helperText={errorMessages.email}
          error={!!errorMessages.email}
        />
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPassword)}
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          helperText={passwordErrorMessage()}
          error={!!errorMessages.password}
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPasswordConfirmation)}
          type="password"
          name="password_confirmation"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          variant="outlined"
          helperText={errorMessages.password_confirmation}
          error={!!errorMessages.password_confirmation}
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

Form.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectIntl(Form);
