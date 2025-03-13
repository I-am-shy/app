"use client"

import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Player from "./Player";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null) //使用断言解决ref为null的报错
  const winRef = useRef<HTMLDivElement>(null) //使用断言解决ref为null的报错

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.addEventListener("dragover", (e) => {
        e.preventDefault()
      });
    }
    if (winRef.current) {
      // 记录鼠标移动的距离
      let moveX = 0;
      let moveY = 0;
      winRef.current.addEventListener("dragstart", (e) => {
        const current = winRef.current as HTMLElement;
        if (current) {
          moveX = e.clientX - current.offsetLeft;
          moveY = e.clientY - current.offsetTop;
        }
      });
      winRef.current.addEventListener("drag", (e) => {
        const target = e.target as HTMLElement;
        if (target) {
          target.style.cursor = "move";
          target.style.opacity = "0";
          target.style.position = "absolute";
          target.style.left = `${e.clientX - moveX}px`;
          target.style.top = `${e.clientY - moveY}px`;
        }
      });
      winRef.current.addEventListener("dragend", (e) => {
        const target = e.target as HTMLElement;
        if (target) {
          target.style.cursor = "default";
          target.style.opacity = "1";
        }
      });
    }
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