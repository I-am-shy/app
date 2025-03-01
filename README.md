# **在线音乐平台**
--- 

# 后端功能
系统主要有系统管理员、普通用户、临时用户三种主要角色，每种角色拥有不同的功能模块。主要实现的功能有：

1.	用户管理：提供系统管理员对普通用户进行管理等相关操作。
2.	评论管理：实现对评论的分类、审核、删除进行管理。
3.	收藏管理：用户可以收藏常听和喜欢的音乐。
4.	主题界面管理：普通用户和临时用户可以选择不同的主题界面风格。 
5.	用户功能管理：普通用户可以对歌曲进行评论和设置个人信息。
6.	公告管理：可以发布系统公告，通知用户重要的信息和活动。

---

# 前端功能
界面主要分为登录界面、主界面、用户个人界面、播放界面。

登录界面：简洁符合整体音乐风格的登录界面

主界面：主要有推荐歌曲，侧边栏切换其他页面，顶部包含简单的用户信息(未登录显示登录)，底部包含简单的音乐播放器。

用户个人界面：包含个人信息，收藏，评论，设置，退出登录。

播放界面：完整的播放界面，包含歌曲的封面，滚动歌词，背景，歌曲下载按钮

---

# 开发流程

## 系统角色划分
系统管理员
普通用户
临时用户

## 核心功能模块

### 用户系统
用户注册/登录
用户权限管理
个人信息管理

### 音乐功能
音乐播放器
歌词显示
音乐下载
音乐推荐
### 社交功能
评论系统
收藏功能
公告系统
### 界面功能
主题切换
多个功能界面（登录、主页、个人中心、播放页）

## 技术架构
- 前端
使用nextjs构建SPA应用
使用音频API处理音乐播放
使用WebSocket实现实时评论和公告
响应式设计适配不同设备
- 后端
RESTful API设计
用户认证和授权系统
文件存储系统（音乐文件、封面图片）
数据库设计（用户、音乐、评论、收藏等表）
- 数据库表结构
```
  - users（用户表）
    - user_id  // 用户id
    - name  // 用户名
    - role  // 角色
    - username  // 用户名
    - password  // 密码
  - songs（音乐表）
    - song_id  // 音乐id
    - song_title  // 音乐名
    - song_artist  // 艺术家
    - song_lyric  // 歌词
    - file_path  // 文件路径
  - comments（评论表）
    - comment_id  // 评论id
    - user_id  // 用户id
    - song_id  // 音乐id
    - comment_content  // 评论内容
    - created_at  // 创建时间
  - favorites（收藏表）
    - user_id  // 用户id
    - song_id  // 音乐id
  - announcements（公告表）
    - announcement_id  // 公告id
    - announcement_title  // 公告标题
    - announcement_content  // 公告内容
    - created_at  // 创建时间
  - themes（主题表）
    - theme_name  // 主题名称
    - description  // 主题描述
``` 
## 开发优先级建议
1. 首要实现：
基础用户系统
核心音乐播放功能
基本界面框架
2. 次要实现：
评论功能
收藏系统
主题切换
3. 最后完善：
公告系统
推荐系统
界面美化


--- 

# 项目结构


```
|-- app
  |-- api // 接口
  |-- dashboard // 后台管理页面
  |-- lib // 数据库相关
  |-- login // 登录页面
  |-- main // 主页
    |-- my // 个人页面
    |-- play // 播放页面
  |-- utils // 工具函数，文件相关，鉴权
|-- public // 公共资源

```


--- 

# API 详细

## 用户管理

- GET /api/users - 获取用户列表
- GET /api/users?name="name" - 获取单个用户
- POST /api/users - 创建用户
- PUT /api/users?name="name" - 更新用户
- DELETE /api/users?name="name" - 删除用户

**请求参数:**
POST:
  formData:
    name: 用户名
    role: 角色
    username: 用户名
    password: 密码
    info: 信息
    avatar: 头像
