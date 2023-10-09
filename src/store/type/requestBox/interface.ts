import { RequestData } from "../hompoRecommend&request/interface";
export { type RequestList, type RequestFormUserResponded, type ExtendedRequestData}
interface RequestList{
    agencyName: null|string;
    areaName: string;
    createdAt: string;
    matchStatus: string;
    realtorName: null|string;
    requestId:number;
    status: string;
    university:string;
};
interface RequestFormUserResponded{
    requestId: number;
    areaId: number;
    realEstateType: string[];
    contractType: string;
    residencePeriod:string;
    deposit:{[key: string]: number[]};
    moveInPeriod:string;
    loanAvailability: string;
    loanType: string|null;
    roomOption: string[];
    otherRoomOption: string|null;
    additionalRequests: string|null;
}
interface ExtendedRequestData extends RequestData {
    areaId: number;
} 