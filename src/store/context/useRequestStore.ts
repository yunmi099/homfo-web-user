import {create} from 'zustand';
import { RequestStore } from '../type/homfoRecommend&request/interface';
import { RequestData } from '../type/homfoRecommend&request/interface';
import { fetchFromApi } from '../../utils/axios';
import { RequestForm } from '../type/homfoRecommend&request/interface';
const useRequestStore = create<RequestStore>((set)=>({
    areaId: [],
    setAreaId: (data:number[])=>set((state) => ({
       areaId: data
    })),
    postPropertyRequest: async (id: number, data:RequestData, filterData: {[key:string]:number[]}): Promise<any> => {
        try{
            let totalData:RequestForm=   
            {   userId: id,
                areaId: useRequestStore.getState().areaId,
                realEstateType: [],
                contractType: "",
                residencePeriod:[],
                deposit: {
                    deposit:[],
                    monthlyRent: [],
                    jeonseDeposit: [],
                },
                moveInPeriod: "",
                loanAvailability: "",
                loanType: null,
                roomOption: [],
                otherRoomOption: null,
                additionalRequests: null,
            }
            totalData = {...totalData, deposit: {...totalData.deposit,...filterData}}
            switch (data.contractType[0].length) {
                case 3:
                    totalData.contractType = "상관없음";
                    break;
                case 2:
                    totalData.contractType = "월세";
                    break;
                case 1:
                    totalData.contractType = "전세";
                    break;
                default:
                    break;
            }
            let copyData:any = {...data};
            for (const key in copyData) {
                if (Array.isArray(copyData[key]) && copyData[key].length === 1 && key!=="realEstateType" &&  key!=="roomOption") {
                    copyData[key] = copyData[key][0];
                }
                if (typeof copyData[key] === "string" && copyData[key].length === 0) {
                    copyData[key] = null;
                }   
                if (Array.isArray(copyData[key]) && copyData[key].length === 0) {
                    copyData[key] = null;
                }     
            }
            delete copyData.contractType;
            totalData = {...totalData, ...copyData};
         const res = await fetchFromApi('post', `/requests`,totalData); 
         return res;
        } catch (e:any) {
            console.log(e);
        }

    }
}))
export default useRequestStore;