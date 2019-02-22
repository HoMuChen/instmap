import React, { Component } from 'react';
import './index.css';
import {
  Layout, Icon,
} from 'antd';
import { BrowserRouter as Router } from "react-router-dom";

const {
  Header, Content, Footer, Sider,
} = Layout;

class AppLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState((state) => ({ collapsed: !state.collapsed }))
  }

  handleBreak = (broken) => {
    this.setState({ collapsed: broken })
  }

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            trigger={null}
            breakpoint="lg"
            collapsedWidth="0"
            collapsed={this.state.collapsed}
            onBreakpoint={this.handleBreak}
          >
            <div className="logo">
              { this.props.title }
            </div>
            { this.props.navigation }
          </Sider>
          <Layout>
            <Header className="header">
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              { this.props.header }
            </Header>
            <Content className="content">
              { this.props.children }
            </Content>
            <Footer className="footer">
              { this.props.footer }
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default AppLayout;
