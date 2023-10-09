import { fetchFromApi } from "../../utils/axios";
import { Result, ResultDetail } from "../../store/type/hompoRecommend&request/interface";
export const getHompoArea= async (user_id:number): Promise<Result[]> => {
    try {
      const res = await fetchFromApi('GET', `/users/${user_id}/recommended-area`);
      return res.data.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
};

export const getAreaDetailResult= async (area_id: number): Promise<ResultDetail["detail"]> => {
  try {
     const res = await fetchFromApi('GET', `/transports/${area_id}/area/detail`);
     return res.data;
  } catch (e: any) {
     throw e;
  }
}
