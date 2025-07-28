'use client';

import { useState } from 'react';
import VideoPlayer from "@/components/VideoPlayer";
import VideoList from '@/components/VideoList';
import { videos, Video } from '@/data/videos';

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0]);

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
  };

  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(video => video.id === currentVideo.id);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentVideo(videos[nextIndex]);
  };

  return (
    <main style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      <VideoList
        videos={videos}
        onVideoSelect={handleVideoSelect}
        currentVideoId={currentVideo?.id}
      />
      <VideoPlayer video={currentVideo} 
      onNextVideo={handleNextVideo}/>
    </main>
  );
}