import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import AppFooter from './components/layout/AppFooter';
import LessonTypes from './components/lesson-types/LessonTypes';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <AppNavbar />
        <main>
          <div className='container'>
            <Switch>
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
