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
export const getRequestDocumentDetail= async (requestId: number, setUserResponse:React.Dispatch<React.SetStateAction<RequestFormUserResponded| undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/requests/${requestId}/detail`);
      setUserResponse(res.data);
    } catch (e) {
      console.log(e);
    }
};
