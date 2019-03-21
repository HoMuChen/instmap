import React from 'react';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import Layout from './components/Layout';
import Header from './components/Header';
import Routes from './routes';

import { AuthProvider } from './contexts/AuthContext';
import store from './store';
import config from './config';

const __DEV__ = process.env['NODE_ENV'] !== 'production';
const GA_ID = 'UA-136697140-01';

ReactGA.initialize(GA_ID, { debug: __DEV__ });

const App = () => (
  <AuthProvider>
    <Layout
      title='HoMuChen'
      header={<Header routes={config.headers}/>}
    >
      <Provider store={store}>
        <Routes />
      </Provider>
    </Layout>
  </AuthProvider>
)

export default App;
