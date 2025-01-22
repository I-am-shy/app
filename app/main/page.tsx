import { Suspense } from 'react';

export default function MainPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">发现音乐</h1>
      
      <Suspense fallback={<div>加载中...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 推荐歌单 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">推荐歌单</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* 歌单卡片 */}
            </div>
          </section>

          {/* 最新音乐 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">最新音乐</h2>
            <div className="space-y-4">
              {/* 音乐列表 */}
            </div>
          </section>
        </div>
      </Suspense>
    </div>
  );
}