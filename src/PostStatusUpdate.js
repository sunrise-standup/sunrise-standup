/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./App.css";

import videojs from "video.js";
import "video.js/dist/video-js.css";

import RecordRTC from "recordrtc";
import "webrtc-adapter";

import { uploadVideo } from "./upload";

import "videojs-record/dist/css/videojs.record.css";
import Record from "videojs-record/dist/videojs.record.js";

const videoJsOptions = {
  controls: true,
  width: 320,
  height: 240,
  fluid: false,
  plugins: {
    record: {
      audio: true,
      video: true,
      maxLength: 15,
      debug: true,
    },
  },
};

class PostStatusUpdate extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      name: "",
    };
  }
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, videoJsOptions, () => {
      // print version information at startup
      var version_info =
        "Using video.js " +
        videojs.VERSION +
        " with videojs-record " +
        videojs.getPluginVersion("record") +
        " and recordrtc " +
        RecordRTC.version;
      videojs.log(version_info);
    });

    // device is ready
    this.player.on("deviceReady", () => {
      console.log("device is ready!");
    });

    // user clicked the record button and started recording
    this.player.on("startRecord", () => {
      console.log("started recording!");
    });

    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
      uploadVideo(this.player.recordedData, this.state.name);
    });

    // error handling
    this.player.on("error", (element, error) => {
      console.warn(error);
    });

    this.player.on("deviceError", () => {
      console.error("device error:", this.player.deviceErrorCode);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div data-vjs-player>
          <video
            id="myVideo"
            ref={(node) => (this.videoNode = node)}
            className="video-js vjs-default-skin"
            playsInline
          ></video>
        </div>
        <input value={this.state.name} onChange={this.handleNameChange} />
      </div>
    );
  }
}

export default PostStatusUpdate;
