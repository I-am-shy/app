"use client"

import { useEffect, useState } from "react";
interface ProgressProps {
  currentTime: string;
  totalTime: string;
}

export default function Progress({ currentTime, totalTime }: ProgressProps) {
function timeToDecimal(time:string) {
  const [minutes, seconds] = time.split(':').map(parseFloat);
  return Math.floor(minutes * 60 + seconds);
}
  const [currentVal,setCurrentVal] = useState(timeToDecimal(currentTime) /timeToDecimal(totalTime) * 100)
  useEffect(()=>{
    setCurrentVal(timeToDecimal(currentTime) /timeToDecimal(totalTime) * 100)
  },[currentTime])

  return (
    <div className="w-full flex items-center px-2">
      <span className="text-xs text-gray-500 w-8 text-right">{currentTime}</span>
      <div className="flex-1 mx-2 relative">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-red-500 rounded-full"
            style={{ width: `${currentVal}%` }}
          ></div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            style={{ left: `${currentVal}%` }}
          ></div>
        </div>
      </div>
      <span className="text-xs text-gray-500 w-8 text-left">{totalTime}</span>
    </div>
  )
}

