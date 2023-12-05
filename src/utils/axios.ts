import axios, { Method } from 'axios';
const SERVER_DEPLOY_URL = 'https://dev-server.homfo.co.kr/api';
const SERVER_PRODUCTION_URL = 'https://prod-server.homfo.co.kr/api';

axios.interceptors.request.use(
  (config) => {
    try {

      // 배포 시 밑에 주석 해제해주세요
      // config.headers.Authorization = 
      // 'Bearer eyJyZWdEYXRlIjoxNzAxNzgyOTk4MTMxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiRk9SQ0VfQURNSU4iLCJ1c2VySWQiOjExLCJhY2NvdW50Ijoia2JoOTUwNjE3IiwiaWF0IjoxNzAxNzgyOTk4LCJleHAiOjE3MDI5OTI1OTh9.4y65m0e3IB66tBPLNA8upTYWYFuCDsrWZ15cryvj8m4'
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
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
