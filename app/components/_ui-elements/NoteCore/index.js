import React from 'react';
import PropTypes from 'prop-types';

function Note(props) {
  if (props.message) {
    return (
      <div className={props.className}>
        <p>{props.message}</p>
      </div>
    );
  }
  return null;
}

Note.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
};

export default Note;
