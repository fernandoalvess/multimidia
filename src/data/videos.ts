export interface Video {
  id: number;
  title: string;
  artist: string;
  posterSrc: string;
  videoSrc: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: "Ceiça - O Clipe",
    artist: "Manoel Gomes",
    posterSrc: "/assets/manoelgomes.jpeg",
    videoSrc: "/assets/videomanoelgomes.mp4",
  },
  {
    id: 2,
    title: "Elephants Dream",
    artist: "Filme",
    posterSrc: "/assets/elephants.jpg",
    videoSrc: "/assets/elephants.mp4",
  },
  {
    id: 3,
    title: "Video do Gato",
    artist: "Miau",
    posterSrc: "/assets/gato.jpeg",
    videoSrc: "/assets/gato.mp4",
  },
];