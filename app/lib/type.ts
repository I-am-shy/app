interface User {
  name: string
  role: string
  username: string
  password: string
  avatar: string 
  info: string
}
interface Song {
  title: string
  artist: string
  lyric: string
  path: string
}

interface Comment {
  user_id: number
  song_id: number
  content: string
}

interface Favorite {
  user_id: number
  song_id: number
}

interface Announcement {
  title: string
  content: string
}

interface Theme {
  name: string
  description: string
}

export type { User, Song, Comment, Favorite, Announcement, Theme }