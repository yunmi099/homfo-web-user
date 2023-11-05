export {type amenitiesBasicInfo, type FilteredAmenitiesBasicInfo, type StoreDetail}
interface amenitiesBasicInfo {
    branch : string|null;
    lat:number;
    lng: number;
    storeId: string; 
    name:string; 
}

interface Location {
    storeId: string;
    name: string;
    branch: string | null;
    lat: number;
    lng: number;
  }
  
interface FilteredAmenitiesBasicInfo {
    [key: string]: Location[];
}
  
interface StoreDetail {
    storeId: string;
    name: string;
    branch: null|string;
    storeTypeName: string;
    roadAddress: string;
    jibunAddress: string;
    buildingName: string;
    floor: string;
    postalCode: string;
}