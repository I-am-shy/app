'use client';

import { useState } from 'react';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 当前播放信息 */}
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.jpg"
            alt="封面"
            className="w-12 h-12 rounded"
          />
          <div>
            <div className="font-medium">歌曲名称</div>
            <div className="text-sm text-gray-400">歌手名称</div>
          </div>
        </div>

        {/* 播放控制 */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-gray-300">上一首</button>
          <button
            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
          <button className="hover:text-gray-300">下一首</button>
        </div>

        {/* 进度条 */}
        <div className="w-1/3">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}