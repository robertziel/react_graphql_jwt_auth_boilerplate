import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { FormattedMessage } from 'react-intl';

import { Slider, SubmitButton, Dialog, Grid } from 'components/_ui-elements';

import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import getCroppedImg from './cropImage';
import messages from './messages';
import Wrapper from './Wrapper';

function CroppImageModal({ imageBase64, onClose, onSubmit }) {
  const [processing, setProcessing] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  };

  const proceedAndSubmitCroppedImage = () => {
    setProcessing(true);
    getCroppedImg(
      imageBase64,
      croppedAreaPixels,
      rotation,
    ).then((croppedImageBase64) => onSubmit(croppedImageBase64));
  };

  return (
    <Dialog open={!!imageBase64}>
      <DialogTitle disableTypography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Wrapper>
        <div className="crop-area">
          <Cropper
            image={imageBase64}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={3 / 3}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <Grid className="controls-section">
          <Grid>
            <Typography variant="overline">
              <FormattedMessage {...messages.zoom} />
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, value) => setZoom(value)}
            />
          </Grid>
          <Grid>
            <Typography variant="overline">
              <FormattedMessage {...messages.rotation} />
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e, value) => setRotation(value)}
            />
          </Grid>
          <SubmitButton
            processing={processing}
            onClick={proceedAndSubmitCroppedImage}
          >
            <FormattedMessage {...messages.submit} />
          </SubmitButton>
        </Grid>
      </Wrapper>
    </Dialog>
  );
}

CroppImageModal.propTypes = {
  imageBase64: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CroppImageModal;
