import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 alias from uuid
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';

function Donhis() {
  const { state } = useLocation();
  const email = state?.data;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (email) {
      axios
        .get(`http://localhost:8081/user/donor/get?email=${email}`)
        .then((res) => {
          if (res.status === 200) {
            setUsers(res.data.donors);
          } else {
            alert('Network error.');
          }
        })
        .catch((err) => {
          console.error('Error while fetching donation data:', err);
          alert('An error occurred while fetching donation data.');
        });
    }
  }, [email]);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8081/user/donor/delete/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          alert(`User with ID ${userId} deleted successfully`);
          setUsers(users.filter(user => user.userId !== userId));
        } else {
          alert('Deletion was unsuccessful. Check your credentials.');
        }
      })
      .catch((err) => {
        console.error('Error while deleting user:', err);
        alert('An error occurred while deleting user.');
      });
  };

  // Function to generate a new UUID
  const generateUUID = () => {
    return uuidv4();
  };

  return (
    <div className="donhis">
      <div className="bor">
        <Link to="/makedon" className="btn1">
          ADD +
        </Link>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href='DonorPage' className='btn1'>Back</a>

        <table className="table">
          <thead>
            <tr>
              <th>User_ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Type of Item</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.userId || generateUUID()}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.item}</td>
                  <td>{user.quantity}</td>
                  <td>{user.location}</td>
                  <td>
                    <Link to={`/update/${user.userId || generateUUID()}`} className="btn-update">Update</Link>
                    <button onClick={() => handleDelete(user.userId || generateUUID())} className="btn-delete">Delete</button>
                  </td>
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
