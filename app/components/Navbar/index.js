import React from 'react';

import LanguageToggle from 'components/LanguageToggle/index';
import SignOutButton from 'components/SignOutButton/index';

import Wrapper from './Wrapper';

function Navbar() {
  return (
    <Wrapper>
      <div className="navbar-right">
        <SignOutButton />
      </div>
      <div className="navbar-right">
        <LanguageToggle />
      </div>
    </Wrapper>
  );
}

export default Navbar;
