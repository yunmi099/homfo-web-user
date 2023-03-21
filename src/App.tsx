import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Hbti from './pages/Hbti';
import HbtiResult from './pages/HbtiResult';
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hbti" element={<Hbti/>} />
                <Route path="/hbti/result" element={<HbtiResult/>} />
            </Routes>
        </>
    );
}

export default App;
