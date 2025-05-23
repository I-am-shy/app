"use client"

import { Song } from "@/app/lib/type";
import { useEffect, useState } from "react";

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([])
  useEffect(() => {
    const fetchSongs = async () => {
      const res = await fetch('/api/songs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data)

      setSongs(data.data)
    }
    fetchSongs()
  }, [])

  async function delSong(title: string) {
    const res = await fetch(`/api/songs?title=${title}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    console.log(data)
    if(data.code === 200) {
      setSongs(songs.filter(song => song.song_title !== title)) 
    }
    alert(data.msg)
  }

  return (
    <>
      <div>
        <h1>音乐管理</h1>
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
                <th>音乐封面</th>
                <th>音乐名称</th>
                <th>歌手</th>
                <th>音乐信息</th>
                <th>音乐文件</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {
                songs.map(song => {
                  return (
                    <tr key={song.song_title}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="avatar">
                          <div className="ring rounded-full w-10">
                            <img />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="font-bold">{song.song_title}</div>
                        </div>
                      </td>
                      <td>
                        <div>{song.song_artist}</div>
                      </td>
                      <td>
                        <div>{song.song_lyric}</div>
                      </td>
                      <td>
                        <div>{song.file_path}</div>
                      </td>
                      <td>
                        <button className="btn btn-sm" onClick={()=>{delSong(song.song_title)}}>删除</button>
                      </td>
                    </tr>)
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}