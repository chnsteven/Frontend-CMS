import React, { useRef, useState, useEffect } from "react";
import {
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AudioPlayer({ audioPath, audioType }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5); // Track volume in state

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
    setVolume((prevVolume) => Math.min(1, prevVolume + 0.1)); // Update state
  };

  const handleVolumeDec = () => {
    setVolume((prevVolume) => Math.max(0, prevVolume - 0.1)); // Update state
  };

  return (
    <div>
      {/* Audio element */}
      <audio ref={audioRef} loops>
        <source src={`${audioPath}`} type={`${audioType}`} />
        Your browser does not support the audio element.
      </audio>

      {/* Play Button */}
      <button onClick={handlePlay} disabled={isPlaying}>
        Play
      </button>
      {/* Pause Button */}
      <button onClick={handlePause} disabled={!isPlaying}>
        Pause
      </button>

      {/* Mute Button */}
      <button onClick={handleMute} id="mute-button">
        <FontAwesomeIcon icon={faVolumeXmark} />
      </button>

      {/* Volume Down Button */}
      <button onClick={handleVolumeDec} disabled={volume === 0}>
        <FontAwesomeIcon icon={faVolumeLow} />
      </button>

      {/* Volume Up Button */}
      <button onClick={handleVolumeInc} disabled={volume === 1}>
        <FontAwesomeIcon icon={faVolumeHigh} />
      </button>
    </div>
  );
}

export default AudioPlayer;
