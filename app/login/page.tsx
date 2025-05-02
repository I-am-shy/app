'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    username: string;
    password: string;
    confirmPassword: string;
    avatar: File|undefined
    info: string;
  }>({
    name: '',
    role: 'user',
    username: '',
    password: '',
    confirmPassword: '',
    avatar: undefined,
    info: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // TODO: 实现登录/注册逻辑

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };




  const handleLogin = async () => {
    // 登录逻辑，发送请求到/api/auth，登录成功后生成token存放到cookie中

    const response = await fetch('/api/auth',{
      method: 'POST',
      body: JSON.stringify({name:formData.name,password:formData.password}),
    });
    const data = await response.json();
    if(data.code === 200){
      router.push('/main');
    }
    else{
      alert(data.msg);
    }
  }

  const handleRegister = async () => {
    // 注册逻辑
    if (formData.password !== formData.confirmPassword) {
      alert('两次输入的密码不一致');
      return;
    }
    console.log(formData)
    const form = new FormData();
    form.append("name",formData.name);
    form.append("role",formData.role);
    form.append("username",formData.username);
    form.append("password",formData.password);
    form.append("avatar",formData.avatar as File);
    form.append("info",formData.info);
    const response = await fetch('/api/users',{
      method: 'POST',
      body: form,
    });
    const data = await response.json();
    if(data.code === 200){
      setIsLogin(true);
    }else{
      alert(data.msg);
    }
  }

  useEffect(() => {
    // 获取用户列表
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      console.log(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* 左侧图片区域 */}
      <div className="flex-1 relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <img 
            src="/default.png" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-gray-900/0"></div>
        </div>
      </div>

      {/* 右侧表单区域 */}
      <div className="w-[600px] bg-white flex items-center justify-center p-8 relative overflow-hidden">
        {/* 音符动画 */}
        <div className="music-notes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`note note-${i + 1}`}>♪</div>
          ))}
        </div>

        <div className="w-[400px] form-container relative z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center form-title">
            {isLogin ? '欢迎回来' : '创建账号'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {isLogin ? (
              <>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">用户名</span>
                  </label>
                  <input
                    type="text"
                    placeholder="请输入用户名"
                    className="input input-bordered bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12 w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">密码</span>
                  </label>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="input input-bordered bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12 w-full"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">用户名</span>
                  </label>
                  <input
                    type="text"
                    placeholder="请输入用户名（用于登录）"
                    className="input input-bordered bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12 w-full"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">昵称</span>
                  </label>
                  <input
                    type="text"
                    placeholder="请输入昵称"
                    className="input input-bordered bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12 w-full"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">角色</span>
                  </label>
                  <select
                    className="select select-bordered w-full bg-gray-50 text-gray-800 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    required
                  >
                    <option value="user">普通用户</option>
                    <option value="admin">管理员</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">密码</span>
                  </label>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    className="input input-bordered bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12 w-full"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">确认密码</span>
                  </label>
                  <input
                    type="password"
                    placeholder="请再次输入密码"
                    className="input input-bordered bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200 h-12 w-full"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">头像</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full bg-gray-50 text-gray-800 border-gray-200 focus:border-red-300 focus:ring-red-200"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, avatar: e.target.files[0] });
                      }
                    }}
                  />
                </div>
                <div className="form-field">
                  <label className="label">
                    <span className="label-text text-gray-600 text-lg">个人简介</span>
                  </label>
                  <textarea
                    placeholder="请输入个人简介"
                    className="textarea textarea-bordered w-full bg-gray-50 text-gray-800 placeholder-gray-400 border-gray-200 focus:border-red-300 focus:ring-red-200"
                    value={formData.info}
                    onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  />
                </div>
              </>
            )}
            <div className="form-field">
              <button type="submit" className="btn border-0 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white h-12 text-lg w-full">
                {isLogin ? '登录' : '注册'}
              </button>
            </div>
          </form>
          <div className="divider text-gray-400 my-8">OR</div>
          <button
            className="btn btn-ghost text-gray-600 hover:bg-red-50 w-full form-field"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '没有账号？点击注册' : '已有账号？点击登录'}
          </button>
        </div>
      </div>
    </div>
  );
}
