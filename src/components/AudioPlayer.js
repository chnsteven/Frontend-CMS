import React, { useRef, useState, useEffect } from "react";
import {
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AudioPlayer({ audioPath, audioType }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1); // Track playback rate in state

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const handleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeInc = () => {
    setVolume((prevVolume) => Math.min(1, prevVolume + 0.1));
  };

  const handleVolumeDec = () => {
    setVolume((prevVolume) => Math.max(0, prevVolume - 0.1));
  };

  const handlePlaybackRateInc = () => {
    setPlaybackRate((prevRate) => Math.min(2, prevRate + 0.1));
  };

  const handlePlaybackRateDec = () => {
    setPlaybackRate((prevRate) => Math.max(0.5, prevRate - 0.1));
  };

  return (
    <div id="audio-player">
      {/* Audio element */}
      <audio ref={audioRef} loops="true">
        <source src={`${audioPath}`} type={`${audioType}`} />
        Your browser does not support the audio element.
      </audio>

      {/* Play/Pause Button */}
      <button
        className="square-button"
        onClick={isPlaying ? handlePause : handlePlay}
      >
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>

      {/* Mute Button */}
      <button className="square-button" onClick={handleMute}>
        <FontAwesomeIcon icon={faVolumeXmark} />
      </button>

      {/* Volume Down Button */}
      <button
        className="square-button"
        onClick={handleVolumeDec}
        disabled={volume === 0}
      >
        <FontAwesomeIcon icon={faVolumeLow} />
      </button>

      {/* Volume Up Button */}
      <button
        className="square-button"
        onClick={handleVolumeInc}
        disabled={volume === 1}
      >
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>

      {/* Playback Rate Decrease Button */}
      <button
        className="square-button"
        onClick={handlePlaybackRateDec}
        disabled={playbackRate === 0.5}
      >
        <FontAwesomeIcon icon={faStepBackward} />
      </button>

      {/* Playback Rate Increase Button */}
      <button
        className="square-button"
        onClick={handlePlaybackRateInc}
        disabled={playbackRate === 2}
      >
        <FontAwesomeIcon icon={faStepForward} />
      </button>

      <span id="audio-player-volume">
        Volume: {isMuted ? "Muted" : Math.round(volume * 100)} | Playback Rate:{" "}
        {playbackRate.toFixed(1)}x
      </span>
    </div>
  );
}
export default AudioPlayer;
