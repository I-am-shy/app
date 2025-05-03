import { NextRequest, NextResponse } from 'next/server'
import { verifyToken,getToken } from '@/app/utils/token'

export const runtime = 'nodejs'

// 验证token
export async function GET(request: NextRequest) {
  try {
    const tokenCookie = request.cookies.get('token')
    
    if (!tokenCookie || !tokenCookie.value) {
      return NextResponse.json({ code: 401, message: '未登录' })
    }

    const isValid = verifyToken(tokenCookie.value, "abc")

    if (isValid) {
      return NextResponse.json({ code: 200, message: '验证成功' })
    } else {
      // 如果验证失败，清除token返回401
      request.cookies.delete('token')
      return NextResponse.json({ code: 401, message: '验证失败' })
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({ code: 401, message: '验证出错' })
  }
}

export async function POST(request: NextRequest) {
  try {
    // 登录逻辑
    const user = await request.json()
    const response = await fetch(request.nextUrl.origin + '/api/users?name=' + user.name);
    const data = await response.json();
    
    if(data.code === 200){
      if(data.data.password === user.password){
        const token = getToken({name:user.name,role:data.data.role},"abc",60*60*24)
        const response = NextResponse.json({ code: 200, message: '登录成功', token })
        response.cookies.set('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 // 24小时
        })
        return response
      } else {
        return NextResponse.json({ code: 401, message: '密码错误' })
      }
    } else {
      return NextResponse.json({ code: 401, message: '用户不存在' })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ code: 500, message: '登录出错' })
  }
}

// 退出登录
export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      code: 200, 
      message: '退出成功' 
    })
    
    // 删除token cookie
    response.cookies.delete('token')
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ 
      code: 500, 
      message: '退出失败' 
    })
  }
}


