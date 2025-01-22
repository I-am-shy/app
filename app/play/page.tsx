export default function PlayPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* 左侧封面 */}
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-200 rounded-lg">
            {/* 封面图片 */}
          </div>
        </div>

        {/* 右侧信息 */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">歌曲名称</h1>
          <p className="text-gray-600 mb-6">歌手名称</p>
          
          {/* 歌词展示 */}
          <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded">
            {/* 歌词内容 */}
          </div>
        </div>
      </div>
    </div>
  );
}