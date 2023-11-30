import { fetchFromApi } from "../../utils/axios";

export const getBookMarkLists = async (userId:number,areaId:number): Promise<void> => {
    try {
        const res = await fetchFromApi('GET',`/users/${userId}/areaBookmarks`);
        console.log(res.data)
    } catch (e) {
      console.log(e);
    }
};
// 타입 다시 정의 
