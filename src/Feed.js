import React, { useState, useEffect } from "react";

import "./Feed.css";
import { getSubscriptionKey } from "azure-maps-control";
import { BlobBeginCopyFromUrlPoller } from "@azure/storage-blob/typings/latest/src/pollers/BlobStartCopyFromUrlPoller";

const Feed = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    getUpdate();
  }, []);

  async function getUpdate() {
    const res = await fetch(`/api/GetVideos`);
    const { updates } = await res.json();
    setUpdates(updates);
  }

  const feedItems = (
    <div>
      <div id="bumper"></div>
      {updates.map(({ name, video, created, caption = "" }) => (
        <div className="columns is-vcentered feed-item">
          <div className="column line-item is-narrow is-hidden-mobile"></div>
          <div className="column feed-line is-hidden-mobile">
            <div className="time-line"></div>
          </div>
          <div className="column feed-video is-narrow">
            <div className="box video-wrapper">
              <h3 className="is-size-4">{name}</h3>
              <div class="columns">
                <div className="column is-narrow">
                  <video class="video" controls playsInline>
                    <source src={video} type="video/webm"></source>
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
                {caption ? (
                  <div className="column">
                    <p>{caption}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="feed">
      {updates.length > 0 ? (
        feedItems
      ) : (
        <div id="loader">
          <img src="loader.svg" alt="" />
          <h5 className="is-size-5 has-text-weight-bold">Loading</h5>
        </div>
      )}
    </div>
  );
};

export default Feed;
