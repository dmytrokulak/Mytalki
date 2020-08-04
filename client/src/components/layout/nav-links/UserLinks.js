import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';

const UserLinks = ({ logout }) => {
  return (
    <Fragment>
      <li>
        <Link className='teal-text' to='/calendar'>
          Calendar
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/booking'>
          Booking
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/lessons'>
          Lessons
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/account'>
          Account
        </Link>
      </li>
      <li>
        <a href='#!' className='teal-text' onClick={logout}>
          Logout
        </a>
      </li>
    </Fragment>
  );
};

export default connect(null, { logout })(UserLinks);
