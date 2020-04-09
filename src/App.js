import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import PostStatusUpdate from "./PostStatusUpdate";
import Feed from "./Feed";

import videojs from "video.js";
import "video.js/dist/video-js.css";

import RecordRTC from "recordrtc";
import "webrtc-adapter";

import { uploadVideo } from "./upload";

import "videojs-record/dist/css/videojs.record.css";
import Record from "videojs-record/dist/videojs.record.js";

const App = (props) => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Feed />
          </Route>
          <Route path="/post">
            <PostStatusUpdate {...props} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
