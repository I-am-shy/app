import crypto from 'crypto';

/**
 * 生成基于base64Url编码的token
 * @param {Object} data 需要加密的数据
 * @param {String} secretKey 密钥
 * @param {Number} expires 过期时间
 * @returns {String} 基于base64Url编码的token
 */
function getToken(data: object, secretKey: string, expires: number) {
  // base64Url编码 : 将 base64 编码中的 + 替换为 -，/ 替换为 _,去掉编码结果末尾的填充字符 =
  function base64UrlEncode(str: string) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  // 加密算法
  const header = {
    alg: 'sha256',
    typ: 'JWT'
  }

  // 记录过期时间，验证时使用当前时间和过期时间计算是否过期，
  const exp = Math.floor(Date.now() / 1000) + expires;
  // 合并payload
  const payload = {
    ...data,
    exp,
  }

  // 生成token
  const hash = crypto.createHmac(header.alg, secretKey).update(base64UrlEncode(JSON.stringify(header)) + "." + base64UrlEncode(JSON.stringify(payload))).digest('hex');
  const token = base64UrlEncode(JSON.stringify(header)) + "." + base64UrlEncode(JSON.stringify(payload)) + "." + base64UrlEncode(hash);
  
  return token;
}

/**
 * 验证token
 * @param {String} token 需要验证的token
 * @param {String} secretKey 密钥
 * @returns {Boolean} 是否验证通过
 */
function verifyToken(token: string, secretKey: string) {
  // base64Url编码 : 将 base64 编码中的 + 替换为 -，/ 替换为 _,去掉编码结果末尾的填充字符 =
  function base64UrlEncode(str: string) {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function base64UrlDecode(str: string) {
    return atob(str.replace(/\-/g, '+').replace(/\_/g, '/'));
  }
  
  // 分割token
  const [Header, data, Token] = token.split('.');
  const header = JSON.parse(base64UrlDecode(Header));
  const payload = JSON.parse(base64UrlDecode(data));

  // 验证时间是否过期
  if(payload.exp === undefined || Math.floor(Date.now()/1000) - payload.exp  >= 0){
    return false;
  }
  // 验证token是否被篡改
  const hash = crypto.createHmac(header.alg, secretKey).update(base64UrlEncode(JSON.stringify(header)) + "." + base64UrlEncode(JSON.stringify(payload))).digest('hex');
  const newToken = base64UrlEncode(JSON.stringify(header)) + "." + base64UrlEncode(JSON.stringify(payload)) + "." + base64UrlEncode(hash);
  
  // console.log(header,payload,token);

  return token === newToken;
}

// // 需要加密的数据
// const data = { 
//   username: 'john',
//   role: 'user'
// };

// // 密钥
// const secretKey = 'abc'; 

// // 生成token
// const token = getToken(data, secretKey, 5);

// // console.log(token);

// // 验证token
// setTimeout(() => {
//   console.log(verifyToken(token, secretKey) ? '验证通过' : '验证失败');
// },1000);

// setTimeout(() => {
//   console.log(verifyToken(token, secretKey) ? '验证通过' : '验证失败');
// },5000);

export { getToken, verifyToken }