import React, {useState, useEffect} from 'react'
import Rendering from './renderingPage';
import HomfoResult from './resultPage';
import useHomfoSurveyStore from '../../store/context/useHomfoSurveyStore';

export default function HompoRecommendResult() {
    const {resultDetail} = useHomfoSurveyStore();
  return (
    <div>{resultDetail!=null?<HomfoResult/>:<Rendering/>}</div>
  )
}