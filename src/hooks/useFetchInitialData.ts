import { useEffect } from 'react';
import { getHomfoArea, getAreaDetailResult } from '../services/homfoArea/api';
import useHomfoSurveyStore from '../store/context/useHomfoSurveyStore';
import useUserStore from '../store/context/useUserStore';
import { Result } from '../store/type/homfoRecommend&request/interface';


function useFetchHomfoInitialData() {
  const { fetch } = useUserStore();
  const { setResult, setResultDetail } = useHomfoSurveyStore();
  useEffect(() => {
    fetch(2);
    const fetchHomfoRecommendData = async () => {
      try {
        const homfoInfo:Result[]= await getHomfoArea(2);
        if (homfoInfo.length !== 0){
          setResult(homfoInfo);
          const resultArray = await Promise.all(
              homfoInfo.map(async (item:Result) => {
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
    fetchHomfoRecommendData(); 
  }, []);

}

export default useFetchHomfoInitialData;
