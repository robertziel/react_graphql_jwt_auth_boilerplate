import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import {
  Divider,
  Grid,
  SubmitButton,
  TextField,
} from 'components/_ui-elements';

import { useMutation } from 'containers/ApiConnector/apollo/fetchers';
import prepareActiveModelErrors from 'utils/prepareActiveModelErrors';
import { PROFILE_UPDATE_MUTATION } from './graphql';

import messages from './messages';
import {
  profileUpdateFailedNotify,
  profileUpdateSucceededNotify,
} from './notifications';

function Form({ intl, user }) {
  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const [profileUpdate, { loading }] = useMutation(PROFILE_UPDATE_MUTATION, {
    context: {
      disableRetry: true,
    },
    variables: {
      email,
      firstName,
      lastName,
      password,
      passwordConfirmation,
    },
    onCompleted: (data) => {
      const feedback = data.profileUpdate;
      if (feedback.success) {
        profileUpdateSucceededNotify();
        setErrorMessages({});
      } else {
        setErrorMessages(prepareActiveModelErrors(feedback.errors));
        profileUpdateFailedNotify();
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    profileUpdate();
  };

  const passwordErrorMessage = () => {
    const message = errorMessages.attributes_password
      ? `${errorMessages.attributes_password}. `
      : '';
    return message + intl.formatMessage(messages.formPasswordLeaveBlank);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid>
        <TextField
          defaultValue={firstName}
          label={intl.formatMessage(messages.formFirstName)}
          type="text"
          name="first_name"
          onChange={(event) => setFirstName(event.target.value)}
          variant="outlined"
          helperText={errorMessages.attributes_firstName}
          error={!!errorMessages.attributes_firstName}
          required
        />
      </Grid>
      <Grid>
        <TextField
          defaultValue={lastName}
          label={intl.formatMessage(messages.formLastName)}
          type="text"
          name="last_name"
          onChange={(event) => setLastName(event.target.value)}
          variant="outlined"
          helperText={errorMessages.attributes_lastName}
          error={!!errorMessages.attributes_lastName}
          required
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
          helperText={errorMessages.attributes_email}
          error={!!errorMessages.attributes_email}
          required
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
          error={!!errorMessages.attributes_password}
        />
      </Grid>
      <Grid>
        <TextField
          label={intl.formatMessage(messages.formPasswordConfirmation)}
          type="password"
          name="password_confirmation"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          variant="outlined"
          helperText={errorMessages.attributes_passwordConfirmation}
          error={!!errorMessages.attributes_passwordConfirmation}
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

Form.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectIntl(Form);
