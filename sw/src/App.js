import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import Home from './components/layout/Home';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Account from './components/auth/Account';
import UserCalendar from './components/user/UserCalendar';
import Booking from './components/user/Booking';
import UserLessons from './components/user/UserLessons';
import Lessons from './components/admin/lessons/Lessons';
import LessonTypes from './components/admin/lesson-types/LessonTypes';
import Calendar from './components/admin/calendar/Calendar';
import Students from './components/admin/students/Students';
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
                <Route exact path='/calendar' component={UserCalendar} />
                <Route exact path='/booking' component={Booking} />
                <PrivateRoute exact path='/lessons' component={UserLessons} />
                <PrivateRoute exact path='/account' component={Account} />
                <AdminRoute exact path='/admin/lessons' component={Lessons} />
                <AdminRoute exact path='/admin/lesson-types' component={LessonTypes} />
                <AdminRoute exact path='/admin/calendar' component={Calendar} />
                <AdminRoute exact path='/admin/students' component={Students} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </main>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
