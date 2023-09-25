import React from 'react';
import { Routes, Route,} from 'react-router-dom';
import * as router from './routes';
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
    return (
        <> 
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" Component={router.home} />
                <Route path="/hbti" Component={router.hbti} />
                <Route path="/map"Component={router.kakaomap} />
                <Route path="/mypage"Component={router.mypage} />
                <Route path="/mypage/setting" Component={router.setting} />
                <Route path="/mypage/personalinfo" Component={router.personalInfo} />
                <Route path="/mypage/accountinfo" Component={router.accountInfo} />
                <Route path="/faq" Component={router.faq} />
                <Route path="/inquiry" Component={router.inquiry} />
                <Route path="/request" Component={router.request} />
                <Route path="/user/password" Component={router.modifyPassword} />
                <Route path="/user/phonenumber" Component={router.modifyPhonenumber} />
                <Route path="/mypage/hompo-recommendedArea" Component={router.hompoRecommendedArea} />
                <Route path="/real-estate-knowledge" Component={router.realEstateKnowledge} />
            </Routes>
        </QueryClientProvider>
        </>
    );
}

export default App;
