import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import FileInput from 'react-file-input-previews-base64';
import dataUrlToFile from 'utils/dataUrlToFile';

import { Button } from 'components/_ui-elements';
import CroppImageModal from 'components/CroppImageModal';

import useApiFetcher from 'containers/BackendApiConnector/fetcher';

import messages from './messages';
import {
  avatarUpdateFailedNotify,
  avatarUpdateSucceededNotify,
} from './notifications';

export default function Form({ avatar, onAvatarUpdate }) {
  const [inputImageBase64, setInputImageBase64] = useState();

  const handleNewImageUpload = (file) => {
    setInputImageBase64(file.base64);
  };

  const fetcher = useApiFetcher();

  const submitNewAvatar = (newAvatarBase64) => {
    const file = dataUrlToFile(newAvatarBase64, 'avatar.jpg');

    fetcher.post({
      disableRetry: true,
      path: '/profile/avatar',
      body: {
        avatar: file,
      },
      afterSuccess: (result) => {
        if (result.avatar) {
          onAvatarUpdate();
          avatarUpdateSucceededNotify();
        } else {
          avatarUpdateFailedNotify();
        }
      },
    });
    setInputImageBase64(undefined);
  };

  return (
    <div>
      <CroppImageModal
        imageBase64={inputImageBase64}
        onSubmit={submitNewAvatar}
        onClose={() => setInputImageBase64(undefined)}
      />
      <Button variant="contained" component="label">
        <img className="avatar" src={avatar} alt="Profile avatar" />
        <div className="set-avatar-message">
          <FormattedMessage {...messages.setAvatar} />
        </div>
        <div className="file-input">
          <FileInput
            multiple={false}
            callbackFunction={handleNewImageUpload}
            accept="image/x-png,image/gif,image/jpeg"
          />
        </div>
      </Button>
    </div>
  );
}

Form.propTypes = {
  avatar: PropTypes.string,
  onAvatarUpdate: PropTypes.func.isRequired,
};
