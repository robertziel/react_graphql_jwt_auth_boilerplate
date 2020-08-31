import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'components/_ui-elements/Button';
import { HollowDotsSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

function SubmitButton({ children, onClick, navbar, processing, spinner }) {
  const spinnerElement = spinner || (
    <HollowDotsSpinner color={colors.main} size={24} animationDelay={-100} />
  );

  return (
    <Button
      type="submit"
      disabled={processing}
      onClick={onClick}
      navbar={navbar}
    >
      {processing ? spinnerElement : children}
    </Button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  navbar: PropTypes.bool,
  processing: PropTypes.bool,
  spinner: PropTypes.element,
};

export default SubmitButton;
