import axios from 'axios';
import React, { useLocation, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

function Donhis() {
  const { state } = useLocation();
  const [users, setUsers] = useState([])
    
  
    useEffect(()=>{
      /*
    axios.get('http://localhost:8081/user/makedonation')
    .then(result => setUsers(result.data))
    .catch(err => console.log(err))
    */
   axios
      .get('http://localhost:8081/user/donor/get', state.data)
      .then((res) => {
        if (res.status === 200) {
      console.log(res)
        } else {
          alert('Donation was unsuccessful. Check your credentials.');
        }
      })
      .catch((err) => {
        console.error('Error while fetching user data:', err);
        alert('An error occurred while fetching user data.');
      });
   
  })

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
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.Phone_Number}</td>
                  <td>{user.Size_of_Item}</td>
                  <td>{user.Quantity}</td>
                  <td>{user.Location}</td>
                  
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
