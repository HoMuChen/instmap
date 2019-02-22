import React from 'react';
import {
  Icon,
} from 'antd';
import { Link } from 'react-router-dom';
import './index.css'

import { AuthConsumer } from '../../contexts/AuthContext';

const Header = ({ routes }) => (
  <AuthConsumer>
    {
      ({ isAuth, login, logout }) => (
        <div className='header'>
          {
            isAuth && routes.map(route => (
              <Link to={route.path}>
                <Icon key={route.key} className='trigger' type={route.icon}>
                </Icon>
              </Link>
            ))
          }
          {
            isAuth
              ? <Icon className='trigger' onClick={logout} type='logout'/>
              : <Icon className='trigger' onClick={login} type='login'/>
          }
        </div>
      )
    }
  </AuthConsumer>
)

export default Header;
