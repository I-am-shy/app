

type ProgressProps = {
  currentTime?: string;
  totalTime?: string;
}


export default function Progress({ currentTime, totalTime }: ProgressProps) {
  if (!currentTime) {
    currentTime = "00:00";
  }
  if (!totalTime) {
    totalTime = "00:00";
  }
  const currentVal = parseInt(Number(currentTime) / Number(totalTime) * 100+"")


  return (
    <div className="w-full min-w-16 flex items-center after:">
      <span className="text-xs text-gray-500 w-10 text-right mr-2">{currentTime}</span>
      <div className="flex-1 relative w-full min-w-16 h-1 bg-gray-200 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-red-500 rounded-full"
          style={{ width: `${currentVal}%` }}
        ></div>
        <div className={`absolute left-[${currentVal}%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-red-500 cursor-pointer`}></div>
      </div>
      <span className="text-xs text-gray-500 w-10 text-left ml-2">{totalTime}</span>
    </div>
  )
}

