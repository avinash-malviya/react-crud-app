import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./_home.css";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [toBeDeletedUser, setToBeDeletedUser] = React.useState("");
  const handleClickOpen = (user) => {
    
    setToBeDeletedUser(user.first_name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (email) => {
    await axios.get(
      `https://k6j938wg66.execute-api.us-east-1.amazonaws.com/v1/delete?param1=${email}`
    );
    loadUsers();
    setOpen(false);
  };

  const loadUsers = async () => {
    const request = await axios.get(
      "https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch"
    );
    console.log(request.data.data);
    setUser(request.data.data);
  };

  const searchUsers = async (searchText) => {
    //console.log("seachText is "+searchText);
    const request = await axios.get(
      "https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch"
    );
    //console.log(request.data.data);
    var searchedUsers = []
    for (let i=0; i< request.data.data.length;i++) {
      var currUser = request.data.data[i];
      var toBeAdded = false;
      if(currUser.first_name.includes(searchText)){
        toBeAdded = true;
        
      }
      else if(currUser.last_name.includes(searchText)){
        toBeAdded = true;
        
      }
      else if(currUser.email.includes(searchText)){
        toBeAdded = true;
        
      }
      else if(currUser.states.includes(searchText)){
        toBeAdded = true;
        
      }
      else if(currUser.city.includes(searchText)){
        toBeAdded = true;
        
      }
      else if(currUser.pincode.includes(searchText)){
        toBeAdded = true;
        
      }
      if(toBeAdded){
        searchedUsers.push(currUser);
      }
    }
      //console.log(searchedUsers);
      setUser(searchedUsers);
  };

  const fetchUsers = async () => {
    const request = await axios.get(
      "https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch"
    );
    console.log(request.data.data);
    return request.data.data;
  };

  const onSearchChange = (searchText) => {
    console.log(searchText);
    if(searchText == ""){
      //show all
      loadUsers();
    }else{
      //show only specific to search text
      searchUsers(searchText);
    }
  };
  
  return (
    <div className="conatainer">
      <div className="middle">
        <Link className="add btn noHover" to="/users/add">
          + Add Record
        </Link>
        <input className="input1" type="text" placeholder="search" onChange={(e) => onSearchChange(e.target.value)}/>
      </div>
      <div className="py-1">
        <table class="table border shadow">
          <thead class="thead">
            <tr className="tr1">
              <th scope="col">#</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th scope="col">States</th>
              <th scope="col">City</th>
              <th scope="col">Pincode</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="text-secondary" key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.states}</td>
                <td>{user.city}</td>
                <td>{user.pincode}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2 btn1"
                    to={`/users/edit/${user.email}`}
                  >
                    Edit
                  </Link>

                  <Button
                    className="btn btn-danger btn1"
                    color="primary"
                    onClick={ () => handleClickOpen(user)}
                    style={{
                      color: "white",
                      backgroundColor: "tomato",
                      borderRadius: 20,
                      padding: 0,
                    }}
                  >
                    Delete
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                    fullWidth
                  >
                    <DialogTitle
                      style={{ cursor: "move" }}
                      id="draggable-dialog-title"
                    >
                      Are You Sure to Delete {toBeDeletedUser} ? 
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        autoFocus
                        onClick={() => deleteUser(user.email)}
                        color="primary"
                      >
                        Delete
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
