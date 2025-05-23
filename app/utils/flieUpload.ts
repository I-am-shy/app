import { promises as fs } from 'fs'
import path from 'path'

// 文件类型配置
const FILE_CONFIG = {
  image: {
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 10MB
    uploadDir: 'images'
  },
  audio: {
    allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'],
    maxSize: 10 * 1024 * 1024, // 10MB
    uploadDir: 'audios'
  },
  avatar: {
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    maxSize: 2 * 1024 * 1024, // 20MB
    uploadDir: 'avatars'
  }
}

type FileType = keyof typeof FILE_CONFIG

/**
 * 文件上传函数
 * @param file 文件对象
 * @param fileType 文件类型（'image' | 'audio' | 'avatar'）
 * @returns 文件路径
 */
async function uploadFile(file: File, fileType: FileType): Promise<string> {
  try {
    // 验证文件类型
    const config = FILE_CONFIG[fileType]
    if (!config.allowedTypes.includes(file.type)) {
      throw new Error(`不支持的文件类型: ${file.type}。支持的类型: ${config.allowedTypes.join(', ')}`)
    }

    // 验证文件大小
    if (file.size > config.maxSize) {
      throw new Error(`文件大小超过限制: ${file.size}。最大允许: ${config.maxSize} bytes`)
    }

    // 生成文件名和路径
    const fileName = `${file.name.split('.')[0]}-${Date.now()}.${file.name.split('.')[1]}`
    const uploadDir = `./public/uploads/${config.uploadDir}`
    const filePath = path.join(uploadDir, fileName)

    // 确保上传目录存在
    await fs.mkdir(uploadDir, { recursive: true })

    // 将文件内容转换为 Buffer 并写入
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(filePath, buffer)

    // 返回相对路径（用于客户端访问）
    return `/uploads/${config.uploadDir}/${fileName}`
  } catch (error) {
    console.error('文件上传失败:', error)
    throw error
  }
}

/**
 * 删除文件
 * @param filePath 文件路径
 */
async function deleteFile(filePath: string) {
  try {
    if (!filePath) return
    const fullPath = `./public${filePath}`
    await fs.unlink(fullPath)
  } catch (error) {
    console.error('删除文件失败:', error)
  }
}

export { uploadFile, deleteFile }