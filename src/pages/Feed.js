import React, { useState, useEffect } from "react";
import ReactImageFallback from "react-image-fallback";

import "./Feed.css";

const Feed = () => {
  const [updates, setUpdates] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(-1);

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
      {updates.map(({ name, video, created, caption = "" }, index) => (
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
                  <div
                    className="pic-container"
                    onClick={() =>
                      index === selectedVideo ? null : setSelectedVideo(index)
                    }
                  >
                    {selectedVideo === index ? (
                      <video class="video" controls playsInline autoPlay>
                        <source src={video} type="video/webm"></source>
                        Sorry, your browser doesn't support embedded videos.
                      </video>
                    ) : (
                      <React.Fragment>
                        <div className="overlay">
                          <img
                            src="./play-circle-line.svg"
                            className="play-icon"
                            alt="play video"
                          />
                        </div>
                        <ReactImageFallback
                          src={`https://${process.env.STORAGE_ACCOUNT}.blob.core.windows.net/${process.env.THUMBNAILS_CONTAINER}/${name}.jpg`}
                          fallbackImage="/apple-touch-icon.png"
                          initialImage="/apple-touch-icon.png"
                          alt={`${name}'s thumbnail`}
                          className="thumbnail"
                        />
                      </React.Fragment>
                    )}
                  </div>
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
