import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import { SERVER_DEPOLY_URL } from '../../utils/axios';
import { PersonalInfo } from '../type/memberInfo/interface';

interface UserStoreState {
  userInfo: PersonalInfo;
  fetch: (id: number) => Promise<void>;
  modify: (id: number, newData: Partial<PersonalInfo>) => Promise<void>;
}

 const useUserStore = create<UserStoreState>((set) => ({
  userInfo: {
    dateOfBirth: '',
    gender: '',
    job: '',
    nickName: '',
    status: '',
    userAccount: '',
    userId: 0,
    userPhoneNum: 'string',
  },
  fetch: async (id: number): Promise<void> => {
    try {
      const res: AxiosResponse<PersonalInfo> = await axios.get(`${SERVER_DEPOLY_URL}/users/${id}/info`);
      if (res.status === 200) {
        set({ userInfo: res.data });
      }
    } catch (e) {
      console.log(e);
    }
  },
  modify: async (id: number, newData: Partial<PersonalInfo>): Promise<void> => {
    try {
      const res: AxiosResponse = await axios.patch(`${SERVER_DEPOLY_URL}/users/${id}/info`, newData);
      set({ userInfo: res.data });
    } catch (e: any) {
      console.log(e);
    }
  },
}));
export default useUserStore;