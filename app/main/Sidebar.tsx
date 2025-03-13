'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigation = [
  { name: '发现音乐', href: '/' },
  { name: '播放音乐', href: '/main/play' },
  { name: '个人中心', href: '/main/my' },
];

export default function Sidebar() {

  return (
    <>
      <div className="w-[100%] h-[100%] bg-white rounded-[5px_0_0_5px] ">
        <div className="p-4">
          <h1>侧边栏</h1>
          <div className="divider"></div>
          <ul className="menu bg-base-200 rounded-box w-full">
            {navigation.map(item => (<li key={item.href}><Link  href={{ pathname: item.href }}>{item.name}</Link></li>))}
          </ul>
        </div>
      </div>
    </>
  );
}
