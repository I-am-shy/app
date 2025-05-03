import { useState } from 'react';
import Progress from './Progress';

export default function Player() {
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[82px] bg-white border-t border-gray-200 px-4 flex items-center">
      {/* 左侧歌曲信息 */}
      <div className="flex items-center w-[300px]">
        <img 
          src="/default-cover.jpg" 
          alt="cover" 
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="ml-3">
          <h3 className="text-sm font-medium">歌曲名称</h3>
          <p className="text-xs text-gray-500">歌手名称</p>
        </div>
      </div>

      {/* 中间播放控制 */}
      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center space-x-4 mb-2">
          <button className="text-gray-600 hover:text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
            )}
          </button>
          <button className="text-gray-600 hover:text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <Progress currentTime="01:23" totalTime="03:45" />
      </div>

      {/* 右侧音量控制 */}
      <div className="w-[300px] flex items-center justify-end">
        <button className="text-gray-600 hover:text-red-500 mr-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {volume === 0 ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            )}
          </svg>
        </button>
        <div className="w-24">
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="range range-xs range-primary"
          />
        </div>
      </div>
    </div>
  );
} 