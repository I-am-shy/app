import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 获取token
  const token = "123"

  // 需要登录的路由
  const authRoutes = ['/my', '/dashboard']
  
  // 已登录用户不能访问登录页
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/main', request.url))
  }

  // 未登录用户访问需要认证的页面
  if (authRoutes.some(route => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
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