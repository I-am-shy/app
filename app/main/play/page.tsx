"use client";

interface Song {
  id: number;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  playedAt: string;
}

export default function PlayPage() {
  // 模拟最近播放数据
  const recentSongs: Song[] = [
    {
      id: 1,
      title: "Normal No More (小提琴版)",
      artist: "Strictlyviolin/马克",
      cover: "/default.png",
      duration: "05:20",
      playedAt: "2小时前"
    },
    {
      id: 2,
      title: "起风了",
      artist: "买辣椒也用券",
      cover: "/default.png",
      duration: "05:11",
      playedAt: "3小时前"
    },
    {
      id: 3,
      title: "Letting Go",
      artist: "蔡健雅",
      cover: "/default.png",
      duration: "04:30",
      playedAt: "5小时前"
    },
    // 添加更多歌曲...
  ];

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">最近播放</h1>
        <div className="text-sm text-gray-500">
          共 {recentSongs.length} 首歌曲
        </div>
      </div>

      {/* 音乐列表 */}
      <div className="bg-base-100 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="table">
            {/* 表头 */}
            <thead>
              <tr className="text-gray-500">
                <th className="w-12">#</th>
                <th>音乐标题</th>
                <th>歌手</th>
                <th>时长</th>
                <th>播放时间</th>
                <th></th>
              </tr>
            </thead>
            {/* 表格内容 */}
            <tbody>
              {recentSongs.map((song, index) => (
                <tr key={song.id} className="hover:bg-base-200 group">
                  {/* 序号/播放按钮 */}
                  <td className="w-12">
                    <div className="flex items-center justify-center w-8 h-8 group-hover:hidden">
                      {index + 1}
                    </div>
                    <button className="btn btn-ghost btn-circle btn-sm hidden group-hover:flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </td>
                  {/* 歌曲信息 */}
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={song.cover} alt={song.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{song.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-500">{song.artist}</td>
                  <td className="text-gray-500">{song.duration}</td>
                  <td className="text-gray-500">{song.playedAt}</td>
                  {/* 操作按钮 */}
                  <td>
                    <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-2">
                      <button className="btn btn-ghost btn-circle btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="btn btn-ghost btn-circle btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
