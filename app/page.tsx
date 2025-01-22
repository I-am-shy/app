import { Suspense } from 'react';
import Sidebar from "./Sidebar";
import Player from "./Player";
import "./globals.css";

export default function Home() {
  return (<>
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">发现音乐</h2>
          <Suspense fallback={<div>加载中...</div>}>
            <div className="grid grid-cols-4 gap-6">
              {/* 音乐卡片列表 */}
              <MusicCard />
            </div>
          </Suspense>
        </div>
      </main>
      <Player />
    </div>

  </>);
}

function MusicCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src="/placeholder.jpg"
        alt="音乐封面"
        className="w-full aspect-square object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium">歌曲名称</h3>
        <p className="text-sm text-gray-500">歌手名称</p>
      </div>
    </div>
  );
}