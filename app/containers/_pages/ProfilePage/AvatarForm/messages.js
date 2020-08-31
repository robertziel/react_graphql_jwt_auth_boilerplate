/*
 * AvatarPage Messages
 *
 * This contains all the text for the AvatarPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.avatarPage.AvatarForm';

export default defineMessages({
  setAvatar: {
    id: `${scope}.setAvatar`,
    defaultMessage: 'Set avatar',
  },
  avatarUpdateSucceededNotify: {
    id: `${scope}.form.avatarUpdateSucceededNotify`,
    defaultMessage: 'Avatar updated successfully',
  },
  avatarUpdateFailedNotify: {
    id: `${scope}.form.avatarUpdateFailedNotify`,
    defaultMessage: 'Your avatar could not be updated',
  },
});
