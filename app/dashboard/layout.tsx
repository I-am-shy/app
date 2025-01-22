export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 侧边栏 */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-xl font-bold mb-8">后台管理</h1>
        <nav className="space-y-2">
          <a href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            概览
          </a>
          <a href="/dashboard/users" className="block py-2 px-4 rounded hover:bg-gray-700">
            用户管理
          </a>
          <a href="/dashboard/songs" className="block py-2 px-4 rounded hover:bg-gray-700">
            音乐管理
          </a>
          <a href="/dashboard/comments" className="block py-2 px-4 rounded hover:bg-gray-700">
            评论管理
          </a>
        </nav>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}