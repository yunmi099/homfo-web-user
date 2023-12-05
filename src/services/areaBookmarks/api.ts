import { fetchFromApi } from "../../utils/axios";

export const postBookMarkLists = async (userId:number,areaId:number): Promise<void> => {
    try {
        const res = await fetchFromApi(
            'POST',
            `/users/${userId}/areaBookmarks?areaId=${areaId}`
        );
        console.log(res.data)
    } catch (e) {
      console.log(e);
    }
};


export const deleteBookMarkLists = async (userId:number,areaId:number): Promise<void> => {
    try {
        const res = await fetchFromApi('DELETE',`/users/${userId}/areaBookmarks?areaBookmarkId=${areaId}`);
        console.log(res.data)
    } catch (e) {
      console.log(e);
    }
};

