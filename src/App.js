import React, { useEffect, useState } from "react";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/Nav";
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import Map from "./pages/Map";

import authApi from "./api/authApi";
import appApi from "./api/appApi";

const App = () => {
  const [user, setUser] = useState({ name: "" });
  const [keys, setKeys] = useState(null);

  // called then the component is mounted/ready
  useEffect(() => {
    // this checks to see if a user is logged in and if so, sets
    // the value of the current logged in user
    async function getLoggedInUser() {
      const user = await authApi.getLoggedInUser();
      setUser(user);
    }
    getLoggedInUser();

    // gets the public keys needed for maps and cognitive services
    async function getKeys() {
      const keys = await appApi.getKeys();
      setKeys(keys);
    }
    getKeys();
  }, []);

  const app = (
    <Router>
      <div className="container main">
        <Nav user={user}></Nav>
        <Switch>
          <Route path="/" exact>
            <Feed />
          </Route>
          <Route
            path="/post"
            render={(props) => <Post {...props} ai_key={keys.ai_key} />}
          />
          <Route
            path="/map"
            render={(props) => <Map {...props} map_key={keys.map_key} />}
          />
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

  const spinner = (
    <div id="loader">
      <img src="loader.svg" alt="" />
      <h5 className="is-size-5 has-text-weight-bold">Loading</h5>
    </div>
  );

  // wait for the applications keys to load before loading the app
  if (keys) {
    return app;
  } else {
    return spinner;
  }
};

export default App;
