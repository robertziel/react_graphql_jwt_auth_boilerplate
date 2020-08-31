import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Toggle } from 'components/_ui-elements';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Wrapper from './Wrapper';
import { appLocales } from '../../i18n';

export function LanguageToggle(props) {
  return (
    <Wrapper>
      <Toggle
        navbar
        value={props.locale}
        values={appLocales}
        onToggle={props.onLanguageToggle}
      />
    </Wrapper>
  );
}

LanguageToggle.propTypes = {
  onLanguageToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLanguageToggle: (evt) => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageToggle);
