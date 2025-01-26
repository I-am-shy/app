"use client"
import { useEffect, useState } from "react"
import { User } from "@/app/lib/type"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  // 获取后端数据
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const usersData = await res.json()
      console.log(usersData)
      setUsers(usersData.data)
    }

    fetchUsers()
  }, [])
  return (
    <div>
      <h1>用户管理</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>昵称</th>
              <th>用户</th>
              <th>用户名</th>
              <th>个性签名</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user=>{
                return ( 
                <tr key={user.name}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="ring rounded-full w-10">
                          <img src={user.avatar} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge">{user.role}</span>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.info}</td>
                  <td>
                    <button className="btn btn-sm">编辑</button>
                  </td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}