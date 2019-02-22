import React, { Suspense, lazy } from 'react';
import { Route, Switch } from "react-router-dom";

import { AuthConsumer } from './contexts/AuthContext';

import Home from './components/Home';
import Login from './components/Login';
const About = lazy(() => import('./modules/About'));
const Topics = lazy(() => import('./modules/Topics'));

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {
      ({ isAuth }) => (
        <Route
          { ...rest }
          render={
            props => isAuth
              ? <Component {...rest} />
              : <Login />
          }
        />
      )
    }
  </AuthConsumer>
);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Suspense fallback={null}>
      <ProtectedRoute path="/about" component={About} />
      <ProtectedRoute path="/topics" component={Topics} />
    </Suspense>
  </Switch>
)

export default Routes;
