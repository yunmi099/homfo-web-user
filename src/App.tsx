import React from 'react';
import { Routes, Route } from 'react-router-dom';
import * as router from './routes';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<router.home />} />
                <Route path="/hbti" element={<router.hbti />} />
                <Route path="/hbti/result" element={<router.hbtiResult />} />
            </Routes>
        </>
    );
}

export default App;
