import { create } from 'zustand';
import { fetchFromApi } from '../../utils/axios';
import { PersonalInfo } from '../type/memberInfo/interface';

interface UserStoreState {
  userInfo: PersonalInfo;
  setUserInfo: (info: PersonalInfo) => void;
  fetch: (id: number) => Promise<void>;
  modify: (id: number, newData: Partial<PersonalInfo>) => Promise<boolean>;
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
  setUserInfo: (info: PersonalInfo) => {
    set({ userInfo: info });
  },
  fetch: async (id: number): Promise<void> => {
    try {
      const res = await fetchFromApi('GET',`/users/${id}/info`);
      set({ userInfo: res.data});
    } catch (e) {
      console.log(e);
    }
  },
  modify: async (id: number, newData: Partial<PersonalInfo>): Promise<boolean> => {
    try {
      const res = await fetchFromApi('PATCH',`/users/${id}/info`, newData);
      set({ userInfo: res.data});
      return true;
    } catch (e: any) {
      return false;
    }
  },
}));
export default useUserStore;