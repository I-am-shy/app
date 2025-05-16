import { User, Song, Comment, Favorite, Announcement, Theme } from "./type"
import sqlite3 from "sqlite3"
const sqlite = sqlite3.verbose()

class Database {
  private db: sqlite3.Database
  private initialized: boolean = false
  constructor(dbName: string) {
    const dbPath = "./"+dbName+".db"
    this.db = new sqlite.Database(dbPath, (err) => {
      if (err) console.error('数据库连接失败：', err)
      else console.log('数据库连接成功')
    })

  }

  // 执行 SQL 的通用方法
  run(sql: string, params: any[] = []): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err: Error) {
        if (err) reject(err)
        else resolve(true)
      })
    })
  }

  // 查询单条数据
  get(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err)
        else resolve(row)
      })
    })
  }

  // 查询多条数据
  all(sql: string, params: any[] = []): Promise<any> {
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
    // console.log('用户表连接成功')
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
    // console.log('音乐表连接成功')
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
    // console.log('评论表连接成功')
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
    // console.log('收藏表连接成功')
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
    // console.log('公告表连接成功')
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
    // console.log('主题表连接成功')
  }

  // 初始化所有表
  async initTables() {
    if(!this.initialized){
      try {
        await this.createUserTable()
        await this.createSongTable()
        await this.createCommentTable()
        await this.createFavoriteTable()
        await this.createAnnouncementTable()
        await this.createThemeTable()
        // console.log('所有数据表初始化完成')
        this.initialized = true
      } catch (err) {
        console.error('数据表初始化失败：', err)
        throw err
      }
    }
  }

  // 获取用户列表
  async getUsers(): Promise<User[]> {
    return await this.all('SELECT * FROM users')
  }

  // 获取单个用户
  async getUser(name: string): Promise<User> {
    return await this.get('SELECT * FROM users WHERE name = ?', [name])
  }

  // 创建用户
  async createUser(user: User): Promise<boolean> {
    const existingUser = await this.get('SELECT * FROM users WHERE name = ?', [user.name])
    if (existingUser) {
      throw new Error('用户名已存在')
    }

    return await this.run('INSERT INTO users (name, role, username, password, avatar, info) VALUES (?, ?, ?, ?, ?, ?)', [user.name, user.role, user.username, user.password, user.avatar, user.info])
  }

  // 更新用户
  async updateUser(name: string, user: User):Promise<boolean> {
    const existingUser = await this.get('SELECT * FROM users WHERE name = ?', [name])
    if (!existingUser) {
      throw new Error('用户不存在')
    }
    return await this.run('UPDATE users SET name = ?, role = ?, username = ?, password = ?, avatar = ?, info = ? WHERE name = ?', [user.name, user.role, user.username, user.password, user.avatar, user.info, name])
  }

  // 删除用户
  async deleteUser(name: string):Promise<boolean> {
    return await this.run('DELETE FROM users WHERE name = ?', [name])
  }

  // 获取歌曲列表
  async getSongs(): Promise<Song[]> {
    return await this.all('SELECT * FROM songs')
  }

  // 获取单个歌曲
  async getSong(title: string): Promise<Song> {
    return await this.get('SELECT * FROM songs WHERE song_title = ?', [title])
  }
  async getSongById(song_id: number): Promise<Song> {
    return await this.get('SELECT * FROM songs WHERE song_id = ?', [song_id])
  }

  // 新增歌曲
  async createSong(song: Song) {
    const existingSong = await this.get('SELECT * FROM songs WHERE song_title = ? AND song_artist = ?', [song.song_title,song.song_artist])
    if (existingSong) {
      throw new Error('歌曲已存在')
    }
    return await this.run('INSERT INTO songs (song_title, song_artist, song_lyric, file_path) VALUES (?, ?, ?, ?)', [song.song_title, song.song_artist, song.song_lyric, song.file_path])
  }

  // 更新歌曲
  async updateSong(title: string, song: Song) {
    const existingSong = await this.get('SELECT * FROM songs WHERE song_title = ? AND song_artist = ?', [song.song_title,song.song_artist])
    if (!existingSong) {
      throw new Error('歌曲不存在')
    }
    return await this.run('UPDATE songs SET song_title = ?, song_artist = ?, song_lyric = ?, file_path = ? WHERE song_title = ? AND song_artist = ?', [song.song_title, song.song_artist, song.song_lyric, song.file_path, title,song.song_artist])
  }

  // 删除歌曲
  async deleteSong(title: string) {
    return await this.run('DELETE FROM songs WHERE song_title = ?', [title])
  }

  // 获取歌曲的评论列表
  async getComments(song_id: number): Promise<Comment[]> {
    return await this.all('SELECT * FROM comments WHERE song_id = ?', [song_id])
  }

  // 创建评论
  async createComment(comment: Comment) {
    return await this.run('INSERT INTO comments (user_id, song_id, content) VALUES (?, ?, ?)', [comment.user_id, comment.song_id, comment.content])
  }

  // 删除评论(根据评论id,页面上需要保留评论id)
  async deleteComment(comment_id: number) {
    return await this.run('DELETE FROM comments WHERE comment_id = ?', [comment_id])
  }

  // 获取收藏列表
  async getFavorites(user_id: number): Promise<Favorite[]> {
    return await this.all('SELECT * FROM favorites WHERE user_id = ?', [user_id])
  }

  // 创建收藏
  async createFavorite(favorite: Favorite) {
    const existingFavorite = await this.get('SELECT * FROM favorites WHERE user_id = ? AND song_id = ?', [favorite.user_id, favorite.song_id])
    if (existingFavorite) {
      throw new Error('收藏已存在')
    }
    return await this.run('INSERT INTO favorites (user_id, song_id) VALUES (?, ?)', [favorite.user_id, favorite.song_id])
  }

  // 删除收藏
  async deleteFavorite(user_id: number, song_id: number) {
    return await this.run('DELETE FROM favorites WHERE user_id = ? AND song_id = ?', [user_id, song_id])
  }

  // 获取公告列表
  async getAnnouncements(): Promise<Announcement[]> {
    return await this.all('SELECT * FROM announcements')
  }

  // 创建公告
  async createAnnouncement(announcement: Announcement) {
    return await this.run('INSERT INTO announcements (title, content) VALUES (?, ?)', [announcement.title, announcement.content])
  }

  // 更新公告
  async updateAnnouncement(old_title: string, announcement: Announcement) {
    const existingAnnouncement = await this.get('SELECT * FROM announcements WHERE title = ?', [old_title])
    if (!existingAnnouncement) {
      throw new Error('公告不存在')
    }
    return await this.run('UPDATE announcements SET title = ?, content = ? WHERE title = ?', [announcement.title, announcement.content, old_title])
  }

  // 删除公告
  async deleteAnnouncement(title: string) {
    return await this.run('DELETE FROM announcements WHERE title = ?', [title])
  }

  // 获取主题列表
  async getThemes(): Promise<Theme[]> {
    return await this.all('SELECT * FROM themes')
  }

  // 创建主题
  async createTheme(theme: Theme) {
    const existingTheme = await this.get('SELECT * FROM themes WHERE name = ?', [theme.name])
    if (existingTheme) {
      throw new Error('主题已存在')
    }
    return await this.run('INSERT INTO themes (name, description) VALUES (?, ?)', [theme.name, theme.description])
  }
  // 更新主题
  async updateTheme(old_theme_name: string, theme: Theme) {
    const existingTheme = await this.get('SELECT * FROM themes WHERE name = ?', [old_theme_name])
    if (!existingTheme) {
      throw new Error('主题不存在')
    }
    return await this.run('UPDATE themes SET name = ?, description = ? WHERE name = ?', [theme.name, theme.description, old_theme_name])
  }

  // 删除主题
  async deleteTheme(theme_name: string) {
    return await this.run('DELETE FROM themes WHERE name = ?', [theme_name])
  }

  // 关闭数据库连接
  close() {
    return new Promise<void>((resolve, reject) => {
      this.db.close(err => {
        if (err) reject(err)
        else resolve()
      })
    })
  }
}

export default Database
