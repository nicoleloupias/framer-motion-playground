import React from "react";
import ReactPlayer from "react-player";

export const VideoDetail = () => {
  return (
    <ReactPlayer
      playing
      loop
      url="lights.mp4"
      width="100vw"
      height="100vh"
    ></ReactPlayer>
  );
};
