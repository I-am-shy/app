type Banner = {
  id: number
  image: string
  title: string
}

export default function Carousel({ banners }: { banners: Banner[] }) {
  return (
    <div className="carousel w-full h-full">
      {
        banners.map((banner,index,arr): React.ReactNode => (
          <div key={banner.id} id={`slide${banner.id}`} className="carousel-item relative w-full">
            <img src={banner.image} className="w-full h-full" />
            <div className="absolute bottom-5 right-5">
              <span className="text-gray-500 text-xl font-bold">{banner.title}</span>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${banners[index === 0 ? arr.length - 1 : index - 1].id}`} className="btn btn-circle bg-transparent ">❮</a>
              <a href={`#slide${banners[index === arr.length - 1 ? 0 : index + 1].id}`} className="btn btn-circle bg-transparent ">❯</a>
            </div>
          </div>
        ))
      }
    </div>
  )
}