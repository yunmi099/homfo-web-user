import {create} from 'zustand';
import { fetchFromApi } from '../../utils/axios';
interface HompoStoreState {
    info:
    {
        universityPeople: boolean | null;
        transports: null|[{type: string, seconds:number}];
        hobbyInHome: boolean | null;
        facilities: string[]|null;
        
    },
    setSurveyInfo: (key: keyof HompoStoreState['info'], value: any) => void;
    postHompoRecommendInfo: (id: number) => Promise<void>;
    result:
    [{
        area: {
            areaId: null|number,
            name:null|string,
            type:null|string,
            radius:null|number,
            lat: null|number,
            lng: null|number,
        },
        score: null|number,
    }]
}
  
const useHompoSurveyStore = create<HompoStoreState>((set)=>({
    info :{
        universityPeople: null,
        transports: null,
        hobbyInHome: null,
        facilities: null,
    },
    setSurveyInfo: (key, value) => {
        set((state) => ({
          info: {
            ...state.info,
            [key]: value,
          },
        }));
      },
    postHompoRecommendInfo: async (id: number): Promise<void> => {
        const state = useHompoSurveyStore.getState();
        const data = { ...state.info, userId: id };
        try {
          const res = await fetchFromApi('POST', `/users/${id}/recommended-area`, data);
          set((state) => ({
            ...state,
            result: res.data, // Assuming 'res.data' contains the new result data
          }));
        } catch (e: any) {
          console.log(e);
        }
    },
    result: [
            {
                area: {
                    areaId: null,
                    name:null,
                    type:null,
                    radius:null,
                    lat: null,
                    lng: null,
                },
                score: null,
            },
        ],
    }))     