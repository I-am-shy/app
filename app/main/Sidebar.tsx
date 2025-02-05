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
          <label className="swap">
            <input type="checkbox" />
            <div className="swap-on">ON</div>
            <div className="swap-off">OFF</div>
          </label>
            <nav className="space-y-2">
              {
                navigation.map(item => {
                  return (<Link key={item.href} href={{ pathname: item.href }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">{item.name}</Link>)
                })
              }
            </nav>

        </div>
      </div>
    </>
  );
}
