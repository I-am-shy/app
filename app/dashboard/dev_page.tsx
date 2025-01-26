"use client"
import { useEffect } from "react";


// 测试后端接口
export default function DashboardPage() {
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)
    }

    fetchUsers()
  }, [])

  const createUser = async (file: File) => {
    console.log(file)
    const formData = new FormData()
    formData.append("avatar", file)
    formData.append("name", 'tom')
    formData.append("role", 'user')
    formData.append("username", 'tom')
    formData.append("password", '123456')
    formData.append("info", '用户')
    const res = await fetch('/api/users', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    console.log(data)
  }
  const deleteUser = async (name: string) => {
    const res = await fetch(`/api/users?name=${name}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    console.log(data)
  }
  const updateUser = async (name: string, updateUser: any) => {
    const formData = new FormData()
    for (const key in updateUser) {
      formData.append(key, updateUser[key])
    }
    const res = await fetch(`/api/users?name=${name}`, {
      method: 'PUT',
      body: formData
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">控制台</h1>
      <input type="file" placeholder="头像" id="file" />
      <button onClick={async () => {
        const file = document.getElementById('file') as HTMLInputElement
        if (file.files) {
          await createUser(file.files[0])
        }
      }}>创建用户</button>
      <button onClick={async () => {
        await deleteUser('tom')
      }}>删除用户</button>
      <button onClick={async () => {
        const file = document.getElementById('file') as HTMLInputElement
        if (file.files && file.files[0]) {
          await updateUser('shy', {
            password: '123',
            info: Date.now().toString(),
            avatar: file.files[0]
          })
        }else{
          await updateUser('shy', {
            password: '123',
            info: 'newInfo',
          })
        }
      }}>更新用户</button>
    </div>
  );
}