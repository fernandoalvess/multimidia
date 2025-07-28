'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './VideoPlayer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackward, faForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { Video } from '@/data/videos';

interface VideoPlayerProps {
    video: Video | null;
    onNextVideo: () => void;
}

const VideoPlayer = ({ video,onNextVideo }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
    };

    useEffect(() => {
      if (video && videoRef.current) {
        videoRef.current.poster = video.posterSrc;
        setIsPlaying(false); 
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error("Autoplay bloqueado:", error);
            setIsPlaying(false);
          });
      }
        setCurrentTime(0);
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
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      if (videoRef.current) {
        videoRef.current.muted = newMutedState;
        if (!newMutedState && volume === 0) {
          setVolume(1);
          videoRef.current.volume = 1;
        }
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

    const volumePercentage = volume * 100;
    const sliderStyle = {
        background: `linear-gradient(to right, #005bac ${volumePercentage}%, #555 ${volumePercentage}%)`
    };

    return (
    <div className={styles.containerDoPlayer}>
        <div className={styles.infoSuperior}>
            <span className={styles.identificadorSuperior}>PLAYER DE VÍDEO</span>
        </div>

        <video
            ref={videoRef}
            className={styles.telaDoVideo}
            poster={video.posterSrc}
            onClick={togglePlayPause}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={onNextVideo} 
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            key={video.id} 
        >
            <source src={video.videoSrc} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
        </video>

        <div className={styles.informacoesDaMusica}>
            <h2 className={styles.tituloDaMusica}>{video.title}</h2>
            <p className={styles.nomeDoArtista}>{video.artist}</p>
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

        <div className={styles.controlesContainer}>
                {/* Linha 1: Controles de Reprodução */}
                <div className={styles.controlesPrincipais}>
                    <button className={styles.botaoDeControle} onClick={() => skip(-10)}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className={`${styles.botaoDeControle} ${styles.botaoDePlay}`} onClick={togglePlayPause}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <button className={styles.botaoDeControle} onClick={() => skip(10)}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
            
            <div className={styles.containerDeVolume}>
              <button className={styles.botaoDeControle} onClick={toggleMute}>
                  <FontAwesomeIcon icon={(isMuted || volume === 0) ? faVolumeMute : faVolumeUp} />
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.sliderDeVolume}
                style={sliderStyle}
              />
            </div>
        </div>
    </div>
    );
};

export default VideoPlayer;