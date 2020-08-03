import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authActions';

const PrivateRoute = ({ auth: { isAuthenticated, loading, user }, loadUser, component: Component, ...rest }) => {
  useEffect(() => {
    if (isAuthenticated && !user) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          //&& !loading
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { loadUser })(PrivateRoute);
