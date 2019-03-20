import React from 'react';
import { Route, Switch } from "react-router-dom";

//import { AuthConsumer } from './contexts/AuthContext';

//import Login from './components/Login';
import Home from './modules/Home/Container';
import Near from './modules/Near/Container';
import Location from './modules/Location/Container';
//const About = lazy(() => import('./modules/About'));
//const Topics = lazy(() => import('./modules/Topics'));

/*
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
*/

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/near" component={Near} />
    <Route path="/locations/:id" component={Location} />
    {/*
    <Suspense fallback={null}>
      <ProtectedRoute path="/about" component={About} />
      <ProtectedRoute path="/topics" component={Topics} />
    </Suspense>
    */}
  </Switch>
)

export default Routes;
