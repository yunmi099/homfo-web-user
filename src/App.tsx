import React from 'react';
import { Routes, Route,} from 'react-router-dom';
import * as router from './routes';
function App() {
    return (
        <> 
            <Routes>
                <Route path="/" Component={router.home} />
                <Route path="/hbti" Component={router.hbti} />
                <Route path="/homfo-notice" Component={router.notice} />
                <Route path="/residence-area-map"Component={router.residenceArea} />
                <Route path="/mypage"Component={router.mypage} />
                <Route path="/mypage/setting" Component={router.setting} />
                <Route path="/mypage/personalinfo" Component={router.personalInfo} />
                <Route path="/mypage/accountinfo" Component={router.accountInfo} />
                <Route path="/faq" Component={router.faq} />
                <Route path="/inquiry" Component={router.inquiry} />
                <Route path="/request" Component={router.request} />
                <Route path="/request-complete" Component={router.requestComplete} />
                <Route path="/request-box" Component={router.requestBox} />
                <Route path="/request-box/modify-request" Component={router.modifyRequest} />
                <Route path="/user/password" Component={router.modifyPassword} />
                <Route path="/user/phonenumber" Component={router.modifyPhonenumber} />
                <Route path="/mypage/homfo-recommendedArea" Component={router.homfoRecommendedArea} />
                <Route path="/real-estate-knowledge" Component={router.realEstateKnowledge} />
                <Route path="/mypage/homfo-recommended-result" Component={router.homfoRecommendResult} />
            </Routes>
        </>
    );
}

export default App;
