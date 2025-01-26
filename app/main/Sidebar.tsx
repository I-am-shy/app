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
    <div>
      <label className="swap">
        <input type="checkbox" />
        <div className="swap-on">ON</div>
        <div className="swap-off">OFF</div>
      </label>
      <div>
      <h1>侧边栏</h1>
      <ul>
        {
          navigation.map(item=>{
            return (<li key={item.href}><Link href={{pathname:item.href}}>{item.name}</Link></li>)
          })
        }
      </ul>
      </div>
    </div>
  );
}