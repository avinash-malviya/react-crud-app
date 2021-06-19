import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    webiste: "",
  });
  const { emailId } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
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
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      {/* <h1 className="display-4">User Id: {id}</h1> */}
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">first name: {user.first_name}</li>
        <li className="list-group-item">last name: {user.last_name}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">city: {user.city}</li>
        <li className="list-group-item">States: {user.states}</li>
        <li className="list-group-item">pincode: {user.pincode}</li>
      </ul>
    </div>
  );
};

export default User;
