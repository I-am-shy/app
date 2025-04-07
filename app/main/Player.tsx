'use client';

import { useState } from 'react';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('03:30');
  const [totalTime, setTotalTime] = useState('05:20');
  
  return (
    <div className="w-full flex items-center px-2 py-1 bg-white">
      {/* 左侧：歌曲信息 */}
      <div className="flex items-center w-64">
        <div className="w-12 h-12 rounded mr-3 overflow-hidden">
          <img src="/default.png" alt="Album Cover" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-medium text-sm">她说 (She Says)</p>
          <p className="text-xs text-gray-500">林俊杰</p>
        </div>
      </div>
      
      {/* 中间：播放控制 */}
      <div className="flex-1 flex flex-col items-center">
        {/* 播放控制按钮 */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>
          <button 
            className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button className="text-gray-600 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>
        
        {/* 进度条 */}
        <div className="w-full flex items-center text-xs mt-2">
          <span className="text-gray-500 min-w-[40px]">{currentTime}</span>
          <div className="flex-1 mx-2 h-1 bg-gray-200 rounded-full relative group cursor-pointer">
            <div className="h-full w-[60%] bg-red-500 rounded-full"></div>
            <div className="absolute top-1/2 left-[60%] transform -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-gray-500 min-w-[40px]">{totalTime}</span>
        </div>
      </div>
      
      {/* 右侧：功能按钮 */}
      <div className="flex items-center space-x-4 w-48 justify-end">
        <button className="text-gray-600 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button className="text-gray-600 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l-2.828 2.828m2.828-2.828a9 9 0 010-12.728m0 0l2.828 2.828" />
          </svg>
        </button>
      </div>
    </div>
  );
}