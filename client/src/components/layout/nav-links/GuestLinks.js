import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const GuestLinks = () => {
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
        <Link className='teal-text' to='/login'>
          Login
        </Link>
      </li>
      <li>
        <Link className='teal-text' to='/register'>
          Register
        </Link>
      </li>
    </Fragment>
  );
};

export default GuestLinks;
