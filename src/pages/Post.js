import React, { Component } from "react";
import "./Post.css";

// videojs powers the recording and encoding of the videos
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-record/dist/videojs.record.js";
import "videojs-record/dist/css/videojs.record.css";
import RecordRTC from "recordrtc";
import "webrtc-adapter";

import appApi from "../api/appApi";
import storageApi from "../api/storageApi";
import captioner from "../utils/captioner";

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

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFinished: false,
      isUploading: false,
      captions: [],
      latitude: 0,
      longitude: 0,
      image: "",
    };

    this.updateCaption = this.updateCaption.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  // this function updates the UI as the captions are transcribed
  updateCaption(captions) {
    let existingCaptions = this.state.captions;
    const last = existingCaptions[existingCaptions.length - 1];

    if (last && last.translations.offset === captions.translations.offset) {
      existingCaptions[existingCaptions.length - 1] = captions;
    } else {
      existingCaptions.push(captions);
    }

    this.setState({
      captions: existingCaptions,
    });
  }

  // This gets the users current latitutde/longitude
  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  // this gets the user's profile image from the Github API
  async getAvatar() {
    const image = await appApi.getAvatar();

    this.setState({
      avatar: image,
    });
  }

  componentDidMount() {
    this.getLocation();
    this.getAvatar();

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

      // this starts the caption transcription
      captioner.start(this.props.ai_key, this.updateCaption);
    });

    // user completed recording and stream is available
    this.player.on("finishRecord", () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log("finished recording: ", this.player.recordedData);
      this.setState({ isFinished: true });
      captioner.stop();
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

  // save video to Azure Storage
  async handleSaveClick() {
    // this sets the button to a spinner
    this.setState({ isUploading: true });

    // upload the video to Azure Storage
    await storageApi.uploadVideo(
      this.player.recordedData,
      this.state.captions.map(({ original }) => original).join(" "),
      this.state.longitude,
      this.state.latitude,
      this.state.avatar
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

export default Post;
