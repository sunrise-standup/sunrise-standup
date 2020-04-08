import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const videoJsOptions = {
  controls: true,
  width: 320,
  height: 240,
  fluid: false,
  plugins: {
    /*
        // wavesurfer section is only needed when recording audio-only
        wavesurfer: {
            src: 'live',
            waveColor: '#36393b',
            progressColor: 'black',
            debug: true,
            cursorWidth: 1,
            msDisplayMax: 20,
            hideScrollbar: true
        },
        */
    record: {
      audio: true,
      video: true,
      maxLength: 10,
      debug: true,
    },
  },
};

ReactDOM.render(<App {...videoJsOptions} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
