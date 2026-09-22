import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoPlayer = ({ src, onEnded }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current && videoRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, {
        controls: true,
        autoplay: true,
        fluid: true,
        sources: [{ src, type: 'video/mp4' }]
      }, () => {
        if (onEnded) {
          player.on('ended', onEnded);
        }
      });
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.src([{ src, type: 'video/mp4' }]);
      player.autoplay(true);
    }
  }, [src, onEnded]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="w-full h-full">
      <div ref={videoRef} className="w-full h-full" />
    </div>
  );
};
