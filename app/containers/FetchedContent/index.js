import React from 'react';
import PropTypes from 'prop-types';

import { SelfBuildingSquareSpinner } from 'react-epic-spinners';
import { colors } from 'styles/constants';

import Wrapper from './Wrapper';

function FetchedContent({ children, processing, spinner, tableRow }) {
  const spinnerElement = spinner || (
    <SelfBuildingSquareSpinner color={colors.main} size={40} />
  );

  const wrappedSpinner = tableRow ? (
    <tr>
      <td colSpan="9999">
        <Wrapper tableRow>{spinnerElement}</Wrapper>
      </td>
    </tr>
  ) : (
    <Wrapper>{spinnerElement}</Wrapper>
  );

  return processing ? wrappedSpinner : children;
}

FetchedContent.propTypes = {
  children: PropTypes.node.isRequired,
  processing: PropTypes.bool.isRequired,
  spinner: PropTypes.element,
  tableRow: PropTypes.bool, // spinner will be rendered inside `tr > td`
};

export default FetchedContent;
