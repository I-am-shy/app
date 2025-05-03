import { useState, useEffect } from 'react';
import Progress from './Progress';

interface Lyric {
  time: number;
  text: string;
}

export default function PlayDetail({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [lyrics] = useState<Lyric[]>([
    { time: 0, text: '歌词加载中...' },
    { time: 1, text: '这是第一句歌词' },
    { time: 5, text: '这是第二句歌词' },
    { time: 10, text: '这是第三句歌词' },
  ]);

  const currentLyricIndex = lyrics.findIndex(
    (lyric, index) => currentTime >= lyric.time && 
    (!lyrics[index + 1] || currentTime < lyrics[index + 1].time)
  );

  useEffect(() => {
    // 模拟播放进度
    const timer = setInterval(() => {
      setCurrentTime(time => (time + 1) % 15);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-[82px] left-0 right-0 h-[calc(100vh-82px)] bg-white transform transition-transform duration-300 ease-in-out">
      <div className="h-full flex flex-col">
        {/* 顶部控制栏 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-red-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-medium">正在播放</h2>
          <div className="w-6"></div>
        </div>

        {/* 封面区域 */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-64 h-64">
            <img 
              src="/default-cover.jpg" 
              alt="cover"
              className="w-full h-full rounded-lg object-cover shadow-xl"
            />
          </div>
        </div>

        {/* 歌词区域 */}
        <div className="h-48 overflow-y-auto px-4 py-2">
          <div className="flex flex-col items-center">
            {lyrics.map((lyric, index) => (
              <p
                key={index}
                className={`my-2 transition-all duration-300 ${
                  index === currentLyricIndex
                    ? 'text-red-500 text-lg font-medium'
                    : 'text-gray-500 text-base'
                }`}
              >
                {lyric.text}
              </p>
            ))}
          </div>
        </div>

        {/* 控制区域 */}
        <div className="p-4">
          <Progress currentTime="01:23" totalTime="03:45" />
          <div className="flex items-center justify-center space-x-8 mt-4">
            <button className="text-gray-600 hover:text-red-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            </button>
            <button className="text-gray-600 hover:text-red-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 