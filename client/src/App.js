import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import Home from './components/layout/Home';
import NotFound from './components/layout/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Account from './components/auth/Account';
import UserCalendar from './components/domain/calendar/UserCalendar';
import Booking from './components/domain/booking/Booking';
import UserLessons from './components/domain/lessons/UserLessons';
import Lessons from './components/domain/lessons/Lessons';
import LessonTypes from './components/domain/lesson-types/LessonTypes';
import Calendar from './components/domain/calendar/Calendar';
import Students from './components/domain/students/Students';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';
import { getTimezones } from './actions/systemActions';
import store from './store';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
    (async () => await getTimezones()(store.dispatch))();
    (async () => await loadUser()(store.dispatch))();
  }, []);

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
