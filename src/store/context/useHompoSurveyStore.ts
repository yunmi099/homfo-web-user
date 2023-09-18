import {create} from 'zustand';
import { HompoEditData } from '../type/hompoRecommend/interface';
import { fetchFromApi } from '../../utils/axios';
type AreaType = {
  areaId: number;
  name: string;
  type: string;
  radius: number;
  lat: number;
  lng: number;
}
type ScoreType = number;
const getHompoRecommendResult= async (area_id: number, area_type: string): Promise<void> => {
  try {
     const res = await fetchFromApi('GET', `/real-estate/area/detail?areaId=${area_id}&areaType=${area_type}`);
     return res.data;
  } catch (e: any) {
     throw e;
  }
}

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
    resultDetail: [
      {
        name: null|string,
        type: null|string,
        avgMonthlyDeposit: null|number,
        avgMonthlyFee: null|number,
        avgJeonseDeposit: null|number,
        avgExclusiveArea:null|number,
        avgBuiltYear:null|number,
        avgWalkingTotalDistance: null|number,
        avgWalkingSeconds: null|number,
        avgBikeSeconds: null|number,
        avgTransportSeconds: null|number,
      }
    ];
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
        const resultArray = res.data.data.map((item: any) => {
          const area: AreaType = item.area;
          const score: ScoreType = item.score;
          const detailResult = getHompoRecommendResult(area.areaId,area.type);
          return {
            area,
            score,
            detailResult
          };
        });
          set((state) => ({
            ...state,
            result: resultArray,
            resultDetail: resultArray.map((item:any) => item.detailResult),
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
    resultDetail: [
      {
        name: null,
        type: null,
        avgMonthlyDeposit: null,
        avgMonthlyFee: null,
        avgJeonseDeposit: null,
        avgExclusiveArea: null,
        avgBuiltYear: null,
        avgWalkingTotalDistance: null,
        avgWalkingSeconds: null,
        avgBikeSeconds: null,
        avgTransportSeconds: null
      }
    ]

 }))     


 export default useHompoSurveyStore;