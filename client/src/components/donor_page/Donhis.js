import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';
import { useLocation } from 'react-router-dom';

function Donhis() {
  const { state } = useLocation();
  const [users, setUsers] = useState([])

  const email = state.data;
  useEffect(() => {
    /*
  axios.get('http://localhost:8081/user/makedonation')
  .then(result => setUsers(result.data))
  .catch(err => console.log(err))
  */
    axios
      .get(`http://localhost:8081/user/donor/get?email=${email}`)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data.donors);
          console.log(res)
        } else {
          alert('Network error.');
        }
      })
      .catch((err) => {
        console.error('Error while fetching donation data:', err);
        alert('An error occurred while fetching donation data.');
      });

  }, [])

  return (
    <div className="donhis">
      <div className="bor">
        <Link to="/makedon" className="btn1">
          ADD +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Size of Item</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.item}</td>
                  <td>{user.quantity}</td>
                  <td>{user.location}</td>

                  <Link to="/donate" className="btn1"> Donate </Link>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donhis;
