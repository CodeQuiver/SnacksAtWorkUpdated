import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => {
  return (
    <header>
      <IndexLink to="/" ><h2>Shopping Cart</h2></IndexLink>
      
    </header>
  );
};

export default Header;