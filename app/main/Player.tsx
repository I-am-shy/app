'use client';

import { useState } from 'react';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState('03:30');
  const [totalTime, setTotalTime] = useState('05:20');

  return (
    <div className="w-full flex items-center px-2 py-1 bg-white">
      {/* 左侧：歌曲信息 */}
      <div className="flex items-center min-w-0 w-64 mr-4">
        <div className="w-12 h-12 rounded mr-3 overflow-hidden flex-shrink-0">
          <img src="/default.png" alt="Album Cover" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 overflow-hidden">
          <p className="font-medium text-sm truncate">Normal No More (小提琴版)</p>
          <p className="text-xs text-gray-500 truncate">- Strictlyviolin/马克</p>
        </div>
      </div>

      {/* 中间：播放控制 */}
      <div className="flex-1 flex flex-col items-center">

        {/* 进度条 */}
        <div className="w-full flex items-center">
          <span className="text-xs text-gray-500 w-10 text-right mr-2">{currentTime}</span>
          <div className="flex-1 relative h-1 bg-gray-200 rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-red-500 rounded-full"
              style={{ width: '90%' }}
            ></div>
            <div className="absolute left-[90%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-red-500 cursor-pointer"></div>
          </div>
          <span className="text-xs text-gray-500 w-10 text-left ml-2">{totalTime}</span>
        </div>

        {/* 播放控制按钮 */}
        <div className="flex items-center space-x-8 mb-2">
          <button className="text-gray-600 hover:text-red-500">
            <svg className="icon h-6 w-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4245">
              <path d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z" fill="#515151" p-id="4246"></path>
            </svg>
          </button>
          <button
            className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600"
            onClick={() => setIsPlaying(!isPlaying)}
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
          <button className="text-gray-600 hover:text-red-500">
            <svg className="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5390">
              <path d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z" fill="#515151" p-id="5391"></path>
            </svg>
          </button>
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
        <svg className="icon h-5 w-5" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10863" width="16" height="16">
          <path d="M260.256 356.576l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM670.784 720.128a32 32 0 0 1-44.832-45.664 214.08 214.08 0 0 0 64.32-153.312 213.92 213.92 0 0 0-55.776-144.448 32 32 0 1 1 47.36-43.04 277.92 277.92 0 0 1 72.416 187.488 278.08 278.08 0 0 1-83.488 198.976zM822.912 858.88a32 32 0 1 1-45.888-44.608A419.008 419.008 0 0 0 896 521.152c0-108.704-41.376-210.848-114.432-288.384a32 32 0 0 1 46.592-43.872c84.16 89.28 131.84 207.04 131.84 332.256 0 127.84-49.76 247.904-137.088 337.728z" fill="#707070" p-id="10864"></path>
        </svg>
        </button>
      </div>
    </div>
  );
}