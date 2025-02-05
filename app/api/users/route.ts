import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'
import { uploadFile, deleteFile } from '@/app/utils/flieUpload'

// GET /api/users - 获取用户列表
// GET /api/users?name="name" - 获取单个用户
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name')
  const data = name ? await db.getUser(name) : await db.getUsers()
  if(data){
    return NextResponse.json({ data,code: 200 },{status: 200})
  }
  else{
    return NextResponse.json({ msg: "用户不存在",code: 400 }, { status: 400 })
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  let avatar : string | undefined
  try {
    const formData = await request.formData()
    const user:any = {}
    for (const [key, value] of formData.entries()) {
      user[key] = value
    }
    if(user.avatar){
      avatar = await uploadFile(user.avatar,"avatar")
    }else{
      avatar = "/user.svg"
    }
    const data = await db.createUser({...user,avatar})
    if (data === true) {
      return NextResponse.json({ msg: '创建用户成功',code: 200 }, { status: 200 })
    } else {
      return NextResponse.json({ msg: data,code: 500 }, { status: 500 })
    }
  } catch (error:any) {
    // 创建失败了,删除文件
    if(avatar){
      await deleteFile(avatar)
    }
    return NextResponse.json({ msg: error.message,code: 400 }, { status: 400 })
  }
}

// PUT /api/users?name="name" - 更新用户信息,传递要修改的信息即可
export async function PUT(request: NextRequest) {
  const updateUser:any = {}
  try {
    const name = request.nextUrl.searchParams.get('name')
    if (!name) {
      return NextResponse.json({ msg: '用户名不能为空',code: 400 }, { status: 400 })
    }
    // 判断出要修改的属性
    const user = await db.getUser(name) // 获取旧用户信息
    const formData = await request.formData() // 获取要修改的信息
    
    for (const [key, value] of formData.entries()) {
      updateUser[key] = value
    }

    if(updateUser.avatar){// 如果传递了avatar，则上传文件
      const avatar = await uploadFile(updateUser.avatar,"avatar")
      updateUser.avatar = avatar
    }
    const data = await db.updateUser(name, { ...user, ...updateUser })
    if (data === true) {
      return NextResponse.json({ msg: '更新用户成功',code: 200 }, { status: 200 })
    } else {
      return NextResponse.json({ msg: data,code: 500 }, { status: 500 })
    }
  } catch (error:any) {
    // 更新失败了，有上传文件，删除文件
    if(updateUser.avatar){
      await deleteFile(updateUser.avatar)
    }
    return NextResponse.json({ msg: error.message,code: 400 }, { status: 400 })
  }
}

// DELETE /api/users?name="name" - 删除用户
export async function DELETE(request: NextRequest) {

  const name = request.nextUrl.searchParams.get('name')
  if (!name) {
    return NextResponse.json({ msg: '用户名不能为空',code: 400 }, { status: 400 })
  }
  const user = await db.getUser(name)
  if(user.role === "admin"){
    return NextResponse.json({ msg: '管理员不能删除',code: 400 }, { status: 400 })
  }
  const data = await db.deleteUser(name)// 删除用户
  if (data === true ) {
    if(user.avatar){
      await deleteFile(user.avatar)// 删除服务端文件数据
    }
    return NextResponse.json({ msg: '删除用户成功',code: 200 }, { status: 200 })
  } else {
    return NextResponse.json({ msg: data,code: 500 }, { status: 500 })
  }

}
