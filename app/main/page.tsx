"use client"

import { Suspense, useEffect, useState,useContext} from 'react';
import { songContext } from '../utils/songContext';
import Skeleton from '../components/Skeleton';
import Card from '../components/Card';
import Carousel from '../components/Carousel';


type Playlist = {
  id: number;
  title: string;
  image: string;
  count: string;
}
type Song = {
  song_id: number;
  file_path: string;
  song_artist: string;
  song_lyric: string;
  song_title: string;
}

export default function Home() {

  const banners = [
    { id: 1, image: '/default.png', title: '杨和苏KeyNG新歌' },
    { id: 2, image: '/_default.png', title: '新歌首发' },
    { id: 3, image: '/default.png', title: '热门推荐' },
  ];

  // const playList = [
  //   { id: 1, title: '每日歌曲推荐', image: '/default.png', count: '7' },
  //   { id: 2, title: '私人雷达', image: '/_default.png', count: '215亿' },
  //   { id: 3, title: '网易云热搜歌曲100%超级好听推荐', image: '/default.png', count: '1191万' },
  //   { id: 4, title: '华语流行100首，一人一首代表作', image: '/_default.png', count: '650万' },
  //   { id: 5, title: '90后回忆杀！这200首老歌每一都戳中泪点', image: '/default.png', count: '539万' },
  // ];

  const [playList, setPlayList] = useState<Playlist[]>([])
  const [playSong,setPlaySong ]= useContext(songContext)

  useEffect(() => {

    async function getSongInfo() {
      const res = await fetch('/api/songs')
      const data = await res.json()
      console.log(data);

      setPlayList(data.data.map((item: Song) => {
        return {
          id: item.song_id,
          title: item.song_title,
          image: "/default.png",
          count: 0
        }
      }))
    }
    getSongInfo()
  }, [])

  return (
    <div className="w-full">
      {/* 轮播图 */}

      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-8">
        <Suspense fallback={<Skeleton />}>
          <Carousel banners={banners} />
        </Suspense>
      </div>

      {/* 推荐歌单 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">推荐歌单</h2>
          <button className="text-sm text-gray-600 flex items-center">
            更多
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <Suspense fallback={
            // 骨架屏
            Array(5).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col">
                <Skeleton />
                <div className="h-4 bg-gray-200 rounded mt-2 w-3/4 animate-pulse"></div>
              </div>
            ))
          }>
            {/* 实际内容 */}
            {
              playList.map(async (playlist) => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return (
                  <Card playlist={playlist} setSong={setPlaySong} />
                )
              })
            }
          </Suspense>
        </div>
      </div>
    </div>
  );
}