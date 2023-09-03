import React,{useState, useEffect, useMemo} from "react";
import styles from './styles.module.scss'
interface FilterProps{
   onewayOption?: boolean;
   title: string;
   min: number;
   max:number;
}
const Filter = ({onewayOption = false,title,min,max}:FilterProps)=>{
    let fixedMinValue = min;
    let fixedMaxValue = max;
    let gap =0;
    if (onewayOption === true){
      gap = 0;
    } else {
      gap =1;
    }
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinValue); 
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxValue);
    const ValueRangeMinValueHandler = (e:any) => { 
        {onewayOption!==true&&setRangeMinValue(parseInt(e.target.value))};
      };
      
      const ValueRangeMaxValueHandler = (e:any) => {
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
      }, [rangeMinValue, rangeMaxValue]);
      const rangeMinPercent = useMemo(() => ((rangeMinValue-fixedMinValue)/(fixedMaxValue-fixedMinValue)) * 100, [rangeMinValue, fixedMaxValue,fixedMinValue]);
      const rangeMaxPercent = useMemo(() => ((fixedMaxValue-rangeMaxValue)/(fixedMaxValue-fixedMinValue))*100, [rangeMaxValue, fixedMaxValue, fixedMinValue]);
      console.log(`max:${fixedMaxValue}`);
      console.log( `currentMax: ${rangeMaxValue}`);
      return(
    <div className={styles.container}>
      <div className={styles.filterInfo}>
        <div>
          {title}
        </div>
        <div>
          {rangeMaxValue}분 이내
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
                        ValueRangeMinValueHandler(e);
                      }}
                    ></input>
                    <input className={styles.filterRangeMax} 
                    type="range"
                    min={fixedMinValue + gap}
                    max={fixedMaxValue}
                    step="1"
                    value={rangeMaxValue}
                    onChange={(e:any) => {
                      ValueRangeMaxValueHandler(e);
                    }}
                    ></input>
                 </div>
        </div>
    </div>)

}
export default Filter;