import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';

import { appRoutes } from './const';

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path={appRoutes.main} component={MainPage} />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
