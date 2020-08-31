import React from 'react';
import PropTypes from 'prop-types';

import { InputBase, MenuItem, Select } from '@material-ui/core';

function Toggle(props) {
  let options = [];

  if (props.values) {
    options = props.values.map((value) => (
      <MenuItem key={value} value={value}>
        {(props.messages && props.messages[value]) || value}
      </MenuItem>
    ));
  }

  return (
    <Select
      className={props.className}
      value={props.value || ''}
      onChange={props.onToggle}
      input={<InputBase />}
    >
      {options}
    </Select>
  );
}

Toggle.propTypes = {
  className: PropTypes.string,
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
