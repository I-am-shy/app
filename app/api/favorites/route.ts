import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { Favorite } from '@/app/lib/type'

// GET /api/favorites?user_id="user_id" - 获取用户收藏的歌曲
export async function GET(request: NextRequest) {
  const user_id = Number(request.nextUrl.searchParams.get('user_id'))
  if (!user_id) {
    return NextResponse.json({ msg: '缺少必要参数user_id', code: 400 }, { status: 400 })
  }
  const favorites = await db.getFavorites(user_id)
  const favorite_songs = await Promise.all(favorites.map(async(item)=> {
    const song = await db.getSongById(item.song_id)
    return song
  })) 
  // 错误处理
  
  return NextResponse.json({ data: favorite_songs, code: 200 }, { status: 200 })
}

// POST /api/favorites?song_id="song_id" - 添加收藏
export async function POST(request: NextRequest) {
  const song_id = Number(request.nextUrl.searchParams.get('song_id'))
  if (!song_id) {
    return NextResponse.json({ msg: '缺少必要参数song_id', code: 400 }, { status: 400 })
  }
  const {user_id} = await request.json()
  if(!user_id){
    return NextResponse.json({ msg: '缺少必要参数user_id', code: 400 }, { status: 400 })
  }
  const result = await db.createFavorite({user_id, song_id})
  return NextResponse.json({ data: result, code: 200 }, { status: 200 })
}

// DELETE /api/favorites?song_id="song_id" - 删除收藏
export async function DELETE(request: NextRequest) {
  const song_id = Number(request.nextUrl.searchParams.get('song_id'))
  if (!song_id) {
    return NextResponse.json({ msg: '缺少必要参数song_id', code: 400 }, { status: 400 })
  }
  const {user_id} = await request.json()
  if(!user_id){
    return NextResponse.json({ msg: '缺少必要参数user_id', code: 400 }, { status: 400 })
  }
  const result = await db.deleteFavorite(user_id, song_id)
  return NextResponse.json({ data: result, code: 200 }, { status: 200 })
}

