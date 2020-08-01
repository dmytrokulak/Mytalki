import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
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
    </Fragment>
  );
};

export default NavLinks;
