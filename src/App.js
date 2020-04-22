import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Nav from "./Nav";
import Footer from "./Footer";
import Feed from "./Feed";
import PostStatusUpdate from "./PostStatusUpdate";

import "video.js";
import "video.js/dist/video-js.css";
import "recordrtc";
import "webrtc-adapter";

import "videojs-record/dist/css/videojs.record.css";
import "videojs-record/dist/videojs.record.js";

const App = (props) => {
  return (
    <div>
      <Router>
        <div className="container main">
          <Nav></Nav>
          <Switch>
            <Route path="/" exact>
              <Feed />
            </Route>
            <Route path="/post" component={PostStatusUpdate}></Route>
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
};

export default App;
