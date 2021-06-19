import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./_editUser.css";
import { NavLink } from "react-router-dom";

const EditUser = () => {
  const history = useHistory();
  const { emailId } = useParams();
  console.log(emailId);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    states: "",
    pincode: "",
  });

  const { first_name, last_name, email, city, states, pincode } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.get(
      `https://o1wm686yz2.execute-api.us-east-1.amazonaws.com/v1/edit?param1=${user.email}&param2=${user.first_name}&param3=${user.last_name}&param4=${user.pincode}&param5=${user.city}&param6=${user.states}`
    );
    history.push("/");
  };

  const loadUser = () => {
    axios
      .get("https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch")
      .then((response) => {
        // console.log(response.data);
        const editData = response.data.data.filter((item) => {
          return item.email == emailId;
        });
        console.log(editData);
        setUser(editData[0]);
      });
    // setUser(result.data);
  };

  return (
    <div className="container">
      <div className="p-5">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="div1">
            <div className="form-group">
              <label>First Name </label>
              <br />
              <input
                type="text"
                className=""
                name="first_name"
                value={first_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Last Name </label>
              <br />
              <input
                type="text"
                className=""
                name="last_name"
                value={last_name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Email </label>
              <br />

              <input
                type="email"
                className=""
                name="email"
                disabled
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                disabled
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="div2">
            <div className="form-group">
              <label>State </label>
              <br />
              <select
                className=""
                name="states"
                value={states}
                required
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Select State</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujrat"> Gujrat</option>
                <option value="Maharashtra"> Maharashtra</option>
              </select>
            </div>
            <div className="form-group">
              <label>City </label>
              <br />
              <input
                type="text"
                className=""
                name="city"
                value={city}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Pincode </label>
              <br />
              <input
                type="number"
                className="pin"
                name="pincode"
                min="10000"
                max="99999"
                required
                value={pincode}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="buttons">
            <button className="btn mr-2 update">Update</button>
            <button className="btn cancel">
              <NavLink className="navlink" exact to="/">
                Cancel
              </NavLink>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
