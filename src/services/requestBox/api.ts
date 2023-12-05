import { ExtendedRequestData, RequestList } from "../../store/type/requestBox/interface";
import { fetchFromApi } from "../../utils/axios";
import { RequestFormUserResponded } from "../../store/type/requestBox/interface";
import { Dispatch, SetStateAction } from "react";
import { OfferDocument } from "../../store/type/offerDocument/interface";
import { RequestData} from "../../store/type/homfoRecommend&request/interface";
export const getUsersRequestList= async (userId: number, setData:Dispatch<SetStateAction<RequestList[] | undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/users/${userId}/requests`);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
};
export const getRequestDocumentDetail= async (requestId: number, setUserResponse:Dispatch<SetStateAction<ExtendedRequestData>>, setFilterValue:React.Dispatch<React.SetStateAction<{[key: string]: number[];}>>): Promise<void> => {
    try {
      const res = await fetchFromApi('GET',`/requests/${requestId}/detail`);
      const userResponse : RequestFormUserResponded= res.data;
      const data = {
        "areaId":userResponse.areaId,
        "realEstateType": userResponse.realEstateType,
        "contractType": [Object.keys(userResponse.deposit).filter((key:string)=>{return userResponse.deposit[key].length>0})],
        "residencePeriod": [userResponse.residencePeriod],
        "loanAvailability":[userResponse.loanAvailability],
        "loanType":userResponse.loanType===null?[]:[userResponse.loanType],
        "moveInPeriod": [userResponse.moveInPeriod],
        "roomOption": userResponse.roomOption,
        "otherRoomOption": userResponse.otherRoomOption===null?"":userResponse.otherRoomOption,
        "additionalRequests":userResponse.additionalRequests===null?"":userResponse.additionalRequests,
      };
      setUserResponse(data)
      setFilterValue(res.data.deposit)
    } catch (e) {
      console.log(e);
    }
};

export const getOfferDocument = async (offerId: number, setData: React.Dispatch<React.SetStateAction<OfferDocument | null>>) =>{
  try {
    const res = await fetchFromApi('GET',`/offers/${offerId}/info`);
    setData(res.data);
  } catch (e) {
    console.log(e)
  }
}

export const modifyRequestDocument = async (id: number,data:RequestData, filterData: {[key:string]:number[]}): Promise<any> => {
    try{
        let totalData:any =   
        {   
            userId: 37,
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
        totalData = {...totalData, deposit: filterData}
        console.log(data.contractType.length)
        switch (data.contractType.length) {
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
      console.log(totalData)
     const res = await fetchFromApi('PATCH', `/requests/${id}`,totalData); 
    } catch (e:any) {
        console.log(e);
    }
}