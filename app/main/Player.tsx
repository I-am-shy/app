'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import { songContext } from '../utils/songContext';
import { useRouter, usePathname } from 'next/navigation';
import Progress from '../components/Progress';

export default function Player() {
  const audio = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');
  const [volume, setVolume] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // 当前播放的歌曲
  const [currentSong, setCurrentSong] = useState({
    song_id: '1',
    song_title: "歌名",
    song_artist: "歌手",
    cover: "/default.png",
    song_lyric: "歌词",
    file_path: "/uploads/audios/default.mp3",
  });
  const [playSong, setPlaySong] = useContext(songContext)
  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // 补零操作：确保分钟和秒数始终为两位数
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    console.log(playSong)
    if (!playSong) {
      return;
    }
    const res = fetch('/api/songs?title=' + playSong)
    res.then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          setCurrentSong({ cover: "/default.png", ...data.data })
        }
      })
  }, [playSong])

  // 如果当前路径是播放详情页，则不显示播放器
  if (pathname.startsWith('/main/song/')) {
    return null;
  }

  // 跳转到播放详细页
  const handleSongClick = () => {
    router.push(`/main/song/${currentSong.song_id}`);
  };


  // 音量控制
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };
  useEffect(() => {
    if (audio.current) {
      (audio.current as HTMLAudioElement).volume = volume / 100;
    }
  }, [volume]);

  // 播放控制
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    if (audio.current) {
      if (isPlaying) {
        (audio.current as HTMLAudioElement).play();
        const audioElement = audio.current as HTMLAudioElement;
        setTotalTime(formatTime(audioElement.duration))

      } else {
        (audio.current as HTMLAudioElement).pause();
      }
    }
  }, [isPlaying])
  useEffect(() => {
    if (audio.current) {
      const audioElement = audio.current as HTMLAudioElement;
      audioElement.ontimeupdate = () => {
        setCurrentTime(formatTime(audioElement.currentTime))
      }
    }
  }, [])

  return (
    <div className="h-[82px] flex items-center justify-between px-4 bg-base-100">
      {/* 左侧：歌曲信息 */}
      <div
        className="flex items-center space-x-4 min-w-[200px] max-w-[300px] cursor-pointer group"
        onClick={handleSongClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 relative group">
          <img
            src={currentSong.cover}
            alt="Album Cover"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-base truncate group-hover:text-red-500 transition-colors">{currentSong.song_title}</p>
          <p className="text-sm text-gray-500 truncate">{currentSong.song_artist}</p>
        </div>
      </div>

      {/* 中间：播放控制 */}
      <div className="flex-1 flex flex-col items-center max-w-2xl px-4 py-2">
        {/* 播放控制按钮 */}
        <div className="flex items-center justify-center space-x-6 mb-2">
          <button className="text-gray-600 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/20 transition-colors"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="text-gray-600 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6 18V6h2v12zm10.5-6l-8.5 6V6z" />
            </svg>
          </button>
        </div>

        {/* 进度条 */}
        <div className="w-full">
          <Progress currentTime={currentTime} totalTime={totalTime} />
        </div>
      </div>

      {/* 右侧：音量控制 */}
      <div className="flex items-center space-x-3 min-w-[140px]">
        <button
          className="text-gray-600 hover:text-red-500 transition-colors"
          onClick={() =>{ setVolume(volume === 0 ? 80 : 0)}}
        >
          {volume === 0 ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="range range-xs range-red"
        />
      </div>

      <audio src={currentSong.file_path} ref={audio}></audio>

      <style jsx>{`
        .range {
          height: 2px;
          background-color: #e5e7eb;
          border-radius: 9999px;
          appearance: none;
          width: 100%;
        }
        .range::-webkit-slider-thumb {
          appearance: none;
          width: 10px;
          height: 10px;
          background-color: #ef4444;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        .range::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}