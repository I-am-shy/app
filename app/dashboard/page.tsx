"use client"

import { useState, useEffect } from "react";

export default function DashboardPage() {
  // 渲染数据源
  const [data, setData] = useState([
    {
      name: '总用户数',
      value: 0,
    },
    {
      name: '歌曲数据',
      value: 0,
    },
    {
      name: '总评论数',
      value: 0,
    },
    {
      name: '最新公告',
      value: "公告",
    },
  ]);
  // 获取后端数据
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const userData = await res.json()
      console.log(userData)
      setData((oldData)=>{
        oldData[0].value = userData.data.length
        return [...oldData]
      }) 
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">控制台</h1>

      {/* 统计卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {
          data.map(item => {
            return (<div key={item.name} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-gray-500">{item.name}</h3>
              <p className="text-2xl font-semibold">{item.value}</p>
            </div>)
          })
        }
      </div>


      {/* 数据列表区域 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">最近活动</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center p-4 border-b">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-medium">活动标题 {item}</h4>
                <p className="text-gray-500 text-sm">活动描述内容</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}