import { useQuery, useMutation } from 'react-query';
import { fetchFromApi } from '../utils/axios';

const getHompoRecommendInfo = async ({ area_id, area_type }: {area_id:number, area_type:string}) => {
  const res = await fetchFromApi('GET', `/real-estate/area/detail?areaId=${area_id}&areaType=${area_type}`);
  return res.data;
};

const postHompoRecommendInfo = async ({ id, data, filterData }:{id:number, data:any, filterData:any}) => {
  let totalData = { ...data };

  if (filterData) {
    const transportsData = Object.entries(filterData).map(([type, [start, end]]:any) => ({
      type,
      seconds: end * 60,
    }));
    totalData = { ...totalData, transports: transportsData };
  }

  const res = await fetchFromApi('POST', `/users/${id}/recommended-area`, totalData);
  return res.data;
};

function useHompoSurvey(area_id: number, area_type: string) {
  const { data: hompoRecommendResult, isLoading, isError, error } = useQuery(
    ['hompoRecommendInfo', { area_id, area_type }], 
    () => getHompoRecommendInfo({ area_id, area_type }), 
    {
      enabled: false,
    }
  );

  const { mutate, isLoading: isMutating, isError: mutateError, error: mutateErrorData } = useMutation(
    () => postHompoRecommendInfo({ id: area_id, data: {}, filterData: {} }),
    {
      onSuccess: () => {
      },
    }
  );

  return {
    hompoRecommendResult,
    isLoading,
    isError,
    error,
    isMutating,
    mutate,
    mutateError,
    mutateErrorData,
  };
}

export default useHompoSurvey;
