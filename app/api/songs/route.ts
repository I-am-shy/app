import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { uploadFile, deleteFile } from '@/app/utils/flieUpload'
import { Song } from '@/app/lib/type'

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

// POST /api/songs - 上传歌曲
export async function POST(request: NextRequest){
  // 获取歌曲信息和歌曲文件对象
  const formData = await request.formData() 
  const song = {} as Song
  for (const [key, value] of formData.entries()) {
    // 使用类型断言确保 key 是 Song 类型的有效属性
    (song as { [key: string]: any })[key] = value
  }
  // 查询歌曲是否已经存在
  const songData = await db.getSong(song.song_title)
  if (songData && (songData.song_title === song.song_title || songData.song_artist === song.song_artist)) {
    return NextResponse.json({ msg: '歌曲已存在',code: 400 }, { status: 400 })
  } else {
    // 上传歌曲文件
    const songFile = formData.get('file_path')
    if (!songFile) {
      return NextResponse.json({ msg: '歌曲文件不能为空',code: 400 }, { status: 400 })
    } else {
      try{
        const songPath = await uploadFile(songFile as File, 'audio')
        await db.createSong({ ...song, file_path: songPath })
        return NextResponse.json({ msg: '上传成功',code: 200 }, { status: 200 })
      }catch(error:any){
        return NextResponse.json({ msg: error.message,code: 400 }, { status: 400 })
      }
    }
  }
}

// DELETE /api/songs?title="title" - 删除歌曲
export async function DELETE(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title')
  if (!title) {
    return NextResponse.json({ msg: '歌曲名不能为空',code: 400 }, { status: 400 })
  }
  // 获取歌曲信息
  const song = await db.getSong(title)
  if (!song) {
    return NextResponse.json({ msg: '歌曲不存在',code: 400 }, { status: 400 })
  } else {
    // 删除歌曲文件
    await deleteFile(song.file_path)
    // 删除歌曲信息
    await db.deleteSong(title)
    return NextResponse.json({ msg: '删除成功',code: 200 }, { status: 200 })
  }
}

// PUT /api/songs?title="title" - 更新歌曲
export async function PUT(request: NextRequest) {
  const formData = await request.formData()
  const song = {} as Song
  for (const [key, value] of formData.entries()) {
    // 使用类型断言确保 key 是 Song 类型的有效属性
    (song as { [key: string]: any })[key] = value
  }
  // 查询歌曲是否已经存在
  const songData = await db.getSong(song.song_title)
  if (!songData) {
    return NextResponse.json({ msg: '歌曲不存在',code: 400 }, { status: 400 })
  } else { // 存在歌曲更新歌曲信息
    await db.updateSong(song.song_title,song)
  }
}
