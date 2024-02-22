import React, { useState } from 'react'; // Remove useEffect if not used
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../../App.css';

function OtpPage() {
  const [values, setValues] = useState({
    otp: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // Clear the error when the user starts typing in the input field
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Assume Validation function checks for OTP presence
    if (!values.otp) {
      setErrors({ otp: 'OTP is required' });
      return;
    }

    // Make an Axios request to the server
    axios
      .post('http://localhost:8081/user/school/otp', values)
      .then((res) => {
        if (res.status === 200) {
          // Assuming res.data contains necessary information
          navigate('/SchoolPage');
        } else {
          alert('Login failed. Check your credentials.');
        }
      })
      .catch((err) => {
        console.error('Error while fetching user data:', err);
        alert('An error occurred while fetching user data.');
      });
  };

  return (
    <>
      <Navbar />
      <div className='otpPage'>
        <div className='border'>
          <h2>Please Enter Your OTP Here</h2>
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='otp'>
                <strong>OTP</strong>
              </label>
              <input
                type='text' // Change type to text for OTP
                placeholder='Enter Your OTP'
                name='otp'
                value={values.otp}
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.otp && <span className='text-danger'>{errors.otp}</span>}
            </div>
            <button type='submit' className='btn'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default OtpPage;
