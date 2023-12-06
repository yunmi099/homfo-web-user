import { ResultDetail } from "../../store/type/homfoRecommend&request/interface";
import { fetchFromApi } from "../../utils/axios";

export const postBookMarkLists = async (userId:number,areaId:number,setToggle: React.Dispatch<React.SetStateAction<number | null>>): Promise<void> => {
    try {
        const res = await fetchFromApi(
            'POST',
            `/users/${userId}/areaBookmarks?areaId=${areaId}`
        );
        setToggle(res.data.id)
    } catch (e) {
      console.log(e);
    }
};


export const deleteBookMarkLists = async (userId:number,toggleId:number): Promise<void> => {
    try {
        const res = await fetchFromApi('DELETE',`/users/${userId}/areaBookmarks?areaBookmarkId=${toggleId}`);
    } catch (e) {
      console.log(e);
    }
};


export const getBookMarkList = async (areaId: number, setToggle: React.Dispatch<React.SetStateAction<number | null>>): Promise<void> => {
    try {
       const res = await fetchFromApi('GET', `/users/areaBookmarks/${areaId}`);
       setToggle(res.data.id)
    } catch (e: any) {
        setToggle(null);
       throw e;
    }
  }