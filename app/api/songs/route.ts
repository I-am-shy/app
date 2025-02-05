import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { uploadFile, deleteFile } from '@/app/utils/flieUpload'

// GET /api/songs - 获取所有歌曲
// GET /api/songs?title="title" - 获取单个歌曲
export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  const data = title ? await db.getSong(title) : await db.getSongs()

  if (data) {
    return NextResponse.json({ data, code: 200 }, { status: 200 })
  } else {
    return NextResponse.json({ msg: "歌曲不存在",code:400 }, { status: 400 })
  }
}


