// C:\react-js\my-app\src\components\UpdateUser.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function DonUpdate() {

  const queryParams = new URLSearchParams(window.location.search);
  const oldId = queryParams.get('id');
  const oldName = queryParams.get('name');
  const oldEmail = queryParams.get('email');
  const oldPhone = queryParams.get('phone');
  const oldItem = queryParams.get('item');
  const oldQuantity = queryParams.get('quantity');
  const oldLocation = queryParams.get('location');

  // const { id } = useParams();

  const [name, setName] = useState(oldName);
  const setNewName = (oldName) => {
    setName(oldName);
  }
  const [email, setEmail] = useState(oldEmail);
  const setNewEmail = (oldEmail) => {
    setEmail(oldEmail);
  }
  const [phone, setPhone] = useState(oldPhone);
  const setNewPhone = (oldPhone) => {
    setPhone(oldPhone);
  }
  const [item, setItem] = useState(oldItem);
  const setNewItem = (oldItem) => {
    setItem(oldItem);
  }
  const [quantity, setQuantity] = useState(oldQuantity);
  const setNewQuantity = (oldQuantity) => {
    setQuantity(oldQuantity);
  }
  const [location, setLocation] = useState(oldLocation);
  const setNewLocation = (oldLocation) => {
    setLocation(oldLocation);
  }

  const navigate = useNavigate();

  // const handleUpdate = async (oldId) => {
  //   console.log(oldId)
  //   axios
  //     .put(`http://localhost:8081/user/donor/update?id=${oldId}`, {
  //       "name": name,
  //       "email": email,
  //       "phone": phone,
  //       "item": item,
  //       "quantity": quantity,
  //       "location": location
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/Makedon");
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleUpdate = async (oldId) => {
    axios
      .put(`http://localhost:8081/user/donor/update?id=${oldId}`, {
        "name": name,
        "email": email,
        "phone": phone,
        "item": item,
        "quantity": quantity,
        "location": location
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/Makedon");
        } else {
          alert('Network error.');
        }
      })
      .catch((err) => {
        console.error('Error while updating donation data:', err);
        alert('An error occurred while updating donation data.');
      });

  };

  return (
    <div className="donUpdate">
      <div className="border">
        <form>
          <h2>Update Donor</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="">Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    value={oldName}
                    onInput={(e) => setNewName(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="">Email</label>
                </td>
                <td>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control"
                    value={oldEmail}
                    onInput={(e) => setNewEmail(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="">Phone Number</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Phone"
                    className="form-control"
                    value={oldPhone}
                    onInput={(e) => setNewPhone(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="">Type Of Item</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Type of item"
                    className="form-control"
                    value={oldItem}
                    onChange={(e) => setNewItem(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="">Quantity</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter Quantity"
                    className="form-control"
                    value={oldQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="">Location</label>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="form-control"
                    value={oldLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn1" onClick={() => handleUpdate(oldId)}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default DonUpdate;
