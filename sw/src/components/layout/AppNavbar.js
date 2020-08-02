import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminLinks from './nav-links/AdminLinks';
import GuestLinks from './nav-links/GuestLinks';
import UserLinks from './nav-links/UserLinks';

const AppNavbar = ({ auth: { isAuthenticated, isAdmin } }) => {
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
                {isAuthenticated ? isAdmin ? <AdminLinks /> : <UserLinks /> : <GuestLinks />}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ul id='mobile-nav' className='sidenav'>
        {isAuthenticated ? isAdmin ? <AdminLinks /> : <UserLinks /> : <GuestLinks />}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(AppNavbar);
