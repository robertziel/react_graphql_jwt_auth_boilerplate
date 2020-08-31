import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import LanguageToggle from 'components/LanguageToggle/index';

import Wrapper from './Wrapper';
import messages from './messages';

function Footer(props) {
  return (
    <Wrapper marginLeft={props.marginLeft}>
      <section>
        <div className="message">
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: (
                <a href="https://robertz.co" target="_blank">
                  Robert Zieliński
                </a>
              ),
            }}
          />
        </div>
        <div className="footer-right">
          <LanguageToggle />
        </div>
      </section>
    </Wrapper>
  );
}

Footer.propTypes = {
  marginLeft: PropTypes.number,
};

export default Footer;
