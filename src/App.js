import React, { useEffect, useState } from "react";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Map from "./pages/Map";

import authApi from "./api/authApi";

const App = () => {
  const [user, setUser] = useState({ name: "" });

  // called then the component is mounted/ready
  useEffect(() => {
    // this checks to see if a user is logged in and if so, sets
    // the value of the current logged in user
    async function getLoggedInUser() {
      const user = await authApi.getLoggedInUser();
      setUser(user);
    }
    getLoggedInUser();
  }, []);
  return (
    <Router>
      <div className="container main">
        <Nav user={user}></Nav>
        <Switch>
          <Route path="/" exact>
            <Feed />
          </Route>
          <Route path="/post" component={Post}></Route>
          <Route path="/map" component={Map}></Route>
        </Switch>
      </div>
      {process.env.MAP_KEY ? (
        <footer
          id="footer"
          className="has-background-primary has-text-centered"
        >
          <div className="container is-aligned-center">
            <Link className="button is-medium is-primary" to="/map">
              <span>
                <i className="fa fa-map"></i> Map
              </span>
            </Link>
          </div>
        </footer>
      ) : null}
    </Router>
  );
};

export default App;
