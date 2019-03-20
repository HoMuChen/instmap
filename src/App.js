import React from 'react';
import { Provider } from 'react-redux';

import Layout from './components/Layout';
import Header from './components/Header';
import Routes from './routes';

import { AuthProvider } from './contexts/AuthContext';

import store from './store';

import config from './config';

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
