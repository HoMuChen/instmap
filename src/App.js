import React, { Component } from 'react';
import './App.css';
import {
  Layout, Menu, Icon,
} from 'antd';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from './routes';
const {
  Header, Content, Footer, Sider,
} = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: '1', icon: 'pie-chart', lable: 'Home', path: '/' },
        { key: '2', icon: 'pie-chart', lable: 'About', path: '/about' },
        { key: '3', icon: 'pie-chart', lable: 'Topics', path: '/topics' },
      ],
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState((state) => ({ collapsed: !state.collapsed }))
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="logo">
              Largitdata
            </div>
            <Menu theme="dark" mode="inline">
            {
              this.state.routes.map(route => (
                <Menu.Item key={route.key}>
                  <Link to={route.path}>
                    <Icon type={route.icon} />
                    <span>{ route.lable }</span>
                  </Link>
                </Menu.Item>
              ))
            }
            </Menu>
          </Sider>
          <Layout>
            <Header className="header">
            </Header>
            <Content className="content">
              <Routes />
            </Content>
            <Footer className="footer">
              Largitdata ©2018
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
