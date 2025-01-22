export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">控制台</h1>
      
      {/* 数据概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">总用户数</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">音乐数量</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 mb-2">今日播放量</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">最近活动</h2>
        <div className="space-y-4">
          {/* 活动列表 */}
        </div>
      </div>
    </div>
  );
}