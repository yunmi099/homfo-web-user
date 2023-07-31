import React, { useState, useEffect } from "react";
import DatePicker from "react-mobile-datepicker";
import { formatDate } from "../../../../utils/getDate";
import { isIOS, isAndroid } from 'react-device-detect';
interface DatePickerProps{
  dateOfBirth: string;
  setDateOfBirth: React.Dispatch<React.SetStateAction<{
    nickName: string;
    gender: string;
    job: string;
    dateOfBirth: string;
  }>>;
}
const DateScrollPicker: React.FC<DatePickerProps> =({dateOfBirth, setDateOfBirth}) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [device, setDevice] = useState("");
  
  useEffect(()=>{
    if (isAndroid){
      setDevice('android');
    } else if (isIOS){
      setDevice('ios')
    } else {
      setDevice('default')
    }
  },[])
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSelect = (date: Date) => {
    setDate(date);
    setIsOpen(false);
  };


  return (<>
      <div onClick={()=>handleClick()}>{formatDate(dateOfBirth)}</div> 
      <DatePicker
        value={date}
        isOpen={isOpen}
        onSelect={handleSelect}
        onCancel={handleCancel}
        isPopup={true}
        theme={device}
        showHeader={false}
        dateFormat={["DD", "MM", "YYYY"]}
        confirmText="OK"
        cancelText="Cancel"
      />
      </>
  );
};
export default DateScrollPicker;
