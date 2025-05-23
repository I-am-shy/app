'use client';

import { useState, useRef } from 'react';

interface MusicForm {
  title: string;
  artist: string;
  lyrics: string;
}

export default function SharePage() {
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [form, setForm] = useState<MusicForm>({
    title: '',
    artist: '',
    lyrics: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleMusicSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setMusicFile(file);
    } else {
      alert('请选择有效的音频文件');
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('请选择有效的图片文件');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!musicFile) {
      alert('请选择音乐文件');
      return;
    }

    setIsUploading(true);
    try {
      // TODO: 实现文件上传和表单提交逻辑
      console.log('Form Data:', {
        music: musicFile,
        cover: coverFile,
        ...form
      });
      const formData = new FormData();
      formData.append('file_path', musicFile);
      formData.append('song_title', form.title);
      formData.append('song_artist', form.artist);
      formData.append('song_lyric', form.lyrics);
      // 模拟上传延迟
      // await new Promise(resolve => setTimeout(resolve, 1500));
      const res = await fetch("/api/songs",{
        method:"POST",
        body: formData,
      })
      const data = await res.json();
      alert(data.msg);
      // 重置表单
      setMusicFile(null);
      setCoverFile(null);
      setCoverPreview('');
      setForm({
        title: '',
        artist: '',
        lyrics: '',
      });
      if (musicInputRef.current) musicInputRef.current.value = '';
      if (coverInputRef.current) coverInputRef.current.value = '';
    } catch (error) {
      alert('上传失败，请重试');
    } finally {
      setIsUploading(false);
    }
  };

  async function getLrc(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(form.title !==''){
      const res = await fetch(`https://www.hhlqilongzhu.cn/api/dg_geci.php?msg=${decodeURIComponent(form.title)}&n=1&type=json`)
      const data = await res.text();
      // console.log(form.title,data);
      setForm((val)=>{
        return {
          ...val,
          lyrics: data.split("\n").toSpliced(0,5).join("\n")
        }
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">分享音乐</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 音乐文件上传 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            音乐文件
          </label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => musicInputRef.current?.click()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              选择文件
            </button>
            <span className="text-sm text-gray-500">
              {musicFile ? musicFile.name : '未选择文件'}
            </span>
          </div>
          <input
            ref={musicInputRef}
            type="file"
            accept="audio/*"
            onChange={handleMusicSelect}
            className="hidden"
          />
        </div>

        {/* 封面图片上传 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            封面图片
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              选择封面
            </button>
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverSelect}
            className="hidden"
          />
        </div>

        {/* 音乐信息表单 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              歌曲名称
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              歌手名称
            </label>
            <input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1">
              歌词
            </label>
            <button className='btn ml-10' onClick={getLrc}>获取歌词</button>
            <textarea
              name="lyrics"
              value={form.lyrics}
              onChange={handleFormChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="请输入歌词，每行一句"
            />
          </div>
        </div>

        {/* 提交按钮 */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading}
            className={`px-6 py-2 bg-red-500 text-white rounded-lg ${
              isUploading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-red-600 transition-colors'
            }`}
          >
            {isUploading ? '上传中...' : '分享音乐'}
          </button>
        </div>
      </form>
    </div>
  );
}
