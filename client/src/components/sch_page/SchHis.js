import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../App.css';

function SchHis() {
  const [users] = useState([
    {
      School_Name: "Omatta Kanitu Viduhala",
      School_Email: "omattakanituviduhala@gmail.com",
      Pricipal_NIC: "656880356V",
      Types_of_Items: "Clothes",
      Quantity: 5,
      Location: "City"
    }
  ]);

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
              <th>Pricipal_NIC</th>
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
                  <td>{user.Pricipal_NIC}</td>
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
