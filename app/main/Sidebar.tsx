'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
  { name: '发现音乐', href: '/main' },
  { name: '最近播放', href: '/main/play' },
  { name: '个人中心', href: '/main/my' },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-full h-full bg-white py-4 overflow-y-auto">
      <div className="px-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src="/default.png" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-sm">my music</span>
        </div>
      </div>
      
      <ul className="menu w-full">
        {navigation.map(item => (
          <li key={item.href} className="mb-1">
            <Link 
              href={item.href}
              className={`px-4 py-2 text-sm ${pathname === item.href ?'font-medium' : 'text-gray-700'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="px-4 mt-6 mb-2">
        <h3 className="text-xs text-gray-500">我的音乐</h3>
      </div>
      
      <div className="px-4 mt-6 mb-2">
        <h3 className="text-xs text-gray-500">创建的歌单</h3>
      </div>
    </div>
  );
}
