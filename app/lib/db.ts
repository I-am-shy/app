import Database from './Database'

// 创建单例数据库连接
const db = new Database('music_app')

// 初始化数据库表
db.initTables().catch(console.error)

export default db