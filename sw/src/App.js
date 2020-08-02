import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import Lessons from './components/lessons/Lessons';
import LessonTypes from './components/lesson-types/LessonTypes';
import Calendar from './components/calendar/Calendar';
import Students from './components/students/Students';
import Account from './components/account/Account';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/layout/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import { Provider } from 'react-redux';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <AppNavbar />
          <main>
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/account' component={Account} />
                <PrivateRoute exact path='/lessons' component={Lessons} />
                <AdminRoute exact path='/lesson-types' component={LessonTypes} />
                <AdminRoute exact path='/calendar' component={Calendar} />
                <AdminRoute exact path='/students' component={Students} />
              </Switch>
            </div>
          </main>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
