"use client"
import { useState, useEffect } from "react";


export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      console.log(data);
      setAnnouncements(data.data);
    };
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h1>公告管理</h1>
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
                <th>标题</th>
                <th>内容</th>
                <th>操作</th>
                <th>最后修改时间</th>
              </tr>
            </thead>
            <tbody>
              {
                announcements.map(announcement => {
                  return (
                    <tr key={announcement.announcement_id}>
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
                          <div className="font-bold">{announcement.announcement_title}</div>
                        </div>
                      </td>
                      <td>
                        <div>{announcement.announcement_content}</div>
                      </td>
                      <td>
                        <div>{announcement.created_at}</div>
                      </td>
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

