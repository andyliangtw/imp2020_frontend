import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import userAPI from '../../api/userAPI';
import { isLogin } from '../../utils';

import '../style.scss';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target;
    const userData = {
      username: target.username.value,
      password: target.password.value,
    };
    try {
      const { data: res } = await userAPI.login(userData);

      localStorage.setItem('authToken', res.api_key.$binary);
      localStorage.setItem('userId', res.userId.$oid);
      localStorage.setItem('username', userData.username);

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.response);
    }
  }

  render() {
    if (isLogin()) {
      return <Redirect to="/" />;
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control required type="text" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" />
        </Form.Group>
        <Button className="beauty-btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
