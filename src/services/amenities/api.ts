import { Dispatch, SetStateAction } from "react";
import { amenitiesBasicInfo, FilteredAmenitiesBasicInfo, StoreDetail } from "../../store/type/amenities/interface";
import { fetchFromApi } from "../../utils/axios";

export const getAmenities = async (areaId:number,setAmenitiesInfo:any): Promise<void> => {
    try {
        const res = await fetchFromApi('GET',`/store/in-area?areaId=${areaId}`);
        res.data.data.map((item: any, index:number) => {
            setAmenitiesInfo((prev:any) => {
              return {
                ...prev, 
                [item.type]: {...prev[item.type], count:item.count}, 
              };
            });
          });
    } catch (e) {
      console.log(e);
    }
};
// 타입 다시 정의 


export const getAmenitiesCoordinates = async (areaId: number, storeType:string, setAmenitiesBasicData:Dispatch<SetStateAction<FilteredAmenitiesBasicInfo | undefined>>): Promise<void> => {
    try {        
        const res = await fetchFromApi('GET',`/store/in-area/map?areaId=${areaId}&storeType=${storeType}`);
        const filterData = res.data.data.reduce((acc:FilteredAmenitiesBasicInfo, item:amenitiesBasicInfo) => {
          const key = `${item.lat}_${item.lng}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        }, {});
        setAmenitiesBasicData(filterData);
    } catch (e) {

    }
    
}


export const getStoreDetail = async (storeId: string, setStoreDetail: React.Dispatch<React.SetStateAction<StoreDetail[] | null>>): Promise<void> => {
  try {        
      const res = await fetchFromApi('GET',`/store/${storeId}/detail`);
      setStoreDetail((prev: StoreDetail[] | null) => {
        if (prev === null) {
          return [res.data];
        } else {
          return [...prev, res.data];
        }
      });
  } catch (e) {

  }
  
}
