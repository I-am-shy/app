import Link from "next/link";


export default function Sidebar() {

  const navigation = [
    { name: '仪表盘', href: '/dashboard' },
    { name: '用户管理', href: '/dashboard/users' },
    { name: '音乐管理', href: '/dashboard/songs' },
    { name: '公告管理', href: '/dashboard/announcements' },
  ]

  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">控制台</h2>
        <nav className="space-y-2">
          {
            navigation.map(item=>{
              return (<Link key={item.href} href={{pathname:item.href}} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">{item.name}</Link>)
            })
          }
        </nav>
      </div>
    </div>
  );
}
