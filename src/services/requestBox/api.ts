import { RequestList } from "../../store/type/requestBox/interface";
import { fetchFromApi } from "../../utils/axios";
import { RequestFormUserResponded } from "../../store/type/requestBox/interface";
export const getUsersRequestList= async (userId: number, setData:React.Dispatch<React.SetStateAction<RequestList[] | undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/users/${userId}/requests`);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
};
export const getRequestDocumentDetail= async (requestId: number, setUserResponse:React.Dispatch<React.SetStateAction<any| undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/requests/${requestId}/detail`);
      const data = {
        "areaId":res.data.areaId,
        "realEstateType": res.data.realEstateType,
         "contractType": [Object.keys(res.data.deposit).filter((key:string)=>{return res.data.deposit[key].length>0})],
        "residencePeriod": [res.data.residencePeriod],
        "loanAvailability":[res.data.loanAvailability],
        "loanType":[res.data.loanType],
        "moveInPeriod": [res.data.moveInPeriod],
        "roomOption": res.data.roomOption,
        "otherRoomOption": res.data.otherRoomOption,
        "additionalRequests":res.data.additionalRequests,
      };
      setUserResponse(data);
    } catch (e) {
      console.log(e);
    }
};
