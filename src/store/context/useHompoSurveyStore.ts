import {create} from 'zustand';
import { fetchFromApi } from '../../utils/axios';
import { HompoEditData } from '../type/hompoRecommend/interface';
type AreaType = {
  areaId: number;
  name: string;
  type: string;
  radius: number;
  lat: number;
  lng: number;
};

type ScoreType = number;
interface HompoStoreState {
    postHompoRecommendInfo: (id: number, data: HompoEditData, filterData:{[key:string]:number[]}|undefined) => Promise<void>;
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
    postHompoRecommendInfo: async (id: number, data:HompoEditData, filterData: {[key:string]:number[]}|undefined): Promise<void> => {
      try {
        let totalData={};
        totalData = Object.keys(data).reduce((obj:any, index:any)=>{
          if (data[index].length === 1) {
            obj[index] = data[index][0];
          } else {
            obj[index] = data[index];
          }
          return obj;
        },{})
        if (filterData !== undefined) {
          const transportsData = Object.entries(filterData).map(([type, [start, end]]) => ({
            type,
            seconds: end * 60,
          }));
          totalData = {...totalData, "transports": transportsData}
        }
        const res = await fetchFromApi('POST', `/users/${id}/recommended-area`,totalData);
        const resultArray = res.data.data.map((item: any) => ({
          area: item.area as AreaType,
          score: item.score as ScoreType,
        }));
          set((state) => ({
            ...state,
            result: resultArray,
          }));
        } catch (e: any) {
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
 export default useHompoSurveyStore;