import axios, { Method } from 'axios';
const SERVER_DEPLOY_URL = 'https://dev-server.homfo.co.kr/api';
const SERVER_PRODUCTION_URL = 'https://prod-server.homfo.co.kr/api';

axios.interceptors.request.use(
  (config) => {
    try {

      // 배포 시 밑에 주석 해제해주세요
      config.headers.Authorization = 
      'Bearer eyJyZWdEYXRlIjoxNzAxODY0MDQwNTc3LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6NTEsImFjY291bnQiOiJ5dW5taTA5OSIsImlhdCI6MTcwMTg2NDA0MCwiZXhwIjoxNzAzMDczNjQwfQ.UtiToYx-ArbF5ItwLpL6nSvfx9Yc-loWnmalLOhCYLc'
      // const token = localStorage.getItem("token");
      // if (token) {
      //   config.headers.Authorization = token;
      // }
      return config;
    } catch (err) {
      window.ReactNativeWebView.postMessage("tokenExpired"); 
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    window.ReactNativeWebView.postMessage("tokenExpired");
    return Promise.reject(error);
  }
);


export const fetchFromApi = async (
    method: Method | undefined,
    url: string,
    data?: any,
  ): Promise<any> => {
    try {
      const response = await axios({
        method,
        // url: SERVER_PRODUCTION_URL + url,    
        url: SERVER_PRODUCTION_URL + url,
        data,
      });
      return (response);
    } catch (err) {
      throw err;
    }
  };
