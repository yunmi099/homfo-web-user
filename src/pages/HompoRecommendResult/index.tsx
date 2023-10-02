import React, {useState, useEffect} from 'react'
import Rendering from './renderingPage';
import HompoResult from './resultPage';
import useHompoSurveyStore from '../../store/context/useHompoSurveyStore';

export default function HompoRecommendResult() {
    const {resultDetail} = useHompoSurveyStore();
  return (
    <div>{resultDetail!=null?<HompoResult/>:<Rendering/>}</div>
  )
}
