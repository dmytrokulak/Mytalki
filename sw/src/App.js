import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavbar from './components/layout/AppNavbar';
import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
        <AppNavbar />
        <div className='container'>
          {/* <Switch>
            <Route exact path='/' component={} />
          </Switch> */}
        </div>
      </Fragment>
    </Router>
  );
};

export default App;
