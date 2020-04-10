import React, { useState, useEffect } from "react";

import "./Feed.css";

const Feed = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    getUpdate();
  }, []);

  async function getUpdate() {
    const res = await fetch(`${process.env.API_DOMAIN}/api/GetVideos`);
    const { updates } = await res.json();

    setUpdates(updates);
  }

  return (
    <div className="feed">
      <div id="bumper" className="line-item"></div>
      {updates.map(({ name, video }) => (
        <div className="columns line-item is-vcentered">
          <div className="column is-narrow feed-line">
            <div class="time-line"></div>
          </div>
          <div className="column feed-item">
            <div className="">
              <div className="box">
                <div>
                  <video controls width="450">
                    <source src={video} type="video/webm" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
