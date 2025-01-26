import Database from './Database'
import { data } from './dev_data'

async function debugDatabase() {
  const db = new Database('music_app')

  try {
    // 测试数据库连接
    console.log('开始数据库调试...')

    // 测试创建表

    await db.initTables()
    console.log('✅ 数据表初始化成功')

    // 测试插入数据

    if(data.users.length>0){
      db.run('INSERT INTO users (name, role, username, password, avatar, info) VALUES (?, ?, ?, ?, ?, ?)', data.users)    
    }

    if(data.songs.length>0){
      const songsCount = await db.get('SELECT COUNT(*) as count FROM songs')
      if (songsCount.count === 0) {
        db.run('INSERT INTO songs (song_title, song_artist, song_lyric, file_path) VALUES (?, ?, ?, ?)', data.songs)
      }
    }

    if(data.comments.length>0){

      const commentsCount = await db.get('SELECT COUNT(*) as count FROM comments')
      if (commentsCount.count === 0) {
        db.run('INSERT INTO comments (user_id, song_id, comment_content) VALUES (?, ?, ?)', data.comments)
      }
    }

    if(data.favorites.length>0){

      const favoritesCount = await db.get('SELECT COUNT(*) as count FROM favorites')
      if (favoritesCount.count === 0) {
        db.run('INSERT INTO favorites (user_id, song_id) VALUES (?, ?)', data.favorites)
      }
    }

    if(data.announcements.length>0){

      const announcementsCount = await db.get('SELECT COUNT(*) as count FROM announcements')
      if (announcementsCount.count === 0) {
        db.run('INSERT INTO announcements (announcement_title, announcement_content) VALUES (?, ?)', data.announcements)
      }
    }

    if(data.themes.length>0){

      const themesCount = await db.get('SELECT COUNT(*) as count FROM themes')
      if (themesCount.count === 0) {
        db.run('INSERT INTO themes (theme_name, description) VALUES (?, ?)', data.themes)
      }
    }

    // 测试删除数据
    // await db.run('DELETE FROM users WHERE name = ?', ['tom'])
    // console.log("✅ 删除成功")

    console.log('✅ 数据已准备')

    // 测试查询数据
    const users = db.all('SELECT * FROM users')
    const songs = db.all('SELECT * FROM songs')
    const comments = db.all('SELECT * FROM comments')
    const favorites = db.all('SELECT * FROM favorites')
    const announcements = db.all('SELECT * FROM announcements')
    const themes = db.all('SELECT * FROM themes')

    console.log('✅ 查询结果:', await users, await songs, await comments, await favorites, await announcements, await themes)


  } catch (error) {
    console.error('❌ 数据库调试出错:', error)
  } finally {
    await db.close()
    console.log('数据库连接已关闭')
  }
}

// 运行调试
debugDatabase().catch(console.error)