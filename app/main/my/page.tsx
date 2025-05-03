export default function MyPage() {
  return (
    <div className="space-y-6">
      {/* 个人信息卡片 */}
      <div className="card bg-base-100 shadow-xl">
        <div className="flex flex-col lg:flex-row items-center p-6">
          <div className="avatar mb-4 lg:mb-0">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="/default.png" alt="用户头像" />
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left lg:ml-6">
            <h2 className="text-2xl font-bold">用户名</h2>
            <p className="text-gray-500 mt-2">这里是个人简介，可以写一些简短的介绍。</p>
            <div className="mt-4">
              <button className="btn btn-primary">编辑资料</button>
            </div>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="flex items-center">
            <div className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="stat-title">收藏歌曲</div>
              <div className="stat-value text-primary">256</div>
              <div className="stat-desc">↗︎ 45 (30天)</div>
            </div>
          </div>
        </div>
        
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="flex items-center">
            <div className="text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <div className="stat-title">听歌总数</div>
              <div className="stat-value text-secondary">2.6k</div>
              <div className="stat-desc">↗︎ 90 (30天)</div>
            </div>
          </div>
        </div>
        
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="/default.png" alt="统计图标" />
              </div>
            </div>
            <div className="ml-4">
              <div className="stat-title">创建歌单</div>
              <div className="stat-value">86</div>
              <div className="stat-desc text-secondary">↗︎ 12 (30天)</div>
            </div>
          </div>
        </div>
      </div>

      {/* 最近动态 */}
      <div className="bg-base-100 p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">最近动态</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start space-x-4 p-4 hover:bg-base-200 rounded-lg transition-colors">
              <div className="avatar flex-shrink-0">
                <div className="w-10 h-10 rounded-full">
                  <img src="/default.png" alt="动态头像" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">收藏了歌单</h4>
                  <span className="text-sm text-gray-500">2小时前</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">收藏了歌单《2024最热歌曲精选》</p>
                <div className="mt-2">
                  <div className="badge badge-outline">收藏</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
