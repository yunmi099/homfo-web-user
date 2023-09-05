export {type HompoAnswer };
interface HompoAnswer {
  question: {contents:string, type: string};
  answer:{ title: string; value: any; }[]|null;
  mode: string;
  double: boolean;
  filter: null | {
    unit: string;
    data: { [key: string]: [number[], string[], string] };
  };
}