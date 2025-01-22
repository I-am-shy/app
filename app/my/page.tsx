export default function MyPage() {
  return (
    <div className="container mx-auto p-8">
      {/* 用户信息 */}
      <div className="mb-8 flex items-center space-x-4">
        <div className="w-20 h-20 rounded-full bg-gray-200">
          {/* 头像 */}
        </div>
        <div>
          <h1 className="text-2xl font-bold">用户名</h1>
          <p className="text-gray-600">简介</p>
        </div>
      </div>

      {/* 我的收藏 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">我的收藏</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 收藏列表 */}
        </div>
      </section>

      {/* 最近播放 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">最近播放</h2>
        <div className="space-y-4">
          {/* 播放历史 */}
        </div>
      </section>
    </div>
  );
}
