import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';

const Register = ({ auth: { error, isAuthenticated }, history, register }) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error === 'User already exists') {
      // setAlert(error, 'danger');
      // clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (firstName === '' || email === '' || password === '') {
      // setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      // setAlert('Passwords do not match', 'danger');
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <div className='center-align'>
        <h4>Register</h4>
        <span>
          Or{' '}
          <Link class='teal-text' to='/login'>
            Login.
          </Link>
        </span>
      </div>
      <form onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s3 offset-s3'>
            <label htmlFor='firstName'>First Name</label>
            <input
              id='firstName'
              type='text'
              firstName='firstName'
              value={firstName}
              className='validate'
              onChange={onChange}
              required
            />
          </div>
          <div className='input-field col s3'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              id='lastName'
              type='text'
              lastName='lastName'
              value={lastName}
              className='validate'
              onChange={onChange}
              required
            />
          </div>
          <div className='input-field col s6 offset-s3'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              className='validate'
              onChange={onChange}
              required
            />
          </div>
          <div className='input-field col s6 offset-s3'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minLength='6'
              className='validate'
            />
          </div>
          <div className='input-field col s6 offset-s3'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              id='password2'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
              minLength='6'
              className='validate'
            />
          </div>
          <div className='input-field col s6 offset-s3'>
            <input type='submit' value='Register' className='btn btn-primary btn-block' />
          </div>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
