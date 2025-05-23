import { createContext } from "react";

// 当前播放的歌曲名
export const songContext = createContext<any>([])

// 播放器的时间
export const SongTimeContext = createContext<any>({})