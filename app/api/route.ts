import { NextRequest, NextResponse } from 'next/server'
import db from '@/app/lib/db'

export async function GET(request: NextRequest) {
  try {
    // 获取请求路径和参数
    const { searchParams } = new URL(request.url)
    const table = searchParams.get('table')
    const id = searchParams.get('id')

    if (!table) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    let data
    if (id) {
      data = await db.get(`SELECT * FROM ${table} WHERE ${table}_id = ?`, [id])
    } else {
      data = await db.all(`SELECT * FROM ${table}`)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('GET 请求错误:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { table, data } = await request.json()

    if (!table || !data) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    // 构建插入语句
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map(() => '?').join(', ')
    const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`

    const id = await db.run(sql, values)
    return NextResponse.json({ id })
  } catch (error) {
    console.error('POST 请求错误:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { table, id, data } = await request.json()

    if (!table || !id || !data) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    // 构建更新语句
    const updates = Object.entries(data)
      .map(([key]) => `${key} = ?`)
      .join(', ')
    const values = [...Object.values(data), id]
    const sql = `UPDATE ${table} SET ${updates} WHERE ${table}_id = ?`

    await db.run(sql, values)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT 请求错误:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const table = searchParams.get('table')
    const id = searchParams.get('id')

    if (!table || !id) {
      return NextResponse.json({ error: '缺少必要参数' }, { status: 400 })
    }

    await db.run(`DELETE FROM ${table} WHERE ${table}_id = ?`, [id])
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE 请求错误:', error)
    return NextResponse.json({ error: '服务器错误' }, { status: 500 })
  }
}
