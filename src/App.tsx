import React from 'react';
import { Routes, Route,} from 'react-router-dom';
import * as router from './routes';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={router.home} />
                <Route path="/hbti" Component={router.hbti} />
                <Route path="/hbti/result" Component={router.hbtiResult} />
                <Route path="/map"Component={router.kakaomap} />
                <Route path="/mypage"Component={router.mypage} />
            </Routes>
        </>
    );
}

export default App;
