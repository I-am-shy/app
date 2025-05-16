import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// 在中间件导入数据库连接，确保数据库在ui渲染前已经初始化
import db from './app/lib/db'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const cookie = request.cookies.get('token')

  const verifyToken = async () => {

    const response = await fetch(`${request.nextUrl.origin}/api/auth`,{
      headers: {
        'Cookie': `token=${cookie?.value}`
      }
    })
    const Auth = await response.json()
    return Auth.code === 200
  }
  const isLogin = await verifyToken()


  // 需要登录的路由
  const authRoutes = ['/main','/main/my', '/main/song','/main/share','/main/player','/dashboard']

  // 已登录用户不能访问登录页
  if (pathname === '/login' && isLogin) {
    return NextResponse.redirect(new URL('/main', request.url))
  }

  // 未登录用户访问需要认证的页面
  if (authRoutes.some(route => pathname.startsWith(route)) && !isLogin) {
    return NextResponse.redirect(new URL('/login', request.url))
  }


  if (pathname === '/') {// 重定向到首页
    return NextResponse.redirect(new URL('/main', request.url))
  }

  return NextResponse.next()
}

// 配置需要运行中间件的路由
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * /api (API 路由)
     * /_next (Next.js 系统文件)
     * /_static (静态文件)
     * /favicon.ico (浏览器图标)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 