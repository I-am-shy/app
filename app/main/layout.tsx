"use client"

import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";
import { drag } from "../utils/drag";


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
        <div className="win bg-base-200 " ref={winRef} draggable>{/* 拟桌面程序界面 */}
          {/* <input type="checkbox" value="dark" className="toggle theme-controller" /> */}
          <div className="left w-[15%] h-[100%] ">
            <Sidebar />
          </div>
          <div className="main w-[auto] h-[100%]">
            {children}
          </div>
          <div className="down absolute bottom-0 left-0">
            <Player />
          </div>
        </div>
      </div>
    </>
  );
}