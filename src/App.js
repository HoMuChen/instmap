import React from 'react';
import Layout from './components/Layout';
import SideNav from './components/SideNav';
import Header from './components/Header';
import Routes from './Routes';

import { AuthProvider } from './contexts/AuthContext';

import config from './config';

const App = () => (
  <AuthProvider>
    <Layout
      title='HoMuChen'
      navigation={<SideNav routes={config.routes}/>}
      header={<Header routes={config.headers}/>}
      footer='b98901052@ntu.edu.tw ©2019'
    >
      <Routes />
    </Layout>
  </AuthProvider>
)

export default App;
