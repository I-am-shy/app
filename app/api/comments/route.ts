import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { Comment } from '@/app/lib/type'

// GET /api/comments?song_id="song_id" - 获取评论
export async function GET(request: NextRequest) {
  const song_id = Number(request.nextUrl.searchParams.get('song_id'))
  if (!song_id) {
    return NextResponse.json({ msg: '缺少必要参数song_id', code: 400 }, { status: 400 })
  }
  const comments = await db.getComments(song_id)
  return NextResponse.json({ data: comments, code: 200 }, { status: 200 })
}

// POST /api/comments?song_id="song_id - 添加评论 
export async function POST(request: NextRequest) {
  const song_id = Number(request.nextUrl.searchParams.get('song_id'))
  const {user_id,content} = await request.json()
  const comment:Comment = {
    song_id,
    user_id,
    content
  }
  if(!song_id){
    return NextResponse.json({ msg: '缺少必要参数song_id', code: 400 }, { status: 400 })
  }
  if(!user_id || !content){
    return NextResponse.json({ msg: '用户id和评论内容不能为空', code: 400 }, { status: 400 })
  }
  const result = await db.createComment(comment)
  return NextResponse.json({ data: result, code: 200 }, { status: 200 })
}

// DELETE /api/comments- 删除评论
export async function DELETE(request: NextRequest) {
  const {comment_id} = await request.json()
  if(!comment_id){
    return NextResponse.json({ msg: '缺少必要参数comment_id', code: 400 }, { status: 400 })
  }
  const result = await db.deleteComment(comment_id)
  return NextResponse.json({ data: result, code: 200 }, { status: 200 })
}


