import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, loadUser } from '../../actions/authActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const Login = ({ auth: { error, isAuthenticated, isAdmin }, history, login, loadUser, location }) => {
  useEffect(() => {
    M.AutoInit();
    if (isAuthenticated) {
      //ToDo:: use qs npm pack?
      let arr = location.search.split('nextUrl=');
      let nextUrl = null;
      if (arr.length === 2) {
        nextUrl = arr[1];
      }
      if (nextUrl) {
        history.push(nextUrl);
      } else {
        if (isAdmin) {
          history.push('/admin/lessons');
        } else {
          history.push('/lessons');
        }
      }
    }
    if (error) {
      M.toast({ html: error });
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
      M.toast({ html: 'Please fill in all the fields.' });
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
      <div className='center-align'>
        <h4>Login</h4>
        <span>
          Don't have an account yet?{' '}
          <Link className='teal-text' to='/register'>
            Register.
          </Link>
        </span>
      </div>
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
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, loadUser })(Login);
