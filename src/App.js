import React from "react";
import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AddUser from "./components/users/AddUser";
import EditUser from "./components/users/EditUser";
import User from "./components/users/User";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/users/edit/:emailId" component={EditUser} />
          <Route exact path="/users/:emailId" component={User} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