PUT:
  formData:
    name?: 用户名
    role?: 角色
    username?: 用户名
    password?: 密码
    info?: 信息
    avatar?: 头像

**响应格式：**
```json
// 用户信息
{
  
  "data": [
    {
      "user_id": "user_id",
      "name": "name",
      "role": "role",
      "username": "username",
      "password": "password",
      "avatar": "avatar",
      "info": "info"
    }
  ],
  "code": "200"
}

// 操作结果
{
    "msg": "msg",
    "code": 400
}
```

## 歌曲管理

- GET /api/songs - 获取歌曲列表
- GET /api/songs?title = "title" - 获取单个歌曲
- POST /api/songs - 创建歌曲
- PUT /api/songs?title = "title" - 更新歌曲
- DELETE /api/songs?title = "title" - 删除歌曲

**请求参数:**
POST:
  formData:
    title: 歌名
    artist: 歌手
    lyric: 歌词
    file: 歌曲文件
PUT:
  formData:
    title?: 歌名
    artist?: 歌手
    lyric?: 歌词
    file?: 歌曲文件
**响应格式：**

```json
// 歌曲信息
{
  "data": [
    {
      "song_id": "song_id",
      "song_title": "title",
      "song_artist": "artist",
      "song_lyric": "lyric",
      "file_path": "file_path"
    }
  ],
  "code": "200"
}
```

## 评论管理

- GET /api/comments?song_id="song_id" - 获取歌曲评论
- POST /api/comments?song_id="song_id" - 创建评论
- DELETE /api/comments?comment_id="comment_id" - 删除评论

**请求参数:**
POST:
  Data:
    user_id: 用户id
    comment_content: 评论内容

**响应格式：**
```json
// 评论信息
{
  "data": [
    {
      "comment_id": "comment_id",
      "song_id": "song_id",
      "comment_content": "comment_content",
      "created_at": "created_at"
    }
  ],
  "code": "200"
}
```

## 收藏管理

- GET /api/favorites?user_id="user_id" - 获取用户收藏
- POST /api/favorites?song_id="song_id" - 创建收藏
- DELETE /api/favorites?song_id="song_id" - 删除收藏

**请求参数:**
POST:
  Data:
    user_id: 用户id
    song_id: 歌曲id

**响应格式：**  
```json
// 收藏信息
{
  "data": [
    {
      "song_id": "song_id",
      "song_title": "song_title",
      "song_artist": "song_artist",
      "song_lyric": "song_lyric",
      "file_path": "file_path"
    }
  ],
  "code": "200"
}
```

## 公告管理

- GET /api/announcements - 获取所有公告
- POST /api/announcements - 创建公告
- PUT /api/announcements - 更新公告
- DELETE /api/announcements?title="title" - 删除公告

**请求参数:**
POST:
  Data:
    title: 公告标题
    content: 公告内容

PUT:
  Data:
    old_title: 旧标题
    title: 新标题
    content: 新内容

**响应格式：**
```json
// 公告信息
{
  "data": [
    { 
      "announcement_id": "announcement_id",
      "announcement_title": "announcement_title",
      "announcement_content": "announcement_content",
      "created_at": "created_at"
    }
  ],
  "code": "200"
} 
```

## 主题管理

- GET /api/themes - 获取所有主题
- POST /api/themes - 创建主题
- DELETE /api/themes?theme_name="theme_name" - 删除主题

**请求参数:**
POST:
  Data:
    theme_name: 主题名称
    description: 主题描述

**响应格式：**
```json
// 主题信息
{
  "data": [
    { 
      "theme_name": "theme_name",
      "description": "description"
    }
  ],
  "code": "200"
}
``` 

--- 

# 界面

仿桌面程序的界面风格：切换小窗口,可拖动,

1. 仪表盘s
  - 查看后台数据（用户，音乐，评论，公告）
  - 修改用户权限
  - 修改数据（用户，音乐，评论，公告）



**注意事项：**
文件在客户端选中后，调用接口上传到服务器，服务器会返回文件路径，后续调用接口时存储文件路径(优化接口)