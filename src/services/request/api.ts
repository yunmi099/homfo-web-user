import { Area } from "../../store/type/hompoRecommend&request/interface";
import { fetchFromApi } from "../../utils/axios";
export const getAreaInfo= async (university_name:string,university_branch:string, setAreaInfo: React.Dispatch<React.SetStateAction<Area[] | undefined>>): Promise<void> => {
    try {
      const res= await fetchFromApi('GET',`/transport/area?universityName=${university_name}&universityBranch=${university_branch}`);
      setAreaInfo(res.data.data);
    } catch (e) {
      console.log(e);
    }
};