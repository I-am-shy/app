
import { NextRequest } from 'next/server'

export default async function verifyToken(request: NextRequest){
  const cookie = request.cookies.get('token')
  if (!cookie ||!cookie.value) {
    return false
  }
  const response = await fetch(`${request.nextUrl.origin}/api/auth`,{
    headers: {
      'Cookie': `token=${cookie?.value}`
    }
  })
  const Auth = await response.json()
  return Auth.code === 200
}