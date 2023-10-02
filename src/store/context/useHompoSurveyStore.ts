import {create} from 'zustand';
import { HompoEditData, HompoStoreState, Result,ResultDetail } from '../type/hompoRecommend&request/interface';
import { fetchFromApi } from '../../utils/axios';
import { getAreaDetailResult } from '../../services/hompoArea/api';
const useHompoSurveyStore = create<HompoStoreState>((set)=>({
    result: null,
    resultDetail:null,
    setResult: (data:Result[])=>set((state) => ({
      ...state,
      result: data
    })),  
    setResultDetail: (data:ResultDetail[])=>set((state) => ({
      ...state,
      resultDetail: data
    })),  
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
        const storeState = useHompoSurveyStore.getState();
        const requestType = storeState.result===null?'post':'patch';
        const res = await fetchFromApi(requestType, `/users/${id}/recommended-area`,totalData); 
        storeState.setResult(res.data.data);
        const resultArray:ResultDetail[] = await Promise.all(
          res.data.data.map(async (item: any) => {
            const areaId: number = item.area.areaId;
            const detail = await getAreaDetailResult(areaId);
            return {
              areaId,
              detail
            };
          })
        );
       storeState.setResultDetail(resultArray);
        } catch (e: any) {
          console.log(e);
        }
    },
 }))     


 export default useHompoSurveyStore;