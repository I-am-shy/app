const express = require('express')
const cors = require('cors')
const Database = require('./Database')
const app = express()
const port = process.env.PORT || 3000

// 初始化数据库
const db = new Database('music_app')

// 中间件
app.use(cors())
app.use(express.json())

// 用户相关路由
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, username, password, role = 'user' } = req.body
    const result = await db.run(
      'INSERT INTO users (name, username, password, role) VALUES (?, ?, ?, ?)',
      [name, username, password, role]
    )
    res.json({ success: true, userId: result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 音乐相关路由
app.get('/api/songs', async (req, res) => {
  try {
    const songs = await db.all('SELECT * FROM songs')
    res.json({ success: true, data: songs })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 评论相关路由
app.post('/api/comments', async (req, res) => {
  try {
    const { userId, songId, content } = req.body
    const result = await db.run(
      'INSERT INTO comments (user_id, song_id, comment_content) VALUES (?, ?, ?)',
      [userId, songId, content]
    )
    res.json({ success: true, commentId: result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 收藏相关路由
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, songId } = req.body
    await db.run(
      'INSERT INTO favorites (user_id, song_id) VALUES (?, ?)',
      [userId, songId]
    )
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 公告相关路由
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await db.all('SELECT * FROM announcements ORDER BY created_at DESC')
    res.json({ success: true, data: announcements })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`)
})

// 优雅关闭
process.on('SIGINT', async () => {
  await db.close()
  console.log('服务器已关闭')
  process.exit()
}) 