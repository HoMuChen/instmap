import React, { Component } from 'react';
import './index.css';
import {
  Layout,
} from 'antd';
import { BrowserRouter as Router } from "react-router-dom";

const {
  Header, Content, Footer,
} = Layout;

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            { this.props.header }
          </Header>
          <Content className="content">
            { this.props.children }
          </Content>
          {
            this.props.footer && 
            <Footer className="footer">
              { this.props.footer }
            </Footer>
          }
        </Layout>
      </Router>
    );
  }
}

export default AppLayout;
