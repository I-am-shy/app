"use client"

import { useEffect, useRef, useState, useContext } from "react";
import { songContext, SongTimeContext } from "../utils/songContext";
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
  const mainRef = useRef<HTMLDivElement>(null)
  const winRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    drag(winRef.current as HTMLElement, mainRef.current as HTMLElement)
  }, [])

  const [playSong, setPlaySong] = useState("")
  const [songTime, setSongTime] = useState({})
  function getSongTime(currentTime: string, totalTime: string) {
    setSongTime({
      currentTime: currentTime,
      totalTime: totalTime,
    })
  }

  return (
    <songContext.Provider value={[playSong, setPlaySong]}>
      <div className="flex justify-center items-center h-screen bg-base-100" ref={mainRef}>
        <div className="win bg-base-200 rounded-lg shadow-xl flex flex-col w-[90%] h-[90%] mb-10" ref={winRef}>
          <div className="win-header h-10 bg-gray-100 flex items-center border-b px-2 py-2">
            <Bot />
            <Input />
          </div>

          <div className="flex-1 flex min-h-0">
            <div className="w-[200px] border-r flex-shrink-0">
              <Sidebar />
            </div>

            <SongTimeContext.Provider value={songTime}>
              <div className="main-content flex-1 p-4 overflow-y-auto">
                {children}
              </div>
            </SongTimeContext.Provider>
          </div>

          <div className="flex-shrink-0 border-t">
            <Player getSongTime={getSongTime} />
          </div>
        </div>
      </div>
    </songContext.Provider>
  );
}