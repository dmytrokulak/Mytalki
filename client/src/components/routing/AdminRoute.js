import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';

const AdminRoute = ({ auth: { isAuthenticated, isAdmin, loading }, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? <Preloader /> : !isAuthenticated || !isAdmin ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(AdminRoute);
