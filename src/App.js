import React, { useEffect, useState } from "react";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Map from "./pages/Map";

import authApi from "./api/authApi";

const App = (props) => {
  const [user, setUser] = useState({ name: "" });
  useEffect(() => {
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
      <footer id="footer" className="has-background-primary has-text-centered">
        <div className="container is-aligned-center">
          <Link className="button is-medium is-primary" to="/map">
            <span>
              <i className="fa fa-map"></i> Map
            </span>
          </Link>
        </div>
      </footer>
    </Router>
  );
};

export default App;
