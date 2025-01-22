'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
  { name: '发现音乐', href: '/' },
  { name: '我的收藏', href: '/favorites' },
  { name: '最近播放', href: '/recent' },
  { name: '播放列表', href: '/playlists' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">音乐播放器</h1>
      </div>
      <nav>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block py-2 px-4 rounded-lg mb-2 ${
              pathname === item.href
                ? 'bg-gray-800 text-white'
                : 'hover:bg-gray-800'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}