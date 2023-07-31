import React from 'react';
import { Routes, Route,} from 'react-router-dom';
import * as router from './routes';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={router.home} />
                <Route path="/hbti" Component={router.hbti} />
                <Route path="/map"Component={router.kakaomap} />
                <Route path="/mypage"Component={router.mypage} />
                <Route path="/mypage/setting" Component={router.setting} />
                <Route path="/mypage/personalinfo" Component={router.personalInfo} />
                <Route path="/faq" Component={router.faq} />
                <Route path="/inquiry" Component={router.inquiry} />

                <Route path="/user/password" Component={router.modifyPassword} />
                <Route path="/user/phonenumber" Component={router.modifyPhonenumber} />
            </Routes>
        </>
    );
}

export default App;
