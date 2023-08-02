import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd'; // Import Ant Design components
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [form] = Form.useForm();
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      await form.validateFields(); // Validate the form fields using Ant Design form validation
      const { data } = await addUser({variables: { ...userFormData}, });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form form={form} onFinish={handleFormSubmit}>
        {/* show alert if server response is bad */}
        {showAlert && (
          <Alert
            message="Something went wrong with your signup!"
            type="error"
            closable
            onClose={() => setShowAlert(false)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Username is required!' }]}
        >
          <Input
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required!' }]}
        >
          <Input
            type="email"
            placeholder="Your email address"
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

        <Form.Item>
          <Button
            disabled={!(userFormData.username && userFormData.email && userFormData.password)}
            type="primary"
            htmlType="submit"
            style={{ marginTop: 16 }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;
