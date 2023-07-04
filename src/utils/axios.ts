
// import axios, { AxiosRequestConfig } from 'axios';
// import cookies from 'js-cookie';
// import * as jwt from 'jsonwebtoken';
// export const customAxios: AxiosInstance = axios.create({
//     baseURL: `${SERVER_ADDRESS}`, // 기본 서버 주소 입력
//     headers: {
//       access_token: cookies.get('access_token'),
//     },
//   });
// export const checkToken = async (config: AxiosRequestConfig) => {
//   let accessToken = cookies.get('access_token');
//   const decode = jwt.decode(accessToken);
//   const nowDate = new Date().getTime() / 1000;
  
//   // 토큰 만료시간이 지났다면
//   if (decode.exp < nowDate) {
//     const { data } = await axios.post(`${SERVER_URL}/token`, { accessToken }, {
//         headers: {
//           access_token: getToken(),
//         },
//       });
//     // 리프레쉬 토큰 발급 서버 요청
    
//     const { refreshToken } = data.data;
    
//     accessToken = refreshToken;
//   }
  
//   config.headers['access_token'] = accessToken;
//   return config;
// }
export const SERVER_DEPOLY_URL = 'https://dev.ajou-only-five.shop/api/v1';