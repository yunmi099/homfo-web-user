import { PersonalInfo } from "../type/memberInfo/interface";
import {create} from 'zustand';
import axios, { AxiosResponse } from 'axios'
import { SERVER_DEPOLY_URL } from "../../utils/axios";
export const useUserStore = create((set)=>({
    userInfo: {
    dateOfBirth: "",
    gender: "",
    job: "",
    nickName: "",
    status: "",
    userAccount: "",
    userId: 0,
    userPhoneNum: "string"},
    fetch: async (id: number): Promise<void> => {
        try {
          const res: AxiosResponse<PersonalInfo> = await axios.get(`${SERVER_DEPOLY_URL}/users/${id}/info`);
          if (res.status === 200) {
            set({userInfo: res.data})
          }
        } catch (e) {
          console.log(e);
        }
      },
   modify:  async (id: number, data:{})=>{
    try {
      let data;
      const res: AxiosResponse = await axios.patch(`${SERVER_DEPOLY_URL}/users/${id}/info`, data);
      set({userInfo: res.data})
    } catch (e: any) {
      console.log(e);
    }
  }
  }))


