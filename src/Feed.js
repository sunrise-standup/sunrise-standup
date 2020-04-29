import React, { useState, useEffect } from "react";

import "./Feed.css";

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
          <div className="column feed-video">
            <div className="box video-wrapper">
              <h3 className="is-size-4">{name}</h3>
              <div class="columns">
                <div className="column is-narrow">
                  <video class="video" controls width="200px">
                    <source src={video} type="video/webm" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
                <div className="column">
                  <p>{caption}</p>
                </div>
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
        <div>
          <img id="loader" src="loader.svg" alt="" />
        </div>
      )}
    </div>
  );
};

export default Feed;
