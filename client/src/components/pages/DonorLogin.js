import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import Navbar from './Navbar';
import '../../App.css';

function DonorLogin() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

      // Make an Axios request to server
      axios
        .post('http://localhost:8081/user/donor/login', values)
        .then((res) => {
          if (res.status === 200) {
            setUserData(res.data);
            navigate('/DonorPage');
          } else {
            alert('Login failed. Check your credentials.');
          }
        })
        .catch((err) => {
          console.error('Error while fetching user data:', err);
          alert('An error occurred while fetching user data.');
        });
    
  }

  return (
    <>
      <Navbar />
      <div className='loginPage'>
        <div className='border'>
          <h2>Sign-In</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email'>
                <strong>Email</strong>
              </label>
              <input
                type='email'
                placeholder='Enter Email'
                name='email'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'>
                <strong>Password</strong>
              </label>
              <input
                type='password'
                placeholder='Enter Password'
                name='password'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <button type='submit' className='btn'>
              Log in
            </button>
            <div className='phg'>
              <p>Don't have an account?</p>
            </div>
            <Link to='/DonorSignup' className='btn btn--block'>
              Create Account
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default DonorLogin;
