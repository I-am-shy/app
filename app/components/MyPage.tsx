import { useState } from 'react';
import Card from './Card';

interface Stats {
  title: string;
  value: number;
  unit: string;
}

interface Activity {
  id: number;
  type: string;
  content: string;
  time: string;
}

export default function MyPage() {
  const [stats] = useState<Stats[]>([
    { title: '收藏歌单', value: 12, unit: '个' },
    { title: '关注歌手', value: 25, unit: '位' },
    { title: '听歌时长', value: 168, unit: '小时' },
  ]);

  const [activities] = useState<Activity[]>([
    { 
      id: 1, 
      type: '收藏', 
      content: '收藏了歌单《夏日清凉音乐》', 
      time: '2小时前' 
    },
    { 
      id: 2, 
      type: '点赞', 
      content: '点赞了歌曲《Summer》', 
      time: '3小时前' 
    },
    { 
      id: 3, 
      type: '分享', 
      content: '分享了歌单《经典老歌》', 
      time: '1天前' 
    },
  ]);

  const [playlists] = useState([
    { id: 1, title: '我喜欢的音乐', image: '/playlist1.jpg', count: '25首' },
    { id: 2, title: '最近播放', image: '/playlist2.jpg', count: '12首' },
    { id: 3, title: '推荐歌单', image: '/playlist3.jpg', count: '30首' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 个人信息卡片 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center">
          <img 
            src="/avatar.jpg" 
            alt="avatar" 
            className="w-20 h-20 rounded-full object-cover border-4 border-red-100"
          />
          <div className="ml-6">
            <h2 className="text-xl font-bold">用户名称</h2>
            <p className="text-gray-500 mt-1">这里是个性签名</p>
          </div>
        </div>
        
        {/* 数据统计 */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors"
            >
              <div className="text-2xl font-bold text-red-500">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
              <div className="text-xs text-gray-400">{stat.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 我的歌单 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">我的歌单</h3>
        <div className="grid grid-cols-3 gap-4">
          {playlists.map(playlist => (
            <Card key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>

      {/* 动态列表 */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">最近动态</h3>
        <div className="space-y-4">
          {activities.map(activity => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="w-16 text-sm text-red-500">{activity.type}</span>
                <span className="text-gray-700">{activity.content}</span>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 