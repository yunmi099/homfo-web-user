import axios, { Method } from 'axios';
import useUserStore from '../store/context/useUserStore';
const SERVER_DEPOLY_URL = 'https://dev-server.homfo.co.kr/api';
export const fetchFromApi = async (
    method: Method | undefined,
    url: string,
    data?: any,
  ): Promise<any> => {
    try {
      let token = localStorage.getItem("token")
      // alert("before passed token:"+token);
      let headers = {
        "Content-Type":'application/json',
        "Authorization": 'Bearer eyJyZWdEYXRlIjoxNzAwOTg1NDkzOTk3LCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsInVzZXJJZCI6MzcsImFjY291bnQiOiJ5dW5taTA5OSIsImlhdCI6MTcwMDk4NTQ5MywiZXhwIjoxNzAyMTk1MDkzfQ.XTgZEDItZKnIE-J8gief0OQS4nLVZ2osbF3lKOhFy6E',
      }
      // alert("after ?passed token:"+headers.Authorization);
      const response = await axios({
        method,
        url: SERVER_DEPOLY_URL + url,
        data,
        headers: headers,
      });
      console.log(response)
      return (response);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
