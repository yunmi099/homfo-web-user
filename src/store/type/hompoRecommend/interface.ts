export {type HompoQuestion, HompoEditData };
interface HompoQuestion {
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