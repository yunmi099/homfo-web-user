import { RequestList } from "../../store/type/requestBox/interface";
import { fetchFromApi } from "../../utils/axios";
export const getUsersRequestList= async (userId: number, setData:React.Dispatch<React.SetStateAction<RequestList[] | undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/users/${userId}/requests`);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
};