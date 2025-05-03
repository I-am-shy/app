'use client';

import { useRouter } from 'next/navigation';

export default function MyPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth', {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.code === 200) {
        router.push('/login');
      } else {
        // 可以使用toast或其他方式提示错误
        console.error('退出登录失败:', data.message);
      }
    } catch (error) {
      console.error('退出登录出错:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 顶部操作栏 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">个人中心</h1>
          <button
            onClick={handleLogout}
            className="btn bg-white text-gray-600 hover:bg-red-500 hover:text-white border-gray-200 hover:border-red-500 transition-all duration-300"
          >
            退出登录
          </button>
        </div>

        {/* 个人信息卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row items-center p-8">
            <div className="avatar mb-6 lg:mb-0">
              <div className="w-28 rounded-full ring-2 ring-red-500 ring-offset-2">
                <img src="/default.png" alt="用户头像" className="object-cover" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left lg:ml-8">
              <h2 className="text-2xl font-bold text-gray-800">用户名</h2>
              <p className="text-gray-500 mt-3">这里是个人简介，可以写一些简短的介绍。</p>
              <div className="mt-6">
                <button className="btn bg-white text-red-500 hover:bg-red-500 hover:text-white border-red-500 transition-all duration-300">
                  编辑资料
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all duration-300">
            <div className="flex items-center">
              <div className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-10 h-10 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="ml-6">
                <div className="text-sm font-medium text-gray-500">收藏歌曲</div>
                <div className="text-3xl font-bold text-gray-800 mt-1">256</div>
                <div className="text-sm text-red-500 mt-1">↗︎ 45 (30天)</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all duration-300">
            <div className="flex items-center">
              <div className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-10 h-10 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-6">
                <div className="text-sm font-medium text-gray-500">听歌总数</div>
                <div className="text-3xl font-bold text-gray-800 mt-1">2.6k</div>
                <div className="text-sm text-red-500 mt-1">↗︎ 90 (30天)</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-red-500 transition-all duration-300">
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring-2 ring-red-500 ring-offset-2">
                  <img src="/default.png" alt="统计图标" className="object-cover" />
                </div>
              </div>
              <div className="ml-6">
                <div className="text-sm font-medium text-gray-500">创建歌单</div>
                <div className="text-3xl font-bold text-gray-800 mt-1">86</div>
                <div className="text-sm text-red-500 mt-1">↗︎ 12 (30天)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近动态 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">最近动态</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-300">
                  <div className="avatar flex-shrink-0">
                    <div className="w-12 h-12 rounded-full ring-2 ring-red-500 ring-offset-2">
                      <img src="/default.png" alt="动态头像" className="object-cover" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">收藏了歌单</h4>
                      <span className="text-sm text-gray-500">2小时前</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">收藏了歌单《2024最热歌曲精选》</p>
                    <div className="mt-3">
                      <div className="badge bg-red-50 text-red-500 border-red-500">收藏</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
