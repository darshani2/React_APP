import axios from 'axios';
import React, {useEffect , useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

function SchHis() {
  const [users, setUsers] = useState([])
    
        useEffect(()=>{
        axios.get('http://localhost:8081/makereq')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
      })

  return (
    <div className="schHis">
      <div className="bor">
        <Link to="/makeReq" className="btn1">
          ADD +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>School_Name</th>
              <th>School_Email</th>
              <th>Principal_PhoneNUmber</th>
              <th>Types of Items</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.School_Name}</td>
                  <td>{user.School_Email}</td>
                  <td>{user.Principal_PhoneNumber}</td>
                  <td>{user.Types_of_Items}</td>
                  <td>{user.Quantity}</td>
                  <td>{user.Location}</td>
                  
                  <Link to="/makereq" className="btn1"> Edit </Link>
                  <Link to="/" className="btn1"> Delete </Link>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SchHis;
