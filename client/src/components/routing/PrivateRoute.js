import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';

const PrivateRoute = ({ auth: { isAuthenticated, loading }, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? <Preloader /> : !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(PrivateRoute);
