"use client"
import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api?table=users', {
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">控制台</h1>
    </div>
  );
}