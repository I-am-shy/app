import { NextRequest, NextResponse } from 'next/server'
import { verifyToken,getToken } from '@/app/utils/token'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value || ""
  if (!token) {
    return NextResponse.json({ code: 401, message: '未登录' })
  }

  const isValid = verifyToken(token, "abc")

  if (isValid) {
    return NextResponse.json({ code: 200, message: '验证成功' })
  } else {
    return NextResponse.json({ code: 401, message: '验证失败' })
  }
}


export async function POST(request: NextRequest) {
  // 登录逻辑
  const user = await request.json()
  const response = await fetch(request.nextUrl.origin + '/api/users?name=' + user.name);
  const data = await response.json();
  if(data.code === 200){
    if(data.data.password === user.password){
      const token = getToken({name:user.name,role:data.data.role},"abc",60*60*24)
      const response = NextResponse.json({ code: 200, message: '登录成功', token })
      response.cookies.set('token',getToken({name:user.name,role:data.data.role},"abc",60*60*24))
      return response
    }
    else{
      return NextResponse.json({ code: 401, message: '密码错误' })
    }
  }
  else{
    return NextResponse.json({ code: 401, message: '用户不存在' })
  }


}


