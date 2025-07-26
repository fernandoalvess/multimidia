'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './VideoPlayer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { Video } from '@/data/videos';

interface VideoPlayerProps {
    video: Video | null;
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      if (video && videoRef.current) {
        videoRef.current.poster = video.posterSrc;
        setIsPlaying(false); 
        videoRef.current.load();
        setIsPlaying(false);
        setCurrentTime(0);
        //const playPromise = videoRef.current.play();
        // if (playPromise !== undefined) {
        //   playPromise.then(() => setIsPlaying(true)).catch(error => console.error("Autoplay failed", error));
        // }
      }
    }, [video]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const skip = (amount: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += amount;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            if (duration == 0 && videoRef.current.duration) {
                setDuration(videoRef.current.duration);
            }
            
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleProgressSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressRef.current && videoRef.current) {
            const progressRect = progressRef.current.getBoundingClientRect();
            const seekPosition = (e.clientX - progressRect.left) / progressRect.width;
            videoRef.current.currentTime = seekPosition * duration;
        }
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    if (!video) {
      return <div>Selecione um vídeo para começar.</div>;
    }

    return (
        <div className={styles.containerDoPlayer}>
            <div className={styles.infoSuperior}>
                <span className={styles.identificadorSuperior}>PLAYER DE VÍDEO</span>
            </div>

            <video
                ref={videoRef}
                className={styles.telaDoVideo}
                poster="/assets/manoelgomes.jpeg"
                onClick={togglePlayPause}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                key={video.id}
            >
                <source src={video.videoSrc} type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
            </video>

            <div className={styles.informacoesDaMusica}>
                <h2 className={styles.tituloDaMusica}>{video.title}</h2> {/* DADO DINÂMICO */}
                <p className={styles.nomeDoArtista}>{video.artist}</p> {/* DADO DINÂMICO */}
            </div>

            <div
                ref={progressRef}
                className={styles.containerBarraDeProgresso}
                onClick={handleProgressSeek}
            >
                <div className={styles.barraDeProgresso} style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className={styles.marcacoesDeTempo}>
                <span className={styles.tempoAtual}>{formatTime(currentTime)}</span>
                <span className={styles.tempoTotal}>{formatTime(duration)}</span>
            </div>

            <div className={styles.controles}>
                <button className={styles.botaoDeControle} onClick={() => skip(-10)}>
                    <FontAwesomeIcon icon={faBackward} />
                </button>
                <button className={`${styles.botaoDeControle} ${styles.botaoDePlay}`} onClick={togglePlayPause}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button className={styles.botaoDeControle} onClick={() => skip(10)}>
                    <FontAwesomeIcon icon={faForward} />
                </button>
                <button className={styles.botaoDeControle} onClick={toggleMute}>
                    <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;