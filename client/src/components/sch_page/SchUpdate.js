// C:\react-js\my-app\src\components\UpdateUser.js
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SchUpdate() {

  const queryParams = new URLSearchParams(window.location.search);
  const oldId = queryParams.get('id');

  const [name, setNewName] = useState(queryParams.get('name') || '');
  const [email, setNewEmail] = useState(queryParams.get('email') || '');
  const [phone, setNewPhone] = useState(queryParams.get('phone') || '');
  const [item, setNewItem] = useState(queryParams.get('item') || '');
  const [quantity, setNewQuantity] = useState(queryParams.get('quantity') || '');
  const [location, setNewLocation] = useState(queryParams.get('location') || '');
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:8081/user/school/update`, {
        "id": oldId,
        "name": name,
        "email": email,
        "phone": phone,
        "item": item,
        "quantity": quantity,
        "location": location
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/MakeReq");
        } else {
          alert('Network error.');
        }
      })
      .catch((err) => {
        console.error('Error while updating requesting data:', err);
        alert('An error occurred while updating requests data.');
      });

  };

  return (
    <div className="schUpdate">
      <div className="border">
        <form>
          <h2>Update School</h2>
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
                    value={name}
                    onChange={(e) => setNewName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setNewEmail(e.target.value)}
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
                    value={phone}
                    onChange={(e) => setNewPhone(e.target.value)}
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
                    value={item}
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
                    value={quantity}
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
                    value={location}
                    onChange={(e) => setNewLocation(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit" className="btn1" onClick={(e) => handleUpdate(e)}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default SchUpdate;
