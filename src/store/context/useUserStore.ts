import { create } from 'zustand';
import { fetchFromApi } from '../../utils/axios';
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
      const res = await fetchFromApi('GET',`/users/${id}/info`);
      set({ userInfo: res.data});
    } catch (e) {
      console.log(e);
    }
  },
  modify: async (id: number, newData: Partial<PersonalInfo>): Promise<void> => {
    try {
      const res = await fetchFromApi('PATCH',`/users/${id}/info`, newData);
      console.log(res);
      set({ userInfo: res.data});
    } catch (e: any) {
      console.log(e);
    }
  },
}));
export default useUserStore;