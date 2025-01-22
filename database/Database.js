const sqlite3 = require('sqlite3').verbose()
const path = require('path')

class Database {
  constructor(dbName) {
    const dbPath = path.join(__dirname, dbName + '.db')
    this.db = new sqlite3.Database(dbPath, err => {
      if (err) console.error('数据库连接失败：', err)
      else console.log('数据库连接成功')
    })
  }

  // 执行 SQL 的通用方法
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err)
        else resolve(this.lastID)
      })
    })
  }

  // 查询单条数据
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  }

  // 查询多条数据
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  }

  // 创建用户表
  async createUserTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        role TEXT,
        username TEXT,
        password TEXT,
        avatar TEXT,
        info TEXT
      )
    `
    await this.run(sql)
    console.log('用户表创建成功')
  }

  // 创建音乐表
  async createSongTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS songs (
        song_id INTEGER PRIMARY KEY AUTOINCREMENT,
        song_title TEXT,
        song_artist TEXT,
        song_lyric TEXT,
        file_path TEXT
      )
    `
    await this.run(sql)
    console.log('音乐表创建成功')
  }

  // 创建评论表
  async createCommentTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS comments (
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        song_id INTEGER,
        comment_content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (song_id) REFERENCES songs(song_id)
      )
    `
    await this.run(sql)
    console.log('评论表创建成功')
  }

  // 创建收藏表
  async createFavoriteTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS favorites (
        user_id INTEGER,
        song_id INTEGER,
        PRIMARY KEY (user_id, song_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (song_id) REFERENCES songs(song_id)
      )
    `
    await this.run(sql)
    console.log('收藏表创建成功')
  }

  // 创建公告表
  async createAnnouncementTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS announcements (
        announcement_id INTEGER PRIMARY KEY AUTOINCREMENT,
        announcement_title TEXT,
        announcement_content TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `
    await this.run(sql)
    console.log('公告表创建成功')
  }

  // 创建主题表
  async createThemeTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS themes (
        theme_name TEXT PRIMARY KEY,
        description TEXT
      )
    `
    await this.run(sql)
    console.log('主题表创建成功')
  }

  // 初始化所有表
  async initTables() {
    try {
      await this.createUserTable()
      await this.createSongTable()
      await this.createCommentTable()
      await this.createFavoriteTable()
      await this.createAnnouncementTable()
      await this.createThemeTable()
      console.log('所有数据表初始化完成')
    } catch (err) {
      console.error('数据表初始化失败：', err)
      throw err
    }
  }

  // 关闭数据库连接
  close() {
    return new Promise((resolve, reject) => {
      this.db.close(err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}

module.exports = Database

// 创建数据库实例
// const db = new Database('music_app')

// 初始化所有表
// db.initTables()

// 插入一些数据
// db.run('INSERT INTO users (name, role, username, password, avatar, info) VALUES (?, ?, ?, ?, ?, ?)', ['admin', 'admin', 'admin', 'admin', 'admin', 'admin'])
// db.run('INSERT INTO songs (song_title, song_artist, song_lyric, file_path) VALUES (?, ?, ?, ?)', ['song1', 'artist1', 'lyric1', 'path1'])
// db.run('INSERT INTO comments (user_id, song_id, comment_content) VALUES (?, ?, ?)', [1, 1, 'comment1'])
// db.run('INSERT INTO favorites (user_id, song_id) VALUES (?, ?)', [1, 1])
// db.run('INSERT INTO announcements (announcement_title, announcement_content) VALUES (?, ?)', ['announcement1', 'content1'])
// db.run('INSERT INTO themes (theme_name, description) VALUES (?, ?)', ['theme1', 'description1'])

// // 查询数据
// async function queryData() {
//   const users = db.all('SELECT * FROM users')
//   const songs = db.all('SELECT * FROM songs')
//   const comments = db.all('SELECT * FROM comments')
//   const favorites = db.all('SELECT * FROM favorites')
//   const announcements = db.all('SELECT * FROM announcements')
//   const themes = db.all('SELECT * FROM themes')
//   console.log(await users)
//   console.log(await songs)
//   console.log(await comments)
//   console.log(await favorites)
//   console.log(await announcements)
//   console.log(await themes)

// }

// queryData()