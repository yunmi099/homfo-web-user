import { ExtendedRequestData, RequestList } from "../../store/type/requestBox/interface";
import { fetchFromApi } from "../../utils/axios";
import { RequestFormUserResponded } from "../../store/type/requestBox/interface";
import { Dispatch, SetStateAction } from "react";
import { OfferDocument } from "../../store/type/offerDocument/interface";
export const getUsersRequestList= async (userId: number, setData:Dispatch<SetStateAction<RequestList[] | undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/users/${userId}/requests`);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
};
export const getRequestDocumentDetail= async (requestId: number, setUserResponse:Dispatch<SetStateAction<ExtendedRequestData>>): Promise<void> => {
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
      setUserResponse(data);
    } catch (e) {
      console.log(e);
    }
};

export const getOfferDocument = async (offerId: number, setData: React.Dispatch<React.SetStateAction<OfferDocument | null>>) =>{
  try {
    const res = await fetchFromApi('GET',`/offers/${offerId}/info`);
    console.log(res.data)
    setData(res.data);
  } catch (e) {
    console.log(e)
  }
}