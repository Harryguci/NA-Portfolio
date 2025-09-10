import React, { useRef, useEffect, useState } from 'react';

interface IntervalVideoProps {
  src: string;
  interval: number; // interval in milliseconds
  className?: string;
  autoPlay?: boolean;
}

const IntervalVideo: React.FC<IntervalVideoProps> = ({ 
  src, 
  interval, 
  className = '', 
  autoPlay = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [_a, setIsPlaying] = useState(false);
  const [_b, setCurrentInterval] = useState(0);

  useEffect(() => {
    if (!videoRef.current || !autoPlay) return;

    const video = videoRef.current;
    let intervalId: any;

    const startInterval = () => {
      intervalId = setInterval(() => {
        if (video.currentTime >= video.duration - 0.1) {
          // Video is about to end, restart it
          video.currentTime = 0;
          video.play();
          setCurrentInterval(prev => prev + 1);
        }
      }, 100); // Check every 100ms for video end

      // Also set up the main interval timer
      const mainIntervalId = setInterval(() => {
        if (video.paused) {
          video.play();
        }
        setCurrentInterval(prev => prev + 1);
      }, interval);

      return () => {
        clearInterval(intervalId);
        clearInterval(mainIntervalId);
      };
    };

    const handleVideoEnd = () => {
      video.currentTime = 0;
      video.play();
      setCurrentInterval(prev => prev + 1);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    if (autoPlay) {
      startInterval();
    }

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
      if (intervalId) clearInterval(intervalId);
    };
  }, [interval, autoPlay]);

  return (
    <div className={`relative ${className}`}>
      <video 
        ref={videoRef}
        className='w-full h-auto object-cover'
        autoPlay={autoPlay}
        muted
        playsInline             // important for iOS Safari autoplay
        loop={true}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntervalVideo;
