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

  return (
    <main style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
      <VideoPlayer video={currentVideo} />
      <VideoList
        videos={videos}
        onVideoSelect={handleVideoSelect}
        currentVideoId={currentVideo?.id}
      />
    </main>
  );
}