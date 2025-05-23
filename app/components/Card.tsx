
type Playlist = {
  id: number;
  title: string;
  image: string;
  count: string;
}

export default function Card({ playlist,setSong }: { playlist: Playlist,setSong:any }) {

  function play(){
    setSong(playlist.title)
  }


  return (
    <div key={playlist.id} className="group cursor-pointer">
      <div className="relative rounded-lg overflow-hidden mb-2">
        <img src={playlist.image} alt={playlist.title} className="w-full aspect-square object-cover" />
        <div className="absolute top-2 right-2 text-xs text-white bg-black bg-opacity-50 px-1 rounded">
          {playlist.count}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button onClick={play} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-sm line-clamp-2">{playlist.title}</p>
    </div>
  )
}