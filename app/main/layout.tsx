"use client"

import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { drag } from "../utils/drag";
import Input from "../components/Input";
import Bot from "../components/Bot";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null) //使用断言解决ref为null的报错
  const winRef = useRef<HTMLDivElement>(null) //使用断言解决ref为null的报错

  useEffect(() => {
    drag(winRef.current as HTMLElement, mainRef.current as HTMLElement)
  }, [])

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-base-100" ref={mainRef} >
        <div className="win bg-base-200 rounded-lg shadow-xl flex flex-col  w-[90%] h-[90%] mb-10 overflow-auto" ref={winRef} draggable>{/* 拟桌面程序界面 */}
          <div className="win-header h-10 bg-gray-100 flex items-center  border-b px-2 py-2">
            <Bot />
            <Input />
          </div>
          
          <div className="win-content flex flex-1 h-full">
            <div className="left w-[200px] h-full border-r">
              <Sidebar />
            </div>
            <div className="main flex-1 h-full overflow-y-auto p-4">
              {children}
            </div>
          </div>
          
          <div className="win-footer bg-white border-t  px-2">
            <Player />
          </div>
        </div>
      </div>
    </>
  );
}