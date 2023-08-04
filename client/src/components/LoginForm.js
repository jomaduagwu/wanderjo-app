import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd'; // Import Ant Design components

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [login, { loading , error, data}] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

  const form= event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

    console.log('Form submitted');

    try {
      const { data } = await login({ variables: { ...userFormData } });

      console.log('Server response:', data);

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      // Check the error object returned by Apollo Client
      console.log('Error:', err);

      message.error('Something went wrong with your login credentials!');
    }
    console.log('Form submission finished');

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <Input
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required!' }]}
        >
          <Input.Password
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
        </Form.Item>

        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
