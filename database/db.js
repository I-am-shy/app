const sqlite3 = require("sqlite3").verbose()


// sql语句
const sql_createTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    role TEXT,
    username TEXT,
    password TEXT
  )
`
const sql_insertData = `
  INSERT INTO users (name, role, username, password) VALUES (?, ?, ?, ?)
`
const sql_selectAllData = `
  SELECT * FROM users
`
const sql_selectData = `
  SELECT * FROM users WHERE name = ?
`
const sql_updateData = `
  UPDATE users SET name = ?, role = ?, username = ?, password = ? WHERE name = ?
`
const sql_deleteData = `
  DELETE FROM users WHERE name = ?
`
const sql_deleteTable = `
  DROP TABLE IF EXISTS users
`


// 创建数据表
const createTable = spl=>{
  db.run(spl,err=>{
    if(err){
      console.log(err)
    }else{
      console.log("数据表创建成功")
    }
  })
}

// 插入数据
const insertData = (spl,data)=>{
  db.run(spl,data,err=>{
    if(err){
      console.log(err)
    }else{
      console.log("数据插入成功")
    }
  })
}

// 查询数据
const selectData = (spl,name)=>{
  db.all(spl,name,(err,rows)=>{
    if(err){
      console.log(err)
    }else{
      console.log(rows)
    }
  })
}

// 查询所有数据
const selectAllData = (spl)=>{
  db.all(spl,(err,rows)=>{
    if(err){
      console.log(err)
    }else{
      console.log(rows)
    }
  })
}

// 更新数据
const updateData = (spl,name,data)=>{
  db.run(spl,[...data,name],err=>{
    if(err){
      console.log(err)
    }else{
      console.log("数据更新成功")
    }
  })
}

// 删除数据
const deleteData = (spl,name)=>{
  db.run(spl,name,err=>{
    if(err){
      console.log(err)
    }else{
      console.log("数据删除成功")
    }
  })
}

// 删除数据表
const deleteTable = (spl)=>{
  db.run(spl,err=>{
    if(err){
      console.log(err)
    }else{
      console.log("数据表删除成功")
    }
  })
}


// 连接和操作数据库
const db = new sqlite3.Database("./users.db",err=>{
  if(err){
    console.log(err)
  }else{
    console.log("数据库连接成功")
  }
})

createTable(sql_createTable)
// insertData(sql_insertData,["shy","系统管理员","admin","123456"])
// updateData(sql_updateData,"shy",["shy","系统管理员","admin","111111"])
selectAllData(sql_selectAllData)
// deleteData(sql_deleteData,"shy")
// deleteTable(sql_deleteTable)

