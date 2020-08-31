/*
 * ProfilePage Messages
 *
 * This contains all the text for the ProfilePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ProfilePage.ProfileForm';

export default defineMessages({
  formUsername: {
    id: `${scope}.form.username`,
    defaultMessage: 'Username',
  },
  formEmail: {
    id: `${scope}.form.email`,
    defaultMessage: 'E-mail',
  },
  formPasswordLeaveBlank: {
    id: `${scope}.form.PasswordLeaveBlank`,
    defaultMessage: 'Leave blank if you do not want to change your password',
  },
  formPassword: {
    id: `${scope}.form.password`,
    defaultMessage: 'New password',
  },
  formPasswordConfirmation: {
    id: `${scope}.form.passwordConfirmation`,
    defaultMessage: 'Confirm new password',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Update',
  },
  profileUpdateSucceededNotify: {
    id: `${scope}.form.profileUpdateSucceededNotify`,
    defaultMessage: 'Profile updated successfully',
  },
  profileUpdateFailedNotify: {
    id: `${scope}.form.profileUpdateFailedNotify`,
    defaultMessage: 'Your profile could not be updated',
  },
});
