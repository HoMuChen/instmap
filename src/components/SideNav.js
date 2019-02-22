import React from 'react';
import {
  Menu, Icon,
} from 'antd';
import { Link } from 'react-router-dom';

const SideNav = ({ routes }) => (
  <Menu theme="dark" mode="inline">
  {
    routes.map(route => (
      <Menu.Item key={route.key}>
        <Link to={route.path}>
          <Icon type={route.icon} />
          <span>{ route.lable }</span>
        </Link>
      </Menu.Item>
    ))
  }
  </Menu>
);

export default SideNav;
