import React from 'react';
import { Empty, Button } from 'antd';

class Login extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <Empty
        description={
          <span>
            Please Login first...
          </span>
        }
      >
        <Button type="primary">Login</Button>
      </Empty>
    )
  }
}

export default Login;
