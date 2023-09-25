import React,{useState, useEffect, useMemo} from "react";
import styles from './styles.module.scss'
interface FilterProps{
   onewayOption?: boolean;
   title: string;
   unit: string;
   min: number;
   data:{[key:string]:number[]}|undefined;
   setData:React.Dispatch<React.SetStateAction<{[key: string]: number[];
} | undefined>>
   max:number;
   mode?: string;
}
const Filter = ({onewayOption = false,title,min,max,unit,data,setData}:FilterProps)=>{
    let fixedMinValue = min;
    let fixedMaxValue = max;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinValue); 
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxValue);
    let gap=0;
    if (onewayOption){
      gap=0
    } else {
      gap=1
    }
    const minValueHandler = (e:any) => { 
        {onewayOption!==true&&setRangeMinValue(parseInt(e.target.value))};
      };
      
      const maxValueHandler = (e:any) => {
        setRangeMaxValue(parseInt(e.target.value));
      };
      const twoRangeHandler = () => {
        if (rangeMaxValue - rangeMinValue < gap) {
          setRangeMaxValue(rangeMinValue => rangeMinValue + gap);
          setRangeMinValue(rangeMaxValue => rangeMaxValue - gap);
        } 
      };
      useEffect(() => {
        twoRangeHandler();
        setData(prev=>({...prev,[unit]:[rangeMinValue,rangeMaxValue]}));
      }, [rangeMinValue, rangeMaxValue]);
 
      const rangeMinPercent = useMemo(() => ((rangeMinValue-fixedMinValue)/(fixedMaxValue-fixedMinValue)) * 100, [rangeMinValue, fixedMaxValue,fixedMinValue]);
      const rangeMaxPercent = useMemo(() => ((fixedMaxValue-rangeMaxValue)/(fixedMaxValue-fixedMinValue))*100, [rangeMaxValue, fixedMaxValue, fixedMinValue]);
      return(
    <div className={styles.container}>
      <div className={styles.filterInfo}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.result}>
          {  rangeMaxValue / 10000 >= 1
            ? `${Math.floor(rangeMaxValue / 10000)}억${rangeMaxValue % 10000 !== 0 ? ` ${rangeMaxValue % 10000}만원` : ''} 이내`
            : `${rangeMaxValue}만원 이내`}
        </div>
      </div>
        <div className={styles.filterSlide}>
            <div className={styles.filterSlideInner} style={{left:`${rangeMinPercent}%`,right:`${rangeMaxPercent}%`}}>
            </div>
            <div className={styles.filterRangeWrap}>
                    <input className={styles.filterRangeMin}   
                    type="range"
                    min={fixedMinValue}
                    max={fixedMaxValue - gap}
                    step="1"
                    value={rangeMinValue}
                    onChange={(e:any) => {
                       minValueHandler(e);
                      }}
                    ></input>
                    <input className={styles.filterRangeMax} 
                    type="range"
                    min={fixedMinValue + gap}
                    max={fixedMaxValue}
                    step="1"
                    value={rangeMaxValue}
                    onChange={(e:any) => {
                     maxValueHandler(e);
                    }}
              ></input>
          </div>
        </div>
    </div>)

}
export default Filter;