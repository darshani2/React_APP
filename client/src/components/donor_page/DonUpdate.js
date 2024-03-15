// C:\react-js\my-app\src\components\UpdateUser.js
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DonUpdate() {
  const { id } = useParams();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/user/donor/get?userId=${userId}');
        console.log(response);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
        setItem(response.data.item);
        setQuantity(response.data.quantity);
        setLocation(response.data.location);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/user/donor/update/" + id, { name, email, phone, item, quantity, location })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="donUpdate">
      <div className="border">
        <form onSubmit={handleUpdate}>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) => setItem(e.target.value)}
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
                    onChange={(e) => setQuantity(e.target.value)}
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
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button className="btn1">Update</button>
        </form>
      </div>
    </div>
  );
}

export default DonUpdate;
