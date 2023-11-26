import axios, { Method } from 'axios';
const SERVER_DEPOLY_URL = 'https://dev-server.homfo.co.kr/api';

export const fetchFromApi = async (
    method: Method | undefined,
    url: string,
    data?: any,
  ): Promise<any> => {
    try {
        const headers: any = {};
        let token = localStorage.getItem("token");
        if (token) {
            headers.Authorization = token;
        }    
      const response = await axios({
        method,
        url: SERVER_DEPOLY_URL + url,
        data,
        headers: headers,
      });
      return response;
    } catch (err) {
      console.log(err);
    //   alert(err)
      throw err;
    }
  };
