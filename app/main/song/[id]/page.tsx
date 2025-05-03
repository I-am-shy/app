"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from 'react';

interface SongPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SongPage({ params }: SongPageProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const resolvedParams = use(params);

  useEffect(() => {
    // 组件挂载后立即触发动画
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 等待动画结束后再返回
    setTimeout(() => {
      router.back();
    }, 300);
  };

  // 模拟歌曲数据
  const song = {
    id: resolvedParams.id,
    title: "Normal No More (小提琴版)",
    artist: "Strictlyviolin/马克",
    cover: "/default.png",
    duration: "05:20",
    lyrics: [
      { time: "00:00", text: "歌词加载中..." },
      { time: "00:01", text: "Normal No More" },
      { time: "00:05", text: "小提琴版" },
      // 更多歌词...
    ]
  };

  return (
    <div 
      className={`absolute inset-x-0 bottom-[82px] bg-base-100/95 backdrop-blur-xl transition-all duration-300 ease-in-out z-50
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      style={{
        height: 'calc(100% - 82px)', // 82px 是底部播放器的高度
      }}
    >
      <div className="flex flex-col h-full">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-lg bg-base-100/50">
          <button 
            onClick={handleClose}
            className="btn btn-ghost btn-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">正在播放</h1>
          <div className="w-6"></div>
        </div>

        {/* 主要内容区域 */}
      
      </div>

      {/* 添加全局样式 */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}