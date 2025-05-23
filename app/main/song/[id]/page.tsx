"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { use } from 'react';

interface SongPageProps {
  params: Promise<{
    id: string;
  }>;
}

// 添加评论接口
interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
}

// 扩展 HTMLDivElement 类型
interface ScrollableDiv extends HTMLDivElement {
  scrollTimer?: number;
}

export default function SongPage({ params }: SongPageProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const scrollRef = useRef<ScrollableDiv>(null);
  const resolvedParams = use(params);

  const [song, setSong] = useState({
    song_id: 1,
    song_title: "Normal No More ",
    song_artist: "马克",
    cover: "/default.png",
    duration: "05:20",
    lyrics: [
      { time: "00:00", text: "歌词加载中..." },
      { time: "00:01", text: "Normal No More" },
      // 更多歌词...
    ]
  })
  useEffect(() => {
    async function getSongInfo() {
      const res = await fetch('/api/songs?title=' + decodeURIComponent(resolvedParams.id))
      const data = await res.json()
      console.log(data);
      if (data.code === 200) {

        setSong((val) => {
          return {
            ...val,
            ...data.data,
            lyrics: data.data.song_lyric.split('\n').map((item: string) => {
              const [time, text] = item.split(']');
                return { time: time.slice(1), text: text.trim() };
              
            }).filter((item: { time: string; text: string }) => {
              return item.text !== '';
            })
          }
        })
      }
    }
    getSongInfo()
  }, [])
  // 模拟评论数据
  const comments: Comment[] = [
    {
      id: '1',
      userName: '音乐爱好者',
      userAvatar: '/default.png',
      content: '这首歌真的很棒！旋律太美了',
      timestamp: '2024-03-15 14:30'
    },
    {
      id: '2',
      userName: '小提琴手',
      userAvatar: '/default.png',
      content: '小提琴的演奏技巧很精湛，特别是高音部分的处理很到位',
      timestamp: '2024-03-15 13:25'
    },
    {
      id: '3',
      userName: '古典乐迷',
      userAvatar: '/default.png',
      content: '这个改编版本很有新意，保留了原曲的精髓同时又加入了新的元素',
      timestamp: '2024-03-15 12:15'
    }
  ];


  useEffect(() => {
    setIsVisible(true);

    // 监听滚动事件
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        // 当滚动到一定位置时显示评论区
        setShowComments(scrollTop > (scrollHeight - clientHeight) / 2);

        // 添加滚动中的类
        scrollRef.current.classList.add('is-scrolling');

        // 清除之前的定时器
        if (scrollRef.current.scrollTimer) {
          window.clearTimeout(scrollRef.current.scrollTimer);
        }

        // 设置新的定时器
        scrollRef.current.scrollTimer = window.setTimeout(() => {
          scrollRef.current?.classList.remove('is-scrolling');
        }, 1000);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
        if (scrollElement.scrollTimer) {
          window.clearTimeout(scrollElement.scrollTimer);
        }
      }
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 等待动画结束后再返回
    setTimeout(() => {
      router.back();
    }, 300);
  };


  return (
    <>
      {/* 主要内容区域 */}
      <div
        className={`absolute inset-x-0 bottom-[82px] bg-base-100/95 backdrop-blur-xl transition-all duration-300 ease-in-out z-40
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        style={{
          height: 'calc(100vh - 164px)',
          maxHeight: 'calc(100vh - 164px)'
        }}
      >
        <div className="flex flex-col h-full max-h-full">
          {/* 顶部栏 */}
          <div className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-lg bg-base-100/50 sticky top-0 z-50">
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

          {/* 滚动内容区域 */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-gray-50 scrollbar-default"
          >
            <div className="p-6">
              {/* 播放器部分 */}
              <div className="flex min-h-[600px] gap-6 items-center justify-center mb-20">
                {/* 左侧封面图片 */}
                <div className="w-1/2 flex items-center justify-center">
                  <div className="w-[250px] h-[250px]">
                    <img
                      src={song.cover}
                      alt={song.song_title}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>

                {/* 右侧信息区域 */}
                <div className=" w-[800px] h-[400px] flex-1 flex flex-col items-center justify-center min-h-[500px]">
                  {/* 歌曲信息 */}
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-3 text-gray-800">{song.song_title}</h2>
                    <p className="text-gray-500">{song.song_artist}</p>
                  </div>

                  {/* 歌词区域 */}
                  <div className=" flex-1 flex flex-col justify-center overflow-y-auto">
                    {song.lyrics.map((line, index) => (
                      <p
                        key={index}
                        className="mb-6 text-center text-gray-600 hover:text-red-500 transition-colors text-lg"
                      >
                        {line.text}
                      </p>
                    ))}
                  </div>

                  {/* 播放控件 */}
                  <div className="w-[80%] flex flex-col gap-3 mt-10">
                    {/* 进度条 */}
                    <div className="w-full h-1 bg-gray-200 rounded-full">
                      <div className="w-1/3 h-full bg-red-500 rounded-full"></div>
                    </div>

                    {/* 时间显示 */}
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>00:00</span>
                      <span>{song.duration}</span>
                    </div>

                    {/* 控制按钮 */}
                    <div className="flex items-center justify-center gap-8 mt-2">
                      <button className="text-gray-600 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="text-red-500 hover:text-red-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      </button>
                      <button className="text-gray-600 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 评论区域 */}
              <div
                className={`w-full max-w-4xl mx-auto transition-all duration-500 transform
                  ${showComments ? 'translate-y-0 opacity-100' : 'translate-y-1/2 opacity-0'}`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  评论区
                </h3>

                <div className="space-y-4 pb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={comment.userAvatar}
                            alt={comment.userName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-800">{comment.userName}</span>
                            <span className="text-sm text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-600">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部评论输入区域 */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white border-t transition-all duration-500 z-50
          ${isVisible ? (showComments ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0') : 'translate-y-full opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 h-[82px] flex items-center">
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mr-3">
            <img
              src="/default.png"
              alt="用户头像"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 h-10">
            <input
              type="text"
              placeholder="发送评论..."
              className="flex-1 bg-transparent border-none outline-none text-sm"
            />
          </div>
          <button className="ml-3 px-5 h-10 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors">
            发送
          </button>
        </div>
      </div>

      {/* 添加全局样式 */}
      <style jsx global>{`
        .scrollbar-default {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .scrollbar-default::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-default::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-default::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 3px;
          transition: background-color 0.3s ease;
        }
        .scrollbar-default.is-scrolling::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
        }
        .scrollbar-default.is-scrolling {
          scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
        }
        .scrollbar-default::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.8);
        }
      `}</style>
    </>
  );
}