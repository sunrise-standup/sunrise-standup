import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Nav from "./Nav";
import Footer from "./Footer";
import Feed from "./Feed";
import PostStatusUpdate from "./PostStatusUpdate";

import videojs from "video.js";
import "video.js/dist/video-js.css";

import RecordRTC from "recordrtc";
import "webrtc-adapter";

import { uploadVideo } from "./upload";

import "videojs-record/dist/css/videojs.record.css";
import Record from "videojs-record/dist/videojs.record.js";

const App = (props) => {
  return (
    <div>
      <div className="container main">
        <Router>
          <Nav></Nav>
          <Switch>
            <Route path="/" exact>
              <Feed />
            </Route>
            <Route path="/post" component={PostStatusUpdate}></Route>
          </Switch>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
