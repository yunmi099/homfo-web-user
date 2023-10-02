export {type QuestionForm, type HompoEditData,type Area, type RequestData, type HompoStoreState, type Result, type ResultDetail };
interface HompoStoreState {
  setResult: (data: Result[])=>void;
  setResultDetail: (data: ResultDetail[])=>void;
  postHompoRecommendInfo: (id: number, data: HompoEditData, filterData:{[key:string]:number[]}|undefined) => Promise<void>;
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
interface HompoEditData {
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
  contractType: string[],
  residencePeriod: string[];
  deposit: string[];
  loanAvailablity:string[];
  loanType:string[];
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
    type: null | string;
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