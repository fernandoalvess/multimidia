import { Video } from '@/data/videos';
import styles from './VideoList.module.css';
import Image from 'next/image';

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  currentVideoId?: number;
}

const VideoList = ({ videos, onVideoSelect, currentVideoId }: VideoListProps) => {
  return (
    <div className={styles.listContainer}>
      <h3 className={styles.listTitle}>Próximos Vídeos</h3>
      <ul>
        {videos.map((video) => (
          <li
            key={video.id}
            onClick={() => onVideoSelect(video)}
            className={`${styles.listItem} ${video.id === currentVideoId ? styles.active : ''}`}
          >
            <Image
              src={video.posterSrc}
              alt={video.title}
              width={100}
              height={56}
              className={styles.thumbnail}
            />
            <div className={styles.videoInfo}>
              <p className={styles.videoTitle}>{video.title}</p>
              <p className={styles.videoArtist}>{video.artist}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;