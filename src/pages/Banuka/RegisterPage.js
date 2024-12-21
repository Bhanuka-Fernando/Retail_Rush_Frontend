import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8070/api/user/register', values);
      message.success('Registration successful!');
      setLoading(false);
    } catch (err) {
      message.error('Registration failed! Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
