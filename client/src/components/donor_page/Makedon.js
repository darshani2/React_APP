import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Makedon() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    item: '',
    quantity: '',
    location: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(null);

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const email = values.email;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/user/donor/add', values)

      .then((res) => {
        if (res.status === 200) {
          setUserData(res.data);
          navigate('/Donhis', { state: { data: email } });

        } else {
          alert('Donation was unsuccessful. Check your credentials.');
        }
      })
      .catch((err) => {
        console.error('Error while fetching user data:', err);
        alert('An error occurred while fetching user data.');
      });
    /*
         axios
          .get('http://localhost:8081/user/donor/get', values)
          .then((res) => {
            if (res.status === 200) {
              setUserData(res.data);
              navigate('/donhis');
            } else {
              alert('Donation was unsuccessful. Check your credentials.');
            }
          })
          .catch((err) => {
            console.error('Error while fetching user data:', err);
            alert('An error occurred while fetching user data.');
          });*/

  };

  return (
    <div className="donPage">
      <div className="border">
        <form action="" onSubmit={handleSubmit}>
          <h2>Make Donations</h2>

          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              name="name"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              name="email"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone number</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Phone"
              className="form-control"
              name="phone"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="item">
              <strong>Type Of Item</strong>
            </label>
            <input
              type="text"
              placeholder="Type of item"
              className="form-control"
              name="item"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="quantity">
              <strong>Quantity</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Quantity"
              className="form-control"
              name="quantity"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location">
              <strong>Location</strong>
            </label>
            <input
              type="text"
              placeholder="Enter location"
              className="form-control"
              name="location"
              onChange={handleInput}
            />
          </div>

          <button type="submit" className="btn">
            Donate
          </button> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a href='DonorPage' className='btn1'>Back</a>
        </form>
      </div>
    </div>
  );
}

export default Makedon;
