import { useEffect } from 'react';
import { getHompoArea, getAreaDetailResult } from '../services/hompoArea/api';
import useHompoSurveyStore from '../store/context/useHompoSurveyStore';
import useUserStore from '../store/context/useUserStore';
import { Result } from '../store/type/hompoRecommend&request/interface';


function useFetchHompoInitialData() {
  const { fetch } = useUserStore();
  const { setResult, setResultDetail } = useHompoSurveyStore();
  useEffect(() => {
    fetch(2);
    const fetchHompoRecommendData = async () => {
      try {
        const hompoInfo:Result[]= await getHompoArea(2);
        if (hompoInfo.length !== 0){
          setResult(hompoInfo);
          const resultArray = await Promise.all(
              hompoInfo.map(async (item:Result) => {
                const areaId = item.area.areaId;
                const detail = await getAreaDetailResult(areaId);
                return {
                  areaId,
                  detail,
                };
              })
            );
          setResultDetail(resultArray);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchHompoRecommendData(); 
  }, []);

}

export default useFetchHompoInitialData;
