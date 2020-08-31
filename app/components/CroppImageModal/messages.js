/*
 * AvatarPage Messages
 *
 * This contains all the text for the AvatarPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.CroppImageModal';

export default defineMessages({
  submit: {
    id: `${scope}.submit`,
    defaultMessage: 'Crop and upload avatar',
  },
  zoom: {
    id: `${scope}.zoom`,
    defaultMessage: 'Zoom',
  },
  rotation: {
    id: `${scope}.rotation`,
    defaultMessage: 'Rotation',
  },
});
