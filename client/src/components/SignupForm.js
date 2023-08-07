import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';

const SignupForm = ({ handleModalClose }) => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [addUser, { error, loading }] = useMutation(REGISTER_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      console.log(data); // You can handle the successful registration response here

      handleModalClose(); // Close the signup modal after successful signup
      // You may also want to handle other logic after successful signup, like displaying a success message or redirecting the user to a different page.
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={userFormData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={userFormData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={userFormData.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
