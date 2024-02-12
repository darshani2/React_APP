import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import Navbar from './Navbar';
import '../../App.css';

function SchoolSignup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    if (!errors.name && !errors.email && !errors.password) {
      try {
        // Send a POST request to your server to register the user
        const response = await axios.post('http://localhost:8081/user/school/register', values);

        if (response.status === 201) {
          navigate('/preverify');
        } else {
          console.log('Registration failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="signupPage">
        <div className="border">
          <h2>Sign-Up</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={values.name}
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.name && <span className="text-danger">{errors.name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={values.email}
                onChange={handleInput}
                className="form-control rounded-0"
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="mb-3">
  <label htmlFor="phone_num">
    <strong>Phone Number</strong>
  </label>
  <input
    type="tel"  // Update type to "tel" for telephone numbers
    pattern="[0-9]{10}"  // Add pattern attribute to allow only 10 numeric digits
    placeholder="Enter Phone Number"
    name="phone_num"
    value={values.phone_num}
    onChange={handleInput}
    className="form-control rounded-0"
  />
  {errors.phone_num && <span className="text-danger">{errors.phone_num}</span>}
</div>

            <button type="submit" className="btn">
              Sign Up
            </button>
            <div className="phg">
              <p>Already have an account ? </p>
            </div>
            <Link to="/SchoolLogin" className="btn btn--block">
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SchoolSignup;
