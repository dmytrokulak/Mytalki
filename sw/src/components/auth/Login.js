import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';

const Login = ({ auth: { error, isAuthenticated }, history, login }) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      // setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
      <h4 className='center-align'>Login</h4>
      <form onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s6 offset-s3'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              className='validate'
              value={email}
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
              className='validate'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='input-field col s6 offset-s3'>
            <input type='submit' value='Login' className='btn btn-primary btn-block' />
          </div>
        </div>
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);