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
    <div className="h-full bg-white">
      <Link href="/main/my">
      <div className="px-4 py-4 hover:bg-gray-100">
        <div className="flex items-center space-x-2 select-none ">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img src="/default.png" alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-sm">my music</span>
        </div>
      </div>
      </Link>

      {/* 路由导航 */}
      <ul className="menu w-full">
        {navigation.map(item => (
          <li key={item.href}>
            <Link 
              href={item.href}
              className={`px-4 py-2 text-sm block hover:bg-gray-100 select-none ${pathname === item.href ? 'text-red-500 font-medium' : 'text-gray-700'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="px-4 mt-6">
        <h3 className="text-xs text-gray-500 mb-2 select-none">我的音乐</h3>
      </div>
      <ul className="menu w-full">
        <li><Link href="/main/share">分享音乐</Link></li>
      </ul>

    </div>
  );
}
