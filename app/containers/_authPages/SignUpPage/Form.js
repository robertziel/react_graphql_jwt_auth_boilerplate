import React, { useState } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import {
  Divider,
  Grid,
  SubmitButton,
  TextField,
} from 'components/_ui-elements';

import { useMutation } from 'containers/ApiConnector/apollo/fetchers';
import prepareActiveModelErrors from 'utils/prepareActiveModelErrors';
import { SIGN_UP_MUTATION } from './graphql';

import messages from './messages';
import { signedUpNotify, signUpFailedNotify } from './notifications';

function Form({ intl }) {
  const history = useHistory();
  // Form state
  const [errorMessages, setErrorMessages] = useState({});
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
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
      const feedback = data.authSignUp;
      if (feedback.success) {
        signedUpNotify();
        setErrorMessages({});
        redirectAfterSuccess();
      } else {
        signUpFailedNotify();
        setErrorMessages(prepareActiveModelErrors(feedback.errors));
      }
    },
  });

  const redirectAfterSuccess = () => {
    history.push('/login');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    signUp();
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
          helperText={errorMessages.attributes_password}
          error={!!errorMessages.attributes_password}
          required
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

Form.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Form);
