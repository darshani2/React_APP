import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 alias from uuid
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';

function School() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      axios
        .get(`http://localhost:8081/user/admin/getSchool`)
        .then((res) => {
          if (res.status === 200) {
            console.log(res)
            setUsers(res.data.schools || []);
          } else {
            alert('Network error.');
          }
        })
        .catch((err) => {
          console.error('Error while fetching request data:', err);
          alert('An error occurred while fetching request data.');
        });
    
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete(`http://localhost:8081/user/school/delete/?id=${userId}`)
      .then((res) => {
        if (res.status === 200) {
          alert(`User with ID ${userId} deleted successfully`);
          setUsers(users.filter(user => user.userId !== userId));
          window.location.reload();
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
    <div className="schHis">
      <div className="bor">
        <a href='AdminPage' className='btn1'>Back</a>

        <table className="table">
          <thead>
            <tr>
              <th>User_ID</th>
              <th>School Name</th>
              <th>School Email</th>
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
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.item}</td>
                  <td>{user.quantity}</td>
                  <td>{user.location}</td>
                  <td>
                    {/* <Link to={`/DonUpdate/?id=${user._id}&name=${user.name}&email=${user.email}&phone=${user.phone}&item=${user.item}&quantity=${user.quantity}&location=${user.location}`} className="btn-update">Update</Link> */}
                    <button onClick={() => handleDelete(user._id)} className="btn-delete">Delete</button>
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

export default School;
