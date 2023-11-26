import axios, { Method } from 'axios';
const SERVER_DEPOLY_URL = 'https://dev-server.homfo.co.kr/api';
const SERVER_PRODUCTION_URL = 'https://prod-server.homfo.co.kr/api';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
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
        url: SERVER_DEPOLY_URL+ url,        
        data,
      });
      return (response);
    } catch (err) {
      throw err;
    }
  };
