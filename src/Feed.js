import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <Link to="/post">Post Status Update</Link>
      {updates.map(({ name, video }) => (
        <div>
          <h2>{name}</h2>
          <video controls width="250">
            <source src={video} type="video/webm" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </div>
      ))}
    </div>
  );
};

export default Feed;
