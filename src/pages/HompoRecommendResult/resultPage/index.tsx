import React, { useEffect } from 'react'
import useHompoSurveyStore from '../../../store/context/useHompoSurveyStore';

export default function HompoResult() {  
  const {resultDetail,result} = useHompoSurveyStore();
  useEffect(()=>{
    console.log(result);
    console.log(resultDetail);
  },[])
  return (
    <div>index</div>
  )
}
