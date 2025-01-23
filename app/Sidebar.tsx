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

  return (
    <div>
      <h1>侧边栏</h1>
    </div>
  );
}