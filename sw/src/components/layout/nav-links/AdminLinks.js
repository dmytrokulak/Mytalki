import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/authActions';
import { connect } from 'react-redux';

const AdminLinks = ({ logout }) => {
  return (
    <Fragment>
      <li>
        <Link className='teal-text' to='/lessons'>
          Lessons
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/calendar'>
          Calendar
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/lesson-types'>
          Lesson types
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/students'>
          Students
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

export default connect(null, { logout })(AdminLinks);
