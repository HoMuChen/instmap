import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from './components/Home';

const About = lazy(() => import('./components/About'));
const Topics = lazy(() => import('./components/Topics'));

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Suspense fallback={<div>loading...</div>}>
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </Suspense>
      </Switch>
    )
  }
}

export default Routes;
