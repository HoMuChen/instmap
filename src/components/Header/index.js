import React from 'react';
import {
  Icon, Menu,
} from 'antd';
import { Link } from 'react-router-dom';
import './index.css'

import { AuthConsumer } from '../../contexts/AuthContext';

const Header = ({ routes }) => (
  <AuthConsumer>
    {
      ({ isAuth, login, logout }) => (
        <div className='header'>
          <Menu mode="horizontal" style={{ lineHeight: '64px' }} defaultSelectedKeys={['popular']}>
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
            {/*
            <div className='auth'>
              {
                isAuth
                  ? <Icon className='trigger' onClick={logout} type='logout'/>
                  : <Icon className='trigger' onClick={login} type='login'/>
              }
            </div>
            */}
          </Menu>
        </div>
      )
    }
  </AuthConsumer>
)

export default Header;
