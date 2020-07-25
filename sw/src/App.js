import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import AppFooter from './components/layout/AppFooter';
import LessonTypes from './components/lesson-types/LessonTypes';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <Router>
      <Fragment>
        <AppNavbar />
        <main>
          <div className='container'>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/lesson-types' />
              </Route>
              <Route exact path='/lesson-types' component={LessonTypes} />
            </Switch>
          </div>
        </main>
        {/* <AppFooter /> */}
      </Fragment>
    </Router>
  );
};

export default App;
