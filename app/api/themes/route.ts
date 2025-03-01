import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { Theme } from '@/app/lib/type'

// GET /api/themes - 获取所有主题
export async function GET(request: NextRequest) {
  const themes = await db.getThemes()
  return NextResponse.json({ data: themes, code: 200 }, { status: 200 })
}

// POST /api/themes - 创建主题
export async function POST(request: NextRequest) {
  const {name, description} = await request.json()
  if(!name || !description){
    return NextResponse.json({ msg: '缺少必要参数', code: 400 }, { status: 400 })
  }
  const result = await db.createTheme({name, description})
  return NextResponse.json({ data: result ? `主题${name}创建成功` : `主题${name}创建失败`, code: 200 }, { status: 200 })
}

// DELETE /api/themes?theme_name="theme_name" - 删除主题
export async function DELETE(request: NextRequest) {
  const theme_name = request.nextUrl.searchParams.get('theme_name')
  if(!theme_name){
    return NextResponse.json({ msg: '缺少必要参数', code: 400 }, { status: 400 })
  }
  const result = await db.deleteTheme(theme_name)
  return NextResponse.json({ data: result ? `主题${theme_name}删除成功` : `主题${theme_name}删除失败`, code: 200 }, { status: 200 })
}
