/* eslint-disable */
import React, { Component } from "react";

import "./PostStatusUpdate.css";

import videojs from "video.js";
import "video.js/dist/video-js.css";

import RecordRTC from "recordrtc";
import "webrtc-adapter";

import { uploadVideo } from "./upload";

import "videojs-record/dist/css/videojs.record.css";
import "videojs-record/dist/videojs.record.js";

import Translator from "./translator";

const videoJsOptions = {
  controls: true,
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

    this.handleSaveClick = this.handleSaveClick.bind(this);

    this.state = {
      isFinished: false,
      isUploading: false,
      captions: [],
    };

    this.updateCaption = this.updateCaption.bind(this);
  }
  updateCaption(captions) {
    console.log(captions);

    const last = this.state.captions[this.state.captions.length - 1];

    if (last && last.translations.offset === captions.translations.offset) {
      this.state.captions[this.state.captions.length - 1] = captions;
    } else {
      this.state.captions.push(captions);
    }

    this.setState({
      caption: captions.original,
    });
  }
  componentDidMount() {
    // translator
    const translator = new Translator(this.updateCaption);

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
      this.setState({ captions: [] });
      translator.start();
    });

    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
      this.setState({ isFinished: true });
      translator.stop();
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
  async handleSaveClick() {
    this.setState({ isUploading: true });
    await uploadVideo(
      this.player.recordedData,
      this.state.captions.map(({ original }) => original).join(" ")
    );
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="section">
        <div id="newPost">
          <hr />
          <div data-vjs-player>
            <video
              id="myVideo"
              ref={(node) => (this.videoNode = node)}
              className="video-js vjs-default-skin vjs-fluid vjs-4-3"
              playsInline
            ></video>
          </div>
          <hr />
          {this.state.isFinished ? (
            <div className="buttons">
              <button
                className={
                  "button is-primary " +
                  (this.state.isUploading ? "is-loading" : "")
                }
                onClick={this.handleSaveClick}
                disabled={this.state.isUploading}
              >
                <span className="icon">
                  <i className="fas fa-share-square"></i>
                </span>
                <span>Post Update</span>
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <div className="translation">
            {this.state.captions.map(({ original }) => original).join(" ")}
          </div>
        </div>
      </div>
    );
  }
}

export default PostStatusUpdate;
