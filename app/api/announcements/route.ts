import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { Announcement } from '@/app/lib/type'

// GET /api/announcements - 获取所有公告
export async function GET(request: NextRequest) {
  const announcements = await db.getAnnouncements()
  return NextResponse.json({ data: announcements, code: 200 }, { status: 200 })
}

// POST /api/announcements - 创建公告
export async function POST(request: NextRequest) {
  const {title, content} = await request.json()
  if(!title || !content){
    return NextResponse.json({ msg: '缺少必要参数', code: 400 }, { status: 400 })
  }
  const result = await db.createAnnouncement({title, content})
  return NextResponse.json({ data: result, code: 200 }, { status: 200 })
}

// PUT /api/announcements - 更新公告
export async function PUT(request: NextRequest) {
  const {old_title, title, content} = await request.json()
  if(!old_title || !title || !content){
    return NextResponse.json({ msg: '缺少必要参数', code: 400 }, { status: 400 })
  }
  const result = await db.updateAnnouncement(old_title, {title, content})
  return NextResponse.json({ data: result, code: 200 }, { status: 200 })
}

// DELETE /api/announcements?title="title" - 删除公告
export async function DELETE(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  if(!title){
    return NextResponse.json({ msg: '缺少必要参数', code: 400 }, { status: 400 })
  }
  const result = await db.deleteAnnouncement(title)
  return NextResponse.json({ data: result ? `公告${title}删除成功` : `公告${title}删除失败`, code: 200 }, { status: 200 })
}
