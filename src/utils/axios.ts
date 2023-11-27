import axios, { Method } from 'axios';
const SERVER_DEPOLY_URL = 'https://dev-server.homfo.co.kr/api';
const SERVER_PRODUCTION_URL = 'https://prod-server.homfo.co.kr/api';

axios.interceptors.request.use(
  (config) => {
    try {
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
        url: SERVER_PRODUCTION_URL+ url,    
        // url: SERVER_DEPOLY_URL+ url,       
        data,
      });
      return (response);
    } catch (err) {
      throw err;
    }
  };
