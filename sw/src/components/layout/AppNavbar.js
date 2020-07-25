import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import NavLinks from './NavLinks';

const AppNavbar = () => {
  return (
    <Fragment>
      <div className='navbar-fixed'>
        <nav className='white'>
          <div className='container'>
            <div className='nav-wrapper'>
              <Link to='/' className='brand-logo teal-text'>
                MyTalki
              </Link>
              <Link to='/' data-target='mobile-nav' className='hide-on-large-only teal-text sidenav-trigger'>
                <i className='material-icons'>menu</i>
              </Link>
              <ul className='right hide-on-med-and-down'>
                <NavLinks />
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ul id='mobile-nav' className='sidenav'>
        <NavLinks />
      </ul>
    </Fragment>
  );
};

export default AppNavbar;
