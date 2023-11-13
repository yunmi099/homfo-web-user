export {type QuestionForm, type HomfoEditData,type Area, type RequestData, type HomfoStoreState, type Result, type ResultDetail, type RequestStore, type RequestForm};
interface HomfoStoreState {
  setResult: (data: Result[])=>void;
  reset: ()=>void;
  setResultDetail: (data: ResultDetail[])=>void;
  postHomfoRecommendInfo: (id: number, data: HomfoEditData, filterData:{[key:string]:number[]}|undefined) => Promise<void>;
  result:null|Result[];
  resultDetail: null|ResultDetail[];
} 
interface QuestionForm {
  question: {contents:string, type: string};
  answer:{ title: string; value: any; }[]|null;
  mode: string;
  double: boolean;
  filter: null | {
    data: { [key: string]: [number[], string[], string] };
  };
}
interface HomfoEditData {
  [key: string]: any;
  universityPeople:boolean[];
  transports:string[];
  hobbyInHome:boolean[];
  facilities: string[];
} 
interface Area {
    areaId: number;
    name: string;
    radius: number;
    lat: number;
    lng: number;
}
interface Result{
    area: Area,
    score: number,
}
interface RequestData{
  realEstateType: string[];
  contractType: string[][],
  residencePeriod: string[];
  loanAvailability:string[];
  loanType:string[]|null;
  moveInPeriod: string[];
  roomOption: string[];
  otherRoomOption: string;
  additionalRequests:string;  
  [key: string]: any; 
} 

interface ResultDetail{
  areaId: number;
  detail:{
    name: null | string;
    avgMonthlyDeposit: null | number;
    avgMonthlyFee: null | number;
    avgJeonseDeposit: null | number;
    avgExclusiveArea: null | number;
    avgBuiltYear: null | number;
    avgWalkingTotalDistance: null | number;
    avgWalkingSeconds: null | number;
    avgBikeSeconds: null | number;
    avgTransportSeconds: null | number;
  }[];
}
interface RequestStore{
  areaId: []|number[];
  setAreaId: (data:number[])=>void;
  postPropertyRequest: (id: number, data: RequestData, filterData:{[key:string]:number[]}) => Promise<any>;
}
interface RequestForm{
  userId: number;
  areaId: number[];
  realEstateType: string[];
  contractType: string;
  residencePeriod:string[];
  deposit:{[key: string]: number[]};
  moveInPeriod:string;
  loanAvailability: string;
  loanType: string|null;
  roomOption: string[];
  otherRoomOption: string|null;
  additionalRequests: string|null;
}