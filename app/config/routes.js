import React from 'react';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import Main from '../main/Main';
import Schedule from '../components/Schedule';
import Edit from '../components/Edit';
import List from '../components/List';
import Add from '../components/Add';

const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Schedule} />
      <Route path="schedule" component={Schedule} />
      <Route path="edit/:event" component={Edit} />
      <Route path="list" component={List} />
      <Route path="add" component={Add} />
    </Route>
  </Router>
);

module.exports = routes;
