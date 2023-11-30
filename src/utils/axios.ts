import axios, { Method } from 'axios';
const SERVER_DEPLOY_URL = 'https://dev-server.homfo.co.kr/api';
const SERVER_PRODUCTION_URL = 'https://prod-server.homfo.co.kr/api';

axios.interceptors.request.use(
  (config) => {
    try {

      // 배포 시 밑에 주석 해제해주세요
      config.headers.Authorization = 'Bearer eyJyZWdEYXRlIjoxNzAxMTYxMjg0MzkzLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6MzcsImFjY291bnQiOiJ5dW5taTA5OSIsImlhdCI6MTcwMTE2MTI4NCwiZXhwIjoxNzAyMzcwODg0fQ.mwXSk-3hSjGkBN9-a2zcr6jgALL4DwGLVk4ZDJ4DI3A'

    
      // const token = localStorage.getItem("token");
      // if (token) {
      //   config.headers.Authorization = token;
      // }
      return config;
    } catch (err) {
      window.ReactNativeWebView.postMessage("tokenExpired"); 
      console.error("[_axios.interceptors.request] config : " + err);
    }
);

export const fetchFromApi = async (
    method: Method | undefined,
    url: string,
    data?: any
): Promise<any> => {
    try {
        const response = await axios({
            method,
            url: SERVER_PRODUCTION_URL + url,
            // url: SERVER_DEPLOY_URL + url,
            data,
        });
        return response;
    } catch (err) {
        throw err;
    }
};
