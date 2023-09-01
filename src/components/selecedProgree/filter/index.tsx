import React,{useState, useEffect, useMemo} from "react";
import styles from './styles.module.scss'
const Filter = ()=>{
    let fixedMinPrice = 1000;
    let fixedMaxPrice = 50000;
    let priceGap = 1000;
    const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice); 
    const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
    const priceRangeMinValueHandler = (e:any) => { 
        setRangeMinValue(parseInt(e.target.value));
      };
      
      const priceRangeMaxValueHandler = (e:any) => {
        setRangeMaxValue(parseInt(e.target.value));
      };
      const twoRangeHandler = () => {
        if (rangeMaxValue - rangeMinValue < priceGap) {
          setRangeMaxValue(rangeMinValue => rangeMinValue + priceGap);
          setRangeMinValue(rangeMaxValue => rangeMaxValue - priceGap);
        } 
      };
      useEffect(() => {
        twoRangeHandler();
      }, [rangeMinValue, rangeMaxValue]);
      const rangeMinPercent = useMemo(() => (rangeMinValue / fixedMaxPrice) * 100, [rangeMinValue, fixedMaxPrice]);
      const rangeMaxPercent = useMemo(() => 100 - (rangeMaxValue / fixedMaxPrice) * 100, [rangeMaxValue, fixedMaxPrice]);
          
    return(
    <div className={styles.container}>
        <div className={styles.filterSlide}>
            <div className={styles.filterSlideInner} style={{left: `${rangeMinPercent}%`, right: `${rangeMaxPercent}%`}}>
            </div>
            <div className={styles.filterRangeWrap}>
                    <input className={styles.filterRangeMin}   
                    type="range"
                    min={fixedMinPrice}
                    max={fixedMaxPrice - priceGap}
                    step="1"
                    value={rangeMinValue}
                    onChange={e => {
                        priceRangeMinValueHandler(e);
                      }}
                    ></input>
                    <input className={styles.filterRangeMax} 
                    type="range"
                    min={fixedMinPrice + priceGap}
                    max={fixedMaxPrice}
                    step="1"
                    value={rangeMaxValue}
                    onChange={e => {
                      priceRangeMaxValueHandler(e);
                    }}
                    ></input>
                 </div>
        </div>
    </div>)

}
export default Filter;