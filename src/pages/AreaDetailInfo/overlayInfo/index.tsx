import React, {useState, Dispatch, SetStateAction} from 'react'
import styles from './styles.module.scss'
interface OverlayInfoProps {
    touchUpEvent: boolean;
    setTouchUpEvent: Dispatch<SetStateAction<boolean>>;
    touchDownEvent: boolean;
    setTouchDownEvent: Dispatch<SetStateAction<boolean>>;
    selectedAmenities: string|undefined;
}
export const OverlayInfo = ({touchUpEvent, touchDownEvent, setTouchUpEvent, setTouchDownEvent, selectedAmenities}: OverlayInfoProps)=>{
    const [startY, setStartY] = useState<number|null>(null);
    const handleOnTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      setStartY(e.touches[0].clientY); 
    }
    const handleOnTouchMove = (e: React.TouchEvent<HTMLDivElement>)=>{
      var currentY = e.touches[0].clientY; 
      if (startY!==null){
        var deltaY = currentY - startY; 
      if (deltaY > 0) {
        // 아래로 터치한 경우
        setTouchDownEvent(true);
        setTouchUpEvent(false);
      } else if (deltaY < 0) {
        // 위로 터치한 경우
        setTouchUpEvent(true);
        setTouchDownEvent(false);
      }
    }}

    return(
    <div className={`${styles.overlayAreaInfoView} ${touchDownEvent ? styles.touchDown:""} ${touchUpEvent ? styles.touchUp:""}`} 
        onTouchStart={handleOnTouchStart}
        onTouchMove={handleOnTouchMove}>
        

    </div>);
}